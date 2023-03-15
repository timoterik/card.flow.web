/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './common/auth.guard';
import {LoginViewComponent} from './login-view/login-view.component';
import {BoardListViewComponent} from './board/board-list-view/board-list-view.component';
import {BoardViewComponent} from './board/board-view/board-view.component';
import {RegistrationViewComponent} from './registration/registration-view/registration-view.component';

const routes: Routes = [
  {path: 'login', component: LoginViewComponent},
  {path: 'boards/:boardId', component: BoardViewComponent},
  {path: 'boards', component: BoardListViewComponent},
  {path: 'registration', component: RegistrationViewComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
