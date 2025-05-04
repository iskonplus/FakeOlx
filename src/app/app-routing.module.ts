import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { CreateAdsPageComponent } from './pages/create-ads-page/create-ads-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShowCategoryPageComponent } from './pages/show-category-page/show-category-page.component';
import { UserFavoriteComponent } from './components/user-favorite/user-favorite.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent},
  { path: 'user/:id', component: UserPageComponent},
  { path: 'user/:id/favorites', component: UserFavoriteComponent},
  { path: 'user/:id/add-ads', component: CreateAdsPageComponent},
  { path: 'test', component: TestComponent },
  { path: 'category/:cat', component: ShowCategoryPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
