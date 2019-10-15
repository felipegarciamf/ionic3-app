import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BinaryOperator } from '@angular/compiler';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public carros: Carro[];

  constructor(public navCtrl: NavController, 
    private _http: HttpClient, 
    private _loadingCtrl: LoadingController, 
    private _alertCtrl: AlertController) {

      let loading = this._loadingCtrl.create({
        content: 'Aguarde o carregamento dos carros...'
      });

      loading.present();
    
    this._http.get<Carro[]>('http://localhost:8080/api/carro/listaTodosx')
        .subscribe(
          (carros) => {
            this.carros = carros;
            loading.dismiss();
          }, 
          (err: HttpErrorResponse) => {
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

}
