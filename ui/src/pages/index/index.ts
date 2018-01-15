import {Component} from '@angular/core';
import { HomeComponent } from '../home/home';
import { SearchComponent } from '../search/search';
import { ProfileComponent } from '../profile/profile';

@Component({
    templateUrl : 'index.html',
    styleUrls : ['/index.scss']
})
export class IndexComponent{
    home : any;
    search : any;
    profile : any;

    constructor(){
        this.home = HomeComponent;
        this.search = SearchComponent;
        this.profile = ProfileComponent
    }
}