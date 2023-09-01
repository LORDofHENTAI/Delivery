import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/services/token/token.service';
import { LoginQuery } from '../models/login-query.model';
import { LoginResponse } from '../models/login-responce.model';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    'userLogin': new FormControl(),
    'userPassword': new FormControl()
  })

  isLoginUser = false;
  loginQuery = new LoginQuery("", "")

  messageNoConnect = 'Нет соединения, попробуйте позже.'
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.'
  messageStatusTrue = 'Ваша сообщение в обработке.'
  action = 'Ok'
  styleNoConnect = 'red-snackbar'

  constructor(
    private router: Router,
    private loginService: LoginService,
    private tokenService: TokenService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
  }
  onClickLogin() {
    this.loginQuery = new LoginQuery(this.myForm.value.userLogin, this.myForm.value.userPassword);
    this.loginService.getLogin(this.loginQuery).subscribe({
      next: response => {
        if (this.checkResponse(response)) {
          this.tokenService.setCookie(response);
          this.tokenService.logEvent(true);
          this.router.navigate(['/list']);
        }
        else
          this.snackBar.openSnackBar(this.messageFailLogin, this.action, this.styleNoConnect);
      },
      error: error => {
        console.log(error);
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    });
  }

  checkResponse(response: LoginResponse): boolean {
    if (response)
      if (response.token)
        if (response.token.length > 0)
          return true;
        else return false;
      else return false;
    else return false;
  }
}
