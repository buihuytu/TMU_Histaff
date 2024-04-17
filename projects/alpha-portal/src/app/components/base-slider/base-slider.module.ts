import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseSliderComponent } from './base-slider/base-slider.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    BaseSliderComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule
  ],
  exports: [BaseSliderComponent]
})
export class BaseSliderModule { }
