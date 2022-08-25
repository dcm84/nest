import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as rxjs from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): rxjs.Observable<any> {
    return next.handle().pipe(
      tap(() => console.log('\nRequest successfull!')),
      map((data) => ({
        status: 'success',
        data: data,
      })),
      catchError((err) => {
        console.log(err);
        console.log('\nRequest was failed!');
        return rxjs.of({
          status: 'fail',
          data: err,
        });
      }),
    );
  }
}
