import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ExerciseService {

    baseUrl: any;
    constructor(private http: Http) {
        this.baseUrl = 'http://localhost:3000/';
    }

    getExerciseByQuery(q: string): Observable<any> {
        let headers: Headers = new Headers();
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', q);
        let options: RequestOptions = new RequestOptions({
            headers: headers,
            search: params
        });
        return this.http.get(this.baseUrl + 'exercises/' + 'name', options)
            .map((res: any) => res.json())
            .catch((error: any) => {
                return Observable.throw(error.status);
            });
    }

    addExerciseMaster(exercise: any): Observable<any> {
        let headers: Headers = new Headers();
        exercise.added_by = localStorage.getItem('id');
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({
            headers: headers
        });
        return this.http.post(this.baseUrl + 'exercises', exercise, options)
            .map((res: any) => res.json())
            .catch((error: any) => {
                return Observable.throw(error.status);
            });
    }

    //add exercise log
    addExerciseLog(exerciseLog: any): Observable<any> {
        let headers: Headers = new Headers();
        let userId = localStorage.getItem('id');
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({
            headers: headers
        });
        return this.http.post(this.baseUrl + 'users/' + userId + '/logs' + '/exercises', exerciseLog, options)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.status));
    }

    //update exercise log
    updateExerciseLog(exerciseLog: any): Observable<any> {
        console.log(exerciseLog);
        let headers: Headers = new Headers();
        let userId = localStorage.getItem('id');
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({
            headers: headers
        });
        return this.http.put(this.baseUrl + 'users/' + userId + '/logs' + '/exercises', exerciseLog, options)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json()));
    }

    //remove exercise log
    removeExerciseLog(logId: any): Observable<any> {
        console.log(logId);
        let headers: Headers = new Headers();
        let userId = localStorage.getItem('id');
        headers.append('x-auth-token', localStorage.getItem('id_token'));
        headers.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({
            headers: headers
        });
        return this.http.delete(this.baseUrl + 'users/' + userId + '/logs' + '/exercises/' + logId, options)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.status));
    }
}