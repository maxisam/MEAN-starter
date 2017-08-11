import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastrService } from 'ngx-toastr';

import { INotification } from '../../_model/notification.model';
import { AllAppGeneralActions, AppGeneralActions } from './app-general.actions';

@Injectable()
export class AppGeneralEffects {

    constructor(
        private _Actions$: Actions,
        private _SlimLoadingBarService: SlimLoadingBarService,
        private _ToastrService: ToastrService
    ) { }
    @Effect({ dispatch: false }) updateHttpRequestPending$ = this._Actions$
        .ofType(AppGeneralActions.Type.UPDATE_HTTP_REQUEST_PENDING)
        .map((action: AllAppGeneralActions) => action.payload as number)
        .pairwise()
        .do(([prevCount, count]) => {
            if (!prevCount && !!count) {
                this._SlimLoadingBarService.start();
            } else if (!!prevCount && !count) {
                this._SlimLoadingBarService.complete();
            }
        });

    @Effect({ dispatch: false }) notificationShow$ = this._Actions$
        .ofType(AppGeneralActions.Type.SHOW_NOTIFICATION)
        .do((action: AllAppGeneralActions) => {
            const toastr = action.payload as INotification;
            this._ToastrService[toastr.status](toastr.content, toastr.title);
        });

    @Effect({ dispatch: false }) error$ = this._Actions$
        .ofType(AppGeneralActions.Type.ERROR)
        .do((action: AllAppGeneralActions) => {
            this._ToastrService.error(action.payload as string);
        });
}
