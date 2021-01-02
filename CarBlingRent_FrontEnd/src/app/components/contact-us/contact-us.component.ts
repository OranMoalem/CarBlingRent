import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

    contactusform: any;

    constructor(private formbulider: FormBuilder, private dialogContactUS: MatDialog) {
        this.contactusform = this.formbulider.group({
            // Check that this fields has been inserted
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
            reason: ['', [Validators.required]],
            msg: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
    }
}
