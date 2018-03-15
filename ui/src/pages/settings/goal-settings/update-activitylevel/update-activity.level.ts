import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';
import { UserService } from '../../../../services/user.service';
import * as CalorieUpdater from '../goal-settings.common';

@Component({
    template : `<ion-list>
                    <ion-list-header>
                        Set Your Activity Level
                        <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
                    </ion-list-header>
                        <ion-item>
                            <ion-select style="max-width:100%" [(ngModel)]="activityLevel">
                                <ion-option value="Not Very Active">Not Very Active</ion-option>
                                <ion-option value="Lightly Active">Lightly Active</ion-option>
                                <ion-option value="Active">Active</ion-option>
                                <ion-option value="Very Active">Very Active</ion-option>
                            </ion-select>
                        </ion-item>
                        <button ion-button small  (click)="saveActivityLevel()" style="float:right">Save</button>
                </ion-list>`
})
export class UpdateActivityLevelComponent{

    activityLevel : any
    user : any;
    constructor(private viewCtrl : ViewController,private navParams : NavParams,private userService : UserService){
        this.user = this.navParams.data.user;
        this.activityLevel = this.user.activity_level;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveActivityLevel(){
        this.user.activity_level = this.activityLevel;
        this.user = CalorieUpdater.updateUserCalories(this.user);
        this.userService.updateUserDetail(this.user,this.user._id)
                            .subscribe(result => {this.viewCtrl.dismiss();});
        
        console.log(this.user);                    
        
    }
}