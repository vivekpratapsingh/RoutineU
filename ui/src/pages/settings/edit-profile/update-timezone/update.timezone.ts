import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';
import { UserService } from '../../../../services/user.service';

@Component({
    template : `<ion-list>
    <ion-list-header>
    Country
        <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
    </ion-list-header>
    <ion-item>
        <ion-select [(ngModel)]="timezone">
            <ion-option value="5.5">GMT+5.5</ion-option>
            <ion-option value="6.5">GMT+6.5</ion-option>
            <ion-option value="7.5">GMT+7.5</ion-option>
        </ion-select>
    </ion-item>
        <button ion-button small  (click)="saveTimezone()" style="float:right">Save</button>
</ion-list>`
})
export class UpdateTimeZoneComponent{
    user : any;
    timezone : any;

    constructor(public viewCtrl : ViewController,public navParams : NavParams,private userService : UserService){
        this.user = this.navParams.data.user;
        this.timezone = this.user.timezone;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveTimezone(){
        console.log('save timezone clicked');
        
        this.user.timezone = this.timezone;
        this.userService.updateUserDetail(this.user,this.user._id)
                        .subscribe(result => {});
        console.log(this.user.timezone);
        this.viewCtrl.dismiss();
    }
} 