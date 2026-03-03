import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/public/home/home.component';
import { ProductDetailsComponent } from './pages/public/product-details/product-details.component';
import { NotFoundComponent } from './pages/public/not-found/not-found.component';
import { LoginComponent } from './pages/public/auth/login/login.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductAddComponent } from './pages/admin/products/product-add/product-add.component';
import { UserListComponent } from './pages/admin/users/user-list/user-list.component';
import { ProductEditComponent } from './pages/admin/products/product-edit/product-edit.component';
import { UserEditComponent } from './pages/admin/users/user-edit/user-edit.component';
import { UserAddComponent } from './pages/admin/users/user-add/user-add.component';
import { ProductListComponent } from './pages/admin/products/product-list/product-list.component';
import { ClientLayoutComponent } from './shared/layouts/client-layout/client-layout.component';
import { OrdersComponent } from './pages/client/orders/orders.component';
import { CartComponent } from './pages/client/cart/cart.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { roleGuard } from './core/guards/role/role.guard';
import { UnauthorizedComponent } from './pages/public/unauthorized/unauthorized.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            {
                path: 'products/:id/details',
                component: ProductDetailsComponent
            },
            { path: 'login', component: LoginComponent },

        ]
    },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'admin' },

        children: [
            { path: '', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'products', component: ProductListComponent },
            { path: 'products/add', component: ProductAddComponent },
            { path: 'products/:id/edit', component: ProductEditComponent },
            { path: 'users', component: UserListComponent },
            { path: 'users/add', component: UserAddComponent },
            { path: 'users/:id/edit', component: UserEditComponent }
        ]
    },
    {
        path: 'client',
        component: ClientLayoutComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'client' },
        children: [
            { path: '', redirectTo: 'orders', pathMatch: 'full' },
            { path: 'orders', component: OrdersComponent },
            { path: 'cart', component: CartComponent }
        ]
    },
    { path: 'unauthorized', component: UnauthorizedComponent },

    { path: '**', component: NotFoundComponent },

];
