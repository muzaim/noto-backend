import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  GetOptionsDTO,
  GetTableDto,
  ResultTable,
} from 'src/helper/dto/general.dto';
import {
  Brackets,
  DeepPartial,
  FindOptionsWhere,
  QueryDeepPartialEntity,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { AppLogger } from '../logger/app-logger.service';
import { ActiveStatus } from 'src/database/enumlist';

export interface HasId {
  id?: number | string;
}
export interface HasStatus {
  status?: string;
}

@Injectable()
export class BaseService<T extends HasId & HasStatus> {
  protected logger: AppLogger | Logger = new Logger(BaseService.name);

  constructor(
    protected readonly repository: Repository<T>,
    logger?: AppLogger,
  ) {
    if (logger) {
      this.logger = logger;
    }
  }

  async create(payload: DeepPartial<T>, userId?: number): Promise<T> {
    this.logger.log(`[create] Creating a new entity for user: ${userId}`);
    const data = this.repository.create({
      ...payload,
      createdBy: userId,
      updatedBy: userId,
    });
    const savedData = await this.repository.save(data);
    this.logger.log(
      `[create] Successfully created entity with ID: ${(savedData as any)?.id}`,
    );
    return savedData;
  }

  async findAll(
    payload: GetTableDto,
    relations: string[] = [],
    callback?: (qb: SelectQueryBuilder<T>) => void,
    searchFields?: string[],
    builder?: SelectQueryBuilder<any>,
  ): Promise<ResultTable> {
    this.logger.log(
      `[findAll] Fetching entries. Page: ${payload.page}, Limit: ${
        payload.limit
      }, Term: ${payload.term || 'N/A'}`,
    );

    const page = (payload.page || 1) - 1;
    const limit = payload.limit || 10;
    const sortBy = payload.sort_by || 'id';
    const orderBy = payload.order_by || 'ASC';
    const keyword = payload.term?.trim();

    const query = builder || this.repository.createQueryBuilder('entity');
    const alias = query.alias;

    relations.forEach((relation) => {
      // Check if relation is already joined to avoid duplicates if builder is passed
      if (!builder) {
        query.leftJoinAndSelect(`${alias}.${relation}`, relation);
      }
    });

    if (callback) {
      callback(query);
    }

    const metadata = builder
      ? query.expressionMap.mainAlias.metadata
      : this.repository.metadata;
    const deleteDateColumn = metadata.deleteDateColumn;
    if (deleteDateColumn) {
      query.andWhere(`${alias}.${deleteDateColumn.propertyName} IS NULL`);
    }

    if (keyword) {
      let columns: string[] = [];

      if (searchFields && searchFields.length > 0) {
        columns = searchFields;
      } else {
        const metadata = builder
          ? query.expressionMap.mainAlias.metadata
          : this.repository.metadata;
        columns = metadata.columns
          .filter(
            (column) => column.type === 'varchar' || column.type === 'text',
          )
          .map((column) => `${alias}.${column.propertyName}`);
      }

      if (columns.length > 0) {
        query.andWhere(
          new Brackets((qb) => {
            columns.forEach((column, index) => {
              const condition = `${column} LIKE :keyword`;
              if (index === 0) {
                qb.where(condition);
              } else {
                qb.orWhere(condition);
              }
            });
          }),
          { keyword: `${keyword}%` },
        );
      }
    }

    if (sortBy) {
      if (sortBy.includes('.')) {
        query.orderBy(sortBy, orderBy);
      } else {
        const metadata = builder
          ? query.expressionMap.mainAlias.metadata
          : this.repository.metadata;
        const isValidColumn = metadata.columns.some(
          (column) =>
            column.propertyName === sortBy || column.databaseName === sortBy,
        );
        if (isValidColumn) {
          query.orderBy(`${alias}.${sortBy}`, orderBy);
        } else {
          this.logger.warn(
            `[findAll] Invalid sortBy column ignored: ${sortBy}`,
          );
        }
      }
    }

    const [data, count] = await query
      .skip(page * limit)
      .take(limit)
      .getManyAndCount();

    this.logger.log(
      `[findAll] Retrieved ${data.length} records out of total ${count}.`,
    );

    const result = new ResultTable();
    result.data = data;
    result.meta = {
      page: payload.page || 1,
      per_page: limit,
      total_items: count,
      total_pages: Math.ceil(count / limit),
    };
    return result;
  }

  async findOne(id: number, relations: string[] = []): Promise<T> {
    this.logger.log(`[findOne] Fetching entity with ID: ${id}`);
    const data = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      relations,
    });

    if (!data) {
      const entityName = this.repository.metadata.tableName;
      this.logger.warn(
        `[findOne] Entity not found: ${entityName} with ID ${id}`,
      );
      throw new NotFoundException(
        `${entityName} with ID ${id} not found. Please verify the ID and try again.`,
      );
    }
    this.logger.log(`[findOne] Entity with ID: ${id} found successfully.`);
    return data;
  }

  async update(
    id: number,
    payload: QueryDeepPartialEntity<T>,
    userId?: number,
  ): Promise<UpdateResult> {
    const entityName = this.repository.metadata.tableName;
    this.logger.log(`[update] Updating ${entityName} with ID: ${id}`);

    // Check if entity exists
    const exists = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });

    if (!exists) {
      this.logger.warn(
        `[update] Entity not found for update: ${entityName} with ID ${id}`,
      );
      throw new NotFoundException(
        `${entityName} with ID ${id} not found. Cannot update non-existent record.`,
      );
    }

    const result = await this.repository.update(id, {
      ...payload,
      updatedBy: userId,
    });

    this.logger.log(
      `[update] Successfully updated ${entityName} with ID: ${id}`,
    );
    return result;
  }

  async remove(id: number, userId?: number): Promise<UpdateResult> {
    const entityName = this.repository.metadata.tableName;
    this.logger.log(`[remove] Soft deleting ${entityName} with ID: ${id}`);

    // Check if entity exists
    const exists = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });

    if (!exists) {
      this.logger.warn(
        `[remove] Entity not found for deletion: ${entityName} with ID ${id}`,
      );
      throw new NotFoundException(
        `${entityName} with ID ${id} not found. Cannot delete non-existent record.`,
      );
    }

    await this.repository.update(id, {
      deletedBy: userId,
      status: ActiveStatus.Inactive,
    } as unknown as QueryDeepPartialEntity<T>);
    const result = await this.repository.softDelete(id);

    this.logger.log(
      `[remove] Successfully soft deleted ${entityName} with ID: ${id}.`,
    );
    return result;
  }

  // Ganti metode ini dengan versi Query Builder
  async findActiveList(
    payload?: GetOptionsDTO,
    searchFields?: string[],
  ): Promise<Partial<T>[]> {
    const searchTerm = payload?.term;
    this.logger.log(`[findActiveList] Searching with term: ${searchTerm}`);

    const queryBuilder = this.repository
      .createQueryBuilder('entity')
      .select(['entity.id', 'entity.name'])
      .where('entity.status = :status', { status: ActiveStatus.Active });

    // Gunakan 'searchFields' yang dilempar dari service, bukan 'searchColumns'
    if (searchTerm && searchFields && searchFields.length > 0) {
      const searchConditions = searchFields
        .map((col) => `entity.${col} ILIKE :term`)
        .join(' OR ');

      queryBuilder.andWhere(`(${searchConditions})`, {
        term: `%${searchTerm}%`,
      });
    }

    const data = await queryBuilder.getMany();

    this.logger.log(`[findActiveList] Found ${data.length} results.`);
    return data as Partial<T>[];
  }
}
