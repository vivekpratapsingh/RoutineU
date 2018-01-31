import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';

@Component({
    template : `<ion-list>
    <ion-list-header>
    Country
        <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
    </ion-list-header>
    <ion-item>
        <ion-select [(ngModel)]="country">
            <ion-option value="india">India</ion-option>
            <ion-option value="australia">Australia</ion-option>
            <ion-option value="nepal">Nepal</ion-option>
        </ion-select>
    </ion-item>
        <button ion-button small  (click)="saveCountry()" style="float:right">Save</button>
</ion-list>`
})
export class UpdateCountryComponent{
    user : any;
    country : any;

    constructor(public viewCtrl : ViewController,public navParams : NavParams){
        this.user = this.navParams.data.user;
        this.country = this.user.country;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveCountry(){
        console.log('save country clicked');
        
        this.user.country = this.country;
        console.log(this.user.country);
        this.viewCtrl.dismiss();
    }
} 