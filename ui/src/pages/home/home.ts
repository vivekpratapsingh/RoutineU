import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: 'home.html',
    styleUrls: ['/home.scss']
})
export class HomeComponent {
    // public currentUser: any = {};

    // constructor(private userService: UserService, private router: Router) { }

    // ngOnInit() {
    //     this.userService.getCurrentUser().then(profile => this.currentUser = profile)
    //         .catch(() => this.currentUser = {});
    // }

    // logout() {
    //     this.userService.logout();
    //     this.router.navigate(['/welcome']);
    // }

}