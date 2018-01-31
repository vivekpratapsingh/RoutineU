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
import { UserPostComponent } from '../pages/post/user-posts/user.posts';
import { PostCommentComponent } from '../pages/post/post-comments/post.comment';
import { PostLikeComponent } from '../pages/post/post-likes/post.like';
import { UserTagComponent } from '../pages/user-tags/user.tags';
import { UserConnectionComponent } from '../pages/user-connections/user.connections';
import { AppSettingsModule } from './app-settings.module';

@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    IndexComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    UserPostComponent,
    PostCommentComponent,
    PostLikeComponent,
    UserTagComponent,
    UserConnectionComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AppRoutingModule,
    AppSettingsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    UserPostComponent,
    PostCommentComponent,
    PostLikeComponent,
    UserTagComponent,
    UserConnectionComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
