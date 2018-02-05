import {Component} from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';

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
                <ion-option value="1 gm">1 gm</ion-option>
                <ion-option value="1 oz">1 oz</ion-option>
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
    constructor(private navParams : NavParams,private viewCtrl : ViewController){
        this.food = this.navParams.data.food;
        console.log(this.food);
        this.servingsize = this.food.servingsize;
        this.servings = this.food.servings;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    updateQuatity(){
        this.food.servingsize = this.servingsize;
        this.food.servings = this.servings;
        this.viewCtrl.dismiss();
    }
}