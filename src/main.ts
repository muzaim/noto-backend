import { ValidationPipe } from '@nestjs/common'; // Tambahkan ClassSerializerInterceptor
import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core'; // Tambahkan Reflector
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path/win32';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { AppLogger } from './common/logger/app-logger.service';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // Buat Nest Express Application dengan opsi bufferLogs
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const PORT = process.env.PORT ? +process.env.PORT : 3000;

  // ======== Atur Timeout Server Main ========
  const server = app.getHttpServer();
  server.setTimeout(10 * 60 * 1000); // Set timeout ke 10 menit

  // ======== CORS ========
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',')
        : [];

      if (allowedOrigins.includes('*')) {
        callback(null, true);
      } else if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(cookieParser());
  // ======== Static Assets & Views ========
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // ======== Swagger Documentation ========
  if (process.env.DOC_STATUS === '1') {
    const options = new DocumentBuilder()
      .setTitle('Backend System HRIS')
      .setDescription('This is API documentation for Backend System HRIS')
      .setVersion('1.0')
      .addBearerAuth()
      .setContact(
        'Yuusufyan',
        'https://github.com/yuusufyan',
        'yuusufyan13@gmail.com',
      )
      .addServer(
        `https://newhrisbe-dev.smf-indonesia.co.id/api/v1`,
        'Development Server',
      )
      .addServer(`http://localhost:${PORT}/api/v1`, 'Local Server')
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  // ======== Trust Proxy ========
  app.set('trust proxy', 1);

  // ======== Global Pipes ========
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ======== Global Filters ========
  const appLogger = await app.resolve(AppLogger);
  app.useGlobalFilters(new AllExceptionsFilter(appLogger));

  // ======== Class Validator Container ========
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // ======== Global Prefix ========
  // app.setGlobalPrefix('/api/v1');
  app.setGlobalPrefix('api/v1', { exclude: ['health'] });

  // ======== Start Server ========
  await app.listen(PORT, () => {
    // Instead of using new Logger we use app.get(Logger) which is Pino
    const logger = app.get(Logger);
    logger.log(`Application is running on: http://localhost:${PORT}`);
    logger.log(
      `Swagger documentation available at: http://localhost:${PORT}/docs`,
    );
  });
}
bootstrap();
