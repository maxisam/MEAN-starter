import { IUserState } from '../../_model/user.model';
import { AllUserActions, UserActions } from './user.actions';

export const initialState: IUserState = {
    account: undefined,
    role: undefined,
};

export function userReducer(state = initialState, action: AllUserActions): IUserState {
    switch (action.type) {
        case UserActions.Type.LOGIN_SUCCESS:
            return Object.assign({}, state, action.payload);

        case UserActions.Type.LOGOUT_SUCCESS:
            return initialState;

        default:
            return state;
    }
}

export const userRegister = {
    reducer: { userReducer },
    actions: UserActions
};
