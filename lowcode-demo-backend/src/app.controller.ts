/*
 * @Date: 2024-09-23 14:59:21
 * @Description: description
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data')
  data() {
    return [
      { name: '张三', sex: '男', birthday: new Date('1994-07-07').getTime() },
      { name: '李四', sex: '男', birthday: new Date('1995-06-06').getTime() },
      { name: '王五', sex: '女', birthday: new Date('1996-08-08').getTime() },
      { name: '钱七', sex: '女', birthday: new Date('1997-08-08').getTime() },
      { name: '赵八', sex: '男', birthday: new Date('1996-09-08').getTime() },
    ]
  }
}
