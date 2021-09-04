import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Korisnik } from 'src/app/model/korisnik';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

 korisnik: Korisnik = new Korisnik();

  ngOnInit(): void {
  }

  
  register(form) {
    if (form.invalid) {
      alert("Invalid form")
    }
    else {
    this.userService.register(this.korisnik).subscribe(resp => {
      if (resp==false) {
        alert("Vec postoji neko sa tim username-om")
      }
      else {
        alert("Uspesno ste se registrovali");
        this.router.navigate(['/login'])
      }
    
    })
   }

  }

}