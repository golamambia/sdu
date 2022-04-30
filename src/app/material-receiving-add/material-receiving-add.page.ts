import { Component, OnInit} from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-material-receiving-add',
  templateUrl: './material-receiving-add.page.html',
  styleUrls: ['./material-receiving-add.page.scss'],
})
export class MaterialReceivingAddPage implements OnInit {
 submitted = false;
  
	today = Date.now();
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
 currentSelected:any=[];
 sub_project_id:any='';
 sub_project_idnw:any=[];
 project_idnw:any=[];
 material_issue_referencec_id:any='';
 main_project_details:any='';
 requiredby_qty:any=[];
 material_required_by:any='';
 created_at:any='';
 public projects_materials_issue_id:any=[];
 warehouse_id:any=[];
 master_item_combinations_id:any=[];
 product_id:any=[];
 grn_srn_products_id:any=[];
 master_uom_id:any=[];
 btn_item_check:any=[];
 grn_srn_id:any=[];
 master_item_id:any=[];
 despatch_id:any='';
 status:any=[];
 projects_materials_despatch_id:any=[];
 projects_materials_despatch_ref_id:any=[];
 master_item_stock_id_for_despatch:any=[];
 actual_quantity:any=[];
 material_receiving_referencec_id:any='';
 constructor(private http: HttpClient, public navCtrl: NavController,
    public storage: Storage,public loadingController: LoadingController,
    public alertController: AlertController,
       private menu: MenuController,private fb:FormBuilder,
       private datePipe: DatePipe,
       public actionSheetController: ActionSheetController,
       public popoverCtrl: PopoverController,
       private popoverController: PopoverController,
       private route: ActivatedRoute,
       private formBuilder: FormBuilder,
       //public events: Events
    ) { 
  
   this.sub_project_id = this.route.snapshot.paramMap.get('pid');
   this.despatch_id = this.route.snapshot.paramMap.get('did');
   
   }

