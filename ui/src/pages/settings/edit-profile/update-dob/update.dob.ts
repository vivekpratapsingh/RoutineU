import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';

@Component({
    template : `<ion-list>
    <ion-list-header>
    Date Of Birth
        <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
    </ion-list-header>
    <ion-item>
        <ion-datetime displayFormat="MMM DD, YYYY"  [(ngModel)]="dob"></ion-datetime>
    </ion-item>
        <button ion-button small  (click)="saveDOB()" style="float:right">Save</button>
</ion-list>`
})
export class UpdateDOBComponent{
    user : any;
    dob : any;

    constructor(public viewCtrl : ViewController,public navParams : NavParams){
        this.user = this.navParams.data.user;
        let a  = new Date(this.user.dateOfBirth);
        this.dob = new Date(a.setTime(a.getTime() + 1 * 86400000)).toISOString();
        console.log(this.dob);
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveDOB(){
        console.log('save dob clicked');
        let a  = new Date(this.dob);
        this.user.dateOfBirth = new Date(a.setTime(a.getTime() - 1 * 86400000)).toLocaleDateString();
        console.log(this.user.dateOfBirth);
        this.viewCtrl.dismiss();
    }
} 