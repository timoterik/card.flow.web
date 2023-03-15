/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {AuthService} from './common/auth.service';
import {LoginViewComponent} from './login-view/login-view.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BoardListViewComponent} from './board/board-list-view/board-list-view.component';
import {AuthInterceptorService} from './http-interceptors/auth.service';
import {EnvironmentInterceptorService} from './http-interceptors/environment.service';
import {BoardService} from './board/board.service';
import {RegistrationViewComponent} from './registration/registration-view/registration-view.component';
import {FormInputComponent} from './common/form/form-input/form-input.component';
import {TemplateComponent} from './common/template/template.component';
import {CardsComponent} from './card/cards/cards.component';
import {CardAddComponent} from './card/card-add/card-add.component';
import {CardService} from './card/card.service';
import {DragulaModule} from 'ng2-dragula';
import {RegistrationService} from './registration/registration.service';
import {FileUploaderComponent} from './common/form/file-uploader/file-uploader.component';
import {ImageUploaderComponent} from './images/image-uploader/image-uploader.component';
import {ImageService} from './images/image.service';
import {BoardViewComponent} from './board/board-view/board-view.component';
import {BoardCreateComponent} from './board/board-create/board-create.component';
import {BoardMenuComponent} from './board/board-menu/board-menu.component';
import {UserListComponent} from './users/user-list/user-list.component';

import {BoardEditNameComponent} from './board/board-edit-name/board-edit-name.component';
import {CardlistViewComponent} from './cardList/cardlist-view/cardlist-view.component';

import {CardListService} from './cardList/card-list.service';
import {NewCardListComponent} from './cardList/new-card-list/new-card-list.component';


@NgModule({
  declarations: [
    AppComponent,
    FormInputComponent,
    LoginViewComponent,
    FileUploaderComponent,
    ImageUploaderComponent,
    RegistrationViewComponent,
    TemplateComponent,
    BoardListViewComponent,
    BoardViewComponent,
    CardlistViewComponent,
    NewCardListComponent,
    CardsComponent,
    CardAddComponent,
    BoardEditNameComponent,
    BoardCreateComponent,
    BoardMenuComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DragulaModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    RegistrationService,
    ImageService,
    BoardService,
    CardListService,
    CardService,
    {provide: HTTP_INTERCEPTORS, useClass: EnvironmentInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
