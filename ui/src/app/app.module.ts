import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import {LoginComponent} from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from '../pages/index/index';
import { HomeComponent } from '../pages/home/home';
import { ProfileComponent } from '../pages/profile/profile';
import { SearchComponent } from '../pages/search/search';
import { UserService } from '../services/user.service';

@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    IndexComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AppRoutingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeComponent,
    ProfileComponent,
    SearchComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
