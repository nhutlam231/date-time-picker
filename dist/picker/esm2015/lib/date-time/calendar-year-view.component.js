/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar-year-view.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from '@angular/core';
import { CalendarCell, OwlCalendarBodyComponent } from './calendar-body.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { Subscription } from 'rxjs';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
/** @type {?} */
const MONTHS_PER_YEAR = 12;
/** @type {?} */
const MONTHS_PER_ROW = 3;
/**
 * @template T
 */
export class OwlYearViewComponent {
    /**
     * @param {?} cdRef
     * @param {?} dateTimeAdapter
     * @param {?} dateTimeFormats
     */
    constructor(cdRef, dateTimeAdapter, dateTimeFormats) {
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * The select mode of the picker;
         *
         */
        this._selectMode = 'single';
        this._selecteds = [];
        this.localeSub = Subscription.EMPTY;
        this.initiated = false;
        /**
         * An array to hold all selectedDates' month value
         * the value is the month number in current year
         *
         */
        this.selectedMonths = [];
        /**
         * Callback to invoke when a new month is selected
         *
         */
        this.change = new EventEmitter();
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         *
         */
        this.monthSelected = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.pickerMomentChange = new EventEmitter();
        /**
         * Emits when use keyboard enter to select a calendar cell
         */
        this.keyboardEnter = new EventEmitter();
        this.monthNames = this.dateTimeAdapter.getMonthNames('short');
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
            this.generateMonthList();
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
        value = this.dateTimeAdapter.deserialize(value);
        this._selected = this.getValidDate(value);
        this.setSelectedMonths();
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
        this._selecteds = [];
        for (let i = 0; i < values.length; i++) {
            /** @type {?} */
            const value = this.dateTimeAdapter.deserialize(values[i]);
            this._selecteds.push(this.getValidDate(value));
        }
        this.setSelectedMonths();
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
        this._pickerMoment =
            this.getValidDate(value) || this.dateTimeAdapter.now();
        if (!this.hasSameYear(oldMoment, this._pickerMoment) &&
            this.initiated) {
            this.generateMonthList();
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
            this.generateMonthList();
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
            this.generateMonthList();
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
            this.generateMonthList();
        }
    }
    /**
     * @return {?}
     */
    get months() {
        return this._months;
    }
    /**
     * @return {?}
     */
    get activeCell() {
        if (this._pickerMoment) {
            return this.dateTimeAdapter.getMonth(this._pickerMoment);
        }
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
        return (this.selectMode === 'range' ||
            this.selectMode === 'rangeFrom' ||
            this.selectMode === 'rangeTo');
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
    ngOnInit() {
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        () => {
            this.generateMonthList();
            this.cdRef.markForCheck();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.generateMonthList();
        this.initiated = true;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.localeSub.unsubscribe();
    }
    /**
     * Handle a calendarCell selected
     * @param {?} cell
     * @return {?}
     */
    selectCalendarCell(cell) {
        this.selectMonth(cell.value);
    }
    /**
     * Handle a new month selected
     * @private
     * @param {?} month
     * @return {?}
     */
    selectMonth(month) {
        /** @type {?} */
        const firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        this.monthSelected.emit(firstDateOfMonth);
        /** @type {?} */
        const daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
        /** @type {?} */
        const result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
        this.change.emit(result);
    }
    /**
     * Handle keydown event on calendar body
     * @param {?} event
     * @return {?}
     */
    handleCalendarKeydown(event) {
        /** @type {?} */
        let moment;
        switch (event.keyCode) {
            // minus 1 month
            case LEFT_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 month
            case RIGHT_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
                this.pickerMomentChange.emit(moment);
                break;
            // minus 3 months
            case UP_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -3);
                this.pickerMomentChange.emit(moment);
                break;
            // add 3 months
            case DOWN_ARROW:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 3);
                this.pickerMomentChange.emit(moment);
                break;
            // move to first month of current year
            case HOME:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -this.dateTimeAdapter.getMonth(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // move to last month of current year
            case END:
                moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 11 - this.dateTimeAdapter.getMonth(this.pickerMoment));
                this.pickerMomentChange.emit(moment);
                break;
            // minus 1 year (or 10 year)
            case PAGE_UP:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? -10 : -1);
                this.pickerMomentChange.emit(moment);
                break;
            // add 1 year (or 10 year)
            case PAGE_DOWN:
                moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? 10 : 1);
                this.pickerMomentChange.emit(moment);
                break;
            // Select current month
            case ENTER:
                this.selectMonth(this.dateTimeAdapter.getMonth(this.pickerMoment));
                this.keyboardEnter.emit();
                break;
            default:
                return;
        }
        this.focusActiveCell();
        event.preventDefault();
    }
    /**
     * Generate the calendar month list
     *
     * @private
     * @return {?}
     */
    generateMonthList() {
        if (!this.pickerMoment) {
            return;
        }
        this.setSelectedMonths();
        this.todayMonth = this.getMonthInCurrentYear(this.dateTimeAdapter.now());
        this._months = [];
        for (let i = 0; i < MONTHS_PER_YEAR / MONTHS_PER_ROW; i++) {
            /** @type {?} */
            const row = [];
            for (let j = 0; j < MONTHS_PER_ROW; j++) {
                /** @type {?} */
                const month = j + i * MONTHS_PER_ROW;
                /** @type {?} */
                const monthCell = this.createMonthCell(month);
                row.push(monthCell);
            }
            this._months.push(row);
        }
        return;
    }
    /**
     * Creates an CalendarCell for the given month.
     * @private
     * @param {?} month
     * @return {?}
     */
    createMonthCell(month) {
        /** @type {?} */
        const startDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        /** @type {?} */
        const ariaLabel = this.dateTimeAdapter.format(startDateOfMonth, this.dateTimeFormats.monthYearA11yLabel);
        /** @type {?} */
        const cellClass = 'owl-dt-month-' + month;
        return new CalendarCell(month, this.monthNames[month], ariaLabel, this.isMonthEnabled(month), false, cellClass);
    }
    /**
     * Check if the given month is enable
     * @private
     * @param {?} month
     * @return {?}
     */
    isMonthEnabled(month) {
        /** @type {?} */
        const firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
        // If any date in the month is selectable,
        // we count the month as enable
        for (let date = firstDateOfMonth; this.dateTimeAdapter.getMonth(date) === month; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
            if (!!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate ||
                    this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
                (!this.maxDate ||
                    this.dateTimeAdapter.compare(date, this.maxDate) <= 0)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    getMonthInCurrentYear(date) {
        if (this.getValidDate(date) && this.getValidDate(this._pickerMoment)) {
            /** @type {?} */
            const result = this.dateTimeAdapter.compareYear(date, this._pickerMoment);
            // < 0 : the given date's year is before pickerMoment's year, we return -1 as selected month value.
            // > 0 : the given date's year is after pickerMoment's year, we return 12 as selected month value.
            // 0 : the give date's year is same as the pickerMoment's year, we return the actual month value.
            if (result < 0) {
                return -1;
            }
            else if (result > 0) {
                return 12;
            }
            else {
                return this.dateTimeAdapter.getMonth(date);
            }
        }
        else {
            return null;
        }
    }
    /**
     * Set the selectedMonths value
     * In single mode, it has only one value which represent the month the selected date in
     * In range mode, it would has two values, one for the month the fromValue in and the other for the month the toValue in
     *
     * @private
     * @return {?}
     */
    setSelectedMonths() {
        this.selectedMonths = [];
        if (this.isInSingleMode && this.selected) {
            this.selectedMonths[0] = this.getMonthInCurrentYear(this.selected);
        }
        if (this.isInRangeMode && this.selecteds) {
            this.selectedMonths[0] = this.getMonthInCurrentYear(this.selecteds[0]);
            this.selectedMonths[1] = this.getMonthInCurrentYear(this.selecteds[1]);
        }
    }
    /**
     * Check the given dates are in the same year
     * @private
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    hasSameYear(dateLeft, dateRight) {
        return !!(dateLeft &&
            dateRight &&
            this.dateTimeAdapter.getYear(dateLeft) ===
                this.dateTimeAdapter.getYear(dateRight));
    }
    /**
     * Get a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    getValidDate(obj) {
        return this.dateTimeAdapter.isDateInstance(obj) &&
            this.dateTimeAdapter.isValid(obj)
            ? obj
            : null;
    }
    /**
     * @private
     * @return {?}
     */
    focusActiveCell() {
        this.calendarBodyElm.focusActiveCell();
    }
}
OwlYearViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-date-time-year-view',
                exportAs: 'owlMonthView',
                template: "<table class=\"owl-dt-calendar-table owl-dt-calendar-year-table\">\r\n    <thead class=\"owl-dt-calendar-header\">\r\n    <tr>\r\n        <th class=\"owl-dt-calendar-table-divider\" aria-hidden=\"true\" colspan=\"3\"></th>\r\n    </tr>\r\n    </thead>\r\n    <tbody owl-date-time-calendar-body role=\"grid\"\r\n           [rows]=\"months\" [numCols]=\"3\" [cellRatio]=\"3 / 7\"\r\n           [activeCell]=\"activeCell\"\r\n           [todayValue]=\"todayMonth\"\r\n           [selectedValues]=\"selectedMonths\"\r\n           [selectMode]=\"selectMode\"\r\n           (keydown)=\"handleCalendarKeydown($event)\"\r\n           (select)=\"selectCalendarCell($event)\">\r\n    </tbody>\r\n</table>\r\n",
                host: {
                    '[class.owl-dt-calendar-view]': 'owlDTCalendarView'
                },
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            }] }
];
/** @nocollapse */
OwlYearViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
];
OwlYearViewComponent.propDecorators = {
    selectMode: [{ type: Input }],
    selected: [{ type: Input }],
    selecteds: [{ type: Input }],
    pickerMoment: [{ type: Input }],
    dateFilter: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    change: [{ type: Output }],
    monthSelected: [{ type: Output }],
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
    OwlYearViewComponent.prototype._selectMode;
    /**
     * The currently selected date.
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._pickerMoment;
    /**
     * A function used to filter which dates are selectable
     *
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._dateFilter;
    /**
     * The minimum selectable date.
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._minDate;
    /**
     * The maximum selectable date.
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.monthNames;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype._months;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.localeSub;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.initiated;
    /** @type {?} */
    OwlYearViewComponent.prototype.todayMonth;
    /**
     * An array to hold all selectedDates' month value
     * the value is the month number in current year
     *
     * @type {?}
     */
    OwlYearViewComponent.prototype.selectedMonths;
    /**
     * Callback to invoke when a new month is selected
     *
     * @type {?}
     */
    OwlYearViewComponent.prototype.change;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     *
     * @type {?}
     */
    OwlYearViewComponent.prototype.monthSelected;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    OwlYearViewComponent.prototype.pickerMomentChange;
    /**
     * Emits when use keyboard enter to select a calendar cell
     * @type {?}
     */
    OwlYearViewComponent.prototype.keyboardEnter;
    /**
     * The body of calendar table
     * @type {?}
     */
    OwlYearViewComponent.prototype.calendarBodyElm;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @private
     */
    OwlYearViewComponent.prototype.dateTimeFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2NhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFFSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsWUFBWSxFQUNaLHdCQUF3QixFQUMzQixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQ0gscUJBQXFCLEVBRXhCLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwQyxPQUFPLEVBQ0gsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEVBQ1gsTUFBTSx1QkFBdUIsQ0FBQzs7TUFFekIsZUFBZSxHQUFHLEVBQUU7O01BQ3BCLGNBQWMsR0FBRyxDQUFDOzs7O0FBYXhCLE1BQU0sT0FBTyxvQkFBb0I7Ozs7OztJQW1MN0IsWUFDWSxLQUF3QixFQUNaLGVBQW1DLEVBRy9DLGVBQW1DO1FBSm5DLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ1osb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBRy9DLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjs7Ozs7UUFuTHZDLGdCQUFXLEdBQWUsUUFBUSxDQUFDO1FBMkJuQyxlQUFVLEdBQVEsRUFBRSxDQUFDO1FBMkdyQixjQUFTLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFFN0MsY0FBUyxHQUFHLEtBQUssQ0FBQzs7Ozs7O1FBUW5CLG1CQUFjLEdBQWEsRUFBRSxDQUFDOzs7OztRQU01QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQzs7Ozs7UUFNL0Isa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDOzs7O1FBSXRDLHVCQUFrQixHQUFvQixJQUFJLFlBQVksRUFBSyxDQUFDOzs7O1FBSTVELGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFpQmhFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7OztJQXJMRCxJQUNJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFRCxJQUFJLFVBQVUsQ0FBQyxHQUFlO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzdCO0lBQ0wsQ0FBQzs7OztJQUlELElBQ0ksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELElBQUksUUFBUSxDQUFDLEtBQWU7UUFDeEIsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7O0lBR0QsSUFDSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsSUFBSSxTQUFTLENBQUMsTUFBVztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7a0JBQzlCLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2xEO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQzs7OztJQUdELElBQ0ksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDOzs7OztJQUVELElBQUksWUFBWSxDQUFDLEtBQVE7O2NBQ2YsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhO1FBQ3BDLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsYUFBYTtZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUUzRCxJQUNJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNoRCxJQUFJLENBQUMsU0FBUyxFQUNoQjtZQUNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7OztJQU1ELElBQ0ksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELElBQUksVUFBVSxDQUFDLE1BQTRCO1FBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjtJQUNMLENBQUM7Ozs7SUFJRCxJQUNJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFlO1FBQ3ZCLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7OztJQUlELElBQ0ksT0FBTztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDOzs7OztJQUVELElBQUksT0FBTyxDQUFDLEtBQWU7UUFDdkIsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDOzs7O0lBS0QsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDVixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDNUQ7SUFDTCxDQUFDOzs7O0lBRUQsSUFBSSxjQUFjO1FBQ2QsT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRUQsSUFBSSxhQUFhO1FBQ2IsT0FBTyxDQUNILElBQUksQ0FBQyxVQUFVLEtBQUssT0FBTztZQUMzQixJQUFJLENBQUMsVUFBVSxLQUFLLFdBQVc7WUFDL0IsSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQ2hDLENBQUM7SUFDTixDQUFDOzs7O0lBc0NELElBQUksaUJBQWlCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7SUFZTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDL0QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM5QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFTSxrQkFBa0I7UUFDckIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVNLFdBQVc7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7Ozs7OztJQUtNLGtCQUFrQixDQUFDLElBQWtCO1FBQ3hDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7Ozs7SUFLTyxXQUFXLENBQUMsS0FBYTs7Y0FDdkIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQ3BELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFDL0MsS0FBSyxFQUNMLENBQUMsQ0FDSjtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7O2NBRXBDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUN0RCxnQkFBZ0IsQ0FDbkI7O2NBQ0ssTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQy9DLEtBQUssRUFDTCxJQUFJLENBQUMsR0FBRyxDQUNKLFdBQVcsRUFDWCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQ2xELEVBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUNoRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQ2xELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDckQ7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7Ozs7SUFLTSxxQkFBcUIsQ0FBQyxLQUFvQjs7WUFDekMsTUFBTTtRQUNWLFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNuQixnQkFBZ0I7WUFDaEIsS0FBSyxVQUFVO2dCQUNYLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUMzQyxJQUFJLENBQUMsWUFBWSxFQUNqQixDQUFDLENBQUMsQ0FDTCxDQUFDO2dCQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07WUFFVixjQUFjO1lBQ2QsS0FBSyxXQUFXO2dCQUNaLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUMzQyxJQUFJLENBQUMsWUFBWSxFQUNqQixDQUFDLENBQ0osQ0FBQztnQkFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQyxNQUFNO1lBRVYsaUJBQWlCO1lBQ2pCLEtBQUssUUFBUTtnQkFDVCxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FDM0MsSUFBSSxDQUFDLFlBQVksRUFDakIsQ0FBQyxDQUFDLENBQ0wsQ0FBQztnQkFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQyxNQUFNO1lBRVYsZUFBZTtZQUNmLEtBQUssVUFBVTtnQkFDWCxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FDM0MsSUFBSSxDQUFDLFlBQVksRUFDakIsQ0FBQyxDQUNKLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckMsTUFBTTtZQUVWLHNDQUFzQztZQUN0QyxLQUFLLElBQUk7Z0JBQ0wsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQzNDLElBQUksQ0FBQyxZQUFZLEVBQ2pCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUNwRCxDQUFDO2dCQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07WUFFVixxQ0FBcUM7WUFDckMsS0FBSyxHQUFHO2dCQUNKLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUMzQyxJQUFJLENBQUMsWUFBWSxFQUNqQixFQUFFLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUN4RCxDQUFDO2dCQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07WUFFViw0QkFBNEI7WUFDNUIsS0FBSyxPQUFPO2dCQUNSLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUMxQyxJQUFJLENBQUMsWUFBWSxFQUNqQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzFCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckMsTUFBTTtZQUVWLDBCQUEwQjtZQUMxQixLQUFLLFNBQVM7Z0JBQ1YsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQzFDLElBQUksQ0FBQyxZQUFZLEVBQ2pCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUN4QixDQUFDO2dCQUNGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLE1BQU07WUFFVix1QkFBdUI7WUFDdkIsS0FBSyxLQUFLO2dCQUNOLElBQUksQ0FBQyxXQUFXLENBQ1osSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUNuRCxDQUFDO2dCQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzFCLE1BQU07WUFDVjtnQkFDSSxPQUFPO1NBQ2Q7UUFFRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7Ozs7SUFLTyxpQkFBaUI7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQzdCLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxHQUFHLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7a0JBQ2pELEdBQUcsR0FBRyxFQUFFO1lBRWQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7c0JBQy9CLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGNBQWM7O3NCQUM5QixTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7Z0JBQzdDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDdkI7WUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMxQjtRQUVELE9BQU87SUFDWCxDQUFDOzs7Ozs7O0lBS08sZUFBZSxDQUFDLEtBQWE7O2NBQzNCLGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUNwRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQy9DLEtBQUssRUFDTCxDQUFDLENBQ0o7O2NBQ0ssU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUN6QyxnQkFBZ0IsRUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FDMUM7O2NBQ0ssU0FBUyxHQUFHLGVBQWUsR0FBRyxLQUFLO1FBQ3pDLE9BQU8sSUFBSSxZQUFZLENBQ25CLEtBQUssRUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUN0QixTQUFTLEVBQ1QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFDMUIsS0FBSyxFQUNMLFNBQVMsQ0FDWixDQUFDO0lBQ04sQ0FBQzs7Ozs7OztJQUtPLGNBQWMsQ0FBQyxLQUFhOztjQUMxQixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FDcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUMvQyxLQUFLLEVBQ0wsQ0FBQyxDQUNKO1FBRUQsMENBQTBDO1FBQzFDLCtCQUErQjtRQUMvQixLQUNJLElBQUksSUFBSSxHQUFHLGdCQUFnQixFQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQzdDLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ3REO1lBQ0UsSUFDSSxDQUFDLENBQUMsSUFBSTtnQkFDTixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU87b0JBQ1YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFELENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTztvQkFDVixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUM1RDtnQkFDRSxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7Ozs7OztJQU1PLHFCQUFxQixDQUFDLElBQWM7UUFDeEMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFOztrQkFDNUQsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUMzQyxJQUFJLEVBQ0osSUFBSSxDQUFDLGFBQWEsQ0FDckI7WUFFRCxtR0FBbUc7WUFDbkcsa0dBQWtHO1lBQ2xHLGlHQUFpRztZQUNqRyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNiO2lCQUFNLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkIsT0FBTyxFQUFFLENBQUM7YUFDYjtpQkFBTTtnQkFDSCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlDO1NBQ0o7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDOzs7Ozs7Ozs7SUFPTyxpQkFBaUI7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RFO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQ3BCLENBQUM7WUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FDcEIsQ0FBQztTQUNMO0lBQ0wsQ0FBQzs7Ozs7Ozs7SUFLTyxXQUFXLENBQUMsUUFBVyxFQUFFLFNBQVk7UUFDekMsT0FBTyxDQUFDLENBQUMsQ0FDTCxRQUFRO1lBQ1IsU0FBUztZQUNULElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQzlDLENBQUM7SUFDTixDQUFDOzs7Ozs7O0lBS08sWUFBWSxDQUFDLEdBQVE7UUFDekIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxHQUFHO1lBQ0wsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNmLENBQUM7Ozs7O0lBRU8sZUFBZTtRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNDLENBQUM7OztZQXRmSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLHNzQkFBa0Q7Z0JBRWxELElBQUksRUFBRTtvQkFDRiw4QkFBOEIsRUFBRSxtQkFBbUI7aUJBQ3REO2dCQUNELG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7OztZQS9DRyxpQkFBaUI7WUFlWixlQUFlLHVCQXNOZixRQUFROzRDQUNSLFFBQVEsWUFDUixNQUFNLFNBQUMscUJBQXFCOzs7eUJBakxoQyxLQUFLO3VCQWVMLEtBQUs7d0JBWUwsS0FBSzsyQkFnQkwsS0FBSzt5QkF1QkwsS0FBSztzQkFjTCxLQUFLO3NCQWVMLEtBQUs7cUJBcURMLE1BQU07NEJBTU4sTUFBTTtpQ0FJTixNQUFNOzRCQUlOLE1BQU07OEJBSU4sU0FBUyxTQUFDLHdCQUF3QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7Ozs7Ozs7O0lBdktyRCwyQ0FBMkM7Ozs7OztJQWUzQyx5Q0FBNEI7Ozs7O0lBWTVCLDBDQUE2Qjs7Ozs7SUFnQjdCLDZDQUFnQzs7Ozs7OztJQXVCaEMsMkNBQTBDOzs7Ozs7SUFjMUMsd0NBQTJCOzs7Ozs7SUFlM0Isd0NBQTJCOzs7OztJQWMzQiwwQ0FBc0M7Ozs7O0lBRXRDLHVDQUFrQzs7Ozs7SUF1QmxDLHlDQUFxRDs7Ozs7SUFFckQseUNBQTBCOztJQUUxQiwwQ0FBaUM7Ozs7Ozs7SUFNakMsOENBQXFDOzs7Ozs7SUFLckMsc0NBQ3dDOzs7Ozs7SUFLeEMsNkNBQytDOzs7OztJQUcvQyxrREFDcUU7Ozs7O0lBR3JFLDZDQUNvRTs7Ozs7SUFHcEUsK0NBQzBDOzs7OztJQU90QyxxQ0FBZ0M7Ozs7O0lBQ2hDLCtDQUF1RDs7Ozs7SUFDdkQsK0NBRTJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGNhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbmplY3QsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIE9wdGlvbmFsLFxyXG4gICAgT3V0cHV0LFxyXG4gICAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBDYWxlbmRhckNlbGwsXHJcbiAgICBPd2xDYWxlbmRhckJvZHlDb21wb25lbnRcclxufSBmcm9tICcuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcclxuaW1wb3J0IHtcclxuICAgIE9XTF9EQVRFX1RJTUVfRk9STUFUUyxcclxuICAgIE93bERhdGVUaW1lRm9ybWF0c1xyXG59IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNlbGVjdE1vZGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBET1dOX0FSUk9XLFxyXG4gICAgRU5ELFxyXG4gICAgRU5URVIsXHJcbiAgICBIT01FLFxyXG4gICAgTEVGVF9BUlJPVyxcclxuICAgIFBBR0VfRE9XTixcclxuICAgIFBBR0VfVVAsXHJcbiAgICBSSUdIVF9BUlJPVyxcclxuICAgIFVQX0FSUk9XXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcclxuXHJcbmNvbnN0IE1PTlRIU19QRVJfWUVBUiA9IDEyO1xyXG5jb25zdCBNT05USFNfUEVSX1JPVyA9IDM7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS15ZWFyLXZpZXcnLFxyXG4gICAgZXhwb3J0QXM6ICdvd2xNb250aFZpZXcnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLXllYXItdmlldy5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci15ZWFyLXZpZXcuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhci12aWV3XSc6ICdvd2xEVENhbGVuZGFyVmlldydcclxuICAgIH0sXHJcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPd2xZZWFyVmlld0NvbXBvbmVudDxUPlxyXG4gICAgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBzZWxlY3QgbW9kZSBvZiB0aGUgcGlja2VyO1xyXG4gICAgICogKi9cclxuICAgIHByaXZhdGUgX3NlbGVjdE1vZGU6IFNlbGVjdE1vZGUgPSAnc2luZ2xlJztcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgc2VsZWN0TW9kZSgpOiBTZWxlY3RNb2RlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2VsZWN0TW9kZSh2YWw6IFNlbGVjdE1vZGUpIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID0gdmFsO1xyXG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlTW9udGhMaXN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZDogVCB8IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHNlbGVjdGVkKCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNlbGVjdGVkKHZhbHVlOiBUIHwgbnVsbCkge1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRNb250aHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZHM6IFRbXSA9IFtdO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBzZWxlY3RlZHMoKTogVFtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZWxlY3RlZHModmFsdWVzOiBUW10pIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlc1tpXSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkcy5wdXNoKHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFNlbGVjdGVkTW9udGhzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcGlja2VyTW9tZW50OiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgcGlja2VyTW9tZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrZXJNb21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBpY2tlck1vbWVudCh2YWx1ZTogVCkge1xyXG4gICAgICAgIGNvbnN0IG9sZE1vbWVudCA9IHRoaXMuX3BpY2tlck1vbWVudDtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcclxuICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQgPVxyXG4gICAgICAgICAgICB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgIXRoaXMuaGFzU2FtZVllYXIob2xkTW9tZW50LCB0aGlzLl9waWNrZXJNb21lbnQpICYmXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhdGVkXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlXHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBfZGF0ZUZpbHRlcjogKGRhdGU6IFQpID0+IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IGRhdGVGaWx0ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVGaWx0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRhdGVGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogVCkgPT4gYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2RhdGVGaWx0ZXIgPSBmaWx0ZXI7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVNb250aExpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICAgIHByaXZhdGUgX21pbkRhdGU6IFQgfCBudWxsO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBtaW5EYXRlKCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWluRGF0ZSh2YWx1ZTogVCB8IG51bGwpIHtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcclxuICAgICAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xyXG4gICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlTW9udGhMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgICBwcml2YXRlIF9tYXhEYXRlOiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgbWF4RGF0ZSgpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1heERhdGUodmFsdWU6IFQgfCBudWxsKSB7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcclxuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1vbnRoTmFtZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIHByaXZhdGUgX21vbnRoczogQ2FsZW5kYXJDZWxsW11bXTtcclxuICAgIGdldCBtb250aHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRocztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWN0aXZlQ2VsbCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9waWNrZXJNb21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMuX3BpY2tlck1vbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyB8fFxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJ1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2NhbGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgICBwcml2YXRlIGluaXRpYXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyB0b2RheU1vbnRoOiBudW1iZXIgfCBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW4gYXJyYXkgdG8gaG9sZCBhbGwgc2VsZWN0ZWREYXRlcycgbW9udGggdmFsdWVcclxuICAgICAqIHRoZSB2YWx1ZSBpcyB0aGUgbW9udGggbnVtYmVyIGluIGN1cnJlbnQgeWVhclxyXG4gICAgICogKi9cclxuICAgIHB1YmxpYyBzZWxlY3RlZE1vbnRoczogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgbmV3IG1vbnRoIGlzIHNlbGVjdGVkXHJcbiAgICAgKiAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICByZWFkb25seSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhci4gVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlXHJcbiAgICAgKiAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICByZWFkb25seSBtb250aFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xyXG5cclxuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIGFjdGl2YXRlZC4gKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcmVhZG9ubHkgcGlja2VyTW9tZW50Q2hhbmdlOiBFdmVudEVtaXR0ZXI8VD4gPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XHJcblxyXG4gICAgLyoqIEVtaXRzIHdoZW4gdXNlIGtleWJvYXJkIGVudGVyIHRvIHNlbGVjdCBhIGNhbGVuZGFyIGNlbGwgKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcmVhZG9ubHkga2V5Ym9hcmRFbnRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICAvKiogVGhlIGJvZHkgb2YgY2FsZW5kYXIgdGFibGUgKi9cclxuICAgIEBWaWV3Q2hpbGQoT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50LCB7IHN0YXRpYzogdHJ1ZSB9KVxyXG4gICAgY2FsZW5kYXJCb2R5RWxtOiBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQ7XHJcblxyXG4gICAgZ2V0IG93bERUQ2FsZW5kYXJWaWV3KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXHJcbiAgICAgICAgQE9wdGlvbmFsKClcclxuICAgICAgICBASW5qZWN0KE9XTF9EQVRFX1RJTUVfRk9STUFUUylcclxuICAgICAgICBwcml2YXRlIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLm1vbnRoTmFtZXMgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aE5hbWVzKCdzaG9ydCcpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmxvY2FsZVN1YiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmxvY2FsZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZU1vbnRoTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2NhbGVTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBhIGNhbGVuZGFyQ2VsbCBzZWxlY3RlZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0Q2FsZW5kYXJDZWxsKGNlbGw6IENhbGVuZGFyQ2VsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0TW9udGgoY2VsbC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgYSBuZXcgbW9udGggc2VsZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RNb250aChtb250aDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgZmlyc3REYXRlT2ZNb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5waWNrZXJNb21lbnQpLFxyXG4gICAgICAgICAgICBtb250aCxcclxuICAgICAgICAgICAgMVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMubW9udGhTZWxlY3RlZC5lbWl0KGZpcnN0RGF0ZU9mTW9udGgpO1xyXG5cclxuICAgICAgICBjb25zdCBkYXlzSW5Nb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE51bURheXNJbk1vbnRoKFxyXG4gICAgICAgICAgICBmaXJzdERhdGVPZk1vbnRoXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMucGlja2VyTW9tZW50KSxcclxuICAgICAgICAgICAgbW9udGgsXHJcbiAgICAgICAgICAgIE1hdGgubWluKFxyXG4gICAgICAgICAgICAgICAgZGF5c0luTW9udGgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMucGlja2VyTW9tZW50KVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCksXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5waWNrZXJNb21lbnQpLFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50KVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQocmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBrZXlkb3duIGV2ZW50IG9uIGNhbGVuZGFyIGJvZHlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUNhbGVuZGFyS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBtb21lbnQ7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIG1pbnVzIDEgbW9udGhcclxuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgLTFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCAxIG1vbnRoXHJcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBtaW51cyAzIG1vbnRoc1xyXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgLTNcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCAzIG1vbnRoc1xyXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAzXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBtb3ZlIHRvIGZpcnN0IG1vbnRoIG9mIGN1cnJlbnQgeWVhclxyXG4gICAgICAgICAgICBjYXNlIEhPTUU6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAtdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5waWNrZXJNb21lbnQpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBtb3ZlIHRvIGxhc3QgbW9udGggb2YgY3VycmVudCB5ZWFyXHJcbiAgICAgICAgICAgIGNhc2UgRU5EOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgMTEgLSB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh0aGlzLnBpY2tlck1vbWVudClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIG1pbnVzIDEgeWVhciAob3IgMTAgeWVhcilcclxuICAgICAgICAgICAgY2FzZSBQQUdFX1VQOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5hbHRLZXkgPyAtMTAgOiAtMVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIDEgeWVhciAob3IgMTAgeWVhcilcclxuICAgICAgICAgICAgY2FzZSBQQUdFX0RPV046XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LmFsdEtleSA/IDEwIDogMVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gU2VsZWN0IGN1cnJlbnQgbW9udGhcclxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9udGgoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5waWNrZXJNb21lbnQpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlib2FyZEVudGVyLmVtaXQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGUgdGhlIGNhbGVuZGFyIG1vbnRoIGxpc3RcclxuICAgICAqICovXHJcbiAgICBwcml2YXRlIGdlbmVyYXRlTW9udGhMaXN0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5waWNrZXJNb21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZE1vbnRocygpO1xyXG4gICAgICAgIHRoaXMudG9kYXlNb250aCA9IHRoaXMuZ2V0TW9udGhJbkN1cnJlbnRZZWFyKFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuX21vbnRocyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTU9OVEhTX1BFUl9ZRUFSIC8gTU9OVEhTX1BFUl9ST1c7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgTU9OVEhTX1BFUl9ST1c7IGorKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9udGggPSBqICsgaSAqIE1PTlRIU19QRVJfUk9XO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9udGhDZWxsID0gdGhpcy5jcmVhdGVNb250aENlbGwobW9udGgpO1xyXG4gICAgICAgICAgICAgICAgcm93LnB1c2gobW9udGhDZWxsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fbW9udGhzLnB1c2gocm93KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gQ2FsZW5kYXJDZWxsIGZvciB0aGUgZ2l2ZW4gbW9udGguXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlTW9udGhDZWxsKG1vbnRoOiBudW1iZXIpOiBDYWxlbmRhckNlbGwge1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZU9mTW9udGggPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMucGlja2VyTW9tZW50KSxcclxuICAgICAgICAgICAgbW9udGgsXHJcbiAgICAgICAgICAgIDFcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcclxuICAgICAgICAgICAgc3RhcnREYXRlT2ZNb250aCxcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUZvcm1hdHMubW9udGhZZWFyQTExeUxhYmVsXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBjZWxsQ2xhc3MgPSAnb3dsLWR0LW1vbnRoLScgKyBtb250aDtcclxuICAgICAgICByZXR1cm4gbmV3IENhbGVuZGFyQ2VsbChcclxuICAgICAgICAgICAgbW9udGgsXHJcbiAgICAgICAgICAgIHRoaXMubW9udGhOYW1lc1ttb250aF0sXHJcbiAgICAgICAgICAgIGFyaWFMYWJlbCxcclxuICAgICAgICAgICAgdGhpcy5pc01vbnRoRW5hYmxlZChtb250aCksXHJcbiAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICBjZWxsQ2xhc3NcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIGdpdmVuIG1vbnRoIGlzIGVuYWJsZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzTW9udGhFbmFibGVkKG1vbnRoOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBmaXJzdERhdGVPZk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnBpY2tlck1vbWVudCksXHJcbiAgICAgICAgICAgIG1vbnRoLFxyXG4gICAgICAgICAgICAxXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gSWYgYW55IGRhdGUgaW4gdGhlIG1vbnRoIGlzIHNlbGVjdGFibGUsXHJcbiAgICAgICAgLy8gd2UgY291bnQgdGhlIG1vbnRoIGFzIGVuYWJsZVxyXG4gICAgICAgIGZvciAoXHJcbiAgICAgICAgICAgIGxldCBkYXRlID0gZmlyc3REYXRlT2ZNb250aDtcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZSkgPT09IG1vbnRoO1xyXG4gICAgICAgICAgICBkYXRlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKGRhdGUsIDEpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICEhZGF0ZSAmJlxyXG4gICAgICAgICAgICAgICAgKCF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUpKSAmJlxyXG4gICAgICAgICAgICAgICAgKCF0aGlzLm1pbkRhdGUgfHxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGUsIHRoaXMubWluRGF0ZSkgPj0gMCkgJiZcclxuICAgICAgICAgICAgICAgICghdGhpcy5tYXhEYXRlIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlLCB0aGlzLm1heERhdGUpIDw9IDApXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIG1vbnRoIGluIHRoaXMgeWVhciB0aGF0IHRoZSBnaXZlbiBEYXRlIGZhbGxzIG9uLlxyXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSBnaXZlbiBEYXRlIGlzIGluIGFub3RoZXIgeWVhci5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRNb250aEluQ3VycmVudFllYXIoZGF0ZTogVCB8IG51bGwpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLmdldFZhbGlkRGF0ZShkYXRlKSAmJiB0aGlzLmdldFZhbGlkRGF0ZSh0aGlzLl9waWNrZXJNb21lbnQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmVZZWFyKFxyXG4gICAgICAgICAgICAgICAgZGF0ZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BpY2tlck1vbWVudFxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gPCAwIDogdGhlIGdpdmVuIGRhdGUncyB5ZWFyIGlzIGJlZm9yZSBwaWNrZXJNb21lbnQncyB5ZWFyLCB3ZSByZXR1cm4gLTEgYXMgc2VsZWN0ZWQgbW9udGggdmFsdWUuXHJcbiAgICAgICAgICAgIC8vID4gMCA6IHRoZSBnaXZlbiBkYXRlJ3MgeWVhciBpcyBhZnRlciBwaWNrZXJNb21lbnQncyB5ZWFyLCB3ZSByZXR1cm4gMTIgYXMgc2VsZWN0ZWQgbW9udGggdmFsdWUuXHJcbiAgICAgICAgICAgIC8vIDAgOiB0aGUgZ2l2ZSBkYXRlJ3MgeWVhciBpcyBzYW1lIGFzIHRoZSBwaWNrZXJNb21lbnQncyB5ZWFyLCB3ZSByZXR1cm4gdGhlIGFjdHVhbCBtb250aCB2YWx1ZS5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHNlbGVjdGVkTW9udGhzIHZhbHVlXHJcbiAgICAgKiBJbiBzaW5nbGUgbW9kZSwgaXQgaGFzIG9ubHkgb25lIHZhbHVlIHdoaWNoIHJlcHJlc2VudCB0aGUgbW9udGggdGhlIHNlbGVjdGVkIGRhdGUgaW5cclxuICAgICAqIEluIHJhbmdlIG1vZGUsIGl0IHdvdWxkIGhhcyB0d28gdmFsdWVzLCBvbmUgZm9yIHRoZSBtb250aCB0aGUgZnJvbVZhbHVlIGluIGFuZCB0aGUgb3RoZXIgZm9yIHRoZSBtb250aCB0aGUgdG9WYWx1ZSBpblxyXG4gICAgICogKi9cclxuICAgIHByaXZhdGUgc2V0U2VsZWN0ZWRNb250aHMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRocyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlICYmIHRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE1vbnRoc1swXSA9IHRoaXMuZ2V0TW9udGhJbkN1cnJlbnRZZWFyKHRoaXMuc2VsZWN0ZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSAmJiB0aGlzLnNlbGVjdGVkcykge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGhzWzBdID0gdGhpcy5nZXRNb250aEluQ3VycmVudFllYXIoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkc1swXVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTW9udGhzWzFdID0gdGhpcy5nZXRNb250aEluQ3VycmVudFllYXIoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkc1sxXVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIHRoZSBnaXZlbiBkYXRlcyBhcmUgaW4gdGhlIHNhbWUgeWVhclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhc1NhbWVZZWFyKGRhdGVMZWZ0OiBULCBkYXRlUmlnaHQ6IFQpIHtcclxuICAgICAgICByZXR1cm4gISEoXHJcbiAgICAgICAgICAgIGRhdGVMZWZ0ICYmXHJcbiAgICAgICAgICAgIGRhdGVSaWdodCAmJlxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGVMZWZ0KSA9PT1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZVJpZ2h0KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSB2YWxpZCBkYXRlIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJlxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcclxuICAgICAgICAgICAgPyBvYmpcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZm9jdXNBY3RpdmVDZWxsKCkge1xyXG4gICAgICAgIHRoaXMuY2FsZW5kYXJCb2R5RWxtLmZvY3VzQWN0aXZlQ2VsbCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==