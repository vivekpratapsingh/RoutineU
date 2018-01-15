import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from '../pages/login/login';
import { IndexComponent } from '../pages/index/index';

const appRoutes : Routes = [
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path:'welcome',
        component : IndexComponent
    }
    ,{ path : '',redirectTo : '/login',pathMatch : 'full'},
]

@NgModule({
    imports : [
        RouterModule.forRoot(appRoutes)
    ],
    exports : [
        RouterModule
    ]
})
export class AppRoutingModule{

}