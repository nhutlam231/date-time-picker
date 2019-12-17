/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time.class
 */
import { Inject, Input, Optional } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
/** @type {?} */
let nextUniqueId = 0;
/**
 * @abstract
 * @template T
 */
export class OwlDateTime {
    /**
     * @param {?} dateTimeAdapter
     * @param {?} dateTimeFormats
     */
    constructor(dateTimeAdapter, dateTimeFormats) {
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * Whether to show the second's timer
         */
        this._showSecondsTimer = false;
        /**
         * Whether the timer is in hour12 format
         */
        this._hour12Timer = false;
        /**
         * The view that the calendar should start in.
         */
        this.startView = 'month';
        /**
         * debounceTime for auto correct timer.
         */
        this.debounceTime = 500;
        /**
         * Hours to change per step
         */
        this._stepHour = 1;
        /**
         * Minutes to change per step
         */
        this._stepMinute = 1;
        /**
         * Seconds to change per step
         */
        this._stepSecond = 1;
        /**
         * Set the first day of week
         */
        this._firstDayOfWeek = 0;
        /**
         * Whether to hide dates in other months at the start or end of the current month.
         */
        this._hideOtherMonths = false;
        /**
         * Date Time Checker to check if the give dateTime is selectable
         */
        this.dateTimeChecker = (/**
         * @param {?} dateTime
         * @return {?}
         */
        (dateTime) => {
            return (!!dateTime &&
                (!this.dateTimeFilter || this.dateTimeFilter(dateTime)) &&
                (!this.minDateTime ||
                    this.dateTimeAdapter.compare(dateTime, this.minDateTime) >=
                        0) &&
                (!this.maxDateTime ||
                    this.dateTimeAdapter.compare(dateTime, this.maxDateTime) <= 0));
        });
        if (!this.dateTimeAdapter) {
            throw Error(`OwlDateTimePicker: No provider found for DateTimeAdapter. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        if (!this.dateTimeFormats) {
            throw Error(`OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        this._id = `owl-dt-picker-${nextUniqueId++}`;
    }
    /**
     * @return {?}
     */
    get showSecondsTimer() {
        return this._showSecondsTimer;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set showSecondsTimer(val) {
        this._showSecondsTimer = coerceBooleanProperty(val);
    }
    /**
     * @return {?}
     */
    get hour12Timer() {
        return this._hour12Timer;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set hour12Timer(val) {
        this._hour12Timer = coerceBooleanProperty(val);
    }
    /**
     * @return {?}
     */
    get stepHour() {
        return this._stepHour;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set stepHour(val) {
        this._stepHour = coerceNumberProperty(val, 1);
    }
    /**
     * @return {?}
     */
    get stepMinute() {
        return this._stepMinute;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set stepMinute(val) {
        this._stepMinute = coerceNumberProperty(val, 1);
    }
    /**
     * @return {?}
     */
    get stepSecond() {
        return this._stepSecond;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set stepSecond(val) {
        this._stepSecond = coerceNumberProperty(val, 1);
    }
    /**
     * @return {?}
     */
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set firstDayOfWeek(value) {
        value = coerceNumberProperty(value, 0);
        if (value > 6 || value < 0) {
            this._firstDayOfWeek = 0;
        }
        else {
            this._firstDayOfWeek = value;
        }
    }
    /**
     * @return {?}
     */
    get hideOtherMonths() {
        return this._hideOtherMonths;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set hideOtherMonths(val) {
        this._hideOtherMonths = coerceBooleanProperty(val);
    }
    /**
     * @return {?}
     */
    get id() {
        return this._id;
    }
    /**
     * @return {?}
     */
    get formatString() {
        return this.pickerType === 'both'
            ? this.dateTimeFormats.fullPickerInput
            : this.pickerType === 'calendar'
                ? this.dateTimeFormats.datePickerInput
                : this.dateTimeFormats.timePickerInput;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return false;
    }
    /**
     * @protected
     * @param {?} obj
     * @return {?}
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
}
/** @nocollapse */
OwlDateTime.ctorParameters = () => [
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
];
OwlDateTime.propDecorators = {
    showSecondsTimer: [{ type: Input }],
    hour12Timer: [{ type: Input }],
    startView: [{ type: Input }],
    debounceTime: [{ type: Input }],
    stepHour: [{ type: Input }],
    stepMinute: [{ type: Input }],
    stepSecond: [{ type: Input }],
    firstDayOfWeek: [{ type: Input }],
    hideOtherMonths: [{ type: Input }]
};
if (false) {
    /**
     * Whether to show the second's timer
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._showSecondsTimer;
    /**
     * Whether the timer is in hour12 format
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._hour12Timer;
    /**
     * The view that the calendar should start in.
     * @type {?}
     */
    OwlDateTime.prototype.startView;
    /**
     * debounceTime for auto correct timer.
     * @type {?}
     */
    OwlDateTime.prototype.debounceTime;
    /**
     * Hours to change per step
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._stepHour;
    /**
     * Minutes to change per step
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._stepMinute;
    /**
     * Seconds to change per step
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._stepSecond;
    /**
     * Set the first day of week
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._firstDayOfWeek;
    /**
     * Whether to hide dates in other months at the start or end of the current month.
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._hideOtherMonths;
    /**
     * @type {?}
     * @private
     */
    OwlDateTime.prototype._id;
    /** @type {?} */
    OwlDateTime.prototype.yearSelected;
    /** @type {?} */
    OwlDateTime.prototype.monthSelected;
    /**
     * Date Time Checker to check if the give dateTime is selectable
     * @type {?}
     */
    OwlDateTime.prototype.dateTimeChecker;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTime.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTime.prototype.dateTimeFormats;
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.selected = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.selecteds = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.dateTimeFilter = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.maxDateTime = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.minDateTime = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.selectMode = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.startAt = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.opened = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.pickerMode = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.pickerType = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.isInSingleMode = function () { };
    /**
     * @abstract
     * @return {?}
     */
    OwlDateTime.prototype.isInRangeMode = function () { };
    /**
     * @abstract
     * @param {?} date
     * @return {?}
     */
    OwlDateTime.prototype.select = function (date) { };
    /**
     * @abstract
     * @param {?} normalizedYear
     * @return {?}
     */
    OwlDateTime.prototype.selectYear = function (normalizedYear) { };
    /**
     * @abstract
     * @param {?} normalizedMonth
     * @return {?}
     */
    OwlDateTime.prototype.selectMonth = function (normalizedMonth) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLmNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLmNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxPQUFPLEVBQWdCLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFDSCxxQkFBcUIsRUFDckIsb0JBQW9CLEVBQ3ZCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFDSCxxQkFBcUIsRUFFeEIsTUFBTSxrQ0FBa0MsQ0FBQzs7SUFFdEMsWUFBWSxHQUFHLENBQUM7Ozs7O0FBUXBCLE1BQU0sT0FBZ0IsV0FBVzs7Ozs7SUErSzdCLFlBQzBCLGVBQW1DLEVBRy9DLGVBQW1DO1FBSHZCLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUcvQyxvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7Ozs7UUEvS3pDLHNCQUFpQixHQUFHLEtBQUssQ0FBQzs7OztRQWExQixpQkFBWSxHQUFHLEtBQUssQ0FBQzs7OztRQWM3QixjQUFTLEdBQXFDLE9BQU8sQ0FBQzs7OztRQU10RCxpQkFBWSxHQUFXLEdBQUcsQ0FBQzs7OztRQUtuQixjQUFTLEdBQUcsQ0FBQyxDQUFDOzs7O1FBYWQsZ0JBQVcsR0FBRyxDQUFDLENBQUM7Ozs7UUFhaEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7Ozs7UUFhaEIsb0JBQWUsR0FBRyxDQUFDLENBQUM7Ozs7UUFrQnBCLHFCQUFnQixHQUFHLEtBQUssQ0FBQzs7OztRQTREMUIsb0JBQWU7Ozs7UUFBRyxDQUFDLFFBQVcsRUFBRSxFQUFFO1lBQ3JDLE9BQU8sQ0FDSCxDQUFDLENBQUMsUUFBUTtnQkFDVixDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FB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QWlCeEMsc0NBVUU7Ozs7O0lBT0Usc0NBQXlEOzs7OztJQUN6RCxzQ0FFNkM7Ozs7O0lBakVqRCxpREFBa0M7Ozs7O0lBRWxDLGtEQUFxQzs7Ozs7SUFFckMsdURBQTJEOzs7OztJQUUzRCxvREFBcUM7Ozs7O0lBRXJDLG9EQUFxQzs7Ozs7SUFFckMsbURBQXNDOzs7OztJQUV0QyxnREFBaUM7Ozs7O0lBRWpDLCtDQUErQjs7Ozs7SUFFL0IsbURBQXNDOzs7OztJQUV0QyxtREFBc0M7Ozs7O0lBRXRDLHVEQUF1Qzs7Ozs7SUFFdkMsc0RBQXNDOzs7Ozs7SUFFdEMsbURBQXFDOzs7Ozs7SUFNckMsaUVBQTZDOzs7Ozs7SUFFN0MsbUVBQStDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGRhdGUtdGltZS5jbGFzc1xyXG4gKi9cclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgY29lcmNlQm9vbGVhblByb3BlcnR5LFxyXG4gICAgY29lcmNlTnVtYmVyUHJvcGVydHlcclxufSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xyXG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xyXG5pbXBvcnQge1xyXG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxyXG4gICAgT3dsRGF0ZVRpbWVGb3JtYXRzXHJcbn0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xyXG5cclxubGV0IG5leHRVbmlxdWVJZCA9IDA7XHJcblxyXG5leHBvcnQgdHlwZSBQaWNrZXJUeXBlID0gJ2JvdGgnIHwgJ2NhbGVuZGFyJyB8ICd0aW1lcic7XHJcblxyXG5leHBvcnQgdHlwZSBQaWNrZXJNb2RlID0gJ3BvcHVwJyB8ICdkaWFsb2cnIHwgJ2lubGluZSc7XHJcblxyXG5leHBvcnQgdHlwZSBTZWxlY3RNb2RlID0gJ3NpbmdsZScgfCAncmFuZ2UnIHwgJ3JhbmdlRnJvbScgfCAncmFuZ2VUbyc7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT3dsRGF0ZVRpbWU8VD4ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIHNlY29uZCdzIHRpbWVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3Nob3dTZWNvbmRzVGltZXIgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgc2hvd1NlY29uZHNUaW1lcigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd1NlY29uZHNUaW1lcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2hvd1NlY29uZHNUaW1lcih2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9zaG93U2Vjb25kc1RpbWVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSB0aW1lciBpcyBpbiBob3VyMTIgZm9ybWF0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2hvdXIxMlRpbWVyID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IGhvdXIxMlRpbWVyKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ob3VyMTJUaW1lcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgaG91cjEyVGltZXIodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5faG91cjEyVGltZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB2aWV3IHRoYXQgdGhlIGNhbGVuZGFyIHNob3VsZCBzdGFydCBpbi5cclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHN0YXJ0VmlldzogJ21vbnRoJyB8ICd5ZWFyJyB8ICdtdWx0aS15ZWFycycgPSAnbW9udGgnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVib3VuY2VUaW1lIGZvciBhdXRvIGNvcnJlY3QgdGltZXIuXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBkZWJvdW5jZVRpbWU6IG51bWJlciA9IDUwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhvdXJzIHRvIGNoYW5nZSBwZXIgc3RlcFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zdGVwSG91ciA9IDE7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHN0ZXBIb3VyKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXBIb3VyO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzdGVwSG91cih2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3N0ZXBIb3VyID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbnV0ZXMgdG8gY2hhbmdlIHBlciBzdGVwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3N0ZXBNaW51dGUgPSAxO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBzdGVwTWludXRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXBNaW51dGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHN0ZXBNaW51dGUodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zdGVwTWludXRlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlY29uZHMgdG8gY2hhbmdlIHBlciBzdGVwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3N0ZXBTZWNvbmQgPSAxO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBzdGVwU2Vjb25kKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXBTZWNvbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHN0ZXBTZWNvbmQodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zdGVwU2Vjb25kID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgZmlyc3QgZGF5IG9mIHdlZWtcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZmlyc3REYXlPZldlZWsgPSAwO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBmaXJzdERheU9mV2VlaygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3REYXlPZldlZWs7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGZpcnN0RGF5T2ZXZWVrKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB2YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlLCAwKTtcclxuICAgICAgICBpZiAodmFsdWUgPiA2IHx8IHZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJzdERheU9mV2VlayA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyc3REYXlPZldlZWsgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRvIGhpZGUgZGF0ZXMgaW4gb3RoZXIgbW9udGhzIGF0IHRoZSBzdGFydCBvciBlbmQgb2YgdGhlIGN1cnJlbnQgbW9udGguXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2hpZGVPdGhlck1vbnRocyA9IGZhbHNlO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBoaWRlT3RoZXJNb250aHMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hpZGVPdGhlck1vbnRocztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgaGlkZU90aGVyTW9udGhzKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2hpZGVPdGhlck1vbnRocyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XHJcbiAgICBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgZ2V0IHNlbGVjdGVkKCk6IFQgfCBudWxsO1xyXG5cclxuICAgIGFic3RyYWN0IGdldCBzZWxlY3RlZHMoKTogVFtdIHwgbnVsbDtcclxuXHJcbiAgICBhYnN0cmFjdCBnZXQgZGF0ZVRpbWVGaWx0ZXIoKTogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuO1xyXG5cclxuICAgIGFic3RyYWN0IGdldCBtYXhEYXRlVGltZSgpOiBUIHwgbnVsbDtcclxuXHJcbiAgICBhYnN0cmFjdCBnZXQgbWluRGF0ZVRpbWUoKTogVCB8IG51bGw7XHJcblxyXG4gICAgYWJzdHJhY3QgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZTtcclxuXHJcbiAgICBhYnN0cmFjdCBnZXQgc3RhcnRBdCgpOiBUIHwgbnVsbDtcclxuXHJcbiAgICBhYnN0cmFjdCBnZXQgb3BlbmVkKCk6IGJvb2xlYW47XHJcblxyXG4gICAgYWJzdHJhY3QgZ2V0IHBpY2tlck1vZGUoKTogUGlja2VyTW9kZTtcclxuXHJcbiAgICBhYnN0cmFjdCBnZXQgcGlja2VyVHlwZSgpOiBQaWNrZXJUeXBlO1xyXG5cclxuICAgIGFic3RyYWN0IGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuO1xyXG5cclxuICAgIGFic3RyYWN0IGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW47XHJcblxyXG4gICAgYWJzdHJhY3Qgc2VsZWN0KGRhdGU6IFQgfCBUW10pOiB2b2lkO1xyXG5cclxuICAgIGFic3RyYWN0IHllYXJTZWxlY3RlZDogRXZlbnRFbWl0dGVyPFQ+O1xyXG5cclxuICAgIGFic3RyYWN0IG1vbnRoU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxUPjtcclxuXHJcbiAgICBhYnN0cmFjdCBzZWxlY3RZZWFyKG5vcm1hbGl6ZWRZZWFyOiBUKTogdm9pZDtcclxuXHJcbiAgICBhYnN0cmFjdCBzZWxlY3RNb250aChub3JtYWxpemVkTW9udGg6IFQpOiB2b2lkO1xyXG5cclxuICAgIGdldCBmb3JtYXRTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJUeXBlID09PSAnYm90aCdcclxuICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lRm9ybWF0cy5mdWxsUGlja2VySW5wdXRcclxuICAgICAgICAgICAgOiB0aGlzLnBpY2tlclR5cGUgPT09ICdjYWxlbmRhcidcclxuICAgICAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUZvcm1hdHMuZGF0ZVBpY2tlcklucHV0XHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuZGF0ZVRpbWVGb3JtYXRzLnRpbWVQaWNrZXJJbnB1dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERhdGUgVGltZSBDaGVja2VyIHRvIGNoZWNrIGlmIHRoZSBnaXZlIGRhdGVUaW1lIGlzIHNlbGVjdGFibGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRhdGVUaW1lQ2hlY2tlciA9IChkYXRlVGltZTogVCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICEhZGF0ZVRpbWUgJiZcclxuICAgICAgICAgICAgKCF0aGlzLmRhdGVUaW1lRmlsdGVyIHx8IHRoaXMuZGF0ZVRpbWVGaWx0ZXIoZGF0ZVRpbWUpKSAmJlxyXG4gICAgICAgICAgICAoIXRoaXMubWluRGF0ZVRpbWUgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZGF0ZVRpbWUsIHRoaXMubWluRGF0ZVRpbWUpID49XHJcbiAgICAgICAgICAgICAgICAgICAgMCkgJiZcclxuICAgICAgICAgICAgKCF0aGlzLm1heERhdGVUaW1lIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGVUaW1lLCB0aGlzLm1heERhdGVUaW1lKSA8PSAwKVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+LFxyXG4gICAgICAgIEBPcHRpb25hbCgpXHJcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpXHJcbiAgICAgICAgcHJvdGVjdGVkIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzXHJcbiAgICApIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgRGF0ZVRpbWVBZGFwdGVyLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBmb2xsb3dpbmcgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290OiBPd2xOYXRpdmVEYXRlVGltZU1vZHVsZSwgT3dsTW9tZW50RGF0ZVRpbWVNb2R1bGUsIG9yIHByb3ZpZGUgYSBgICtcclxuICAgICAgICAgICAgICAgICAgICBgY3VzdG9tIGltcGxlbWVudGF0aW9uLmBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5kYXRlVGltZUZvcm1hdHMpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgT3dsRGF0ZVRpbWVQaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBPV0xfREFURV9USU1FX0ZPUk1BVFMuIFlvdSBtdXN0IGltcG9ydCBvbmUgb2YgdGhlIGZvbGxvd2luZyBgICtcclxuICAgICAgICAgICAgICAgICAgICBgbW9kdWxlcyBhdCB5b3VyIGFwcGxpY2F0aW9uIHJvb3Q6IE93bE5hdGl2ZURhdGVUaW1lTW9kdWxlLCBPd2xNb21lbnREYXRlVGltZU1vZHVsZSwgb3IgcHJvdmlkZSBhIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgIGBjdXN0b20gaW1wbGVtZW50YXRpb24uYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faWQgPSBgb3dsLWR0LXBpY2tlci0ke25leHRVbmlxdWVJZCsrfWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJlxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcclxuICAgICAgICAgICAgPyBvYmpcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==