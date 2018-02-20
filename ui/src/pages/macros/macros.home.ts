import {Component} from '@angular/core';
import {NavParams,NavController,PopoverController} from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { UpdateCalorieComponent } from './update-calories/update.calories';
import { UpdateMacrosComponent } from './update-macros/update.macros';

@Component({
    templateUrl :'macros.home.html',
    styleUrls : ['/macros.home.scss']
})
export class MacrosHomeComponent{

    user : any;
    carbs: any = {
        percentage : Number,
        amount : Number
    };
    protein: any= {
        percentage : Number,
        amount : Number
    };
    fat: any= {
        percentage : Number,
        amount : Number
    };
    goalCalories : any = 0;
    constructor(private navParams : NavParams,private navCrl : NavController,
                    private popoverCtrl : PopoverController,private userService : UserService){
        this.user = this.navParams.data.user;
        let userMacrosPercentage = this.user.macros_percentage;
        if(this.user.logs.goal.macros.length > 0){
            let macrosLen = this.user.logs.goal.macros.length - 1;
            let macrosLastElem = this.user.logs.goal.macros[macrosLen].macros;
            console.log(macrosLastElem);
            this.carbs = {
                amount : macrosLastElem.carbohydrate
            };
            this.protein = {
                amount : macrosLastElem.protein
            };
            this.fat = {
                amount : macrosLastElem.fat
            };
        }
        this.carbs.percentage = userMacrosPercentage.carbohydrate;
        this.protein.percentage = userMacrosPercentage.protein;
        this.fat.percentage = userMacrosPercentage.fat;
        if(this.user.logs.goal.calories.length > 0){
            this.goalCalories = this.user.logs.goal.calories[this.user.logs.goal.calories.length - 1].calories;
        }
        console.log(this.carbs.amount);
    }

    //update calorie count
    updateCalories(){
        let popover = this.popoverCtrl.create(UpdateCalorieComponent, {
            user: this.user
        });
        popover.present();
    }

    //update macros
    updateMacros(){
        let popover = this.popoverCtrl.create(UpdateMacrosComponent, {
            user: this.user
        });
        popover.present();
    }
}