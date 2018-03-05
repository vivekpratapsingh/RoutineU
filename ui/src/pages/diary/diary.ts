import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { FoodSearchComponent } from '../food/food-search/food.search';
import { WaterAddComponent } from '../food/water-add/water.add';
import { DataService } from '../../services/data.serveice';
import { ExerciseSearchComponent } from '../exercise/exercise-search/exercise.search';

@Component({
    templateUrl: 'diary.html',
    styleUrls: ['/diary.scss']
})
export class DiaryComponent {
    user: any;
    date: Date;
    displayDate: any;
    months: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    days: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    userLog: any;
    constructor(private navParams: NavParams, private navCtrl: NavController, public events: Events,
        private sharedService: DataService, private route: ActivatedRoute) {
        this.user = this.route.snapshot.data['user'];
        console.log(this.user);
        this.displayDate = 'Today';
        this.date = new Date(new Date().toISOString());
        this.getLogByDate();
        this.events.subscribe('user-detail', (userdetail) => {
            console.log(userdetail);
            this.user = userdetail;
        });
    }

    // add food
    addFood(option) {
        console.log(option);

        if (option == 'Water') {
            this.navCtrl.push(WaterAddComponent, { userId: this.user._id, date: this.date });
        }
        else {
            this.navCtrl.push(FoodSearchComponent, { mealOption: option, user: this.user, date: this.date });
        }
    }

    // add exercise
    addExercise() {
        this.navCtrl.push(ExerciseSearchComponent, { user: this.user, date: this.date })
    }


    //get diet log by date
    updateDate(option) {
        let today = new Date();
        let temp = new Date(today);
        let todayminus1 = new Date(temp.setTime(today.getTime() - 1 * 86400000));
        let todayplus1 = new Date(temp.setTime(today.getTime() + 1 * 86400000));
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
                else if (this.date.getDate() == todayminus1.getDate()) {
                    this.displayDate = 'Yesterday';
                }
                else if (this.date.getDate() == todayplus1.getDate()) {
                    this.displayDate = 'Tomorrow';
                }
                else {
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
                else if (this.date.getDate() == todayminus1.getDate()) {
                    this.displayDate = 'Yesterday';
                }
                else if (this.date.getDate() == todayplus1.getDate()) {
                    this.displayDate = 'Tomorrow';
                }
                else {
                    this.displayDate = this.days[this.date.getDay()] + ',' + this.months[this.date.getMonth()] + ' ' + this.date.getDate();
                }
                break;
        }
        this.getLogByDate();
    }

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

    getLogsWithCalories(dietLog): any {
        let displayLog = [];
        let calories = 0;
        dietLog.forEach(element => {
            let data = element.food.quantity.filter(q => q.serving_size.size.amount == element.servings.size.amount && q.serving_size.size.unit == element.servings.size.unit).calories * element.servings.quantity;
            calories = calories + data;
            displayLog.push({
                dietId: element._id,
                food: element.food,
                servings: element.servings,
                mealOption: element.mealOption,
                calories: data
            })
        });
        return { log: displayLog, calories: calories };
    }

    filterDietByMeal(op): any {
        return this.user.logs.diet.filter(log =>
            new Date(log.added).toLocaleDateString() == this.date.toLocaleDateString() && log.mealOption == op);
    }

    getRequiredCalories(): any {
        let tempReqCalories: any;
        let reqCalories = 0;
        tempReqCalories = this.user.logs.goal.calories.filter(cal => new Date(cal.added).toLocaleDateString() == this.date.toLocaleDateString());
        if (tempReqCalories.length > 0) {
            reqCalories = tempReqCalories[tempReqCalories.length - 1].calories;
        }
        else{
            tempReqCalories = this.user.logs.goal.calories.filter(cal => new Date(cal.added) < this.date);
            if (tempReqCalories.length > 0) {
                reqCalories = tempReqCalories[tempReqCalories.length - 1].calories;
            }
        }
        return reqCalories;
    }

    getActualCalories(): any {
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
}