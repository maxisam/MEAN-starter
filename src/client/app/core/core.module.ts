import { AuthService } from './_service/auth.service';
import './rxjs.import';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '../shared/shared.module';
import { jwtOptionsFactory } from './_service/jwt.factory';
import { UserService } from './_service/user.service';
import { toastConfig } from './_static/app.config';
import { AppGeneralActions } from './_store/app-general/app-general.actions';
import { CoreStoreModule } from './_store/core-store.module';
import { CoreInterceptor } from './core-interceptor';
import { LoginComponent } from './login/login.component';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { NoFoundComponent } from './no-found/no-found.component';

@NgModule({
  imports: [
    CoreStoreModule,
    SharedModule,
    SlimLoadingBarModule.forRoot(),
    ToastrModule.forRoot(toastConfig),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Store]
      }
    })
  ],
  declarations: [
    LoginComponent,
    NoFoundComponent
  ],
  exports: [
    CoreStoreModule,
    LoginComponent,
    NoFoundComponent,
    SharedModule,
    SlimLoadingBarModule,
    ToastrModule,
  ],
  providers: [
    AuthService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: CoreInterceptor, multi: true, deps: [Store, AppGeneralActions] },
  ]
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
