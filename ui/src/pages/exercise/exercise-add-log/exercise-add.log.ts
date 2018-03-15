import { Component } from '@angular/core';
import { NavParams, NavController, PopoverController, ToastController, Events } from 'ionic-angular';
import { ExerciseService } from '../../../services/exercise.service';
import { AddExerciseLogSetComponent } from './exercise-add-set/exercise-add.set';
import { DiaryComponent } from '../../diary/diary';

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
    exerciseSetTemp: Array<{ set: number, reps: number, weight: { amount: number, unit: string }, rest: { amount: number, unit: string } }>;
    exerciseData: any;
    constructor(private navParams: NavParams, private exerciseService: ExerciseService, public events: Events,
        private navCtrl: NavController, private popoverCtrl: PopoverController, private toastCtrl: ToastController) {
        this.user = this.navParams.data.user;
        this.date = this.navParams.data.date;
        this.exerciseData = this.navParams.data.exercise;
        this.exercise = this.exerciseData.exercise != undefined ? this.exerciseData.exercise : this.exerciseData;
        this.exerciseSet = this.exerciseData.intensity != undefined ? this.exerciseData.intensity : [];
        console.log(this.exerciseSet);
        this.initIntensity();
    }

    initTitle() {
        let previousPage = this.navCtrl.getPrevious().component.name;
        // if(previousPage == 'HomeComponent'){
        //     this.title = 'Add'
        // }
    }

    initIntensity() {
        this.exerciseSetTemp = [];
        if (this.exerciseSet.length > 0) {
            this.exerciseSet.forEach(element => {
                this.exerciseSetTemp.push({
                    set: element.set,
                    reps: element.reps,
                    weight: {
                        amount: element.weight.amount,
                        unit: element.weight.unit
                    },
                    rest: {
                        amount: element.rest.amount,
                        unit: element.rest.unit
                    }
                });
            });
        }
    }

    //add set to log
    addSet() {
        let set = {
            weight: {
                amount: 0,
                unit: 'kg'
            },
            sets: {
                amount: 0
            },
            reps: {
                amount: 0
            },
            rest: {
                amount: 0,
                unit: 'sec'
            }
        };
        let popover = this.popoverCtrl.create(AddExerciseLogSetComponent, {
            exerciseSet: set
        }, { enableBackdropDismiss: false });
        popover.present();
        popover.onDidDismiss(() => {
            console.log(set);
            console.log('popover dismissed');
            if (set.weight.amount != 0 && set.sets.amount != 0 && set.reps.amount != 0) {
                this.exerciseSetTemp.push({
                    weight: set.weight,
                    set: set.sets.amount,
                    rest: set.rest,
                    reps: set.reps.amount
                });
            }
        });
    }

    //update exercise log set
    updateSet(exerciseset: any) {
        let set = {
            weight: exerciseset.weight,
            sets: {
                amount: exerciseset.set
            },
            reps: {
                amount: exerciseset.reps
            },
            rest: exerciseset.rest
        };
        let popover = this.popoverCtrl.create(AddExerciseLogSetComponent, {
            exerciseSet: set
        });
        popover.present();
        popover.onDidDismiss(() => {
            console.log(set);
            console.log('popover dismissed');
            if (set.sets.amount != 0 && set.reps.amount != 0 && set.weight.amount != 0) {
                let index = this.getIndexFromArray(this.exerciseSetTemp, exerciseset);
                this.exerciseSetTemp.splice(index, 1);
                this.exerciseSetTemp.push({
                    weight: set.weight,
                    set: set.sets.amount,
                    rest: set.rest,
                    reps: set.reps.amount
                });
            }
        });
    }

    //save exercise log
    addExerciseLog() {
        if (this.exerciseSetTemp.length > 0) {
            let exerciseLog = {
                exercise: this.exercise._id,
                intensity: this.exerciseSetTemp,
                added: this.date
            };
            this.exerciseService.addExerciseLog(exerciseLog)
                .subscribe(result => {
                    console.log('exercise logged');
                    console.log(result);
                    this.exerciseData.intensity = [];
                    this.exerciseSetTemp.forEach(element => {
                        this.exerciseData.intensity.push({
                            set: element.set,
                            reps: element.reps,
                            weight: {
                                amount: element.weight.amount,
                                unit: element.weight.unit
                            },
                            rest: {
                                amount: element.rest.amount,
                                unit: element.rest.unit
                            }
                        });
                    });
                    // this.exerciseData.intensity = this.exerciseSet;
                    //this.exerciseSet = this.exerciseSetTemp;
                    let toast = this.toastCtrl.create({
                        message: 'Exercise logged successfully !',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                    this.user = result;
                    let previousPage = this.navCtrl.first().component.name;
                    console.log(previousPage);
                    this.events.publish('user-detail', result);
                    if (previousPage == 'HomeComponent') {
                        this.navCtrl.push(DiaryComponent, { user: result });
                    }
                    else {
                        this.navCtrl.pop();
                        this.navCtrl.pop();
                    }
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

    //update exercise log
    updateExerciseLog() {
        let exerciseLog = {
            _id: this.exerciseData._id,
            exercise: this.exercise._id,
            intensity: this.exerciseSetTemp,
            added: this.date
        }
        this.exerciseService.updateExerciseLog(exerciseLog)
            .subscribe(result => {
                // this.exerciseSet = [];
                this.exerciseData.intensity = [];
                this.exerciseSetTemp.forEach(element => {
                    this.exerciseData.intensity.push({
                        set: element.set,
                        reps: element.reps,
                        weight: {
                            amount: element.weight.amount,
                            unit: element.weight.unit
                        },
                        rest: {
                            amount: element.rest.amount,
                            unit: element.rest.unit
                        }
                    });
                });
                console.log(this.exerciseData.intensity.length);
                if (this.exerciseData.intensity.length == 0) {

                    this.exerciseData = null;
                }
                this.events.subscribe('user-detail', result);
                this.navCtrl.pop();
            },
                error => {
                    console.log(error);
                    let toast = this.toastCtrl.create({
                        message: 'cound not update exercise log',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                });
    }

    //remove exercise log
    removeExerciseLog(exerciseset) {
        console.log(exerciseset);
        let index = this.getIndexFromArray(this.exerciseSetTemp, exerciseset);
        if (index > -1) {
            this.exerciseSetTemp.splice(index, 1);
        }
    }

    // get index of intensity log
    getIndexFromArray(array, matchOb) {
        var index = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i] == matchOb) {
                index = i;
                break;
            }
        }
        return index;
    }
}