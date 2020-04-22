import { InjectionToken } from '@angular/core';

interface EMAIL_CONFIG {
    endpoint: string;
}

export const EMAIL_SERVICE_CONFIG = {
    endpoint: 'https://stormy-fjord-30573.herokuapp.com',
};

export const EMAIL_SERVICE_CONFIG_TOKEN = new InjectionToken<EMAIL_CONFIG>('email config token');
