import { Component, OnInit } from '@angular/core';
import { Korisnik } from 'src/app/model/korisnik';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-prikaz-korisnika',
  templateUrl: './prikaz-korisnika.component.html',
  styleUrls: ['./prikaz-korisnika.component.css']
})
export class PrikazKorisnikaComponent implements OnInit {

  public username: string="";
  public korisnici: Korisnik[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(resp => {
      this.korisnici=resp;
    })
  }

  deleteKorisnik(korisnik: Korisnik) {
    this.userService.deleteUser(korisnik.username).subscribe(resp => {
      alert("Korisnik uspesno obrisan.")
      window.location.reload();
    })
  }

}
