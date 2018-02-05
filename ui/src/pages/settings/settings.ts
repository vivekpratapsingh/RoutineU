import {Component} from '@angular/core';
import {NavParams,NavController} from 'ionic-angular';
import { ProfileEditComponent } from './edit-profile/profile.edit';

@Component({
    templateUrl : 'settings.html',
    styleUrls : ['/settings.scss']
})
export class AppSettingsHomeComponent{

    userId : any;
    constructor(public navParams : NavParams,public navCtrl:NavController){
        this.userId = this.navParams.get('userId');
    }

    openEditProfile(){
        this.navCtrl.push(ProfileEditComponent,{userId : this.userId});
    }
}