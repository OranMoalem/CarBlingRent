import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';
import { store } from './../../redux/store';
import { UserModel } from 'src/models/user.model';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
    public users: UserModel[];
    private unsubscribe: Unsubscribe;
    constructor(private authService: AuthService) { }

    async ngOnInit() {
        this.unsubscribe = store.subscribe(() => {
            this.users = store.getState().users;
        });
        try {
            await this.authService.loadAllUsersFromServerAsync();
        }
        catch (err) {
            alert(err.message);
        }
    }

    public async deleteUser(id: number) {
        try {
            await this.authService.deleteUser(id);
            alert("User has been deleted !");
            const index = this.users.findIndex(p => p.id === id);
            this.users.splice(index, 1);
        }
        catch (err) {
            alert(err.message);
        }
    }
    ngOnDestroy(): void {
        this.unsubscribe();
    }
}