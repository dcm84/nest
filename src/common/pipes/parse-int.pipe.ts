import {
  HttpException,
  HttpStatus,
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new HttpException('Parameter must be int', HttpStatus.BAD_REQUEST);
    }
    return val;
  }
}
