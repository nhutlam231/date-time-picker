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
var OwlDateTimeTriggerDirective = /** @class */ (function () {
    function OwlDateTimeTriggerDirective(changeDetector) {
        this.changeDetector = changeDetector;
        this.stateChanges = Subscription.EMPTY;
    }
    Object.defineProperty(OwlDateTimeTriggerDirective.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled === undefined ? this.dtPicker.disabled : !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeTriggerDirective.prototype, "owlDTTriggerDisabledClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.datepicker) {
            this.watchStateChanges();
        }
    };
    /**
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.watchStateChanges();
    };
    /**
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.unsubscribe();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.handleClickOnHost = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.dtPicker) {
            this.dtPicker.open();
            event.stopPropagation();
        }
    };
    /**
     * @private
     * @return {?}
     */
    OwlDateTimeTriggerDirective.prototype.watchStateChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.stateChanges.unsubscribe();
        /** @type {?} */
        var inputDisabled = this.dtPicker && this.dtPicker.dtInput ?
            this.dtPicker.dtInput.disabledChange : observableOf();
        /** @type {?} */
        var pickerDisabled = this.dtPicker ?
            this.dtPicker.disabledChange : observableOf();
        this.stateChanges = merge(pickerDisabled, inputDisabled)
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.changeDetector.markForCheck();
        }));
    };
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
    OwlDateTimeTriggerDirective.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    OwlDateTimeTriggerDirective.propDecorators = {
        dtPicker: [{ type: Input, args: ['owlDateTimeTrigger',] }],
        disabled: [{ type: Input }]
    };
    return OwlDateTimeTriggerDirective;
}());
export { OwlDateTimeTriggerDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2RhdGUtdGltZS1waWNrZXItdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUtBLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFLUixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBRS9EO0lBMkJJLHFDQUF1QixjQUFpQztRQUFqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFGaEQsaUJBQVksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO0lBRzFDLENBQUM7SUFoQkQsc0JBQ0ksaURBQVE7Ozs7UUFEWjtZQUVJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNwRixDQUFDOzs7OztRQUVELFVBQWMsS0FBYztZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDOzs7T0FKQTtJQU1ELHNCQUFJLGtFQUF5Qjs7OztRQUE3QjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTs7OztJQU9NLDhDQUFROzs7SUFBZjtJQUNBLENBQUM7Ozs7O0lBRU0saURBQVc7Ozs7SUFBbEIsVUFBb0IsT0FBc0I7UUFDdEMsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7OztJQUVNLHdEQUFrQjs7O0lBQXpCO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVNLGlEQUFXOzs7SUFBbEI7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBRU0sdURBQWlCOzs7O0lBQXhCLFVBQTBCLEtBQVk7UUFDbEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDOzs7OztJQUVPLHVEQUFpQjs7OztJQUF6QjtRQUFBLGlCQWFDO1FBWkcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7WUFFMUIsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRTs7WUFFbkQsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFO1FBRWpELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUM7YUFDbkQsU0FBUzs7O1FBQUM7WUFDUCxLQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO0lBQ1gsQ0FBQzs7Z0JBbkVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxJQUFJLEVBQUU7d0JBQ0YsU0FBUyxFQUFFLDJCQUEyQjt3QkFDdEMsaUNBQWlDLEVBQUUsMkJBQTJCO3FCQUNqRTtpQkFDSjs7OztnQkFqQkcsaUJBQWlCOzs7MkJBb0JoQixLQUFLLFNBQUMsb0JBQW9COzJCQUcxQixLQUFLOztJQXdEVixrQ0FBQztDQUFBLEFBcEVELElBb0VDO1NBN0RZLDJCQUEyQjs7O0lBRXBDLCtDQUErRDs7Ozs7SUFFL0QsZ0RBQTJCOzs7OztJQWMzQixtREFBMEM7Ozs7O0lBRTdCLHFEQUEyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBkYXRlLXRpbWUtcGlja2VyLXRyaWdnZXIuZGlyZWN0aXZlXHJcbiAqL1xyXG5cclxuXHJcbmltcG9ydCB7XHJcbiAgICBBZnRlckNvbnRlbnRJbml0LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIFNpbXBsZUNoYW5nZXNcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT3dsRGF0ZVRpbWVDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgbWVyZ2UsIG9mIGFzIG9ic2VydmFibGVPZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW293bERhdGVUaW1lVHJpZ2dlcl0nLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICcoY2xpY2spJzogJ2hhbmRsZUNsaWNrT25Ib3N0KCRldmVudCknLFxyXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LXRyaWdnZXItZGlzYWJsZWRdJzogJ293bERUVHJpZ2dlckRpc2FibGVkQ2xhc3MnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZVRyaWdnZXJEaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoJ293bERhdGVUaW1lVHJpZ2dlcicpIGR0UGlja2VyOiBPd2xEYXRlVGltZUNvbXBvbmVudDxUPjtcclxuXHJcbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgPyB0aGlzLmR0UGlja2VyLmRpc2FibGVkIDogISF0aGlzLl9kaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGlzYWJsZWQoIHZhbHVlOiBib29sZWFuICkge1xyXG4gICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERUVHJpZ2dlckRpc2FibGVkQ2xhc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0ZUNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyggY2hhbmdlczogU2ltcGxlQ2hhbmdlcyApIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5kYXRlcGlja2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2F0Y2hTdGF0ZUNoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICB0aGlzLndhdGNoU3RhdGVDaGFuZ2VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhbmRsZUNsaWNrT25Ib3N0KCBldmVudDogRXZlbnQgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZHRQaWNrZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5vcGVuKCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHdhdGNoU3RhdGVDaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0RGlzYWJsZWQgPSB0aGlzLmR0UGlja2VyICYmIHRoaXMuZHRQaWNrZXIuZHRJbnB1dCA/XHJcbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIuZHRJbnB1dC5kaXNhYmxlZENoYW5nZSA6IG9ic2VydmFibGVPZigpO1xyXG5cclxuICAgICAgICBjb25zdCBwaWNrZXJEaXNhYmxlZCA9IHRoaXMuZHRQaWNrZXIgP1xyXG4gICAgICAgICAgICB0aGlzLmR0UGlja2VyLmRpc2FibGVkQ2hhbmdlIDogb2JzZXJ2YWJsZU9mKCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzID0gbWVyZ2UocGlja2VyRGlzYWJsZWQsIGlucHV0RGlzYWJsZWQpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19