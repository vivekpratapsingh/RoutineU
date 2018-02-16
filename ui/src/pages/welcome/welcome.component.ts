import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Slides } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.serveice';
import { Collections } from '../../common/collections';
import { Calculator } from '../../helpers/calculator';

@Component({
    templateUrl: 'welcome.component.html',
    styleUrls: ['/welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
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
    current_weight: number;
    goal_weight: number = 0;
    weekly_goal: any;

    constructor(public sharedService: DataService, private userService: UserService,
        private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.user = this.route.snapshot.data['user'];
        console.log(this.user);
        if (this.user) {
            let b = new Date(this.user.birthday);
            this.birthday = new Date(b.setTime(b.getTime() + 1 * 86400000)).toISOString();
            let a = new Date(this.user.weight.initial.added);
            this.starting_date = new Date(a.setTime(a.getTime() + 1 * 86400000)).toISOString();
        }
        this.localUser = this.user;
        this.height_numbers = Collections.generateIntNumbers(250);
        this.weight_numbers = Collections.generateFloorNumbers(150);
        this.activity_levels = Collections.ActivityLevel;
        this.weekly_goals = Collections.WeeklyGoal;
        if (this.user.logs != undefined && this.user.logs.goal != undefined &&
            this.user.logs.goal.weight[0] != undefined && this.user.logs.goal.weight[0] != undefined) {
            this.goal_weight = this.user.logs.goal.weight[this.user.logs.goal.weight.length - 1];
        }
        if (this.user.logs != undefined && this.user.logs.goal != undefined &&
            this.user.logs.goal.weekly_goal[0] != undefined && this.user.logs.goal.weekly_goal[0] != undefined) {
            this.weekly_goal = this.user.logs.goal.weekly_goal[this.user.logs.goal.weekly_goal.length - 1];
        }
    }

    updateUserDetails() {
        this.user = this.localUser;
        let a = new Date(this.starting_date);
        this.user.weight.initial.added = new Date(a.setTime(a.getTime() - 1 * 86400000)).toLocaleDateString();
        if (this.slides.isEnd()) {
            this.user.logs.goal.weight.push({ weight: this.goal_weight });
        }
        console.log(this.user);
        this.slides.slideTo(this.slides.getActiveIndex() + 1);
    }

    saveUserDetails() {
        this.user = this.localUser;
        let b = new Date(this.birthday);
        this.user.birthday = new Date(b.setTime(b.getTime() - 1 * 86400000)).toLocaleDateString();
        let a = new Date(this.starting_date);
        this.user.weight.initial.added = new Date(a.setTime(a.getTime() - 1 * 86400000)).toLocaleDateString();
        console.log(this.user);
        this.user.logs.goal.calories.push({calories : this.calorieGoal == undefined ? 0 : this.calorieGoal.goal});

        let macros = Calculator.getMacrosFromCalories(this.user.logs.goal.calories[this.user.logs.goal.calories.length - 1].calories,
            { carbohydrate: this.user.macros_percentage.carbohydrate, protein: this.user.macros_percentage.protein, fat: this.user.macros_percentage.fat });
        this.user.logs.goal.macros.push({macros :{carbohydrate : macros.carbohydrate,protein:macros.protein,fat:macros.fat}});
        this.user.logs.goal.weekly_goal.push({ goal: this.weekly_goal });
        this.user.logs.goal.weight.push({ weight: this.goal_weight });
        console.log(this.user);
        this.userService.updateUserDetail(this.user, this.user._id)
            .subscribe(result => {
                this.user = result;
                if (this.slides.isEnd()) {
                    this.sharedService.sharedData = this.user;
                    this.router.navigate(['/home', this.user._id]);
                }
            });
    }

    nextSlide() {
        this.slides.slideTo(this.slides.getActiveIndex() + 1);
    }
    calculateCalorie() {
        if (this.localUser.gender != "" && this.localUser.birthday != '' && this.localUser.height != 0 && this.localUser.weight.current.weight != 0 && this.goal_weight != 0) {
            this.bmi = Calculator.getBMI(this.localUser.height, this.localUser.weight.current.weight);
            this.calorieGoal = Calculator.getCalorieGoal(this.localUser.height, this.localUser.weight.current.weight, this.localUser.birthday,
                this.localUser.activity_level, this.localUser.gender, this.weekly_goal);
        }
    }
}