import { Component, Input, OnInit } from '@angular/core';
import { Destinacija } from 'src/app/model/destinacija';
import { DestService } from 'src/app/services/dest.service';

@Component({
  selector: 'app-destinacija-item',
  templateUrl: './destinacija-item.component.html',
  styleUrls: ['./destinacija-item.component.css']
})
export class DestinacijaItemComponent implements OnInit {

  @Input() dest: Destinacija;
  date: Date;

  public isLogIn: boolean=false;
  public adminLogin: boolean=false;

  constructor(private destService: DestService) {
   }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      this.isLogIn=true;
    }
    if (localStorage.getItem("admin")) {
      this.adminLogin=true;
    }
    this.date=new Date(this.dest.datum);
  }

  deleteDest(naziv: string) {
    this.destService.deleteDest(this.dest.naziv).subscribe(resp => {
      if (resp==true) {
        console.log("Destinacija izbrisana")
        window.location.reload();
      }
    })
  }

}
