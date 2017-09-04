import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { RouterModule }             from '@angular/router';
import { FormsModule,
         ReactiveFormsModule }      from '@angular/forms';

import { AuthorizationComponent }   from './authorization.component';

@NgModule({
  declarations: [
    AuthorizationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthorizationComponent
  ]
})
export class AuthorizationModule { }
