import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private tokenService: TokenService,
  ) { }
  ngOnInit(): void {
  }
  onClickLogout() {
    localStorage.clear();
    this.tokenService.deleteCookie();
    this.router.navigate(['/login']);
  }

}
