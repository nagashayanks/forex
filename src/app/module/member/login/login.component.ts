import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Service } from 'src/app/service/service';
import { UrlConfig } from 'src/app/service/url-config';
import { Router } from '@angular/router';
import { ConstantService } from 'src/app/service/constant';
import { CommonService } from 'src/app/service/common-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  spinner = false;
  constructor(
    private fb: FormBuilder,
    private api: Service,
    private url: UrlConfig,
    private router: Router,
    private userConstant: ConstantService,
    public common: CommonService
  ) { }

  /*  Login form controls creation */
  private createForm() {
    this.loginForm = this.fb.group({
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /*  Access to login form fields */
  get login() { return this.loginForm.controls; }


  /* Go to the page basedon type
   @param mobile is user input
   @param password is user input
 */
  public onClickSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.spinner = true;
      const postObject = {
        mobile: Number(this.loginForm.value.mobile),
        password: this.loginForm.value.password
      };
      /* Api call*/
      this.api.postCall(this.url.urlConfig().userLogin, postObject, 'post').subscribe(user => {
        if (user.statusCode === 200) {
          const userDetails = {
            userName: user.userName,
            userId: user.userId
          };
          /* Stored the user details in session storage */
          sessionStorage.setItem('currentUser', JSON.stringify(userDetails));
          this.spinner = false;
          this.router.navigate(['/transfer']);
        } else {
          this.common.alertConfig = this.common.modalConfig(
            'Error', this.userConstant.messageConstant()[user.statusCode],
            true, [{ name: 'Ok' }]
            );
          this.spinner = false;
        }
      });
    }
  }

  /* Modal Action
  @param Ok modal has been closed
 */
  public modalAction(action: string): void {
    if (action === 'Ok') {
      this.spinner = false;
      this.common.alertConfigDefaultValue();
    }
  }

  /* Oninit call */
  ngOnInit() {
    /* Check whether login/not */
    if (!this.common.validUser()) {
      this.router.navigate(['/']);
    }
    /* Call the form creation while on component initiation */
    this.createForm();
  }

}
