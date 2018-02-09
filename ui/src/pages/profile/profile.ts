import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { UserPostComponent } from '../post/user-posts/user.posts';
import { UserConnectionComponent } from '../user-connections/user.connections';
import { UserTagComponent } from '../user-tags/user.tags';
import { AppSettingsHomeComponent } from '../settings/settings';
import { UserDietComponent } from '../diet/user.diet';
import { UserService } from '../../services/user.service';

@Component({
    templateUrl: 'profile.html',
    styleUrls: ['/profile.scss']
})
export class ProfileComponent implements OnInit {
    @ViewChild('barCanvas') barCanvas;

    barChart: any;
    user : any;
    userId : any;
    constructor(public navCtrl: NavController,private userService : UserService) {
        this.userId = localStorage.getItem('id');
        console.log(this.userId);
        this.getUserDetailsById(this.userId,(result) => {
            console.log(result);
            this.user = result;
            console.log(this.user);
        });
    }

    // Calorie consumption chart
    ionViewDidLoad() {
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: {
                labels: ['15-Jan', '16-Jan', '17-Jan', '18-Jan', '19-Jan', '20-Jan', '21-Jan','22-Jan'],
                datasets: [{
                    label: 'Calorie(in Kcal)',
                    data: [2300, 2200, 1900, 2590, 2100, 1400, 2700,1300],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    }

    ngOnInit(){
        
    }
    //Open posts
    openPosts(){
        this.navCtrl.push(UserPostComponent);
    }

    //show connections
    openConnections(){
        this.navCtrl.push(UserConnectionComponent)
    }

    //show tags
    openTags(){
        this.navCtrl.push(UserTagComponent);
    }

    //Open settings home page
    openSettings(){
        this.navCtrl.push(AppSettingsHomeComponent,{user : this.user});
    }

    //open user diet
    checkDiet(){
        this.navCtrl.push(UserDietComponent,{'userId':'1','name':'Vivek Pratap Singh'});
    }

    //get user detials by id
    getUserDetailsById(id:any,callback){
        this.userService.getUserDetailsById(id).subscribe(user => {
            callback(user);
        })
    }
}