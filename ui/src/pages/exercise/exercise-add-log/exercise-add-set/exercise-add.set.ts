import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Collections } from '../../../../common/collections';

@Component({
    template: `<ion-list>
                    <ion-list-header>
                    Add Set
                        <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
                    </ion-list-header>
                    <ion-item style="font-size:1.4rem">
                        <ion-label fixed># of Sets</ion-label>
                        <ion-input type="number" [(ngModel)]="sets"></ion-input>
                    </ion-item>
                    <ion-item style="font-size:1.4rem">
                        <ion-label fixed># of Reps</ion-label>
                        <ion-input type="number" [(ngModel)]="reps"></ion-input>
                    </ion-item>
                    <ion-item style="font-size:1.4rem">
                        <ion-label fixed>Weight</ion-label>
                        <ion-select [(ngModel)]="weight.amount">
                            <ion-option *ngFor="let num of nums" [value]="num">{{num}}</ion-option>
                        </ion-select>
                        <ion-select [(ngModel)]="weight.unit">
                            <ion-option value="kg">kg</ion-option>
                            <ion-option value="lbs">lbs</ion-option>
                        </ion-select>
                    </ion-item>
                    <ion-item style="font-size:1.4rem">
                        <ion-label fixed>Rest</ion-label>
                        <ion-select [(ngModel)]="rest.amount">
                            <ion-option *ngFor="let num of nums" [value]="num">{{num}}</ion-option>
                        </ion-select>
                        <ion-select [(ngModel)]="rest.unit">
                            <ion-option value="sec">sec</ion-option>
                            <ion-option value="min">min</ion-option>
                        </ion-select>
                    </ion-item>
                    <button ion-button small  (click)="addSet()" style="float:right">Add Set</button>
                </ion-list>`
})
export class AddExerciseLogSetComponent {
    nums: any;
    weight: any;
    exerciseSet: Array<any>;
    sets: number;
    reps: number;
    rest: any;
    constructor(private navParams: NavParams, private viewCtrl: ViewController) {
        this.exerciseSet = this.navParams.data.exerciseSet;
        if (this.exerciseSet == undefined) {
            this.exerciseSet = [];
        }
        this.weight = {
            amount: 0,
            unit: 'kg'
        };
        this.sets = 0;
        this.reps = 0;
        this.rest = {
            amount: 0,
            unit: 'sec'
        };
        this.nums = Collections.generateIntNumbers(100);
    }

    close() {
        this.viewCtrl.dismiss();
    }

    addSet() {
        if (this.sets != 0 && this.reps != 0 && this.weight.amount != 0) {
            this.exerciseSet.push({
                set: this.sets,
                reps: this.reps,
                weight: this.weight,
                rest: this.rest
            });
            this.viewCtrl.dismiss();
        }
    }
}