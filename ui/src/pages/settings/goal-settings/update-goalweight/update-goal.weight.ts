import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { UserService } from '../../../../services/user.service';
import { Calculator } from '../../../../helpers/calculator';
import * as CalorieUpdater from '../goal-settings.common';

@Component({
    template: `<ion-list>
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
export class UpdateGoalWeightComponent {

    goalWeight: any = 0;
    user: any;
    constructor(private viewCtrl: ViewController, private navParams: NavParams, private userService: UserService) {
        this.user = this.navParams.data.user;
        if (this.user.logs.goal.weight.length > 0) {
            this.goalWeight = this.user.logs.goal.weight[this.user.logs.goal.weight.length - 1].weight;
        }
    }

    close() {
        this.viewCtrl.dismiss();
    }

    saveGoalWeight() {
        this.user.logs.goal.weight.push({ weight: this.goalWeight });
        this.user = CalorieUpdater.updateUserCalories(this.user);
        // let weekly_goal = this.user.logs.goal.weekly_goal.length > 0 ? this.user.logs.goal.weekly_goal[this.user.logs.goal.weekly_goal.length - 1].goal : "Maintain my current weight";
        // let calorieGoal = Calculator.getCalorieGoal(this.user.height, this.user.weight.current.weight, this.user.birthday,
        //     this.user.activity_level, this.user.gender, weekly_goal);
        // this.user.logs.goal.calories.push({ calories: calorieGoal == undefined ? 0 : calorieGoal.goal });
        // let macros = Calculator.getMacrosFromCalories(this.user.logs.goal.calories[this.user.logs.goal.calories.length - 1].calories,
        //     { carbohydrate: this.user.macros_percentage.carbohydrate, protein: this.user.macros_percentage.protein, fat: this.user.macros_percentage.fat });
        // this.user.logs.goal.macros.push({ macros: { carbohydrate: macros.carbohydrate, protein: macros.protein, fat: macros.fat } });
        this.userService.updateUserDetail(this.user, this.user._id)
            .subscribe(result => {
                this.viewCtrl.dismiss();
            });

        console.log(this.user);

    }
}