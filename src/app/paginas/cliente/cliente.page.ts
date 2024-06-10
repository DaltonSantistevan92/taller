import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Cliente } from 'src/app/interfaces/cliente.interface';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { GeneralService } from 'src/app/servicios/general.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {
  id: number = 0;

  objectCliente! : Cliente;

  constructor(
    private servC: ClientesService,
    public ServG: GeneralService,
    private loading: LoadingController,
    private router: ActivatedRoute,
  ) {

    this.id = this.router.snapshot.params['clienteId']
      ? this.router.snapshot.params['clienteId']
      : 0;
    // console.log('cliente_id',this.id);
  }

  ngOnInit() {
  
  }


  async ionViewWillEnter() {
    if (this.id > 0) { // si tiene el id es ara poder editar
      let loading = await this.loading.create();
      loading.present();

      // Realizar la consulta
      this.serviceGetClienteById( loading ); 
    } else {
      let loading = await this.loading.create();
      loading.present();

      this.objectCliente = {
        identificacion : '',
        nombre : '',
        ciudad : '',
        correo : '',
        direccion : '',
        pais : '',
        telefono : '',
        id : this.id
      }

      loading.dismiss();
    }
  }


  private serviceGetClienteById( loading: HTMLIonLoadingElement){
    this.servC.getClientexID( this.id ).subscribe({
      next : ( res ) => {
        this.objectCliente = res.data;
        loading.dismiss();
      },
      error : (err) => {
        loading.dismiss();
        this.ServG.fun_Mensaje('Error al recuperar el cliente id');
      }
    });
  }

  onSubmit() {
    if (this.id && this.id > 0) { //editar
      // console.log('editar');
      this.serviceUpdateCliente( this.objectCliente );
    } else { 
      // console.log('guardar');
      this.serviceSaveCliente( this.objectCliente );
    }
  }

  private serviceUpdateCliente( data : Cliente) {
    this.servC.updateCliente( data ).subscribe({
      next : ( res ) => {
        this.ServG.fun_Mensaje( res.mensaje );
        this.ServG.irA('/clientes'); 
      },
      error : (err) => {
        this.ServG.fun_Mensaje('Error al actualizar el cliente');
      }
    });
  }


  private serviceSaveCliente( data : Cliente ) {
    this.servC.saveCliente(data).subscribe({
      next : ( res ) => {
        this.ServG.fun_Mensaje( res.mensaje );
        this.ServG.irA('/clientes'); 
      },
      error : (err) => {
        this.ServG.fun_Mensaje('Error al registrar el cliente');
      }
    })
  }

}
