import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { AddFoodComponent } from '../../food/food-add/food.add';

@Component({
    templateUrl: 'meal.detail.html',
    styleUrls: ['/meal.detail.scss']
})
export class MealDetailComponent {
    mealId: any;
    nutritionDetail: any;
    food: any;

    constructor(private navParams: NavParams, private navCtrl: NavController) {
        this.mealId = this.navParams.data.mealId;
        this.nutritionDetail = false;
        this.food = {
            "id": "11",
            "name": "Item name",
            "brand": "Item Brand",
            "servings": "2",
            "servingsize": "20 gm",
            "calorie": "100 cal"
        }
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

    openFoodItem() {
        console.log('open food item clicked');
        this.navCtrl.push(AddFoodComponent, { foodItem : this.food });
    }
}