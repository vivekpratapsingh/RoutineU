import {Component} from '@angular/core';
import {PostCommentComponent} from '../post-comments/post.comment';
import {PostLikeComponent} from '../post-likes/post.like';
import { NavParams,NavController } from 'ionic-angular';

@Component({
    templateUrl:'user.posts.html',
    styleUrls : ['/user.posts.scss']
})
export class UserPostComponent{

    userId : any;
    post : any;
    constructor(public params : NavParams,public navCtrl : NavController){
        this.userId = params.data.userId;
        this.post = {
            "id" : 1,
        };
    }

    showPostLike(id){
        this.navCtrl.push(PostLikeComponent,{postId : id});
    }

    showPostComment(id){
        this.navCtrl.push(PostCommentComponent,{postId : id});
    }

    ionViewDidEnter() {
        (<any>document.getElementsByClassName("tabbar show-tabbar")[0]).style.display = "flex";
    }

}