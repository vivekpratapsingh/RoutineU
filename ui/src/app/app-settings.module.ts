import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { AppSettingsHomeComponent } from '../pages/settings/settings';
import { GoalSettingsComponent } from '../pages/settings/goal-settings/settings.goal';
import { AppSettingsComponent } from '../pages/settings/app-settings/settings.app';
import { ProfileEditComponent } from '../pages/settings/edit-profile/profile.edit';
import { UpdateNameComponent } from '../pages/settings/edit-profile/update-name/update.name';
import { UpdateHeightComponent } from '../pages/settings/edit-profile/update-height/update.height';
import { UpdateGenderComponent } from '../pages/settings/edit-profile/update-gender/update.gender';
import { UpdateTimeZoneComponent } from '../pages/settings/edit-profile/update-timezone/update.timezone';
import { UpdateCountryComponent } from '../pages/settings/edit-profile/update-country/update.country';
import { UpdateDOBComponent } from '../pages/settings/edit-profile/update-dob/update.dob';

@NgModule({
    declarations :[
        AppSettingsHomeComponent,
        GoalSettingsComponent,
        AppSettingsComponent,
        ProfileEditComponent,
        UpdateNameComponent,
        UpdateHeightComponent,
        UpdateGenderComponent,
        UpdateTimeZoneComponent,
        UpdateDOBComponent,
        UpdateCountryComponent
    ],
    imports:[
        IonicModule.forRoot(AppSettingsHomeComponent)
    ],
    entryComponents : [
        AppSettingsHomeComponent,
        GoalSettingsComponent,
        AppSettingsComponent,
        ProfileEditComponent,
        UpdateNameComponent,
        UpdateHeightComponent,
        UpdateGenderComponent,
        UpdateTimeZoneComponent,
        UpdateDOBComponent,
        UpdateCountryComponent
    ],
})
export class AppSettingsModule{

}