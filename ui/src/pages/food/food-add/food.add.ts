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
        if (this.addedFood._id != undefined) {
            this.addedFood.servings = this.foodItem.servings;
            this.userService.updateDietLog(this.addedFood).subscribe(
                result => {
                    let toast = this.toastCtrl.create({
                        message: 'Food logged successfully !',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                    this.events.publish('user-detail', result);
                    this.navCtrl.push(DiaryComponent);
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
                mealOption: this.mealOption,
                servings: this.foodItem.servings
            };
            this.userService.addDietLog(food).subscribe(
                result => {
                    let toast = this.toastCtrl.create({
                        message: 'Food logged successfully !',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                    this.events.publish('user-detail', result);
                    this.navCtrl.push(DiaryComponent);
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
}