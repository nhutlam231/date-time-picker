/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker-intl.service
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class OwlDateTimeIntl {
    constructor() {
        /**
         * Stream that emits whenever the labels here are changed. Use this to notify
         * components if the labels have changed after initialization.
         */
        this.changes = new Subject();
        /**
         * A label for the up second button (used by screen readers).
         */
        this.upSecondLabel = 'Add a second';
        /**
         * A label for the down second button (used by screen readers).
         */
        this.downSecondLabel = 'Minus a second';
        /**
         * A label for the up minute button (used by screen readers).
         */
        this.upMinuteLabel = 'Add a minute';
        /**
         * A label for the down minute button (used by screen readers).
         */
        this.downMinuteLabel = 'Minus a minute';
        /**
         * A label for the up hour button (used by screen readers).
         */
        this.upHourLabel = 'Add a hour';
        /**
         * A label for the down hour button (used by screen readers).
         */
        this.downHourLabel = 'Minus a hour';
        /**
         * A label for the previous month button (used by screen readers).
         */
        this.prevMonthLabel = 'Previous month';
        /**
         * A label for the next month button (used by screen readers).
         */
        this.nextMonthLabel = 'Next month';
        /**
         * A label for the previous year button (used by screen readers).
         */
        this.prevYearLabel = 'Previous year';
        /**
         * A label for the next year button (used by screen readers).
         */
        this.nextYearLabel = 'Next year';
        /**
         * A label for the previous multi-year button (used by screen readers).
         */
        this.prevMultiYearLabel = 'Previous 21 years';
        /**
         * A label for the next multi-year button (used by screen readers).
         */
        this.nextMultiYearLabel = 'Next 21 years';
        /**
         * A label for the 'switch to month view' button (used by screen readers).
         */
        this.switchToMonthViewLabel = 'Change to month view';
        /**
         * A label for the 'switch to year view' button (used by screen readers).
         */
        this.switchToMultiYearViewLabel = 'Choose month and year';
        /**
         * A label for the cancel button
         */
        this.cancelBtnLabel = 'Cancel';
        /**
         * A label for the set button
         */
        this.setBtnLabel = 'Set';
        /**
         * A label for the range 'from' in picker info
         */
        this.rangeFromLabel = 'From';
        /**
         * A label for the range 'to' in picker info
         */
        this.rangeToLabel = 'To';
        /**
         * A label for the hour12 button (AM)
         */
        this.hour12AMLabel = 'AM';
        /**
         * A label for the hour12 button (PM)
         */
        this.hour12PMLabel = 'PM';
    }
}
OwlDateTimeIntl.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ OwlDateTimeIntl.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function OwlDateTimeIntl_Factory() { return new OwlDateTimeIntl(); }, token: OwlDateTimeIntl, providedIn: "root" });
if (false) {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     * @type {?}
     */
    OwlDateTimeIntl.prototype.changes;
    /**
     * A label for the up second button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.upSecondLabel;
    /**
     * A label for the down second button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.downSecondLabel;
    /**
     * A label for the up minute button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.upMinuteLabel;
    /**
     * A label for the down minute button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.downMinuteLabel;
    /**
     * A label for the up hour button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.upHourLabel;
    /**
     * A label for the down hour button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.downHourLabel;
    /**
     * A label for the previous month button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.prevMonthLabel;
    /**
     * A label for the next month button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.nextMonthLabel;
    /**
     * A label for the previous year button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.prevYearLabel;
    /**
     * A label for the next year button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.nextYearLabel;
    /**
     * A label for the previous multi-year button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.prevMultiYearLabel;
    /**
     * A label for the next multi-year button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.nextMultiYearLabel;
    /**
     * A label for the 'switch to month view' button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.switchToMonthViewLabel;
    /**
     * A label for the 'switch to year view' button (used by screen readers).
     * @type {?}
     */
    OwlDateTimeIntl.prototype.switchToMultiYearViewLabel;
    /**
     * A label for the cancel button
     * @type {?}
     */
    OwlDateTimeIntl.prototype.cancelBtnLabel;
    /**
     * A label for the set button
     * @type {?}
     */
    OwlDateTimeIntl.prototype.setBtnLabel;
    /**
     * A label for the range 'from' in picker info
     * @type {?}
     */
    OwlDateTimeIntl.prototype.rangeFromLabel;
    /**
     * A label for the range 'to' in picker info
     * @type {?}
     */
    OwlDateTimeIntl.prototype.rangeToLabel;
    /**
     * A label for the hour12 button (AM)
     * @type {?}
     */
    OwlDateTimeIntl.prototype.hour12AMLabel;
    /**
     * A label for the hour12 button (PM)
     * @type {?}
     */
    OwlDateTimeIntl.prototype.hour12PMLabel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUcvQixNQUFNLE9BQU8sZUFBZTtJQUQ1Qjs7Ozs7UUFPYSxZQUFPLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7Ozs7UUFHdEQsa0JBQWEsR0FBRyxjQUFjLENBQUM7Ozs7UUFHL0Isb0JBQWUsR0FBRyxnQkFBZ0IsQ0FBQzs7OztRQUduQyxrQkFBYSxHQUFHLGNBQWMsQ0FBQzs7OztRQUcvQixvQkFBZSxHQUFHLGdCQUFnQixDQUFDOzs7O1FBR25DLGdCQUFXLEdBQUcsWUFBWSxDQUFDOzs7O1FBRzNCLGtCQUFhLEdBQUcsY0FBYyxDQUFDOzs7O1FBRy9CLG1CQUFjLEdBQUcsZ0JBQWdCLENBQUM7Ozs7UUFHbEMsbUJBQWMsR0FBRyxZQUFZLENBQUM7Ozs7UUFHOUIsa0JBQWEsR0FBRyxlQUFlLENBQUM7Ozs7UUFHaEMsa0JBQWEsR0FBRyxXQUFXLENBQUM7Ozs7UUFHNUIsdUJBQWtCLEdBQVcsbUJBQW1CLENBQUM7Ozs7UUFHakQsdUJBQWtCLEdBQVcsZUFBZSxDQUFDOzs7O1FBRzdDLDJCQUFzQixHQUFHLHNCQUFzQixDQUFDOzs7O1FBR2hELCtCQUEwQixHQUFXLHVCQUF1QixDQUFDOzs7O1FBRzdELG1CQUFjLEdBQUcsUUFBUSxDQUFDOzs7O1FBRzFCLGdCQUFXLEdBQUcsS0FBSyxDQUFDOzs7O1FBR3BCLG1CQUFjLEdBQUcsTUFBTSxDQUFDOzs7O1FBR3hCLGlCQUFZLEdBQUcsSUFBSSxDQUFDOzs7O1FBR3BCLGtCQUFhLEdBQUcsSUFBSSxDQUFDOzs7O1FBR3JCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO0tBQ3hCOzs7WUFwRUEsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7Ozs7Ozs7O0lBTzVCLGtDQUFzRDs7Ozs7SUFHdEQsd0NBQStCOzs7OztJQUcvQiwwQ0FBbUM7Ozs7O0lBR25DLHdDQUErQjs7Ozs7SUFHL0IsMENBQW1DOzs7OztJQUduQyxzQ0FBMkI7Ozs7O0lBRzNCLHdDQUErQjs7Ozs7SUFHL0IseUNBQWtDOzs7OztJQUdsQyx5Q0FBOEI7Ozs7O0lBRzlCLHdDQUFnQzs7Ozs7SUFHaEMsd0NBQTRCOzs7OztJQUc1Qiw2Q0FBaUQ7Ozs7O0lBR2pELDZDQUE2Qzs7Ozs7SUFHN0MsaURBQWdEOzs7OztJQUdoRCxxREFBNkQ7Ozs7O0lBRzdELHlDQUEwQjs7Ozs7SUFHMUIsc0NBQW9COzs7OztJQUdwQix5Q0FBd0I7Ozs7O0lBR3hCLHVDQUFvQjs7Ozs7SUFHcEIsd0NBQXFCOzs7OztJQUdyQix3Q0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVJbnRsIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBsYWJlbHMgaGVyZSBhcmUgY2hhbmdlZC4gVXNlIHRoaXMgdG8gbm90aWZ5XHJcbiAgICAgKiBjb21wb25lbnRzIGlmIHRoZSBsYWJlbHMgaGF2ZSBjaGFuZ2VkIGFmdGVyIGluaXRpYWxpemF0aW9uLlxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBjaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIHVwIHNlY29uZCBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAgKi9cclxuICAgIHVwU2Vjb25kTGFiZWwgPSAnQWRkIGEgc2Vjb25kJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIGRvd24gc2Vjb25kIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICAqL1xyXG4gICAgZG93blNlY29uZExhYmVsID0gJ01pbnVzIGEgc2Vjb25kJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIHVwIG1pbnV0ZSBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAgKi9cclxuICAgIHVwTWludXRlTGFiZWwgPSAnQWRkIGEgbWludXRlJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIGRvd24gbWludXRlIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICAqL1xyXG4gICAgZG93bk1pbnV0ZUxhYmVsID0gJ01pbnVzIGEgbWludXRlJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIHVwIGhvdXIgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gICovXHJcbiAgICB1cEhvdXJMYWJlbCA9ICdBZGQgYSBob3VyJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIGRvd24gaG91ciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAgKi9cclxuICAgIGRvd25Ib3VyTGFiZWwgPSAnTWludXMgYSBob3VyJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIHByZXZpb3VzIG1vbnRoIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgICBwcmV2TW9udGhMYWJlbCA9ICdQcmV2aW91cyBtb250aCc7XHJcblxyXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSBuZXh0IG1vbnRoIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgICBuZXh0TW9udGhMYWJlbCA9ICdOZXh0IG1vbnRoJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIHByZXZpb3VzIHllYXIgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICAgIHByZXZZZWFyTGFiZWwgPSAnUHJldmlvdXMgeWVhcic7XHJcblxyXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSBuZXh0IHllYXIgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICAgIG5leHRZZWFyTGFiZWwgPSAnTmV4dCB5ZWFyJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIHByZXZpb3VzIG11bHRpLXllYXIgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICAgIHByZXZNdWx0aVllYXJMYWJlbDogc3RyaW5nID0gJ1ByZXZpb3VzIDIxIHllYXJzJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIG5leHQgbXVsdGkteWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gICAgbmV4dE11bHRpWWVhckxhYmVsOiBzdHJpbmcgPSAnTmV4dCAyMSB5ZWFycyc7XHJcblxyXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSAnc3dpdGNoIHRvIG1vbnRoIHZpZXcnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgICBzd2l0Y2hUb01vbnRoVmlld0xhYmVsID0gJ0NoYW5nZSB0byBtb250aCB2aWV3JztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlICdzd2l0Y2ggdG8geWVhciB2aWV3JyBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gICAgc3dpdGNoVG9NdWx0aVllYXJWaWV3TGFiZWw6IHN0cmluZyA9ICdDaG9vc2UgbW9udGggYW5kIHllYXInO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgY2FuY2VsIGJ1dHRvbiAqL1xyXG4gICAgY2FuY2VsQnRuTGFiZWwgPSAnQ2FuY2VsJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIHNldCBidXR0b24gKi9cclxuICAgIHNldEJ0bkxhYmVsID0gJ1NldCc7XHJcblxyXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSByYW5nZSAnZnJvbScgaW4gcGlja2VyIGluZm8gKi9cclxuICAgIHJhbmdlRnJvbUxhYmVsID0gJ0Zyb20nO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgcmFuZ2UgJ3RvJyBpbiBwaWNrZXIgaW5mbyAqL1xyXG4gICAgcmFuZ2VUb0xhYmVsID0gJ1RvJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIGhvdXIxMiBidXR0b24gKEFNKSAqL1xyXG4gICAgaG91cjEyQU1MYWJlbCA9ICdBTSc7XHJcblxyXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSBob3VyMTIgYnV0dG9uIChQTSkgKi9cclxuICAgIGhvdXIxMlBNTGFiZWwgPSAnUE0nO1xyXG59XHJcbiJdfQ==