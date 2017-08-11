import { IUserState } from '../_model/user.model';
import { IAppGeneral } from '../_model/app-general.model';
import { UserEffects } from './user/user.effects';
import { AppGeneralEffects } from './app-general/app-general.effects';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { ActionReducer, StoreModule, ActionReducerMap, INITIAL_REDUCERS, INITIAL_STATE } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';

import { environment } from '../../../environments/environment';
import { IAppState, actionReducerMap, actionsRegisters, reducersRegisters } from './reducers';
import { resetOnLogout } from './reset';
import { registerReducers, StoreRegistry } from './store.registry';
import { EffectsModule } from '@ngrx/effects';


/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
// import { routerReducer, RouterState } from '@ngrx/router-store';

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */

// export function _storeRegistry(): StoreRegistry {
//     return registerReducers(reducersRegisters);
// }
export function getInitialState() {
    return <IAppState>{
        user: <IUserState>{
            account: 'Sam',
            role: ''
        },
        appGeneral: <IAppGeneral>{
            httpRequestPending: 0,
            notification: undefined,
            error: ''
        }
    };
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: ['user'], rehydrate: true })(reducer);
}

const optionalImports = <ModuleWithProviders[]>[];

if (!environment.production) {
    // Note that you must instrument after importing StoreModule
    optionalImports.push(StoreDevtoolsModule.instrument({ maxAge: 30 }));
}

const DEV_REDUCERS: ActionReducer<any, any>[] = [storeFreeze];
const APP_REDUCERS: ActionReducer<any, any>[] = [resetOnLogout, localStorageSyncReducer];

// if (['logger', 'both'].includes(STORE_DEV_TOOLS)) { // set in constants.js file of project root
//     DEV_REDUCERS.push(storeLogger());
// }

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<IAppState>>('Registered Reducers');

export const metaReducers = environment.production ? APP_REDUCERS : [...DEV_REDUCERS, ...APP_REDUCERS];

// hack
Object.assign(REDUCER_TOKEN, actionReducerMap);

@NgModule({
    imports: [
        StoreModule.forRoot(REDUCER_TOKEN, { metaReducers }),
        EffectsModule.forRoot([
            AppGeneralEffects,
            UserEffects
        ]),
        ...optionalImports
    ],
    declarations: [

    ],
    exports: [

    ],
    providers: [
        actionsRegisters,
        {
            provide: INITIAL_REDUCERS,
            // deps: [SomeService],
            // useFactory: getReducers
            useValue: actionReducerMap
        },
        {
            provide: INITIAL_STATE,
            useFactory: getInitialState
        }
    ]
})
export class CoreStoreModule { }
