import { Injectable, Inject } from '@angular/core';
import { EMAIL_SERVICE_CONFIG_TOKEN, EMAIL_SERVICE_CONFIG } from './email.service.config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    @Inject(EMAIL_SERVICE_CONFIG_TOKEN) private emailConfig,
    private http: HttpClient
  ) {}

  contactSupport(): Observable<any> {
    const email = {
      from: 'test@blah.com',
      to: 'support@me.com',
      subject: 'This is a test to support team',
      text: 'You should respond to this.'
    };

    return this.http.post(`${this.emailConfig.endpoint}/contact-support`, email).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    
    //An Observable with a user facing message
    return throwError("Email failed to send");
  }
}
