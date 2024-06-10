import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { GeneralService } from 'src/app/servicios/general.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  listasClientes: Cliente[] = [];

  constructor(
    private servC: ClientesService,
    public ServG: GeneralService,
    private loading: LoadingController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.cargarClientes();
  }

  // CARGAR CLIENTES A LA APLICACION
  async cargarClientes() {
    let loading = await this.loading.create();
    loading.present();
    this.serviceCargarClientes(loading);
  }

  private serviceCargarClientes(loading: HTMLIonLoadingElement) {
    this.servC.getClientes().subscribe({
      next: (resp) => {
        this.listasClientes = resp.data;
        // console.log('list cliente', this.listasClientes);
        loading.dismiss();
      },
      error: (err) => {
        this.listasClientes = [];
        loading.dismiss();
        this.ServG.fun_Mensaje('Error al recuperar los clientes');
      }
    });
  }

  fun_editar(cliente: any, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.ServG.irA('/cliente/' + cliente.id);
  }

  fun_eliminar(cliente: Cliente, ionItemSliding: IonItemSliding) {
    const  { id } = cliente;

    const data = { cli_id : id };

    this.servicDeleteCliente( data, ionItemSliding );
  }

  private servicDeleteCliente( data : { cli_id : number }, ionItemSliding: IonItemSliding){
    this.servC.deleteCliente( data ).subscribe({
      next: (resp) => {
        this.ServG.fun_Mensaje(resp.mensaje);
        ionItemSliding.close();
        this.cargarClientes();
      },
      error: (err) => {
        ionItemSliding.close();
        this.ServG.fun_Mensaje('Error en eliminar el cliente', "warning");
      }
    });
  }



}
