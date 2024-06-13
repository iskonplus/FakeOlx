import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { FirstPageComponent } from './components/first-page/first-page.component';

const routes: Routes = [
  { path:'', component: FirstPageComponent, pathMatch: 'full' },
  { path:'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
