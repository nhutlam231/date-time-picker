/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar-month-view.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from '@angular/core';
import { CalendarCell, OwlCalendarBodyComponent } from './calendar-body.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { Subscription } from 'rxjs';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { coerceNumberProperty } from '@angular/cdk/coercion';
/** @type {?} */
var DAYS_PER_WEEK = 7;
/** @type {?} */
var WEEKS_PER_VIEW = 6;
/**
 * @template T
 */
var OwlMonthViewComponent = /** @class */ (function () {
    function OwlMonthViewComponent(cdRef, dateTimeAdapter, dateTimeFormats) {
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * Whether to hide dates in other months at the start or end of the current month.
         *
         */
        this.hideOtherMonths = false;
        /**
         * Define the first day of a week
         * Sunday: 0 ~ Saturday: 6
         *
         */
        this._firstDayOfWeek = 0;
        /**
         * The select mode of the picker;
         *
         */
        this._selectMode = 'single';
        this._selecteds = [];
        this.localeSub = Subscription.EMPTY;
        this.initiated = false;
        /**
         * An array to hold all selectedDates' value
         * the value is the day number in current month
         *
         */
        this.selectedDates = [];
        /**
         * Callback to invoke when a new date is selected
         *
         */
        this.selectedChange = new EventEmitter();
        /**
         * Callback to invoke when any date is selected.
         *
         */
        this.userSelection = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.pickerMomentChange = new EventEmitter();
    }
    Object.defineProperty(OwlMonthViewComponent.prototype, "firstDayOfWeek", {
        get: /**
         * @return {?}
         */
        function () {
            return this._firstDayOfWeek;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            val = coerceNumberProperty(val);
            if (val >= 0 && val <= 6 && val !== this._firstDayOfWeek) {
                this._firstDayOfWeek = val;
                if (this.initiated) {
                    this.generateWeekDays();
                    this.generateCalendar();
                    this.cdRef.markForCheck();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "selectMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectMode;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this._selectMode = val;
            if (this.initiated) {
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldSelected = this._selected;
            value = this.dateTimeAdapter.deserialize(value);
            this._selected = this.getValidDate(value);
            if (!this.dateTimeAdapter.isSameDay(oldSelected, this._selected)) {
                this.setSelectedDates();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "selecteds", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selecteds;
        },
        set: /**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            var _this = this;
            this._selecteds = values.map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                v = _this.dateTimeAdapter.deserialize(v);
                return _this.getValidDate(v);
            }));
            this.setSelectedDates();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "pickerMoment", {
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
            /** @type {?} */
            var oldMoment = this._pickerMoment;
            value = this.dateTimeAdapter.deserialize(value);
            this._pickerMoment =
                this.getValidDate(value) || this.dateTimeAdapter.now();
            this.firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this._pickerMoment), this.dateTimeAdapter.getMonth(this._pickerMoment), 1);
            if (!this.isSameMonth(oldMoment, this._pickerMoment) &&
                this.initiated) {
                this.generateCalendar();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "dateFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateFilter;
        },
        set: /**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            this._dateFilter = filter;
            if (this.initiated) {
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "minDate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._minDate = this.getValidDate(value);
            if (this.initiated) {
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "maxDate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._maxDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this._maxDate = this.getValidDate(value);
            if (this.initiated) {
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "weekdays", {
        get: /**
         * @return {?}
         */
        function () {
            return this._weekdays;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "days", {
        get: /**
         * @return {?}
         */
        function () {
            return this._days;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "activeCell", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.pickerMoment) {
                return (this.dateTimeAdapter.getDate(this.pickerMoment) +
                    this.firstRowOffset -
                    1);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "isInRangeMode", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.selectMode === 'range' ||
                this.selectMode === 'rangeFrom' ||
                this.selectMode === 'rangeTo');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMonthViewComponent.prototype, "owlDTCalendarView", {
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
    OwlMonthViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.generateWeekDays();
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.generateWeekDays();
            _this.generateCalendar();
            _this.cdRef.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    OwlMonthViewComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.generateCalendar();
        this.initiated = true;
    };
    /**
     * @return {?}
     */
    OwlMonthViewComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.localeSub.unsubscribe();
    };
    /**
     * Handle a calendarCell selected
     */
    /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    OwlMonthViewComponent.prototype.selectCalendarCell = /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        // Cases in which the date would not be selected
        // 1, the calendar cell is NOT enabled (is NOT valid)
        // 2, the selected date is NOT in current picker's month and the hideOtherMonths is enabled
        if (!cell.enabled || (this.hideOtherMonths && cell.out)) {
            return;
        }
        this.selectDate(cell.value);
    };
    /**
     * Handle a new date selected
     */
    /**
     * Handle a new date selected
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlMonthViewComponent.prototype.selectDate = /**
     * Handle a new date selected
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var daysDiff = date - 1;
        /** @type {?} */
        var selected = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
        this.selectedChange.emit(selected);
        this.userSelection.emit();
    };
    /**
     * Handle keydown event on calendar body
     */
    /**
     * Handle keydown event on calendar body
     * @param {?} event
     * @return {?}
     */
    OwlMonthViewComponent.prototype.handleCalendarKeydown = /**
     * Handle keydown event on calendar body
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var moment;
        switch (event.keyCode) {
            // minus 1 day
            case LEFT_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 day
            case RIGHT_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 week
            case UP_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -7);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 week
            case DOWN_ARROW:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 7);
                this.pickerMomentChange.emit(moment);
                break;
            // move to first day of current month
            case HOME:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1 - this.dateTimeAdapter.getDate(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // move to last day of current month
            case END:
                moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment) -
                    this.dateTimeAdapter.getDate(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 month (or 1 year)
            case PAGE_UP:
                moment = event.altKey
                    ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1)
                    : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 month (or 1 year)
            case PAGE_DOWN:
                moment = event.altKey
                    ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1)
                    : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // select the pickerMoment
            case ENTER:
                if (!this.dateFilter || this.dateFilter(this.pickerMoment)) {
                    this.selectDate(this.dateTimeAdapter.getDate(this.pickerMoment));
                }
                break;
            default:
                return;
        }
        this.focusActiveCell();
        event.preventDefault();
    };
    /**
     * Generate the calendar weekdays array
     * */
    /**
     * Generate the calendar weekdays array
     *
     * @private
     * @return {?}
     */
    OwlMonthViewComponent.prototype.generateWeekDays = /**
     * Generate the calendar weekdays array
     *
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var longWeekdays = this.dateTimeAdapter.getDayOfWeekNames('long');
        /** @type {?} */
        var shortWeekdays = this.dateTimeAdapter.getDayOfWeekNames('short');
        /** @type {?} */
        var narrowWeekdays = this.dateTimeAdapter.getDayOfWeekNames('narrow');
        /** @type {?} */
        var firstDayOfWeek = this.firstDayOfWeek;
        /** @type {?} */
        var weekdays = longWeekdays.map((/**
         * @param {?} long
         * @param {?} i
         * @return {?}
         */
        function (long, i) {
            return { long: long, short: shortWeekdays[i], narrow: narrowWeekdays[i] };
        }));
        this._weekdays = weekdays
            .slice(firstDayOfWeek)
            .concat(weekdays.slice(0, firstDayOfWeek));
        this.dateNames = this.dateTimeAdapter.getDateNames();
        return;
    };
    /**
     * Generate the calendar days array
     * */
    /**
     * Generate the calendar days array
     *
     * @private
     * @return {?}
     */
    OwlMonthViewComponent.prototype.generateCalendar = /**
     * Generate the calendar days array
     *
     * @private
     * @return {?}
     */
    function () {
        if (!this.pickerMoment) {
            return;
        }
        this.todayDate = null;
        // the first weekday of the month
        /** @type {?} */
        var startWeekdayOfMonth = this.dateTimeAdapter.getDay(this.firstDateOfMonth);
        /** @type {?} */
        var firstDayOfWeek = this.firstDayOfWeek;
        // the amount of days from the first date of the month
        // if it is < 0, it means the date is in previous month
        /** @type {?} */
        var daysDiff = 0 -
            ((startWeekdayOfMonth + (DAYS_PER_WEEK - firstDayOfWeek)) %
                DAYS_PER_WEEK);
        // the index of cell that contains the first date of the month
        this.firstRowOffset = Math.abs(daysDiff);
        this._days = [];
        for (var i = 0; i < WEEKS_PER_VIEW; i++) {
            /** @type {?} */
            var week = [];
            for (var j = 0; j < DAYS_PER_WEEK; j++) {
                /** @type {?} */
                var date = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
                /** @type {?} */
                var dateCell = this.createDateCell(date, daysDiff);
                // check if the date is today
                if (this.dateTimeAdapter.isSameDay(this.dateTimeAdapter.now(), date)) {
                    this.todayDate = daysDiff + 1;
                }
                week.push(dateCell);
                daysDiff += 1;
            }
            this._days.push(week);
        }
        this.setSelectedDates();
    };
    /**
     * Creates CalendarCell for days.
     */
    /**
     * Creates CalendarCell for days.
     * @private
     * @param {?} date
     * @param {?} daysDiff
     * @return {?}
     */
    OwlMonthViewComponent.prototype.createDateCell = /**
     * Creates CalendarCell for days.
     * @private
     * @param {?} date
     * @param {?} daysDiff
     * @return {?}
     */
    function (date, daysDiff) {
        // total days of the month
        /** @type {?} */
        var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment);
        /** @type {?} */
        var dateNum = this.dateTimeAdapter.getDate(date);
        // const dateName = this.dateNames[dateNum - 1];
        /** @type {?} */
        var dateName = dateNum.toString();
        /** @type {?} */
        var ariaLabel = this.dateTimeAdapter.format(date, this.dateTimeFormats.dateA11yLabel);
        // check if the date if selectable
        /** @type {?} */
        var enabled = this.isDateEnabled(date);
        // check if date is not in current month
        /** @type {?} */
        var dayValue = daysDiff + 1;
        /** @type {?} */
        var out = dayValue < 1 || dayValue > daysInMonth;
        /** @type {?} */
        var cellClass = 'owl-dt-day-' + this.dateTimeAdapter.getDay(date);
        return new CalendarCell(dayValue, dateName, ariaLabel, enabled, out, cellClass);
    };
    /**
     * Check if the date is valid
     */
    /**
     * Check if the date is valid
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlMonthViewComponent.prototype.isDateEnabled = /**
     * Check if the date is valid
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return (!!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate ||
                this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
            (!this.maxDate ||
                this.dateTimeAdapter.compare(date, this.maxDate) <= 0));
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
    OwlMonthViewComponent.prototype.getValidDate = /**
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
    /**
     * Check if the give dates are none-null and in the same month
     */
    /**
     * Check if the give dates are none-null and in the same month
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    OwlMonthViewComponent.prototype.isSameMonth = /**
     * Check if the give dates are none-null and in the same month
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    function (dateLeft, dateRight) {
        return !!(dateLeft &&
            dateRight &&
            this.dateTimeAdapter.isValid(dateLeft) &&
            this.dateTimeAdapter.isValid(dateRight) &&
            this.dateTimeAdapter.getYear(dateLeft) ===
                this.dateTimeAdapter.getYear(dateRight) &&
            this.dateTimeAdapter.getMonth(dateLeft) ===
                this.dateTimeAdapter.getMonth(dateRight));
    };
    /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     * */
    /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     *
     * @private
     * @return {?}
     */
    OwlMonthViewComponent.prototype.setSelectedDates = /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     *
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.selectedDates = [];
        if (!this.firstDateOfMonth) {
            return;
        }
        if (this.isInSingleMode && this.selected) {
            /** @type {?} */
            var dayDiff = this.dateTimeAdapter.differenceInCalendarDays(this.selected, this.firstDateOfMonth);
            this.selectedDates[0] = dayDiff + 1;
            return;
        }
        if (this.isInRangeMode && this.selecteds) {
            this.selectedDates = this.selecteds.map((/**
             * @param {?} selected
             * @return {?}
             */
            function (selected) {
                if (_this.dateTimeAdapter.isValid(selected)) {
                    /** @type {?} */
                    var dayDiff = _this.dateTimeAdapter.differenceInCalendarDays(selected, _this.firstDateOfMonth);
                    return dayDiff + 1;
                }
                else {
                    return null;
                }
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    OwlMonthViewComponent.prototype.focusActiveCell = /**
     * @private
     * @return {?}
     */
    function () {
        this.calendarBodyElm.focusActiveCell();
    };
    OwlMonthViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-date-time-month-view',
                    exportAs: 'owlYearView',
                    template: "<table class=\"owl-dt-calendar-table owl-dt-calendar-month-table\"\r\n       [class.owl-dt-calendar-only-current-month]=\"hideOtherMonths\">\r\n    <thead class=\"owl-dt-calendar-header\">\r\n    <tr class=\"owl-dt-weekdays\">\r\n        <th *ngFor=\"let weekday of weekdays\"\r\n            [attr.aria-label]=\"weekday.long\"\r\n            class=\"owl-dt-weekday\" scope=\"col\">\r\n            <span>{{weekday.short}}</span>\r\n        </th>\r\n    </tr>\r\n    <tr>\r\n        <th class=\"owl-dt-calendar-table-divider\" aria-hidden=\"true\" colspan=\"7\"></th>\r\n    </tr>\r\n    </thead>\r\n    <tbody owl-date-time-calendar-body role=\"grid\"\r\n           [rows]=\"days\" [todayValue]=\"todayDate\"\r\n           [selectedValues]=\"selectedDates\"\r\n           [selectMode]=\"selectMode\"\r\n           [activeCell]=\"activeCell\"\r\n           (keydown)=\"handleCalendarKeydown($event)\"\r\n           (select)=\"selectCalendarCell($event)\">\r\n    </tbody>\r\n</table>\r\n",
                    host: {
                        '[class.owl-dt-calendar-view]': 'owlDTCalendarView'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OwlMonthViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
    ]; };
    OwlMonthViewComponent.propDecorators = {
        hideOtherMonths: [{ type: Input }],
        firstDayOfWeek: [{ type: Input }],
        selectMode: [{ type: Input }],
        selected: [{ type: Input }],
        selecteds: [{ type: Input }],
        pickerMoment: [{ type: Input }],
        dateFilter: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        selectedChange: [{ type: Output }],
        userSelection: [{ type: Output }],
        pickerMomentChange: [{ type: Output }],
        calendarBodyElm: [{ type: ViewChild, args: [OwlCalendarBodyComponent, { static: true },] }]
    };
    return OwlMonthViewComponent;
}());
export { OwlMonthViewComponent };
if (false) {
    /**
     * Whether to hide dates in other months at the start or end of the current month.
     *
     * @type {?}
     */
    OwlMonthViewComponent.prototype.hideOtherMonths;
    /**
     * Define the first day of a week
     * Sunday: 0 ~ Saturday: 6
     *
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._firstDayOfWeek;
    /**
     * The select mode of the picker;
     *
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._selectMode;
    /**
     * The currently selected date.
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._pickerMoment;
    /**
     * A function used to filter which dates are selectable
     *
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._dateFilter;
    /**
     * The minimum selectable date.
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._minDate;
    /**
     * The maximum selectable date.
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._weekdays;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype._days;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.firstDateOfMonth;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.localeSub;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.initiated;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.dateNames;
    /**
     * The date of the month that today falls on.
     *
     * @type {?}
     */
    OwlMonthViewComponent.prototype.todayDate;
    /**
     * An array to hold all selectedDates' value
     * the value is the day number in current month
     *
     * @type {?}
     */
    OwlMonthViewComponent.prototype.selectedDates;
    /** @type {?} */
    OwlMonthViewComponent.prototype.firstRowOffset;
    /**
     * Callback to invoke when a new date is selected
     *
     * @type {?}
     */
    OwlMonthViewComponent.prototype.selectedChange;
    /**
     * Callback to invoke when any date is selected.
     *
     * @type {?}
     */
    OwlMonthViewComponent.prototype.userSelection;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    OwlMonthViewComponent.prototype.pickerMomentChange;
    /**
     * The body of calendar table
     * @type {?}
     */
    OwlMonthViewComponent.prototype.calendarBodyElm;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @private
     */
    OwlMonthViewComponent.prototype.dateTimeFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxZQUFZLEVBQ1osd0JBQXdCLEVBQzNCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFDSCxxQkFBcUIsRUFFeEIsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFDSCxVQUFVLEVBQ1YsR0FBRyxFQUNILEtBQUssRUFDTCxJQUFJLEVBQ0osVUFBVSxFQUNWLFNBQVMsRUFDVCxPQUFPLEVBQ1AsV0FBVyxFQUNYLFFBQVEsRUFDWCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztJQUV2RCxhQUFhLEdBQUcsQ0FBQzs7SUFDakIsY0FBYyxHQUFHLENBQUM7Ozs7QUFFeEI7SUFvUEksK0JBQ1ksS0FBd0IsRUFDWixlQUFtQyxFQUcvQyxlQUFtQztRQUpuQyxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUNaLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUcvQyxvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7Ozs7O1FBeE8vQyxvQkFBZSxHQUFZLEtBQUssQ0FBQzs7Ozs7O1FBTXpCLG9CQUFlLEdBQVcsQ0FBQyxD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QU1qQyxnREFBb0M7Ozs7Ozs7SUFzQnBDLDRDQUEyQzs7Ozs7O0lBZTNDLDBDQUE0Qjs7Ozs7SUFnQjVCLDJDQUE2Qjs7Ozs7SUFjN0IsOENBQXlCOzs7Ozs7O0lBNkJ6Qiw0Q0FBMEM7Ozs7OztJQWUxQyx5Q0FBMkI7Ozs7OztJQWdCM0IseUNBQTJCOzs7OztJQWdCM0IsMENBQTBFOzs7OztJQUsxRSxzQ0FBZ0M7Ozs7O0lBMkJoQyxpREFBNEI7Ozs7O0lBRTVCLDBDQUFxRDs7Ozs7SUFFckQsMENBQTBCOzs7OztJQUUxQiwwQ0FBNEI7Ozs7OztJQUs1QiwwQ0FBZ0M7Ozs7Ozs7SUFNaEMsOENBQW9DOztJQUdwQywrQ0FBOEI7Ozs7OztJQUs5QiwrQ0FDdUQ7Ozs7OztJQUt2RCw4Q0FDa0Q7Ozs7O0lBR2xELG1EQUNxRTs7Ozs7SUFHckUsZ0RBQzBDOzs7OztJQU90QyxzQ0FBZ0M7Ozs7O0lBQ2hDLGdEQUF1RDs7Ozs7SUFDdkQsZ0RBRTJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGNhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEFmdGVyQ29udGVudEluaXQsXHJcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICAgIENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5qZWN0LFxyXG4gICAgSW5wdXQsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPcHRpb25hbCxcclxuICAgIE91dHB1dCxcclxuICAgIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgQ2FsZW5kYXJDZWxsLFxyXG4gICAgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50XHJcbn0gZnJvbSAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBPV0xfREFURV9USU1FX0ZPUk1BVFMsXHJcbiAgICBPd2xEYXRlVGltZUZvcm1hdHNcclxufSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZWxlY3RNb2RlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xyXG5pbXBvcnQge1xyXG4gICAgRE9XTl9BUlJPVyxcclxuICAgIEVORCxcclxuICAgIEVOVEVSLFxyXG4gICAgSE9NRSxcclxuICAgIExFRlRfQVJST1csXHJcbiAgICBQQUdFX0RPV04sXHJcbiAgICBQQUdFX1VQLFxyXG4gICAgUklHSFRfQVJST1csXHJcbiAgICBVUF9BUlJPV1xyXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XHJcbmltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuXHJcbmNvbnN0IERBWVNfUEVSX1dFRUsgPSA3O1xyXG5jb25zdCBXRUVLU19QRVJfVklFVyA9IDY7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS1tb250aC12aWV3JyxcclxuICAgIGV4cG9ydEFzOiAnb3dsWWVhclZpZXcnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLW1vbnRoLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLXZpZXddJzogJ293bERUQ2FsZW5kYXJWaWV3J1xyXG4gICAgfSxcclxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE93bE1vbnRoVmlld0NvbXBvbmVudDxUPlxyXG4gICAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdG8gaGlkZSBkYXRlcyBpbiBvdGhlciBtb250aHMgYXQgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgY3VycmVudCBtb250aC5cclxuICAgICAqICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgaGlkZU90aGVyTW9udGhzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmUgdGhlIGZpcnN0IGRheSBvZiBhIHdlZWtcclxuICAgICAqIFN1bmRheTogMCB+IFNhdHVyZGF5OiA2XHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBfZmlyc3REYXlPZldlZWs6IG51bWJlciA9IDA7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IGZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcnN0RGF5T2ZXZWVrO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBmaXJzdERheU9mV2Vlayh2YWw6IG51bWJlcikge1xyXG4gICAgICAgIHZhbCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbCk7XHJcbiAgICAgICAgaWYgKHZhbCA+PSAwICYmIHZhbCA8PSA2ICYmIHZhbCAhPT0gdGhpcy5fZmlyc3REYXlPZldlZWspIHtcclxuICAgICAgICAgICAgdGhpcy5fZmlyc3REYXlPZldlZWsgPSB2YWw7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVXZWVrRGF5cygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHNlbGVjdCBtb2RlIG9mIHRoZSBwaWNrZXI7XHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0TW9kZTogU2VsZWN0TW9kZSA9ICdzaW5nbGUnO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZWxlY3RNb2RlKHZhbDogU2VsZWN0TW9kZSkge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPSB2YWw7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFQgfCBudWxsO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBzZWxlY3RlZCgpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcclxuICAgICAgICBjb25zdCBvbGRTZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGVkO1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzU2FtZURheShvbGRTZWxlY3RlZCwgdGhpcy5fc2VsZWN0ZWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWREYXRlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZHM6IFRbXSA9IFtdO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBzZWxlY3RlZHMoKTogVFtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZWxlY3RlZHModmFsdWVzOiBUW10pIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZHMgPSB2YWx1ZXMubWFwKHYgPT4ge1xyXG4gICAgICAgICAgICB2ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFZhbGlkRGF0ZSh2KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkRGF0ZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQ7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHBpY2tlck1vbWVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyTW9tZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwaWNrZXJNb21lbnQodmFsdWU6IFQpIHtcclxuICAgICAgICBjb25zdCBvbGRNb21lbnQgPSB0aGlzLl9waWNrZXJNb21lbnQ7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50ID1cclxuICAgICAgICAgICAgdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xyXG5cclxuICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuX3BpY2tlck1vbWVudCksXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMuX3BpY2tlck1vbWVudCksXHJcbiAgICAgICAgICAgIDFcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICF0aGlzLmlzU2FtZU1vbnRoKG9sZE1vbWVudCwgdGhpcy5fcGlja2VyTW9tZW50KSAmJlxyXG4gICAgICAgICAgICB0aGlzLmluaXRpYXRlZFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlXHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBfZGF0ZUZpbHRlcjogKGRhdGU6IFQpID0+IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IGRhdGVGaWx0ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVGaWx0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRhdGVGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogVCkgPT4gYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2RhdGVGaWx0ZXIgPSBmaWx0ZXI7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gICAgcHJpdmF0ZSBfbWluRGF0ZTogVCB8IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IG1pbkRhdGUoKTogVCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtaW5EYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gICAgcHJpdmF0ZSBfbWF4RGF0ZTogVCB8IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IG1heERhdGUoKTogVCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtYXhEYXRlKHZhbHVlOiBUIHwgbnVsbCkge1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX21heERhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfd2Vla2RheXM6IEFycmF5PHsgbG9uZzogc3RyaW5nOyBzaG9ydDogc3RyaW5nOyBuYXJyb3c6IHN0cmluZyB9PjtcclxuICAgIGdldCB3ZWVrZGF5cygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF5czogQ2FsZW5kYXJDZWxsW11bXTtcclxuICAgIGdldCBkYXlzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXlzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBhY3RpdmVDZWxsKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMucGlja2VyTW9tZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KSArXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Um93T2Zmc2V0IC1cclxuICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpcnN0RGF0ZU9mTW9udGg6IFQ7XHJcblxyXG4gICAgcHJpdmF0ZSBsb2NhbGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgICBwcml2YXRlIGluaXRpYXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgZGF0ZU5hbWVzOiBzdHJpbmdbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkYXRlIG9mIHRoZSBtb250aCB0aGF0IHRvZGF5IGZhbGxzIG9uLlxyXG4gICAgICogKi9cclxuICAgIHB1YmxpYyB0b2RheURhdGU6IG51bWJlciB8IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBhcnJheSB0byBob2xkIGFsbCBzZWxlY3RlZERhdGVzJyB2YWx1ZVxyXG4gICAgICogdGhlIHZhbHVlIGlzIHRoZSBkYXkgbnVtYmVyIGluIGN1cnJlbnQgbW9udGhcclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWREYXRlczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICAvLyB0aGUgaW5kZXggb2YgY2VsbCB0aGF0IGNvbnRhaW5zIHRoZSBmaXJzdCBkYXRlIG9mIHRoZSBtb250aFxyXG4gICAgcHVibGljIGZpcnN0Um93T2Zmc2V0OiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIG5ldyBkYXRlIGlzIHNlbGVjdGVkXHJcbiAgICAgKiAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICByZWFkb25seSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VCB8IG51bGw+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhbnkgZGF0ZSBpcyBzZWxlY3RlZC5cclxuICAgICAqICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHJlYWRvbmx5IHVzZXJTZWxlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gICAgLyoqIEVtaXRzIHdoZW4gYW55IGRhdGUgaXMgYWN0aXZhdGVkLiAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICByZWFkb25seSBwaWNrZXJNb21lbnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxUPiA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcclxuXHJcbiAgICAvKiogVGhlIGJvZHkgb2YgY2FsZW5kYXIgdGFibGUgKi9cclxuICAgIEBWaWV3Q2hpbGQoT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KVxyXG4gICAgY2FsZW5kYXJCb2R5RWxtOiBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQ7XHJcblxyXG4gICAgZ2V0IG93bERUQ2FsZW5kYXJWaWV3KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXHJcbiAgICAgICAgQE9wdGlvbmFsKClcclxuICAgICAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcclxuICAgICAgICBwcml2YXRlIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzXHJcbiAgICApIHt9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVXZWVrRGF5cygpO1xyXG5cclxuICAgICAgICB0aGlzLmxvY2FsZVN1YiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmxvY2FsZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVdlZWtEYXlzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxvY2FsZVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGEgY2FsZW5kYXJDZWxsIHNlbGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RDYWxlbmRhckNlbGwoY2VsbDogQ2FsZW5kYXJDZWxsKTogdm9pZCB7XHJcbiAgICAgICAgLy8gQ2FzZXMgaW4gd2hpY2ggdGhlIGRhdGUgd291bGQgbm90IGJlIHNlbGVjdGVkXHJcbiAgICAgICAgLy8gMSwgdGhlIGNhbGVuZGFyIGNlbGwgaXMgTk9UIGVuYWJsZWQgKGlzIE5PVCB2YWxpZClcclxuICAgICAgICAvLyAyLCB0aGUgc2VsZWN0ZWQgZGF0ZSBpcyBOT1QgaW4gY3VycmVudCBwaWNrZXIncyBtb250aCBhbmQgdGhlIGhpZGVPdGhlck1vbnRocyBpcyBlbmFibGVkXHJcbiAgICAgICAgaWYgKCFjZWxsLmVuYWJsZWQgfHwgKHRoaXMuaGlkZU90aGVyTW9udGhzICYmIGNlbGwub3V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdERhdGUoY2VsbC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgYSBuZXcgZGF0ZSBzZWxlY3RlZFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNlbGVjdERhdGUoZGF0ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZGF5c0RpZmYgPSBkYXRlIC0gMTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcclxuICAgICAgICAgICAgdGhpcy5maXJzdERhdGVPZk1vbnRoLFxyXG4gICAgICAgICAgICBkYXlzRGlmZlxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChzZWxlY3RlZCk7XHJcbiAgICAgICAgdGhpcy51c2VyU2VsZWN0aW9uLmVtaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBrZXlkb3duIGV2ZW50IG9uIGNhbGVuZGFyIGJvZHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUNhbGVuZGFyS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBtb21lbnQ7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIG1pbnVzIDEgZGF5XHJcbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcclxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAtMVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIDEgZGF5XHJcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gbWludXMgMSB3ZWVrXHJcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgLTdcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCAxIHdlZWtcclxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIDdcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIG1vdmUgdG8gZmlyc3QgZGF5IG9mIGN1cnJlbnQgbW9udGhcclxuICAgICAgICAgICAgY2FzZSBIT01FOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIDEgLSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gbW92ZSB0byBsYXN0IGRheSBvZiBjdXJyZW50IG1vbnRoXHJcbiAgICAgICAgICAgIGNhc2UgRU5EOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKHRoaXMucGlja2VyTW9tZW50KSAtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBtaW51cyAxIG1vbnRoIChvciAxIHllYXIpXHJcbiAgICAgICAgICAgIGNhc2UgUEFHRV9VUDpcclxuICAgICAgICAgICAgICAgIG1vbWVudCA9IGV2ZW50LmFsdEtleVxyXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAtMVxyXG4gICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLTFcclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCAxIG1vbnRoIChvciAxIHllYXIpXHJcbiAgICAgICAgICAgIGNhc2UgUEFHRV9ET1dOOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gZXZlbnQuYWx0S2V5XHJcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIHNlbGVjdCB0aGUgcGlja2VyTW9tZW50XHJcbiAgICAgICAgICAgIGNhc2UgRU5URVI6XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIodGhpcy5waWNrZXJNb21lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3REYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZm9jdXNBY3RpdmVDZWxsKCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIHRoZSBjYWxlbmRhciB3ZWVrZGF5cyBhcnJheVxyXG4gICAgICogKi9cclxuICAgIHByaXZhdGUgZ2VuZXJhdGVXZWVrRGF5cygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBsb25nV2Vla2RheXMgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXlPZldlZWtOYW1lcygnbG9uZycpO1xyXG4gICAgICAgIGNvbnN0IHNob3J0V2Vla2RheXMgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXlPZldlZWtOYW1lcygnc2hvcnQnKTtcclxuICAgICAgICBjb25zdCBuYXJyb3dXZWVrZGF5cyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERheU9mV2Vla05hbWVzKCduYXJyb3cnKTtcclxuICAgICAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IHRoaXMuZmlyc3REYXlPZldlZWs7XHJcblxyXG4gICAgICAgIGNvbnN0IHdlZWtkYXlzID0gbG9uZ1dlZWtkYXlzLm1hcCgobG9uZywgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4geyBsb25nLCBzaG9ydDogc2hvcnRXZWVrZGF5c1tpXSwgbmFycm93OiBuYXJyb3dXZWVrZGF5c1tpXSB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLl93ZWVrZGF5cyA9IHdlZWtkYXlzXHJcbiAgICAgICAgICAgIC5zbGljZShmaXJzdERheU9mV2VlaylcclxuICAgICAgICAgICAgLmNvbmNhdCh3ZWVrZGF5cy5zbGljZSgwLCBmaXJzdERheU9mV2VlaykpO1xyXG5cclxuICAgICAgICB0aGlzLmRhdGVOYW1lcyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGVOYW1lcygpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZSB0aGUgY2FsZW5kYXIgZGF5cyBhcnJheVxyXG4gICAgICogKi9cclxuICAgIHByaXZhdGUgZ2VuZXJhdGVDYWxlbmRhcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucGlja2VyTW9tZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG9kYXlEYXRlID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gdGhlIGZpcnN0IHdlZWtkYXkgb2YgdGhlIG1vbnRoXHJcbiAgICAgICAgY29uc3Qgc3RhcnRXZWVrZGF5T2ZNb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERheShcclxuICAgICAgICAgICAgdGhpcy5maXJzdERhdGVPZk1vbnRoXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IHRoaXMuZmlyc3REYXlPZldlZWs7XHJcblxyXG4gICAgICAgIC8vIHRoZSBhbW91bnQgb2YgZGF5cyBmcm9tIHRoZSBmaXJzdCBkYXRlIG9mIHRoZSBtb250aFxyXG4gICAgICAgIC8vIGlmIGl0IGlzIDwgMCwgaXQgbWVhbnMgdGhlIGRhdGUgaXMgaW4gcHJldmlvdXMgbW9udGhcclxuICAgICAgICBsZXQgZGF5c0RpZmYgPVxyXG4gICAgICAgICAgICAwIC1cclxuICAgICAgICAgICAgKChzdGFydFdlZWtkYXlPZk1vbnRoICsgKERBWVNfUEVSX1dFRUsgLSBmaXJzdERheU9mV2VlaykpICVcclxuICAgICAgICAgICAgICAgIERBWVNfUEVSX1dFRUspO1xyXG5cclxuICAgICAgICAvLyB0aGUgaW5kZXggb2YgY2VsbCB0aGF0IGNvbnRhaW5zIHRoZSBmaXJzdCBkYXRlIG9mIHRoZSBtb250aFxyXG4gICAgICAgIHRoaXMuZmlyc3RSb3dPZmZzZXQgPSBNYXRoLmFicyhkYXlzRGlmZik7XHJcblxyXG4gICAgICAgIHRoaXMuX2RheXMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFdFRUtTX1BFUl9WSUVXOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3Qgd2VlayA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IERBWVNfUEVSX1dFRUs7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGgsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF5c0RpZmZcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlQ2VsbCA9IHRoaXMuY3JlYXRlRGF0ZUNlbGwoZGF0ZSwgZGF5c0RpZmYpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBkYXRlIGlzIHRvZGF5XHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNTYW1lRGF5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9kYXlEYXRlID0gZGF5c0RpZmYgKyAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHdlZWsucHVzaChkYXRlQ2VsbCk7XHJcbiAgICAgICAgICAgICAgICBkYXlzRGlmZiArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2RheXMucHVzaCh3ZWVrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWREYXRlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBDYWxlbmRhckNlbGwgZm9yIGRheXMuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRGF0ZUNlbGwoZGF0ZTogVCwgZGF5c0RpZmY6IG51bWJlcik6IENhbGVuZGFyQ2VsbCB7XHJcbiAgICAgICAgLy8gdG90YWwgZGF5cyBvZiB0aGUgbW9udGhcclxuICAgICAgICBjb25zdCBkYXlzSW5Nb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKFxyXG4gICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgZGF0ZU51bSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUoZGF0ZSk7XHJcbiAgICAgICAgLy8gY29uc3QgZGF0ZU5hbWUgPSB0aGlzLmRhdGVOYW1lc1tkYXRlTnVtIC0gMV07XHJcbiAgICAgICAgY29uc3QgZGF0ZU5hbWUgPSBkYXRlTnVtLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY29uc3QgYXJpYUxhYmVsID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxyXG4gICAgICAgICAgICBkYXRlLFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5kYXRlQTExeUxhYmVsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGRhdGUgaWYgc2VsZWN0YWJsZVxyXG4gICAgICAgIGNvbnN0IGVuYWJsZWQgPSB0aGlzLmlzRGF0ZUVuYWJsZWQoZGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIGRhdGUgaXMgbm90IGluIGN1cnJlbnQgbW9udGhcclxuICAgICAgICBjb25zdCBkYXlWYWx1ZSA9IGRheXNEaWZmICsgMTtcclxuICAgICAgICBjb25zdCBvdXQgPSBkYXlWYWx1ZSA8IDEgfHwgZGF5VmFsdWUgPiBkYXlzSW5Nb250aDtcclxuICAgICAgICBjb25zdCBjZWxsQ2xhc3MgPSAnb3dsLWR0LWRheS0nICsgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF5KGRhdGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IENhbGVuZGFyQ2VsbChcclxuICAgICAgICAgICAgZGF5VmFsdWUsXHJcbiAgICAgICAgICAgIGRhdGVOYW1lLFxyXG4gICAgICAgICAgICBhcmlhTGFiZWwsXHJcbiAgICAgICAgICAgIGVuYWJsZWQsXHJcbiAgICAgICAgICAgIG91dCxcclxuICAgICAgICAgICAgY2VsbENsYXNzXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHRoZSBkYXRlIGlzIHZhbGlkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNEYXRlRW5hYmxlZChkYXRlOiBUKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgISFkYXRlICYmXHJcbiAgICAgICAgICAgICghdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlKSkgJiZcclxuICAgICAgICAgICAgKCF0aGlzLm1pbkRhdGUgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZGF0ZSwgdGhpcy5taW5EYXRlKSA+PSAwKSAmJlxyXG4gICAgICAgICAgICAoIXRoaXMubWF4RGF0ZSB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlLCB0aGlzLm1heERhdGUpIDw9IDApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhIHZhbGlkIGRhdGUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQob2JqKVxyXG4gICAgICAgICAgICA/IG9ialxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgZ2l2ZSBkYXRlcyBhcmUgbm9uZS1udWxsIGFuZCBpbiB0aGUgc2FtZSBtb250aFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNTYW1lTW9udGgoZGF0ZUxlZnQ6IFQsIGRhdGVSaWdodDogVCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhIShcclxuICAgICAgICAgICAgZGF0ZUxlZnQgJiZcclxuICAgICAgICAgICAgZGF0ZVJpZ2h0ICYmXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQoZGF0ZUxlZnQpICYmXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQoZGF0ZVJpZ2h0KSAmJlxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGVMZWZ0KSA9PT1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZVJpZ2h0KSAmJlxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlTGVmdCkgPT09XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlUmlnaHQpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgc2VsZWN0ZWREYXRlcyB2YWx1ZS5cclxuICAgICAqIEluIHNpbmdsZSBtb2RlLCBpdCBoYXMgb25seSBvbmUgdmFsdWUgd2hpY2ggcmVwcmVzZW50IHRoZSBzZWxlY3RlZCBkYXRlXHJcbiAgICAgKiBJbiByYW5nZSBtb2RlLCBpdCB3b3VsZCBoYXMgdHdvIHZhbHVlcywgb25lIGZvciB0aGUgZnJvbVZhbHVlIGFuZCB0aGUgb3RoZXIgZm9yIHRoZSB0b1ZhbHVlXHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3RlZERhdGVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlcyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZmlyc3REYXRlT2ZNb250aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSAmJiB0aGlzLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRheURpZmYgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdERhdGVPZk1vbnRoXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlc1swXSA9IGRheURpZmYgKyAxO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlICYmIHRoaXMuc2VsZWN0ZWRzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlcyA9IHRoaXMuc2VsZWN0ZWRzLm1hcChzZWxlY3RlZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChzZWxlY3RlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXlEaWZmID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdERhdGVPZk1vbnRoXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF5RGlmZiArIDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmb2N1c0FjdGl2ZUNlbGwoKSB7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhckJvZHlFbG0uZm9jdXNBY3RpdmVDZWxsKCk7XHJcbiAgICB9XHJcbn1cclxuIl19