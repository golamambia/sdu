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
  selector: 'app-material-issue-view',
  templateUrl: './material-issue-view.page.html',
  styleUrls: ['./material-issue-view.page.scss'],
})
export class MaterialIssueViewPage implements OnInit {

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
 depositDataDis:any = [];
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
 material_issue_id:any=[];
 issued_quantity:any=[];
 constructor(private http: HttpClient, public navCtrl: NavController,
    public storage: Storage,public loadingController: LoadingController,
    public alertController: AlertController,
       private menu: MenuController,private fb:FormBuilder,
       private datePipe: DatePipe,
       public actionSheetController: ActionSheetController,
       public popoverCtrl: PopoverController,
       private popoverController: PopoverController,
       private route: ActivatedRoute,
       //public events: Events
    ) { 
  
   this.sub_project_id = this.route.snapshot.paramMap.get('pid');
   this.material_issue_id=this.route.snapshot.paramMap.get('mid');
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
          "material_issue_id":this.material_issue_id,
        }
        this.http.post(host+'get-material-issue-request-get-byid', JSON.stringify(data),{ headers: headers })
        .subscribe((res:any) => {
         console.log(res);
         loading.dismiss();
        if(res.status == true){
         
           this.depositData=res.edit_material_issue.ready;
           this.depositDataDis=res.edit_material_issue.despatched;
          this.material_issue_referencec_id=res.material_issue_referencec_id;
          this.main_project_details=res.main_project_details;
         
          let mrb_date = res.edit_material_issue.ready[0].material_required_by!=''?res.edit_material_issue.ready[0].material_required_by:res.edit_material_issue.despatched[0].material_required_by;
			const myArray1 = mrb_date.split(" ");

    	this.material_required_by=myArray1[0];
    let crt_date = res.edit_material_issue.ready[0].created_at!=''?res.edit_material_issue.ready[0].created_at:res.edit_material_issue.despatched[0].created_at;
			const myArray2 = crt_date.split(" ");
			this.created_at=myArray2[0];
          }else{
            this.depositData=res.all_items;
             
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
 
}
