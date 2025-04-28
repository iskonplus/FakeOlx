import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { NavComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MainPageModule } from './pages/main-page/main-page.module';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './components/login/login.component';
import { provideHttpClient, withFetch } from '@angular/common/http';


import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistrationComponent } from './components/registration/registration.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PopupComponent } from './components/popup/popup.component';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateAdsPageComponent } from './pages/create-ads-page/create-ads-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShowCategoryPageComponent } from './pages/show-category-page/show-category-page.component';
import { ProductsModule } from './shared/shared.module';




@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    NavComponent,
    FooterComponent,
    LoginPageComponent,
    UserPageComponent,
    LoginComponent,
    RegistrationComponent,
    PopupComponent,
    CreateAdsPageComponent,
    PageNotFoundComponent,
    ShowCategoryPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MainPageModule,
    ProductsModule,
    HttpClientModule,
    MatTabsModule,

    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatProgressSpinnerModule,

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
