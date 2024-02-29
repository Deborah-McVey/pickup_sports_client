import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    user_name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  isError:boolean = false;

  constructor(private authService:AuthenticationService, private router:Router) {}

  login() {
    if(this.loginForm.valid) {
      const user_name = this.loginForm.value.user_name;
      const password = this.loginForm.value.password;

      this.authService.login(user_name, password).subscribe({
        next: (res:any) => {
          //console.log(res);
          //this.authService.setToken(res.token)
          this.router.navigate(['/'])
        },
        error: (error:any) => {
          console.log("Error when logging", error)
          this.isError = true;
        }
      })
    }
  }
}
