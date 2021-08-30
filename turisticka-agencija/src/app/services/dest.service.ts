import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Destinacija } from '../model/destinacija';

@Injectable({
  providedIn: 'root'
})
export class DestService {

  BACKAND_BASE = "http://localhost:8080/api/";


  constructor(private http: HttpClient) { }


  getDest(): Observable<Destinacija[]> {
    return this.http.get<Destinacija[]>(this.BACKAND_BASE + "sveDestinacije");
  }

  getDests(naziv: string, cena: string, date: string): Observable<any> {
    let params = new HttpParams()
      .set("naziv", naziv)
      .set("cena", cena)
      .set("date", date);
    return this.http.get<Destinacija[]>(this.BACKAND_BASE + "filter", { params });

  }

  addDest(destForm): Observable<Destinacija> {
    let params = new HttpParams()
      .set("naziv", destForm.naziv)
      .set("cena", destForm.cena)
      .set("datum", destForm.datum)
      .set("slika", destForm.slika);

    return this.http.post<Destinacija>(this.BACKAND_BASE + "addDest", params);
  }

  deleteDest(naziv: string): Observable<any> {
    let params = new HttpParams().set("naziv", naziv)
    return this.http.post(this.BACKAND_BASE + "deleteDest", params);
  }

  updateDest(naziv: string, cena:string, datum: string, slika: string): Observable<any> {
    let params=new HttpParams()
    .set("naziv", naziv)
    .set("cena", cena)
    .set("datum", datum)
    .set("slika", slika);
  
    return this.http.post(this.BACKAND_BASE + "updateDest", params);
  }

}
