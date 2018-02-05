import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FoodSearchComponent } from '../food/food-search/food.search';
import { WaterAddComponent } from '../food/water-add/water.add';

@Component({
    templateUrl: 'diary.html',
    styleUrls: ['/diary.scss']
})
export class DiaryComponent {
    userId: any;
    date: Date;
    displayDate: any;
    months : Array<string> = ['Jan','Feb','Mar','Apr','Jun','July','Aug','Sep','Oct','Nov','Dec'];
    days : Array<string> = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    constructor(private navParams: NavParams, private navCtrl: NavController) {
        // this.userId = this.navParams.data.userId
        this.displayDate = 'Today';
        this.date = new Date();
    }

    // add food
    addFood(option) {
        console.log(option);

        if (option == 'Water') {
            this.navCtrl.push(WaterAddComponent,{userId : this.userId,date:this.date});
        }
        else {
            this.navCtrl.push(FoodSearchComponent, { mealOption: option, userId: this.userId, date: this.date });
        }
    }


    //get diet log by date
    updateDate(option) {
        let today = new Date();
        let temp = new Date(today);
        let todayminus1 = new Date(temp.setTime(today.getTime() - 1 * 86400000));
        let todayplus1 = new Date(temp.setTime(today.getTime() + 1 * 86400000));
        console.log(this.days[today.getDay()] + ',' + this.months[today.getMonth()] + ' ' + today.getDate());
        switch (option) {
            case '1':
                let a = new Date(this.date);
                this.date = new Date(a.setTime(a.getTime() - 1 * 86400000));
                
                if (this.displayDate == 'Today') {
                    this.displayDate = 'Yesterday'
                }
                else if (this.displayDate == 'Tomorrow') {
                    this.displayDate = 'Today';
                }
                else if(this.date.getDate() == todayminus1.getDate()){
                    this.displayDate = 'Yesterday';
                }
                else if(this.date.getDate() == todayplus1.getDate()){
                    this.displayDate = 'Tomorrow';
                }
                else{
                    this.displayDate = this.days[this.date.getDay()] + ',' + this.months[this.date.getMonth()] + ' ' + this.date.getDate();
                }
                break;
            case '2':
                let b = new Date(this.date);
                this.date = new Date(b.setTime(b.getTime() + 1 * 86400000));
                if (this.displayDate == 'Today') {
                    this.displayDate = 'Tomorrow'
                }
                else if (this.displayDate == 'Yesterday') {
                    this.displayDate = 'Today';
                }
                else if(this.date.getDate() == todayminus1.getDate()){
                    this.displayDate = 'Yesterday';
                }
                else if(this.date.getDate() == todayplus1.getDate()){
                    this.displayDate = 'Tomorrow';
                }
                else{
                    this.displayDate = this.days[this.date.getDay()] + ',' + this.months[this.date.getMonth()] + ' ' + this.date.getDate();
                }
                break;
        }
    }

}