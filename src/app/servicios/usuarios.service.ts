import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GeneralService } from './general.service';
import { IUsuarios, Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  api = environment.api;

  constructor(private http: HttpClient, private servG: GeneralService) { }

  getUsuarios() {
    const url = `${this.api}/listarUsuarios`;
    return this.http.get<IUsuarios>(url);
  }

  deleteUsuario(data: { usu_id: number }) {
    const url = `${this.api}/UsuarioDelete`;
    return this.http.post<any>(url, this.servG.objectToFormData( data ) );
  }

  getUsuarioxID(id: number) {
    const url = `${this.api}/listarUsuariosByIdV2`;
    return this.http.post<any>(url, this.servG.objectToFormData({ user_id: id }));
  }

  updateUsuario( data : Usuario){
    const url = `${this.api}/UsuarioModificar`;
    return this.http.post<any>(url, this.servG.objectToFormData( data ) );
  }

  saveUsuario( data : Usuario ){
    const url = `${this.api}/newUsuario`;
    return this.http.post<any>(url, this.servG.objectToFormData( data ) );
  }



}
