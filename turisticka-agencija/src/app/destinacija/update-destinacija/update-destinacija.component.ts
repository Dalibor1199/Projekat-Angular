import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DestService } from 'src/app/services/dest.service';

@Component({
  selector: 'app-update-destinacija',
  templateUrl: './update-destinacija.component.html',
  styleUrls: ['./update-destinacija.component.css']
})
export class UpdateDestinacijaComponent implements OnInit {

  public naziv: string="";
  public cena: string="";
  public datum: string="";
  public slika: string="";


  constructor(private destService:DestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.naziv=params.naziv
    })
  }

  updateDest() {
    this.destService.updateDest(this.naziv, this.cena, this.datum, this.slika).subscribe(resp => {
      if (resp==true) {
      console.log("Azuriranje uspesno");
      this.router.navigate(['/destinacije']);
      }
      else {
        alert("Azuriranje neuspesno")
      }
    })
  }

}
