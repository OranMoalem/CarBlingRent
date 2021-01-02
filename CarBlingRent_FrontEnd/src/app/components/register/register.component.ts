import { AuthService } from './../../services/auth.service';
import { UserModel } from 'src/models/user.model';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public user = new UserModel();
    public preview:string; // Preview of the user's image
    hide = true;

    // Only users aged 18 and over can register on the site
    minDate: Date = new Date(Date.now());
    maxDate: Date = new Date(Date.now());

     // Check that this fields has been inserted
    genderControl = new FormControl('', Validators.required);
  
   
    constructor(private authService: AuthService, private router: Router
      ) { 
        this.minDate.setDate(this.minDate.getDate());
        this.minDate.setFullYear(this.minDate.getFullYear() - 80);
        // setting the calendar's start date and youngest birth dates for > 18 years old
        this.maxDate.setDate(this.maxDate.getDate());
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);}

    public displayPreview(image:File):void {
        this.user.image = image;
        const fileReader = new FileReader();
        fileReader.onload = args => this.preview = args.target.result.toString();
        fileReader.readAsDataURL(image);
    }

    public async register() {
        const success = await this.authService.addUserToServer(this.user,this.user.image!= null );
        if(success) {
            this.router.navigateByUrl("/home");
        }
    }
}