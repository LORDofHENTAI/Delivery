import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';
import { environment } from 'src/app/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from 'src/app/services/snack-bar/snack-bar.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private http: HttpClient,
    private snackBar: SnackBarService
  ) { }
  messageNoConnect = 'Нет соединения, попробуйте позже.'
  messageFailLogin = 'Вход не разрешен, имя или пароль неверны.'
  messageStatusTrue = 'Ваша сообщение в обработке.'
  action = 'Ok'
  styleNoConnect = 'red-snackbar'
  ngOnInit(): void {
  }
  onClickLogout() {
    localStorage.clear();
    this.tokenService.deleteCookie();
    this.router.navigate(['/login']);
  }
  help() {
    this.http.get(environment.apiUrl + 'GetDocumentation', { responseType: 'blob' }).subscribe({
      next: result => {
        saveAs(result, 'Документация')
      },
      error: error => {
        console.log(error)
        this.snackBar.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    })
  }

}
