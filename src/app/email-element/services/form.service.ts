import { Injectable, Inject } from '@angular/core';
import { EMAIL_FORM_CONFIG_TOKEN, FORM_CONFIG, FIELD_CONFIG } from './form-config';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators, ValidatorFn } from '@angular/forms';

@Injectable()
export class FormService {

  constructor(
    @Inject(EMAIL_FORM_CONFIG_TOKEN) private emailFormConfig
  ) { }

  createEmailForm(): FormGroup {
    return this.createFormGroup(this.emailFormConfig);
  }

  createFormGroup( formConfig: FORM_CONFIG ): FormGroup {
    let formGroup = new FormGroup({});

    formConfig.fields.forEach((field: FIELD_CONFIG) => {
      formGroup.addControl( field.field_name, this.createFormControl(field) );
    });

    return formGroup;
  }

  createFormControl(field: FIELD_CONFIG): AbstractControl {
    let fieldState = {
      value: field.field_value ? field.field_value : null,
      disabled: field.disabled
    };

    let control = new FormControl(
      fieldState,
      this.bindValidators(field)
    );

    return control;
  }

  bindValidators(field: FIELD_CONFIG): ValidatorFn[] {
    let validators: ValidatorFn[] = [];

    if ( field.required ) {
      validators.push( Validators.required );
    }

    if ( field.maxlength ) {
      validators.push( Validators.maxLength(field.maxlength) );
    }

    if ( field.minlength ) {
      validators.push( Validators.minLength(field.minlength) );
    }

    if ( field.pattern ) {
      validators.push( Validators.pattern(field.pattern) );
    }

    return validators;
  }
}
