import { IAppState } from '../_store/reducers';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {

    userProfile: any;
    requestedScopes = 'openid profile read:messages write:messages';

    constructor(
        private _Router: Router,
        private _Store$: Store<IAppState>,
    ) { }

    getProfile(cb): void {

    }

    // private setSession(authResult): void {
    //   // Set the time that the access token will expire at
    //   const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    //   // If there is a value on the `scope` param from the authResult,
    //   // use it to set scopes in the session for the user. Otherwise
    //   // use the scopes as requested. If no scopes were requested,
    //   // set it to nothing
    //   const scopes = authResult.scope || this.requestedScopes || '';

    //   localStorage.setItem('access_token', authResult.accessToken);
    //   localStorage.setItem('id_token', authResult.idToken);
    //   localStorage.setItem('expires_at', expiresAt);
    //   localStorage.setItem('scopes', JSON.stringify(scopes));
    // }

    logout(): void {
        // Remove tokens and expiry time from localStorage
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('id_token');
        // localStorage.removeItem('expires_at');
        // localStorage.removeItem('scopes');
        // Go back to the home route
        this._Router.navigate(['/']);
    }

    isAuthenticated() {
        return this._Store$.select(appState => appState.user).map(user => !!user.token);
        // Check whether the current time is past the
        // access token's expiry time
        // const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        // return new Date().getTime() < expiresAt;
    }

    // userHasScopes(scopes: Array<string>): boolean {
    //     const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    //     return scopes.every(scope => grantedScopes.includes(scope));
    // }

}

