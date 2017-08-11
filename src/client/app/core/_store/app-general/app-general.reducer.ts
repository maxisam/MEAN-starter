import { IAppGeneral } from '../../_model/app-general.model';
import { AllAppGeneralActions, AppGeneralActions } from './app-general.actions';

export const initialState: IAppGeneral = {
    httpRequestPending: 0,
    error: ''
};

export function appGeneralReducer(state: IAppGeneral = initialState, action: AllAppGeneralActions): IAppGeneral {
    switch (action.type) {
        case AppGeneralActions.Type.ERROR: {
            return Object.assign({}, state, <IAppGeneral>{ error: action.payload });
        }
        case AppGeneralActions.Type.SHOW_NOTIFICATION: {
            return Object.assign({}, state, <IAppGeneral>{ notification: action.payload });
        }
        case AppGeneralActions.Type.UPDATE_HTTP_REQUEST_PENDING: {
            return Object.assign({}, state, <IAppGeneral>{ httpRequestPending: action.payload });
        }
        default:
            return state;
    }
}

export const appGeneralRegister = {
    reducer: { appGeneralReducer },
    actions: AppGeneralActions
};
