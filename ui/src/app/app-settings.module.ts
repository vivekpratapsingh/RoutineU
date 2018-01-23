import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { AppSettingsHomeComponent } from '../pages/settings/settings';
import { GoalSettingsComponent } from '../pages/settings/goal-settings/settings.goal';
import { AppSettingsComponent } from '../pages/settings/app-settings/settings.app';
import { ProfileEditComponent } from '../pages/settings/edit-profile/profile.edit';
import { UpdateNameComponent } from '../pages/settings/edit-profile/update-name/update.name';

@NgModule({
    declarations :[
        AppSettingsHomeComponent,
        GoalSettingsComponent,
        AppSettingsComponent,
        ProfileEditComponent,
        UpdateNameComponent
    ],
    imports:[
        IonicModule.forRoot(AppSettingsHomeComponent)
    ],
    entryComponents : [
        AppSettingsHomeComponent,
        GoalSettingsComponent,
        AppSettingsComponent,
        ProfileEditComponent,
        UpdateNameComponent
    ],
})
export class AppSettingsModule{

}