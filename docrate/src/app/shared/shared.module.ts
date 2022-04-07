import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ResourceErrorComponent } from './resource-error/resource-error.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoadingComponent,
    ResourceErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoadingComponent,
    ResourceErrorComponent
  ]
})
export class SharedModule { }
