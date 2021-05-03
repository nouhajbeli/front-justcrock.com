import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardsComponent } from './components/cards/cards.component';
import { AboutComponent } from './components/about/about.component';
import { ToprecetteComponent } from './components/toprecette/toprecette.component';
import { MembresComponent } from './components/membres/membres.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecettesComponent } from './components/recettes/recettes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddrecetteComponent } from './components/addrecette/addrecette.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import {AuthGuard} from './components/auth/auth.guard';
import {AuthInterceptor} from './components/auth/auth.interceptor';
import { DetailsComponent } from './components/details/details.component'
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { MatCarouselModule } from '@ngmodule/material-carousel'; // ---------- Important
import { NgxPaginationModule } from 'ngx-pagination';
import { ResetPComponent } from './components/reset-p/reset-p.component';
import { NewpasswordComponent } from './components/newpassword/newpassword.component';
import { EditRecetteComponent } from './components/edit-recette/edit-recette.component';
import { AvisComponent } from './components/avis/avis.component';
import { AddAvisComponent } from './components/add-avis/add-avis.component';
import { EditAvisComponent } from './components/edit-avis/edit-avis.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    CardsComponent,
    AboutComponent,
    ToprecetteComponent,
    MembresComponent,
    ContactComponent,
    FooterComponent,
    RecettesComponent,
    AddrecetteComponent,
    UserProfileComponent,
    SignUpComponent,
    LoginComponent,
    DetailsComponent,
    ChatComponent,
    ResetPComponent,
    NewpasswordComponent,
    EditRecetteComponent,
    AvisComponent,
    AddAvisComponent,
    EditAvisComponent,
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    MatCarouselModule.forRoot() ,// ---------- Important
    NgxPaginationModule,
    ToastrModule.forRoot()


  ],
  providers: [{ provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true},AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
