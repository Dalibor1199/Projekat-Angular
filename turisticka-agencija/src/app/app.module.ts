import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ONamaComponent } from './osnovneStranice/onama/onama.component';
import { DestinacijaItemComponent } from './destinacija/destinacija-item/destinacija-item.component';
import { DestinacijaListComponent } from './destinacija/destinacija-list/destinacija-list.component';
import { AddRezervacijaComponent } from './rezervacija/add-rezervacija/add-rezervacija.component';
import { AddDestinacijaComponent } from './destinacija/add-destinacija/add-destinacija.component';
import { UpdateDestinacijaComponent } from './destinacija/update-destinacija/update-destinacija.component';
import { TokenInterceptor } from './services/tokenInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ONamaComponent,
    DestinacijaItemComponent,
    DestinacijaListComponent,
    AddRezervacijaComponent,
    AddDestinacijaComponent,
    UpdateDestinacijaComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
