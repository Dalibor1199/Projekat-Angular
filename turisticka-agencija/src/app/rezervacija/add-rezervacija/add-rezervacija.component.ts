import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Smestaj } from 'src/app/model/smestaj';
import { Transport } from 'src/app/model/transport';
import { RezervacijaService } from 'src/app/services/rezervacija.service';

@Component({
  selector: 'app-add-rezervacija',
  templateUrl: './add-rezervacija.component.html',
  styleUrls: ['./add-rezervacija.component.css']
})
export class AddRezervacijaComponent implements OnInit {

  public ok: boolean=false;

  public imeKorisnika: string="";
  public prezimeKorisnika: string="";
  public dest: string="";
  public transports: Transport[];
  public smestajs: Smestaj[];

  public cenaPoNocenju: number;
  public brojDana: number=0;
  public cena:string="";

  public username: string="";
  public transport: string="";
  public smestaj: string="";

  public deca: boolean=false;
  constructor(private route: ActivatedRoute, private rezervacijaService: RezervacijaService, private router: Router) { }

  ngOnInit(): void {
    this.imeKorisnika=localStorage.getItem("imeKorisnika");
    this.prezimeKorisnika=localStorage.getItem("prezimeKorisnika");
    this.route.queryParams.subscribe(params => {
      this.dest=params.dest
    })
    this.route.queryParams.subscribe(params => {
      this.cenaPoNocenju=params.cena
    })
    this.rezervacijaService.getTransport().subscribe((resp:any) => {
      this.transports=resp;
      console.log(this.transports)
    })
    this.rezervacijaService.getSmestaj().subscribe(resp => {
      this.smestajs=resp;
    })
    this.username=localStorage.getItem("token");
  }

 addRezervacija() {
  if (this.brojDana==0 || this.transport=="" || this.smestaj=="") {
    alert("Invalid form!")
  }

else {
  let cenaInt=this.cenaPoNocenju*this.brojDana;
  if (this.deca) {
    cenaInt*=0.8;
  }
  else if (this.transport=="Svoj prevoz") {
      cenaInt*=0.75;
  }

  else if (this.smestaj=="Apartman") {
    cenaInt*=1.1;
  }

  this.cena=cenaInt+"";

    this.rezervacijaService.addRezervacija(this.username, this.transport, this.smestaj, this.dest, this.cena)
    .subscribe(resp => {
      if (resp!=null) {
        alert("Rezervacija uspesna! Ukupna cena: "+ this.cena+"$")
        this.router.navigate(['/destinacije']);
      }
    })
  }
}

}
