import { IToken } from '../../_model/token.model';
import { IUser, IUserState } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { AppGeneralActions } from '../app-general/app-general.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserActions, AllUserActions } from './user.actions';
import { IAppState } from '../reducers';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
    constructor(
        private _Actions$: Actions,
        private _AppGeneralActions: AppGeneralActions,
        private _JwtHelperService: JwtHelperService,
        private _Router: Router,
        private _UserActions: UserActions,
        private _UserService: UserService,

    ) { }
    @Effect() login$ = this._Actions$
        .ofType(UserActions.Type.LOGIN)
        .switchMap((action: AllUserActions) => this._UserService.login(action.payload as IUser)
            .map((res: { token: string }) => {
                const token: IToken = this._JwtHelperService.decodeToken(res.token);
                return this._UserActions.loginSuccess(<IUserState>{
                    account: action.payload.account,
                    token: res.token,
                    role: token.role,
                    expiredAt: token.exp
                });
            })
            .catch((err: any) => Observable.of(this._AppGeneralActions.error(err.toString())))
        );

    @Effect({ dispatch: false }) loginSuccess$ = this._Actions$
        .ofType(UserActions.Type.LOGIN_SUCCESS)
        .do((action: AllUserActions) => {
            this._Router.navigate(['/home'], { queryParams: null });
        });

    @Effect() logout$ = this._Actions$
        .ofType(UserActions.Type.LOGOUT)
        .switchMap(() => this._UserService.logout()
            .map((res: any) => this._UserActions.logoutSuccess())
            .catch((err: any) => Observable.of(this._AppGeneralActions.error(err.toString())))
        );
}
