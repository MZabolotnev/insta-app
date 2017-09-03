import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { RouterModule }             from '@angular/router';

import { MediaDetailsComponent }     from './media-details.component';

@NgModule({
  declarations: [
    MediaDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    MediaDetailsComponent
  ]
})
export class MediaDetailsModule { }
