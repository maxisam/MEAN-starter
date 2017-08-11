import { IUserState } from '../_model/user.model';
import { ActionReducerMap } from '@ngrx/store';

import { IAppGeneral } from '../_model/app-general.model';
import { appGeneralRegister } from './app-general/app-general.reducer';
import { userRegister } from './user';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface IAppState {
    user: IUserState;
    appGeneral: IAppGeneral;
}

export const reducersRegisters = [
    userRegister,
    appGeneralRegister
];

export const actionsRegisters = [
    userRegister.actions,
    appGeneralRegister.actions
];

export const actionReducerMap: ActionReducerMap<IAppState> = {
    appGeneral: appGeneralRegister.reducer.appGeneralReducer,
    user: userRegister.reducer.userReducer,
};
