import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Destinacija } from 'src/app/model/destinacija';
import { DestService } from 'src/app/services/dest.service';

@Component({
  selector: 'app-destinacija-list',
  templateUrl: './destinacija-list.component.html',
  styleUrls: ['./destinacija-list.component.css']
})
export class DestinacijaListComponent implements OnInit {

  public naziv: string="";
  public cena: string="";
  public date: string="";

  public dests$ : Observable<Destinacija[]>;
  constructor(private destService: DestService) { }

  ngOnInit(): void {
    this.dests$=this.destService.getDest();
  }

  updateDests() {
   this.dests$=this.destService.getDests(this.naziv, this.cena, this.date);
  }


}
