import { IAppState } from './reducers';
import { ActionReducer } from '@ngrx/store';
import { UserActions } from './user';
import * as fromUser from './user/user.reducer';
import * as fromAppGeneral from './app-general/app-general.reducer';

const modules = <IAppState>{
    user: fromUser.initialState,
    appGeneral: fromAppGeneral.initialState
};

export function resetOnLogout(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        let newState;
        if (action.type === UserActions.Type.LOGOUT_SUCCESS) {
            newState = Object.assign({}, state);
            Object.keys(modules).forEach((key) => {
                newState[key] = modules[key];
            });
            return reducer(newState, action);
        }
        return reducer(state, action);
    };
}
