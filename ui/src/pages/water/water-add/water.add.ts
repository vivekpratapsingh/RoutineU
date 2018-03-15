import { Component } from '@angular/core';
import { NavParams, ToastController, Events, NavController } from 'ionic-angular';
import { UserService } from '../../../services/user.service';
import { DiaryComponent } from '../../diary/diary';

@Component({
    templateUrl: 'water.add.html',
    styleUrls: ['/water.add.scss']
})
export class WaterAddComponent {

    user: any;
    date: Date;
    water: any;
    waterLog: any;
    isNew: boolean = true;
    title: string = 'Add Entry';
    constructor(private navParams: NavParams, private userService: UserService, private navCtrl: NavController,
        private toastCtrl: ToastController, private events: Events) {
        this.user = this.navParams.data.user;
        this.date = new Date(this.navParams.data.date);
        if (this.navParams.data.waterLog != undefined) {
            this.waterLog = this.navParams.data.waterLog;
            this.isNew = false;
            this.title = 'Edit Entry';
        }

        this.water = this.waterLog != undefined ? {
            amount: this.waterLog.amount,
            added: new Date(this.waterLog.added)
        } : {
                amount: 0,
                added: this.date
            };
    }

    // add water amount to water variable
    addAmount(amount) {
        console.log(amount);
        this.water.amount = amount;
    }

    // add water log
    addWaterLog() {
        console.log(this.water.amount);
        if (this.water.amount != 0) {
            this.userService.addWaterLog(this.water)
                .subscribe(result => {
                    let toast = this.toastCtrl.create({
                        message: 'Water logged successfully',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                    let getPreviousPage = this.navCtrl.getPrevious().component.name;
                    console.log(getPreviousPage);
                    this.events.publish('user-detail', result);
                    if (getPreviousPage == 'HomeComponent') {
                        this.navCtrl.push(DiaryComponent, { user: result });
                    }
                    else {
                        this.navCtrl.pop();
                    }
                }, error => {
                    let toast = this.toastCtrl.create({
                        message: 'cound not add water',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                })
        }
    }

    //update water log
    updateWaterLog() {
        if (this.waterLog != undefined) {
            this.waterLog.amount = this.water.amount;
            this.userService.updateWaterLog(this.waterLog)
                .subscribe(
                    result => {
                        let toast = this.toastCtrl.create({
                            message: 'Water log updated successfully',
                            duration: 2000,
                            position: 'top'
                        });
                        toast.present();
                        this.events.publish('user-detail', result);
                        this.navCtrl.pop();
                    },
                    error => {
                        let toast = this.toastCtrl.create({
                            message: 'cound not update water',
                            duration: 2000,
                            position: 'top'
                        });
                        toast.present();
                    }
                )
        }
    }
}