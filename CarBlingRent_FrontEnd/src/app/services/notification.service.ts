import { Injectable } from '@angular/core';
import { Notyf as Notify } from 'notyf';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private notify = new Notify({ duration: 4000, ripple: false });

    public success(message: string): void {
        this.notify.success(message);
    }

    public error(message: string | object): void {
        if (typeof message === "object") {
            message = this.extractErrorMessage(message);
        }

        this.notify.error(message);
    }

    private extractErrorMessage(errorObject) {

        if (typeof errorObject.error === "string") {
            return errorObject.error;
        }

        if (errorObject.error.errors) {
            for (const prop in errorObject.error.errors) {
                return errorObject.error.errors[prop].toString();
            }
        }

        if (errorObject.status === 401 || errorObject.status === 403) {
            return "You are not authorized.";
        }

        if (errorObject.status === 400) {
            return "Incorrect input, please try again.";
        }

        return "Some error occurred, please try again later.";
    }
}
