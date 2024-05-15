import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  confirmationForm: FormGroup;
  isCodeSent = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.confirmationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  requestReset() {
    if (this.resetPasswordForm.valid) {
      this.authService.resetPasswordDemand(this.resetPasswordForm.value).subscribe(() => {
        this.isCodeSent = true;
      });
    }
  }

  confirmReset() {
    if (this.confirmationForm.valid) {
      this.authService.resetPasswordConfirmation(this.confirmationForm.value).subscribe(() => {
        this.isCodeSent = false;
      });
    }
  }
}
