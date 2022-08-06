import {
  HttpException,
  HttpStatus,
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ParseMongoIDPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const regex = /^[a-f0-9]{24}$/g;
    const found = value.match(regex);
    if (found == null) {
      throw new HttpException(
        'Parameter must be mongo-like ID (hex, 24 chars)',
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
