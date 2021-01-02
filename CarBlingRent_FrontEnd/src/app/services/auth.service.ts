import { environment } from 'src/environments/environment';
import { CredentialsModel } from './../../models/credentials.model';
import { UserModel } from 'src/models/user.model';
import { store } from './../redux/store';
import { ActionType } from './../redux/action-type';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }
    public async loadAllUsersFromServerAsync(): Promise<boolean> {
        try {
            const users = await this.http.get<UserModel[]>(environment.baseUrl+"/auth").toPromise();
            store.dispatch({ type: ActionType.GetAllUsers, payload: users });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async addUserToServer(user: UserModel, isImageAdded: boolean): Promise<boolean> {
        try {
            const formData = new FormData();
            formData.append("fullName", user.fullName);
            formData.append("identityCard", user.identityCard);
            formData.append("userName", user.userName);
            formData.append("gender", user.gender);
            formData.append("email", user.email);
            formData.append("password", user.password);
            if (isImageAdded) {
                formData.append("image", user.image, user.imageFileName);
            }
            if (user.dateOfBirth != null) {
                var datestr = (new Date(user.dateOfBirth)).toISOString().slice(0, 10);
                formData.append("dateOfBirth", datestr);
            }
            const registeredUser = await this.http.post<UserModel>(environment.baseUrl+"/auth" + "/register", formData).toPromise();
            store.dispatch({ type: ActionType.Register, payload: registeredUser });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async login(credentials: CredentialsModel): Promise<boolean> {
        try {
            const loggedInUser = await this.http.post<UserModel>(environment.baseUrl+"/auth" + "/login", credentials).toPromise();
            store.dispatch({ type: ActionType.Login, payload: loggedInUser });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async updateUser(user: UserModel): Promise<boolean> {
        try {
            const updatedUser = await this.http.patch<UserModel>(environment.baseUrl+"/auth" + "/" + user.id, user).toPromise();
            store.dispatch({ type: ActionType.UpdateUser, payload: updatedUser });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async updateUser2(user: UserModel, isImageAdded: boolean): Promise<boolean> {
        try {
            const formData = new FormData();
            formData.append("fullName", user.fullName);
            formData.append("identityCard", user.identityCard);
            formData.append("userName", user.userName);
            formData.append("gender", user.gender);
            formData.append("email", user.email);
            formData.append("password", user.password);
            formData.append("role", user.role);
            if (isImageAdded) {
                formData.append("image", user.image, user.imageFileName);
            }
            if (user.dateOfBirth != null) {
                var datestr = (new Date(user.dateOfBirth)).toISOString().slice(0, 10);
                formData.append("dateOfBirth", datestr);
            }
            const updatedUser = await this.http.patch<UserModel>(environment.baseUrl+"/auth" + "/" + user.id, formData).toPromise();
            store.dispatch({ type: ActionType.UpdateUser, payload: updatedUser });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async getOneUser(id: number): Promise<UserModel> {
        const observable = this.http.get<UserModel>(environment.baseUrl+"/auth" + "/" + id);
        return observable.toPromise();
    }

    public deleteUser(id: number): Promise<undefined> {
        const observable = this.http.delete<undefined>(environment.baseUrl+"/auth" + "/" + id);
        return observable.toPromise();
    }

    public logout(): void {
        store.dispatch({ type: ActionType.Logout });
    }
}