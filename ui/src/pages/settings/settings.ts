import {Component} from '@angular/core';
import {NavParams,NavController} from 'ionic-angular';
import { ProfileEditComponent } from './edit-profile/profile.edit';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { GoalSettingsComponent } from './goal-settings/settings.goal';

@Component({
    templateUrl : 'settings.html',
    styleUrls : ['/settings.scss']
})
export class AppSettingsHomeComponent{

    user : any;
    constructor(public navParams : NavParams,public navCtrl:NavController,
                private userService : UserService,private router : Router){
        this.user = this.navParams.data.user;
    }

    openEditProfile(){
        this.navCtrl.push(ProfileEditComponent,{user : this.user});
    }

    openEditGoal(){
        this.navCtrl.push(GoalSettingsComponent,{user : this.user});
    }

    logout(){
        this.userService.logout();
        this.router.navigate(['/login']);
    }
}