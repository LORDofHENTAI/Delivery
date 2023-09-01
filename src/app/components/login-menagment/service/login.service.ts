import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { LoginQuery } from '../models/login-query.model';
import { LoginResponse } from '../models/login-responce.model';
import { Logout } from '../models/logout.model';
import { LogoutStatus } from '../models/logout-status.model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private urlLogin = environment.apiUrl + 'login';
  private urlLogout = environment.apiUrl + 'logout';

  getLogin(login: LoginQuery): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlLogin}`, login);
  }

  postLogout(login: Logout): Observable<LogoutStatus> {
    return this.http.post<LogoutStatus>(`${this.urlLogout}`, login);
  }

}
