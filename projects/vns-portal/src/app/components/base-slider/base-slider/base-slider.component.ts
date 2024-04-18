import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';

@Component({
  selector: 'base-slider',
  templateUrl: './base-slider.component.html',
  styleUrls: ['./base-slider.component.scss']
})
export class BaseSliderComponent implements OnChanges {
  @Input() pagesContext!: any[];
  @Input() pageRef!: TemplateRef<any>;
  @Input() showArows!: boolean;

  @Input() showDots!: boolean;
  @Input() dotsContainerWidth!: number;
  @Input() dotsContainerHeight!: number;
  @Output() onItemClick = new EventEmitter();

  activePage: number = 0;
  slideConfig!: any;

  constructor(
  ) {
    this.slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "arrows": !!this.showArows };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageRef']) {
      console.log(changes['pageRef'].currentValue)
    }
    if (changes['showArows']) {
      this.slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "arrows": !!this.showArows };
    }
  }

  slickInit(e: any) {
  }

  addSlide() {
    //this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    //this.slides.length = this.slides.length - 1;
  }

  breakpoint(e: any) {
  }

  afterChange(e: any) {
  }

  beforeChange(e: any) {
    this.activePage = e.nextSlide;
  }

  onMenuItemClick(item: any) {
    this.onItemClick.emit(item);
  }

}