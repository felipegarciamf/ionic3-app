import { AgendamentosServiceProvider } from './../../providers/agendamentos-service/agendamentos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';
import { Carro } from '../../modelos/carro';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;

  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private agendamentosService: AgendamentosServiceProvider) {
    this.carro = this.navParams.get("carroSelecionado");
    this.precoTotal = this.navParams.get("precoTotal");
  }

  agenda()  {
    let agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal

    }
    this.agendamentosService.agenda(agendamento).subscribe(
      (response) => {
        alert('agendou');
      }, (erro) => {
        alert('deu erro');
      }
    );
    console.log(this.nome);
    console.log(this.endereco);
    console.log(this.email);
    console.log(this.data);
  }
  

}
