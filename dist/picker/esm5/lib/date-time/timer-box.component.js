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
var OwlTimerBoxComponent = /** @class */ (function () {
    function OwlTimerBoxComponent() {
        this.showDivider = false;
        this.step = 1;
        this.debounceTime = 500;
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.inputStream = new Subject();
        this.inputStreamSub = Subscription.EMPTY;
    }
    Object.defineProperty(OwlTimerBoxComponent.prototype, "displayValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.boxValue || this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerBoxComponent.prototype, "owlDTTimerBoxClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.inputStreamSub = this.inputStream.pipe(debounceTime(this.debounceTime), distinctUntilChanged()).subscribe((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val) {
                /** @type {?} */
                var inputValue = coerceNumberProperty(val, 0);
                _this.updateValueViaInput(inputValue);
            }
        }));
    };
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.inputStreamSub.unsubscribe();
    };
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.upBtnClicked = /**
     * @return {?}
     */
    function () {
        this.updateValue(this.value + this.step);
    };
    /**
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.downBtnClicked = /**
     * @return {?}
     */
    function () {
        this.updateValue(this.value - this.step);
    };
    /**
     * @param {?} val
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.handleInputChange = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.inputStream.next(val);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.updateValue = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.valueChange.emit(value);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    OwlTimerBoxComponent.prototype.updateValueViaInput = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value > this.max || value < this.min) {
            return;
        }
        this.inputChange.emit(value);
    };
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
    OwlTimerBoxComponent.ctorParameters = function () { return []; };
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
    return OwlTimerBoxComponent;
}());
export { OwlTimerBoxComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXItYm94LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL3RpbWVyLWJveC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwRTtJQTBESTtRQTVDUyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQXNCcEIsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUlULGlCQUFZLEdBQVcsR0FBRyxDQUFDO1FBRTFCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUV6QyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFM0MsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBRXBDLG1CQUFjLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQVc1QyxDQUFDO0lBVEQsc0JBQUksOENBQVk7Ozs7UUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9EQUFrQjs7OztRQUF0QjtZQUNJLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7OztPQUFBOzs7O0lBS00sdUNBQVE7OztJQUFmO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUN2QyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUMvQixvQkFBb0IsRUFBRSxDQUN6QixDQUFDLFNBQVM7Ozs7UUFBQyxVQUFFLEdBQVc7WUFDckIsSUFBSSxHQUFHLEVBQUU7O29CQUNDLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEM7UUFDTCxDQUFDLEVBQUMsQ0FBQTtJQUNOLENBQUM7Ozs7SUFFTSwwQ0FBVzs7O0lBQWxCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRU0sMkNBQVk7OztJQUFuQjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVNLDZDQUFjOzs7SUFBckI7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBRU0sZ0RBQWlCOzs7O0lBQXhCLFVBQTBCLEdBQVc7UUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBRU8sMENBQVc7Ozs7O0lBQW5CLFVBQXFCLEtBQWE7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7O0lBRU8sa0RBQW1COzs7OztJQUEzQixVQUE2QixLQUFhO1FBQ3RDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDdEMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Z0JBbEdKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxpeUZBQXlDO29CQUV6QyxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsSUFBSSxFQUFFO3dCQUNGLDBCQUEwQixFQUFFLG9CQUFvQjtxQkFDbkQ7O2lCQUNKOzs7Ozs4QkFJSSxLQUFLO2lDQUVMLEtBQUs7Z0NBRUwsS0FBSzttQ0FFTCxLQUFLO2tDQUVMLEtBQUs7MkJBTUwsS0FBSzt3QkFFTCxLQUFLO3NCQUVMLEtBQUs7c0JBRUwsS0FBSzt1QkFFTCxLQUFLOzZCQUVMLEtBQUs7K0JBRUwsS0FBSzs4QkFFTCxNQUFNOzhCQUVOLE1BQU07O0lBdURYLDJCQUFDO0NBQUEsQUFuR0QsSUFtR0M7U0F2Rlksb0JBQW9COzs7SUFFN0IsMkNBQTZCOztJQUU3Qiw4Q0FBZ0M7O0lBRWhDLDZDQUFnQzs7SUFFaEMsZ0RBQWtDOztJQUVsQywrQ0FBa0M7Ozs7Ozs7SUFNbEMsd0NBQTBCOztJQUUxQixxQ0FBdUI7O0lBRXZCLG1DQUFxQjs7SUFFckIsbUNBQXFCOztJQUVyQixvQ0FBa0I7O0lBRWxCLDBDQUE0Qjs7SUFFNUIsNENBQW9DOztJQUVwQywyQ0FBbUQ7O0lBRW5ELDJDQUFtRDs7Ozs7SUFFbkQsMkNBQTRDOzs7OztJQUU1Qyw4Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogdGltZXItYm94LmNvbXBvbmVudFxyXG4gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIElucHV0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVUaW1lckJveCcsXHJcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUtdGltZXItYm94JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi90aW1lci1ib3guY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vdGltZXItYm94LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LXRpbWVyLWJveF0nOiAnb3dsRFRUaW1lckJveENsYXNzJ1xyXG4gICAgfVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE93bFRpbWVyQm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIHNob3dEaXZpZGVyID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KCkgdXBCdG5BcmlhTGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB1cEJ0bkRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGRvd25CdG5BcmlhTGFiZWw6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBkb3duQnRuRGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWx1ZSB3b3VsZCBiZSBkaXNwbGF5ZWQgaW4gdGhlIGJveFxyXG4gICAgICogSWYgaXQgaXMgbnVsbCwgdGhlIGJveCB3b3VsZCBkaXNwbGF5IFt2YWx1ZV1cclxuICAgICAqICovXHJcbiAgICBASW5wdXQoKSBib3hWYWx1ZTogbnVtYmVyO1xyXG5cclxuICAgIEBJbnB1dCgpIHZhbHVlOiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KCkgbWluOiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KCkgbWF4OiBudW1iZXI7XHJcblxyXG4gICAgQElucHV0KCkgc3RlcCA9IDE7XHJcblxyXG4gICAgQElucHV0KCkgaW5wdXRMYWJlbDogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIGRlYm91bmNlVGltZTogbnVtYmVyID0gNTAwO1xyXG5cclxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICAgIEBPdXRwdXQoKSBpbnB1dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICAgIHByaXZhdGUgaW5wdXRTdHJlYW0gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBpbnB1dFN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgICBnZXQgZGlzcGxheVZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm94VmFsdWUgfHwgdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsRFRUaW1lckJveENsYXNzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmlucHV0U3RyZWFtU3ViID0gdGhpcy5pbnB1dFN0cmVhbS5waXBlKFxyXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUodGhpcy5kZWJvdW5jZVRpbWUpLFxyXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXHJcbiAgICAgICAgKS5zdWJzY3JpYmUoKCB2YWw6IHN0cmluZyApID0+IHtcclxuICAgICAgICAgICAgaWYgKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbCwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlVmlhSW5wdXQoaW5wdXRWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlucHV0U3RyZWFtU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwQnRuQ2xpY2tlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMudmFsdWUgKyB0aGlzLnN0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb3duQnRuQ2xpY2tlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKHRoaXMudmFsdWUgLSB0aGlzLnN0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVJbnB1dENoYW5nZSggdmFsOiBzdHJpbmcgKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbnB1dFN0cmVhbS5uZXh0KHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZSggdmFsdWU6IG51bWJlciApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlVmFsdWVWaWFJbnB1dCggdmFsdWU6IG51bWJlciApOiB2b2lkIHtcclxuICAgICAgICBpZiAodmFsdWUgPiB0aGlzLm1heCB8fCB2YWx1ZSA8IHRoaXMubWluKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnB1dENoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIH1cclxufVxyXG4iXX0=