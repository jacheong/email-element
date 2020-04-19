import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailFormComponent } from './components/email-form/email-form.component';



@NgModule({
  declarations: [
    EmailFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmailFormComponent
  ]
})
export class EmailElementModule { }
