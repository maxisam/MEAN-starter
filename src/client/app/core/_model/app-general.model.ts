import { INotification } from './notification.model';

export interface IAppGeneral {
    httpRequestPending: number;
    notification?: INotification;
    error: string;
}

