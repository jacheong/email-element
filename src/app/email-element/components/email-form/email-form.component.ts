import { Component, OnInit, NgZone, ViewChild, OnDestroy, Inject } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { EmailOptions } from '../../interfaces/email-options.interface';
import { Subscription } from 'rxjs';
import { EmailDeliveryStatus } from '../../enums/email-delivery-status.enum';
import { MESSAGE_CONFIG_TOKEN } from '../../services/message.config';
import { SnackbarService } from '../../services/snackbar.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { generalTransform } from 'src/animations/general-transform.animation';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        useAnimation(generalTransform, {
          params: {
            transformFrom: 'scale(0)',
            timings: '200ms ease',
            transformTo: 'scale(1)'
          }
        })
      ])
    ])
  ]
})
export class EmailFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  emailForm: FormGroup;
  maxTextareaSize = 5;
  emailDeliveryStatus = EmailDeliveryStatus.ready;
  EmailDeliveryStatus = EmailDeliveryStatus;

  constructor(
    private emailService: EmailService,
    private formService: FormService,
    @Inject(MESSAGE_CONFIG_TOKEN) public messageConfig,
    private snackbarService: SnackbarService
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
    this.emailForm.controls['to'].patchValue('jac@support.com');
    this.resetDeliveryStatus();
  }

  onSubmit() {
    this.setEmailDeliveryStatus(EmailDeliveryStatus.waiting);
    const email: EmailOptions = this.emailForm.getRawValue();
    this.subscriptions.push(
      this.emailService.contactSupport(email).subscribe({
        next: (success) => {
          this.setEmailDeliveryStatus(EmailDeliveryStatus.success);
          this.snackbarService.openCustomConfigSnackBar( this.messageConfig.email.success, '', {
            panelClass: 'custom-snackbar--success'
          });
          setTimeout(() => {
            this.resetDeliveryStatus();
            this.resetEmailForm();         
          }, 2000);
        },
        error: (error) => {
          this.setEmailDeliveryStatus(EmailDeliveryStatus.fail);
          this.snackbarService.openCustomConfigSnackBar(this.messageConfig.email.error, '', {
            panelClass: 'custom-snackbar--error'
          });
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