 ngOnInit() {
    this.storage.create();
    // this.storage.clear();
     
  }
  ionViewWillEnter(){
  

   this.storage.get("genuserDetails").then(val=>{
      if(val){
        this.userDetails = val;
        this.userId=val.ID;
            this.getprojectList();
    
   this.reloadDepositData();
        }else{
        this.navCtrl.navigateForward('login');
      }
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
 onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
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
          "sub_project_id":this.sub_project_id,
          "despatch_id":this.despatch_id,
           
        }
        this.http.post(host+'get-material-despatch-list-add', JSON.stringify(data),{ headers: headers })
        .subscribe((res:any) => {
         console.log(res);
         loading.dismiss();
        if(res.status == true){
         
           this.depositData=res.all_material_despatch;
          this.material_issue_referencec_id=res.receiving_referencec_id;
          this.main_project_details=res.main_project_details;
    
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
  requestIssue(){
  	//alert(1);
if(this.issue_project==''){
	this.alertController.create({
           message: 'Please select project',
            buttons: ['OK']
          }).then(resalert => {
      
            resalert.present();
      
          });
}else{
	this.navCtrl.navigateForward(['/material-issue-add', {
      pid: this.issue_project, 
    }]);
}
  	
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
 
  selectCheckbox(e,idx,id){

if(e.target.checked){
	this.currentSelected[idx]=id;
//this.currentSelected.push(id);
}else{
//this.currentSelected.splice(idx,1);
//let index = this.removeCheckedFromArray(id);
this.currentSelected[idx]='';
      //this.currentSelected.splice(idx,1);
      this.requiredby_qty[idx]='';
}
  //console.log(this.currentSelected);	
  }
   removeCheckedFromArray(checkbox : number) {
    return this.currentSelected.findIndex((category)=>{
      return category === checkbox;
    })
  }
  keypress(event,maxval: number,index:number){
    if(event.target.value > maxval){
     this.alertController.create({
           message: 'Item quantity can not be greater than '+maxval,
            buttons: ['OK']
          }).then(resalert => {
      
            resalert.present();
      this.requiredby_qty[index]='';
          });
          
    }
  }
 async createIssue(){
 	
 	let qty=0;
 	let st=0;
 	let total_len=this.depositData.length;
 	//console.log(this.depositData.length);
  	const loading = await this.loadingController.create({
      message: ''
    });
    var headers = new HttpHeaders();
    headers.append('content-type', 'application/json; charset=utf-8');
 
  if(this.requiredby_qty.length==0){
qty =0;
  }else{
  this.requiredby_qty.forEach((value,key) => {
 
  if(value=='' || value==0 || value==null){
  	qty -=1;
  }else{
  	qty +=1;
  	this.projects_materials_despatch_id[key]= this.depositData[key].ID;
  	this.projects_materials_despatch_ref_id[key]= this.despatch_id;
  	this.project_idnw[key]= this.depositData[key].project_id;
  	this.sub_project_idnw[key]= this.depositData[key].sub_project_id;
  	this.warehouse_id[key]=this.depositData[key].warehouse_id;
   this.master_item_combinations_id[key]=this.depositData[key].master_item_combinations_id;
   //this.product_id[key]=this.depositData[key].master_item_id;
   //this.grn_srn_products_id[key]=this.depositData[key].grn_srn_products_ID;
   this.master_uom_id[key]=this.depositData[key].master_uom_id;
    this.btn_item_check[key]=key;
   // this.grn_srn_id[key]=this.depositData[key].grn_srn_id;
  this.master_item_id[key]=this.depositData[key].master_item_id;
  this.master_item_stock_id_for_despatch[key]=this.depositData[key].master_items_stock_id;
  this.actual_quantity[key]=this.depositData[key].quantity;
  }
  });
}
  if(this.status.length==0){
st =0;
  }else{
  this.status.forEach((value,key) => {
 
  if(value=='' || value==0 || value==null){
  	st -=1;
  }else{
  	st +=1;
  }
});
}
//console.log(qty); 
  if(this.created_at==''){
this.alertController.create({
           message: 'Please select creation date',
            buttons: ['OK']
          }).then(resalert => {
      
            resalert.present();
      
          });
  }else if(st!=total_len){
this.alertController.create({
           message: 'Required all option field',
            buttons: ['OK']
          }).then(resalert => {
      
            resalert.present();
      
          });
  }else if(qty!=total_len){
this.alertController.create({
           message: 'Required all quantity field',
            buttons: ['OK']
          }).then(resalert => {
      
            resalert.present();
      
          });
  }else{
   
  
  	var data ={
        "userid":this.userId,
        "projects_materials_despatch_ref_id":this.projects_materials_despatch_ref_id,
        "created_at":this.created_at,
        "received_quantity":this.requiredby_qty,
		"project_id":this.project_idnw,
		"sub_project_id":this.sub_project_idnw,
         "projects_materials_issue_id":this.projects_materials_issue_id,
 		"warehouse_id":this.warehouse_id,
 		"master_item_combinations_id":this.master_item_combinations_id,
 		"projects_materials_despatch_id":this.projects_materials_despatch_id,
 		"master_item_stock_id_for_despatch":this.master_item_stock_id_for_despatch,
 		"status":this.status,
 		"master_uom_id":this.master_uom_id,
 		"btn_item_check":this.btn_item_check,
 		"master_item_id":this.master_item_id,
 		"material_receiving_referencec_id":this.material_issue_referencec_id,
          }
           
//console.log(data);
           await loading.present();
       
        this.http.post(host+'post-material-despatch-receiving-create', JSON.stringify(data),{ headers: headers })
        .subscribe((res:any) => {
        console.log(res);
         loading.dismiss();
        if(res.status == true){
         
          this.alertController.create({
           message: 'Material Receiving Successful',
            buttons: ['OK']
          }).then(resalert => {
      
            resalert.present();
      
          });
           this.navCtrl.navigateForward('material-receiving-list');
   		this.material_required_by='';
        this.created_at=''
        this.requiredby_qty=[];
		this.projects_materials_issue_id=[];
 		this.warehouse_id=[];
 		this.master_item_combinations_id=[];
 		this.product_id=[];
 		this.grn_srn_products_id=[];
 		this.grn_srn_id=[];
 		this.master_uom_id=[];
 		this.btn_item_check=[];
 		this.master_item_id=[];
 		this.currentSelected=[];
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

}

