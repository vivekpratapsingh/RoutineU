import { Component } from '@angular/core';
import { NavParams, NavController,ToastController } from 'ionic-angular';
import { ExerciseService } from '../../../services/exercise.service';
import { AddExerciseLogComponent } from '../exercise-add-log/exercise-add.log';
import { AddExerciseMasterComponent } from '../exercise-add-master/exercise-add.master';

@Component({
    templateUrl: 'exercise.search.html',
    styleUrls: ['/exercise.search.scss']
})
export class ExerciseSearchComponent {
    userId: any;
    items: any;
    isError: boolean;
    date : any;
    constructor(private navParams: NavParams, private exerciseService: ExerciseService,
                private navCtrl : NavController,private toastCtrl : ToastController) {
        this.userId = this.navParams.data.userId;
        this.date = this.navParams.data.date;
    }

    addFood(exercise) {
        this.navCtrl.push(AddExerciseLogComponent, { userId: this.userId,  date: this.date, exercise: exercise });
    }

    getItems(ev: any) {
        let val = ev.target.value;
        this.items = [];
        this.isError = false;
        if (val && val.trim() != '') {
            this.exerciseService.getExerciseByQuery(val).subscribe((result) => {
                this.items = result;
                console.log(this.items);
            },
                error => { console.log(error); this.isError = true; this.items = []; });
        }
    }
    addNewExercise(){
        this.navCtrl.push(AddExerciseMasterComponent);
    }
}