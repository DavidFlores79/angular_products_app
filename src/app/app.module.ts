import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatComponent } from './components/chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModulesComponent } from './components/modules/modules.component';
import { RolesComponent } from './components/roles/roles.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ErrorComponent,
    ProfileComponent,
    UsersComponent,
    ProductsComponent,
    CategoriesComponent,
    ChatComponent,
    ForbiddenComponent,
    MenuComponent,
    ModulesComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AngularFileUploaderModule
  ],
  bootstrap: [AppComponent],
  providers: [ appRoutingProviders, AuthGuard, UserService, Title ],
})
export class AppModule { }
