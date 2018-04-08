import { SideNavService } from './../services/side-nav.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isExpanded = false;
  public user = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private sideNavService: SideNavService
  ) {
    authService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  toggleSide() {
    this.sideNavService.toggle();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
