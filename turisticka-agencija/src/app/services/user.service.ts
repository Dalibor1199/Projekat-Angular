import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Korisnik } from '../model/korisnik';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  BACKAND_BASE = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  register(korisnik: Korisnik): Observable<any> {

    return this.http.post(this.BACKAND_BASE + "register", korisnik)
  }

  login(username: string, password: string): Observable<any> {
    let params = new HttpParams()
      .set("username", username)
      .set("password", password);

    return this.http.post<Korisnik>(this.BACKAND_BASE + "login", params, {

      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    }
    )
  }
}
