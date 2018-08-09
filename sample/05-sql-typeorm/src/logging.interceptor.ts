import {ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {log} from "util";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> | Promise<Observable<any>> {
        log('Before ....');
        const now = Date.now();
        return call$.pipe(tap(() => log(`After ... ${Date.now() - now}ms`)))
    }

}