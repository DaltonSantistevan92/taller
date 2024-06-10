import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button/back-button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    BackButtonComponent
  ],
  exports : [
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
