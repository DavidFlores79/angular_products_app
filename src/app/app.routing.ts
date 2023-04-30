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
import { ChatComponent } from "./components/chat/chat.component";
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { ForbiddenComponent } from "./components/forbidden/forbidden.component";
import { RouteGuard } from "./guards/route.guard";
import { ModulesComponent } from "./components/modules/modules.component";
import { RolesComponent } from "./components/roles/roles.component";

//definir las rutas
const appRoutes: Routes = [
    { path: '', component: LoginComponent, },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent, },
    { path: 'logout/:sure', component: LoginComponent, },
    { path: 'register', component: RegisterComponent, },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
    { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
    { path: 'modules', component: ModulesComponent, canActivate: [AuthGuard]},
    { path: 'roles', component: RolesComponent, canActivate: [AuthGuard]},
    { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
    { path: 'no-access', component: ForbiddenComponent},
    { path: '**', component: ErrorComponent, },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);