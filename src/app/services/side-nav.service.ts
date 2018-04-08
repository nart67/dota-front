import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material';

@Injectable()
export class SideNavService {
  sideNav: MatDrawer;

  constructor() { }

  setSideNav(sideNav: MatDrawer) {
    this.sideNav = sideNav;
  }

  open() {
    if (this.sideNav) {
      this.sideNav.open();
    }
  }

  close() {
    if (this.sideNav) {
      this.sideNav.close();
    }
  }

  toggle() {
    if (this.sideNav) {
      this.sideNav.toggle();
    }
  }
}
