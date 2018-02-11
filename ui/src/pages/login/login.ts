import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.serveice';

@Component({

    templateUrl: 'login.html',
    styleUrls: ['/login.scss']
})
export class LoginComponent {

    constructor(private router: Router, public userService: UserService,
                public dataService :  DataService){
    }

    ngOnInit() {
        console.log('inside login');
    }

    fbLogin() {
        console.log('fb login clicked')
        this.userService.fbLogin().then((data: any) => {
            console.log(data);
            this.userService.updateUserDetail(data.userDetails, data.userID.id).subscribe(result => {
                console.log(result);
                localStorage.setItem('id', data.userID.id);
                console.log('User has been logged in');
                if(this.checkUserDetials(result)){
                    this.router.navigate(['/home']);
                }
                else{
                    this.dataService.sharedData = result;
                    this.router.navigate(['/welcome']);
                }
                
            });
        });
    }

    checkUserDetials(user) : boolean{
        if(user.gender !="" && user.birthday !='' && user.location.city!='' && user.location.country !='' && 
            user.height != 0 && user.weight != 0 && user.goal.starting.weight !=0 && user.goal.goal_weight != 0){
                return true;
            }
        else{
            return false;
        }    
    }

}