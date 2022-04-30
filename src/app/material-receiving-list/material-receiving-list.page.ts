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
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { ActionSheetController } from '@ionic/angular';
import { ExpenselistPopoverComponent } from '../component/expenselist-popover/expenselist-popover.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-material-receiving-list',
  templateUrl: './material-receiving-list.page.html',
  styleUrls: ['./material-receiving-list.page.scss'],
})
export class MaterialReceivingListPage implements OnInit {


 today = Date.now();
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
  name:any;
 subject_name:any=[];
 marks:any=[];
 percentage:any=[];
 document:any=[];
 depositData:any = [];
 clientCode = "";
 clientName:'';
 total_amount:any=0;
 total_work_hrs:any=0;
 total_work_min:any=0;
 project_list:any='';
 search_project:any='';
 search_date:any='';
 search_category:any='';
 search_status:any='';
 category_list:any='';
 issue_project:any='';
 despatch_id_list:any=[];
 despatch_id:any='';
 
 constructor(private http: HttpClient, public navCtrl: NavController,
    public storage: Storage,public loadingController: LoadingController,
    public alertController: AlertController,
       private menu: MenuController,private fb:FormBuilder,
       private datePipe: DatePipe,
       public actionSheetController: ActionSheetController,
       public popoverCtrl: PopoverController,
       private popoverController: PopoverController
       //public events: Events
    ) { 
   this.productForm = this.fb.group({
     
      quantities: this.fb.array([]) ,
    });
   
   }

  ngOnInit() {
    this.storage.create();
    // this.storage.clear();
  }
 
 onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}

  ionViewWillEnter(){
  

   this.storage.get("genuserDetails").then(val=>{
      if(val){
        this.userDetails = val;
        this.userId=val.ID;
            this.getprojectList();
   //this.getcategoryList();
   this.reloadDepositData();
        }else{
        this.navCtrl.navigateForward('login');
      }
        });
  }
  ionViewDidEnter(){
  //  this.storage.clear();
   
  
    
  }

  async reloadDepositData(){
 
      //console.log(this.userId);
      
      const loading = await this.loadingController.create({
          message: ''
        });
        
           
        var headers = new HttpHeaders();
        headers.append('content-type', 'application/json; charset=utf-8');
      //this.submitted = true;
      
         await loading.present();
        //var data ={}
        var data ={
          
          "userid": this.userId,
          "search_project":this.search_project,
          "search_date":this.search_date,
          "search_category":this.search_category,
          "search_status":this.search_status,
          //this.password
        }
        this.http.post(host+'get-material-receiving-list', JSON.stringify(data),{ headers: headers })
        .subscribe((res:any) => {
         //console.log(res);
         loading.dismiss();
        if(res.status == true){
         
           this.depositData=res.response_data;
          this.total_amount=res.response_data.length;
          
         
          }else{
            this.depositData=res.response_data;
            this.total_amount=res.response_data.length;
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
  async doRefresh(event) {
    const loading = await this.loadingController.create({
      message: ''
    });
    
       
    var headers = new HttpHeaders();
    headers.append('content-type', 'application/json; charset=utf-8');
  //this.submitted = true;
  
     //await loading.present();
    //var data ={}
    var data ={
      
      "userid": this.userId,
      "search_project":this.search_project,
      "search_date":this.search_date,
      "search_category":this.search_category,
      "search_status":this.search_status,
      //this.password
    }
    this.http.post(host+'get-material-issue-request-list', JSON.stringify(data),{ headers: headers })
    .subscribe((res:any) => {
      //console.log(res);
      event.target.complete();
     loading.dismiss();
    if(res.status == true){
     
       this.depositData=res.response_data;
      this.total_amount=res.response_data.length;
      
     
      }else{
        this.depositData=res.response_data;
        this.total_amount=res.response_data.length;
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
       
         this.project_list=res.response_data;
                 
       
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
async getDespatchid(spid){
 
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
      
      "userid":this.userId,
      "sub_project_id":spid,
      //this.password
    }
    this.http.post(host+'get-material-despatchid-list', JSON.stringify(data),{ headers: headers })
    .subscribe((res:any) => {
      //console.log(res);
     loading.dismiss();
    if(res.status == true){
     
       this.despatch_id_list=res.response_data;
               
     
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

selectProject(id) {

  this.search_project = id;
  //console.log(id);
  this.reloadDepositData();
} 
selectDate(dt) {

  //this.search_date = this.datePipe.transform(dt, 'Y-MM-dd');
 // console.log(jj);
  //this.reloadDepositData();
}
selectCategory(id) {

  this.search_category = id;
  //console.log(id);
  this.reloadDepositData();
} 
selectStatus(id) {

  this.search_status = id;
  //console.log(id);
  this.reloadDepositData();
} 
  gotorequestpage(){
    this.navCtrl.navigateForward(['/return-request', {
     // clientName: 'test',
     
    }]);
  }
 
 
  
  async detailsView(desc,rejt,project) {
    var button_array = [
      { text: 'Project : '+project},
      { text: 'Description : '+desc},
     
  ];

 if(rejt){

button_array.push({ text: 'Reject reason : '+rejt });
}
    const actionSheet = await this.actionSheetController.create({
      header: "Short Details",
      cssClass: 'my-custom-class',
      buttons: button_array,
    });
    await actionSheet.present();
  }
  async settingsPopover(ev: any) {
    const siteInfo = { id: 1, name: 'edupala' };
    const popover = await this.popoverController.create({
      component: ExpenselistPopoverComponent,
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
  customPickerOptionFrom = {
    buttons: [
      {
        text: 'clear',
         
        handler: () => {
          this.search_date='';
          this.reloadDepositData();
           //this.ionCancel.emit();
        }
     },
     {
      text: 'cancel',
      role: 'cancel',
      handler: () => {
        //console.log(123);
        
      }
   },
     {
        text: 'Done',
        handler: (data: any) => {
          console.log(data);
 
          var dt = data.year.value+'-'+data.month.value+'-'+data.day.text;
          //convertDataToISO(this.datetimeValue);
         this.search_date= dt;
         //this.datePipe.transform(dt, 'Y-MM-dd');
         this.reloadDepositData();
         // console.log(this.search_date);
         // console.log(dt);
        }
     }
  ]
    
  }
  requestIssue(){
  	//alert(1);
if(this.issue_project==''){
	this.alertController.create({
           message: 'Please select project',
            buttons: ['OK']
          }).then(resalert => {
      
            resalert.present();
      
          });
}else if(this.despatch_id==''){
	this.alertController.create({
           message: 'Please select despatch ID',
            buttons: ['OK']
          }).then(resalert => {
      
            resalert.present();
      
          });
}else{
	this.navCtrl.navigateForward(['/material-receiving-add', {
	did: this.despatch_id, 
      pid: this.issue_project, 
    }]);
}
  	
  }
  edit_issue(mid,spid,mrid){
  	this.navCtrl.navigateForward(['/material-receiving-edit', {
  		mid: mid,
      pid: spid, 
      mrid: mrid, 
    }]);
  } 
  view_issue(mid,spid,mrid){
  	this.navCtrl.navigateForward(['/material-receiving-view', {
  		mid: mid,
      pid: spid, 
      mrid: mrid,
    }]);
  }
}
