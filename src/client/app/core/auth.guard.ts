import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './_service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private _AuthService: AuthService,
        private _Router: Router
    ) { }

    canActivate(): boolean {
        let isAuthenticated;
        this._AuthService.isAuthenticated().subscribe(isAuth => isAuthenticated = isAuth);
        !isAuthenticated && this._Router.navigate(['']);
        return isAuthenticated;
    }
}
