import {Component} from '@angular/core';
import {NavParams,NavController} from 'ionic-angular';
import { MealDetailComponent } from '../meal/meal-detail/meal.detail';

@Component({
    templateUrl : 'user.diet.html',
    styleUrls : ['/user.diet.scss']
})
export class UserDietComponent{

    userId : any;
    name : any;
    daycount : number;
    backward : boolean;
    forward : boolean;
    constructor(private navParams : NavParams,private navCtrl : NavController){
        this.userId = this.navParams.data.userId;
        this.name = this.navParams.data.name;
        this.daycount = 1;
        this.backward = false;
        this.forward = true;
        console.log(this.name);
    }

    updateCount(direction:any){
        console.log(direction);
        switch(direction){
            case '1' :{
                if(this.daycount > 1){
                    --this.daycount;
                    this.backward = true;
                }
                if(this.daycount == 1){
                    this.forward = true;
                    this.backward = false;
                }
                break;
            }
            case '2' :{
                if(this.daycount < 7 && this.daycount > 0){
                    console.log("inside case 2");
                    ++this.daycount;
                    if(this.daycount == 7){
                        this.forward = false;
                    }
                    this.backward = true;
                }
                break;
            }
        }

        //get diet plan of daycount
        this.getDietPlan();
    }

    //get diet plan
    getDietPlan(){

    }

    mealDetail(){
        console.log('inside meal detail');
        this.navCtrl.push(MealDetailComponent,{'mealId' : '1'});
    }
    
}