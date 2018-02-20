import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';
import { UserService } from '../../../../services/user.service';
import * as CalorieUpdater from '../goal-settings.common';

@Component({
    template : `<ion-list>
                    <ion-list-header>
                        Current Weight
                        <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
                    </ion-list-header>
                        <ion-item>
                        <ion-input type="number" [(ngModel)]="currentWeight"></ion-input> on
                        <ion-label fixed>Kg</ion-label>
                        </ion-item>
                        <button ion-button small  (click)="saveCurrentWeight()" style="float:right">Save</button>
                </ion-list>`
})
export class UpdateCurrentWeightComponent{

    currentWeight : any
    user : any;
    constructor(private viewCtrl : ViewController,private navParams : NavParams,private userService : UserService){
        this.user = this.navParams.data.user;
        console.log(this.user);
        this.currentWeight = this.user.weight.current.weight;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveCurrentWeight(){
        this.user.logs.weight.push({weight : this.user.weight.current.weight,added : this.user.weight.current.added});
        this.user.weight.current.weight = this.currentWeight;
        this.user.weight.current.added = new Date();
        this.user = CalorieUpdater.updateUserCalories(this.user);
        this.userService.updateUserDetail(this.user,this.user._id)
                            .subscribe(result => {this.viewCtrl.dismiss();});
        
        console.log(this.user);                    
        
    }
}