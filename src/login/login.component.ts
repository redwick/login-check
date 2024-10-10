import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = 'leha';
  password = 'LehaRuster123';

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }
  tryLogin() {
    this.auth.loginByLoginPassword(this.login, this.password).subscribe(auth => {
      if (auth){
        this.router.navigate(['']);
      }
      else{
        alert('WRONG PASSWORD');
      }
    });
  }
}
