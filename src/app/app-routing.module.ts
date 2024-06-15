import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  // { path:'', component: FirstPageComponent, pathMatch: 'full' },
  {path: '', component: MainPageComponent},
  { path:'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
