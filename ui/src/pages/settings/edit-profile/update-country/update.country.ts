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
        <ion-select [(ngModel)]="country">
            <ion-option value="India">India</ion-option>
            <ion-option value="Australia">Australia</ion-option>
            <ion-option value="Nepal">Nepal</ion-option>
        </ion-select>
    </ion-item>
        <button ion-button small  (click)="saveCountry()" style="float:right">Save</button>
</ion-list>`
})
export class UpdateCountryComponent{
    user : any;
    country : any;

    constructor(public viewCtrl : ViewController,public navParams : NavParams,private userService : UserService){
        this.user = this.navParams.data.user;
        this.country = this.user.location.country;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveCountry(){
        console.log('save country clicked');
        
        this.user.location.country = this.country;
        this.userService.updateUserDetail(this.user,this.user._id)
                        .subscribe(result => {});

        console.log(this.user.country);
        this.viewCtrl.dismiss();
    }
} 