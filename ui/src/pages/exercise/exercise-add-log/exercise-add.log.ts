import { Component } from '@angular/core';
import {Events} from 'ionic-angular';
import { NavParams, NavController, PopoverController, ToastController } from 'ionic-angular';
import { ExerciseService } from '../../../services/exercise.service';
import { AddExerciseLogSetComponent } from './exercise-add-set/exercise-add.set';
import {DiaryComponent} from '../../diary/diary';

@Component({
    templateUrl: 'exercise-add.log.html',
    styleUrls: ['/exercise-add.log.scss']
})
export class AddExerciseLogComponent {
    user: any;
    date: any;
    exercise: any;
    title: String;
    exerciseSet: Array<any>;
    constructor(private navParams: NavParams, private exerciseService: ExerciseService,public events : Events,
        private navCtrl: NavController, private popoverCtrl: PopoverController, private toastCtrl: ToastController) {
        this.user = this.navParams.data.user;
        this.date = this.navParams.data.date;
        this.exercise = this.navParams.data.exercise;
        if (this.exerciseSet == undefined) {
            this.exerciseSet = [];
        }
    }

    addSet() {
        let popover = this.popoverCtrl.create(AddExerciseLogSetComponent, {
            exerciseSet: this.exerciseSet
        });
        popover.present();
    }

    addExercise() {
        if (this.exerciseSet.length > 0) {
            let exerciseLog = {
                exercise: this.exercise._id,
                intensity: this.exerciseSet,
                added : this.date
            };
            this.exerciseService.addExerciseLog(exerciseLog)
                .subscribe(result => {
                    console.log('exercise logged');
                    console.log(result);
                    let toast = this.toastCtrl.create({
                        message: 'Exercise logged successfully !',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                    this.user = result;
                    this.events.publish('user-detail',result);
                    this.navCtrl.pop();
                },
                    error => {
                        console.log(error);
                        let toast = this.toastCtrl.create({
                            message: error == '409' ? 'Already exists' : 'Could not add exercise',
                            duration: 2000,
                            position: 'top'
                        });
                        toast.present();
                    });
        }
        else {
            let toast = this.toastCtrl.create({
                message: 'Add few sets',
                duration: 2000,
                position: 'top'
            });
            toast.present();
        }
    }
}