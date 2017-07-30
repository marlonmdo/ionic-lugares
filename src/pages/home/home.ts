import { LugaresService } from './../../services/lugares';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AdicionaLugarPage } from "../adiciona-lugar/adiciona-lugar";
import { Lugar } from "../../models/lugar";
import { LugarPage } from "../lugar/lugar";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  adicionaLugarPage = AdicionaLugarPage;
  lugares: Lugar[] = [];

  constructor(public navCtrl: NavController,  private modalCtrl: ModalController, private lugaresService: LugaresService) {

  }

  ngOnInit() {
    this.lugaresService.obtemLugares()
      .then(
        (lugares: Lugar[]) => this.lugares = lugares
      );
  }

  ionViewWillEnter() {
    this.lugares = this.lugaresService.carregaLugares();
  }

  abreLugar(lugar: Lugar, index: number) {
    const modal = this.modalCtrl.create(LugarPage, {lugar: lugar, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.lugares = this.lugaresService.carregaLugares();
      }
    );
  }

}