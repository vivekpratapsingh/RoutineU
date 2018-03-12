import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavController, ActionSheetController,NavParams,Events } from 'ionic-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ExerciseSearchComponent } from '../exercise/exercise-search/exercise.search';
import { WaterAddComponent } from '../water/water-add/water.add';
import { FoodSearchComponent } from '../food/food-search/food.search';

@Component({
    templateUrl: 'home.html',
    styleUrls: ['/home.scss']
})
export class HomeComponent {

    user :any;
    date : any;
    userLog : any;
    constructor(private navCtrl: NavController, private route: ActivatedRoute,
        private actionSheetCtrl: ActionSheetController,private events : Events) {
            this.user = this.route.snapshot.data['user'];
            this.date = new Date();
            this.getLogByDate();
            this.events.subscribe('user-detail', (userdetail) => {
                this.user = userdetail;
                this.getLogByDate();
            });
         }
        
    // add water    
    addExercise() {
        this.route.params.subscribe(params => {
            console.log(params);
            let userId = params['id'];
            console.log(userId);
            if (userId != '' || userId != undefined) {
                this.navCtrl.push(ExerciseSearchComponent, { userId: userId, date: Date.now() })
            }
        })
    }

    // add water
    addWater() {
        this.route.params.subscribe(params => {
            console.log(params);
            let userId = params['id'];
            console.log(userId);
            if (userId != '' || userId != undefined) {
                this.navCtrl.push(WaterAddComponent, { userId: userId, date: Date.now() })
            }
        })
    }

    // select meal option
    selectMealOption() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Meals',
            buttons: [
                {
                    text: 'Breakfast',
                    handler: () => {
                        this.addDiet('Breakfast');
                    }
                }, {
                    text: 'Lunch',
                    handler: () => {
                        this.addDiet('Lunch');
                    }
                }, {
                    text: 'Snacks',
                    handler: () => {
                        this.addDiet('Snacks');
                    }
                }, {
                    text: 'Dinner',
                    handler: () => {
                        this.addDiet('Dinner');
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    // add diet
    addDiet(op: string) {
        let user = this.route.snapshot.data['user'];
        if (user != undefined) {
            this.navCtrl.push(FoodSearchComponent, { user: user, date: new Date(), mealOption: op })
        }

    }

    // filter diet log by meal and date
    filterDietByMeal(op): any {
        return this.user.logs.diet.filter(log =>
            new Date(log.added).toLocaleDateString() == this.date.toLocaleDateString() && log.mealOption == op);
    }

    // get diet log by date
    getLogByDate() {
        let breakfastLog = this.filterDietByMeal('Breakfast');
        let lunchLog = this.filterDietByMeal('Lunch');
        let dinnerLog = this.filterDietByMeal('Dinner');
        let snacksLog = this.filterDietByMeal('Snacks');

        let breakfastLogDisplay = this.getLogsWithCalories(breakfastLog);
        let lunchLogDisplay = this.getLogsWithCalories(lunchLog);
        let dinnerLogDisplay = this.getLogsWithCalories(dinnerLog);
        let snacksLogDisplay = this.getLogsWithCalories(snacksLog);
        this.userLog = {
            exercise: this.user.logs.exercise.filter(exercise => new Date(exercise.added).toLocaleDateString() == this.date.toLocaleDateString()),
            breakfast: breakfastLogDisplay,
            lunch: lunchLogDisplay,
            dinner: dinnerLogDisplay,
            snacks: snacksLogDisplay,
            water: this.user.logs.water.filter(log => new Date(log.added).toLocaleDateString() == this.date.toLocaleDateString())
        }
        this.userLog.calories = {
            req: this.getRequiredCalories(),
            actual: this.getActualCalories()
        }
    }
    // get required calories consumed by date
    getRequiredCalories(): any {
        let tempReqCalories: any;
        let reqCalories = 0;
        tempReqCalories = this.user.logs.goal.calories.filter(cal => new Date(cal.added).toLocaleDateString() == this.date.toLocaleDateString());
        if (tempReqCalories.length > 0) {
            reqCalories = tempReqCalories[tempReqCalories.length - 1].calories;
        }
        else {
            tempReqCalories = this.user.logs.goal.calories.filter(cal => new Date(cal.added) < this.date);
            if (tempReqCalories.length > 0) {
                reqCalories = tempReqCalories[tempReqCalories.length - 1].calories;
            }
        }
        return reqCalories;
    }

    getActualCalories() : any{
        let actualCal = 0;
        if (this.userLog.breakfast) {
            this.userLog.breakfast.log.forEach(element => {
                actualCal = actualCal + element.calories
            });
        }
        if (this.userLog.lunch) {
            this.userLog.lunch.log.forEach(element => {
                actualCal = actualCal + element.calories
            });
        }
        if (this.userLog.dinner) {
            this.userLog.dinner.log.forEach(element => {
                actualCal = actualCal + element.calories
            });
        }
        if (this.userLog.snacks) {
            this.userLog.snacks.log.forEach(element => {
                actualCal = actualCal + element.calories
            });
        }
        return actualCal;
    }

    // get diet logs with calories consumed
    getLogsWithCalories(dietLog): any {
        let displayLog = [];
        let calories: number = 0;

        dietLog.forEach(element => {
            let data: number = element.food.quantity.filter(q => q.serving_size.size.amount == element.servings.size.amount && q.serving_size.size.unit == element.servings.size.unit)[0].serving_size.calories * element.servings.quantity;
            calories = calories + data;
            displayLog.push({
                _id: element._id,
                food: element.food,
                servings: element.servings,
                mealOption: element.mealOption,
                calories: data
            })
        });
        return { log: displayLog, calories: calories };
    }

    openDiary(){
        this.navCtrl.parent.select(1);
    }

}