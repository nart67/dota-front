import { MatDrawer } from '@angular/material';
import { SideNavService } from './../services/side-nav.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @ViewChild('snav') sideNav: MatDrawer;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private sideNavService: SideNavService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit() {
    this.sideNavService.setSideNav(this.sideNav);
  }

}
