import {Component} from '@angular/core';
import {NavParams,NavController,PopoverController} from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { UpdateCalorieComponent } from './update-calories/update.calories';
import { UpdateMacrosComponent } from './update-macros/update.macros';

@Component({
    templateUrl :'macros.home.html',
    styleUrls : ['/macros.home.scss']
})
export class MacrosHomeComponent{

    user : any;
    constructor(private navParams : NavParams,private navCrl : NavController,
                    private popoverCtrl : PopoverController,private userService : UserService){
        this.user = this.navParams.data.user;
        console.log(this.user);
    }

    //update calorie count
    updateCalories(){
        let popover = this.popoverCtrl.create(UpdateCalorieComponent, {
            user: this.user
        });
        popover.present();
    }

    //update macros
    updateMacros(){
        let popover = this.popoverCtrl.create(UpdateMacrosComponent, {
            user: this.user
        });
        popover.present();
    }
}