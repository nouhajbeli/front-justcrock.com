import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  {AboutComponent} from './components/about/about.component'
import {ContactComponent} from './components/contact/contact.component'
import {HomepageComponent} from './components/homepage/homepage.component'
import {RecettesComponent} from './components/recettes/recettes.component'
import {AddrecetteComponent} from './components/addrecette/addrecette.component'
import {SignUpComponent} from './components/sign-up/sign-up.component'
import {LoginComponent}  from './components/login/login.component'
import {UserProfileComponent } from './components/user-profile/user-profile.component'
import {AuthGuard} from './components/auth/auth.guard';
import {DetailsComponent} from './components/details/details.component';
import { ChatComponent } from './components/chat/chat.component';
import { ResetPComponent } from './components/reset-p/reset-p.component';
import { NewpasswordComponent } from './components/newpassword/newpassword.component';
import {EditRecetteComponent} from './components/edit-recette/edit-recette.component'
import { AvisComponent } from './components/avis/avis.component';
import { AddAvisComponent } from './components/add-avis/add-avis.component';
import { EditAvisComponent } from './components/edit-avis/edit-avis.component';
const routes: Routes = [
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'',component:HomepageComponent},
  {path:'home',component:HomepageComponent},
  {path:'recette',component:RecettesComponent},
  {path:'addrecette',component:AddrecetteComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'userProfile',component:UserProfileComponent,canActivate:[AuthGuard] },
  {path:'details/:id',component:DetailsComponent },
   {path:'chat',component:ChatComponent},
   {path:'reset',component:ResetPComponent},
   {path:'newpassword/:token',component:NewpasswordComponent},
  {path:'edit/:id',component:EditRecetteComponent},
  {path:'avis',component:AvisComponent},
  {path:'addAvis',component:AddAvisComponent},
  {path:'editAvis/:id',component:EditAvisComponent},
  {path:'connect',component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
