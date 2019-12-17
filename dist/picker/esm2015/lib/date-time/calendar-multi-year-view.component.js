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
export const YEARS_PER_ROW = 3;
/** @type {?} */
export const YEAR_ROWS = 7;
/**
 * @template T
 */
export class OwlMultiYearViewComponent {
    /**
     * @param {?} cdRef
     * @param {?} pickerIntl
     * @param {?} dateTimeAdapter
     */
    constructor(cdRef, pickerIntl, dateTimeAdapter) {
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
    /**
     * @return {?}
     */
    get selectMode() {
        return this._selectMode;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set selectMode(val) {
        this._selectMode = val;
        if (this.initiated) {
            this.setSelectedYears();
            this.cdRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        /** @type {?} */
        const oldSelected = this._selected;
        value = this.dateTimeAdapter.deserialize(value);
        this._selected = this.getValidDate(value);
        if (!this.dateTimeAdapter.isSameDay(oldSelected, this._selected)) {
            this.setSelectedYears();
        }
    }
    /**
     * @return {?}
     */
    get selecteds() {
        return this._selecteds;
    }
    /**
     * @param {?} values
     * @return {?}
     */
    set selecteds(values) {
        this._selecteds = values.map((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            v = this.dateTimeAdapter.deserialize(v);
            return this.getValidDate(v);
        }));
        this.setSelectedYears();
    }
    /**
     * @return {?}
     */
    get pickerMoment() {
        return this._pickerMoment;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set pickerMoment(value) {
        /** @type {?} */
        const oldMoment = this._pickerMoment;
        value = this.dateTimeAdapter.deserialize(value);
        this._pickerMoment = this.getValidDate(value) || this.dateTimeAdapter.now();
        if (oldMoment && this._pickerMoment &&
            !this.isSameYearList(oldMoment, this._pickerMoment)) {
            this.generateYearList();
        }
    }
    /**
     * @return {?}
     */
    get dateFilter() {
        return this._dateFilter;
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    set dateFilter(filter) {
        this._dateFilter = filter;
        if (this.initiated) {
            this.generateYearList();
        }
    }
    /**
     * @return {?}
     */
    get minDate() {
        return this._minDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._minDate = this.getValidDate(value);
        if (this.initiated) {
            this.generateYearList();
        }
    }
    /**
     * @return {?}
     */
    get maxDate() {
        return this._maxDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this._maxDate = this.getValidDate(value);
        if (this.initiated) {
            this.generateYearList();
        }
    }
    /**
     * @return {?}
     */
    get todayYear() {
        return this._todayYear;
    }
    /**
     * @return {?}
     */
    get years() {
        return this._years;
    }
    /**
     * @return {?}
     */
    get selectedYears() {
        return this._selectedYears;
    }
    /**
     * @return {?}
     */
    get isInSingleMode() {
        return this.selectMode === 'single';
    }
    /**
     * @return {?}
     */
    get isInRangeMode() {
        return this.selectMode === 'range' || this.selectMode === 'rangeFrom'
            || this.selectMode === 'rangeTo';
    }
    /**
     * @return {?}
     */
    get activeCell() {
        if (this._pickerMoment) {
            return this.dateTimeAdapter.getYear(this._pickerMoment) % (YEARS_PER_ROW * YEAR_ROWS);
        }
    }
    /**
     * @return {?}
     */
    get tableHeader() {
        if (this._years && this._years.length > 0) {
            return `${this._years[0][0].displayValue} ~ ${this._years[YEAR_ROWS - 1][YEARS_PER_ROW - 1].displayValue}`;
        }
    }
    /**
     * @return {?}
     */
    get prevButtonLabel() {
        return this.pickerIntl.prevMultiYearLabel;
    }
    /**
     * @return {?}
     */
    get nextButtonLabel() {
        return this.pickerIntl.nextMultiYearLabel;
    }
    /**
     * @return {?}
     */
    get owlDTCalendarView() {
        return true;
    }
    /**
     * @return {?}
     */
    get owlDTCalendarMultiYearView() {
        return true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._todayYear = this.dateTimeAdapter.getYear(this.dateTimeAdapter.now());
        this.generateYearList();
        this.initiated = true;
    }
    /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    selectCalendarCell(cell) {
        this.selectYear(cell.value);
    }
    /**
     * @private
     * @param {?} year
     * @return {?}
     */
    selectYear(year) {
        this.yearSelected.emit(this.dateTimeAdapter.createDate(year, 0, 1));
        /** @type {?} */
        const firstDateOfMonth = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), 1);
        /** @type {?} */
        const daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
        /** @type {?} */
        const selected = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
        this.change.emit(selected);
    }
    /**
     * Generate the previous year list
     *
     * @param {?} event
     * @return {?}
     */
    prevYearList(event) {
        this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1 * YEAR_ROWS * YEARS_PER_ROW);
        this.generateYearList();
        event.preventDefault();
    }
    /**
     * Generate the next year list
     *
     * @param {?} event
     * @return {?}
     */
    nextYearList(event) {
        this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, YEAR_ROWS * YEARS_PER_ROW);
        this.generateYearList();
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    generateYearList() {
        this._years = [];
        /** @type {?} */
        const pickerMomentYear = this.dateTimeAdapter.getYear(this._pickerMoment);
        /** @type {?} */
        const offset = pickerMomentYear % (YEARS_PER_ROW * YEAR_ROWS);
        for (let i = 0; i < YEAR_ROWS; i++) {
            /** @type {?} */
            const row = [];
            for (let j = 0; j < YEARS_PER_ROW; j++) {
                /** @type {?} */
                const year = pickerMomentYear - offset + (j + i * YEARS_PER_ROW);
                /** @type {?} */
                const yearCell = this.createYearCell(year);
                row.push(yearCell);
            }
            this._years.push(row);
        }
        return;
    }
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    previousEnabled() {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this.isSameYearList(this._pickerMoment, this.minDate);
    }
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    nextEnabled() {
        return !this.maxDate || !this.isSameYearList(this._pickerMoment, this.maxDate);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleCalendarKeydown(event) {
        /** @type {?} */
        let moment;
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
    }
    /**
     * Creates an CalendarCell for the given year.
     * @private
     * @param {?} year
     * @return {?}
     */
    createYearCell(year) {
        /** @type {?} */
        const startDateOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
        /** @type {?} */
        const ariaLabel = this.dateTimeAdapter.getYearName(startDateOfYear);
        /** @type {?} */
        const cellClass = 'owl-dt-year-' + year;
        return new CalendarCell(year, year.toString(), ariaLabel, this.isYearEnabled(year), false, cellClass);
    }
    /**
     * @private
     * @return {?}
     */
    setSelectedYears() {
        this._selectedYears = [];
        if (this.isInSingleMode && this.selected) {
            this._selectedYears[0] = this.dateTimeAdapter.getYear(this.selected);
        }
        if (this.isInRangeMode && this.selecteds) {
            this._selectedYears = this.selecteds.map((/**
             * @param {?} selected
             * @return {?}
             */
            (selected) => {
                if (this.dateTimeAdapter.isValid(selected)) {
                    return this.dateTimeAdapter.getYear(selected);
                }
                else {
                    return null;
                }
            }));
        }
    }
    /**
     * Whether the given year is enabled.
     * @private
     * @param {?} year
     * @return {?}
     */
    isYearEnabled(year) {
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
        const firstOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
        // If any date in the year is enabled count the year as enabled.
        for (let date = firstOfYear; this.dateTimeAdapter.getYear(date) == year; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    isSameYearList(date1, date2) {
        return Math.floor(this.dateTimeAdapter.getYear(date1) / (YEARS_PER_ROW * YEAR_ROWS)) ===
            Math.floor(this.dateTimeAdapter.getYear(date2) / (YEARS_PER_ROW * YEAR_ROWS));
    }
    /**
     * Get a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    getValidDate(obj) {
        return (this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj)) ? obj : null;
    }
    /**
     * @private
     * @return {?}
     */
    focusActiveCell() {
        this.calendarBodyElm.focusActiveCell();
    }
}
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
OwlMultiYearViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: OwlDateTimeIntl },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbXVsdGkteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2NhbGVuZGFyLW11bHRpLXllYXItdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFFSCx1QkFBdUIsRUFBRSxpQkFBaUIsRUFDMUMsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVuRixPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEVBQ1gsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0FBRWxFLE1BQU0sT0FBTyxhQUFhLEdBQUcsQ0FBQzs7QUFDOUIsTUFBTSxPQUFPLFNBQVMsR0FBRyxDQUFDOzs7O0FBYzFCLE1BQU0sT0FBTyx5QkFBeUI7Ozs7OztJQTBMbEMsWUFBcUIsS0FBd0IsRUFDeEIsVUFBMkIsRUFDZixlQUFtQztRQUYvQyxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQUNmLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjs7Ozs7UUF2TDVELGdCQUFXLEdBQWUsUUFBUSxDQUFDO1FBK0JuQyxlQUFVLEdBQVEsRUFBRSxDQUFDO1FBNEZyQixjQUFTLEdBQUcsS0FBSyxDQUFDOzs7OztRQWtDUCxXQUFNLEdBQUcsSUFB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KlxyXG4gKiBjYWxlbmRhci1tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEFmdGVyQ29udGVudEluaXQsXHJcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uSW5pdCxcclxuICAgIE9wdGlvbmFsLFxyXG4gICAgT3V0cHV0LFxyXG4gICAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XHJcbmltcG9ydCB7IENhbGVuZGFyQ2VsbCwgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFNlbGVjdE1vZGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBET1dOX0FSUk9XLFxyXG4gICAgRU5ELFxyXG4gICAgRU5URVIsXHJcbiAgICBIT01FLFxyXG4gICAgTEVGVF9BUlJPVyxcclxuICAgIFBBR0VfRE9XTixcclxuICAgIFBBR0VfVVAsXHJcbiAgICBSSUdIVF9BUlJPVyxcclxuICAgIFVQX0FSUk9XXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcclxuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnRsIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZSc7XHJcblxyXG5leHBvcnQgY29uc3QgWUVBUlNfUEVSX1JPVyA9IDM7XHJcbmV4cG9ydCBjb25zdCBZRUFSX1JPV1MgPSA3O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ293bC1kYXRlLXRpbWUtbXVsdGkteWVhci12aWV3JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1tdWx0aS15ZWFyLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItbXVsdGkteWVhci12aWV3LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBob3N0OntcclxuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci12aWV3XSc6ICdvd2xEVENhbGVuZGFyVmlldycsXHJcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtY2FsZW5kYXItbXVsdGkteWVhci12aWV3XSc6ICdvd2xEVENhbGVuZGFyTXVsdGlZZWFyVmlldydcclxuICAgIH0sXHJcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE93bE11bHRpWWVhclZpZXdDb21wb25lbnQ8VD4gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHNlbGVjdCBtb2RlIG9mIHRoZSBwaWNrZXI7XHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0TW9kZTogU2VsZWN0TW9kZSA9ICdzaW5nbGUnO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZWxlY3RNb2RlKCB2YWw6IFNlbGVjdE1vZGUgKSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZFllYXJzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZDogVCB8IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHNlbGVjdGVkKCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNlbGVjdGVkKCB2YWx1ZTogVCB8IG51bGwgKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkU2VsZWN0ZWQgPSB0aGlzLl9zZWxlY3RlZDtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1NhbWVEYXkob2xkU2VsZWN0ZWQsIHRoaXMuX3NlbGVjdGVkKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkWWVhcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRzOiBUW10gPSBbXTtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgc2VsZWN0ZWRzKCk6IFRbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2VsZWN0ZWRzKCB2YWx1ZXM6IFRbXSApIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZHMgPSB2YWx1ZXMubWFwKCggdiApID0+IHtcclxuICAgICAgICAgICAgdiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHYpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWxpZERhdGUodik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZFllYXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcGlja2VyTW9tZW50OiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgcGlja2VyTW9tZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrZXJNb21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBpY2tlck1vbWVudCggdmFsdWU6IFQgKSB7XHJcbiAgICAgICAgY29uc3Qgb2xkTW9tZW50ID0gdGhpcy5fcGlja2VyTW9tZW50O1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX3BpY2tlck1vbWVudCA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcclxuXHJcbiAgICAgICAgaWYgKG9sZE1vbWVudCAmJiB0aGlzLl9waWNrZXJNb21lbnQgJiZcclxuICAgICAgICAgICAgIXRoaXMuaXNTYW1lWWVhckxpc3Qob2xkTW9tZW50LCB0aGlzLl9waWNrZXJNb21lbnQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgZnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGVcclxuICAgICAqICovXHJcbiAgICBwcml2YXRlIF9kYXRlRmlsdGVyOiAoIGRhdGU6IFQgKSA9PiBib29sZWFuO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBkYXRlRmlsdGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlRmlsdGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBkYXRlRmlsdGVyKCBmaWx0ZXI6ICggZGF0ZTogVCApID0+IGJvb2xlYW4gKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0ZUZpbHRlciA9IGZpbHRlcjtcclxuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVllYXJMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgICBwcml2YXRlIF9taW5EYXRlOiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgbWluRGF0ZSgpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1pbkRhdGUoIHZhbHVlOiBUIHwgbnVsbCApIHtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcclxuICAgICAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xyXG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICAgIHByaXZhdGUgX21heERhdGU6IFQgfCBudWxsO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBtYXhEYXRlKCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWF4RGF0ZSggdmFsdWU6IFQgfCBudWxsICkge1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX21heERhdGUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVZZWFyTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF90b2RheVllYXI6IG51bWJlcjtcclxuICAgIGdldCB0b2RheVllYXIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9kYXlZZWFyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3llYXJzOiBDYWxlbmRhckNlbGxbXVtdO1xyXG4gICAgZ2V0IHllYXJzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl95ZWFycztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZFllYXJzOiBudW1iZXJbXTtcclxuICAgIGdldCBzZWxlY3RlZFllYXJzKCk6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRZZWFycztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRpYXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8IHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbSdcclxuICAgICAgICAgICAgfHwgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VUbyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFjdGl2ZUNlbGwoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5fcGlja2VyTW9tZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuX3BpY2tlck1vbWVudCkgJSAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCB0YWJsZUhlYWRlcigpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLl95ZWFycyAmJiB0aGlzLl95ZWFycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLl95ZWFyc1swXVswXS5kaXNwbGF5VmFsdWV9IH4gJHt0aGlzLl95ZWFyc1tZRUFSX1JPV1MgLSAxXVtZRUFSU19QRVJfUk9XIC0gMV0uZGlzcGxheVZhbHVlfWBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHByZXZCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwucHJldk11bHRpWWVhckxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBuZXh0QnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLm5leHRNdWx0aVllYXJMYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgbmV3IG1vbnRoIGlzIHNlbGVjdGVkXHJcbiAgICAgKiAqL1xyXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtaXRzIHRoZSBzZWxlY3RlZCB5ZWFyLiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGVcclxuICAgICAqICovXHJcbiAgICBAT3V0cHV0KCkgcmVhZG9ubHkgeWVhclNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xyXG5cclxuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cclxuICAgIEBPdXRwdXQoKSByZWFkb25seSBwaWNrZXJNb21lbnRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxUPiA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcclxuXHJcbiAgICAvKiogRW1pdHMgd2hlbiB1c2Uga2V5Ym9hcmQgZW50ZXIgdG8gc2VsZWN0IGEgY2FsZW5kYXIgY2VsbCAqL1xyXG4gICAgQE91dHB1dCgpIHJlYWRvbmx5IGtleWJvYXJkRW50ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgLyoqIFRoZSBib2R5IG9mIGNhbGVuZGFyIHRhYmxlICovXHJcbiAgICBAVmlld0NoaWxkKE93bENhbGVuZGFyQm9keUNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSkgY2FsZW5kYXJCb2R5RWxtOiBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQ7XHJcblxyXG4gICAgZ2V0IG93bERUQ2FsZW5kYXJWaWV3KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xEVENhbGVuZGFyTXVsdGlZZWFyVmlldygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSBwaWNrZXJJbnRsOiBPd2xEYXRlVGltZUludGwsXHJcbiAgICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPiApIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90b2RheVllYXIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpKTtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcclxuICAgICAgICB0aGlzLmluaXRpYXRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgYSBjYWxlbmRhckNlbGwgc2VsZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdENhbGVuZGFyQ2VsbCggY2VsbDogQ2FsZW5kYXJDZWxsICk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0WWVhcihjZWxsLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbGVjdFllYXIoIHllYXI6IG51bWJlciApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnllYXJTZWxlY3RlZC5lbWl0KHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoeWVhciwgMCwgMSkpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0RGF0ZU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICAgICAgICB5ZWFyLFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnBpY2tlck1vbWVudCksXHJcbiAgICAgICAgICAgIDFcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGRheXNJbk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgoZmlyc3REYXRlT2ZNb250aCk7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICAgICAgICB5ZWFyLFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnBpY2tlck1vbWVudCksXHJcbiAgICAgICAgICAgIE1hdGgubWluKGRheXNJbk1vbnRoLCB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KSksXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMucGlja2VyTW9tZW50KSxcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCksXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFNlY29uZHModGhpcy5waWNrZXJNb21lbnQpLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGUgdGhlIHByZXZpb3VzIHllYXIgbGlzdFxyXG4gICAgICogKi9cclxuICAgIHB1YmxpYyBwcmV2WWVhckxpc3QoIGV2ZW50OiBhbnkgKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLnBpY2tlck1vbWVudCwgLTEgKiBZRUFSX1JPV1MgKiBZRUFSU19QRVJfUk9XKTtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGUgdGhlIG5leHQgeWVhciBsaXN0XHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIG5leHRZZWFyTGlzdCggZXZlbnQ6IGFueSApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMucGlja2VyTW9tZW50LCBZRUFSX1JPV1MgKiBZRUFSU19QRVJfUk9XKTtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlWWVhckxpc3QoKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZW5lcmF0ZVllYXJMaXN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3llYXJzID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0IHBpY2tlck1vbWVudFllYXIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuX3BpY2tlck1vbWVudCk7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gcGlja2VyTW9tZW50WWVhciAlIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBZRUFSX1JPV1M7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgWUVBUlNfUEVSX1JPVzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5ZWFyID0gcGlja2VyTW9tZW50WWVhciAtIG9mZnNldCArIChqICsgaSAqIFlFQVJTX1BFUl9ST1cpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeWVhckNlbGwgPSB0aGlzLmNyZWF0ZVllYXJDZWxsKHllYXIpO1xyXG4gICAgICAgICAgICAgICAgcm93LnB1c2goeWVhckNlbGwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl95ZWFycy5wdXNoKHJvdyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBXaGV0aGVyIHRoZSBwcmV2aW91cyBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXHJcbiAgICBwdWJsaWMgcHJldmlvdXNFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5taW5EYXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gIXRoaXMubWluRGF0ZSB8fCAhdGhpcy5pc1NhbWVZZWFyTGlzdCh0aGlzLl9waWNrZXJNb21lbnQsIHRoaXMubWluRGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFdoZXRoZXIgdGhlIG5leHQgcGVyaW9kIGJ1dHRvbiBpcyBlbmFibGVkLiAqL1xyXG4gICAgcHVibGljIG5leHRFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5tYXhEYXRlIHx8ICF0aGlzLmlzU2FtZVllYXJMaXN0KHRoaXMuX3BpY2tlck1vbWVudCwgdGhpcy5tYXhEYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFuZGxlQ2FsZW5kYXJLZXlkb3duKCBldmVudDogS2V5Ym9hcmRFdmVudCApOiB2b2lkIHtcclxuICAgICAgICBsZXQgbW9tZW50O1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICAvLyBtaW51cyAxIHllYXJcclxuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9waWNrZXJNb21lbnQsIC0xKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIDEgeWVhclxyXG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9waWNrZXJNb21lbnQsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBtaW51cyAzIHllYXJzXHJcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX3BpY2tlck1vbWVudCwgLTEgKiBZRUFSU19QRVJfUk9XKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIDMgeWVhcnNcclxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9waWNrZXJNb21lbnQsIFlFQVJTX1BFUl9ST1cpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBnbyB0byB0aGUgZmlyc3QgeWVhciBvZiB0aGUgeWVhciBwYWdlXHJcbiAgICAgICAgICAgIGNhc2UgSE9NRTpcclxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fcGlja2VyTW9tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIC10aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuX3BpY2tlck1vbWVudCkgJSAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBnbyB0byB0aGUgbGFzdCB5ZWFyIG9mIHRoZSB5ZWFyIHBhZ2VcclxuICAgICAgICAgICAgY2FzZSBFTkQ6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX3BpY2tlck1vbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUykgLSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuX3BpY2tlck1vbWVudCkgJSAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUykgLSAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gbWludXMgMSB5ZWFyIHBhZ2UgKG9yIDEwIHllYXIgcGFnZXMpXHJcbiAgICAgICAgICAgIGNhc2UgUEFHRV9VUDpcclxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5waWNrZXJNb21lbnQsIGV2ZW50LmFsdEtleSA/IC0xMCAqIChZRUFSU19QRVJfUk9XICogWUVBUl9ST1dTKSA6IC0xICogKFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1MpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIDEgeWVhciBwYWdlIChvciAxMCB5ZWFyIHBhZ2VzKVxyXG4gICAgICAgICAgICBjYXNlIFBBR0VfRE9XTjpcclxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5waWNrZXJNb21lbnQsIGV2ZW50LmFsdEtleSA/IDEwICogKFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1MpIDogKFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1MpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0WWVhcih0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuX3BpY2tlck1vbWVudCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlib2FyZEVudGVyLmVtaXQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZm9jdXNBY3RpdmVDZWxsKCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gQ2FsZW5kYXJDZWxsIGZvciB0aGUgZ2l2ZW4geWVhci5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVZZWFyQ2VsbCggeWVhcjogbnVtYmVyICk6IENhbGVuZGFyQ2VsbCB7XHJcbiAgICAgICAgY29uc3Qgc3RhcnREYXRlT2ZZZWFyID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZSh5ZWFyLCAwLCAxKTtcclxuICAgICAgICBjb25zdCBhcmlhTGFiZWwgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyTmFtZShzdGFydERhdGVPZlllYXIpO1xyXG4gICAgICAgIGNvbnN0IGNlbGxDbGFzcyA9ICdvd2wtZHQteWVhci0nICsgeWVhcjtcclxuICAgICAgICByZXR1cm4gbmV3IENhbGVuZGFyQ2VsbCh5ZWFyLCB5ZWFyLnRvU3RyaW5nKCksIGFyaWFMYWJlbCwgdGhpcy5pc1llYXJFbmFibGVkKHllYXIpLCBmYWxzZSwgY2VsbENsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFNlbGVjdGVkWWVhcnMoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkWWVhcnMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUgJiYgdGhpcy5zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZFllYXJzWzBdID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnNlbGVjdGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUgJiYgdGhpcy5zZWxlY3RlZHMpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRZZWFycyA9IHRoaXMuc2VsZWN0ZWRzLm1hcCgoIHNlbGVjdGVkICkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQoc2VsZWN0ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFdoZXRoZXIgdGhlIGdpdmVuIHllYXIgaXMgZW5hYmxlZC4gKi9cclxuICAgIHByaXZhdGUgaXNZZWFyRW5hYmxlZCggeWVhcjogbnVtYmVyICkge1xyXG4gICAgICAgIC8vIGRpc2FibGUgaWYgdGhlIHllYXIgaXMgZ3JlYXRlciB0aGFuIG1heERhdGUgbG93ZXIgdGhhbiBtaW5EYXRlXHJcbiAgICAgICAgaWYgKHllYXIgPT09IHVuZGVmaW5lZCB8fCB5ZWFyID09PSBudWxsIHx8XHJcbiAgICAgICAgICAgICh0aGlzLm1heERhdGUgJiYgeWVhciA+IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5tYXhEYXRlKSkgfHxcclxuICAgICAgICAgICAgKHRoaXMubWluRGF0ZSAmJiB5ZWFyIDwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLm1pbkRhdGUpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBlbmFibGUgaWYgaXQgcmVhY2hlcyBoZXJlIGFuZCB0aGVyZSdzIG5vIGZpbHRlciBkZWZpbmVkXHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVGaWx0ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBmaXJzdE9mWWVhciA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoeWVhciwgMCwgMSk7XHJcblxyXG4gICAgICAgIC8vIElmIGFueSBkYXRlIGluIHRoZSB5ZWFyIGlzIGVuYWJsZWQgY291bnQgdGhlIHllYXIgYXMgZW5hYmxlZC5cclxuICAgICAgICBmb3IgKGxldCBkYXRlID0gZmlyc3RPZlllYXI7IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZSkgPT0geWVhcjtcclxuICAgICAgICAgICAgIGRhdGUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoZGF0ZSwgMSkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZUZpbHRlcihkYXRlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzU2FtZVllYXJMaXN0KCBkYXRlMTogVCwgZGF0ZTI6IFQgKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMSkgLyAoWUVBUlNfUEVSX1JPVyAqIFlFQVJfUk9XUykpID09PVxyXG4gICAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZTIpIC8gKFlFQVJTX1BFUl9ST1cgKiBZRUFSX1JPV1MpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhIHZhbGlkIGRhdGUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlKCBvYmo6IGFueSApOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQob2JqKSkgPyBvYmogOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZm9jdXNBY3RpdmVDZWxsKCkge1xyXG4gICAgICAgIHRoaXMuY2FsZW5kYXJCb2R5RWxtLmZvY3VzQWN0aXZlQ2VsbCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==