import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'HRIS Master Data API v1.0.0 - Status: Online';
  }
}
