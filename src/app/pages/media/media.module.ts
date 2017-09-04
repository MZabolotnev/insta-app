import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { RouterModule }             from '@angular/router';

import { MediaComponent }           from './media.component';

@NgModule({
  declarations: [
    MediaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    MediaComponent
  ]
})
export class MediaModule { }
