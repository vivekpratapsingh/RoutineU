import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

@Component({
    templateUrl: 'post.comment.html',
    styleUrls: ['/post.comment.scss']
})
export class PostCommentComponent {

    postId: any;
    commentText : any;

    constructor(public params: NavParams, public navCtrl: NavController) {
        this.postId = this.params.data.postId;
    }

    //hide nav bar when we enter the page
    ionViewDidEnter() {
        console.log('inside page enter');
        console.log((<any>document.getElementsByClassName("tabbar show-tabbar")[0]).style);
        (<any>document.getElementsByClassName("tabbar show-tabbar")[0]).style.display = "none";
    }

    //show nav bar when we leave the page
    // ionViewWillLeave() {
    //     console.log('inside page leave');
    //     console.log(document.getElementsByClassName("tabbar show-tabbar")[0]);
    //         document.getElementsByTagName("tabbar show-tabbar")[0].style.display = "flex";
    //     }
}