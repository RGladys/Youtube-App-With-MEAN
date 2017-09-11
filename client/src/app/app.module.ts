import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { PublishComponent } from './components/publish/publish.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditComponent } from './components/publish/edit/edit.component';
import { DeleteComponent } from './components/publish/delete/delete.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    MyProfileComponent,
    PublishComponent,
    DashboardComponent,
    EditComponent,
    DeleteComponent,
    PostComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,
              AuthGuard,
              NotAuthGuard,
              PostsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
