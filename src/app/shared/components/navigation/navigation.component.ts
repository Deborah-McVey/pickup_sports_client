import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  isSidebarVisible:boolean = false;
  currentUser: User | null = null;
  constructor(private authService:AuthenticationService, private userService:User) {}

  ngOnInit(): void {
    this.userService.currentUserBehaviorSubject.subscribe((user) => (
      this.currentUser = user;
    ))
  }

  // not optimal, should use behavior subject
  isLoggedIn() {
    //console.log("Change Detected")
    return this.authService.isLoggedIn();
  }

  logout() {
    if(this.isSidebarVisible) {
      this.toggleSidebar();
    }
      this.authService.logout();
      this.userService.setCurrentUser(null);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible
  }
}
