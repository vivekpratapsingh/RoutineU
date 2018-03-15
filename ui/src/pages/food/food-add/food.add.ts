import { Component } from '@angular/core';
import { NavParams, PopoverController, NavController, Events, ToastController } from 'ionic-angular';
import { AddFoodQuantityComponent } from './food-add-quantity/food-add.quantity';
import { DataService } from '../../../services/data.serveice';
import { Calculator } from '../../../helpers/calculator';
import { UserService } from '../../../services/user.service';
import { DiaryComponent } from '../../diary/diary';

@Component({
    templateUrl: 'food.add.html',
    styleUrls: ['/food.add.scss']
})
export class AddFoodComponent {
    food: any;
    nutritionDetail: any;
    title: string;
    mealOption: string;
    servings: number;
    user: any;
    addedFood: any;
    foodItem: any;
    date : any;
    userGoal : any;
    constructor(private popoverCtrl: PopoverController, private navParams: NavParams, private events: Events,
        private navCtrl: NavController, private sharedService: DataService, private userService: UserService,
        private toastCtrl: ToastController) {
        if (this.navParams.data.foodItem != undefined) {
            this.food = this.navParams.data.foodItem;
        }
        if (this.navParams.data.addedFood != undefined) {
            this.addedFood = this.navParams.data.addedFood;
        }
        this.user = this.navParams.data.user;
        this.date = this.navParams.data.date;
        console.log(this.user);

        if (this.food != null || this.food != undefined) {
            this.foodItem = this.initFoodItem(this.food, this.navParams.data.mealOption, this.food.quantity[0].serving_size.size.amount,
                this.food.quantity[0].serving_size.size.unit, 1);
        }
        if (this.addedFood != null || this.addedFood != undefined) {
            this.foodItem = this.initFoodItem(this.addedFood.food, this.addedFood.mealOption, this.addedFood.servings.size.amount,
                this.addedFood.servings.size.unit, this.addedFood.servings.quantity);
        }
        console.log(this.foodItem);
        this.nutritionDetail = false;
        this.servings = 1;
        this.setPageTitle();
        this.getUserGoalLogByDate();
    }

    updateQuantity() {
        let popover = this.popoverCtrl.create(AddFoodQuantityComponent, {
            food: this.foodItem
        });
        popover.present();
    }

    showNutrition(option) {
        switch (option) {
            case 'enable':
                this.nutritionDetail = true;
                break;
            case 'disable':
                this.nutritionDetail = false;
                break;
        }
    }

    initFoodItem(food: any, mealOption: string, amount: number, unit: string, quantity: number) {
        let Item = {
            food: food,
            mealOption: mealOption,
            servings: {
                size: {
                    amount: amount,
                    unit: unit
                },
                quantity: quantity
            },
            nutrients: Calculator.getFoodNutrientByQuantity(amount, unit, food, quantity)
        };
        return Item;
    }

    setPageTitle() {
        let previousPage = this.navCtrl.last().component.name;
        if (previousPage == 'FoodSearchComponent') {
            this.title = "Add Food";
        }
        else {
            this.title = "Edit Entry";
        }
    }

    addFood() {
        console.log(this.addedFood);
        if (this.addedFood != undefined) {
            this.addedFood.servings = this.foodItem.servings;
            this.addedFood.added = this.date;
            this.userService.updateDietLog(this.addedFood).subscribe(
                result => {
                    let toast = this.toastCtrl.create({
                        message: 'Food log updated successfully !',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                    let previousPage = this.navCtrl.first().component.name;
                    console.log(previousPage);
                    this.events.publish('user-detail', result);
                    if (previousPage == 'HomeComponent') {
                        this.navCtrl.push(DiaryComponent, { user: result });
                    }
                    else {
                        this.navCtrl.pop();
                    }
                },
                error => {
                    let toast = this.toastCtrl.create({
                        message: 'Could not log food !',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                }
            );
        }
        else if (this.food != undefined) {
            let food = {
                food: this.foodItem.food._id,
                mealOption: this.foodItem.mealOption,
                servings: {
                    quantity : parseInt(this.foodItem.servings.quantity),
                    size : this.foodItem.servings.size
                },
                added : this.date
            };
            console.log(this.foodItem);
            console.log(food);
            this.userService.addDietLog(food).subscribe(
                result => {
                    let toast = this.toastCtrl.create({
                        message: 'Food logged successfully !',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                    let previousPage = this.navCtrl.first().component.name;
                    console.log(previousPage);
                    this.events.publish('user-detail', result);
                    if (previousPage == 'HomeComponent') {
                        this.navCtrl.push(DiaryComponent, { user: result });
                    }
                    else {
                        this.navCtrl.pop();
                        this.navCtrl.pop();
                    }
                },
                error => {
                    let toast = this.toastCtrl.create({
                        message: 'Could not log food !',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                }
            )
        }
    }
    
    // get user calories and macros goal by date    
    getUserGoalLogByDate(){
        let tempReqCalories: any;
        let reqCalories = 0;
        tempReqCalories = this.user.logs.goal.calories.filter(cal => new Date(cal.added).toLocaleDateString() == this.date.toLocaleDateString());
        if (tempReqCalories.length > 0) {
            reqCalories = tempReqCalories[tempReqCalories.length - 1].calories;
        }
        else {
            tempReqCalories = this.user.logs.goal.calories.filter(cal => new Date(cal.added) < this.date);
            if (tempReqCalories.length > 0) {
                reqCalories = tempReqCalories[tempReqCalories.length - 1].calories;
            }
        }
        let tempReqMacros: any;
        let reqMacros : any;
        tempReqMacros = this.user.logs.goal.macros.filter(macro => new Date(macro.added).toLocaleDateString() == this.date.toLocaleDateString());
        if (tempReqMacros.length > 0) {
            reqMacros = tempReqMacros[tempReqMacros.length - 1].macros;
        }
        else {
            tempReqMacros = this.user.logs.goal.macros.filter(cal => new Date(cal.added) < this.date);
            if (tempReqMacros.length > 0) {
                reqMacros = tempReqMacros[tempReqMacros.length - 1].macros;
            }
        }
        this.userGoal = {
            calories : Math.round(reqCalories),
            macros : {
                protein : Math.round(reqMacros.protein),
                fat : Math.round(reqMacros.fat),
                carbohydrate : Math.round(reqMacros.carbohydrate)
            }
        };
    }
}