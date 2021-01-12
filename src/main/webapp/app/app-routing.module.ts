import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot([
      /* TODO: Enable if needed to have user administration
         {
           path: 'admin',
           data: {
             authorities: [Authority.ADMIN]
           },
           canActivate: [UserRouteAccessService],
           loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
         },*/
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
      },
      ...LAYOUT_ROUTES
    ])
  ],
  exports: [RouterModule]
})
export class EventAdminAppRoutingModule {}
