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
export const OWL_DATE_TIME_LOCALE = new InjectionToken('OWL_DATE_TIME_LOCALE', {
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
export const OWL_DATE_TIME_LOCALE_PROVIDER = {
    provide: OWL_DATE_TIME_LOCALE,
    useExisting: LOCALE_ID
};
/**
 * @abstract
 * @template T
 */
export class DateTimeAdapter {
    constructor() {
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
    /**
     * @return {?}
     */
    get localeChanges() {
        return this._localeChanges;
    }
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
    compare(first, second) {
        if (!this.isValid(first) || !this.isValid(second)) {
            throw Error('JSNativeDate: Cannot compare invalid dates.');
        }
        /** @type {?} */
        const dateFirst = this.clone(first);
        /** @type {?} */
        const dateSecond = this.clone(second);
        /** @type {?} */
        const diff = this.getTime(dateFirst) - this.getTime(dateSecond);
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
    }
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
    compareYear(first, second) {
        if (!this.isValid(first) || !this.isValid(second)) {
            throw Error('JSNativeDate: Cannot compare invalid dates.');
        }
        /** @type {?} */
        const yearLeft = this.getYear(first);
        /** @type {?} */
        const yearRight = this.getYear(second);
        /** @type {?} */
        const diff = yearLeft - yearRight;
        if (diff < 0) {
            return -1;
        }
        else if (diff > 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
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
    deserialize(value) {
        if (value == null ||
            (this.isDateInstance(value) && this.isValid(value))) {
            return value;
        }
        return this.invalid();
    }
    /**
     * Sets the locale used for all dates.
     * @param {?} locale
     * @return {?}
     */
    setLocale(locale) {
        this.locale = locale;
        this._localeChanges.next();
    }
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    clampDate(date, min, max) {
        if (min && this.compare(date, min) < 0) {
            return min;
        }
        if (max && this.compare(date, max) > 0) {
            return max;
        }
        return date;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFHbEUsTUFBTSxPQUFPLG9CQUFvQixHQUFHLElBQUksY0FBYyxDQUNsRCxzQkFBc0IsRUFDdEI7SUFDSSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsNEJBQTRCO0NBQ3hDLENBQ0o7Ozs7O0FBR0QsTUFBTSxVQUFVLDRCQUE0QjtJQUN4QyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QixDQUFDOzs7OztBQUdELE1BQU0sT0FBTyw2QkFBNkIsR0FBRztJQUN6QyxPQUFPLEVBQUUsb0JBQW9CO0lBQzdCLFdBQVcsRUFBRSxTQUFTO0NBQ3pCOzs7OztBQUVELE1BQU0sT0FBZ0IsZUFBZTtJQUFyQzs7OztRQUtjLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQzs7OztRQU01QixzQkFBaUIsR0FBRyxRQUFRLENBQUM7Ozs7UUFHN0Isd0JBQW1CLEdBQUcsS0FBSyxDQUFDO0lBc1FuRCxDQUFDOzs7O0lBOVFHLElBQUksYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDOzs7Ozs7Ozs7OztJQXdMRCxPQUFPLENBQUMsS0FBUSxFQUFFLE1BQVM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9DLE1BQU0sS0FB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QUtsQywwREFBb0M7Ozs7Ozs7O0lBS3BDLHVFQUFxRDs7Ozs7Ozs7SUFLckQseUVBQXVEOzs7Ozs7O0lBS3ZELHdEQUFtQzs7Ozs7O0lBS25DLG9EQUFzQjs7Ozs7OztJQUt0Qiw4REFBMkM7Ozs7Ozs7O0lBSzNDLHlFQUFzRDs7Ozs7Ozs7SUFLdEQsMEVBQXVEOzs7Ozs7OztJQUt2RCx3RUFBcUQ7Ozs7Ozs7O0lBS3JELGlFQUE4Qzs7Ozs7Ozs7SUFLOUMsbUVBQWdEOzs7Ozs7OztJQUtoRCxtRUFBZ0Q7Ozs7Ozs7Ozs7SUFNaEQsd0VBQWtFOzs7Ozs7Ozs7OztJQUNsRSxpR0FPSzs7Ozs7OztJQUtMLHNEQUEyQjs7Ozs7OztJQUszQixnREFBa0I7Ozs7Ozs7O0lBS2xCLHNFQUFxRDs7Ozs7Ozs7SUFLckQsb0VBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGRhdGUtdGltZS1hZGFwdGVyLmNsYXNzXHJcbiAqL1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGluamVjdCwgSW5qZWN0aW9uVG9rZW4sIExPQ0FMRV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqIEluamVjdGlvblRva2VuIGZvciBkYXRlIHRpbWUgcGlja2VyIHRoYXQgY2FuIGJlIHVzZWQgdG8gb3ZlcnJpZGUgZGVmYXVsdCBsb2NhbGUgY29kZS4gKi9cclxuZXhwb3J0IGNvbnN0IE9XTF9EQVRFX1RJTUVfTE9DQUxFID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oXHJcbiAgICAnT1dMX0RBVEVfVElNRV9MT0NBTEUnLFxyXG4gICAge1xyXG4gICAgICAgIHByb3ZpZGVkSW46ICdyb290JyxcclxuICAgICAgICBmYWN0b3J5OiBPV0xfREFURV9USU1FX0xPQ0FMRV9GQUNUT1JZXHJcbiAgICB9XHJcbik7XHJcblxyXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gT1dMX0RBVEVfVElNRV9MT0NBTEVfRkFDVE9SWSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGluamVjdChMT0NBTEVfSUQpO1xyXG59XHJcblxyXG4vKiogUHJvdmlkZXIgZm9yIE9XTF9EQVRFX1RJTUVfTE9DQUxFIGluamVjdGlvbiB0b2tlbi4gKi9cclxuZXhwb3J0IGNvbnN0IE9XTF9EQVRFX1RJTUVfTE9DQUxFX1BST1ZJREVSID0ge1xyXG4gICAgcHJvdmlkZTogT1dMX0RBVEVfVElNRV9MT0NBTEUsXHJcbiAgICB1c2VFeGlzdGluZzogTE9DQUxFX0lEXHJcbn07XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRGF0ZVRpbWVBZGFwdGVyPFQ+IHtcclxuICAgIC8qKiBUaGUgbG9jYWxlIHRvIHVzZSBmb3IgYWxsIGRhdGVzLiAqL1xyXG4gICAgcHJvdGVjdGVkIGxvY2FsZTogYW55O1xyXG5cclxuICAgIC8qKiBBIHN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gdGhlIGxvY2FsZSBjaGFuZ2VzLiAqL1xyXG4gICAgcHJvdGVjdGVkIF9sb2NhbGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuICAgIGdldCBsb2NhbGVDaGFuZ2VzKCk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVDaGFuZ2VzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiB0b3RhbCBtaWxsaXNlY29uZHMgaW4gYSBkYXkuICovXHJcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbWlsbGlzZWNvbmRzSW5EYXkgPSA4NjQwMDAwMDtcclxuXHJcbiAgICAvKiogdG90YWwgbWlsbGlzZWNvbmRzIGluIGEgbWludXRlLiAqL1xyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IG1pbGxpc2VvbmRzSW5NaW51dGUgPSA2MDAwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBnZXRZZWFyKGRhdGU6IFQpOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIG1vbnRoIG9mIHRoZSBnaXZlbiBkYXRlXHJcbiAgICAgKiAwIC0tIEphbnVhcnlcclxuICAgICAqIDExIC0tIERlY2VtYmVyXHJcbiAgICAgKiAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0TW9udGgoZGF0ZTogVCk6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgZGF5IG9mIHRoZSB3ZWVrIG9mIHRoZSBnaXZlbiBkYXRlXHJcbiAgICAgKiAwIC0tIFN1bmRheVxyXG4gICAgICogNiAtLSBTYXR1cmRheVxyXG4gICAgICogKi9cclxuICAgIGFic3RyYWN0IGdldERheShkYXRlOiBUKTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBkYXkgbnVtIG9mIHRoZSBnaXZlbiBkYXRlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldERhdGUoZGF0ZTogVCk6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgaG91cnMgb2YgdGhlIGdpdmVuIGRhdGVcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0SG91cnMoZGF0ZTogVCk6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgbWludXRlcyBvZiB0aGUgZ2l2ZW4gZGF0ZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBnZXRNaW51dGVzKGRhdGU6IFQpOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIHNlY29uZHMgb2YgdGhlIGdpdmVuIGRhdGVcclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0U2Vjb25kcyhkYXRlOiBUKTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBtaWxsaXNlY29uZHMgdGltZXN0YW1wIG9mIHRoZSBnaXZlbiBkYXRlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldFRpbWUoZGF0ZTogVCk6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogVCk6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgbnVtYmVyIG9mIGNhbGVuZGFyIGRheXMgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMuXHJcbiAgICAgKiBJZiBkYXRlTGVmdCBpcyBiZWZvcmUgZGF0ZVJpZ2h0LCBpdCB3b3VsZCByZXR1cm4gcG9zaXRpdmUgdmFsdWVcclxuICAgICAqIElmIGRhdGVMZWZ0IGlzIGFmdGVyIGRhdGVSaWdodCwgaXQgd291bGQgcmV0dXJuIG5lZ2F0aXZlIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhkYXRlTGVmdDogVCwgZGF0ZVJpZ2h0OiBUKTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgbmFtZSBmb3IgdGhlIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldFllYXJOYW1lKGRhdGU6IFQpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSBsaXN0IG9mIG1vbnRoIG5hbWVzXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldE1vbnRoTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgbGlzdCBvZiB3ZWVrIG5hbWVzXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSBsaXN0IG9mIG5hbWVzIGZvciB0aGUgZGF0ZXMgb2YgdGhlIG1vbnRoLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBnZXREYXRlTmFtZXMoKTogc3RyaW5nW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYSBEYXRlIG9iamVjdCBhcyBhIHN0cmluZywgdXNpbmcgdGhlIElTTyBzdGFuZGFyZFxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCB0b0lzbzg2MDEoZGF0ZTogVCk6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlIGRhdGVzIGFyZSBlcXVhbFxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBpc0VxdWFsKGRhdGVMZWZ0OiBULCBkYXRlUmlnaHQ6IFQpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIGdpdmUgZGF0ZXMgYXJlIHRoZSBzYW1lIGRheVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBpc1NhbWVEYXkoZGF0ZUxlZnQ6IFQsIGRhdGVSaWdodDogVCk6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gZGF0ZSBpcyB2YWxpZC5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgaXNWYWxpZChkYXRlOiBUKTogYm9vbGVhbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgZGF0ZSBpbnN0YW5jZSB0aGF0IGlzIG5vdCB2YWxpZC5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgaW52YWxpZCgpOiBUO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBjb25zaWRlcmVkIGEgZGF0ZSBpbnN0YW5jZSBieSB0aGlzIERhdGVUaW1lQWRhcHRlci5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3QgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHllYXJzIHRvIHRoZSBnaXZlbiBkYXRlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogVCwgYW1vdW50OiBudW1iZXIpOiBUO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIG1vbnRocyB0byB0aGUgZ2l2ZW4gZGF0ZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgZGF5cyB0byB0aGUgZ2l2ZW4gZGF0ZVxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBhZGRDYWxlbmRhckRheXMoZGF0ZTogVCwgYW1vdW50OiBudW1iZXIpOiBUO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBob3VycyB0byB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2V0SG91cnMoZGF0ZTogVCwgYW1vdW50OiBudW1iZXIpOiBUO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBtaW51dGVzIHRvIHRoZSBnaXZlbiBkYXRlLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBzZXRNaW51dGVzKGRhdGU6IFQsIGFtb3VudDogbnVtYmVyKTogVDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgc2Vjb25kcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgICAqL1xyXG4gICAgYWJzdHJhY3Qgc2V0U2Vjb25kcyhkYXRlOiBULCBhbW91bnQ6IG51bWJlcik6IFQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgZGF0ZSB3aXRoIHRoZSBnaXZlbiB5ZWFyLCBtb250aCwgZGF0ZSwgaG91ciwgbWludXRlIGFuZCBzZWNvbmQuIERvZXMgbm90IGFsbG93IG92ZXIvdW5kZXItZmxvdyBvZiB0aGVcclxuICAgICAqIG1vbnRoIGFuZCBkYXRlLlxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogVDtcclxuICAgIGFic3RyYWN0IGNyZWF0ZURhdGUoXHJcbiAgICAgICAgeWVhcjogbnVtYmVyLFxyXG4gICAgICAgIG1vbnRoOiBudW1iZXIsXHJcbiAgICAgICAgZGF0ZTogbnVtYmVyLFxyXG4gICAgICAgIGhvdXJzOiBudW1iZXIsXHJcbiAgICAgICAgbWludXRlczogbnVtYmVyLFxyXG4gICAgICAgIHNlY29uZHM6IG51bWJlclxyXG4gICAgKTogVDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb25lIHRoZSBnaXZlbiBkYXRlXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGNsb25lKGRhdGU6IFQpOiBUO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgbmV3IG1vbWVudFxyXG4gICAgICogKi9cclxuICAgIGFic3RyYWN0IG5vdygpOiBUO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9ybWF0cyBhIGRhdGUgYXMgYSBzdHJpbmcgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBmb3JtYXQuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGZvcm1hdChkYXRlOiBULCBkaXNwbGF5Rm9ybWF0OiBhbnkpOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZSBhIHVzZXItcHJvdmlkZWQgdmFsdWUgdG8gYSBEYXRlIE9iamVjdFxyXG4gICAgICovXHJcbiAgICBhYnN0cmFjdCBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogYW55KTogVCB8IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21wYXJlIHR3byBnaXZlbiBkYXRlc1xyXG4gICAgICogMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBhZnRlciB0aGUgc2Vjb25kLFxyXG4gICAgICogLTEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYmVmb3JlIHRoZSBzZWNvbmRcclxuICAgICAqIDAgaWYgZGF0ZXMgYXJlIGVxdWFsLlxyXG4gICAgICogKi9cclxuICAgIGNvbXBhcmUoZmlyc3Q6IFQsIHNlY29uZDogVCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoZmlyc3QpIHx8ICF0aGlzLmlzVmFsaWQoc2Vjb25kKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignSlNOYXRpdmVEYXRlOiBDYW5ub3QgY29tcGFyZSBpbnZhbGlkIGRhdGVzLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZGF0ZUZpcnN0ID0gdGhpcy5jbG9uZShmaXJzdCk7XHJcbiAgICAgICAgY29uc3QgZGF0ZVNlY29uZCA9IHRoaXMuY2xvbmUoc2Vjb25kKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGlmZiA9IHRoaXMuZ2V0VGltZShkYXRlRmlyc3QpIC0gdGhpcy5nZXRUaW1lKGRhdGVTZWNvbmQpO1xyXG5cclxuICAgICAgICBpZiAoZGlmZiA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gUmV0dXJuIDAgaWYgZGlmZiBpcyAwOyByZXR1cm4gTmFOIGlmIGRpZmYgaXMgTmFOXHJcbiAgICAgICAgICAgIHJldHVybiBkaWZmO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHR3byBnaXZlbiBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgeWVhclxyXG4gICAgICogMSBpZiB0aGUgZmlyc3QgZGF0ZSdzIHllYXIgaXMgYWZ0ZXIgdGhlIHNlY29uZCxcclxuICAgICAqIC0xIGlmIHRoZSBmaXJzdCBkYXRlJ3MgeWVhciBpcyBiZWZvcmUgdGhlIHNlY29uZFxyXG4gICAgICogMCBpZiB0d28gZ2l2ZW4gZGF0ZXMgYXJlIGluIHRoZSBzYW1lIHllYXJcclxuICAgICAqICovXHJcbiAgICBjb21wYXJlWWVhcihmaXJzdDogVCwgc2Vjb25kOiBUKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChmaXJzdCkgfHwgIXRoaXMuaXNWYWxpZChzZWNvbmQpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdKU05hdGl2ZURhdGU6IENhbm5vdCBjb21wYXJlIGludmFsaWQgZGF0ZXMuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB5ZWFyTGVmdCA9IHRoaXMuZ2V0WWVhcihmaXJzdCk7XHJcbiAgICAgICAgY29uc3QgeWVhclJpZ2h0ID0gdGhpcy5nZXRZZWFyKHNlY29uZCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRpZmYgPSB5ZWFyTGVmdCAtIHllYXJSaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGRpZmYgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGVtcHRzIHRvIGRlc2VyaWFsaXplIGEgdmFsdWUgdG8gYSB2YWxpZCBkYXRlIG9iamVjdC4gVGhpcyBpcyBkaWZmZXJlbnQgZnJvbSBwYXJzaW5nIGluIHRoYXRcclxuICAgICAqIGRlc2VyaWFsaXplIHNob3VsZCBvbmx5IGFjY2VwdCBub24tYW1iaWd1b3VzLCBsb2NhbGUtaW5kZXBlbmRlbnQgZm9ybWF0cyAoZS5nLiBhIElTTyA4NjAxXHJcbiAgICAgKiBzdHJpbmcpLiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdCBhbGxvdyBhbnkgZGVzZXJpYWxpemF0aW9uLCBpdCBzaW1wbHkgY2hlY2tzIHRoYXRcclxuICAgICAqIHRoZSBnaXZlbiB2YWx1ZSBpcyBhbHJlYWR5IGEgdmFsaWQgZGF0ZSBvYmplY3Qgb3IgbnVsbC4gVGhlIGA8bWF0LWRhdGVwaWNrZXI+YCB3aWxsIGNhbGwgdGhpc1xyXG4gICAgICogbWV0aG9kIG9uIGFsbCBvZiBpdCdzIGBASW5wdXQoKWAgcHJvcGVydGllcyB0aGF0IGFjY2VwdCBkYXRlcy4gSXQgaXMgdGhlcmVmb3JlIHBvc3NpYmxlIHRvXHJcbiAgICAgKiBzdXBwb3J0IHBhc3NpbmcgdmFsdWVzIGZyb20geW91ciBiYWNrZW5kIGRpcmVjdGx5IHRvIHRoZXNlIHByb3BlcnRpZXMgYnkgb3ZlcnJpZGluZyB0aGlzIG1ldGhvZFxyXG4gICAgICogdG8gYWxzbyBkZXNlcmlhbGl6ZSB0aGUgZm9ybWF0IHVzZWQgYnkgeW91ciBiYWNrZW5kLlxyXG4gICAgICovXHJcbiAgICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogVCB8IG51bGwge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdmFsdWUgPT0gbnVsbCB8fFxyXG4gICAgICAgICAgICAodGhpcy5pc0RhdGVJbnN0YW5jZSh2YWx1ZSkgJiYgdGhpcy5pc1ZhbGlkKHZhbHVlKSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBsb2NhbGUgdXNlZCBmb3IgYWxsIGRhdGVzLlxyXG4gICAgICovXHJcbiAgICBzZXRMb2NhbGUobG9jYWxlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcclxuICAgICAgICB0aGlzLl9sb2NhbGVDaGFuZ2VzLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsYW1wIHRoZSBnaXZlbiBkYXRlIGJldHdlZW4gbWluIGFuZCBtYXggZGF0ZXMuXHJcbiAgICAgKi9cclxuICAgIGNsYW1wRGF0ZShkYXRlOiBULCBtaW4/OiBUIHwgbnVsbCwgbWF4PzogVCB8IG51bGwpOiBUIHtcclxuICAgICAgICBpZiAobWluICYmIHRoaXMuY29tcGFyZShkYXRlLCBtaW4pIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWluO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWF4ICYmIHRoaXMuY29tcGFyZShkYXRlLCBtYXgpID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxufVxyXG4iXX0=