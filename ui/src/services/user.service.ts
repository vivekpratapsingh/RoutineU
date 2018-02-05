import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http/src/base_request_options';




@Injectable()
export class UserService {

<<<<<<< HEAD
    constructor(public http: Http) {
        FB.init({
            appId: '1965211123733241',
            status: false, // the SDK will attempt to get info about the current user immediately after init
            cookie: false,  // enable cookies to allow the server to access the session
            xfbml: false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
            version: 'v2.11' // use graph api version 2.5
        });
    }

    fbLogin() {
        return new Promise((resolve, reject) => {
            FB.login(result => {
                //console.log(result.authResponse);
                if (result.authResponse) {
                    return this.http.post(`http://localhost:3000/auth/facebook`, { access_token: result.authResponse.accessToken })
                        .toPromise()
                        .then(response => {
                            console.log(response);
                            var token = response.headers.get('x-auth-token');
                            if (token) {
                                localStorage.setItem('id_token', token);
                            }
                            resolve(response.json());
                        })
                        .catch(() => console.log(reject()) );
                } else {
                    reject();
                }
            }, { scope: 'public_profile,email' })
        });
=======
    constructor(private http: Http) {
        // FB.init({
        //     appId: '309065162909138',
        //     status: false, // the SDK will attempt to get info about the current user immediately after init
        //     cookie: false,  // enable cookies to allow the server to access
        //     // the session
        //     xfbml: false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
        //     version: 'v2.8' // use graph api version 2.5
        // });
    }

    fbLogin() {
        // return new Promise((resolve, reject) => {
        //     FB.login(result => {
        //         if (result.authResponse) {
        //             return this.http.post(`http://localhost:3000/api/v1/auth/facebook`, { access_token: result.authResponse.accessToken })
        //                 .toPromise()
        //                 .then(response => {
        //                     var token = response.headers.get('x-auth-token');
        //                     if (token) {
        //                         localStorage.setItem('id_token', token);
        //                     }
        //                     resolve(response.json());
        //                 })
        //                 .catch(() => reject());
        //         } else {
        //             reject();
        //         }
        //     }, { scope: 'public_profile,email' })
        // });
>>>>>>> 66f9fa3f547854310f3bb0efb17cace61a8e6709
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    isLoggedIn() {
        return new Promise((resolve, reject) => {
            this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
        });
    }

    getCurrentUser() {
        return new Promise((resolve, reject) => {
            // let headers : Headers = new Headers().append('x-auth-token',localStorage.getItem('id_token'));
            // // headers.append('x-auth-token',localStorage.getItem('id_token'));
            // // headers.append('Content-Type', 'application/json');
            // let options : RequestOptions = new RequestOptions({
            //     headers : headers
            // });
            return this.http.get(`http://localhost:3000/auth/me`,options).toPromise().then(response => {
                resolve(response.json());
            }).catch(() => reject());
        });
    }
}