import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { GeneralService } from 'src/app/servicios/general.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  listaUsuarios : Usuario [] = [];

  constructor(
    public ServG: GeneralService,
    private loading: LoadingController,
    private userService : UsuariosService


  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    let loading = await this.loading.create();
    loading.present();
    this.serviceCargarProductos(loading);
  }

  private serviceCargarProductos( loading: HTMLIonLoadingElement ){
    this.userService.getUsuarios().subscribe({
      next: (resp) => {
        this.listaUsuarios = resp.data;
        console.log('list usarios', this.listaUsuarios);
        loading.dismiss();
      },
      error: (err) => {
        this.listaUsuarios = [];
        loading.dismiss();
        this.ServG.fun_Mensaje('Error al recuperar los usuarios');
      }
    });
  }

  fun_editar(user: Usuario, ionItemSliding: IonItemSliding) {
    ionItemSliding.close();
    this.ServG.irA('/usuario/' + user.id);
  }

  fun_eliminar(user: Usuario, ionItemSliding: IonItemSliding) {
    const  { id } = user;

    const data = { usu_id : id };

    this.servicDeleteUsuario( data, ionItemSliding );
  }

  private servicDeleteUsuario( data : { usu_id : number }, ionItemSliding: IonItemSliding){
    this.userService.deleteUsuario( data ).subscribe({
      next: (resp) => {
        this.ServG.fun_Mensaje(resp.mensaje);
        ionItemSliding.close();
        this.cargarUsuarios();
      },
      error: (err) => {
        ionItemSliding.close();
        this.ServG.fun_Mensaje('Error en eliminar el usuario', "warning");
      }
    });
  }


  

}
