import {Component} from '@angular/core';
import {ViewController,NavParams} from 'ionic-angular';
import { UserService } from '../../../../services/user.service';
import { ThrowStmt } from '@angular/compiler/src/output/output_ast';

@Component({
    template : `
        
            <ion-list>
                <ion-list-header>
                Full Name
                    <ion-icon item-end ios="ios-close" md="md-close" (click)="close()"></ion-icon>
                </ion-list-header>
                    <ion-item>
                    <ion-input type="text" [(ngModel)]="first_name"></ion-input>
                    </ion-item>
                    <ion-item>
                    <ion-input type="text" [(ngModel)]="middle_name"></ion-input>
                    </ion-item>
                    <ion-item>
                    <ion-input type="text" [(ngModel)]="last_name"></ion-input>
                    </ion-item>
                    <button ion-button small  (click)="saveName()" style="float:right">Save</button>
            </ion-list>
    `,
})
export class UpdateNameComponent{

    user : any;
    first_name : String;
    middle_name : String;
    last_name : String;
    constructor(public viewCtrl : ViewController,public navParams : NavParams,private userService : UserService){
        this.user = this.navParams.data.user;
        console.log(this.user);
        this.first_name = this.user.name.first_name;
        this.last_name = this.user.name.last_name;
        this.middle_name = this.user.name.middle_name;
    }

    close(){
        this.viewCtrl.dismiss();
    }

    saveName(){
        console.log('save name clicked');
        
        this.user.name = {
            first_name : this.first_name,
            middle_name : this.middle_name,
            last_name : this.last_name
        }

        this.userService.updateUserDetail(this.user,this.user._id)
                        .subscribe(result => {
                            // this.user.name = result.name;
                        });
        //console.log(this.tempUser);
        console.log(this.user);
        this.viewCtrl.dismiss();
    }
}