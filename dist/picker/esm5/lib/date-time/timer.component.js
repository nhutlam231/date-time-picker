/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * timer.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, Optional, Output } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { take } from 'rxjs/operators';
/**
 * @template T
 */
var OwlTimerComponent = /** @class */ (function () {
    function OwlTimerComponent(ngZone, elmRef, pickerIntl, cdRef, dateTimeAdapter) {
        this.ngZone = ngZone;
        this.elmRef = elmRef;
        this.pickerIntl = pickerIntl;
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.isPM = false; // a flag indicates the current timer moment is in PM or AM
        /**
         * Hours to change per step
         */
        this.stepHour = 1;
        /**
         * Minutes to change per step
         */
        this.stepMinute = 1;
        /**
         * Seconds to change per step
         */
        this.stepSecond = 1;
        /**
         * Seconds to auto update time value
         */
        this.debounceTime = 500;
        this.selectedChange = new EventEmitter();
    }
    Object.defineProperty(OwlTimerComponent.prototype, "pickerMoment", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pickerMoment;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._pickerMoment =
                this.getValidDate(value) || this.dateTimeAdapter.now();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "minDateTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minDateTime;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._minDateTime = this.getValidDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "maxDateTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxDateTime;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._maxDateTime = this.getValidDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "hourValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dateTimeAdapter.getHours(this.pickerMoment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "hourBoxValue", {
        /**
         * The value would be displayed in hourBox.
         * We need this because the value displayed in hourBox it not
         * the same as the hourValue when the timer is in hour12Timer mode.
         * */
        get: /**
         * The value would be displayed in hourBox.
         * We need this because the value displayed in hourBox it not
         * the same as the hourValue when the timer is in hour12Timer mode.
         *
         * @return {?}
         */
        function () {
            /** @type {?} */
            var hours = this.hourValue;
            if (!this.hour12Timer) {
                return hours;
            }
            else {
                if (hours === 0) {
                    hours = 12;
                    this.isPM = false;
                }
                else if (hours > 0 && hours < 12) {
                    this.isPM = false;
                }
                else if (hours === 12) {
                    this.isPM = true;
                }
                else if (hours > 12 && hours < 24) {
                    hours = hours - 12;
                    this.isPM = true;
                }
                return hours;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "minuteValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dateTimeAdapter.getMinutes(this.pickerMoment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "secondValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this.dateTimeAdapter.getSeconds(this.pickerMoment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "upHourButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.upHourLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "downHourButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.downHourLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "upMinuteButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.upMinuteLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "downMinuteButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.downMinuteLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "upSecondButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.upSecondLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "downSecondButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.downSecondLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "hour12ButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isPM
                ? this.pickerIntl.hour12PMLabel
                : this.pickerIntl.hour12AMLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "owlDTTimerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlTimerComponent.prototype, "owlDTTimeTabIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlTimerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * Focus to the host element
     * */
    /**
     * Focus to the host element
     *
     * @return {?}
     */
    OwlTimerComponent.prototype.focus = /**
     * Focus to the host element
     *
     * @return {?}
     */
    function () {
        var _this = this;
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.elmRef.nativeElement.focus();
            }));
        }));
    };
    /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
     * */
    /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
     *
     * @param {?} hours
     * @return {?}
     */
    OwlTimerComponent.prototype.setHourValueViaInput = /**
     * Set the hour value via typing into timer box input
     * We need this to handle the hour value when the timer is in hour12 mode
     *
     * @param {?} hours
     * @return {?}
     */
    function (hours) {
        if (this.hour12Timer && this.isPM && hours >= 1 && hours <= 11) {
            hours = hours + 12;
        }
        else if (this.hour12Timer && !this.isPM && hours === 12) {
            hours = 0;
        }
        this.setHourValue(hours);
    };
    /**
     * @param {?} hours
     * @return {?}
     */
    OwlTimerComponent.prototype.setHourValue = /**
     * @param {?} hours
     * @return {?}
     */
    function (hours) {
        /** @type {?} */
        var m = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} minutes
     * @return {?}
     */
    OwlTimerComponent.prototype.setMinuteValue = /**
     * @param {?} minutes
     * @return {?}
     */
    function (minutes) {
        /** @type {?} */
        var m = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} seconds
     * @return {?}
     */
    OwlTimerComponent.prototype.setSecondValue = /**
     * @param {?} seconds
     * @return {?}
     */
    function (seconds) {
        /** @type {?} */
        var m = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
        this.selectedChange.emit(m);
        this.cdRef.markForCheck();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlTimerComponent.prototype.setMeridiem = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.isPM = !this.isPM;
        /** @type {?} */
        var hours = this.hourValue;
        if (this.isPM) {
            hours = hours + 12;
        }
        else {
            hours = hours - 12;
        }
        if (hours >= 0 && hours <= 23) {
            this.setHourValue(hours);
        }
        this.cdRef.markForCheck();
        event.preventDefault();
    };
    /**
     * Check if the up hour button is enabled
     */
    /**
     * Check if the up hour button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.upHourEnabled = /**
     * Check if the up hour button is enabled
     * @return {?}
     */
    function () {
        return (!this.maxDateTime ||
            this.compareHours(this.stepHour, this.maxDateTime) < 1);
    };
    /**
     * Check if the down hour button is enabled
     */
    /**
     * Check if the down hour button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.downHourEnabled = /**
     * Check if the down hour button is enabled
     * @return {?}
     */
    function () {
        return (!this.minDateTime ||
            this.compareHours(-this.stepHour, this.minDateTime) > -1);
    };
    /**
     * Check if the up minute button is enabled
     */
    /**
     * Check if the up minute button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.upMinuteEnabled = /**
     * Check if the up minute button is enabled
     * @return {?}
     */
    function () {
        return (!this.maxDateTime ||
            this.compareMinutes(this.stepMinute, this.maxDateTime) < 1);
    };
    /**
     * Check if the down minute button is enabled
     */
    /**
     * Check if the down minute button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.downMinuteEnabled = /**
     * Check if the down minute button is enabled
     * @return {?}
     */
    function () {
        return (!this.minDateTime ||
            this.compareMinutes(-this.stepMinute, this.minDateTime) > -1);
    };
    /**
     * Check if the up second button is enabled
     */
    /**
     * Check if the up second button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.upSecondEnabled = /**
     * Check if the up second button is enabled
     * @return {?}
     */
    function () {
        return (!this.maxDateTime ||
            this.compareSeconds(this.stepSecond, this.maxDateTime) < 1);
    };
    /**
     * Check if the down second button is enabled
     */
    /**
     * Check if the down second button is enabled
     * @return {?}
     */
    OwlTimerComponent.prototype.downSecondEnabled = /**
     * Check if the down second button is enabled
     * @return {?}
     */
    function () {
        return (!this.minDateTime ||
            this.compareSeconds(-this.stepSecond, this.minDateTime) > -1);
    };
    /**
     * PickerMoment's hour value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * */
    /**
     * PickerMoment's hour value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     *
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    OwlTimerComponent.prototype.compareHours = /**
     * PickerMoment's hour value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     *
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    function (amount, comparedDate) {
        /** @type {?} */
        var hours = this.dateTimeAdapter.getHours(this.pickerMoment) + amount;
        /** @type {?} */
        var result = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
        return this.dateTimeAdapter.compare(result, comparedDate);
    };
    /**
     * PickerMoment's minute value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * */
    /**
     * PickerMoment's minute value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     *
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    OwlTimerComponent.prototype.compareMinutes = /**
     * PickerMoment's minute value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     *
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    function (amount, comparedDate) {
        /** @type {?} */
        var minutes = this.dateTimeAdapter.getMinutes(this.pickerMoment) + amount;
        /** @type {?} */
        var result = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
        return this.dateTimeAdapter.compare(result, comparedDate);
    };
    /**
     * PickerMoment's second value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     * */
    /**
     * PickerMoment's second value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     *
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    OwlTimerComponent.prototype.compareSeconds = /**
     * PickerMoment's second value +/- certain amount and compare it to the give date
     * 1 is after the comparedDate
     * -1 is before the comparedDate
     * 0 is equal the comparedDate
     *
     * @private
     * @param {?} amount
     * @param {?} comparedDate
     * @return {?}
     */
    function (amount, comparedDate) {
        /** @type {?} */
        var seconds = this.dateTimeAdapter.getSeconds(this.pickerMoment) + amount;
        /** @type {?} */
        var result = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
        return this.dateTimeAdapter.compare(result, comparedDate);
    };
    /**
     * Get a valid date object
     */
    /**
     * Get a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    OwlTimerComponent.prototype.getValidDate = /**
     * Get a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    };
    OwlTimerComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'owlDateTimeTimer',
                    selector: 'owl-date-time-timer',
                    template: "<owl-date-time-timer-box\r\n        [upBtnAriaLabel]=\"upHourButtonLabel\"\r\n        [downBtnAriaLabel]=\"downHourButtonLabel\"\r\n        [upBtnDisabled]=\"!upHourEnabled()\"\r\n        [downBtnDisabled]=\"!downHourEnabled()\"\r\n        [boxValue]=\"hourBoxValue\"\r\n        [value]=\"hourValue\" [min]=\"0\" [max]=\"23\"\r\n        [step]=\"stepHour\" [inputLabel]=\"'Hour'\"\r\n        [debounceTime]=\"debounceTime\"\r\n        (inputChange)=\"setHourValueViaInput($event)\"\r\n        (valueChange)=\"setHourValue($event)\"></owl-date-time-timer-box>\r\n<owl-date-time-timer-box\r\n        [showDivider]=\"true\"\r\n        [upBtnAriaLabel]=\"upMinuteButtonLabel\"\r\n        [downBtnAriaLabel]=\"downMinuteButtonLabel\"\r\n        [upBtnDisabled]=\"!upMinuteEnabled()\"\r\n        [downBtnDisabled]=\"!downMinuteEnabled()\"\r\n        [value]=\"minuteValue\" [min]=\"0\" [max]=\"59\"\r\n        [step]=\"stepMinute\" [inputLabel]=\"'Minute'\"\r\n        [debounceTime]=\"debounceTime\"\r\n        (inputChange)=\"setMinuteValue($event)\"\r\n        (valueChange)=\"setMinuteValue($event)\"></owl-date-time-timer-box>\r\n<owl-date-time-timer-box\r\n        *ngIf=\"showSecondsTimer\"\r\n        [showDivider]=\"true\"\r\n        [upBtnAriaLabel]=\"upSecondButtonLabel\"\r\n        [downBtnAriaLabel]=\"downSecondButtonLabel\"\r\n        [upBtnDisabled]=\"!upSecondEnabled()\"\r\n        [downBtnDisabled]=\"!downSecondEnabled()\"\r\n        [value]=\"secondValue\" [min]=\"0\" [max]=\"59\"\r\n        [step]=\"stepSecond\" [inputLabel]=\"'Second'\"\r\n        [debounceTime]=\"debounceTime\"\r\n        (inputChange)=\"setSecondValue($event)\"\r\n        (valueChange)=\"setSecondValue($event)\"></owl-date-time-timer-box>\r\n\r\n<div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\">\r\n    <button class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\r\n            type=\"button\" tabindex=\"0\"\r\n            (click)=\"setMeridiem($event)\">\r\n        <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n            {{hour12ButtonLabel}}\r\n        </span>\r\n    </button>\r\n</div>\r\n",
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.owl-dt-timer]': 'owlDTTimerClass',
                        '[attr.tabindex]': 'owlDTTimeTabIndex'
                    },
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OwlTimerComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: ElementRef },
        { type: OwlDateTimeIntl },
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] }
    ]; };
    OwlTimerComponent.propDecorators = {
        pickerMoment: [{ type: Input }],
        minDateTime: [{ type: Input }],
        maxDateTime: [{ type: Input }],
        showSecondsTimer: [{ type: Input }],
        hour12Timer: [{ type: Input }],
        stepHour: [{ type: Input }],
        stepMinute: [{ type: Input }],
        stepSecond: [{ type: Input }],
        debounceTime: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return OwlTimerComponent;
}());
export { OwlTimerComponent };
if (false) {
    /**
     * The current picker moment
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype._pickerMoment;
    /**
     * The minimum selectable date time.
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype._minDateTime;
    /**
     * The maximum selectable date time.
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype._maxDateTime;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.isPM;
    /**
     * Whether to show the second's timer
     * @type {?}
     */
    OwlTimerComponent.prototype.showSecondsTimer;
    /**
     * Whether the timer is in hour12 format
     * @type {?}
     */
    OwlTimerComponent.prototype.hour12Timer;
    /**
     * Hours to change per step
     * @type {?}
     */
    OwlTimerComponent.prototype.stepHour;
    /**
     * Minutes to change per step
     * @type {?}
     */
    OwlTimerComponent.prototype.stepMinute;
    /**
     * Seconds to change per step
     * @type {?}
     */
    OwlTimerComponent.prototype.stepSecond;
    /**
     * Seconds to auto update time value
     * @type {?}
     */
    OwlTimerComponent.prototype.debounceTime;
    /** @type {?} */
    OwlTimerComponent.prototype.selectedChange;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.pickerIntl;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlTimerComponent.prototype.dateTimeAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvdGltZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBQ0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLFFBQVEsRUFDUixNQUFNLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFFdEM7SUF3S0ksMkJBQ1ksTUFBYyxFQUNkLE1BQWtCLEVBQ2xCLFVBQTJCLEVBQzNCLEtBQXdCLEVBQ1osZUFBbUM7UUFKL0MsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFDM0IsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUEzSG5ELFNBQUksR0FBWSxLQUFLLENBQUMsQ0FBQywyREFBMkQ7Ozs7UUFrQjFGLGFBQVEsR0FBRyxDQUFDLENBQUM7Ozs7UUFNYixlQUFVLEdBQUcsQ0FBQyxDQUFDOzs7O1FBTWYsZUFBVSxHQUFHLENBQUMsQ0FBQzs7OztRQU1mLGlCQUFZLEdBQUcsR0FBRyxDQUFDO1FBd0VuQixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFLLENBQUM7SUFnQnBDLENBQUM7SUEvSkosc0JBQ0ksMkNBQVk7Ozs7UUFEaEI7WUFFSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7Ozs7UUFFRCxVQUFp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QkFDL0IscWxFQUFxQztvQkFFckMsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLElBQUksRUFBRTt3QkFDRixzQkFBc0IsRUFBRSxpQkFBaUI7d0JBQ3pDLGlCQUFpQixFQUFFLG1CQUFtQjtxQkFDekM7O2lCQUNKOzs7O2dCQXBCRyxNQUFNO2dCQUhOLFVBQVU7Z0JBUUwsZUFBZTtnQkFWcEIsaUJBQWlCO2dCQVdaLGVBQWUsdUJBZ0xmLFFBQVE7OzsrQkE5SlosS0FBSzs4QkFhTCxLQUFLOzhCQVlMLEtBQUs7bUNBZUwsS0FBSzs4QkFNTCxLQUFLOzJCQU1MLEtBQUs7NkJBTUwsS0FBSzs2QkFNTCxLQUFLOytCQU1MLEtBQUs7aUNBd0VMLE1BQU07O0lBc01YLHdCQUFDO0NBQUEsQUFuV0QsSUFtV0M7U0F2VlksaUJBQWlCOzs7Ozs7O0lBRTFCLDBDQUF5Qjs7Ozs7O0lBYXpCLHlDQUErQjs7Ozs7O0lBWS9CLHlDQUErQjs7Ozs7SUFXL0IsaUNBQThCOzs7OztJQUs5Qiw2Q0FDMEI7Ozs7O0lBSzFCLHdDQUNxQjs7Ozs7SUFLckIscUNBQ2E7Ozs7O0lBS2IsdUNBQ2U7Ozs7O0lBS2YsdUNBQ2U7Ozs7O0lBS2YseUNBQ21COztJQXVFbkIsMkNBQ3VDOzs7OztJQVduQyxtQ0FBc0I7Ozs7O0lBQ3RCLG1DQUEwQjs7Ozs7SUFDMUIsdUNBQW1DOzs7OztJQUNuQyxrQ0FBZ0M7Ozs7O0lBQ2hDLDRDQUF1RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiB0aW1lci5jb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENvbXBvbmVudCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbnB1dCxcclxuICAgIE5nWm9uZSxcclxuICAgIE9uSW5pdCxcclxuICAgIE9wdGlvbmFsLFxyXG4gICAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE93bERhdGVUaW1lSW50bCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xyXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lVGltZXInLFxyXG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLXRpbWVyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi90aW1lci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi90aW1lci5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLm93bC1kdC10aW1lcl0nOiAnb3dsRFRUaW1lckNsYXNzJyxcclxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ293bERUVGltZVRhYkluZGV4J1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgT3dsVGltZXJDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgLyoqIFRoZSBjdXJyZW50IHBpY2tlciBtb21lbnQgKi9cclxuICAgIHByaXZhdGUgX3BpY2tlck1vbWVudDogVDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgcGlja2VyTW9tZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrZXJNb21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBpY2tlck1vbWVudCh2YWx1ZTogVCkge1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCA9XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlIHRpbWUuICovXHJcbiAgICBwcml2YXRlIF9taW5EYXRlVGltZTogVCB8IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IG1pbkRhdGVUaW1lKCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1pbkRhdGVUaW1lKHZhbHVlOiBUIHwgbnVsbCkge1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX21pbkRhdGVUaW1lID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUgdGltZS4gKi9cclxuICAgIHByaXZhdGUgX21heERhdGVUaW1lOiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgbWF4RGF0ZVRpbWUoKTogVCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhEYXRlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWF4RGF0ZVRpbWUodmFsdWU6IFQgfCBudWxsKSB7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fbWF4RGF0ZVRpbWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1BNOiBib29sZWFuID0gZmFsc2U7IC8vIGEgZmxhZyBpbmRpY2F0ZXMgdGhlIGN1cnJlbnQgdGltZXIgbW9tZW50IGlzIGluIFBNIG9yIEFNXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIHNlY29uZCdzIHRpbWVyXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzaG93U2Vjb25kc1RpbWVyOiBib29sZWFuO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0aGUgdGltZXIgaXMgaW4gaG91cjEyIGZvcm1hdFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgaG91cjEyVGltZXI6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIb3VycyB0byBjaGFuZ2UgcGVyIHN0ZXBcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHN0ZXBIb3VyID0gMTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbnV0ZXMgdG8gY2hhbmdlIHBlciBzdGVwXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzdGVwTWludXRlID0gMTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlY29uZHMgdG8gY2hhbmdlIHBlciBzdGVwXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzdGVwU2Vjb25kID0gMTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlY29uZHMgdG8gYXV0byB1cGRhdGUgdGltZSB2YWx1ZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgZGVib3VuY2VUaW1lID0gNTAwO1xyXG5cclxuICAgIGdldCBob3VyVmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5waWNrZXJNb21lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHZhbHVlIHdvdWxkIGJlIGRpc3BsYXllZCBpbiBob3VyQm94LlxyXG4gICAgICogV2UgbmVlZCB0aGlzIGJlY2F1c2UgdGhlIHZhbHVlIGRpc3BsYXllZCBpbiBob3VyQm94IGl0IG5vdFxyXG4gICAgICogdGhlIHNhbWUgYXMgdGhlIGhvdXJWYWx1ZSB3aGVuIHRoZSB0aW1lciBpcyBpbiBob3VyMTJUaW1lciBtb2RlLlxyXG4gICAgICogKi9cclxuICAgIGdldCBob3VyQm94VmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgaG91cnMgPSB0aGlzLmhvdXJWYWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmhvdXIxMlRpbWVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBob3VycztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaG91cnMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGhvdXJzID0gMTI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUE0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChob3VycyA+IDAgJiYgaG91cnMgPCAxMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1BNID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaG91cnMgPT09IDEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUE0gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGhvdXJzID4gMTIgJiYgaG91cnMgPCAyNCkge1xyXG4gICAgICAgICAgICAgICAgaG91cnMgPSBob3VycyAtIDEyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1BNID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGhvdXJzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWludXRlVmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNlY29uZFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFNlY29uZHModGhpcy5waWNrZXJNb21lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1cEhvdXJCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwudXBIb3VyTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRvd25Ib3VyQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLmRvd25Ib3VyTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHVwTWludXRlQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnVwTWludXRlTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRvd25NaW51dGVCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwuZG93bk1pbnV0ZUxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB1cFNlY29uZEJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC51cFNlY29uZExhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkb3duU2Vjb25kQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLmRvd25TZWNvbmRMYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaG91cjEyQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1BNXHJcbiAgICAgICAgICAgID8gdGhpcy5waWNrZXJJbnRsLmhvdXIxMlBNTGFiZWxcclxuICAgICAgICAgICAgOiB0aGlzLnBpY2tlckludGwuaG91cjEyQU1MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xyXG5cclxuICAgIGdldCBvd2xEVFRpbWVyQ2xhc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERUVGltZVRhYkluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICAgICAgcHJpdmF0ZSBlbG1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBwaWNrZXJJbnRsOiBPd2xEYXRlVGltZUludGwsXHJcbiAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPlxyXG4gICAgKSB7fVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb2N1cyB0byB0aGUgaG9zdCBlbGVtZW50XHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIGZvY3VzKCkge1xyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGVcclxuICAgICAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxyXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBob3VyIHZhbHVlIHZpYSB0eXBpbmcgaW50byB0aW1lciBib3ggaW5wdXRcclxuICAgICAqIFdlIG5lZWQgdGhpcyB0byBoYW5kbGUgdGhlIGhvdXIgdmFsdWUgd2hlbiB0aGUgdGltZXIgaXMgaW4gaG91cjEyIG1vZGVcclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgc2V0SG91clZhbHVlVmlhSW5wdXQoaG91cnM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmhvdXIxMlRpbWVyICYmIHRoaXMuaXNQTSAmJiBob3VycyA+PSAxICYmIGhvdXJzIDw9IDExKSB7XHJcbiAgICAgICAgICAgIGhvdXJzID0gaG91cnMgKyAxMjtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaG91cjEyVGltZXIgJiYgIXRoaXMuaXNQTSAmJiBob3VycyA9PT0gMTIpIHtcclxuICAgICAgICAgICAgaG91cnMgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRIb3VyVmFsdWUoaG91cnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRIb3VyVmFsdWUoaG91cnM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCwgaG91cnMpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChtKTtcclxuICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNaW51dGVWYWx1ZShtaW51dGVzOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCwgbWludXRlcyk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KG0pO1xyXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlY29uZFZhbHVlKHNlY29uZHM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5zZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50LCBzZWNvbmRzKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQobSk7XHJcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TWVyaWRpZW0oZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNQTSA9ICF0aGlzLmlzUE07XHJcblxyXG4gICAgICAgIGxldCBob3VycyA9IHRoaXMuaG91clZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUE0pIHtcclxuICAgICAgICAgICAgaG91cnMgPSBob3VycyArIDEyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhvdXJzID0gaG91cnMgLSAxMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChob3VycyA+PSAwICYmIGhvdXJzIDw9IDIzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SG91clZhbHVlKGhvdXJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHRoZSB1cCBob3VyIGJ1dHRvbiBpcyBlbmFibGVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB1cEhvdXJFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICF0aGlzLm1heERhdGVUaW1lIHx8XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZUhvdXJzKHRoaXMuc3RlcEhvdXIsIHRoaXMubWF4RGF0ZVRpbWUpIDwgMVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgZG93biBob3VyIGJ1dHRvbiBpcyBlbmFibGVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3duSG91ckVuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgIXRoaXMubWluRGF0ZVRpbWUgfHxcclxuICAgICAgICAgICAgdGhpcy5jb21wYXJlSG91cnMoLXRoaXMuc3RlcEhvdXIsIHRoaXMubWluRGF0ZVRpbWUpID4gLTFcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIHVwIG1pbnV0ZSBidXR0b24gaXMgZW5hYmxlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBNaW51dGVFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICF0aGlzLm1heERhdGVUaW1lIHx8XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZU1pbnV0ZXModGhpcy5zdGVwTWludXRlLCB0aGlzLm1heERhdGVUaW1lKSA8IDFcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIGRvd24gbWludXRlIGJ1dHRvbiBpcyBlbmFibGVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3duTWludXRlRW5hYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAhdGhpcy5taW5EYXRlVGltZSB8fFxyXG4gICAgICAgICAgICB0aGlzLmNvbXBhcmVNaW51dGVzKC10aGlzLnN0ZXBNaW51dGUsIHRoaXMubWluRGF0ZVRpbWUpID4gLTFcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIHVwIHNlY29uZCBidXR0b24gaXMgZW5hYmxlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBTZWNvbmRFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICF0aGlzLm1heERhdGVUaW1lIHx8XHJcbiAgICAgICAgICAgIHRoaXMuY29tcGFyZVNlY29uZHModGhpcy5zdGVwU2Vjb25kLCB0aGlzLm1heERhdGVUaW1lKSA8IDFcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIGRvd24gc2Vjb25kIGJ1dHRvbiBpcyBlbmFibGVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb3duU2Vjb25kRW5hYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAhdGhpcy5taW5EYXRlVGltZSB8fFxyXG4gICAgICAgICAgICB0aGlzLmNvbXBhcmVTZWNvbmRzKC10aGlzLnN0ZXBTZWNvbmQsIHRoaXMubWluRGF0ZVRpbWUpID4gLTFcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGlja2VyTW9tZW50J3MgaG91ciB2YWx1ZSArLy0gY2VydGFpbiBhbW91bnQgYW5kIGNvbXBhcmUgaXQgdG8gdGhlIGdpdmUgZGF0ZVxyXG4gICAgICogMSBpcyBhZnRlciB0aGUgY29tcGFyZWREYXRlXHJcbiAgICAgKiAtMSBpcyBiZWZvcmUgdGhlIGNvbXBhcmVkRGF0ZVxyXG4gICAgICogMCBpcyBlcXVhbCB0aGUgY29tcGFyZWREYXRlXHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBjb21wYXJlSG91cnMoYW1vdW50OiBudW1iZXIsIGNvbXBhcmVkRGF0ZTogVCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgaG91cnMgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCkgKyBhbW91bnQ7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuc2V0SG91cnModGhpcy5waWNrZXJNb21lbnQsIGhvdXJzKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShyZXN1bHQsIGNvbXBhcmVkRGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQaWNrZXJNb21lbnQncyBtaW51dGUgdmFsdWUgKy8tIGNlcnRhaW4gYW1vdW50IGFuZCBjb21wYXJlIGl0IHRvIHRoZSBnaXZlIGRhdGVcclxuICAgICAqIDEgaXMgYWZ0ZXIgdGhlIGNvbXBhcmVkRGF0ZVxyXG4gICAgICogLTEgaXMgYmVmb3JlIHRoZSBjb21wYXJlZERhdGVcclxuICAgICAqIDAgaXMgZXF1YWwgdGhlIGNvbXBhcmVkRGF0ZVxyXG4gICAgICogKi9cclxuICAgIHByaXZhdGUgY29tcGFyZU1pbnV0ZXMoYW1vdW50OiBudW1iZXIsIGNvbXBhcmVkRGF0ZTogVCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgbWludXRlcyA9XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpICsgYW1vdW50O1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldE1pbnV0ZXMoXHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxyXG4gICAgICAgICAgICBtaW51dGVzXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShyZXN1bHQsIGNvbXBhcmVkRGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQaWNrZXJNb21lbnQncyBzZWNvbmQgdmFsdWUgKy8tIGNlcnRhaW4gYW1vdW50IGFuZCBjb21wYXJlIGl0IHRvIHRoZSBnaXZlIGRhdGVcclxuICAgICAqIDEgaXMgYWZ0ZXIgdGhlIGNvbXBhcmVkRGF0ZVxyXG4gICAgICogLTEgaXMgYmVmb3JlIHRoZSBjb21wYXJlZERhdGVcclxuICAgICAqIDAgaXMgZXF1YWwgdGhlIGNvbXBhcmVkRGF0ZVxyXG4gICAgICogKi9cclxuICAgIHByaXZhdGUgY29tcGFyZVNlY29uZHMoYW1vdW50OiBudW1iZXIsIGNvbXBhcmVkRGF0ZTogVCk6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFNlY29uZHModGhpcy5waWNrZXJNb21lbnQpICsgYW1vdW50O1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnNldFNlY29uZHMoXHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxyXG4gICAgICAgICAgICBzZWNvbmRzXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShyZXN1bHQsIGNvbXBhcmVkRGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSB2YWxpZCBkYXRlIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJlxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcclxuICAgICAgICAgICAgPyBvYmpcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==