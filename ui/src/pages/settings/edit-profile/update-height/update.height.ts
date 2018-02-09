import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';
import { UserService } from '../../../../services/user.service';

@Component({
    template : `<ion-list>
    <ion-list-header>
    Height(in cm)
        <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
    </ion-list-header>
    <ion-item>
        <ion-input type="number" placeholder="cm" [(ngModel)]="height"></ion-input>
        </ion-item>
        <button ion-button small  (click)="saveHeight()" style="float:right">Save</button>
</ion-list>`
})
export class UpdateHeightComponent{
    user : any;
    height : any;

    constructor(public viewCtrl : ViewController,public navParams : NavParams,private userService : UserService){
        this.user = this.navParams.data.user;
        this.height = this.user.height == undefined?0:this.user.height;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveHeight(){
        console.log('save name clicked');
        
        this.user.height = this.height;
        this.userService.updateUserDetail(this.user,this.user._id)
                        .subscribe(result => {});
        console.log(this.user.height);
        this.viewCtrl.dismiss();
    }
} 