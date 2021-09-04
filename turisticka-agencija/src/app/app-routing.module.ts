import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDestinacijaComponent } from './destinacija/add-destinacija/add-destinacija.component';
import { DestinacijaListComponent } from './destinacija/destinacija-list/destinacija-list.component';
import { UpdateDestinacijaComponent } from './destinacija/update-destinacija/update-destinacija.component';
import { AuthGuard } from './gurads/authGuard';
import { PrikazKorisnikaComponent } from './korisnik/prikaz-korisnika/prikaz-korisnika.component';
import { AddRezervacijaComponent } from './rezervacija/add-rezervacija/add-rezervacija.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [{path:'', redirectTo:'/destinacije', pathMatch:'full'},
                        {path:'login', component: LoginComponent, canActivate: [AuthGuard]},
                        {path:'register', component: RegisterComponent, canActivate: [AuthGuard]},
                        {path:'destinacije', component:DestinacijaListComponent},
                        {path:'add-rezervacija', component:AddRezervacijaComponent},
                        {path:'add-destinacija', component:AddDestinacijaComponent},
                        {path:'update-destinacija', component:UpdateDestinacijaComponent},
                        {path: 'prikaz-korisnika', component:PrikazKorisnikaComponent}];
                       // {path:'**', component: RegisterComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
