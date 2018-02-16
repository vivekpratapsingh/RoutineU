import {Component} from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';
import { DataService } from '../../../../services/data.serveice';
import { Calculator } from '../../../../helpers/calculator';

@Component({
    template : `
    <ion-list>
        <ion-list-header>
        How much ?
            <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
        </ion-list-header>
        <ion-item style="font-size:1.4rem">
            <ion-label fixed>Number of Servings</ion-label>
            <ion-input type="number" [(ngModel)]="servings"></ion-input>
        </ion-item>
        <ion-item style="font-size:1.4rem">
            <ion-label fixed>Servings of</ion-label>
            <ion-select [(ngModel)]="servingsize">
                <ion-option *ngFor="let quantity of food.food.quantity" [value]="quantity.serving_size.size">{{quantity.serving_size.size.amount}} {{quantity.serving_size.size.unit}}</ion-option>
            </ion-select>
        </ion-item>
        <button ion-button small  (click)="updateQuatity()" style="float:right">Save</button>
    </ion-list>
    `,
})
export class AddFoodQuantityComponent{

    food : any;
    servingsize : any;
    servings : any;
    constructor(private navParams : NavParams,private viewCtrl : ViewController,
    private sharedService : DataService){
        this.food = this.navParams.data.food;
        console.log(this.food.servings.quantity);
        this.servingsize = this.food.servings.size;
        this.servings = this.food.servings.quantity;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    updateQuatity(){
        this.food.servings.size = this.servingsize;
        this.food.servings.quantity = this.servings;
        this.food.nutrients = Calculator.getFoodNutrientByQuantity(this.food.servings.size.amount, this.food.servings.size.unit,
            this.food.food,this.food.servings.quantity)
        this.viewCtrl.dismiss();
    }
}