import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token/token.service';
import { inject } from '@angular/core';



export const listGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const tokenService = inject(TokenService)
    const router = inject(Router)
    let token = tokenService.getToken();
    console.log('asd' + token)
    if (token != false) {
        return true
    }
    router.navigate(['/login'])
    return false
}