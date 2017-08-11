import { error } from 'util';
import { GlobalConfig } from 'ngx-toastr';

// Global setting for toaster
export const toastConfig: GlobalConfig = {
    positionClass: 'toast-top-center',
    extendedTimeOut: 2000,
    closeButton: true,
    progressBar: true,
    timeOut: 4000
};
