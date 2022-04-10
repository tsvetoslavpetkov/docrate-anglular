import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ResourceErrorComponent } from './resource-error/resource-error.component';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ResourceErrorComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoadingComponent,
    ResourceErrorComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
