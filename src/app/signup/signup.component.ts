import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {Router} from "@angular/router";
import {UtilsService} from "../utils/utils.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hide = true;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router,
              private utilsService: UtilsService) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.form.invalid) {
      this.utilsService.warningSnackBar('Please fill all the required fields');
      return;
    }

    this.accountService.signup(this.form.value).subscribe(res => {
      this.form.reset();
    }, error => {
      this.utilsService.errorSnackBar(error.error);
      console.log(error);
    }, () => {
      this.utilsService.successSnackBar('Account created successfully');
      this.router.navigate(['/login']);
    });
  }

  getErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
}
