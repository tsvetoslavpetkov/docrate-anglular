import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DoctorModule } from './doctor/doctor.module';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent, NotFoundComponent, ContactComponent, CreateComponent, EditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    AuthModule,
    HttpClientModule,
    DoctorModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
