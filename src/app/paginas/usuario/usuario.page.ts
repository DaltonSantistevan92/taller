import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { GeneralService } from 'src/app/servicios/general.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  id: number = 0;

  objectUsuario! : Usuario;

  constructor(
    public ServG: GeneralService,
    private loading: LoadingController,
    private router: ActivatedRoute,
    private userService : UsuariosService

  ) {
    this.id = this.router.snapshot.params['usuarioId']
    ? this.router.snapshot.params['usuarioId']
    : 0;
   }

  ngOnInit() {
  }

  
  async ionViewWillEnter() {
    if (this.id > 0) { // si tiene el id es ara poder editar
      let loading = await this.loading.create();
      loading.present();

      // Realizar la consulta
      this.serviceGetUsuarioById( loading ); 
    } else {
      let loading = await this.loading.create();
      loading.present();

      this.objectUsuario = {
        usuario : '',
        nombre : '',
        correo : '',
        telefono : '',
        clave : '',
        activo : 0,
        id : this.id
      }

      loading.dismiss();
    }
  }


  private serviceGetUsuarioById( loading: HTMLIonLoadingElement){
    this.userService.getUsuarioxID( this.id ).subscribe({
      next : ( res ) => {

        const { clave, ...restoUser} =  res.data as Usuario;

        this.objectUsuario = restoUser;
        // console.log(this.objectUsuario);
        
        loading.dismiss();
      },
      error : (err) => {
        loading.dismiss();
        this.ServG.fun_Mensaje('Error al recuperar el usuario id');
      }
    });
  }

  onSubmit(){
    if (this.id && this.id > 0) { //editar
      // console.log('editar');
      this.serviceUpdateUser( this.objectUsuario );
    } else { 
      // console.log('guardar');
      this.serviceSaveUser( this.objectUsuario );
    }
  }


  private serviceUpdateUser( data : Usuario) {
    this.userService.updateUsuario( data ).subscribe({
      next : ( res ) => {
        this.ServG.fun_Mensaje( res.mensaje );
        this.ServG.irA('/usuarios'); 
      },
      error : (err) => {
        this.ServG.fun_Mensaje('Error al actualizar el usuario');
      }
    });
  }


  private serviceSaveUser( data : Usuario ) {
    this.userService.saveUsuario(data).subscribe({
      next : ( res ) => {
        this.ServG.fun_Mensaje( res.mensaje );
        this.ServG.irA('/usuarios'); 
      },
      error : (err) => {
        this.ServG.fun_Mensaje('Error al registrar el usuario');
      }
    })
  }

}
