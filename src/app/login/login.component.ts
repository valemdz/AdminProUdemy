import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugin();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private _router: Router ) { }

  ngOnInit() {
    init_plugin();
  }

  ingresar() {
      this._router.navigate(['/dashboard']);
  }

}
