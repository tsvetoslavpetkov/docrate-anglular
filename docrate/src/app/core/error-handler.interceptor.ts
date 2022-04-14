import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService, MessageType } from './message.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {

      if(err.error.message == "Login or password don't match"){
        err.error.message = "Името или паролата не съвпадат!"
      }else if( err.error.message =="Resource not found"){
        err.error.message = "Няма такъв ресурс!"
      }
      
      this.messageService.notifyMessage({
        text: err?.error?.message || "Възникна грешка",
        type: MessageType.Error
      })

      return throwError(err)
    }))
  }
}
