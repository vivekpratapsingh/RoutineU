import {Component} from '@angular/core';
import {NavParams,PopoverController} from 'ionic-angular';
import { AddFoodQuantityComponent } from './food-add-quantity/food-add.quantity';

@Component({
    templateUrl:'food.add.html',
    styleUrls :['/food.add.scss']
})
export class AddFoodComponent{
    food : any;
    foodId : any;
    nutritionDetail : any;
    constructor(private popoverCtrl : PopoverController,private navParams : NavParams){
        this.foodId = this.navParams.data.foodId;
        this.food = {
            "foodId":this.foodId,
            "servings" : '1',
            "servingsize" : '1 gm'
        };
        this.nutritionDetail = false;
    }

    updateQuantity(){
        let popover = this.popoverCtrl.create(AddFoodQuantityComponent, {
            food: this.food
        });
        popover.present();
    }

    showNutrition(option){
        switch(option){
            case 'enable':
                this.nutritionDetail = true;
                break;
            case 'disable':
                this.nutritionDetail = false;
                break;    
        }
    }
}