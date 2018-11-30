import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DispenserService {
  //"http://127.0.0.1:8000/api/v1/dispenser/";
  //http://dsd-api.herokuapp.com/
  url: string = "http://dsd-api.herokuapp.com/api/v1/dispenser";

  constructor(private http: HttpClient) { }

  getDispensers(): Observable<any> {
    return this.http.get(this.url);
  }
}
