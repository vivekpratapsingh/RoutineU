import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from '../pages/login/login';
import { IndexComponent } from '../pages/index/index';
import { AuthGuard } from '../services/auth.gaurd';
import { AnonymousGuard } from '../services/anonymous.gaurd';

const appRoutes : Routes = [
    {
        path : 'login',
        component : LoginComponent,
        canActivate : [AnonymousGuard]
    },
    {
        path:'welcome',
        component : IndexComponent,
        canActivate : [AuthGuard]
    }
    ,{ path : '',redirectTo : '/login',pathMatch : 'full'},
]

@NgModule({
    imports : [
        RouterModule.forRoot(appRoutes)
    ],
    exports : [
        RouterModule
    ],
    providers:[
        AuthGuard,
        AnonymousGuard
    ]
})
export class AppRoutingModule{

}