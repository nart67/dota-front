import { FormControl, Validators, FormGroup, ValidationErrors,
  FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading: boolean;
  error = '';

  registerGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl('', Validators.minLength(2)),
    confirm: new FormControl('', Validators.minLength(2)),
  }, this.passwordMatchValidator);

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirm').value || !g.get('confirm').value
       ? null : {'mismatch': true};
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register() {
    console.log(this.registerGroup.valid);
    this.loading = true;
    this.authService.register(this.registerGroup.get('username').value,
      this.registerGroup.get('password').value)
    .subscribe(result => {
      if (result === true) {
        this.router.navigate(['/login']);
      } else {
        // login failed
        this.error = 'Username already exists';
        this.loading = false;
      }
    });
  }
}
