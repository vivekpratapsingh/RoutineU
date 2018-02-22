import { Component, OnInit } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExerciseService } from '../../../services/exercise.service';
import { Collections } from '../../../common/collections';

@Component({
    templateUrl: 'exercise-add.master.html',
    styleUrls: ['/exercise-add.master.scss']
})
export class AddExerciseMasterComponent implements OnInit {

    muscles: any;
    equipments: any;
    form: FormGroup;
    constructor(private exerciseService: ExerciseService, private fb: FormBuilder,
        private toastCtrl: ToastController) { }

    ngOnInit() {
        this.muscles = Collections.Muscles;
        this.equipments = Collections.Equipments;


        this.form = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            description: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
            type: ['Strength', Validators.required],
            primary_muscle: [null, Validators.required],
            secondary_muscle: [null],
            level: ['Beginner', Validators.required],
            equipment: [null, Validators.required],
            calorie_burned: [0]
        });
    }

    addExerciseMaster(exercise) {
        console.log(exercise);
        this.exerciseService.addExerciseMaster(exercise)
            .subscribe(result => {
                console.log(result);
                let toast = this.toastCtrl.create({
                    message: 'Exercise added successfully !',
                    duration: 2000,
                    position: 'top'
                });
                toast.present();
            },
                error => {
                    let toast = this.toastCtrl.create({
                        message: error == '409' ? 'Already exists' : 'Could not add exercise',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                });
    }
}