import { Injectable } from '@angular/core';

import { IUser, IUserState } from '../../_model/user.model';
import { ActionCreatorFactory, ActionPayload, actionType } from '../store.util';

@Injectable()

export class UserActions {
  static Type = {
    LOGIN: actionType('[User] LOGIN'),
    LOGIN_SUCCESS: actionType('[User] LOGIN SUCCESS'),
    LOGIN_FAIL: actionType('[User] LOGIN FAIL'),
    LOGOUT: actionType('[User] LOGOUT'),
    LOGOUT_SUCCESS: actionType('[User] LOGOUT SUCCESS')
  };

  login = ActionCreatorFactory.CreateActionPayload<IUser>(UserActions.Type.LOGIN);
  loginSuccess = ActionCreatorFactory.CreateActionPayload<IUserState>(UserActions.Type.LOGIN_SUCCESS);
  loginFail = ActionCreatorFactory.CreateActionPayload<any>(UserActions.Type.LOGIN_FAIL)
  logout = ActionCreatorFactory.CreateAction(UserActions.Type.LOGOUT);
  logoutSuccess = ActionCreatorFactory.CreateAction(UserActions.Type.LOGOUT_SUCCESS)
}

export type AllUserActions
  = ActionPayload<IUserState>
  | ActionPayload<IUser>;
