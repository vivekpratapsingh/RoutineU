import {Injectable} from '@angular/core';
import { CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkLogin();
    }

    checkLogin(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userService.isLoggedIn().then((user) => {
                resolve(true);
            }).catch(() => {
                this.router.navigate(['/login']);
                reject(false);
            });
        });
    }
}