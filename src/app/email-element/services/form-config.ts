import { InjectionToken } from '@angular/core';

export interface FORM_CONFIG {
    fields: FIELD_CONFIG[];
};

export interface FIELD_CONFIG {
    field_name: string;
    field_label?: string;
    field_value?: string;
    field_icon?: string;
    disabled?: boolean;
    readonly?: boolean;
    maxLength?: number;
    minLength?: number;
    required?: boolean;
};

export const EMAIL_FORM_CONFIG: FORM_CONFIG = {
    fields: [
        {
            field_name: 'from',
            field_label: 'From',
            required: true
        },
        {
            field_name: 'to',
            field_label: 'To',
            field_value: 'jac@support.com',
            disabled: true
        },
        {
            field_name: 'subject',
            field_label: 'Subejct',
            required: true,
            maxLength: 100
        },
        {
            field_name: 'text',
            required: true,
            maxLength: 500
        }
    ]
};

export const EMAIL_FORM_CONFIG_TOKEN = new InjectionToken<FORM_CONFIG>('Email Form Configuration');
