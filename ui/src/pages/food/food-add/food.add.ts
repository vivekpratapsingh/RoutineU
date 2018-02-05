import {Component} from '@angular/core';
import {NavParams,PopoverController,NavController} from 'ionic-angular';
import { AddFoodQuantityComponent } from './food-add-quantity/food-add.quantity';

@Component({
    templateUrl:'food.add.html',
    styleUrls :['/food.add.scss']
})
export class AddFoodComponent{
    food : any;
    foodId : any;
    nutritionDetail : any;
    previousPage : any;
    title : string;
    constructor(private popoverCtrl : PopoverController,private navParams : NavParams,private navCtrl : NavController){
        // this.foodId = this.navParams.data.foodId;
        // this.food = {
        //     "foodId":this.foodId,
        //     "servings" : '1',
        //     "servingsize" : '1 gm'
        // };
        this.food = this.navParams.data.foodItem;
        this.foodId = this.food.id;
        this.nutritionDetail = false;
        this.previousPage = this.navCtrl.last();
        console.log(this.previousPage.component.name);
        if(this.previousPage.component.name == 'FoodSearchComponent'){
            this.title = "Add Food";
        }
        else{
            this.title = "Edit Entry";
        }
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