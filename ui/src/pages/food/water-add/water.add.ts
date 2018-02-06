import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
    templateUrl : 'water.add.html',
    styleUrls : ['/water.add.scss']
})
export class WaterAddComponent{

    userId : any;
    date : Date;
    water : number;
    constructor(private navParams : NavParams){
        this.userId = this.navParams.data.userId;
        this.date = new Date(this.navParams.data.date);
        this.water = 0;
    }

    addAmount(amount){
        console.log(amount);
        this.water = amount;
    }
}