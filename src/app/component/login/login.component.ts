import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports:[FormsModule,CommonModule,ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    // Replace this URL with your real backend login API
    this.http.post<{ token: string }>('http://localhost:8765/auth/login', this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res)
        this.authService.setToken(res.token);
        this.authService.loginStatusChanged.emit(true);
        let roles = this.authService.decodeToken()['roles'];
        this.router.navigate(['/leave/dashboard']);
        console.log(this.authService.isLoggedIn());
        // let role:string = this.authService.decodeToken()['roles'];
        // if(role.includes('USER')){
        // this.router.navigate(['/applyLeave']); // Or wherever after login
        // }
        // else if(role.includes('REPORTING_MANAGER')){
        //   this.router.navigate(['/pendingLeaveRequest'])
        // }
        // else if(role.includes('HR_MANAGER')){
        //   this.router.navigate(['/pendingLeaveRequestHr'])
        // }
      },
      error: (err) => {
        this.loginError = 'Invalid username or password';
      },
    });
  }
}
