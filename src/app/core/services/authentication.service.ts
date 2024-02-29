import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient, private router:Router, private userService:UserService) { }

  login(user_name:string, password:string) {
    return this.http.post<{token:string}>(`${environment.apiUrl}/login`,
    {
      user_name,
      password
    }).pipe(switchMap((res:any) => {
      this.setToken(res.token)
      return this.userService.getBootstrapData()
  }))
  }

  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  // always want to make sure token is valid
  getToken() {
    return localStorage.getItem('token')
  }

  isLoggedIn() {
    return !!this.getToken()
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
