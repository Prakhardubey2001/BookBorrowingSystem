import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import baseUrl from './helper';
import { Observable,of } from 'rxjs';
import { tap,catchError,map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  // get details of the current user which is logged in
  public getCurrentUser(): Observable<any> {
    let url = baseUrl + 'GetUserDetails';
    
    return this.http.get(url);
      
  }
  // generate token
  public generateToken(loginData:any)
  { let url=baseUrl+'LoginUser'
    return this.http.post(`${url}`,loginData);
  }
  // loginuser set token in localstorage
  public loginUser(token:any):Observable<any>
  {
    localStorage.setItem("token",token.jwtToken);

    return of(true);
  }
  // islogin: user is logged in or not
  public isLoggedIn()
  {
    let tokenString=localStorage.getItem("token")
      if(tokenString==undefined || tokenString==' '|| tokenString==null)
      {
        return false;
      }
      else
      {
        return true;
      }
  }
  public getToken()
  {
    return localStorage.getItem("token",);
  }

  //logout : romove token from local storage
  public logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
  //set userdetaiil
public setUser(user:any)
{
localStorage.setItem('user',JSON.stringify(user));
}
public getUser() {
  const userStr = localStorage.getItem("user");
  if (userStr !== null) {
    try {
      const user = JSON.parse(userStr);
      return user;
    } catch (error) {
      console.error("Error parsing user data:", error);
      this.logout();
      return null;
    }
  } else {
    this.logout();
    return null;
  }
}
public fetchUserDetailsAndStore(): Observable<any> {
  const url = baseUrl + 'GetUserDetails';

  // Set the headers with the Authorization token
  const headers = new HttpHeaders()
    .set("Authorization", `Bearer ${localStorage.getItem('token')}`);

  return this.http.get(url, { headers }).pipe(
    tap((user: any) => {
      // Store user details in local storage
      this.setUser(user);
      console.log("User Details:", user);
    })
  );
}

public getTokenAvailable(): Observable<number | null> {
  const url = baseUrl + 'TokensAvailable';

  // Set the headers with the Authorization token
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  return this.http.get<{ tokensAvailable: number }>(url, { headers }).pipe(
    map(response => response.tokensAvailable),
    catchError(error => {
      console.error('Error fetching tokensAvailable:', error);
      return of(null); 
    })
  );
}

 
  
}
