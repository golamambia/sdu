import { Component, OnInit } from '@angular/core';
import { PopoverController,NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addexpense-popover',
  templateUrl: './addexpense-popover.component.html',
  styleUrls: ['./addexpense-popover.component.scss'],
})
export class AddexpensePopoverComponent implements OnInit {
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
