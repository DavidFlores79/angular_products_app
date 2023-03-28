import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//componentes
import { ErrorComponent } from "./components/error/error.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

//definir las rutas
const appRoutes: Routes = [
    { path: '', component: LoginComponent, },
    { path: 'inicio', component: HomeComponent, },
    { path: 'login', component: LoginComponent, },
    { path: 'logout/:sure', component: LoginComponent, },
    { path: 'registro', component: RegisterComponent, },
    { path: '**', component: ErrorComponent, },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);