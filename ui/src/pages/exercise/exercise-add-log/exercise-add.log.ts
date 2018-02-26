import { Component } from '@angular/core';
import { NavParams, NavController,PopoverController } from 'ionic-angular';
import { ExerciseService } from '../../../services/exercise.service';
import { AddExerciseLogSetComponent } from './exercise-add-set/exercise-add.set';

@Component({
    templateUrl: 'exercise-add.log.html',
    styleUrls: ['/exercise-add.log.scss']
})
export class AddExerciseLogComponent {
    userId: any;
    date: any;
    exercise: any;
    title: String;
    exerciseSet : any;
    constructor(private navParams: NavParams, private exerciseService: ExerciseService,
        private navCtrl: NavController,private popoverCtrl : PopoverController) {
        this.userId = this.navParams.data.userId;
        this.date = this.navParams.data.date;
        this.exercise = this.navParams.data.exercise;
    }

    addSet(){
        let popover = this.popoverCtrl.create(AddExerciseLogSetComponent,{
            exerciseSet : this.exerciseSet
        })
    }
}