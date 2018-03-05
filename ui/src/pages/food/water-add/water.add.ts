import { Component } from '@angular/core';
import { NavParams, ToastController,Events,NavController } from 'ionic-angular';
import { UserService } from '../../../services/user.service';
import {DiaryComponent} from '../../diary/diary';

@Component({
    templateUrl: 'water.add.html',
    styleUrls: ['/water.add.scss']
})
export class WaterAddComponent {

    userId: any;
    date: Date;
    water: any;
    constructor(private navParams: NavParams, private userService: UserService,private navCtrl : NavController,
        private toastCtrl: ToastController,private events : Events) {
        this.userId = this.navParams.data.userId;
        this.date = new Date(this.navParams.data.date);
        this.water = {
            amount: 0,
            added: this.date
        };
    }

    addAmount(amount) {
        console.log(amount);
        this.water.amount = amount;
        if (this.water != 0) {
            this.userService.addWaterLog(this.water)
                .subscribe(result => {
                    let toast = this.toastCtrl.create({
                        message: 'Water logged successfully',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                    this.events.publish('user-detail',result);
                    this.navCtrl.push(DiaryComponent);
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
}