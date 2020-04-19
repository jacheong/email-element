import { InjectionToken } from '@angular/core';

interface EMAIL_CONFIG {
    endpoint: string;
}

export const EMAIL_SERVICE_CONFIG = {
    endpoint: 'https://agile-retreat-30819.herokuapp.com',
};

export const EMAIL_SERVICE_CONFIG_TOKEN = new InjectionToken<EMAIL_CONFIG>('email config token');