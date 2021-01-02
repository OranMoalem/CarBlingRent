import { BranchesService } from './../../services/branches.service';
import { BranchModel } from './../../../models/branch.model';
import { store } from './../../redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-branches',
    templateUrl: './branches.component.html',
    styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit, OnDestroy {

    public branches = store.getState().branches;
    private unsubscribe: Unsubscribe;
    constructor(private branchesService: BranchesService) { }

    public async ngOnInit() {
        this.unsubscribe = store.subscribe(() => this.branches = store.getState().branches);
        if (store.getState().branches.length == 0) {
            await this.branchesService.loadAllBranchesFromServerAsync();
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribe();
    }
}
