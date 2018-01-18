import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { UserPostComponent } from '../post/user-posts/user.posts';

@Component({
    templateUrl: 'profile.html',
    styleUrls: ['/profile.scss']
})
export class ProfileComponent {
    @ViewChild('barCanvas') barCanvas;

    barChart: any;

    constructor(public navCtrl: NavController) { }

    // Calorie consumtion chart
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

    //Open posts
    openPosts(){
        this.navCtrl.push(UserPostComponent);
    }
}