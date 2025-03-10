import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent  implements OnInit {

  @Input() defaultHref: string = '/'; 

  constructor() { }

  ngOnInit() {}

}
