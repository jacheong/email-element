import { Component, OnInit, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { EMAIL_FORM_CONFIG, FORM_CONFIG } from '../../services/form-config';
import { EmailOptions } from '../../interfaces/email-options.interface';
import { Subscription } from 'rxjs';
import { EmailDeliveryStatus } from '../../enums/email-delivery-status.enum';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  emailForm: FormGroup;
  maxTextareaSize = 5;
  emailDeliveryStatus = EmailDeliveryStatus.ready;
  EmailDeliveryStatus = EmailDeliveryStatus;

  constructor(
    private emailService: EmailService,
    private formService: FormService
  ) { }

  ngOnInit() {
    this.initializeEmailForm();
  }

  initializeEmailForm() {
    this.emailForm = this.formService.createEmailForm();
  }

  setEmailDeliveryStatus(status: EmailDeliveryStatus) {
    switch(status) {
      case EmailDeliveryStatus.ready:
        this.emailDeliveryStatus = EmailDeliveryStatus.ready;
        break;
      case EmailDeliveryStatus.waiting:
        this.emailDeliveryStatus = EmailDeliveryStatus.waiting;
        break;
      case EmailDeliveryStatus.success:
        this.emailDeliveryStatus = EmailDeliveryStatus.success;
        break;
      case EmailDeliveryStatus.fail:
        this.emailDeliveryStatus = EmailDeliveryStatus.fail;
        break;
      default:
        this.emailDeliveryStatus = EmailDeliveryStatus.ready;
    }
  }

  resetDeliveryStatus() {
    this.setEmailDeliveryStatus(EmailDeliveryStatus.ready);
  }

  resetEmailForm() {
    this.emailForm.reset();
    this.resetDeliveryStatus();
  }

  onSubmit() {
    this.setEmailDeliveryStatus(EmailDeliveryStatus.waiting);
    const email: EmailOptions = this.emailForm.getRawValue();
    this.subscriptions.push(
      this.emailService.contactSupport(email).subscribe({
        next: (success) => {
          console.log(success);
          this.setEmailDeliveryStatus(EmailDeliveryStatus.success);
          setTimeout(() => {
            this.resetDeliveryStatus();
            this.resetEmailForm();         
          }, 2000);
        },
        error: (error) => {
          console.log(error);
          this.setEmailDeliveryStatus(EmailDeliveryStatus.fail);
          setTimeout(() => {
            this.resetDeliveryStatus();
          }, 2000);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
