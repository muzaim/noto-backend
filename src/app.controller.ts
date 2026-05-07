// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiInfo() {
    return {
      project: 'HRIS Master Data',
      version: '1.0.0',
      status: 'Running',
      message: this.appService.getHello(), // Mengambil 'Hello World' atau info dari service
    };
  }

  @Get('/health')
  getHealth() {
    return {
      status: 'ok',
    };
  }
}
