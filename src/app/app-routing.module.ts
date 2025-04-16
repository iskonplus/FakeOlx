import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [
  // { path:'', component: FirstPageComponent, pathMatch: 'full' },
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent},
  { path: 'user', component: UserPageComponent},
  { path:'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
