import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { UserService } from '../../../../services/user.service';
import * as CalorieUpdater from '../../goal-settings/goal-settings.common';

@Component({
    template: `<ion-list>
    <ion-list-header>
    Date Of Birth
        <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
    </ion-list-header>
    <ion-item>
        <ion-datetime displayFormat="MMM DD, YYYY"  [(ngModel)]="birthday"></ion-datetime>
    </ion-item>
        <button ion-button small  (click)="saveDOB()" style="float:right">Save</button>
</ion-list>`
})
export class UpdateDOBComponent {
    user: any;
    birthday: any;

    constructor(public viewCtrl: ViewController, public navParams: NavParams, private userService: UserService) {
        this.user = this.navParams.data.user;
        let a = new Date(this.user.birthday);
        this.birthday = new Date(a.setTime(a.getTime() + 1 * 86400000)).toISOString();
        console.log(this.birthday);
    }

    close() {
        this.viewCtrl.dismiss();
    }

    saveDOB() {
        console.log('save dob clicked');
        let a = new Date(this.birthday);
        this.user.birthday = new Date(a.setTime(a.getTime() - 1 * 86400000)).toLocaleDateString();
        this.user = CalorieUpdater.updateUserCalories(this.user);
        this.userService.updateUserDetail(this.user, this.user._id)
            .subscribe(result => { this.viewCtrl.dismiss(); });

    }
} 