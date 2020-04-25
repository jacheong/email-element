import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmailElementModule } from './email-element/email-element.module';
import { EmailService } from './email-element/services/email.service';
import { EMAIL_SERVICE_CONFIG_TOKEN, EMAIL_SERVICE_CONFIG } from './email-element/services/email.service.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EMAIL_FORM_CONFIG_TOKEN, EMAIL_FORM_CONFIG } from './email-element/services/form-config';
import { FormService } from './email-element/services/form.service';
import { MESSAGE_CONFIG_TOKEN, MESSAGE_CONFIG } from './email-element/services/message.config';
import { SnackbarService } from './email-element/services/snackbar.service';
import { createCustomElement } from '@angular/elements';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EmailElementModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    EmailService,
    { provide: EMAIL_SERVICE_CONFIG_TOKEN, useValue: EMAIL_SERVICE_CONFIG },
    FormService,
    { provide: EMAIL_FORM_CONFIG_TOKEN, useValue: EMAIL_FORM_CONFIG },
    { provide: MESSAGE_CONFIG_TOKEN, useValue: MESSAGE_CONFIG },
    SnackbarService
  ],
  bootstrap: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const elememt = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('email-form-element', elememt);
  }
}
