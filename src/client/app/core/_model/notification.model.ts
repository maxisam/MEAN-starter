export interface INotification {
    status: keyof NotificationType;
    title?: string;
    content: string;
}

export class NotificationType {
    success = 'success';
    info = 'info';
    warning = 'warning';
    error = 'error';
}
