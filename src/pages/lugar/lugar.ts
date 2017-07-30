import { Lugar } from './../../models/lugar';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-lugar',
  templateUrl: 'lugar.html',
})
export class LugarPage {

  private lugar: Lugar;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.lugar = navParams.get('lugar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LugarPage');
  }

  cancela(){
    this.viewCtrl.dismiss();
  }

}
