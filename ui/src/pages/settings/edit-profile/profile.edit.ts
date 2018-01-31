import { Component } from '@angular/core';
import { NavParams, AlertController, PopoverController } from 'ionic-angular';
import { UpdateNameComponent } from './update-name/update.name';
import { UpdateHeightComponent } from './update-height/update.height';
import {UpdateGenderComponent} from './update-gender/update.gender';
import { UpdateCountryComponent } from './update-country/update.country';
import { UpdateTimeZoneComponent } from './update-timezone/update.timezone';
import { UpdateDOBComponent } from './update-dob/update.dob';

@Component({
    templateUrl: 'profile.edit.html',
    styleUrls: ['/profile.edit.scss']
})
export class ProfileEditComponent {

    userId: any;
    user: any;
    disableDateTime : any;

    constructor(public navParams: NavParams, public alertCtrl: AlertController, public popoverCtrl: PopoverController) {
        this.userId = this.navParams.data.userId;
        this.user = {
            'userId': '1',
            'name': 'Vivek Pratap Singh',
            'height': '160',
            'gender':'male',
            'dateOfBirth':'01/14/2017',
            'country':'india',
            'timezone':'chennai',
        };
        this.disableDateTime = false;
    }

    //update full name
    editName() {
        let confirm = this.alertCtrl.create(
            {
                title: 'Do you want to change name?',
                message: 'If You want to change name, press Yes otherwise No',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            console.log("No clicked");
                        }
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            let popover = this.popoverCtrl.create(UpdateNameComponent, {
                                user: this.user
                            });
                            popover.present();
                        }
                    }
                ]
            }
        );
        confirm.present();
    }

    //update Height
    editHeight() {
        let confirm = this.alertCtrl.create(
            {
                title: 'Do you want to change Height?',
                message: 'If You want to change height, press Yes otherwise No',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            console.log("No clicked");
                        }
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            let popover = this.popoverCtrl.create(UpdateHeightComponent, {
                                user: this.user
                            });
                            popover.present();
                        }
                    }
                ]
            }
        );
        confirm.present();
    }

    //update Gender
    editGender(){
        let confirm = this.alertCtrl.create(
            {
                title: 'Do you want to change gender?',
                message: 'If You want to change gender, press Yes otherwise No',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            console.log("No clicked");
                        }
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            let popover = this.popoverCtrl.create(UpdateGenderComponent, {
                                user: this.user
                            });
                            popover.present();
                        }
                    }
                ]
            }
        );
        confirm.present();
    }

    //update Country
    editCountry(){
        let confirm = this.alertCtrl.create(
            {
                title: 'Do you want to change country name?',
                message: 'If You want to change country name, press Yes otherwise No',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            console.log("No clicked");
                        }
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            let popover = this.popoverCtrl.create(UpdateCountryComponent, {
                                user: this.user
                            });
                            popover.present();
                        }
                    }
                ]
            }
        );
        confirm.present();
    }

    //update Timezone
    editTimeZone(){
        let confirm = this.alertCtrl.create(
            {
                title: 'Do you want to change time zone?',
                message: 'If You want to change time zone, press Yes otherwise No',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            console.log("No clicked");
                        }
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            let popover = this.popoverCtrl.create(UpdateTimeZoneComponent, {
                                user: this.user
                            });
                            popover.present();
                        }
                    }
                ]
            }
        );
        confirm.present();
    }

    //update date of birth
    editDOB(){
        let confirm = this.alertCtrl.create(
            {
                title: 'Do you want to change date of birth?',
                message: 'If You want to change date of birth, press Yes otherwise No',
                buttons: [
                    {
                        text: 'No',
                        handler: () => {
                            console.log("No clicked");
                        }
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            let popover = this.popoverCtrl.create(UpdateDOBComponent, {
                                user: this.user
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