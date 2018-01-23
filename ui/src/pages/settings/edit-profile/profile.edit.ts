import {Component} from '@angular/core';
import {NavParams,AlertController,PopoverController} from 'ionic-angular';
import { UpdateNameComponent } from './update-name/update.name';

@Component({
    templateUrl : 'profile.edit.html',
    styleUrls : ['/profile.edit.scss']
})
export class ProfileEditComponent{

    userId : any;
    user : any;

    constructor(public navParams : NavParams,public alertCtrl : AlertController,public popoverCtrl : PopoverController){
        this.userId = this.navParams.data.userId;
        this.user = {
            'userId' : '1',
            'name' : 'Vivek Pratap Singh'
        };
    }

    //Edit full name
    editName(){
        let confirm = this.alertCtrl.create(
            {
                title : 'Do you want to change name?',
                message : 'If You want to change name, press Yes otherwise No',
                buttons : [
                    {
                        text : 'No',
                        handler : () =>{
                            console.log("No clicked");
                        }
                    },
                    {
                        text : 'Yes',
                        handler : () => {
                            let popover = this.popoverCtrl.create(UpdateNameComponent,{
                                user : this.user
                            });
                            popover.present();
                        }
                    }
                ]
            }
        );
        confirm.present();
    }
}