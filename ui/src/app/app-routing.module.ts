import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from '../pages/login/login';
import { IndexComponent } from '../pages/index/index';
import { AuthGuard } from '../services/auth.gaurd';
import { AnonymousGuard } from '../services/anonymous.gaurd';
import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { UserResolve } from '../services/user.resolve';

const appRoutes : Routes = [
    {
        path : 'login',
        component : LoginComponent,
        canActivate : [AnonymousGuard]
    },
    {
        path:'home/:id',
        component : IndexComponent,
        canActivate : [AuthGuard],
        resolve : {
            user : UserResolve
        }
    },
    {
        path:'welcome/:id',
        component : WelcomeComponent,
        canActivate : [AuthGuard],
        resolve : {
            user : UserResolve
        }
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
        AnonymousGuard,
        UserResolve
    ]
})
export class AppRoutingModule{

}