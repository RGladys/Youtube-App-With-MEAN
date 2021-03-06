import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PublishComponent } from './components/publish/publish.component';
import { EditComponent } from './components/publish/edit/edit.component';
import { DeleteComponent } from './components/publish/delete/delete.component';
import { PostComponent } from './components/post/post.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent 
  },
  {
  	path: 'signup',
  	component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'myprofile',
    component: MyProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:user',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'publish',
    component: PublishComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit_post/:id',
    component: EditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'delete_post/:id',
    component: DeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component: PostComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: HomeComponent } 
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }