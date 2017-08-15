import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NzSliderMarksComponent, Marks } from './nz-slider-marks.component';

@Component({
  selector     : 'nz-slider-step',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="{{nzPrefixCls}}-step">
      <span *ngFor="let attr of attrs; trackBy: trackById" [ngClass]="attr.classes" [ngStyle]="attr.style"></span>
    </div>
  `
})
export class NzSliderStepComponent implements OnInit, OnChanges {

  // Dynamic properties
  @Input() nzLowerBound: number = null;
  @Input() nzUpperBound: number = null;

  // Static properties
  @Input() nzPrefixCls: string;
  @Input() nzVertical: boolean;
  @Input() nzMarksArray: any[];
  @Input() nzIncluded: boolean;

  attrs;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.nzLowerBound || changes.nzUpperBound) {
      this.togglePointActive();
    }
  }

  ngOnInit() {
    const orient = this.nzVertical ? 'bottom' : 'left', prefixCls = this.nzPrefixCls;
    this.attrs = this.nzMarksArray.map(mark => {
      const { value, offset } = mark;
      return {
        id     : value,
        value  : value,
        offset : offset,
        style  : {
          [orient]: `${offset}%`
        },
        classes: {
          [`${prefixCls}-dot`]       : true,
          [`${prefixCls}-dot-active`]: false
        }
      };
    });
    this.togglePointActive();
  }

  trackById(index: number, attr) {
    return attr.id;
  }

  togglePointActive() {
    const { nzPrefixCls, attrs, nzLowerBound, nzUpperBound, nzIncluded } = this;
    if (attrs && nzLowerBound !== null && nzUpperBound !== null) {
      attrs.forEach(attr => {
        const
          value    = attr.value,
          isActive = (!nzIncluded && value === nzUpperBound) ||
            (nzIncluded && value <= nzUpperBound && value >= nzLowerBound);
        attr.classes[ `${nzPrefixCls}-dot-active` ] = isActive;
      });
    }
  }

}
