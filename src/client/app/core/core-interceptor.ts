import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppGeneralActions } from './_store/app-general/app-general.actions';
import { IAppState } from './_store/reducers';

@Injectable()
export class CoreInterceptor implements HttpInterceptor {
  constructor(
    private _Store$: Store<IAppState>,
    private _AppGeneralActions: AppGeneralActions
  ) { }
  pendingRequestCount = 0;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._Store$.dispatch(this._AppGeneralActions.updateHttpRequestPending(++this.pendingRequestCount));
    return next
      .handle(request)
      .do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          this._Store$.dispatch(this._AppGeneralActions.updateHttpRequestPending(--this.pendingRequestCount));
        }
      })
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
          this._Store$.dispatch(this._AppGeneralActions.error(response.message));
        }
        return Observable.throw(response);
      });
  }
}
