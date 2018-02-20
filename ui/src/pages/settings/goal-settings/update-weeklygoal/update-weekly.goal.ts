import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { UserService } from '../../../../services/user.service';
import * as CalorieUpdater from '../goal-settings.common';

@Component({
    template: `<ion-list>
                <ion-list-header>
                    Set Your Weekly goal
                    <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
                </ion-list-header>
                    <ion-item>
                        <ion-select style="max-width:100%" [(ngModel)]="weeklyGoal">
                            <ion-option value="Lose 1 kg per week">Lose 1 kg per week</ion-option>
                            <ion-option value="Lose 0.75 kg per week">Lose 0.75 kg per week</ion-option>
                            <ion-option value="Lose 0.5 kg per week">Lose 0.5 kg per week</ion-option>
                            <ion-option value="Lose 0.25 kg per week">Lose 0.25 kg per week</ion-option>
                            <ion-option value="Maintain my current weight">Maintain my current weight</ion-option>
                            <ion-option value="Gain 0.25 kg per week">Gain 0.25 kg per week</ion-option>
                            <ion-option value="Gain 0.5 kg per week">Gain 0.5 kg per week</ion-option>
                        </ion-select>
                    </ion-item>
                    <button ion-button small  (click)="saveWeeklyGoal()" style="float:right">Save</button>
            </ion-list>`
})
export class UpdateWeeklyGoalComponent {

    weeklyGoal: any;
    user: any;
    constructor(private viewCtrl: ViewController, private navParams: NavParams, private userService: UserService) {
        this.user = this.navParams.data.user;
        if (this.user.logs.goal.weekly_goal.length > 0) {
            this.weeklyGoal = this.user.logs.goal.weekly_goal[this.user.logs.goal.weekly_goal.length - 1].goal
        }
    }

    close() {
        this.viewCtrl.dismiss();
    }
    saveWeeklyGoal() {
        this.user.logs.goal.weekly_goal.push({ goal: this.weeklyGoal });
        this.user = CalorieUpdater.updateUserCalories(this.user);
        this.userService.updateUserDetail(this.user, this.user._id)
            .subscribe(result => { this.viewCtrl.dismiss(); });

        console.log(this.user);

    }
}