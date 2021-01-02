import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CredentialsModel } from 'src/models/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public credentials = new CredentialsModel();
    hide = true;
    constructor(private authService: AuthService, private router: Router) { }

    public async login() {
        const success = await this.authService.login(this.credentials);
        if(success) {
            this.router.navigateByUrl("/home");
        }
    }
}