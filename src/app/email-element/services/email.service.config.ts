import { InjectionToken } from '@angular/core';

interface EMAIL_CONFIG {
    endpoint: string;
}

export const EMAIL_SERVICE_CONFIG = {
    endpoint: 'https://secret-forest-32963.herokuapp.com',
};

export const EMAIL_SERVICE_CONFIG_TOKEN = new InjectionToken<EMAIL_CONFIG>('email config token');
