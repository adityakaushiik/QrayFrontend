import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {LoginResponse} from "../models/LoginResponse";
import {Router} from "@angular/router";
import {UtilsService} from "../services/utils.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  form: FormGroup;
  loading: boolean = false;

  constructor(private accountService: AccountService,
              private utilsService: UtilsService,
              private fb: FormBuilder,
              private router: Router) {

    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  login() {
    this.loading = true;
    if (this.form.invalid) {
      this.loading = false;
      console.log("invalid form");
      return;
    }

    console.log("login", this.form.value.email, this.form.value.password);

    this.accountService.login(this.form.value.email, this.form.value.password).subscribe((res: LoginResponse) => {
      console.log(res);
      this.loading = false;
      this.router.navigate(['/']);
      this.utilsService.successSnackBar('Logged in successfully');
    }, error => {
      console.log(error);
      this.utilsService.errorSnackBar(error.error);
      this.loading = false;
    });

    this.form.reset();
  }

  getErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
}
