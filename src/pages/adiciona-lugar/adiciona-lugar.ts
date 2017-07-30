import { LugaresService } from './../../services/lugares';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Localizacao } from './../../models/localizacao';
import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { ModalController, LoadingController, ToastController } from "ionic-angular";
import { ObtemLocalizacaoPage } from "../obtem-localizacao/obtem-localizacao";
import { Geolocation} from "@ionic-native/geolocation";

declare var cordova: any;

@Component({
  selector: 'page-adiciona-lugar',
  templateUrl: 'adiciona-lugar.html'
})
export class AdicionaLugarPage {
  
  localizacao: Localizacao = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  localizacaoIsSet = false;
  imageUrl = '';

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private camera: Camera,
              private lugaresService: LugaresService,
              private geolocation: Geolocation) {
  }

   onSubmit(form: NgForm) {
    this.lugaresService
      .adicionaLugar(form.value.titulo, form.value.descricao, this.localizacao, this.imageUrl);
    form.reset();
    this.localizacao = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.localizacaoIsSet = false;
  }


  localiza() {
    const loader = this.loadingCtrl.create({
      content: 'Obtendo a localização'
    });
    loader.present();
    this.geolocation.getCurrentPosition().then((respLocation) => {
          loader.dismiss();
          this.localizacao.lat = respLocation.coords.latitude;
          this.localizacao.lng = respLocation.coords.longitude;
          this.localizacaoIsSet = true;
    }).catch((error) => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Não foi possível obter localização!',
          duration: 2500
        });
        toast.present();
    });
  }

   abreMapa() {
    const modal = this.modalCtrl.create(ObtemLocalizacaoPage,
      {localizacao: this.localizacao, isSet: this.localizacaoIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          console.log(data);
          this.localizacao = data.localizacao;
          this.localizacaoIsSet = true;
        }
      }
    );
  }

  tiraFoto() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
      saveToPhotoAlbum: false
    })
      .then(
        pictureTaken => {  
	  this.imageUrl = 'data:image/png;base64,' + pictureTaken;
          this.camera.cleanup();
        }
      )
      .catch(
        err => {
          const toast = this.toastCtrl.create({
            message: 'Não foi possível obter foto. Tente novamente.',
            duration: 2500
          });
          toast.present();
        }
      );
  }

}

