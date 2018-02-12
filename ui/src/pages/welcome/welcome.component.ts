import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Slides } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.serveice';
import { Collections } from '../../common/collections';
import { Calculator } from '../../helpers/calculator';

@Component({
    templateUrl: 'welcome.component.html',
    styleUrls: ['/welcome.component.scss']
})
export class WelcomeComponent {
    @ViewChild(Slides) slides: Slides;
    user: any;
    localUser: any;
    birthday: any;
    starting_date: any;
    height_numbers: any;
    weight_numbers: any;
    activity_levels: any;
    weekly_goals: any;
    calorieGoal: any;
    bmi: number;
    constructor(public sharedService: DataService, private userService: UserService,
        private router: Router) {
        this.user = this.sharedService.sharedData;
        if (this.user) {
            let b = new Date(this.user.birthday);
            this.birthday = new Date(b.setTime(b.getTime() + 1 * 86400000)).toISOString();
            let a = new Date(this.user.goal.starting.date);
            this.starting_date = new Date(a.setTime(a.getTime() + 1 * 86400000)).toISOString();
        }
        this.localUser = this.user;
        this.height_numbers = Collections.generateIntNumbers(250);
        this.weight_numbers = Collections.generateFloorNumbers(150);
        this.activity_levels = Collections.ActivityLevel;
        this.weekly_goals = Collections.WeeklyGoal;
    }

    updateUserDetails() {
        this.user = this.localUser;
        this.slides.slideTo(this.slides.getActiveIndex() + 1);
    }

    saveUserDetails() {
        this.user = this.localUser;
        let b = new Date(this.birthday);
        this.user.birthday = new Date(b.setTime(b.getTime() - 1 * 86400000)).toLocaleDateString();
        let a = new Date(this.starting_date);
        this.user.goal.starting.date = new Date(a.setTime(a.getTime() - 1 * 86400000)).toLocaleDateString();
        this.user.goal.calories = this.calorieGoal == undefined ? 0 : this.calorieGoal.goal;
        this.userService.updateUserDetail(this.user, this.user._id)
            .subscribe(result => {
                this.user = result;
                if (this.slides.isEnd()) {
                    this.sharedService.sharedData = this.user;
                    this.router.navigate(['/home']);
                }
            });
    }

    nextSlide() {
        this.slides.slideTo(this.slides.getActiveIndex() + 1);
    }
    calculateCalorie() {
        if (this.localUser.gender != "" && this.localUser.birthday != '' && this.localUser.height != 0 && this.localUser.weight != 0 && this.localUser.goal.goal_weight != 0) {
            this.bmi = Calculator.getBMI(this.localUser.height, this.localUser.weight);
            this.calorieGoal = Calculator.getCalorieGoal(this.localUser.height, this.localUser.weight, this.localUser.birthday,
                this.localUser.activity_level, this.localUser.gender, this.localUser.goal.weekly_goal);
        }
    }
}