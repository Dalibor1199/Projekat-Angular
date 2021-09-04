import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Destinacija } from 'src/app/model/destinacija';
import { DestService } from 'src/app/services/dest.service';

@Component({
  selector: 'app-add-destinacija',
  templateUrl: './add-destinacija.component.html',
  styleUrls: ['./add-destinacija.component.css']
})
export class AddDestinacijaComponent implements OnInit {

  public dest: Destinacija=new Destinacija();

  constructor(private destService: DestService, private router:Router) { }

  ngOnInit(): void {
  }

  addDest(destForm) {
    if (destForm.invalid) {
      alert("Invalid Form")
    }
    else {
      this.destService.addDest(this.dest).subscribe(resp => {
        alert("Uspesno dodata destinacija");
        console.log(this.dest.datum)
        this.router.navigate(['/destinacije']);
      })
    }
  }
}
