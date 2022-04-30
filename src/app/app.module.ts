import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 // import { IonicStorageModule } from '@ionic/storage-angular';
 //import { IonicStorageModule } from '@ionic/storage';
import { RouteReuseStrategy } from '@angular/router';
import { Storage } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Events } from "./event/events.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { DatePipe } from '@angular/common';
import { Camera } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';
import { Network } from '@ionic-native/network/ngx';
import { File } from '@ionic-native/file/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { ExpenselistPopoverComponent } from './component/expenselist-popover/expenselist-popover.component';
import { AddexpensePopoverComponent } from './component/addexpense-popover/addexpense-popover.component';
import { AdvanceAddComponent } from './component/advance-add/advance-add.component';
import { AdvanceComponent } from './component/advance/advance.component';
import { CreateleavegenPopoverComponent } from './component/createleavegen-popover/createleavegen-popover.component';
import { SettingComponent } from './component/setting/setting.component';
import { ReturnrequestPopoverComponent } from './component/returnrequest-popover/returnrequest-popover.component';
import { MyattendancelistPopoverComponent } from './component/myattendancelist-popover/myattendancelist-popover.component';
import { AttendancePopoverComponent } from './component/attendance-popover/attendance-popover.component';
import { WalletPopoverComponent } from './component/wallet-popover/wallet-popover.component';


@NgModule({
  declarations: [AppComponent,ExpenselistPopoverComponent,AddexpensePopoverComponent,
  AdvanceAddComponent,AdvanceComponent,CreateleavegenPopoverComponent,SettingComponent,
  ReturnrequestPopoverComponent,MyattendancelistPopoverComponent,AttendancePopoverComponent
  ,WalletPopoverComponent
  ],
  entryComponents: [],
  imports: [
  BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
  //IonicStorageModule.forRoot(), 
  FormsModule, ReactiveFormsModule,
  ],
  providers: [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
  Events, NativeGeocoder, Storage,DatePipe,Camera,PhotoViewer,Base64, LocationAccuracy,
    Geolocation,BatteryStatus,Network,File,SplashScreen,
    AndroidPermissions,AppVersion
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
