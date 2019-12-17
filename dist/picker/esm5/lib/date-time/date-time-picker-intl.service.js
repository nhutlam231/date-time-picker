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
var OwlDateTimeIntl = /** @class */ (function () {
    function OwlDateTimeIntl() {
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
    OwlDateTimeIntl.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */ OwlDateTimeIntl.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function OwlDateTimeIntl_Factory() { return new OwlDateTimeIntl(); }, token: OwlDateTimeIntl, providedIn: "root" });
    return OwlDateTimeIntl;
}());
export { OwlDateTimeIntl };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUUvQjtJQUFBOzs7OztRQU9hLFlBQU8sR0FBa0IsSUFBSSxPQUFPLEVBQVEsQ0FBQzs7OztRQUd0RCxrQkFBYSxHQUFHLGNBQWMsQ0FBQzs7OztRQUcvQixvQkFBZSxHQUFHLGdCQUFnQixDQUFDOzs7O1FBR25DLGtCQUFhLEdBQUcsY0FBYyxDQUFDOzs7O1FBRy9CLG9CQUFlLEdBQUcsZ0JBQWdCLENBQUM7Ozs7UUFHbkMsZ0JBQVcsR0FBRyxZQUFZLENBQUM7Ozs7UUFHM0Isa0JBQWEsR0FBRyxjQUFjLENBQUM7Ozs7UUFHL0IsbUJBQWMsR0FBRyxnQkFBZ0IsQ0FBQzs7OztRQUdsQyxtQkFBYyxHQUFHLFlBQVksQ0FBQzs7OztRQUc5QixrQkFBYSxHQUFHLGVBQWUsQ0FBQzs7OztRQUdoQyxrQkFBYSxHQUFHLFdBQVcsQ0FBQzs7OztRQUc1Qix1QkFBa0IsR0FBVyxtQkFBbUIsQ0FBQzs7OztRQUdqRCx1QkFBa0IsR0FBVyxlQUFlLENBQUM7Ozs7UUFHN0MsMkJBQXNCLEdBQUcsc0JBQXNCLENBQUM7Ozs7UUFHaEQsK0JBQTBCLEdBQVcsdUJBQXVCLENBQUM7Ozs7UUFHN0QsbUJBQWMsR0FBRyxRQUFRLENBQUM7Ozs7UUFHMUIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7Ozs7UUFHcEIsbUJBQWMsR0FBRyxNQUFNLENBQUM7Ozs7UUFHeEIsaUJBQVksR0FBRyxJQUFJLENBQUM7Ozs7UUFHcEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7Ozs7UUFHckIsa0JBQWEsR0FBRyxJQUFJLENBQUM7S0FDeEI7O2dCQXBFQSxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7MEJBUGhDO0NBMkVDLEFBcEVELElBb0VDO1NBbkVZLGVBQWU7Ozs7Ozs7SUFNeEIsa0NBQXNEOzs7OztJQUd0RCx3Q0FBK0I7Ozs7O0lBRy9CLDBDQUFtQzs7Ozs7SUFHbkMsd0NBQStCOzs7OztJQUcvQiwwQ0FBbUM7Ozs7O0lBR25DLHNDQUEyQjs7Ozs7SUFHM0Isd0NBQStCOzs7OztJQUcvQix5Q0FBa0M7Ozs7O0lBR2xDLHlDQUE4Qjs7Ozs7SUFHOUIsd0NBQWdDOzs7OztJQUdoQyx3Q0FBNEI7Ozs7O0lBRzVCLDZDQUFpRDs7Ozs7SUFHakQsNkNBQTZDOzs7OztJQUc3QyxpREFBZ0Q7Ozs7O0lBR2hELHFEQUE2RDs7Ozs7SUFHN0QseUNBQTBCOzs7OztJQUcxQixzQ0FBb0I7Ozs7O0lBR3BCLHlDQUF3Qjs7Ozs7SUFHeEIsdUNBQW9COzs7OztJQUdwQix3Q0FBcUI7Ozs7O0lBR3JCLHdDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBkYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZUludGwge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbmV2ZXIgdGhlIGxhYmVscyBoZXJlIGFyZSBjaGFuZ2VkLiBVc2UgdGhpcyB0byBub3RpZnlcclxuICAgICAqIGNvbXBvbmVudHMgaWYgdGhlIGxhYmVscyBoYXZlIGNoYW5nZWQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IGNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgdXAgc2Vjb25kIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICAqL1xyXG4gICAgdXBTZWNvbmRMYWJlbCA9ICdBZGQgYSBzZWNvbmQnO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgZG93biBzZWNvbmQgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gICovXHJcbiAgICBkb3duU2Vjb25kTGFiZWwgPSAnTWludXMgYSBzZWNvbmQnO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgdXAgbWludXRlIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICAqL1xyXG4gICAgdXBNaW51dGVMYWJlbCA9ICdBZGQgYSBtaW51dGUnO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgZG93biBtaW51dGUgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gICovXHJcbiAgICBkb3duTWludXRlTGFiZWwgPSAnTWludXMgYSBtaW51dGUnO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgdXAgaG91ciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAgKi9cclxuICAgIHVwSG91ckxhYmVsID0gJ0FkZCBhIGhvdXInO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgZG93biBob3VyIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICAqL1xyXG4gICAgZG93bkhvdXJMYWJlbCA9ICdNaW51cyBhIGhvdXInO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgbW9udGggYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICAgIHByZXZNb250aExhYmVsID0gJ1ByZXZpb3VzIG1vbnRoJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIG5leHQgbW9udGggYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICAgIG5leHRNb250aExhYmVsID0gJ05leHQgbW9udGgnO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgeWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gICAgcHJldlllYXJMYWJlbCA9ICdQcmV2aW91cyB5ZWFyJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIG5leHQgeWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gICAgbmV4dFllYXJMYWJlbCA9ICdOZXh0IHllYXInO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgbXVsdGkteWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gICAgcHJldk11bHRpWWVhckxhYmVsOiBzdHJpbmcgPSAnUHJldmlvdXMgMjEgeWVhcnMnO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgbmV4dCBtdWx0aS15ZWFyIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgICBuZXh0TXVsdGlZZWFyTGFiZWw6IHN0cmluZyA9ICdOZXh0IDIxIHllYXJzJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlICdzd2l0Y2ggdG8gbW9udGggdmlldycgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICAgIHN3aXRjaFRvTW9udGhWaWV3TGFiZWwgPSAnQ2hhbmdlIHRvIG1vbnRoIHZpZXcnO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N3aXRjaCB0byB5ZWFyIHZpZXcnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgICBzd2l0Y2hUb011bHRpWWVhclZpZXdMYWJlbDogc3RyaW5nID0gJ0Nob29zZSBtb250aCBhbmQgeWVhcic7XHJcblxyXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSBjYW5jZWwgYnV0dG9uICovXHJcbiAgICBjYW5jZWxCdG5MYWJlbCA9ICdDYW5jZWwnO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgc2V0IGJ1dHRvbiAqL1xyXG4gICAgc2V0QnRuTGFiZWwgPSAnU2V0JztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIHJhbmdlICdmcm9tJyBpbiBwaWNrZXIgaW5mbyAqL1xyXG4gICAgcmFuZ2VGcm9tTGFiZWwgPSAnRnJvbSc7XHJcblxyXG4gICAgLyoqIEEgbGFiZWwgZm9yIHRoZSByYW5nZSAndG8nIGluIHBpY2tlciBpbmZvICovXHJcbiAgICByYW5nZVRvTGFiZWwgPSAnVG8nO1xyXG5cclxuICAgIC8qKiBBIGxhYmVsIGZvciB0aGUgaG91cjEyIGJ1dHRvbiAoQU0pICovXHJcbiAgICBob3VyMTJBTUxhYmVsID0gJ0FNJztcclxuXHJcbiAgICAvKiogQSBsYWJlbCBmb3IgdGhlIGhvdXIxMiBidXR0b24gKFBNKSAqL1xyXG4gICAgaG91cjEyUE1MYWJlbCA9ICdQTSc7XHJcbn1cclxuIl19