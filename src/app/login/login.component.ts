import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: String;
  password: String;
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.loading = true;
    this.authService.login(this.username, this.password)
    .subscribe(result => {
      if (result === true) {
        // login successful
        this.router.navigate(['/']);
      } else {
        // login failed
        this.error = 'Username or password is incorrect';
        this.loading = false;
      }
    });
  }

}
