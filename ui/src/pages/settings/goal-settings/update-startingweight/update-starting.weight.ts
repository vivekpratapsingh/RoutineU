import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';
import { UserService } from '../../../../services/user.service';

@Component({
    template: `<ion-list>
                    <ion-list-header>
                        Starting Weight
                        <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
                    </ion-list-header>
                        <ion-item>
                        <ion-input type="number" [(ngModel)]="startingtWeight"></ion-input> on
                        <ion-label fixed>Kg</ion-label>
                        </ion-item>
                        <ion-item>
                        <ion-label fixed>on</ion-label>
                        <ion-datetime displayFormat="MMM DD, YYYY"  [(ngModel)]="staritngWeightDate"></ion-datetime>
                        </ion-item>
                        <button ion-button small  (click)="saveStartingWeight()" style="float:right">Save</button>
                </ion-list>`
})
export class UpdateStartingWeightComponent{

    startingtWeight : any;
    staritngWeightDate : any;
    user : any;
    constructor(private viewCtrl : ViewController,private navParams : NavParams,private userService : UserService){
        this.user = this.navParams.data.user;
        let a  = new Date(this.user.goal.starting.date);
        this.staritngWeightDate = new Date(a.setTime(a.getTime() + 1 * 86400000)).toISOString();
        this.startingtWeight = this.user.goal.starting.weight;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveStartingWeight(){
        let a  = new Date(this.staritngWeightDate);
        this.user.goal.starting.date = new Date(a.setTime(a.getTime() - 1 * 86400000)).toLocaleDateString();
        this.user.goal.starting.weight = this.startingtWeight;
        this.userService.updateUserDetail(this.user,this.user._id)
                            .subscribe(result => {});
        
        console.log(this.user);                    
        this.viewCtrl.dismiss();
    }
}