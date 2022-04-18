import { Component, OnInit } from '@angular/core';
import { PopoverController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.scss'],
})
export class AdvanceComponent implements OnInit {

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
