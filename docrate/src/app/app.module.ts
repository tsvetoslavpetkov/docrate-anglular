import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent, NotFoundComponent, ContactComponent, ProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    AuthModule,
    HttpClientModule,
    DoctorModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    Title,
    {
      provide: APP_INITIALIZER,
      useFactory: (AuthService: AuthService) => {
        return () => AuthService.authenticate();
      },
      deps: [AuthService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
