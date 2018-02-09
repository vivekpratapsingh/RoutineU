import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';

@Component({
    template : ``
})
export class UpdateWeeklyGoalComponent{

    weeklyGoal : any
    user : any;
    constructor(private viewCtrl : ViewController,private navParams : NavParams){
        this.user = this.navParams.data.user;
    }

    close(){
        this.viewCtrl.dismiss();
    }
}