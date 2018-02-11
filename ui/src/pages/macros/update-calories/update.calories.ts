import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { UserService } from '../../../services/user.service';

@Component({
    template: `<ion-list>
                    <ion-list-header>
                        Net Calorie Gaol
                        <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
                    </ion-list-header>
                        <ion-item>
                        <ion-input type="number" [(ngModel)]="calories"></ion-input> on
                        <ion-label fixed>calories/day</ion-label>
                        </ion-item>
                        <button ion-button small  (click)="updateCalories()" style="float:right">Save</button>
                </ion-list>`,
})
export class UpdateCalorieComponent {
    user: any;
    calories: any
    constructor(private navParams: NavParams, private viewCtrl: ViewController,
        private userService: UserService) {
        this.user = this.navParams.data.user;
        this.calories = this.user.goal.calories;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    updateCalories() {
        this.user.goal.calories = this.calories;
        this.userService.updateUserDetail(this.user, this.user._id)
            .subscribe(result => { });

        console.log(this.user);
        this.viewCtrl.dismiss();
    }
}