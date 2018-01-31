import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
    
    templateUrl : 'login.html',
    styleUrls : ['/login.scss']
})
export class LoginComponent{

    // constructor(private router : Router){
    // }

    // ngOnInit(){
    //     console.log('inside login');
    // }

    // fbLogin(){
    //     // this.userService.fbLogin().then(() => {
    //     //     console.log('User has been logged in');
    //     //     //this.router.navigate(['/login']);
    //     //   }); 
    // }

}