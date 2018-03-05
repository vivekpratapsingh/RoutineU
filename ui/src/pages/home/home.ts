import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NavController } from 'ionic-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ExerciseSearchComponent } from '../exercise/exercise-search/exercise.search';
import { WaterAddComponent } from '../food/water-add/water.add';

@Component({
    templateUrl: 'home.html',
    styleUrls: ['/home.scss']
})
export class HomeComponent {

    constructor(private navCtrl: NavController, private route: ActivatedRoute) { }

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

}