import { sha512 } from 'js-sha512';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
    public preview: string;
    public user: UserModel;
    public oldPassword: string;
    public oldImage;
    constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

    async ngOnInit() {
        try {
            const id = +this.activatedRoute.snapshot.params.useID;
            this.user = new UserModel();
            this.user = await this.authService.getOneUser(id);
            this.oldPassword = this.user.password;
            this.user.password = null;
            this.oldImage = this.user.imageFileName;

        }
        catch (err) {
            alert(err.message);

        }
    }

    public async updateUser() {
        try {
            if (this.user.password == null) {
                this.user.password = this.oldPassword;
            }
            else {
                this.user.password = sha512.create().update(this.user.password).hex().toUpperCase();

            }

            const updatedUser = await this.authService.updateUser2(this.user, this.user.image != null);
            this.router.navigateByUrl("/home");
        }
        catch (err) {
            alert(err.message);
        }
    }

    public displayPreview(image: File): void {
        this.user.image = image;
        const fileReader = new FileReader();
        fileReader.onload = args => this.preview = args.target.result.toString();
        fileReader.readAsDataURL(image);
    }
}