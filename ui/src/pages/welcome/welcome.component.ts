import { Component,ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import {Slides} from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.serveice';
import { Collections } from '../../common/collections';

@Component({
    templateUrl: 'welcome.component.html',
    styleUrls: ['/welcome.component.scss']
})
export class WelcomeComponent {
    @ViewChild(Slides) slides: Slides;
    user: any;
    birthday: any;
    starting_date: any;
    height_numbers: any;
    weight_numbers: any;
    constructor(public sharedService: DataService, private userService: UserService,
        private router: Router) {

        this.user = this.sharedService.sharedData;
        if (this.user) {
            let b = new Date(this.user.birthday);
            this.birthday = new Date(b.setTime(b.getTime() + 1 * 86400000)).toISOString();
            let a = new Date(this.user.goal.starting.date);
            this.starting_date = new Date(a.setTime(a.getTime() + 1 * 86400000)).toISOString();
        }
        let collections = new Collections();
        this.height_numbers = collections.generateIntNumbers(250);
        this.weight_numbers = collections.generateFloorNumbers(150);
        console.log(this.weight_numbers);

    }

    updateUserDetails() {
        let b = new Date(this.birthday);
        this.user.birthday = new Date(b.setTime(b.getTime() - 1 * 86400000)).toLocaleDateString();
        let a = new Date(this.starting_date);
        this.user.goal.starting.date = new Date(a.setTime(a.getTime() - 1 * 86400000)).toLocaleDateString();
        this.userService.updateUserDetail(this.user, this.user._id)
            .subscribe(result => {
                console.log(this.slides.getActiveIndex());
                if(this.slides.isEnd()){
                    this.router.navigate(['/home']);
                }
                else{
                    this.slides.slideTo(1);
                }
            });

        console.log(this.user);
    }

    nextSlide(){
        if(this.slides.isEnd()){
            this.router.navigate(['/home']);
        }
        else{
            this.slides.slideTo(this.slides.getActiveIndex()+1);
        }
    }
}