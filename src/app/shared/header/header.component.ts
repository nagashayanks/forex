import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/service/notification-service';
import { CurrentUser } from 'src/app/model/model';
import { Service } from 'src/app/service/service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userDetails: CurrentUser;
  toggleFlag = false;
  constructor(
    private router: Router,
    private notification: NotificationService) { }

  /* Get loggged user details from subject subscription */
  private getLoginUser(): void {
    /* subscribe to home component messages */
    this.subscription = this.notification.getMessage().subscribe(userData => {
      if (userData) {
        this.userDetails = userData;
      } else {
        this.userDetails = {
          userId: null,
          userName: null,

        };
      }
    });
  }

  /* toggle function while mobile view */
  public toggle(): void {
    this.toggleFlag = !this.toggleFlag;
  }

  /* logout */
  public logout(): void {
    sessionStorage.clear();
    this.notification.clearMessages();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    /*Get logged user */
    this.getLoginUser();
  }

  ngOnDestroy() {
   /* unsubscribe to ensure no memory leaks */
    this.subscription.unsubscribe();
  }
}
