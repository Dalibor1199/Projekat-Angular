import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'turisticka-agencija';

  constructor(private router: Router) { 
    
  }

  ngOnInit() {
    
  }

  public isLogIn: boolean = (localStorage.getItem("token") || localStorage.getItem("admin")) ? true : false;
  public admin: boolean = localStorage.getItem("admin") ? true : false;

  removeToken() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token")
    }
    else {
      localStorage.removeItem("admin")
    }
    window.location.reload();
  }
}
