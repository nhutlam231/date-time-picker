/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar-multi-year-view.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Optional, Output, ViewChild } from '@angular/core';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { CalendarCell, OwlCalendarBodyComponent } from './calendar-body.component';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
/** @type {?} */
export var YEARS_PER_ROW = 3;
/** @type {?} */
export var YEAR_ROWS = 7;
/**
 * @template T
 */
var OwlMultiYearViewComponent = /** @class */ (function () {
    function OwlMultiYearViewComponent(cdRef, pickerIntl, dateTimeAdapter) {
        this.cdRef = cdRef;
        this.pickerIntl = pickerIntl;
        this.dateTimeAdapter = dateTimeAdapter;
        /**
         * The select mode of the picker;
         *
         */
        this._selectMode = 'single';
        this._selecteds = [];
        this.initiated = false;
        /**
         * Callback to invoke when a new month is selected
         *
         */
        this.change = new EventEmitter();
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         *
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.pickerMomentChange = new EventEmitter();
        /**
         * Emits when use keyboard enter to select a calendar cell
         */
        this.keyboardEnter = new EventEmitter();
    }
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "selectMode", {
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
                this.setSelectedYears();
                this.cdRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "selected", {
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
                this.setSelectedYears();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "selecteds", {
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
            this.setSelectedYears();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "pickerMoment", {
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
            this._pickerMoment = this.getValidDate(value) || this.dateTimeAdapter.now();
            if (oldMoment && this._pickerMoment &&
                !this.isSameYearList(oldMoment, this._pickerMoment)) {
                this.generateYearList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "dateFilter", {
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
                this.generateYearList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "minDate", {
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
                this.generateYearList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "maxDate", {
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
                this.generateYearList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "todayYear", {
        get: /**
         * @return {?}
         */
        function () {
            return this._todayYear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "years", {
        get: /**
         * @return {?}
         */
        function () {
            return this._years;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "selectedYears", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectedYears;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "isInRangeMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectMode === 'range' || this.selectMode === 'rangeFrom'
                || this.selectMode === 'rangeTo';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "activeCell", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._pickerMoment) {
                return this.dateTimeAdapter.getYear(this._pickerMoment) % (YEARS_PER_ROW * YEAR_ROWS);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "tableHeader", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._years && this._years.length > 0) {
                return this._years[0][0].displayValue + " ~ " + this._years[YEAR_ROWS - 1][YEARS_PER_ROW - 1].displayValue;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "prevButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.prevMultiYearLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "nextButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.nextMultiYearLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "owlDTCalendarView", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlMultiYearViewComponent.prototype, "owlDTCalendarMultiYearView", {
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
    OwlMultiYearViewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._todayYear = this.dateTimeAdapter.getYear(this.dateTimeAdapter.now());
        this.generateYearList();
        this.initiated = true;
    };
    /**
     * Handle a calendarCell selected
     */
    /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.selectCalendarCell = /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        this.selectYear(cell.value);
    };
    /**
     * @private
     * @param {?} year
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.selectYear = /**
     * @private
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.yearSelected.emit(this.dateTimeAdapter.createDate(year, 0, 1));
        /** @type {?} */
        var firstDateOfMonth = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), 1);
        /** @type {?} */
        var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
        /** @type {?} */
        var selected = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
        this.change.emit(selected);
    };
    /**
     * Generate the previous year list
     * */
    /**
     * Generate the previous year list
     *
     * @param {?} event
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.prevYearList = /**
     * Generate the previous year list
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1 * YEAR_ROWS * YEARS_PER_ROW);
        this.generateYearList();
        event.preventDefault();
    };
    /**
     * Generate the next year list
     * */
    /**
     * Generate the next year list
     *
     * @param {?} event
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.nextYearList = /**
     * Generate the next year list
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, YEAR_ROWS * YEARS_PER_ROW);
        this.generateYearList();
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.generateYearList = /**
     * @return {?}
     */
    function () {
        this._years = [];
        /** @type {?} */
        var pickerMomentYear = this.dateTimeAdapter.getYear(this._pickerMoment);
        /** @type {?} */
        var offset = pickerMomentYear % (YEARS_PER_ROW * YEAR_ROWS);
        for (var i = 0; i < YEAR_ROWS; i++) {
            /** @type {?} */
            var row = [];
            for (var j = 0; j < YEARS_PER_ROW; j++) {
                /** @type {?} */
                var year = pickerMomentYear - offset + (j + i * YEARS_PER_ROW);
                /** @type {?} */
                var yearCell = this.createYearCell(year);
                row.push(yearCell);
            }
            this._years.push(row);
        }
        return;
    };
    /** Whether the previous period button is enabled. */
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.previousEnabled = /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    function () {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this.isSameYearList(this._pickerMoment, this.minDate);
    };
    /** Whether the next period button is enabled. */
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.nextEnabled = /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    function () {
        return !this.maxDate || !this.isSameYearList(this._pickerMoment, this.maxDate);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.handleCalendarKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var moment;
        switch (event.keyCode) {
            // minus 1 year
            case LEFT_ARROW:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 year
            case RIGHT_ARROW:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 3 years
            case UP_ARROW:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -1 * YEARS_PER_ROW);
                this.pickerMomentChange.emit(moment);
                break;
            // add 3 years
            case DOWN_ARROW:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, YEARS_PER_ROW);
                this.pickerMomentChange.emit(moment);
                break;
            // go to the first year of the year page
            case HOME:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -this.dateTimeAdapter.getYear(this._pickerMoment) % (YEARS_PER_ROW * YEAR_ROWS));
                this.pickerMomentChange.emit(moment);
                break;
            // go to the last year of the year page
            case END:
                moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, (YEARS_PER_ROW * YEAR_ROWS) - this.dateTimeAdapter.getYear(this._pickerMoment) % (YEARS_PER_ROW * YEAR_ROWS) - 1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 year page (or 10 year pages)
            case PAGE_UP:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? -10 * (YEARS_PER_ROW * YEAR_ROWS) : -1 * (YEARS_PER_ROW * YEAR_ROWS));
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 year page (or 10 year pages)
            case PAGE_DOWN:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? 10 * (YEARS_PER_ROW * YEAR_ROWS) : (YEARS_PER_ROW * YEAR_ROWS));
                this.pickerMomentChange.emit(moment);
                break;
            case ENTER:
                this.selectYear(this.dateTimeAdapter.getYear(this._pickerMoment));
                this.keyboardEnter.emit();
                break;
            default:
                return;
        }
        this.focusActiveCell();
        event.preventDefault();
    };
    /**
     * Creates an CalendarCell for the given year.
     */
    /**
     * Creates an CalendarCell for the given year.
     * @private
     * @param {?} year
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.createYearCell = /**
     * Creates an CalendarCell for the given year.
     * @private
     * @param {?} year
     * @return {?}
     */
    function (year) {
        /** @type {?} */
        var startDateOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
        /** @type {?} */
        var ariaLabel = this.dateTimeAdapter.getYearName(startDateOfYear);
        /** @type {?} */
        var cellClass = 'owl-dt-year-' + year;
        return new CalendarCell(year, year.toString(), ariaLabel, this.isYearEnabled(year), false, cellClass);
    };
    /**
     * @private
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.setSelectedYears = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._selectedYears = [];
        if (this.isInSingleMode && this.selected) {
            this._selectedYears[0] = this.dateTimeAdapter.getYear(this.selected);
        }
        if (this.isInRangeMode && this.selecteds) {
            this._selectedYears = this.selecteds.map((/**
             * @param {?} selected
             * @return {?}
             */
            function (selected) {
                if (_this.dateTimeAdapter.isValid(selected)) {
                    return _this.dateTimeAdapter.getYear(selected);
                }
                else {
                    return null;
                }
            }));
        }
    };
    /** Whether the given year is enabled. */
    /**
     * Whether the given year is enabled.
     * @private
     * @param {?} year
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.isYearEnabled = /**
     * Whether the given year is enabled.
     * @private
     * @param {?} year
     * @return {?}
     */
    function (year) {
        // disable if the year is greater than maxDate lower than minDate
        if (year === undefined || year === null ||
            (this.maxDate && year > this.dateTimeAdapter.getYear(this.maxDate)) ||
            (this.minDate && year < this.dateTimeAdapter.getYear(this.minDate))) {
            return false;
        }
        // enable if it reaches here and there's no filter defined
        if (!this.dateFilter) {
            return true;
        }
        /** @type {?} */
        var firstOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
        // If any date in the year is enabled count the year as enabled.
        for (var date = firstOfYear; this.dateTimeAdapter.getYear(date) == year; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.isSameYearList = /**
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    function (date1, date2) {
        return Math.floor(this.dateTimeAdapter.getYear(date1) / (YEARS_PER_ROW * YEAR_ROWS)) ===
            Math.floor(this.dateTimeAdapter.getYear(date2) / (YEARS_PER_ROW * YEAR_ROWS));
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
    OwlMultiYearViewComponent.prototype.getValidDate = /**
     * Get a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return (this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj)) ? obj : null;
    };
    /**
     * @private
     * @return {?}
     */
    OwlMultiYearViewComponent.prototype.focusActiveCell = /**
     * @private
     * @return {?}
     */
    function () {
        this.calendarBodyElm.focusActiveCell();
    };
    OwlMultiYearViewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-date-time-multi-year-view',
                    template: "<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\r\n        [disabled]=\"!previousEnabled()\" [attr.aria-label]=\"prevButtonLabel\"\r\n        type=\"button\" tabindex=\"0\" (click)=\"prevYearList($event)\">\r\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n        <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\r\n             version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 250.738 250.738\"\r\n             style=\"enable-background:new 0 0 250.738 250.738;\" xml:space=\"preserve\"\r\n             width=\"100%\" height=\"100%\">\r\n            <path style=\"fill-rule: evenodd; clip-rule: evenodd;\" d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"/>\r\n        </svg>\r\n        <!-- </editor-fold> -->\r\n    </span>\r\n</button>\r\n<table class=\"owl-dt-calendar-table owl-dt-calendar-multi-year-table\">\r\n    <thead class=\"owl-dt-calendar-header\">\r\n    <tr>\r\n        <th colspan=\"3\">{{tableHeader}}</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody owl-date-time-calendar-body role=\"grid\"\r\n           [rows]=\"years\" [numCols]=\"3\" [cellRatio]=\"3 / 7\"\r\n           [activeCell]=\"activeCell\"\r\n           [todayValue]=\"todayYear\"\r\n           [selectedValues]=\"selectedYears\"\r\n           [selectMode]=\"selectMode\"\r\n           (keydown)=\"handleCalendarKeydown($event)\"\r\n           (select)=\"selectCalendarCell($event)\"></tbody>\r\n</table>\r\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\r\n        [disabled]=\"!nextEnabled()\" [attr.aria-label]=\"nextButtonLabel\"\r\n        type=\"button\" tabindex=\"0\" (click)=\"nextYearList($event)\">\r\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n        <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\r\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n             viewBox=\"0 0 250.738 250.738\" style=\"enable-background:new 0 0 250.738 250.738;\" xml:space=\"preserve\">\r\n            <path style=\"fill-rule:evenodd;clip-rule:evenodd;\" d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\r\n                c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\r\n                c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\r\n                C197.237,120.447,195.534,115.448,191.75,111.689z\"/>\r\n        </svg>\r\n        <!-- </editor-fold> -->\r\n    </span>\r\n</button>\r\n",
                    host: {
                        '[class.owl-dt-calendar-view]': 'owlDTCalendarView',
                        '[class.owl-dt-calendar-multi-year-view]': 'owlDTCalendarMultiYearView'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OwlMultiYearViewComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: OwlDateTimeIntl },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] }
    ]; };
    OwlMultiYearViewComponent.propDecorators = {
        selectMode: [{ type: Input }],
        selected: [{ type: Input }],
        selecteds: [{ type: Input }],
        pickerMoment: [{ type: Input }],
        dateFilter: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        change: [{ type: Output }],
        yearSelected: [{ type: Output }],
        pickerMomentChange: [{ type: Output }],
        keyboardEnter: [{ type: Output }],
        calendarBodyElm: [{ type: ViewChild, args: [OwlCalendarBodyComponent, { static: true },] }]
    };
    return OwlMultiYearViewComponent;
}());
export { OwlMultiYearViewComponent };
if (false) {
    /**
     * The select mode of the picker;
     *
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._selectMode;
    /**
     * The currently selected date.
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._pickerMoment;
    /**
     * A function used to filter which dates are selectable
     *
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._dateFilter;
    /**
     * The minimum selectable date.
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._minDate;
    /**
     * The maximum selectable date.
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._todayYear;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._years;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype._selectedYears;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype.initiated;
    /**
     * Callback to invoke when a new month is selected
     *
     * @type {?}
     */
    OwlMultiYearViewComponent.prototype.change;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     *
     * @type {?}
     */
    OwlMultiYearViewComponent.prototype.yearSelected;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    OwlMultiYearViewComponent.prototype.pickerMomentChange;
    /**
     * Emits when use keyboard enter to select a calendar cell
     * @type {?}
     */
    OwlMultiYearViewComponent.prototype.keyboardEnter;
    /**
     * The body of calendar table
     * @type {?}
     */
    OwlMultiYearViewComponent.prototype.calendarBodyElm;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype.pickerIntl;
    /**
     * @type {?}
     * @private
     */
    OwlMultiYearViewComponent.prototype.dateTimeAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbXVsdGkteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2NhbGVuZGFyLW11bHRpLXllYXItdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFFSCx1QkFBdUIsRUFBRSxpQkFBaUIsRUFDMUMsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVuRixPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEVBQ1gsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBRWxFLE1BQU0sS0FBTyxhQUFhLEdBQUcsQ0FBQzs7QUFDOUIsTUFBTSxLQUFPLFNBQVMsR0FBRyxDQUFDOzs7O0FBRTFCO0lBc01JLG1DQUFxQixLQUF3QixFQUN4QixVQUEyQixFQUNmLGVBQW1DO1FBRi9DLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQ2Ysb0JBQWUsR0FBZixlQUFlLENBQW9COzs7OztRQXZMNUQsZ0JBQVcsR0FBZSxRQUFRLENBQUM7UUErQm5DLGVBQVUsR0FBUSxFQUFFLENBQUM7UUE0RnJCLGNBQVMsR0FBRyxLQUFLLENBQUM7Ozs7O1FBa0NQLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDOzs7OztR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S04sTUFBTTtxQ0FHTixNQUFNO2dDQUdOLE1BQU07a0NBR04sU0FBUyxTQUFDLHdCQUF3QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUFpUHpELGdDQUFDO0NBQUEsQUE3YUQsSUE2YUM7U0FqYVkseUJBQXlCOzs7Ozs7OztJQUtsQyxnREFBMkM7Ozs7OztJQWUzQyw4Q0FBNEI7Ozs7O0lBZ0I1QiwrQ0FBNkI7Ozs7O0lBYzdCLGtEQUFnQzs7Ozs7OztJQW9CaEMsZ0RBQTRDOzs7Ozs7SUFjNUMsNkNBQTJCOzs7Ozs7SUFlM0IsNkNBQTJCOzs7OztJQWMzQiwrQ0FBMkI7Ozs7O0lBSzNCLDJDQUFpQzs7Ozs7SUFLakMsbURBQWlDOzs7OztJQUtqQyw4Q0FBMEI7Ozs7OztJQWtDMUIsMkNBQWtEOzs7Ozs7SUFLbEQsaURBQXdEOzs7OztJQUd4RCx1REFBK0U7Ozs7O0lBRy9FLGtEQUE4RTs7Ozs7SUFHOUUsb0RBQWlHOzs7OztJQVVwRiwwQ0FBZ0M7Ozs7O0lBQ2hDLCtDQUFtQzs7Ozs7SUFDbkMsb0RBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGNhbGVuZGFyLW11bHRpLXllYXItdmlldy5jb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENvbXBvbmVudCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIElucHV0LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3B0aW9uYWwsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBWaWV3Q2hpbGRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJDZWxsLCBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcclxuaW1wb3J0IHtcclxuICAgIERPV05fQVJST1csXHJcbiAgICBFTkQsXHJcbiAgICBFTlRFUixcclxuICAgIEhPTUUsXHJcbiAgICBMRUZUX0FSUk9XLFxyXG4gICAgUEFHRV9ET1dOLFxyXG4gICAgUEFHRV9VUCxcclxuICAgIFJJR0hUX0FSUk9XLFxyXG4gICAgVVBfQVJST1dcclxufSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xyXG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBZRUFSU19QRVJfUk9XID0gMztcclxuZXhwb3J0IGNvbnN0IFlFQVJfUk9XUyA9IDc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS1tdWx0aS15ZWFyLXZpZXcnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLW11bHRpLXllYXItdmlldy5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGhvc3Q6e1xyXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LWNhbGVuZGFyLXZpZXddJzogJ293bERUQ2FsZW5kYXJWaWV3JyxcclxuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXddJzogJ293bERUQ2FsZW5kYXJNdWx0aVllYXJWaWV3J1xyXG4gICAgfSxcclxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgT3dsTXVsdGlZZWFyVmlld0NvbXBvbmVudDxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2VsZWN0IG1vZGUgb2YgdGhlIHBpY2tlcjtcclxuICAgICAqICovXHJcbiAgICBwcml2YXRlIF9zZWxlY3RNb2RlOiBTZWxlY3RNb2RlID0gJ3NpbmdsZSc7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNlbGVjdE1vZGUoIHZhbDogU2VsZWN0TW9kZSApIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID0gdmFsO1xyXG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkWWVhcnMoKTtcclxuICAgICAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cclxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgc2VsZWN0ZWQoKTogVCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2VsZWN0ZWQoIHZhbHVlOiBUIHwgbnVsbCApIHtcclxuICAgICAgICBjb25zdCBvbGRTZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGVkO1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzU2FtZURheShvbGRTZWxlY3RlZCwgdGhpcy5fc2VsZWN0ZWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRZZWFycygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZHM6IFRbXSA9IFtdO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBzZWxlY3RlZHMoKTogVFtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZWxlY3RlZHMoIHZhbHVlczogVFtdICkge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkcyA9IHZhbHVlcy5tYXAoKCB2ICkgPT4ge1xyXG4gICAgICAgICAgICB2ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFZhbGlkRGF0ZSh2KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkWWVhcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9waWNrZXJNb21lbnQ6IFQgfCBudWxsO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBwaWNrZXJNb21lbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGlja2VyTW9tZW50KCB2YWx1ZTogVCApIHtcclxuICAgICAgICBjb25zdCBvbGRNb21lbnQgPSB0aGlzLl9waWNrZXJNb21lbnQ7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50ID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xyXG5cclxuICAgICAgICBpZiAob2xkTW9tZW50ICYmIHRoaXMuX3BpY2tlck1vbWVudCAmJlxyXG4gICAgICAgICAgICAhdGhpcy5pc1NhbWVZZWFyTGlzdChvbGRNb21lbnQsIHRoaXMuX3BpY2tlck1vbWVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZVxyXG4gICAgICogKi9cclxuICAgIHByaXZhdGUgX2RhdGVGaWx0ZXI6ICggZGF0ZTogVCApID0+IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IGRhdGVGaWx0ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVGaWx0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRhdGVGaWx0ZXIoIGZpbHRlcjogKCBkYXRlOiBUICkgPT4gYm9vbGVhbiApIHtcclxuICAgICAgICB0aGlzLl9kYXRlRmlsdGVyID0gZmlsdGVyO1xyXG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICAgIHByaXZhdGUgX21pbkRhdGU6IFQgfCBudWxsO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBtaW5EYXRlKCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWluRGF0ZSggdmFsdWU6IFQgfCBudWxsICkge1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gICAgcHJpdmF0ZSBfbWF4RGF0ZTogVCB8IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IG1heERhdGUoKTogVCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtYXhEYXRlKCB2YWx1ZTogVCB8IG51bGwgKSB7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcclxuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3RvZGF5WWVhcjogbnVtYmVyO1xyXG4gICAgZ2V0IHRvZGF5WWVhcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90b2RheVllYXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfeWVhcnM6IENhbGVuZGFyQ2VsbFtdW107XHJcbiAgICBnZXQgeWVhcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3llYXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NlbGVjdGVkWWVhcnM6IG51bWJlcltdO1xyXG4gICAgZ2V0IHNlbGVjdGVkWWVhcnMoKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFllYXJzO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhdGVkID0gZmFsc2U7XHJcblxyXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHwgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJ1xyXG4gICAgICAgICAgICB8fCB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWN0aXZlQ2VsbCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9waWNrZXJNb21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KSAlIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRhYmxlSGVhZGVyKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3llYXJzICYmIHRoaXMuX3llYXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMuX3llYXJzWzBdWzBdLmRpc3BsYXlWYWx1ZX0gfiAke3RoaXMuX3llYXJzW1lFQVJfUk9XUyAtIDFdW1lFQVJTX1BFUl9ST1cgLSAxXS5kaXNwbGF5VmFsdWV9YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgcHJldkJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5wcmV2TXVsdGlZZWFyTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG5leHRCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwubmV4dE11bHRpWWVhckxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBuZXcgbW9udGggaXMgc2VsZWN0ZWRcclxuICAgICAqICovXHJcbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1pdHMgdGhlIHNlbGVjdGVkIHllYXIuIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZVxyXG4gICAgICogKi9cclxuICAgIEBPdXRwdXQoKSByZWFkb25seSB5ZWFyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XHJcblxyXG4gICAgLyoqIEVtaXRzIHdoZW4gYW55IGRhdGUgaXMgYWN0aXZhdGVkLiAqL1xyXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IHBpY2tlck1vbWVudENoYW5nZTogRXZlbnRFbWl0dGVyPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xyXG5cclxuICAgIC8qKiBFbWl0cyB3aGVuIHVzZSBrZXlib2FyZCBlbnRlciB0byBzZWxlY3QgYSBjYWxlbmRhciBjZWxsICovXHJcbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkga2V5Ym9hcmRFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICAvKiogVGhlIGJvZHkgb2YgY2FsZW5kYXIgdGFibGUgKi9cclxuICAgIEBWaWV3Q2hpbGQoT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KSBjYWxlbmRhckJvZHlFbG06IE93bENhbGVuZGFyQm9keUNvbXBvbmVudDtcclxuXHJcbiAgICBnZXQgb3dsRFRDYWxlbmRhclZpZXcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERUQ2FsZW5kYXJNdWx0aVllYXJWaWV3KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICAgICBwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCxcclxuICAgICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+ICkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3RvZGF5WWVhciA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCkpO1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBhIGNhbGVuZGFyQ2VsbCBzZWxlY3RlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0Q2FsZW5kYXJDZWxsKCBjZWxsOiBDYWxlbmRhckNlbGwgKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RZZWFyKGNlbGwudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2VsZWN0WWVhciggeWVhcjogbnVtYmVyICk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMueWVhclNlbGVjdGVkLmVtaXQodGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZSh5ZWFyLCAwLCAxKSk7XHJcbiAgICAgICAgY29uc3QgZmlyc3REYXRlT2ZNb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgICAgIHllYXIsXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KSxcclxuICAgICAgICAgICAgMVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgZGF5c0luTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXROdW1EYXlzSW5Nb250aChmaXJzdERhdGVPZk1vbnRoKTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgICAgIHllYXIsXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMucGlja2VyTW9tZW50KSxcclxuICAgICAgICAgICAgTWF0aC5taW4oZGF5c0luTW9udGgsIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpKSxcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5waWNrZXJNb21lbnQpLFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNaW51dGVzKHRoaXMucGlja2VyTW9tZW50KSxcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLnBpY2tlck1vbWVudCksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdChzZWxlY3RlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZSB0aGUgcHJldmlvdXMgeWVhciBsaXN0XHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIHByZXZZZWFyTGlzdCggZXZlbnQ6IGFueSApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMucGlja2VyTW9tZW50LCAtMSAqIFlFQVJfUk9XUyAqIFlFQVJTX1BFUl9ST1cpO1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZW5lcmF0ZSB0aGUgbmV4dCB5ZWFyIGxpc3RcclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgbmV4dFllYXJMaXN0KCBldmVudDogYW55ICk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5waWNrZXJNb21lbnQsIFlFQVJfUk9XUyAqIFlFQVJTX1BFUl9ST1cpO1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdlbmVyYXRlWWVhckxpc3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5feWVhcnMgPSBbXTtcclxuXHJcbiAgICAgICAgY29uc3QgcGlja2VyTW9tZW50WWVhciA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KTtcclxuICAgICAgICBjb25zdCBvZmZzZXQgPSBwaWNrZXJNb21lbnRZZWFyICUgKFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1MpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IFlFQVJfUk9XUzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBZRUFSU19QRVJfUk9XOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHllYXIgPSBwaWNrZXJNb21lbnRZZWFyIC0gb2Zmc2V0ICsgKGogKyBpICogWUVBUlNfUEVSX1JPVyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5ZWFyQ2VsbCA9IHRoaXMuY3JlYXRlWWVhckNlbGwoeWVhcik7XHJcbiAgICAgICAgICAgICAgICByb3cucHVzaCh5ZWFyQ2VsbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3llYXJzLnB1c2gocm93KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFdoZXRoZXIgdGhlIHByZXZpb3VzIHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC4gKi9cclxuICAgIHB1YmxpYyBwcmV2aW91c0VuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1pbkRhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAhdGhpcy5taW5EYXRlIHx8ICF0aGlzLmlzU2FtZVllYXJMaXN0KHRoaXMuX3BpY2tlck1vbWVudCwgdGhpcy5taW5EYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogV2hldGhlciB0aGUgbmV4dCBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXHJcbiAgICBwdWJsaWMgbmV4dEVuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLm1heERhdGUgfHwgIXRoaXMuaXNTYW1lWWVhckxpc3QodGhpcy5fcGlja2VyTW9tZW50LCB0aGlzLm1heERhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVDYWxlbmRhcktleWRvd24oIGV2ZW50OiBLZXlib2FyZEV2ZW50ICk6IHZvaWQge1xyXG4gICAgICAgIGxldCBtb21lbnQ7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIG1pbnVzIDEgeWVhclxyXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX3BpY2tlck1vbWVudCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgMSB5ZWFyXHJcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX3BpY2tlck1vbWVudCwgMSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIG1pbnVzIDMgeWVhcnNcclxuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcclxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fcGlja2VyTW9tZW50LCAtMSAqIFlFQVJTX1BFUl9ST1cpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgMyB5ZWFyc1xyXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX3BpY2tlck1vbWVudCwgWUVBUlNfUEVSX1JPVyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIGdvIHRvIHRoZSBmaXJzdCB5ZWFyIG9mIHRoZSB5ZWFyIHBhZ2VcclxuICAgICAgICAgICAgY2FzZSBIT01FOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgLXRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KSAlIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIGdvIHRvIHRoZSBsYXN0IHllYXIgb2YgdGhlIHllYXIgcGFnZVxyXG4gICAgICAgICAgICBjYXNlIEVORDpcclxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fcGlja2VyTW9tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKSAtIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KSAlIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBtaW51cyAxIHllYXIgcGFnZSAob3IgMTAgeWVhciBwYWdlcylcclxuICAgICAgICAgICAgY2FzZSBQQUdFX1VQOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLnBpY2tlck1vbWVudCwgZXZlbnQuYWx0S2V5ID8gLTEwICogKFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1MpIDogLTEgKiAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgMSB5ZWFyIHBhZ2UgKG9yIDEwIHllYXIgcGFnZXMpXHJcbiAgICAgICAgICAgIGNhc2UgUEFHRV9ET1dOOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLnBpY2tlck1vbWVudCwgZXZlbnQuYWx0S2V5ID8gMTAgKiAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUykgOiAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RZZWFyKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmtleWJvYXJkRW50ZXIuZW1pdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhbiBDYWxlbmRhckNlbGwgZm9yIHRoZSBnaXZlbiB5ZWFyLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVllYXJDZWxsKCB5ZWFyOiBudW1iZXIgKTogQ2FsZW5kYXJDZWxsIHtcclxuICAgICAgICBjb25zdCBzdGFydERhdGVPZlllYXIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKHllYXIsIDAsIDEpO1xyXG4gICAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXJOYW1lKHN0YXJ0RGF0ZU9mWWVhcik7XHJcbiAgICAgICAgY29uc3QgY2VsbENsYXNzID0gJ293bC1kdC15ZWFyLScgKyB5ZWFyO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ2FsZW5kYXJDZWxsKHllYXIsIHllYXIudG9TdHJpbmcoKSwgYXJpYUxhYmVsLCB0aGlzLmlzWWVhckVuYWJsZWQoeWVhciksIGZhbHNlLCBjZWxsQ2xhc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0U2VsZWN0ZWRZZWFycygpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRZZWFycyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSAmJiB0aGlzLnNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkWWVhcnNbMF0gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuc2VsZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSAmJiB0aGlzLnNlbGVjdGVkcykge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZFllYXJzID0gdGhpcy5zZWxlY3RlZHMubWFwKCggc2VsZWN0ZWQgKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChzZWxlY3RlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihzZWxlY3RlZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogV2hldGhlciB0aGUgZ2l2ZW4geWVhciBpcyBlbmFibGVkLiAqL1xyXG4gICAgcHJpdmF0ZSBpc1llYXJFbmFibGVkKCB5ZWFyOiBudW1iZXIgKSB7XHJcbiAgICAgICAgLy8gZGlzYWJsZSBpZiB0aGUgeWVhciBpcyBncmVhdGVyIHRoYW4gbWF4RGF0ZSBsb3dlciB0aGFuIG1pbkRhdGVcclxuICAgICAgICBpZiAoeWVhciA9PT0gdW5kZWZpbmVkIHx8IHllYXIgPT09IG51bGwgfHxcclxuICAgICAgICAgICAgKHRoaXMubWF4RGF0ZSAmJiB5ZWFyID4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLm1heERhdGUpKSB8fFxyXG4gICAgICAgICAgICAodGhpcy5taW5EYXRlICYmIHllYXIgPCB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMubWluRGF0ZSkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGVuYWJsZSBpZiBpdCByZWFjaGVzIGhlcmUgYW5kIHRoZXJlJ3Mgbm8gZmlsdGVyIGRlZmluZWRcclxuICAgICAgICBpZiAoIXRoaXMuZGF0ZUZpbHRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGZpcnN0T2ZZZWFyID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZSh5ZWFyLCAwLCAxKTtcclxuXHJcbiAgICAgICAgLy8gSWYgYW55IGRhdGUgaW4gdGhlIHllYXIgaXMgZW5hYmxlZCBjb3VudCB0aGUgeWVhciBhcyBlbmFibGVkLlxyXG4gICAgICAgIGZvciAobGV0IGRhdGUgPSBmaXJzdE9mWWVhcjsgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlKSA9PSB5ZWFyO1xyXG4gICAgICAgICAgICAgZGF0ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhkYXRlLCAxKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRlRmlsdGVyKGRhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNTYW1lWWVhckxpc3QoIGRhdGUxOiBULCBkYXRlMjogVCApOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUxKSAvIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKSkgPT09XHJcbiAgICAgICAgICAgIE1hdGguZmxvb3IodGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMikgLyAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgdmFsaWQgZGF0ZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGUoIG9iajogYW55ICk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChvYmopKSA/IG9iaiA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmb2N1c0FjdGl2ZUNlbGwoKSB7XHJcbiAgICAgICAgdGhpcy5jYWxlbmRhckJvZHlFbG0uZm9jdXNBY3RpdmVDZWxsKCk7XHJcbiAgICB9XHJcbn1cclxuIl19