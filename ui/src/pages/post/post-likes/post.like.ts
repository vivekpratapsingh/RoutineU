import {Component} from '@angular/core';
import {NavParams,NavController} from 'ionic-angular';

@Component({
    templateUrl:'post.like.html',
    styleUrls : ['/post.like.scss']
})
export class PostLikeComponent{
    
    postId : any;

    constructor(public params : NavParams){
        this.postId = this.params.data.postId;
    }

}