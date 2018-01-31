import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';

@Component({
    template : `<ion-list>
    <ion-list-header>
    Country
        <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
    </ion-list-header>
    <ion-item>
        <ion-select [(ngModel)]="timezone">
            <ion-option value="chennai">Chennai</ion-option>
            <ion-option value="melbourne">Melbourne</ion-option>
            <ion-option value="nepal">Nepal</ion-option>
        </ion-select>
    </ion-item>
        <button ion-button small  (click)="saveTimezone()" style="float:right">Save</button>
</ion-list>`
})
export class UpdateTimeZoneComponent{
    user : any;
    timezone : any;

    constructor(public viewCtrl : ViewController,public navParams : NavParams){
        this.user = this.navParams.data.user;
        this.timezone = this.user.timezone;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveTimezone(){
        console.log('save timezone clicked');
        
        this.user.timezone = this.timezone;
        console.log(this.user.timezone);
        this.viewCtrl.dismiss();
    }
} 