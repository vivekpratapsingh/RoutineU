import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    
    templateUrl : 'login.html',
    styleUrls : ['/login.scss']
})
export class LoginComponent implements OnInit{

    constructor(private router : Router){
        this.router.navigate(['login']);
    }

    ngOnInit(){
        console.log('inside login');
        
    }

}