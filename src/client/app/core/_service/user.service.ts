import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IUser, IUserState } from '../_model/user.model';
import { IAppState } from '../_store/reducers';

@Injectable()
export class UserService {
    private actions$;
    private user$: Observable<IUserState>;
    private userState: IUserState;

    constructor(
        private _Http: HttpClient,
        private _Store: Store<IAppState>
    ) {
        this.user$ = this._Store.select(state => state.user);
    }

    get userState$(): Observable<IUserState> {
        return this.user$;
    }
    get isAuthenticated$(): Observable<boolean> {
        return this.user$.map(user => !!user.account && !!user.role);
    }
    // public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    // const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    // return new Date().getTime() < expiresAt;
    // }

    // public userHasScopes(scopes: Array<string>): boolean {
    // const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    // return scopes.every(scope => grantedScopes.includes(scope));
    // }
    login(user: IUser) {
        return this._Http.post('/api/auth/login', user);
    }

    logout() {
        return this._Http.get('/api/auth/logout');
    }
    // private handleSuccessLogin(user?: User, task?: string, subTask?: string) {
    //     this._Store.dispatch(this._userActions.login(<IUserState>{ username: user, role: task, subTask: subTask }));
    // }

    // private handleSuccessLogOut(task?: string, subTask?: string) {
    //     this._Store.dispatch(this._userActions.logout(<IUserState>{ username: undefined, role: task, subTask: subTask }));
    // }

    // private httpJsonPost(link: string, postJson: string) {
    //     const headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     return this._Http.post(link, postJson, { headers: headers });
    // }
}
