import { store } from './../redux/store';
import { Notyf } from 'notyf';
import { CanActivate, Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class WorkerGuard implements CanActivate {
    constructor(private router: Router,
        private notificationService: NotificationService) { }
    public canActivate(): boolean {

        if (store.getState().user?.role === "Worker") {
            return true;
        }
        this.notificationService.error("You are not Worker!");
        this.router.navigateByUrl("/home");
        return false;
    }
}