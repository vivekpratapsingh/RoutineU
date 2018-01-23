import {Component} from '@angular/core';
import {NavParams,NavController} from 'ionic-angular';

@Component({
    templateUrl : 'user.tags.html',
    styleUrls : ['/user.tags.scss']
})
export class UserTagComponent{

    userId : any;
    tag : any;

    constructor(private navParams : NavParams){
        this.userId = this.navParams.data.userId;
        this.tag = 'tag';
    }
}