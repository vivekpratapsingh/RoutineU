import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { UserService } from '../../../services/user.service';

@Component({
    templateUrl: 'update.macros.html',
    styleUrls: ['/update.macros.scss']
})
export class UpdateMacrosComponent {

    carbs: any = {
        percentage : Number,
        amount : Number
    };
    protein: any= {
        percentage : Number,
        amount : Number
    };
    fat: any= {
        percentage : Number,
        amount : Number
    };
    user: any;
    constructor(private navParams: NavParams, private userService: UserService,
        private viewCtrl: ViewController) {
        this.user = this.navParams.data.user;
        this.carbs = {
            percentage : this.user.goal.macros.carbohydrate.percentage,
            amount : this.user.goal.macros.carbohydrate.amount
        };
        this.protein = {
            percentage : this.user.goal.macros.protein.percentage,
            amount : this.user.goal.macros.protein.amount
        };
        this.fat = {
            percentage : this.user.goal.macros.fat.percentage,
            amount : this.user.goal.macros.fat.amount
        };
        console.log(this.carbs);
    }

    close(){
        this.viewCtrl.dismiss();
    }

    updateMacros() {
        this.user.goal.macros.carbohydrate = this.carbs;
        this.user.goal.macros.protein = this.protein;
        this.user.goal.macros.fat = this.fat;
        this.userService.updateUserDetail(this.user, this.user._id)
            .subscribe(result => { });
        console.log(this.user);
        this.viewCtrl.dismiss();

    }

    getInt(value){
        return parseInt(value);
    }
}