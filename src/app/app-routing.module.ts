import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PokeListComponent } from './poke-list/poke-list.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'poke-list', component: PokeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
