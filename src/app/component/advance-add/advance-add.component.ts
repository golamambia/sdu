import { Component, OnInit } from '@angular/core';
import { PopoverController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-advance-add',
  templateUrl: './advance-add.component.html',
  styleUrls: ['./advance-add.component.scss'],
})
export class AdvanceAddComponent implements OnInit {

 constructor(
    private popoverController: PopoverController,
    public navCtrl: NavController,
    ) { }


  ngOnInit() {}
popDismiss(page){
		this.popoverController.dismiss();
		this.navCtrl.navigateForward('/'+page);
	}
}
