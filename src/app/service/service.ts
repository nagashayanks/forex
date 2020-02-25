import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ConstantService } from './constant';
import { CommonService } from './common-service';
@Injectable()

export class Service {

  constructor(
    private http: HttpClient,
    private userConstant: ConstantService,
    private common: CommonService) { }

  /* Http Headers */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /* post api call  */
  postCall(url, postData, type): Observable<any> {
    this.common.alertConfigDefaultValue();
    return this.http[type](url, postData, this.httpOptions)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  /* get call */
  getList(url: string): Observable<any> {
    this.common.alertConfigDefaultValue();
    return this.http.get(url).pipe(
      retry(1),
      catchError(this.errorHandler.bind(this))
    );
  }

  /* Error handling */
  private errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      /* Get client-side error */
      errorMessage = error.error.message;
    } else {
      /* Get server-side error */
      const code = 0;
      errorMessage = this.userConstant.messageConstant()[code];
    }
    this.common.alertConfig = this.common.modalConfig('Error', errorMessage, true, [{ name: 'Ok' }]);
    return throwError(errorMessage);
  }
}
