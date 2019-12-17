/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker-trigger.directive
 */
import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { OwlDateTimeComponent } from './date-time-picker.component';
import { merge, of as observableOf, Subscription } from 'rxjs';
/**
 * @template T
 */
export class OwlDateTimeTriggerDirective {
    /**
     * @param {?} changeDetector
     */
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.stateChanges = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined ? this.dtPicker.disabled : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value;
    }
    /**
     * @return {?}
     */
    get owlDTTriggerDisabledClass() {
        return this.disabled;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.watchStateChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleClickOnHost(event) {
        if (this.dtPicker) {
            this.dtPicker.open();
            event.stopPropagation();
        }
    }
    /**
     * @private
     * @return {?}
     */
    watchStateChanges() {
        this.stateChanges.unsubscribe();
        /** @type {?} */
        const inputDisabled = this.dtPicker && this.dtPicker.dtInput ?
            this.dtPicker.dtInput.disabledChange : observableOf();
        /** @type {?} */
        const pickerDisabled = this.dtPicker ?
            this.dtPicker.disabledChange : observableOf();
        this.stateChanges = merge(pickerDisabled, inputDisabled)
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.changeDetector.markForCheck();
        }));
    }
}
OwlDateTimeTriggerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[owlDateTimeTrigger]',
                host: {
                    '(click)': 'handleClickOnHost($event)',
                    '[class.owl-dt-trigger-disabled]': 'owlDTTriggerDisabledClass'
                }
            },] }
];
/** @nocollapse */
OwlDateTimeTriggerDirective.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
OwlDateTimeTriggerDirective.propDecorators = {
    dtPicker: [{ type: Input, args: ['owlDateTimeTrigger',] }],
    disabled: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    OwlDateTimeTriggerDirective.prototype.dtPicker;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeTriggerDirective.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeTriggerDirective.prototype.stateChanges;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeTriggerDirective.prototype.changeDetector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2RhdGUtdGltZS1waWNrZXItdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFLUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBUy9ELE1BQU0sT0FBTywyQkFBMkI7Ozs7SUFvQnBDLFlBQXVCLGNBQWlDO1FBQWpDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUZoRCxpQkFBWSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFHMUMsQ0FBQzs7OztJQWhCRCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDcEYsQ0FBQzs7Ozs7SUFFRCxJQUFJLFFBQVEsQ0FBRSxLQUFjO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxJQUFJLHlCQUF5QjtRQUN6QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7OztJQU9NLFFBQVE7SUFDZixDQUFDOzs7OztJQUVNLFdBQVcsQ0FBRSxPQUFzQjtRQUN0QyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDOzs7O0lBRU0sa0JBQWtCO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVNLGlCQUFpQixDQUFFLEtBQVk7UUFDbEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDOzs7OztJQUVPLGlCQUFpQjtRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDOztjQUUxQixhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFOztjQUVuRCxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUU7UUFFakQsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQzthQUNuRCxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO0lBQ1gsQ0FBQzs7O1lBbkVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxJQUFJLEVBQUU7b0JBQ0YsU0FBUyxFQUFFLDJCQUEyQjtvQkFDdEMsaUNBQWlDLEVBQUUsMkJBQTJCO2lCQUNqRTthQUNKOzs7O1lBakJHLGlCQUFpQjs7O3VCQW9CaEIsS0FBSyxTQUFDLG9CQUFvQjt1QkFHMUIsS0FBSzs7OztJQUhOLCtDQUErRDs7Ozs7SUFFL0QsZ0RBQTJCOzs7OztJQWMzQixtREFBMEM7Ozs7O0lBRTdCLHFEQUEyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBkYXRlLXRpbWUtcGlja2VyLXRyaWdnZXIuZGlyZWN0aXZlXHJcbiAqL1xyXG5cclxuXHJcbmltcG9ydCB7XHJcbiAgICBBZnRlckNvbnRlbnRJbml0LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT3dsRGF0ZVRpbWVDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW293bERhdGVUaW1lVHJpZ2dlcl0nLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrT25Ib3N0KCRldmVudCknLFxyXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LXRyaWdnZXItZGlzYWJsZWRdJzogJ293bERUVHJpZ2dlckRpc2FibGVkQ2xhc3MnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZVRyaWdnZXJEaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoJ293bERhdGVUaW1lVHJpZ2dlcicpIGR0UGlja2VyOiBPd2xEYXRlVGltZUNvbXBvbmVudDxUPjtcclxuXHJcbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgPyB0aGlzLmR0UGlja2VyLmRpc2FibGVkIDogISF0aGlzLl9kaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGlzYWJsZWQoIHZhbHVlOiBib29sZWFuICkge1xyXG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERUVHJpZ2dlckRpc2FibGVkQ2xhc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0ZUNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyggY2hhbmdlczogU2ltcGxlQ2hhbmdlcyApIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5kYXRlcGlja2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICB0aGlzLndhdGNoU3RhdGVDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhbmRsZUNsaWNrT25Ib3N0KCBldmVudDogRXZlbnQgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHRQaWNrZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5vcGVuKCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdhdGNoU3RhdGVDaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0RGlzYWJsZWQgPSB0aGlzLmR0UGlja2VyICYmIHRoaXMuZHRQaWNrZXIuZHRJbnB1dCA/XHJcbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIuZHRJbnB1dC5kaXNhYmxlZENoYW5nZSA6IG9ic2VydmFibGVPZigpO1xyXG5cclxuICAgICAgICBjb25zdCBwaWNrZXJEaXNhYmxlZCA9IHRoaXMuZHRQaWNrZXIgP1xyXG4gICAgICAgICAgICB0aGlzLmR0UGlja2VyLmRpc2FibGVkQ2hhbmdlIDogb2JzZXJ2YWJsZU9mKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzID0gbWVyZ2UocGlja2VyRGlzYWJsZWQsIGlucHV0RGlzYWJsZWQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19