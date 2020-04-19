import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmailElementModule } from './email-element/email-element.module';
import { EmailService } from './email-element/services/email.service';
import { EMAIL_SERVICE_CONFIG_TOKEN, EMAIL_SERVICE_CONFIG } from './email-element/services/email.service.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EmailElementModule,
    HttpClientModule
  ],
  providers: [
    EmailService,
    { provide: EMAIL_SERVICE_CONFIG_TOKEN, useValue: EMAIL_SERVICE_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
