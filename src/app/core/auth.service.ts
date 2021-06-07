import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()

export class AuthService {
  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: "dev-br96g1jh.auth0.com",
      client_id: "8dia2O7RDDDTuBaaffN3zEfwjz8HIBOS",
      redirect_uri: `${window.location.origin}/sads222222asdassd`
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  constructor(private router: Router, private http: HttpClient) {
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.localAuthSetup();
    // Handle redirect from Auth0 login
    this.handleAuthCallback();
  }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  private localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    // console.log(redirectPath, window.location.origin)
    // return
    let url = `${window.location.href}`;
    console.log(url);
    console.log(`${window.location.pathname}`);
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: url,
        appState: { target: `${window.location.pathname}`, redirect_uri: redirectPath }
      });
    }, error => {
      console.log(error);
    });
    // window.location.replace(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${'86o0v9262k0u78'}&redirect_uri=${window.location.origin}${redirectPath}&state=welangrepeatlawe&scope=r_emailaddress%2Cr_liteprofile%2Cw_member_social`);
    // this.http.get()
    //   .subscribe(data => {
    //     console.log(data);
    //   }, err => {
    //     console.log(err);
    //   })
  }

  private handleAuthCallback() {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string; // Path to redirect to after login processsed
      const authComplete$ = this.handleRedirectCallback$.pipe(
        // Have client, now call method to handle auth callback redirect
        tap(cbRes => {
          console.log(cbRes);
          // Get and set target redirect route from callback results
          targetRoute = cbRes.appState && cbRes.appState.redirect_uri ? cbRes.appState.redirect_uri : '/';
          console.log(targetRoute);
        }),
        concatMap(() => {
          // Redirect callback complete; get user and login status
          return combineLatest([
            this.getUser$(),
            this.isAuthenticated$
          ]);
        })
      );
      // Subscribe to authentication completion observable
      // Response will be an array of user and login status
      authComplete$.subscribe(([user, loggedIn]) => {
        console.log(user)
        localStorage.setItem('LinkedInUser', JSON.stringify(user));
        // Redirect to target route after callback processing
        this.router.navigate([targetRoute]).then(dd => { window.location.reload() });
      });
    }
  }

  logoutLinkedin() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: "8dia2O7RDDDTuBaaffN3zEfwjz8HIBOS",
        returnTo: `${window.location.origin}`
      });
    });
  }


  sendToken(token: string) {
    console.log(token)
    sessionStorage.setItem("LoggedInUser", token)
  }

  getToken() {
    sessionStorage.getItem("LoggedInUser")
  }

  isLoggedIn() {
    if (sessionStorage.getItem("LoggedInUser")) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    // sessionStorage.removeItem('access_token')
    // sessionStorage.removeItem("LoggedInUser");
    // localStorage.removeItem('birthDate');
    // localStorage.removeItem('roles_length')
    // localStorage.removeItem('user_id')
    // localStorage.removeItem('roles');
    sessionStorage.clear();
    localStorage.clear();
    this.logoutLinkedin();
    this.router.navigate(["/"]);
    window.location.reload();
  }
} 
