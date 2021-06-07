import { HomeComponent } from './LawTally/home/home.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/auth.guard';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LawTallyModule } from './LawTally/LawTally.module';
import { PageNotFoundComponent } from './Other/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'lawyer-directory/home', component: HomeComponent },
  { path: '', redirectTo: '/lawyer-directory/home', pathMatch: 'full' },
  { path: 'lawyer-directory', loadChildren: () => import('../app/LawTally/LawTally.module').then(m => m.LawTallyModule) },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false }),
    LawTallyModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
