import { environment } from 'src/environments/environment';
import { BranchModel } from './../../models/branch.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { store } from './../redux/store';
import { ActionType } from './../redux/action-type';

@Injectable({
    providedIn: 'root'
})
export class BranchesService {
    constructor(private httpClient: HttpClient) { }

    public async loadAllBranchesFromServerAsync(): Promise<boolean> {
        try {
            const branches = await this.httpClient.get<BranchModel[]>(environment.baseUrl+"/branches").toPromise();
            store.dispatch({ type: ActionType.GetAllBranches, payload: branches });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }

    public async addBranchToServer(branch: BranchModel): Promise<boolean> {
        try {
            const addedBranch = await this.httpClient.post<BranchModel>(environment.baseUrl+"/branches", branch).toPromise();
            store.dispatch({ type: ActionType.AddBranch, payload: addedBranch });
            return true;
        }
        catch (httpErrorResponse) {
            store.dispatch({ type: ActionType.GotError, payload: httpErrorResponse });
            return false;
        }
    }
}