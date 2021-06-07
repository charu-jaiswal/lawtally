import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UsersService } from './core/users.service';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';
import { DatePipe, LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { LawTallyModule } from './LawTally/LawTally.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './LawTally/home/home.component';
import { PageNotFoundComponent } from './Other/page-not-found/page-not-found.component';
import { ExcelService } from './core/excel.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, } from 'angularfire2/auth';
import { AngularFirestoreModule, } from 'angularfire2/firestore';
import { SharedModule } from './shared.module';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import 'chart.piecelabel.js'; // after 'ng2-charts'

import {
   SocialLoginModule,
   AuthServiceConfig,
   GoogleLoginProvider,
   FacebookLoginProvider,
   LinkedinLoginProvider
} from "angular-6-social-login";
export function getAuthServiceConfigs() {
   let config = new AuthServiceConfig(
      [
         {
            id: LinkedinLoginProvider.PROVIDER_ID,
            provider: new LinkedinLoginProvider("86d5ni93pum159")
         },
      ]);

   return config;
}
@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      PageNotFoundComponent      
   ],
   imports: [
      BrowserModule,ChartsModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      LawTallyModule,
      HttpClientModule,
      NgSelectModule, AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule, // imports firebase/firestore, only needed for database features
      AngularFireAuthModule,
      GooglePlaceModule,
      AngularEditorModule, SocialLoginModule,
      NgxPaginationModule,
      NgbModule,
      NgMultiSelectDropDownModule.forRoot(),
      NgxLoadingModule.forRoot({
         animationType: ngxLoadingAnimationTypes.circle,
         backdropBackgroundColour: 'rgba(0,0,0,0.0)',
         backdropBorderRadius: '4px',
         primaryColour: '#ff3b4b',
         // secondaryColour: '#FF6536',
         // tertiaryColour: '#FFD039'
      }),
      BrowserAnimationsModule,
      NgxPermissionsModule.forRoot(),
      SharedModule,
   ],
   providers: [
      UsersService,
      AuthGuard,
      AuthService,
      DatePipe,
      ExcelService,
      {
         provide: AuthServiceConfig,
         useFactory: getAuthServiceConfigs
      },
      { provide: LocationStrategy, useClass: PathLocationStrategy }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
