import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { AddFoodComponent } from '../food-add/food.add';
import { FoodService } from '../../../services/food.service';

@Component({
    templateUrl: 'food.search.html',
    styleUrls: ['/food.search.scss']
})
export class FoodSearchComponent {

    mealOption: string;
    items: any;
    user: any;
    date: any;
    isError : boolean;
    constructor(private navParams: NavParams, private navCtrl: NavController,
        private foodService: FoodService) {
        this.mealOption = this.navParams.data.mealOption;
        this.user = this.navParams.data.user;
        this.date = this.navParams.data.date;
        this.isError = false;
    }

    addFood(item) {
        this.navCtrl.push(AddFoodComponent, { user: this.user, mealOption: this.mealOption, date: this.date, foodItem: item });
    }

    getItems(ev: any) {
        let val = ev.target.value;
        this.items = [];
        this.isError = false;
        if (val && val.trim() != '') {
            this.foodService.getFoodByQuery(val).subscribe((result) => {
                this.items = result;
                console.log(this.items);
            },
                error => { console.log(error);this.isError = true;this.items = []; });
        }
    }
}