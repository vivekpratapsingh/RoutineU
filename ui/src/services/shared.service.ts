import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class SharedService{
    data : BehaviorSubject<any> = new BehaviorSubject<any>(null);
}