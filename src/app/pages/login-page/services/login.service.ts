import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../types/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  test = 'service works!';
  baseUrl = "https://6802395481c7e9fbcc44db3c.mockapi.io/fakeOlx/"


  constructor(private http: HttpClient) { }

  userLogin(userData: User): Observable<User>  {
    return this.http.get<User>(`${this.baseUrl}/user?email=${userData.email}&password=${userData.password}`);
  }


  userRegistration(userData: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return this.http.post<User>(this.baseUrl + '/user', userData, httpOptions);

}



}
