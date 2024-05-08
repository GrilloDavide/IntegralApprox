
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class requestService {
  

  constructor(private httpClient : HttpClient) { }


  login(name : string, surname : string, email : string, username : string, password : string) {
    let http_headers = new HttpHeaders().set("Content-Type", "application/json")
    return this.httpClient.post<Valid>("http://localhost:80/",
      '{"name":"' + name + 
      '", "surname":"' + surname + 
      '", "email":"' + email +
      '", "username":"' + username +
      '", "password":"' + password +
      '"}', 
      {headers:http_headers}
    )
  }
}

export interface Valid {
  valid : boolean
}

export interface User {
    
  email : string,
  id : number,
  name : string,
  password : string,
  surname : string,
  username : string
}
