import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { UserService } from '../../../services/user.service';
import { Calculator } from '../../../helpers/calculator';
import { Collections } from '../../../common/collections';

@Component({
    templateUrl: 'update.macros.html',
    styleUrls: ['/update.macros.scss']
})
export class UpdateMacrosComponent {

    carbs: any = {
        percentage: Number,
        amount: Number
    };
    protein: any = {
        percentage: Number,
        amount: Number
    };
    fat: any = {
        percentage: Number,
        amount: Number
    };
    user: any;
    nums : any;
    constructor(private navParams: NavParams, private userService: UserService,
        private viewCtrl: ViewController) {
        this.user = this.navParams.data.user;
        this.nums = Collections.generateIntNumbers(100);
        if (this.user.logs.goal.macros.length > 0) {
            let macrosLen = this.user.logs.goal.macros.length;
            let macrosLastElem = this.user.logs.goal.macros[this.user.logs.goal.macros.length - 1].macros;
            let userMacrosPercentage = this.user.macros_percentage;
            this.carbs = {
                percentage: userMacrosPercentage.carbohydrate,
                amount: macrosLastElem.carbohydrate
            };
            this.protein = {
                percentage: userMacrosPercentage.protein,
                amount: macrosLastElem.protein
            };
            this.fat = {
                percentage: userMacrosPercentage.fat,
                amount: macrosLastElem.fat
            };
        }
        else {
            this.carbs = {
                percentage: 0,
                amount: 0
            };
            this.protein = {
                percentage: 0,
                amount: 0
            };
            this.fat = {
                percentage: 0,
                amount: 0
            };
        }
    }

    close() {
        this.viewCtrl.dismiss();
    }

    updateMacros() {
        if (this.checkIfNoMacros()) {
            this.user.logs.goal.macros.push({macros : {carbohydrate : this.carbs.amount,protein : this.protein.amount,fat : this.fat.amount}});
            this.user.macros_percentage = {carbohydrate : this.carbs.percentage,protein : this.protein.percentage,fat : this.fat.percentage};
            this.userService.updateUserDetail(this.user, this.user._id)
                .subscribe(result => { });
            console.log(this.user);
        }
        this.viewCtrl.dismiss();

    }

    getInt(value) {
        return parseInt(value);
    }

    checkIfNoMacros(): boolean {
        if (this.carbs.percentage == 0 && this.carbs.amount == 0
            && this.protein.percentage == 0 && this.protein.amount == 0
            && this.fat.percentage == 0 && this.fat.amount == 0) {
            return false;
        }
        return false;
    }
}