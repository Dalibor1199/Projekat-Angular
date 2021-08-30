import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/model/korisnik';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public username: string = '';
  public password: string = '';

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.username, this.password).subscribe((resp: any) => {
      if (resp.username == "") {
        alert("Pogresno korisnicko ime ili lozinka")
      }
      else {
        if (resp.idUloga == 2) {
          localStorage.setItem("imeKorisnika", resp.ime)
          localStorage.setItem("prezimeKorisnika", resp.prezime)
          localStorage.setItem("token", resp.username)
        }
        else {
          localStorage.setItem("admin", resp.username);
        }
        console.log(localStorage.getItem("token"))
        this.router.navigate(['/destinacije']).then(() => {
          window.location.reload();
        })
      };
    })
  }
}

