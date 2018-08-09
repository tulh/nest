import {ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> | Promise<Observable<any>> {
        return call$.pipe(
            catchError(err => throwError(new HttpException(err.message, HttpStatus.BAD_GATEWAY)))
        );
    }

}