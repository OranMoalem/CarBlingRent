import { store } from './../redux/store';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { NotificationService } from './notification.service';
@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

    constructor(private router: Router,
        private notificationService: NotificationService) { }

    public canActivate(): boolean {

        if (store.getState().user) {
            return true;
        }
        this.notificationService.error("Please login!");
        this.router.navigateByUrl("/login");
        return false;
    }
}