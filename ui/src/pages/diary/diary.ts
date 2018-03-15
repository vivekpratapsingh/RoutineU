import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events, ToastController, PopoverController, Popover } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { FoodSearchComponent } from '../food/food-search/food.search';
import { WaterAddComponent } from '../water/water-add/water.add';
import { DataService } from '../../services/data.serveice';
import { ExerciseSearchComponent } from '../exercise/exercise-search/exercise.search';
import { UserService } from '../../services/user.service';
import { ExerciseService } from '../../services/exercise.service';
import { AddExerciseLogComponent } from '../exercise/exercise-add-log/exercise-add.log';
import { AddExerciseLogSetComponent } from '../exercise/exercise-add-log/exercise-add-set/exercise-add.set';
import { AddFoodComponent } from '../food/food-add/food.add';

@Component({
    templateUrl: 'diary.html',
    styleUrls: ['/diary.scss']
})
export class DiaryComponent implements OnInit {
    user: any;
    date: Date;
    displayDate: any;
    months: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    days: Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    userLog: any;
    constructor(private navParams: NavParams, private navCtrl: NavController, public events: Events, private toastCtrl: ToastController,
        private sharedService: DataService, private route: ActivatedRoute, private userService: UserService, private exerciseService: ExerciseService,
        private popoverCtrl: PopoverController) {
    }

    ngOnInit() {
        if (this.navParams.data.user) {
            this.user = this.navParams.data.user
        }
        else {
            this.user = this.route.snapshot.data['user'];
        }
        this.displayDate = 'Today';
        this.date = new Date(new Date().toISOString());
        this.getLogByDate();
        this.events.subscribe('user-detail', (userdetail) => {
            this.user = userdetail;
            this.getLogByDate();
        });
    }

    // ionViewDidEnter() {
    //     console.log(this.user);
    // }

    // add food
    addFood(option) {
        if (option == 'Water') {
            this.navCtrl.push(WaterAddComponent, { user: this.user, date: this.date });
        }
        else {
            this.navCtrl.push(FoodSearchComponent, { mealOption: option, user: this.user, date: this.date });
        }
    }

    //update diet log
    updateDietLog(diet: any, mealOp: string) {
        // console.log(diet);
        // console.log(mealOp);
        this.navCtrl.push(AddFoodComponent, { user: this.user, mealOption: mealOp, date: this.date, addedFood: diet })
    }

    //remove diet log
    removeDietLog(id: any) {
        this.userService.removeDietLog(id)
            .subscribe(
                result => {
                    // console.log(result);
                    this.user = result;
                    this.getLogByDate();
                }, error => {
                    let toast = this.toastCtrl.create({
                        message: 'could not remove food log',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                }
            )
    }

    //update water
    updateWaterEntry(waterLog: any) {
        this.navCtrl.push(WaterAddComponent, { user: this.user, waterLog: waterLog, date: this.date });
    }

    //remove water log    
    removeWaterLog(id: any) {
        console.log(id);
        this.userService.removeWaterLog(id).subscribe(result => {
            console.log(result);
            this.user = result;
            this.getLogByDate();
        }, error => {
            let toast = this.toastCtrl.create({
                message: 'could not remove water log',
                duration: 2000,
                position: 'top'
            });
            toast.present();
        })
    }

    // add exercise
    addExercise() {
        this.navCtrl.push(ExerciseSearchComponent, { user: this.user, date: this.date })
    }

    //update exercise log
    updateExerciseLog(exerciseLog: any) {
        this.navCtrl.push(AddExerciseLogComponent, { user: this.user, exercise: exerciseLog, date: this.date });
    }

    //remove exercise log
    removeExerciseLog(id: any) {
        console.log(id);
        this.exerciseService.removeExerciseLog(id).subscribe(result => {
            console.log(result);
            this.user = result;
            this.getLogByDate();
        }, error => {
            let toast = this.toastCtrl.create({
                message: 'could not remove exercise log',
                duration: 2000,
                position: 'top'
            });
            toast.present();
        })
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

    // filter diet log by meal and date
    filterDietByMeal(op): any {
        return this.user.logs.diet.filter(log =>
            new Date(log.added).toLocaleDateString() == this.date.toLocaleDateString() && log.mealOption == op);
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

    // get actual calories consumed by date
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