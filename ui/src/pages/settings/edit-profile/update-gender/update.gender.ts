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
        <ion-select [(ngModel)]="gender">
            <ion-option value="male">Male</ion-option>
            <ion-option value="female">Female</ion-option>
        </ion-select></ion-item>
        <button ion-button small  (click)="saveGender()" style="float:right">Save</button>
</ion-list>`
})
export class UpdateGenderComponent{
    user : any;
    gender : any;

    constructor(public viewCtrl : ViewController,public navParams : NavParams,private userService : UserService){
        this.user = this.navParams.data.user;
        this.gender = this.user.gender;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveGender(){
        console.log('save gender clicked');
        this.user.gender = this.gender;
        this.userService.updateUserDetail(this.user,this.user._id)
                            .subscribe(result => {});
        console.log(this.user.gender);
        this.viewCtrl.dismiss();
    }
} 