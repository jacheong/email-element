import { Injectable, Inject } from '@angular/core';
import { EMAIL_SERVICE_CONFIG_TOKEN, EMAIL_SERVICE_CONFIG } from './email.service.config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { EmailOptions } from '../interfaces/email-options.interface';

@Injectable()
export class EmailService {

  constructor(
    @Inject(EMAIL_SERVICE_CONFIG_TOKEN) private emailConfig,
    private http: HttpClient
  ) {}

  contactSupport(email: EmailOptions): Observable<any> {
    const endpoint = `${this.emailConfig.endpoint}/contact-support`;
    return this.http.post(endpoint, email).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
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
