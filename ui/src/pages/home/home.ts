import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavController, ActionSheetController } from 'ionic-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ExerciseSearchComponent } from '../exercise/exercise-search/exercise.search';
import { WaterAddComponent } from '../water/water-add/water.add';
import { FoodSearchComponent } from '../food/food-search/food.search';

@Component({
    templateUrl: 'home.html',
    styleUrls: ['/home.scss']
})
export class HomeComponent {

    constructor(private navCtrl: NavController, private route: ActivatedRoute,
        private actionSheetCtrl: ActionSheetController) { }

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

    addDiet(op: string) {
        let user = this.route.snapshot.data['user'];
        if (user != undefined) {
            this.navCtrl.push(FoodSearchComponent, { user: user, date: new Date(), mealOption: op })
        }

    }

}