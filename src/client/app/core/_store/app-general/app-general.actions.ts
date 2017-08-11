import { Injectable } from '@angular/core';

import { INotification } from '../../_model/notification.model';
import { ActionCreatorFactory, ActionPayload, actionType } from '../store.util';

@Injectable()

export class AppGeneralActions {
  static Type = {
    SHOW_NOTIFICATION: actionType('[APP_GENERAL] SHOW NOTIFICATION'),
    UPDATE_HTTP_REQUEST_PENDING: actionType('[APP_GENERAL] UPDATE_HTTP_REQUEST_PENDING'),
    ERROR: actionType('[APP_GENERAL] ERROR')
  };
  showNotification = ActionCreatorFactory.CreateActionPayload<INotification>(AppGeneralActions.Type.SHOW_NOTIFICATION);
  error = ActionCreatorFactory.CreateActionPayload<string>(AppGeneralActions.Type.ERROR);
  updateHttpRequestPending = ActionCreatorFactory.CreateActionPayload<number>(AppGeneralActions.Type.UPDATE_HTTP_REQUEST_PENDING, 0);
}

export type AllAppGeneralActions
  = ActionPayload<INotification>
  | ActionPayload<string>
  | ActionPayload<number>;
