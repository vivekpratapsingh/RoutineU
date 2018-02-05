import {Component} from '@angular/core';
import {NavParams,NavController} from 'ionic-angular';

@Component({
    templateUrl:'user.connections.html',
    styleUrls:['/user.connections.scss']
})
export class UserConnectionComponent{

    userId : any
    follow : any;

    constructor(public navParams : NavParams,) {
        this.userId =  this.navParams.data.userId;
        this.follow = 'followers';        
    }
}