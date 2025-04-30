import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { User } from '../../../types/user';
import { ActiveUser } from '../../../types/active-user';
import { UserState } from '../../../types/user-state.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private initialUserState: UserState = { isLoggedIn: false };
  private userSubject = new BehaviorSubject<UserState>(this.initialUserState);
  activeUser$ = this.userSubject.asObservable();

  baseUrl = "https://6802395481c7e9fbcc44db3c.mockapi.io/fakeOlx/";

  constructor(private http: HttpClient) { }


  userLogin(userData: User): Observable<ActiveUser[]> {
    return this.http.get<ActiveUser[]>(`${this.baseUrl}/user?email=${userData.email}&password=${userData.password}`);
  }


  userRegistration(userData: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<User>(this.baseUrl + '/user', userData, httpOptions);
  }

  setUser(user: ActiveUser) {
    this.userSubject.next({ isLoggedIn: true, user });
  }

  clearUser() {
    this.userSubject.next(this.initialUserState);
  }


}
