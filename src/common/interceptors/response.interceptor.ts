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

/* Создать Interceptor и подключить его в локальной или глобальной области видимости для перехвата и обработки исключений. Interceptor должен оборачивать результат при успешном запросе в следующую структуру:

{
    status: "success",
    data: ... // данные из контроллера
}
При запросе с ошибкой в следующую структуру:

{
    status: "fail",
    data: ... // сведения об ошибке
} */