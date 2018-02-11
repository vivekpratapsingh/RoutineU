import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';
import { UserService } from '../../../../services/user.service';

@Component({
    template : `<ion-list>
                    <ion-list-header>
                        Goal Weight
                        <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
                    </ion-list-header>
                        <ion-item>
                        <ion-input type="number" [(ngModel)]="goalWeight"></ion-input> on
                        <ion-label fixed>Kg</ion-label>
                        </ion-item>
                        <button ion-button small  (click)="saveGoalWeight()" style="float:right">Save</button>
                </ion-list>`
})
export class UpdateGoalWeightComponent{

    goalWeight : any
    user : any;
    constructor(private viewCtrl : ViewController,private navParams : NavParams,private userService : UserService){
        this.user = this.navParams.data.user;
        this.goalWeight = this.user.goal.goal_weight;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveGoalWeight(){
        this.user.goal.goal_weight = this.goalWeight;
        this.userService.updateUserDetail(this.user,this.user._id)
                            .subscribe(result => {});
        
        console.log(this.user);                    
        this.viewCtrl.dismiss();
    }
}