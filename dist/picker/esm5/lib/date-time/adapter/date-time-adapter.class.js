/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-adapter.class
 */
import { Subject } from 'rxjs';
import { inject, InjectionToken, LOCALE_ID } from '@angular/core';
/**
 * InjectionToken for date time picker that can be used to override default locale code.
 * @type {?}
 */
export var OWL_DATE_TIME_LOCALE = new InjectionToken('OWL_DATE_TIME_LOCALE', {
    providedIn: 'root',
    factory: OWL_DATE_TIME_LOCALE_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
export function OWL_DATE_TIME_LOCALE_FACTORY() {
    return inject(LOCALE_ID);
}
/**
 * Provider for OWL_DATE_TIME_LOCALE injection token.
 * @type {?}
 */
export var OWL_DATE_TIME_LOCALE_PROVIDER = {
    provide: OWL_DATE_TIME_LOCALE,
    useExisting: LOCALE_ID
};
/**
 * @abstract
 * @template T
 */
var /**
 * @abstract
 * @template T
 */
DateTimeAdapter = /** @class */ (function () {
    function DateTimeAdapter() {
        /**
         * A stream that emits when the locale changes.
         */
        this._localeChanges = new Subject();
        /**
         * total milliseconds in a day.
         */
        this.millisecondsInDay = 86400000;
        /**
         * total milliseconds in a minute.
         */
        this.milliseondsInMinute = 60000;
    }
    Object.defineProperty(DateTimeAdapter.prototype, "localeChanges", {
        get: /**
         * @return {?}
         */
        function () {
            return this._localeChanges;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Compare two given dates
     * 1 if the first date is after the second,
     * -1 if the first date is before the second
     * 0 if dates are equal.
     * */
    /**
     * Compare two given dates
     * 1 if the first date is after the second,
     * -1 if the first date is before the second
     * 0 if dates are equal.
     *
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DateTimeAdapter.prototype.compare = /**
     * Compare two given dates
     * 1 if the first date is after the second,
     * -1 if the first date is before the second
     * 0 if dates are equal.
     *
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first, second) {
        if (!this.isValid(first) || !this.isValid(second)) {
            throw Error('JSNativeDate: Cannot compare invalid dates.');
        }
        /** @type {?} */
        var dateFirst = this.clone(first);
        /** @type {?} */
        var dateSecond = this.clone(second);
        /** @type {?} */
        var diff = this.getTime(dateFirst) - this.getTime(dateSecond);
        if (diff < 0) {
            return -1;
        }
        else if (diff > 0) {
            return 1;
        }
        else {
            // Return 0 if diff is 0; return NaN if diff is NaN
            return diff;
        }
    };
    /**
     * Check if two given dates are in the same year
     * 1 if the first date's year is after the second,
     * -1 if the first date's year is before the second
     * 0 if two given dates are in the same year
     * */
    /**
     * Check if two given dates are in the same year
     * 1 if the first date's year is after the second,
     * -1 if the first date's year is before the second
     * 0 if two given dates are in the same year
     *
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DateTimeAdapter.prototype.compareYear = /**
     * Check if two given dates are in the same year
     * 1 if the first date's year is after the second,
     * -1 if the first date's year is before the second
     * 0 if two given dates are in the same year
     *
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first, second) {
        if (!this.isValid(first) || !this.isValid(second)) {
            throw Error('JSNativeDate: Cannot compare invalid dates.');
        }
        /** @type {?} */
        var yearLeft = this.getYear(first);
        /** @type {?} */
        var yearRight = this.getYear(second);
        /** @type {?} */
        var diff = yearLeft - yearRight;
        if (diff < 0) {
            return -1;
        }
        else if (diff > 0) {
            return 1;
        }
        else {
            return 0;
        }
    };
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     */
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param {?} value
     * @return {?}
     */
    DateTimeAdapter.prototype.deserialize = /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value == null ||
            (this.isDateInstance(value) && this.isValid(value))) {
            return value;
        }
        return this.invalid();
    };
    /**
     * Sets the locale used for all dates.
     */
    /**
     * Sets the locale used for all dates.
     * @param {?} locale
     * @return {?}
     */
    DateTimeAdapter.prototype.setLocale = /**
     * Sets the locale used for all dates.
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        this.locale = locale;
        this._localeChanges.next();
    };
    /**
     * Clamp the given date between min and max dates.
     */
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    DateTimeAdapter.prototype.clampDate = /**
     * Clamp the given date between min and max dates.
     * @param {?} date
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    function (date, min, max) {
        if (min && this.compare(date, min) < 0) {
            return min;
        }
        if (max && this.compare(date, max) > 0) {
            return max;
        }
        return date;
    };
    return DateTimeAdapter;
}());
/**
 * @abstract
 * @template T
 */
export { DateTimeAdapter };
if (false) {
    /**
     * The locale to use for all dates.
     * @type {?}
     * @protected
     */
    DateTimeAdapter.prototype.locale;
    /**
     * A stream that emits when the locale changes.
     * @type {?}
     * @protected
     */
    DateTimeAdapter.prototype._localeChanges;
    /**
     * total milliseconds in a day.
     * @type {?}
     * @protected
     */
    DateTimeAdapter.prototype.millisecondsInDay;
    /**
     * total milliseconds in a minute.
     * @type {?}
     * @protected
     */
    DateTimeAdapter.prototype.milliseondsInMinute;
    /**
     * Get the year of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getYear = function (date) { };
    /**
     * Get the month of the given date
     * 0 -- January
     * 11 -- December
     *
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getMonth = function (date) { };
    /**
     * Get the day of the week of the given date
     * 0 -- Sunday
     * 6 -- Saturday
     *
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getDay = function (date) { };
    /**
     * Get the day num of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getDate = function (date) { };
    /**
     * Get the hours of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getHours = function (date) { };
    /**
     * Get the minutes of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getMinutes = function (date) { };
    /**
     * Get the seconds of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getSeconds = function (date) { };
    /**
     * Get the milliseconds timestamp of the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getTime = function (date) { };
    /**
     * Gets the number of days in the month of the given date.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getNumDaysInMonth = function (date) { };
    /**
     * Get the number of calendar days between the given dates.
     * If dateLeft is before dateRight, it would return positive value
     * If dateLeft is after dateRight, it would return negative value
     * @abstract
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    DateTimeAdapter.prototype.differenceInCalendarDays = function (dateLeft, dateRight) { };
    /**
     * Gets the name for the year of the given date.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.getYearName = function (date) { };
    /**
     * Get a list of month names
     * @abstract
     * @param {?} style
     * @return {?}
     */
    DateTimeAdapter.prototype.getMonthNames = function (style) { };
    /**
     * Get a list of week names
     * @abstract
     * @param {?} style
     * @return {?}
     */
    DateTimeAdapter.prototype.getDayOfWeekNames = function (style) { };
    /**
     * Gets a list of names for the dates of the month.
     * @abstract
     * @return {?}
     */
    DateTimeAdapter.prototype.getDateNames = function () { };
    /**
     * Return a Date object as a string, using the ISO standard
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.toIso8601 = function (date) { };
    /**
     * Check if the give dates are equal
     * @abstract
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    DateTimeAdapter.prototype.isEqual = function (dateLeft, dateRight) { };
    /**
     * Check if the give dates are the same day
     * @abstract
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    DateTimeAdapter.prototype.isSameDay = function (dateLeft, dateRight) { };
    /**
     * Checks whether the given date is valid.
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.isValid = function (date) { };
    /**
     * Gets date instance that is not valid.
     * @abstract
     * @return {?}
     */
    DateTimeAdapter.prototype.invalid = function () { };
    /**
     * Checks whether the given object is considered a date instance by this DateTimeAdapter.
     * @abstract
     * @param {?} obj
     * @return {?}
     */
    DateTimeAdapter.prototype.isDateInstance = function (obj) { };
    /**
     * Add the specified number of years to the given date
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.addCalendarYears = function (date, amount) { };
    /**
     * Add the specified number of months to the given date
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.addCalendarMonths = function (date, amount) { };
    /**
     * Add the specified number of days to the given date
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.addCalendarDays = function (date, amount) { };
    /**
     * Set the hours to the given date.
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.setHours = function (date, amount) { };
    /**
     * Set the minutes to the given date.
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.setMinutes = function (date, amount) { };
    /**
     * Set the seconds to the given date.
     * @abstract
     * @param {?} date
     * @param {?} amount
     * @return {?}
     */
    DateTimeAdapter.prototype.setSeconds = function (date, amount) { };
    /**
     * Creates a date with the given year, month, date, hour, minute and second. Does not allow over/under-flow of the
     * month and date.
     * @abstract
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.createDate = function (year, month, date) { };
    /**
     * @abstract
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @return {?}
     */
    DateTimeAdapter.prototype.createDate = function (year, month, date, hours, minutes, seconds) { };
    /**
     * Clone the given date
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateTimeAdapter.prototype.clone = function (date) { };
    /**
     * Get a new moment
     *
     * @abstract
     * @return {?}
     */
    DateTimeAdapter.prototype.now = function () { };
    /**
     * Formats a date as a string according to the given format.
     * @abstract
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    DateTimeAdapter.prototype.format = function (date, displayFormat) { };
    /**
     * Parse a user-provided value to a Date Object
     * @abstract
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    DateTimeAdapter.prototype.parse = function (value, parseFormat) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFHbEUsTUFBTSxLQUFPLG9CQUFvQixHQUFHLElBQUksY0FBYyxDQUNsRCxzQkFBc0IsRUFDdEI7SUFDSSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsNEJBQTRCO0NBQ3hDLENBQ0o7Ozs7O0FBR0QsTUFBTSxVQUFVLDRCQUE0QjtJQUN4QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QixDQUFDOzs7OztBQUdELE1BQU0sS0FBTyw2QkFBNkIsR0FBRztJQUN6QyxPQUFPLEVBQUUsb0JBQW9CO0lBQzdCLFdBQVcsRUFBRSxTQUFTO0NBQ3pCOzs7OztBQUVEOzs7OztJQUFBOzs7O1FBS2MsbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDOzs7O1FBTTVCLHNCQUFpQixHQUFHLFFBQVEsQ0FBQzs7OztRQUc3Qix3QkFBbUIsR0FBRyxLQUFLLENBQUM7SUFzUW5ELENBQUM7SUE5UUcsc0JBQUksMENBQWE7Ozs7UUFBakI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFrTEQ7Ozs7O1NBS0s7Ozs7Ozs7Ozs7O0lBQ0wsaUNBQU87Ozs7Ozs7Ozs7SUFBUCxVQUFRLEtBQVEsRUFBRSxNQUFTO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FB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QywyREFBcUM7Ozs7Ozs7SUFLckMsMkRBQXFDOzs7Ozs7O0lBS3JDLHdEQUFrQzs7Ozs7OztJQUtsQyxrRUFBNEM7Ozs7Ozs7Ozs7SUFPNUMsd0ZBQXFFOzs7Ozs7O0lBS3JFLDREQUFzQzs7Ozs7OztJQUt0QywrREFBcUU7Ozs7Ozs7SUFLckUsbUVBQXlFOzs7Ozs7SUFLekUseURBQWtDOzs7Ozs7O0lBS2xDLDBEQUFvQzs7Ozs7Ozs7SUFLcEMsdUVBQXFEOzs7Ozs7OztJQUtyRCx5RUFBdUQ7Ozs7Ozs7SUFLdkQsd0RBQW1DOzs7Ozs7SUFLbkMsb0RBQXNCOzs7Ozs7O0lBS3RCLDhEQUEyQzs7Ozs7Ozs7SUFLM0MseUVBQXNEOzs7Ozs7OztJQUt0RCwwRUFBdUQ7Ozs7Ozs7O0lBS3ZELHdFQUFxRDs7Ozs7Ozs7SUFLckQsaUVBQThDOzs7Ozs7OztJQUs5QyxtRUFBZ0Q7Ozs7Ozs7O0lBS2hELG1FQUFnRDs7Ozs7Ozs7OztJQU1oRCx3RUFBa0U7Ozs7Ozs7Ozs7O0lBQ2xFLGlHQU9LOzs7Ozs7O0lBS0wsc0RBQTJCOzs7Ozs7O0lBSzNCLGdEQUFrQjs7Ozs7Ozs7SUFLbEIsc0VBQXFEOzs7Ozs7OztJQUtyRCxvRUFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3NcclxuICovXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgaW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgTE9DQUxFX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKiogSW5qZWN0aW9uVG9rZW4gZm9yIGRhdGUgdGltZSBwaWNrZXIgdGhhdCBjYW4gYmUgdXNlZCB0byBvdmVycmlkZSBkZWZhdWx0IGxvY2FsZSBjb2RlLiAqL1xyXG5leHBvcnQgY29uc3QgT1dMX0RBVEVfVElNRV9MT0NBTEUgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPihcclxuICAgICdPV0xfREFURV9USU1FX0xPQ0FMRScsXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG4gICAgICAgIGZhY3Rvcnk6IE9XTF9EQVRFX1RJTUVfTE9DQUxFX0ZBQ1RPUllcclxuICAgIH1cclxuKTtcclxuXHJcbi8qKiBAZG9jcy1wcml2YXRlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBPV0xfREFURV9USU1FX0xPQ0FMRV9GQUNUT1JZKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gaW5qZWN0KExPQ0FMRV9JRCk7XHJcbn1cclxuXHJcbi8qKiBQcm92aWRlciBmb3IgT1dMX0RBVEVfVElNRV9MT0NBTEUgaW5qZWN0aW9uIHRva2VuLiAqL1xyXG5leHBvcnQgY29uc3QgT1dMX0RBVEVfVElNRV9MT0NBTEVfUFJPVklERVIgPSB7XHJcbiAgICBwcm92aWRlOiBPV0xfREFURV9USU1FX0xPQ0FMRSxcclxuICAgIHVzZUV4aXN0aW5nOiBMT0NBTEVfSURcclxufTtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRlVGltZUFkYXB0ZXI8VD4ge1xyXG4gICAgLyoqIFRoZSBsb2NhbGUgdG8gdXNlIGZvciBhbGwgZGF0ZXMuICovXHJcbiAgICBwcm90ZWN0ZWQgbG9jYWxlOiBhbnk7XHJcblxyXG4gICAgLyoqIEEgc3RyZWFtIHRoYXQgZW1pdHMgd2hlbiB0aGUgbG9jYWxlIGNoYW5nZXMuICovXHJcbiAgICBwcm90ZWN0ZWQgX2xvY2FsZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG4gICAgZ2V0IGxvY2FsZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsZUNoYW5nZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIHRvdGFsIG1pbGxpc2Vjb25kcyBpbiBhIGRheS4gKi9cclxuICAgIHByb3RlY3RlZCByZWFkb25seSBtaWxsaXNlY29uZHNJbkRheSA9IDg2NDAwMDAwO1xyXG5cclxuICAgIC8qKiB0b3RhbCBtaWxsaXNlY29uZHMgaW4gYSBtaW51dGUuICovXHJcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWlsbGlzZW9uZHNJbk1pbnV0ZSA9IDYwMDAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSB5ZWFyIG9mIHRoZSBnaXZlbiBkYXRlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldFllYXIoZGF0ZTogVCk6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgbW9udGggb2YgdGhlIGdpdmVuIGRhdGVcclxuICAgICAqIDAgLS0gSmFudWFyeVxyXG4gICAgICogMTEgLS0gRGVjZW1iZXJcclxuICAgICAqICovXHJcbiAgICBhYnN0cmFjdCBnZXRNb250aChkYXRlOiBUKTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBkYXkgb2YgdGhlIHdlZWsgb2YgdGhlIGdpdmVuIGRhdGVcclxuICAgICAqIDAgLS0gU3VuZGF5XHJcbiAgICAgKiA2IC0tIFNhdHVyZGF5XHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0RGF5KGRhdGU6IFQpOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIGRheSBudW0gb2YgdGhlIGdpdmVuIGRhdGVcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0RGF0ZShkYXRlOiBUKTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBob3VycyBvZiB0aGUgZ2l2ZW4gZGF0ZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBnZXRIb3VycyhkYXRlOiBUKTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBtaW51dGVzIG9mIHRoZSBnaXZlbiBkYXRlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldE1pbnV0ZXMoZGF0ZTogVCk6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgc2Vjb25kcyBvZiB0aGUgZ2l2ZW4gZGF0ZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBnZXRTZWNvbmRzKGRhdGU6IFQpOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIG1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgb2YgdGhlIGdpdmVuIGRhdGVcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0VGltZShkYXRlOiBUKTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIG1vbnRoIG9mIHRoZSBnaXZlbiBkYXRlLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBUKTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBudW1iZXIgb2YgY2FsZW5kYXIgZGF5cyBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcy5cclxuICAgICAqIElmIGRhdGVMZWZ0IGlzIGJlZm9yZSBkYXRlUmlnaHQsIGl0IHdvdWxkIHJldHVybiBwb3NpdGl2ZSB2YWx1ZVxyXG4gICAgICogSWYgZGF0ZUxlZnQgaXMgYWZ0ZXIgZGF0ZVJpZ2h0LCBpdCB3b3VsZCByZXR1cm4gbmVnYXRpdmUgdmFsdWVcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKGRhdGVMZWZ0OiBULCBkYXRlUmlnaHQ6IFQpOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIHRoZSBuYW1lIGZvciB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0WWVhck5hbWUoZGF0ZTogVCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhIGxpc3Qgb2YgbW9udGggbmFtZXNcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSBsaXN0IG9mIHdlZWsgbmFtZXNcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhIGxpc3Qgb2YgbmFtZXMgZm9yIHRoZSBkYXRlcyBvZiB0aGUgbW9udGguXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldERhdGVOYW1lcygpOiBzdHJpbmdbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBhIERhdGUgb2JqZWN0IGFzIGEgc3RyaW5nLCB1c2luZyB0aGUgSVNPIHN0YW5kYXJkXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHRvSXNvODYwMShkYXRlOiBUKTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIGdpdmUgZGF0ZXMgYXJlIGVxdWFsXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGlzRXF1YWwoZGF0ZUxlZnQ6IFQsIGRhdGVSaWdodDogVCk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgZ2l2ZSBkYXRlcyBhcmUgdGhlIHNhbWUgZGF5XHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGlzU2FtZURheShkYXRlTGVmdDogVCwgZGF0ZVJpZ2h0OiBUKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBkYXRlIGlzIHZhbGlkLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBpc1ZhbGlkKGRhdGU6IFQpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBkYXRlIGluc3RhbmNlIHRoYXQgaXMgbm90IHZhbGlkLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBpbnZhbGlkKCk6IFQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGNvbnNpZGVyZWQgYSBkYXRlIGluc3RhbmNlIGJ5IHRoaXMgRGF0ZVRpbWVBZGFwdGVyLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgeWVhcnMgdG8gdGhlIGdpdmVuIGRhdGVcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbW9udGhzIHRvIHRoZSBnaXZlbiBkYXRlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IFQsIGFtb3VudDogbnVtYmVyKTogVDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBkYXlzIHRvIHRoZSBnaXZlbiBkYXRlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGFkZENhbGVuZGFyRGF5cyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIGhvdXJzIHRvIHRoZSBnaXZlbiBkYXRlLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzZXRIb3VycyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIG1pbnV0ZXMgdG8gdGhlIGdpdmVuIGRhdGUuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHNldE1pbnV0ZXMoZGF0ZTogVCwgYW1vdW50OiBudW1iZXIpOiBUO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBzZWNvbmRzIHRvIHRoZSBnaXZlbiBkYXRlLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzZXRTZWNvbmRzKGRhdGU6IFQsIGFtb3VudDogbnVtYmVyKTogVDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBkYXRlIHdpdGggdGhlIGdpdmVuIHllYXIsIG1vbnRoLCBkYXRlLCBob3VyLCBtaW51dGUgYW5kIHNlY29uZC4gRG9lcyBub3QgYWxsb3cgb3Zlci91bmRlci1mbG93IG9mIHRoZVxyXG4gICAgICogbW9udGggYW5kIGRhdGUuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGNyZWF0ZURhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXRlOiBudW1iZXIpOiBUO1xyXG4gICAgYWJzdHJhY3QgY3JlYXRlRGF0ZShcclxuICAgICAgICB5ZWFyOiBudW1iZXIsXHJcbiAgICAgICAgbW9udGg6IG51bWJlcixcclxuICAgICAgICBkYXRlOiBudW1iZXIsXHJcbiAgICAgICAgaG91cnM6IG51bWJlcixcclxuICAgICAgICBtaW51dGVzOiBudW1iZXIsXHJcbiAgICAgICAgc2Vjb25kczogbnVtYmVyXHJcbiAgICApOiBUO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvbmUgdGhlIGdpdmVuIGRhdGVcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgY2xvbmUoZGF0ZTogVCk6IFQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSBuZXcgbW9tZW50XHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3Qgbm93KCk6IFQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JtYXRzIGEgZGF0ZSBhcyBhIHN0cmluZyBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGZvcm1hdC5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZm9ybWF0KGRhdGU6IFQsIGRpc3BsYXlGb3JtYXQ6IGFueSk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcnNlIGEgdXNlci1wcm92aWRlZCB2YWx1ZSB0byBhIERhdGUgT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IHBhcnNlKHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBhbnkpOiBUIHwgbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbXBhcmUgdHdvIGdpdmVuIGRhdGVzXHJcbiAgICAgKiAxIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQsXHJcbiAgICAgKiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZFxyXG4gICAgICogMCBpZiBkYXRlcyBhcmUgZXF1YWwuXHJcbiAgICAgKiAqL1xyXG4gICAgY29tcGFyZShmaXJzdDogVCwgc2Vjb25kOiBUKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChmaXJzdCkgfHwgIXRoaXMuaXNWYWxpZChzZWNvbmQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdKU05hdGl2ZURhdGU6IENhbm5vdCBjb21wYXJlIGludmFsaWQgZGF0ZXMuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkYXRlRmlyc3QgPSB0aGlzLmNsb25lKGZpcnN0KTtcclxuICAgICAgICBjb25zdCBkYXRlU2Vjb25kID0gdGhpcy5jbG9uZShzZWNvbmQpO1xyXG5cclxuICAgICAgICBjb25zdCBkaWZmID0gdGhpcy5nZXRUaW1lKGRhdGVGaXJzdCkgLSB0aGlzLmdldFRpbWUoZGF0ZVNlY29uZCk7XHJcblxyXG4gICAgICAgIGlmIChkaWZmIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChkaWZmID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBSZXR1cm4gMCBpZiBkaWZmIGlzIDA7IHJldHVybiBOYU4gaWYgZGlmZiBpcyBOYU5cclxuICAgICAgICAgICAgcmV0dXJuIGRpZmY7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdHdvIGdpdmVuIGRhdGVzIGFyZSBpbiB0aGUgc2FtZSB5ZWFyXHJcbiAgICAgKiAxIGlmIHRoZSBmaXJzdCBkYXRlJ3MgeWVhciBpcyBhZnRlciB0aGUgc2Vjb25kLFxyXG4gICAgICogLTEgaWYgdGhlIGZpcnN0IGRhdGUncyB5ZWFyIGlzIGJlZm9yZSB0aGUgc2Vjb25kXHJcbiAgICAgKiAwIGlmIHR3byBnaXZlbiBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgeWVhclxyXG4gICAgICogKi9cclxuICAgIGNvbXBhcmVZZWFyKGZpcnN0OiBULCBzZWNvbmQ6IFQpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKGZpcnN0KSB8fCAhdGhpcy5pc1ZhbGlkKHNlY29uZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0pTTmF0aXZlRGF0ZTogQ2Fubm90IGNvbXBhcmUgaW52YWxpZCBkYXRlcy4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHllYXJMZWZ0ID0gdGhpcy5nZXRZZWFyKGZpcnN0KTtcclxuICAgICAgICBjb25zdCB5ZWFyUmlnaHQgPSB0aGlzLmdldFllYXIoc2Vjb25kKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGlmZiA9IHllYXJMZWZ0IC0geWVhclJpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoZGlmZiA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0ZW1wdHMgdG8gZGVzZXJpYWxpemUgYSB2YWx1ZSB0byBhIHZhbGlkIGRhdGUgb2JqZWN0LiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHBhcnNpbmcgaW4gdGhhdFxyXG4gICAgICogZGVzZXJpYWxpemUgc2hvdWxkIG9ubHkgYWNjZXB0IG5vbi1hbWJpZ3VvdXMsIGxvY2FsZS1pbmRlcGVuZGVudCBmb3JtYXRzIChlLmcuIGEgSVNPIDg2MDFcclxuICAgICAqIHN0cmluZykuIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGRvZXMgbm90IGFsbG93IGFueSBkZXNlcmlhbGl6YXRpb24sIGl0IHNpbXBseSBjaGVja3MgdGhhdFxyXG4gICAgICogdGhlIGdpdmVuIHZhbHVlIGlzIGFscmVhZHkgYSB2YWxpZCBkYXRlIG9iamVjdCBvciBudWxsLiBUaGUgYDxtYXQtZGF0ZXBpY2tlcj5gIHdpbGwgY2FsbCB0aGlzXHJcbiAgICAgKiBtZXRob2Qgb24gYWxsIG9mIGl0J3MgYEBJbnB1dCgpYCBwcm9wZXJ0aWVzIHRoYXQgYWNjZXB0IGRhdGVzLiBJdCBpcyB0aGVyZWZvcmUgcG9zc2libGUgdG9cclxuICAgICAqIHN1cHBvcnQgcGFzc2luZyB2YWx1ZXMgZnJvbSB5b3VyIGJhY2tlbmQgZGlyZWN0bHkgdG8gdGhlc2UgcHJvcGVydGllcyBieSBvdmVycmlkaW5nIHRoaXMgbWV0aG9kXHJcbiAgICAgKiB0byBhbHNvIGRlc2VyaWFsaXplIHRoZSBmb3JtYXQgdXNlZCBieSB5b3VyIGJhY2tlbmQuXHJcbiAgICAgKi9cclxuICAgIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB2YWx1ZSA9PSBudWxsIHx8XHJcbiAgICAgICAgICAgICh0aGlzLmlzRGF0ZUluc3RhbmNlKHZhbHVlKSAmJiB0aGlzLmlzVmFsaWQodmFsdWUpKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmludmFsaWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGxvY2FsZSB1c2VkIGZvciBhbGwgZGF0ZXMuXHJcbiAgICAgKi9cclxuICAgIHNldExvY2FsZShsb2NhbGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xyXG4gICAgICAgIHRoaXMuX2xvY2FsZUNoYW5nZXMubmV4dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xhbXAgdGhlIGdpdmVuIGRhdGUgYmV0d2VlbiBtaW4gYW5kIG1heCBkYXRlcy5cclxuICAgICAqL1xyXG4gICAgY2xhbXBEYXRlKGRhdGU6IFQsIG1pbj86IFQgfCBudWxsLCBtYXg/OiBUIHwgbnVsbCk6IFQge1xyXG4gICAgICAgIGlmIChtaW4gJiYgdGhpcy5jb21wYXJlKGRhdGUsIG1pbikgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXggJiYgdGhpcy5jb21wYXJlKGRhdGUsIG1heCkgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==