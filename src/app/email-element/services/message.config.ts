import { InjectionToken } from '@angular/core';

interface MESSAGE_CONFIG_INTERFACE {
    form: {
        error: {
            required: string;
            maxlength: string;
            minlength: string;
            pattern: string;
        }
    },
    email: {
        success: string;
        error: string;
    }
};

export const MESSAGE_CONFIG: MESSAGE_CONFIG_INTERFACE = {
    form: {
        error: {
            required: "The following field is required",
            maxlength: "Maximum characters reached",
            minlength: "Minimum characters not met",
            pattern: "Please provide a valid email address"
        }
    },
    email: {
        success: "Email successfully sent",
        error: "Email failed to send"
    }
};

export const MESSAGE_CONFIG_TOKEN = new InjectionToken<MESSAGE_CONFIG_INTERFACE>('Message Configuration');