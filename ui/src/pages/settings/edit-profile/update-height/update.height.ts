import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';

@Component({
    template : `<ion-list>
    <ion-list-header>
    Height
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

    constructor(public viewCtrl : ViewController,public navParams : NavParams){
        this.user = this.navParams.data.user;
        this.height = this.user.height;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveHeight(){
        console.log('save name clicked');
        
        this.user.height = this.height;
        console.log(this.user.height);
        this.viewCtrl.dismiss();
    }
} 