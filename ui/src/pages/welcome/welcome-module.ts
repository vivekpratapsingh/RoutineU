import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { WelcomeComponent } from './welcome.component';

@NgModule({
    declarations :[
        WelcomeComponent
    ],
    imports :[
        IonicModule.forRoot(WelcomeComponent)
    ],
    entryComponents : [
        WelcomeComponent
    ]
})
export class WelcomeModule{

}