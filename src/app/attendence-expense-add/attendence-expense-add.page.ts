import { Component, OnInit } from '@angular/core';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { host } from '../../environments/environment';
import { DomSanitizer} from '@angular/platform-browser';
import { IonSlides } from '@ionic/angular';
import { image_path } from '../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { ActionSheetController } from '@ionic/angular';
import { AddexpensePopoverComponent } from '../component/addexpense-popover/addexpense-popover.component';
import { PopoverController } from '@ionic/angular';
declare var window: any;
@Component({
  selector: 'app-attendence-expense-add',
  templateUrl: './attendence-expense-add.page.html',
  styleUrls: ['./attendence-expense-add.page.scss'],
})
export class AttendenceExpenseAddPage implements OnInit {
  maxDate = new Date(new Date().setDate(new Date().getDate())).toISOString();
  minDate=new Date(new Date().setDate(new Date().getDate() - 10)).toISOString();
  minTime:any='';
  maxTime:any= '18:30';
  newminTime:any='';
  submitted = false;
  applyForm: FormGroup;
  productForm: FormGroup;
      quantities() : FormArray {
    return this.productForm.get("quantities") as FormArray
  }
   
  newQuantity(): FormGroup {
    return this.fb.group({
      qty: '',
      price: '',
    })
  }
   
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
   
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
    }
   userDetails: any;
 userId: any;
 isLoading = false;
 res:any;
 project:any='';
 category:any='';
 start_time:any='';
 start_timenw:any='';
 end_time:any='';
 work_description:any='';
 clientID:any='';
 clientCode:any='';
 newMin:any='';
 address:any='';
 current_address:any='';
 expense_amount:any='';
 depositImage:any = "";
 isToggled: boolean;
 projecy_list:any="";
 category_list:any='';
 category_text:any='';
 subcategory_list:any='';
 subcategory_text:any='';
 subcategory:any='';
 uwe_from:any='';
 uwe_to:any='';
 uwe_where:any='';
 uwe_startkm:any='';
 uwe_endkm:any='';
 expense_date:any='';
 proof_doc:any='yes';
 uwe_vehicle_no:any='';
 imagePickerOptions = {
  maximumImagesCount: 1,
  quality: 50
};
bike_mileage:any='';
petrol_price:any='';
cpk:any=0;
sub_project:any='';
subproject_list:any=[];
amt_note:any='';
 constructor(private http: HttpClient, public navCtrl: NavController,
    public storage: Storage,public loadingController: LoadingController,
    public alertController: AlertController,
       private menu: MenuController,private fb:FormBuilder,
       private route: ActivatedRoute,
       private datePipe: DatePipe,
       public nativeGeocoder: NativeGeocoder, 
       public geolocation: Geolocation,
       public camera: Camera,
       private photoViewer: PhotoViewer,
       private base64: Base64,
       public sanitizer: DomSanitizer,
       private file: File,
       public actionSheetController: ActionSheetController,
       private popoverController: PopoverController
       //public events: Events
    ) { 
   this.productForm = this.fb.group({
     
      quantities: this.fb.array([]) ,
    });
 
        //this.clientID = this.route.snapshot.paramMap.get('clientName');
       // console.log(this.clientID);
       this.isToggled = false;
      
   }

  ngOnInit() {
  
    this.storage.create();
    //this.storage.set("mintime",'09:30');
  //  this.storage.clear();s
  }
  ionViewWillEnter(){
    this.storage.get("genuserDetails").then(val=>{
      if(val){
        this.userDetails = val;
        this.userId=val.ID;
        this.getprojectList();
        this.getcategoryList();
        }
      });
this.getLocation();

  }
 onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}
