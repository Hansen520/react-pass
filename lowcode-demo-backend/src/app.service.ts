/*
 * @Date: 2024-03-05 15:27:33
 * @Description: description
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
