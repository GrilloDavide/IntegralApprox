
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class requestService {

  constructor(private httpClient : HttpClient) { }


  send(boundA : string, boundB : string, expression : string, method : string) {
    let http_headers = new HttpHeaders().set("Content-Type", "application/json")
    return this.httpClient.post("http://localhost:8080",
      '{"bound A":"' + boundA + 
      '", "bound B":"' + boundB + 
      '", "expression":"' + expression +
      '", "method":"' + method +
      '"}', 
      {headers:http_headers}
    )
  }

}

export interface Data {
    
  boundA : number,
  boundb : number,
  expression : string,
  method : string
}
