import { UtilsService } from './../shared/utils.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private util: UtilsService
  ) { }

  ngOnInit() {
    this.service.autoLogin();
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    this.util.showError.subscribe(message => {
      this.errorMessage = message;
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.errorMessage =
        'Kontonummer / Installations-ID eller Aktiveringskode er forkert.';
      return;
    }
    this.errorMessage = '';
    this.service.login(this.loginForm.value, result => {
      if (!result) {
        this.util.updateError(
          'Der er opstået en fejl, kontroller brugernavn og adgangskode og prøv igen. Eller kontakt din bredbåndsudbyder.');
        console.log('not a valid user');
      }
    });
  }
}
