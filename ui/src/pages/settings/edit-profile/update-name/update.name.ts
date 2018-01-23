import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';

@Component({
    template : `
        
            <ion-list>
                <ion-list-header>
                Full Name
                    <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
                </ion-list-header>
                <ion-item>
                    <ion-input type="text" [(ngModel)]="name"></ion-input>
                    </ion-item>
                    <button ion-button small  (click)="saveName()" style="float:right">Save</button>
            </ion-list>
    `,
})
export class UpdateNameComponent{

    user : any;
    name : any;

    constructor(public viewCtrl : ViewController,public navParams : NavParams){
        this.user = this.navParams.data.user;
        this.name = this.user.name;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveName(){
        console.log('save name clicked');
        
        this.user.name = this.name;
        console.log(this.user.name);
    }
}