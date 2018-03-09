import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare var FB: any;

@Injectable()
export class UserService {


    userDetails: any;
    userID: any;
    baseUrl: any;
    constructor(public http: Http) {
        // FB.init({
        //     appId: '1965211123733241',
        //     status: false, // the SDK will attempt to get info about the current user immediately after init
        //     cookie: false,  // enable cookies to allow the server to access the session
        //     xfbml: false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
        //     version: 'v2.11' // use graph api version 2.5
        // });
        this.baseUrl = 'http://localhost:3000/';
    }

    fbLogin() {
        return new Promise((resolve, reject) => {
            FB.login(result => {
                console.log(result.authResponse.userID);
                if (result.authResponse) {
                    return this.http.post(`http://localhost:3000/auth/facebook`, { access_token: result.authResponse.accessToken })
                        .toPromise()
                        .then(response => {
                            console.log(response);
                            var token = response.headers.get('x-auth-token');
                            if (token) {
                                localStorage.setItem('id_token', token);
                            }
                            // resolve(response.json());
                            console.log(response.json());
                            FB.api('/' + result.authResponse.userID, 'GET', { fields: ['timezone', 'picture', 'birthday', 'age_range', 'email', 'gender', 'first_name', 'middle_name', 'last_name', 'location.fields(location)'] }, function (res) {
                                console.log(JSON.stringify(res));
                                let userDetails = {
                                    name: {
                                        first_name: res.first_name,
                                        middle_name: res.middle_name,
                                        last_name: res.last_name,
                                    },
                                    birthday: res.birthday,
                                    gender: res.gender,
                                    timezone: res.timezone,
                                    picture: res.picture.data.url,
                                    location: {
                                        city: res.location.location.city,
                                        country: res.location.location.country,
                                        latitude: res.location.location.latitude,
                                        longitude: res.location.location.longitude
                                    }
                                };
                                this.userDetails = userDetails;
                                resolve({ 'userDetails': userDetails, 'userID': response.json() });
                            });

                        })
                        .catch(() => console.log(reject()));
                } else {
                    reject();
                }
            }, { scope: 'public_profile,email,user_birthday,user_location' })
        });
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    isLoggedIn(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getCurrentUser().then(user => resolve(user)).catch(() => reject(false));
        });
    }

    getCurrentUser() {
        return new Promise((resolve, reject) => {
            let headers: Headers = new Headers();
            headers.append('x-auth-token', localStorage.getItem('id_token'));
            headers.append('Content-Type', 'application/json');
            let options: RequestOptions = new RequestOptions({
                headers: headers
            });
            return this.http.get(`http://localhost:3000/auth/me`, options).toPromise().then(response => {
                console.log(response.json());
                resolve(response.json());
            }).catch(() => reject());
        });
    }

    updateUserDetail(data: any, userId: Number): Observable<any> {
        let headers: Headers = new Headers();
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({
            headers: headers
        });
        return this.http.put('http://localhost:3000/users/' + userId, data, options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUserDetailsById(userId: any): Observable<any> {
        let headers: Headers = new Headers();
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({
            headers: headers
        });
        return this.http.get(this.baseUrl + 'users/' + userId, options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    //add water log
    addWaterLog(water: any): Observable<any> {
        let headers: Headers = new Headers();
        let userId = localStorage.getItem('id');
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({
            headers: headers
        });
        return this.http.post(this.baseUrl + 'users/' + userId + '/logs/water', water, options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error.status));

    }

    //update water log
    updateWaterLog(water: any): Observable<any> {
        let headers: Headers = new Headers();
        let userId = localStorage.getItem('id');
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({
            headers: headers
        });
        return this.http.put(this.baseUrl + 'users/' + userId + '/logs/water', water, options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error.status));

    }

    //remove water log
    removeWaterLog(id: any): Observable<any> {
        console.log(id);
        let headers: Headers = new Headers();
        let userId = localStorage.getItem('id');
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({
            headers: headers
        });
        return this.http.delete(this.baseUrl + 'users/' + userId + '/logs/water/'+id, options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error.status));
    }

    //add diet log
    addDietLog(food: any): Observable<any> {
        let headers: Headers = new Headers();
        let userId = localStorage.getItem('id');
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({
            headers: headers
        });
        return this.http.post(this.baseUrl + 'users/' + userId + '/logs/food', food, options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error.status));
    }

    //update diet log
    updateDietLog(food: any): Observable<any> {
        let headers: Headers = new Headers();
        let userId = localStorage.getItem('id');
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({
            headers: headers
        });
        return this.http.put(this.baseUrl + 'users/' + userId + '/logs/food', food, options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error.status));
    }

    //remove diet log 
    removeDietLog(logId :any) : Observable<any>{
        console.log(logId);
        let headers: Headers = new Headers();
        let userId = localStorage.getItem('id');
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({
            headers: headers
        });
        return this.http.delete(this.baseUrl + 'users/' + userId + '/logs/food/'+logId, options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error.status));
    }

    //get user diet log by date
    // getDietLogByDate(userId : any,)
}   