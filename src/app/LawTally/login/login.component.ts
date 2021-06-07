import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../core/users.service';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
declare let $: any;
declare let jQuery: any;
import Swal from 'sweetalert2';
import {
    AuthService as Auth,
    FacebookLoginProvider,
    GoogleLoginProvider, LinkedinLoginProvider
} from 'angular-6-social-login';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginMessage;
    message;
    userToken;
    stackAction;
    rolesLength;
    remember = false;
    public loading = false;
    // doc_width:any;

    constructor(
        public usersService: UsersService,
        public router: Router, public afAuth: AngularFireAuth,
        public authService: AuthService,
        public AuthServices: Auth
    ) {
        let linkedin = localStorage.getItem('LinkedInUser');
        if (linkedin) {
            localStorage.removeItem("LinkedInUser")
            let user = JSON.parse(linkedin)
            this.usersService.social_login(user.name, user.email, 3).subscribe((data: any) => {
                console.log(data, data.status);
console.log("aaaaaaaaaaaaaaaaaaaaaaa",data);

                this.userToken = data['response_data'].token;

                this.rolesLength = data['response_data'].roles.length;
                localStorage.setItem('roles', data['response_data'].roles)
                localStorage.setItem('roles_length', this.rolesLength)
                console.log(this.rolesLength)
                this.authService.sendToken(this.userToken);
                sessionStorage.setItem('access_token', this.userToken)

                if (data.status == 'SUCCESS') {
                    // Swal.fire({
                    //     position: 'center',
                    //     icon: 'success',
                    //     title: 'Logged In Successfully',
                    //     showConfirmButton: false,
                    //     timer: 1000
                    // });

                    setTimeout(() => {
                        let stack = localStorage.getItem('STACK_TRACE')
                        if (stack) {
                            localStorage.setItem('STACK_TRACE_ACTION', this.stackAction)
                            localStorage.setItem('STACK_TRACE', null)
                            stack = JSON.parse(stack);
                            if (stack['Lawyer']) {
                                this.router.navigateByUrl('/lawyer-directory/listing-details;id=' + stack['Lawyer'])
                                return;
                            }

                            if (stack['LawyerNormal']) {
                                this.router.navigateByUrl('/lawyer-directory/listing-details-normal-profile;id=' + stack['LawyerNormal'])
                                return;
                            }
                        } else {
                            this.router.navigate(['/lawyer-directory/dashboard']);
                        }
                    }, 200);
                }
            })
            return;
        }
        this.stackAction = localStorage.getItem('STACK_TRACE_ACTION')
        localStorage.setItem('STACK_TRACE_ACTION', null)
        if (sessionStorage.getItem('access_token') &&
            localStorage.getItem('roles_length') &&
            localStorage.getItem('roles')) {

            let stack = localStorage.getItem('STACK_TRACE')
            localStorage.setItem('STACK_TRACE_ACTION', this.stackAction)
            if (stack != null && stack != undefined && stack != 'null') {
                localStorage.setItem('STACK_TRACE', null)
                stack = JSON.parse(stack);
                if (stack['Lawyer']) {
                    this.router.navigateByUrl('/lawyer-directory/listing-details;id=' + stack['Lawyer'])
                    return;
                }

                if (stack['LawyerNormal']) {
                    this.router.navigateByUrl('/lawyer-directory/listing-details-normal-profile;id=' + stack['LawyerNormal'])
                    return;
                }
                this.router.navigate(['/lawyer-directory/dashboard']);

            } else {
                this.router.navigate(['/lawyer-directory/login']);
            }
        }
    }

    ngOnInit() {       

        $('#loginForm').parsley();

    }
    passwordInput = "password";
    passStatus = "fa fa-eye";
    viewPassword(){
        console.log("aaaaaaaaaaaaaaaaaaaa",this.passwordInput);
        
        if (this.passwordInput == 'password')
        {
          this.passwordInput='text';
          this.passStatus='fa fa-eye-slash';
        }
        else
        {
          this.passwordInput='password';
          this.passStatus='fa fa-eye';
        }
      
    }


    onChange(isChecked: boolean) {
        console.log(isChecked)
        if (isChecked) {
            this.remember = true
        } else {
            this.remember = false
        }
    }
    doFacebookLogin() {
        return new Promise<any>((resolve, reject) => {
            let provider = new firebase.auth.FacebookAuthProvider();
            console.log(provider);

            this.afAuth.auth
                .signInWithPopup(provider)
                .then((res) => {
                    console.log(res);
                    this.usersService.social_login(res.user.displayName, res.user.email, 1).subscribe((data: any) => {
                        if (data.status === 'SUCCESS') {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Logged In Successfully',
                                showConfirmButton: false,
                                timer: 1000
                            });

                            this.userToken = data['response_data'].token;

                            this.rolesLength = data['response_data'].roles.length;
                            localStorage.setItem('roles', data['response_data'].roles)
                            localStorage.setItem('roles_length', this.rolesLength)
                            console.log(this.rolesLength)

                            this.authService.sendToken(this.userToken);
                            sessionStorage.setItem('access_token', this.userToken)
                            setTimeout(() => {
                                window.location.reload();
                            }, 900);
                        }
                    })

                    resolve(res);
                }, err => {
                    console.log(err);
                    reject(err);
                })
        })
    }
    doTwitterLogin() {
        return new Promise<any>((resolve, reject) => {
            let provider = new firebase.auth.TwitterAuthProvider();
            this.afAuth.auth
                .signInWithPopup(provider)
                .then(res => {
                    resolve(res);
                    console.log(res);
                    this.usersService.social_login(res.user.displayName, res.user.email, 2).subscribe((data: any) => {
                        console.log(data);

                        if (data.status === 'SUCCESS') {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Logged In Successfully',
                                showConfirmButton: false,
                                timer: 1000
                            });

                            this.userToken = res['response_data'].token;

                            this.rolesLength = res['response_data'].roles.length;
                            localStorage.setItem('roles', res['response_data'].roles)
                            localStorage.setItem('roles_length', this.rolesLength)
                            console.log(this.rolesLength)

                            this.authService.sendToken(this.userToken);
                            sessionStorage.setItem('access_token', this.userToken)

                            let stack = localStorage.getItem('STACK_TRACE')
                            if (stack) {
                                localStorage.setItem('STACK_TRACE_ACTION', this.stackAction)
                                localStorage.setItem('STACK_TRACE', null)
                                stack = JSON.parse(stack);
                                if (stack['Lawyer']) {
                                    this.router.navigateByUrl('/lawyer-directory/listing-details;id=' + stack['Lawyer'])
                                    return;
                                }

                                if (stack['LawyerNormal']) {
                                    this.router.navigateByUrl('/lawyer-directory/listing-details-normal-profile;id=' + stack['LawyerNormal'])
                                    return;
                                }
                            } else {
                                this.router.navigate(['/lawyer-directory/dashboard']);
                            }
                        }
                    })
                }, err => {
                    console.log(err);
                    reject(err);
                })
        })
    }

    doLinkedinLogin() {
        this.authService.login("/lawyer-directory/login")
    }

    onLogin(loginForm) {
       
        if (loginForm.valid) {
            this.loading = true;
            console.log(loginForm.value)
            this.usersService.lawtallyLogin(loginForm.value)
                .subscribe(res => {
                    this.loginMessage = res['status'];
                    this.loading = false;

                    if (this.loginMessage == "SUCCESS") {
                        this.userToken = res['response_data'].token;
                        localStorage.setItem('membership', res['response_data'].has_membership)   
                        this.rolesLength = res['response_data'].roles.length;
                        localStorage.setItem('roles', res['response_data'].roles)
                        localStorage.setItem('userLogged', res['response_data'].id)
                        localStorage.setItem('roles_length', this.rolesLength)
                        console.log(this.rolesLength)

                        this.authService.sendToken(this.userToken);
                        sessionStorage.setItem('access_token', this.userToken)
                        let stack = localStorage.getItem('STACK_TRACE')
                        console.log(stack);
                        
                        if (stack != null && stack != undefined && stack != 'null') {
                            localStorage.setItem('STACK_TRACE_ACTION', this.stackAction)
                            localStorage.setItem('STACK_TRACE', null)
                            stack = JSON.parse(stack);
                            if (stack['Lawyer']) {
                                this.router.navigateByUrl('/lawyer-directory/listing-details;id=' + stack['Lawyer'])
                                return;
                            }

                            if (stack['LawyerNormal']) {
                                this.router.navigateByUrl('/lawyer-directory/listing-details-normal-profile;id=' + stack['LawyerNormal'])
                                return;
                            }
                            this.router.navigate(['/lawyer-directory/dashboard']);

                        } else {
                            this.router.navigate(['/lawyer-directory/dashboard']);
                        }
                    } else {
                        this.message = "Invalid Username or Password";
                        console.log("Invalid Username or Password");
                    }
                })
        } else {
            console.log("Invalid")
        }
    }

}
