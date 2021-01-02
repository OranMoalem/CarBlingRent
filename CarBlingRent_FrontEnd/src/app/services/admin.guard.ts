import { store } from './../redux/store';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private router: Router,
        private notificationService: NotificationService) { }
    public canActivate(): boolean {

        if (store.getState().user?.role === "Admin") {
            return true;
        }

        this.notificationService.error("You are not Admin!");
        this.router.navigateByUrl("/home");
        return false;
    }
}