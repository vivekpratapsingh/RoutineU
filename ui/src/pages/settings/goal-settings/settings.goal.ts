import {Component} from '@angular/core';
import {NavParams,AlertController, PopoverController,NavController } from 'ionic-angular';
import { UpdateActivityLevelComponent } from './update-activitylevel/update-activity.level';
import { UpdateWeeklyGoalComponent } from './update-weeklygoal/update-weekly.goal';
import { UpdateGoalWeightComponent } from './update-goalweight/update-goal.weight';
import { UpdateCurrentWeightComponent } from './update-currentweight/update-current.weight';
import { UpdateStartingWeightComponent } from './update-startingweight/update-starting.weight';
import { MacrosHomeComponent } from '../../macros/macros.home';

@Component({
    templateUrl : 'settings.goal.html',
    styleUrls : ['/settings.goal.scss']
})
export class GoalSettingsComponent{

    user : any;
    goalWeight : any = 0;
    weeklyGoal : any = "Select weekly goal";
    constructor(private navParams : NavParams,private alertCtrl : AlertController,
        private popoverCtrl:PopoverController,private navCtrl : NavController){
        this.user = this.navParams.data.user;
        console.log(this.user);
        this.user.weight.initial.added = new Date(this.user.weight.initial.added).toLocaleDateString();
        console.log(this.user);
    }

    //update starting weight    
    editStartWeight(){
        let confirm = this.alertCtrl.create(
            {
                title: 'Do you want to change name?',
                message: 'If You want to update starting weight ?',
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
                            let popover = this.popoverCtrl.create(UpdateStartingWeightComponent, {
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

    //update weight    
    editWeight(){
        let confirm = this.alertCtrl.create(
            {
                title: 'Do you want to change current weight?',
                message: 'If You want to update current weight ?',
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
                            let popover = this.popoverCtrl.create(UpdateCurrentWeightComponent, {
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

    //update goal weight    
    editGoalWeight(){
        let confirm = this.alertCtrl.create(
            {
                title: 'Do you want to change Goal Weight?',
                message: 'If You want to update Goal Weight ?',
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
                            let popover = this.popoverCtrl.create(UpdateGoalWeightComponent, {
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

    //update weekly goal    
    editWeeklyGoal(){
        let confirm = this.alertCtrl.create(
            {
                title: 'Do you want to change Weekly Goal?',
                message: 'If You want to update Weekly Goal ?',
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
                            let popover = this.popoverCtrl.create(UpdateWeeklyGoalComponent, {
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

    //update activity level   
    editActivtyLevel(){
        let confirm = this.alertCtrl.create(
            {
                title: 'Do you want to change Activity Level?',
                message: 'If You want to change Activity Level ?',
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
                            let popover = this.popoverCtrl.create(UpdateActivityLevelComponent, {
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

    //open macronutrient page
    openMacroPage(){
        console.log('open macro clicked');
        this.navCtrl.push(MacrosHomeComponent,{user : this.user});
    }
}