import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { GenerationsComponent } from './pages/generations/generations.component';
import { SpecialitiesComponent } from './pages/specialities/specialities.component';
import { PandawansComponent } from './pages/pandawans/pandawans.component';
import { EventsComponent } from './pages/events/events.component';

export const routes: Routes = [
 
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'programs', component: ProgramsComponent},
  { path: 'generations', component: GenerationsComponent},
  { path: 'specialities', component: SpecialitiesComponent},
  { path: 'pandawans', component: PandawansComponent},
  { path: 'events', component: EventsComponent},
  { path: '**', redirectTo: "/login"},
  // { path: '**', component: ErrorComponent },
];
