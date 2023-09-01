import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token/token.service';
import { isUndefined } from '@datorama/akita';
import { inject } from '@angular/core';

export const adminGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const tokenService = inject(TokenService);
    let title = tokenService.getTitle()
    let admin = tokenService.getIsAdmin();
    if (title == 'логистика-админ' || admin == 1)
        return true

    router.navigate(['/login'])
    return false
}
