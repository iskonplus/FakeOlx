import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../types/user';
import { ActiveUser } from '../../../types/active-user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject = new BehaviorSubject<ActiveUser | null>(this.getUserFromStorage());
  activeUser$ = this.userSubject.asObservable();

  baseUrl = "https://6802395481c7e9fbcc44db3c.mockapi.io/fakeOlx/";

  constructor(private http: HttpClient) { }


  userLogin(userData: User): Observable<ActiveUser[]>  {
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


  // ----------sessionStorage-----------

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.sessionStorage;
  }

 getUserFromStorage() {
    if (this.isBrowser()) {
      const stored = sessionStorage.getItem('activeUser');
      return stored ? JSON.parse(stored) : null;
    }
}

setUser(user: ActiveUser) {
  sessionStorage.setItem('activeUser', JSON.stringify(user));
  this.userSubject.next(user);
}

clearUser() {
  sessionStorage.removeItem('activeUser');
  this.userSubject.next(null);
}


}
