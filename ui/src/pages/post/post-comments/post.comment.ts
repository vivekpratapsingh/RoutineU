import {Component} from '@angular/core';
import {NavParams,NavController} from 'ionic-angular';

@Component({
    templateUrl : 'post.comment.html',
    styleUrls : ['/post.comment.scss']
})
export class PostCommentComponent{

    postId : any;

    constructor(public params : NavParams,public navCtrl : NavController){
        this.postId = this.params.data.postId;
    }
}