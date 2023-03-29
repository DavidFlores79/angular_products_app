import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//componentes
import { ErrorComponent } from "./components/error/error.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from "./components/categories/categories.component";

//definir las rutas
const appRoutes: Routes = [
    { path: '', component: LoginComponent, },
    { path: 'inicio', component: HomeComponent, },
    { path: 'login', component: LoginComponent, },
    { path: 'logout/:sure', component: LoginComponent, },
    { path: 'registro', component: RegisterComponent, },
    { path: 'perfil', component: ProfileComponent, },
    { path: 'usuarios', component: UsersComponent, },
    { path: 'productos', component: ProductsComponent, },
    { path: 'categorias', component: CategoriesComponent, },
    { path: '**', component: ErrorComponent, },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);