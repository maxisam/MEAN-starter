import { IAppState } from '../_store/reducers';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

export function jwtOptionsFactory(store$: Store<IAppState>) {

    return {
        tokenGetter: () => {
            let tokenSync;
            store$.select(appState => appState.user)
                .map(user => user.token)
                .subscribe((token) => tokenSync = token);
            return tokenSync;
        },
        whitelistedDomains: ['localhost:3000', 'localhost:4200']
    }

}
