import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { environment } from 'src/environments/environment';
import { Cliente, ICliente, IClienteById } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {

  api = environment.api;

  constructor(private http: HttpClient, private servG: GeneralService) { }

  getClientes() {
    const url = `${this.api}/listarClientes`;
    return this.http.get<ICliente>(url);
  }

  deleteCliente(data: { cli_id: number }) {
    const url = `${this.api}/ClienteDelete`;
    return this.http.post<ICliente>(url, this.servG.objectToFormData( data ) );
  }

  getClientexID(id: number) {
    const url = `${this.api}/listarClienteByIdV2`;
    return this.http.post<IClienteById>(url, this.servG.objectToFormData({ cliente_id: id }));
  }


  updateCliente(data : Cliente) {
    const url = `${this.api}/ClienteModificar`;
    return this.http.post<any>(url, this.servG.objectToFormData( data ) );
  }


  saveCliente(data : Cliente) {
    const url = `${this.api}/newCliente`;
    return this.http.post<any>(url, this.servG.objectToFormData( data ) );
  }
 
}


  