setMainTime(){
 // console.log(this.start_time);
  let tm=this.datePipe.transform(this.start_time, 'HH:mm');
  //console.log(tm);
  this.start_timenw = moment(tm, "HH:mm").add(1, 'minutes').format('HH:mm');
//console.log(this.start_timenw)
}
importFile(event,index) {
  //console.log(event);
    if (event.target.files && event.target.files.length > 0) {
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length)
        return;

      var fileName = files[0].name.toUpperCase();
      // this.document[index] = files[0];
      // if (fileName.endsWith(".JPG") || fileName.endsWith(".JPEG") || fileName.endsWith(".PNG")) {
      //   //console.log(files[0]);
      //   this.document[index] = files[0];
       
      // } else {
      //  this.document[index] = null;
       
      // }
    }

  }

  async submit_mode(){
    const loading = await this.loadingController.create({
      message: 'Sending...'
    });
    
       
    var headers = new HttpHeaders();
    headers.append('content-type', 'application/json; charset=utf-8');
if(!this.sub_project){
  this.alertController.create({
    message:'Please select project',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.project){
  this.alertController.create({
    message:'Please select sub-project',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.category){
  this.alertController.create({
    message:'Please select category',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.subcategory){
  this.alertController.create({
    message:'Please select type',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.expense_date){
  this.alertController.create({
    message:'Please select date',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}
else if((this.subcategory==8 || this.subcategory==20) && !this.uwe_startkm){
  this.alertController.create({
    message:'Please enter start km',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if((this.subcategory==8 || this.subcategory==20) && !this.uwe_endkm){
  this.alertController.create({
    message:'Please enter end km',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if((this.subcategory==8 || this.subcategory==20) && (this.uwe_endkm>0 && this.uwe_startkm>0) && (this.uwe_startkm>=this.uwe_endkm)){
      this.alertController.create({
           message: 'Please check start km and end km',
            buttons: ['OK']
          }).then(resalert => {
      
            resalert.present();
     
          });
    }
else if(this.category==1 && !this.uwe_from){
  this.alertController.create({
    message:'Please enter from',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(this.category==1 && !this.uwe_to){
  this.alertController.create({
    message:'Please enter to',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(this.subcategory==20 && !this.uwe_vehicle_no){
  this.alertController.create({
    message:'Please enter vehicle no',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(this.category==4 && !this.uwe_where){
  this.alertController.create({
    message:'Please enter where',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(this.category==11 && !this.uwe_where){
  this.alertController.create({
    message:'Please enter where',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.expense_amount){
  this.alertController.create({
    message:'Please enter amount',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}
else if(this.proof_doc=='yes' && !this.depositImage){
  this.alertController.create({
    message:'Please select image',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}
// else if(!this.work_description){
//   this.alertController.create({
//     message:'Please enter description',
//      buttons: ['OK']
//    }).then(resalert => {

//      resalert.present();

//    });
// }
else{


  //var splitted = this.getDropDownText2(this.project, this.projecy_list);
  var splitted2 = this.getDropDownTextsub(this.subcategory, this.subcategory_list); 
  //console.log(splitted)
  let localarray = {
    projectid : this.project,
    //splitted[0].sub_project_id,
    project : this.project,
    project_full : this.project,
    project_text :'',
    //splitted[0].project_id+' > '+splitted[0].sub_project_id,
    category : this.category,
    category_text : this.category_text,
    subcategory : this.subcategory,
    uwe_from : this.uwe_from,
    uwe_to : this.uwe_to,
    uwe_where : this.uwe_where,
    subcategory_text : splitted2[0].ec_name,
        expense_amount : this.expense_amount,
				work_description : this.work_description+' '+this.amt_note,
        depositImage:this.depositImage,
        address:this.address,
        expense_date:this.expense_date,
        userid: this.userId,
        proof_doc:this.proof_doc,
        uwe_startkm:this.uwe_startkm,
        uwe_endkm:this.uwe_endkm,
        uwe_vehicle_no:this.uwe_vehicle_no,
        
			};
     

      await loading.present();
      
      this.http.post(host+'user-work-expense-add', JSON.stringify(localarray),{ headers: headers })
      .subscribe((res:any) => {
       // console.log(res);
       loading.dismiss();
      if(res.status == true){
       
          
        this.alertController.create({
          message: 'Data save successful',
           buttons: ['OK']
         }).then(resalert => {
     
           resalert.present();
     
         });
       	this.navCtrl.back();
        
   
          this.project='';
          this.sub_project='';
          this.category='';
          this.category_text='';
          this.subcategory='';
         this.uwe_from='';
          this.uwe_to='';
          this.uwe_where='';
          this.uwe_vehicle_no='';
          this.expense_amount='';
				 this.work_description='';
        this.depositImage='';
        this.address='';
        this.expense_date='';
        this.proof_doc='yes';
        }else{
        this.alertController.create({
         message: 'Something went wrong',
          buttons: ['OK']
        }).then(resalert => {
    
          resalert.present();
    
        });
        loading.dismiss();
        }
      }, (err) => {
        //console.log(err);
        loading.dismiss();
      });




    }
		
	}
  async getprojectList(){
 
    //console.log(this.subject_name);
    
    const loading = await this.loadingController.create({
        message: ''
      });
      
         
      var headers = new HttpHeaders();
      headers.append('content-type', 'application/json; charset=utf-8');
    //this.submitted = true;
    
      // await loading.present();
      //var data ={}
      var data ={
        
        "userid": this.userId,
        
        //this.password
      }
      this.http.post(host+'user-project-get', JSON.stringify(data),{ headers: headers })
      .subscribe((res:any) => {
        //console.log(res);
       loading.dismiss();
      if(res.status == true){
       
         this.projecy_list=res.response_data;
                 
       
        }else{

        // this.alertController.create({
        //  message: 'Something went wrong',
        //   buttons: ['OK']
        // }).then(resalert => {
    
        //   resalert.present();
    
        // });
        loading.dismiss();
        }
      }, (err) => {
        //console.log(err);
        loading.dismiss();
      });
    
    
    

} 
async getcategoryList(){
 
  //console.log(this.subject_name);
  
  const loading = await this.loadingController.create({
      message: ''
    });
    
       
    var headers = new HttpHeaders();
    headers.append('content-type', 'application/json; charset=utf-8');
  //this.submitted = true;
  
    // await loading.present();
    //var data ={}
    var data ={
      
      "userid": this.userId,
      
      //this.password
    }
    this.http.post(host+'expense-category-get', JSON.stringify(data),{ headers: headers })
    .subscribe((res:any) => {
    //  console.log(res);
     loading.dismiss();
    if(res.status == true){
     
       this.category_list=res.response_data;
               
     
      }else{

      // this.alertController.create({
      //  message: 'Something went wrong',
      //   buttons: ['OK']
      // }).then(resalert => {
  
      //   resalert.present();
  
      // });
      loading.dismiss();
      }
    }, (err) => {
      //console.log(err);
      loading.dismiss();
    });
  
  
  

} 
async getsubcategoryList(){
 
  //console.log(this.subject_name);
  
  const loading = await this.loadingController.create({
      message: ''
    });
    
       
    var headers = new HttpHeaders();
    headers.append('content-type', 'application/json; charset=utf-8');
  //this.submitted = true;
  
    // await loading.present();
    //var data ={}
    var data ={
      
      "userid": this.userId,
      "catid": this.category,
      //this.password
    }
    this.http.post(host+'expense-subcategory-get', JSON.stringify(data),{ headers: headers })
    .subscribe((res:any) => {
     // console.log(res);
     loading.dismiss();
    if(res.status == true){
     
       this.subcategory_list=res.response_data;
               
     
      }else{

      // this.alertController.create({
      //  message: 'Something went wrong',
      //   buttons: ['OK']
      // }).then(resalert => {
  
      //   resalert.present();
  
      // });
      loading.dismiss();
      }
    }, (err) => {
      //console.log(err);
      loading.dismiss();
    });
  
  
  

} 
getDropDownText2(id, object){
  const selObj = _.filter(object, function (o) {
      return (_.includes(id,o.ID));
  });
  return selObj;

}
getDropDownText(id, object){
  const selObj = _.filter(object, function (o) {
      return (_.includes(id,o.ec_ID));
  });
  return selObj;

}
selectChange(id) {
  this.subcategory='';
this.getsubcategoryList();
  this.category_text = this.getDropDownText(id, this.category_list)[0].ec_name;
 // console.log(this.category_text);
  
}

getDropDownTextsub(id, object){
  const selObj = _.filter(object, function (o) {
      return (_.includes(id,o.ec_ID));
  });
  return selObj;

}
selectChangesub(id) {
//this.getsubcategoryList();
  this.subcategory_text = this.getDropDownTextsub(id, this.subcategory_list)[0].ec_name;
 // console.log(this.subcategory_text);
  
}

deposit_slip_image(sourceType){
  let options: CameraOptions = {
    quality: 30,
    targetWidth: 768,
    targetHeight: 1360,
     // allowEdit: true,
     destinationType: this.camera.DestinationType.FILE_URI,
     sourceType: sourceType,
    //sourceType: this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE
   };
   this.camera.getPicture(options).then(imageData => {
    
    this.base64.encodeFile(imageData).then((base64File: string) => {
      this.depositImage = base64File;
      // this.form.controls.ddImage = this.ddImage;				
    }, (err) => {
    //	this.showToastWithCloseButton("Image capture failed. Please try again.");
    });

   }, error => {
     //console.log('ERROR -> ' + JSON.stringify(error));
   });
}
async selectImage() {
  const actionSheet = await this.actionSheetController.create({
    header: "Select Image source",
    buttons: [{
      text: 'Load from Library',
      handler: () => {
        this.deposit_slip_image(this.camera.PictureSourceType.PHOTOLIBRARY);
      }
    },
    {
      text: 'Use Camera',
      handler: () => {
        this.deposit_slip_image(this.camera.PictureSourceType.CAMERA);
      }
    },
    {
      text: 'Cancel',
      role: 'cancel'
    }
    ]
  });
  await actionSheet.present();
}
  imageViewer(imageToView,text=''){
    this.photoViewer.show(imageToView, text);
  }
  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      let options: NativeGeocoderOptions = {
				useLocale: true,
				maxResults: 5
			};

      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
			.then((result: NativeGeocoderResult[]) => {
				// let data = {'pincode':result[0].postalCode, 'userId':10, 'type':'location', 'lat':this.latitude, 'lng': this.longitude}
        //console.log(result);
        this.address=result[0].subLocality+','+result[0].locality+','+result[0].postalCode+','+result[0].subAdministrativeArea
        +','+result[0].administrativeArea +','+result[0].countryName;
			}).catch((error: any) => console.log(error));
     }).catch((error) => {
       //console.log('Error getting location', error);
     });
  }
  async getLocationRel(){
   const loading = await this.loadingController.create({
        message: ''
      });
   loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };

      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
         loading.dismiss();
        // let data = {'pincode':result[0].postalCode, 'userId':10, 'type':'location', 'lat':this.latitude, 'lng': this.longitude}
       // console.log(result[0]);
       this.address=result[0].subLocality+','+result[0].locality+','+result[0].postalCode+','+result[0].subAdministrativeArea
       +','+result[0].administrativeArea +','+result[0].countryName;
      }).catch((error: any) => //console.log(error)
       loading.dismiss()
      );
     }).catch((error) => {
        loading.dismiss();
      // console.log('Error getting location', error);
     });
  }
  async settingsPopover(ev: any=null) {
    const siteInfo = { id: 1, name: 'edupala' };
    const popover = await this.popoverController.create({
      component: AddexpensePopoverComponent,
      event: ev,
      cssClass: 'popover_setting',
      componentProps: {
        site: siteInfo
      },
      translucent: true
    });

    popover.onDidDismiss().then((result) => {
      //console.log(result.data);
    });

    return await popover.present();
    /** Sync event from popover component */

  }
  
 forbike_price(event,subcat){
    if(event.target.value > 0 && subcat==8){
     if(this.uwe_endkm>0 && this.uwe_endkm>this.uwe_startkm){
       let dif=this.uwe_endkm-this.uwe_startkm;
       this.expense_amount=Math.round(dif*this.cpk);
       this.amt_note='Note : ('+this.expense_amount+') =P('+this.petrol_price+') / M('+this.bike_mileage+') × Km('+dif+')';
     }          
    }else{
      this.expense_amount='';
      this.amt_note='';
    }
    //console.log(subcat);
  }
  type_change(event){
    this.uwe_startkm='';
    this.uwe_endkm='';
    if(event.target.value!=8){
       this.expense_amount=''
         this.amt_note=''; 
    }else{
      if(this.expense_date){
      var dt=this.datePipe.transform(this.expense_date, 'Y-MM-dd');
  //this.search_date = this.datePipe.transform(dt, 'Y-MM-dd');
  //console.log(dt);
  //this.reloadDepositData();
  this.checkVersion(dt);
}
    } 
    //console.log(subcat);
  }
  selectDate(value) {
if(this.subcategory){
var dt=this.datePipe.transform(value, 'Y-MM-dd');
  //this.search_date = this.datePipe.transform(dt, 'Y-MM-dd');
  //console.log(dt);
  //this.reloadDepositData();
  this.checkVersion(dt);
}else{
    //this.expense_date='';
  this.alertController.create({
       message: 'Please select type',
        buttons: ['OK']
      }).then(resalert => {
  
        resalert.present();
  
      });

}
}
checkVersion(dt){
  if(this.subcategory==8){
   var headers = new HttpHeaders();
  
  headers.append('content-type', 'application/json; charset=utf-8');
   var data ={
          
    "userId": this.userId,
     "expense_date":dt,
  }
   this.http.post(host+'get-bike-mileprice', JSON.stringify(data),{ headers: headers })
  .subscribe((res:any) => {
//console.log(res);
if(res.status && res.response_data){
//console.log(res.response_data.st_appversion);
this.bike_mileage=res.response_data.bike_mileage;
this.petrol_price=res.response_data.petrol_price;
if(res.response_data.bike_mileage && res.response_data.petrol_price){
 this.cpk = res.response_data.petrol_price / res.response_data.bike_mileage;
//console.log(this.cpk);

}
}else{
  this.alertController.create({
       message: 'Petrol price & Bike mileage not given for this date, please contact to admin',
        buttons: ['OK']
      }).then(resalert => {
  
        resalert.present();
  
      });
  this.cpk =0;
}

  });
}
 }
 async getSubprojectList(pid){
  
    const loading = await this.loadingController.create({
        message: ''
      });
      var headers = new HttpHeaders();
      headers.append('content-type', 'application/json; charset=utf-8');
    
      var data ={
        
        "userid": this.userId,
        "project": pid,
       
      }
      this.http.post(host+'user-sub-project-get', JSON.stringify(data),{ headers: headers })
      .subscribe((res:any) => {
        //console.log(res);
       loading.dismiss();
      if(res.status == true){
       
         this.subproject_list=res.response_data;
        
        }else{
          this.subproject_list=[];
        } 
      }, (err) => {
        //console.log(err);
        loading.dismiss();
      });
  
}
}
