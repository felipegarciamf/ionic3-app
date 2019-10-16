import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { BinaryOperator } from '@angular/compiler';
import { CarroServiceProvider } from '../../providers/carro-service/carro-service';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles {

  public carros: Carro[];

  constructor(public navCtrl: NavController, 
    private _loadingCtrl: LoadingController, 
    private _alertCtrl: AlertController,
    private carroService: CarroServiceProvider) {
    }


    ionViewDidLoad(){
      let loading = this._loadingCtrl.create({
        content: 'Aguarde o carregamento dos carros...'
      });
      loading.present();
      this.carroService.lista().subscribe(
          (carros) => {
            this.carros = carros;
            loading.dismiss();
          }, 
          (err) => {
            console.log(err);
            loading.dismiss();

            this._alertCtrl.create({
              title: 'Falha na conexao',
              subTitle: 'Não foi possível carregar a lista de carros, tente novamente mais tarde',
              buttons: [
                {
                  text: 'Ok'
                }
              ]
            }).present();

          }
        );
    }


    selecionaCarro(carro: Carro){
      console.log(carro);
    }

}
