import {Component} from '@angular/core';
import {NavParams,NavController} from 'ionic-angular';
import { AddFoodComponent } from '../food-add/food.add';

@Component({
    templateUrl : 'food.search.html',
    styleUrls : ['/food.search.scss']
})
export class FoodSearchComponent{

    mealOption : string;
    items : any;
    userId  :any;
    date : any;
    constructor(private navParams : NavParams,private navCtrl  :NavController){
        this.mealOption = this.navParams.data.mealOption;
        this.userId = this.navParams.data.userId;
        this.date = this.navParams.data.date;
        this.items = [
            {
                "id" : "12",
                "name" : "Item name",
                "brand" : "Item Brand",
                "servings" :"2",
                "servingsize" :"20 gm",
                "calorie" :"100 cal"
            }
        ];
    }

    addFood(item){
        this.navCtrl.push(AddFoodComponent,{userId : this.userId,mealOption : this.mealOption,date : this.date,foodItem : item});
    }
}