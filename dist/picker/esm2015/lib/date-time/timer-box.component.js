/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * timer-box.component
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
export class OwlTimerBoxComponent {
    constructor() {
        this.showDivider = false;
        this.step = 1;
        this.debounceTime = 500;
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.inputStream = new Subject();
        this.inputStreamSub = Subscription.EMPTY;
    }
    /**
     * @return {?}
     */
    get displayValue() {
        return this.boxValue || this.value;
    }
    /**
     * @return {?}
     */
    get owlDTTimerBoxClass() {
        return true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.inputStreamSub = this.inputStream.pipe(debounceTime(this.debounceTime), distinctUntilChanged()).subscribe((/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            if (val) {
                /** @type {?} */
                const inputValue = coerceNumberProperty(val, 0);
                this.updateValueViaInput(inputValue);
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.inputStreamSub.unsubscribe();
    }
    /**
     * @return {?}
     */
    upBtnClicked() {
        this.updateValue(this.value + this.step);
    }
    /**
     * @return {?}
     */
    downBtnClicked() {
        this.updateValue(this.value - this.step);
    }
    /**
     * @param {?} val
     * @return {?}
     */
    handleInputChange(val) {
        this.inputStream.next(val);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    updateValue(value) {
        this.valueChange.emit(value);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    updateValueViaInput(value) {
        if (value > this.max || value < this.min) {
            return;
        }
        this.inputChange.emit(value);
    }
}
OwlTimerBoxComponent.decorators = [
    { type: Component, args: [{
                exportAs: 'owlDateTimeTimerBox',
                selector: 'owl-date-time-timer-box',
                template: "<div *ngIf=\"showDivider\" class=\"owl-dt-timer-divider\" aria-hidden=\"true\"></div>\r\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\r\n        type=\"button\" tabindex=\"-1\"\r\n        [disabled]=\"upBtnDisabled\"\r\n        [attr.aria-label]=\"upBtnAriaLabel\"\r\n        (click)=\"upBtnClicked()\">\r\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n        <!-- <editor-fold desc=\"SVG Arrow Up\"> -->\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\r\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\r\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\r\n                 width=\"100%\" height=\"100%\">\r\n                    <path d=\"M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0\r\n                        L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4\r\n                        c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z\"/>\r\n                </svg>\r\n        <!-- </editor-fold> -->\r\n    </span>\r\n</button>\r\n<label class=\"owl-dt-timer-content\">\r\n    <input class=\"owl-dt-timer-input\" maxlength=\"2\"\r\n           [value]=\"displayValue | numberFixedLen : 2\"\r\n           (focus)=\"valueInput.select()\"\r\n           (input)=\"handleInputChange(valueInput.value)\" #valueInput>\r\n    <span class=\"owl-hidden-accessible\">{{inputLabel}}</span>\r\n</label>\r\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\r\n        type=\"button\" tabindex=\"-1\"\r\n        [disabled]=\"downBtnDisabled\"\r\n        [attr.aria-label]=\"downBtnAriaLabel\"\r\n        (click)=\"downBtnClicked()\">\r\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n        <!-- <editor-fold desc=\"SVG Arrow Down\"> -->\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\r\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\r\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\r\n                 width=\"100%\" height=\"100%\">\r\n                    <path d=\"M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751\r\n                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0\r\n                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z\"/>\r\n                </svg>\r\n        <!-- </editor-fold> -->\r\n    </span>\r\n</button>\r\n",
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    '[class.owl-dt-timer-box]': 'owlDTTimerBoxClass'
                },
                styles: [""]
            }] }
];
/** @nocollapse */
OwlTimerBoxComponent.ctorParameters = () => [];
OwlTimerBoxComponent.propDecorators = {
    showDivider: [{ type: Input }],
    upBtnAriaLabel: [{ type: Input }],
    upBtnDisabled: [{ type: Input }],
    downBtnAriaLabel: [{ type: Input }],
    downBtnDisabled: [{ type: Input }],
    boxValue: [{ type: Input }],
    value: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    step: [{ type: Input }],
    inputLabel: [{ type: Input }],
    debounceTime: [{ type: Input }],
    valueChange: [{ type: Output }],
    inputChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    OwlTimerBoxComponent.prototype.showDivider;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.upBtnAriaLabel;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.upBtnDisabled;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.downBtnAriaLabel;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.downBtnDisabled;
    /**
     * Value would be displayed in the box
     * If it is null, the box would display [value]
     *
     * @type {?}
     */
    OwlTimerBoxComponent.prototype.boxValue;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.value;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.min;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.max;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.step;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.inputLabel;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.debounceTime;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.valueChange;
    /** @type {?} */
    OwlTimerBoxComponent.prototype.inputChange;
    /**
     * @type {?}
     * @private
     */
    OwlTimerBoxComponent.prototype.inputStream;
    /**
     * @type {?}
     * @private
     */
    OwlTimerBoxComponent.prototype.inputStreamSub;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL3RpbWVyLWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWNwRSxNQUFNLE9BQU8sb0JBQW9CO0lBOEM3QjtRQTVDUyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQXNCcEIsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUlULGlCQUFZLEdBQVcsR0FBRyxDQUFDO1FBRTFCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUV6QyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFM0MsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBRXBDLG1CQUFjLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQVc1QyxDQUFDOzs7O0lBVEQsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELElBQUksa0JBQWtCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFLTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDdkMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFDL0Isb0JBQW9CLEVBQUUsQ0FDekIsQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBRSxHQUFXLEVBQUcsRUFBRTtZQUMxQixJQUFJLEdBQUcsRUFBRTs7c0JBQ0MsVUFBVSxHQUFHLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN4QztRQUNMLENBQUMsRUFBQyxDQUFBO0lBQ04sQ0FBQzs7OztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFTSxZQUFZO1FBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7O0lBRU0sY0FBYztRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBRU0saUJBQWlCLENBQUUsR0FBVztRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7Ozs7SUFFTyxXQUFXLENBQUUsS0FBYTtRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUFFTyxtQkFBbUIsQ0FBRSxLQUFhO1FBQ3RDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdEMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7O1lBbEdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxpeUZBQXlDO2dCQUV6QyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsSUFBSSxFQUFFO29CQUNGLDBCQUEwQixFQUFFLG9CQUFvQjtpQkFDbkQ7O2FBQ0o7Ozs7OzBCQUlJLEtBQUs7NkJBRUwsS0FBSzs0QkFFTCxLQUFLOytCQUVMLEtBQUs7OEJBRUwsS0FBSzt1QkFNTCxLQUFLO29CQUVMLEtBQUs7a0JBRUwsS0FBSztrQkFFTCxLQUFLO21CQUVMLEtBQUs7eUJBRUwsS0FBSzsyQkFFTCxLQUFLOzBCQUVMLE1BQU07MEJBRU4sTUFBTTs7OztJQTlCUCwyQ0FBNkI7O0lBRTdCLDhDQUFnQzs7SUFFaEMsNkNBQWdDOztJQUVoQyxnREFBa0M7O0lBRWxDLCtDQUFrQzs7Ozs7OztJQU1sQyx3Q0FBMEI7O0lBRTFCLHFDQUF1Qjs7SUFFdkIsbUNBQXFCOztJQUVyQixtQ0FBcUI7O0lBRXJCLG9DQUFrQjs7SUFFbEIsMENBQTRCOztJQUU1Qiw0Q0FBb0M7O0lBRXBDLDJDQUFtRDs7SUFFbkQsMkNBQW1EOzs7OztJQUVuRCwyQ0FBNEM7Ozs7O0lBRTVDLDhDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiB0aW1lci1ib3guY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgZXhwb3J0QXM6ICdvd2xEYXRlVGltZVRpbWVyQm94JyxcclxuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS10aW1lci1ib3gnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWVyLWJveC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi90aW1lci1ib3guY29tcG9uZW50LnNjc3MnXSxcclxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtdGltZXItYm94XSc6ICdvd2xEVFRpbWVyQm94Q2xhc3MnXHJcbiAgICB9XHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgT3dsVGltZXJCb3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgc2hvd0RpdmlkZXIgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoKSB1cEJ0bkFyaWFMYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHVwQnRuRGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgZG93bkJ0bkFyaWFMYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGRvd25CdG5EaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFZhbHVlIHdvdWxkIGJlIGRpc3BsYXllZCBpbiB0aGUgYm94XHJcbiAgICAgKiBJZiBpdCBpcyBudWxsLCB0aGUgYm94IHdvdWxkIGRpc3BsYXkgW3ZhbHVlXVxyXG4gICAgICogKi9cclxuICAgIEBJbnB1dCgpIGJveFZhbHVlOiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KCkgdmFsdWU6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBtaW46IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBtYXg6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoKSBzdGVwID0gMTtcclxuXHJcbiAgICBASW5wdXQoKSBpbnB1dExhYmVsOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgZGVib3VuY2VUaW1lOiBudW1iZXIgPSA1MDA7XHJcblxyXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcblxyXG4gICAgQE91dHB1dCgpIGlucHV0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnB1dFN0cmVhbSA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcclxuXHJcbiAgICBwcml2YXRlIGlucHV0U3RyZWFtU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xyXG5cclxuICAgIGdldCBkaXNwbGF5VmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ib3hWYWx1ZSB8fCB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xEVFRpbWVyQm94Q2xhc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRTdHJlYW1TdWIgPSB0aGlzLmlucHV0U3RyZWFtLnBpcGUoXHJcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSh0aGlzLmRlYm91bmNlVGltZSksXHJcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcclxuICAgICAgICApLnN1YnNjcmliZSgoIHZhbDogc3RyaW5nICkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dFZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLCAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWVWaWFJbnB1dChpbnB1dFZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5wdXRTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBCdG5DbGlja2VkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy52YWx1ZSArIHRoaXMuc3RlcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRvd25CdG5DbGlja2VkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUodGhpcy52YWx1ZSAtIHRoaXMuc3RlcCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhbmRsZUlucHV0Q2hhbmdlKCB2YWw6IHN0cmluZyApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlucHV0U3RyZWFtLm5leHQodmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVZhbHVlKCB2YWx1ZTogbnVtYmVyICk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZVZpYUlucHV0KCB2YWx1ZTogbnVtYmVyICk6IHZvaWQge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+IHRoaXMubWF4IHx8IHZhbHVlIDwgdGhpcy5taW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==