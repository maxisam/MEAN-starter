import { UserActions } from '../_store/user/user.actions';
import { IAppState } from '../_store/reducers';
import { IUser } from '../_model/user.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFG: FormGroup;
  loginFC: { [key: string]: AbstractControl };
  public errorMsg = '';

  constructor(
    private _FormBuilder: FormBuilder,
    private _Store$: Store<IAppState>,
    private _UserActions: UserActions
  ) { }
  ngOnInit() {
    this.initForm();
  }
  ngOnDestroy() {
  }
  onSubmit() {
    if (this.loginFG.valid) {
      this._Store$.dispatch(this._UserActions.login(<IUser>{
        account: this.loginFC.account.value,
        password: this.loginFC.password.value
      }));
    }
  }
  private initForm() {
    this.loginFG = this._FormBuilder.group({
      password: [null, Validators.required],
      account: [null, Validators.required]
    });
    this.loginFC = this.loginFG.controls;
  }
}
