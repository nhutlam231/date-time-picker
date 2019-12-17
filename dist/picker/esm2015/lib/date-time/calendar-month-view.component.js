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
const DAYS_PER_WEEK = 7;
/** @type {?} */
const WEEKS_PER_VIEW = 6;
/**
 * @template T
 */
export class OwlMonthViewComponent {
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
    /**
     * @return {?}
     */
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set firstDayOfWeek(val) {
        val = coerceNumberProperty(val);
        if (val >= 0 && val <= 6 && val !== this._firstDayOfWeek) {
            this._firstDayOfWeek = val;
            if (this.initiated) {
                this.generateWeekDays();
                this.generateCalendar();
                this.cdRef.markForCheck();
            }
        }
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
            this.generateCalendar();
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
            this.setSelectedDates();
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
        v => {
            v = this.dateTimeAdapter.deserialize(v);
            return this.getValidDate(v);
        }));
        this.setSelectedDates();
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
        this.firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this._pickerMoment), this.dateTimeAdapter.getMonth(this._pickerMoment), 1);
        if (!this.isSameMonth(oldMoment, this._pickerMoment) &&
            this.initiated) {
            this.generateCalendar();
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
            this.generateCalendar();
            this.cdRef.markForCheck();
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
            this.generateCalendar();
            this.cdRef.markForCheck();
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
            this.generateCalendar();
            this.cdRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get weekdays() {
        return this._weekdays;
    }
    /**
     * @return {?}
     */
    get days() {
        return this._days;
    }
    /**
     * @return {?}
     */
    get activeCell() {
        if (this.pickerMoment) {
            return (this.dateTimeAdapter.getDate(this.pickerMoment) +
                this.firstRowOffset -
                1);
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
        this.generateWeekDays();
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        () => {
            this.generateWeekDays();
            this.generateCalendar();
            this.cdRef.markForCheck();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.generateCalendar();
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
        // Cases in which the date would not be selected
        // 1, the calendar cell is NOT enabled (is NOT valid)
        // 2, the selected date is NOT in current picker's month and the hideOtherMonths is enabled
        if (!cell.enabled || (this.hideOtherMonths && cell.out)) {
            return;
        }
        this.selectDate(cell.value);
    }
    /**
     * Handle a new date selected
     * @private
     * @param {?} date
     * @return {?}
     */
    selectDate(date) {
        /** @type {?} */
        const daysDiff = date - 1;
        /** @type {?} */
        const selected = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
        this.selectedChange.emit(selected);
        this.userSelection.emit();
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
    }
    /**
     * Generate the calendar weekdays array
     *
     * @private
     * @return {?}
     */
    generateWeekDays() {
        /** @type {?} */
        const longWeekdays = this.dateTimeAdapter.getDayOfWeekNames('long');
        /** @type {?} */
        const shortWeekdays = this.dateTimeAdapter.getDayOfWeekNames('short');
        /** @type {?} */
        const narrowWeekdays = this.dateTimeAdapter.getDayOfWeekNames('narrow');
        /** @type {?} */
        const firstDayOfWeek = this.firstDayOfWeek;
        /** @type {?} */
        const weekdays = longWeekdays.map((/**
         * @param {?} long
         * @param {?} i
         * @return {?}
         */
        (long, i) => {
            return { long, short: shortWeekdays[i], narrow: narrowWeekdays[i] };
        }));
        this._weekdays = weekdays
            .slice(firstDayOfWeek)
            .concat(weekdays.slice(0, firstDayOfWeek));
        this.dateNames = this.dateTimeAdapter.getDateNames();
        return;
    }
    /**
     * Generate the calendar days array
     *
     * @private
     * @return {?}
     */
    generateCalendar() {
        if (!this.pickerMoment) {
            return;
        }
        this.todayDate = null;
        // the first weekday of the month
        /** @type {?} */
        const startWeekdayOfMonth = this.dateTimeAdapter.getDay(this.firstDateOfMonth);
        /** @type {?} */
        const firstDayOfWeek = this.firstDayOfWeek;
        // the amount of days from the first date of the month
        // if it is < 0, it means the date is in previous month
        /** @type {?} */
        let daysDiff = 0 -
            ((startWeekdayOfMonth + (DAYS_PER_WEEK - firstDayOfWeek)) %
                DAYS_PER_WEEK);
        // the index of cell that contains the first date of the month
        this.firstRowOffset = Math.abs(daysDiff);
        this._days = [];
        for (let i = 0; i < WEEKS_PER_VIEW; i++) {
            /** @type {?} */
            const week = [];
            for (let j = 0; j < DAYS_PER_WEEK; j++) {
                /** @type {?} */
                const date = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
                /** @type {?} */
                const dateCell = this.createDateCell(date, daysDiff);
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
    }
    /**
     * Creates CalendarCell for days.
     * @private
     * @param {?} date
     * @param {?} daysDiff
     * @return {?}
     */
    createDateCell(date, daysDiff) {
        // total days of the month
        /** @type {?} */
        const daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment);
        /** @type {?} */
        const dateNum = this.dateTimeAdapter.getDate(date);
        // const dateName = this.dateNames[dateNum - 1];
        /** @type {?} */
        const dateName = dateNum.toString();
        /** @type {?} */
        const ariaLabel = this.dateTimeAdapter.format(date, this.dateTimeFormats.dateA11yLabel);
        // check if the date if selectable
        /** @type {?} */
        const enabled = this.isDateEnabled(date);
        // check if date is not in current month
        /** @type {?} */
        const dayValue = daysDiff + 1;
        /** @type {?} */
        const out = dayValue < 1 || dayValue > daysInMonth;
        /** @type {?} */
        const cellClass = 'owl-dt-day-' + this.dateTimeAdapter.getDay(date);
        return new CalendarCell(dayValue, dateName, ariaLabel, enabled, out, cellClass);
    }
    /**
     * Check if the date is valid
     * @private
     * @param {?} date
     * @return {?}
     */
    isDateEnabled(date) {
        return (!!date &&
            (!this.dateFilter || this.dateFilter(date)) &&
            (!this.minDate ||
                this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
            (!this.maxDate ||
                this.dateTimeAdapter.compare(date, this.maxDate) <= 0));
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
     * Check if the give dates are none-null and in the same month
     * @param {?} dateLeft
     * @param {?} dateRight
     * @return {?}
     */
    isSameMonth(dateLeft, dateRight) {
        return !!(dateLeft &&
            dateRight &&
            this.dateTimeAdapter.isValid(dateLeft) &&
            this.dateTimeAdapter.isValid(dateRight) &&
            this.dateTimeAdapter.getYear(dateLeft) ===
                this.dateTimeAdapter.getYear(dateRight) &&
            this.dateTimeAdapter.getMonth(dateLeft) ===
                this.dateTimeAdapter.getMonth(dateRight));
    }
    /**
     * Set the selectedDates value.
     * In single mode, it has only one value which represent the selected date
     * In range mode, it would has two values, one for the fromValue and the other for the toValue
     *
     * @private
     * @return {?}
     */
    setSelectedDates() {
        this.selectedDates = [];
        if (!this.firstDateOfMonth) {
            return;
        }
        if (this.isInSingleMode && this.selected) {
            /** @type {?} */
            const dayDiff = this.dateTimeAdapter.differenceInCalendarDays(this.selected, this.firstDateOfMonth);
            this.selectedDates[0] = dayDiff + 1;
            return;
        }
        if (this.isInRangeMode && this.selecteds) {
            this.selectedDates = this.selecteds.map((/**
             * @param {?} selected
             * @return {?}
             */
            selected => {
                if (this.dateTimeAdapter.isValid(selected)) {
                    /** @type {?} */
                    const dayDiff = this.dateTimeAdapter.differenceInCalendarDays(selected, this.firstDateOfMonth);
                    return dayDiff + 1;
                }
                else {
                    return null;
                }
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    focusActiveCell() {
        this.calendarBodyElm.focusActiveCell();
    }
}
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
OwlMonthViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxZQUFZLEVBQ1osd0JBQXdCLEVBQzNCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFDSCxxQkFBcUIsRUFFeEIsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFDSCxVQUFVLEVBQ1YsR0FBRyxFQUNILEtBQUssRUFDTCxJQUFJLEVBQ0osVUFBVSxFQUNWLFNBQVMsRUFDVCxPQUFPLEVBQ1AsV0FBVyxFQUNYLFFBQVEsRUFDWCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztNQUV2RCxhQUFhLEdBQUcsQ0FBQzs7TUFDakIsY0FBYyxHQUFHLENBQUM7Ozs7QUFheEIsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7O0lBeU85QixZQUNZLEtBQXdCLEVBQ1osZUFBbUMsRUFHL0MsZUFBbUM7UUFKbkMsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0Msb0JBQWUsR0FBZixlQUFlLENBQW9COzs7OztRQXhPL0Msb0JBQWUsR0FBWSxLQUFLLENBQUM7Ozs7OztR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Y2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbmplY3QsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIE9wdGlvbmFsLFxyXG4gICAgT3V0cHV0LFxyXG4gICAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBDYWxlbmRhckNlbGwsXHJcbiAgICBPd2xDYWxlbmRhckJvZHlDb21wb25lbnRcclxufSBmcm9tICcuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcclxuaW1wb3J0IHtcclxuICAgIE9XTF9EQVRFX1RJTUVfRk9STUFUUyxcclxuICAgIE93bERhdGVUaW1lRm9ybWF0c1xyXG59IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNlbGVjdE1vZGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBET1dOX0FSUk9XLFxyXG4gICAgRU5ELFxyXG4gICAgRU5URVIsXHJcbiAgICBIT01FLFxyXG4gICAgTEVGVF9BUlJPVyxcclxuICAgIFBBR0VfRE9XTixcclxuICAgIFBBR0VfVVAsXHJcbiAgICBSSUdIVF9BUlJPVyxcclxuICAgIFVQX0FSUk9XXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcclxuaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xyXG5cclxuY29uc3QgREFZU19QRVJfV0VFSyA9IDc7XHJcbmNvbnN0IFdFRUtTX1BFUl9WSUVXID0gNjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLW1vbnRoLXZpZXcnLFxyXG4gICAgZXhwb3J0QXM6ICdvd2xZZWFyVmlldycsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtY2FsZW5kYXItdmlld10nOiAnb3dsRFRDYWxlbmRhclZpZXcnXHJcbiAgICB9LFxyXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgT3dsTW9udGhWaWV3Q29tcG9uZW50PFQ+XHJcbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciB0byBoaWRlIGRhdGVzIGluIG90aGVyIG1vbnRocyBhdCB0aGUgc3RhcnQgb3IgZW5kIG9mIHRoZSBjdXJyZW50IG1vbnRoLlxyXG4gICAgICogKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBoaWRlT3RoZXJNb250aHM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZSB0aGUgZmlyc3QgZGF5IG9mIGEgd2Vla1xyXG4gICAgICogU3VuZGF5OiAwIH4gU2F0dXJkYXk6IDZcclxuICAgICAqICovXHJcbiAgICBwcml2YXRlIF9maXJzdERheU9mV2VlazogbnVtYmVyID0gMDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgZmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3REYXlPZldlZWs7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGZpcnN0RGF5T2ZXZWVrKHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFsID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsKTtcclxuICAgICAgICBpZiAodmFsID49IDAgJiYgdmFsIDw9IDYgJiYgdmFsICE9PSB0aGlzLl9maXJzdERheU9mV2Vlaykge1xyXG4gICAgICAgICAgICB0aGlzLl9maXJzdERheU9mV2VlayA9IHZhbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYXRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZVdlZWtEYXlzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2VsZWN0IG1vZGUgb2YgdGhlIHBpY2tlcjtcclxuICAgICAqICovXHJcbiAgICBwcml2YXRlIF9zZWxlY3RNb2RlOiBTZWxlY3RNb2RlID0gJ3NpbmdsZSc7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNlbGVjdE1vZGUodmFsOiBTZWxlY3RNb2RlKSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZDogVCB8IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHNlbGVjdGVkKCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNlbGVjdGVkKHZhbHVlOiBUIHwgbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IG9sZFNlbGVjdGVkID0gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNTYW1lRGF5KG9sZFNlbGVjdGVkLCB0aGlzLl9zZWxlY3RlZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZERhdGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NlbGVjdGVkczogVFtdID0gW107XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHNlbGVjdGVkcygpOiBUW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkcyA9IHZhbHVlcy5tYXAodiA9PiB7XHJcbiAgICAgICAgICAgIHYgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsaWREYXRlKHYpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWREYXRlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3BpY2tlck1vbWVudDogVDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgcGlja2VyTW9tZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrZXJNb21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBpY2tlck1vbWVudCh2YWx1ZTogVCkge1xyXG4gICAgICAgIGNvbnN0IG9sZE1vbWVudCA9IHRoaXMuX3BpY2tlck1vbWVudDtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcclxuICAgICAgICB0aGlzLl9waWNrZXJNb21lbnQgPVxyXG4gICAgICAgICAgICB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSkgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XHJcblxyXG4gICAgICAgIHRoaXMuZmlyc3REYXRlT2ZNb250aCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodGhpcy5fcGlja2VyTW9tZW50KSxcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5fcGlja2VyTW9tZW50KSxcclxuICAgICAgICAgICAgMVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgIXRoaXMuaXNTYW1lTW9udGgob2xkTW9tZW50LCB0aGlzLl9waWNrZXJNb21lbnQpICYmXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhdGVkXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgZnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGVcclxuICAgICAqICovXHJcbiAgICBwcml2YXRlIF9kYXRlRmlsdGVyOiAoZGF0ZTogVCkgPT4gYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgZGF0ZUZpbHRlcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUZpbHRlcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGF0ZUZpbHRlcihmaWx0ZXI6IChkYXRlOiBUKSA9PiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0ZUZpbHRlciA9IGZpbHRlcjtcclxuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgICBwcml2YXRlIF9taW5EYXRlOiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgbWluRGF0ZSgpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1pbkRhdGUodmFsdWU6IFQgfCBudWxsKSB7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcclxuICAgICAgICBpZiAodGhpcy5pbml0aWF0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgICBwcml2YXRlIF9tYXhEYXRlOiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgbWF4RGF0ZSgpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1heERhdGUodmFsdWU6IFQgfCBudWxsKSB7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVDYWxlbmRhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF93ZWVrZGF5czogQXJyYXk8eyBsb25nOiBzdHJpbmc7IHNob3J0OiBzdHJpbmc7IG5hcnJvdzogc3RyaW5nIH0+O1xyXG4gICAgZ2V0IHdlZWtkYXlzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5cztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kYXlzOiBDYWxlbmRhckNlbGxbXVtdO1xyXG4gICAgZ2V0IGRheXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RheXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFjdGl2ZUNlbGwoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5waWNrZXJNb21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpICtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RSb3dPZmZzZXQgLVxyXG4gICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgfHxcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VUbydcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZmlyc3REYXRlT2ZNb250aDogVDtcclxuXHJcbiAgICBwcml2YXRlIGxvY2FsZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhdGVkID0gZmFsc2U7XHJcblxyXG4gICAgcHJpdmF0ZSBkYXRlTmFtZXM6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRhdGUgb2YgdGhlIG1vbnRoIHRoYXQgdG9kYXkgZmFsbHMgb24uXHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIHRvZGF5RGF0ZTogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuIGFycmF5IHRvIGhvbGQgYWxsIHNlbGVjdGVkRGF0ZXMnIHZhbHVlXHJcbiAgICAgKiB0aGUgdmFsdWUgaXMgdGhlIGRheSBudW1iZXIgaW4gY3VycmVudCBtb250aFxyXG4gICAgICogKi9cclxuICAgIHB1YmxpYyBzZWxlY3RlZERhdGVzOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIC8vIHRoZSBpbmRleCBvZiBjZWxsIHRoYXQgY29udGFpbnMgdGhlIGZpcnN0IGRhdGUgb2YgdGhlIG1vbnRoXHJcbiAgICBwdWJsaWMgZmlyc3RSb3dPZmZzZXQ6IG51bWJlcjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgbmV3IGRhdGUgaXMgc2VsZWN0ZWRcclxuICAgICAqICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUIHwgbnVsbD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGFueSBkYXRlIGlzIHNlbGVjdGVkLlxyXG4gICAgICogKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcmVhZG9ubHkgdXNlclNlbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBhY3RpdmF0ZWQuICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHJlYWRvbmx5IHBpY2tlck1vbWVudENoYW5nZTogRXZlbnRFbWl0dGVyPFQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xyXG5cclxuICAgIC8qKiBUaGUgYm9keSBvZiBjYWxlbmRhciB0YWJsZSAqL1xyXG4gICAgQFZpZXdDaGlsZChPd2xDYWxlbmRhckJvZHlDb21wb25lbnQsIHsgc3RhdGljOiB0cnVlIH0pXHJcbiAgICBjYWxlbmRhckJvZHlFbG06IE93bENhbGVuZGFyQm9keUNvbXBvbmVudDtcclxuXHJcbiAgICBnZXQgb3dsRFRDYWxlbmRhclZpZXcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcclxuICAgICAgICBAT3B0aW9uYWwoKVxyXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxyXG4gICAgICAgIHByaXZhdGUgZGF0ZVRpbWVGb3JtYXRzOiBPd2xEYXRlVGltZUZvcm1hdHNcclxuICAgICkge31cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVdlZWtEYXlzKCk7XHJcblxyXG4gICAgICAgIHRoaXMubG9jYWxlU3ViID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIubG9jYWxlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlV2Vla0RheXMoKTtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUNhbGVuZGFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlQ2FsZW5kYXIoKTtcclxuICAgICAgICB0aGlzLmluaXRpYXRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubG9jYWxlU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgYSBjYWxlbmRhckNlbGwgc2VsZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdENhbGVuZGFyQ2VsbChjZWxsOiBDYWxlbmRhckNlbGwpOiB2b2lkIHtcclxuICAgICAgICAvLyBDYXNlcyBpbiB3aGljaCB0aGUgZGF0ZSB3b3VsZCBub3QgYmUgc2VsZWN0ZWRcclxuICAgICAgICAvLyAxLCB0aGUgY2FsZW5kYXIgY2VsbCBpcyBOT1QgZW5hYmxlZCAoaXMgTk9UIHZhbGlkKVxyXG4gICAgICAgIC8vIDIsIHRoZSBzZWxlY3RlZCBkYXRlIGlzIE5PVCBpbiBjdXJyZW50IHBpY2tlcidzIG1vbnRoIGFuZCB0aGUgaGlkZU90aGVyTW9udGhzIGlzIGVuYWJsZWRcclxuICAgICAgICBpZiAoIWNlbGwuZW5hYmxlZCB8fCAodGhpcy5oaWRlT3RoZXJNb250aHMgJiYgY2VsbC5vdXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0RGF0ZShjZWxsLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBhIG5ldyBkYXRlIHNlbGVjdGVkXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2VsZWN0RGF0ZShkYXRlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBkYXlzRGlmZiA9IGRhdGUgLSAxO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxyXG4gICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGgsXHJcbiAgICAgICAgICAgIGRheXNEaWZmXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHNlbGVjdGVkKTtcclxuICAgICAgICB0aGlzLnVzZXJTZWxlY3Rpb24uZW1pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGtleWRvd24gZXZlbnQgb24gY2FsZW5kYXIgYm9keVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFuZGxlQ2FsZW5kYXJLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1vbWVudDtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgLy8gbWludXMgMSBkYXlcclxuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIC0xXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgMSBkYXlcclxuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcclxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBtaW51cyAxIHdlZWtcclxuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcclxuICAgICAgICAgICAgICAgIG1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyRGF5cyhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAtN1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIDEgd2Vla1xyXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgN1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gbW92ZSB0byBmaXJzdCBkYXkgb2YgY3VycmVudCBtb250aFxyXG4gICAgICAgICAgICBjYXNlIEhPTUU6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgMSAtIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdChtb21lbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBtb3ZlIHRvIGxhc3QgZGF5IG9mIGN1cnJlbnQgbW9udGhcclxuICAgICAgICAgICAgY2FzZSBFTkQ6XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhckRheXMoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgodGhpcy5waWNrZXJNb21lbnQpIC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnBpY2tlck1vbWVudClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudENoYW5nZS5lbWl0KG1vbWVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIG1pbnVzIDEgbW9udGggKG9yIDEgeWVhcilcclxuICAgICAgICAgICAgY2FzZSBQQUdFX1VQOlxyXG4gICAgICAgICAgICAgICAgbW9tZW50ID0gZXZlbnQuYWx0S2V5XHJcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC0xXHJcbiAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmRhdGVUaW1lQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAtMVxyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gYWRkIDEgbW9udGggKG9yIDEgeWVhcilcclxuICAgICAgICAgICAgY2FzZSBQQUdFX0RPV046XHJcbiAgICAgICAgICAgICAgICBtb21lbnQgPSBldmVudC5hbHRLZXlcclxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQobW9tZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gc2VsZWN0IHRoZSBwaWNrZXJNb21lbnRcclxuICAgICAgICAgICAgY2FzZSBFTlRFUjpcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcih0aGlzLnBpY2tlck1vbWVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdERhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodGhpcy5waWNrZXJNb21lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGUgdGhlIGNhbGVuZGFyIHdlZWtkYXlzIGFycmF5XHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZVdlZWtEYXlzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGxvbmdXZWVrZGF5cyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERheU9mV2Vla05hbWVzKCdsb25nJyk7XHJcbiAgICAgICAgY29uc3Qgc2hvcnRXZWVrZGF5cyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERheU9mV2Vla05hbWVzKCdzaG9ydCcpO1xyXG4gICAgICAgIGNvbnN0IG5hcnJvd1dlZWtkYXlzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF5T2ZXZWVrTmFtZXMoJ25hcnJvdycpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0RGF5T2ZXZWVrID0gdGhpcy5maXJzdERheU9mV2VlaztcclxuXHJcbiAgICAgICAgY29uc3Qgd2Vla2RheXMgPSBsb25nV2Vla2RheXMubWFwKChsb25nLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGxvbmcsIHNob3J0OiBzaG9ydFdlZWtkYXlzW2ldLCBuYXJyb3c6IG5hcnJvd1dlZWtkYXlzW2ldIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuX3dlZWtkYXlzID0gd2Vla2RheXNcclxuICAgICAgICAgICAgLnNsaWNlKGZpcnN0RGF5T2ZXZWVrKVxyXG4gICAgICAgICAgICAuY29uY2F0KHdlZWtkYXlzLnNsaWNlKDAsIGZpcnN0RGF5T2ZXZWVrKSk7XHJcblxyXG4gICAgICAgIHRoaXMuZGF0ZU5hbWVzID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZU5hbWVzKCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdlbmVyYXRlIHRoZSBjYWxlbmRhciBkYXlzIGFycmF5XHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZUNhbGVuZGFyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5waWNrZXJNb21lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50b2RheURhdGUgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyB0aGUgZmlyc3Qgd2Vla2RheSBvZiB0aGUgbW9udGhcclxuICAgICAgICBjb25zdCBzdGFydFdlZWtkYXlPZk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF5KFxyXG4gICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGhcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0RGF5T2ZXZWVrID0gdGhpcy5maXJzdERheU9mV2VlaztcclxuXHJcbiAgICAgICAgLy8gdGhlIGFtb3VudCBvZiBkYXlzIGZyb20gdGhlIGZpcnN0IGRhdGUgb2YgdGhlIG1vbnRoXHJcbiAgICAgICAgLy8gaWYgaXQgaXMgPCAwLCBpdCBtZWFucyB0aGUgZGF0ZSBpcyBpbiBwcmV2aW91cyBtb250aFxyXG4gICAgICAgIGxldCBkYXlzRGlmZiA9XHJcbiAgICAgICAgICAgIDAgLVxyXG4gICAgICAgICAgICAoKHN0YXJ0V2Vla2RheU9mTW9udGggKyAoREFZU19QRVJfV0VFSyAtIGZpcnN0RGF5T2ZXZWVrKSkgJVxyXG4gICAgICAgICAgICAgICAgREFZU19QRVJfV0VFSyk7XHJcblxyXG4gICAgICAgIC8vIHRoZSBpbmRleCBvZiBjZWxsIHRoYXQgY29udGFpbnMgdGhlIGZpcnN0IGRhdGUgb2YgdGhlIG1vbnRoXHJcbiAgICAgICAgdGhpcy5maXJzdFJvd09mZnNldCA9IE1hdGguYWJzKGRheXNEaWZmKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZGF5cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgV0VFS1NfUEVSX1ZJRVc7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB3ZWVrID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgREFZU19QRVJfV0VFSzsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3REYXRlT2ZNb250aCxcclxuICAgICAgICAgICAgICAgICAgICBkYXlzRGlmZlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVDZWxsID0gdGhpcy5jcmVhdGVEYXRlQ2VsbChkYXRlLCBkYXlzRGlmZik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGRhdGUgaXMgdG9kYXlcclxuICAgICAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1NhbWVEYXkoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2RheURhdGUgPSBkYXlzRGlmZiArIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgd2Vlay5wdXNoKGRhdGVDZWxsKTtcclxuICAgICAgICAgICAgICAgIGRheXNEaWZmICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fZGF5cy5wdXNoKHdlZWspO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZERhdGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIENhbGVuZGFyQ2VsbCBmb3IgZGF5cy5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVEYXRlQ2VsbChkYXRlOiBULCBkYXlzRGlmZjogbnVtYmVyKTogQ2FsZW5kYXJDZWxsIHtcclxuICAgICAgICAvLyB0b3RhbCBkYXlzIG9mIHRoZSBtb250aFxyXG4gICAgICAgIGNvbnN0IGRheXNJbk1vbnRoID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgoXHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50XHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBkYXRlTnVtID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZShkYXRlKTtcclxuICAgICAgICAvLyBjb25zdCBkYXRlTmFtZSA9IHRoaXMuZGF0ZU5hbWVzW2RhdGVOdW0gLSAxXTtcclxuICAgICAgICBjb25zdCBkYXRlTmFtZSA9IGRhdGVOdW0udG9TdHJpbmcoKTtcclxuICAgICAgICBjb25zdCBhcmlhTGFiZWwgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoXHJcbiAgICAgICAgICAgIGRhdGUsXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLmRhdGVBMTF5TGFiZWxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZGF0ZSBpZiBzZWxlY3RhYmxlXHJcbiAgICAgICAgY29uc3QgZW5hYmxlZCA9IHRoaXMuaXNEYXRlRW5hYmxlZChkYXRlKTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgZGF0ZSBpcyBub3QgaW4gY3VycmVudCBtb250aFxyXG4gICAgICAgIGNvbnN0IGRheVZhbHVlID0gZGF5c0RpZmYgKyAxO1xyXG4gICAgICAgIGNvbnN0IG91dCA9IGRheVZhbHVlIDwgMSB8fCBkYXlWYWx1ZSA+IGRheXNJbk1vbnRoO1xyXG4gICAgICAgIGNvbnN0IGNlbGxDbGFzcyA9ICdvd2wtZHQtZGF5LScgKyB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXkoZGF0ZSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgQ2FsZW5kYXJDZWxsKFxyXG4gICAgICAgICAgICBkYXlWYWx1ZSxcclxuICAgICAgICAgICAgZGF0ZU5hbWUsXHJcbiAgICAgICAgICAgIGFyaWFMYWJlbCxcclxuICAgICAgICAgICAgZW5hYmxlZCxcclxuICAgICAgICAgICAgb3V0LFxyXG4gICAgICAgICAgICBjZWxsQ2xhc3NcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIGRhdGUgaXMgdmFsaWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0RhdGVFbmFibGVkKGRhdGU6IFQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAhIWRhdGUgJiZcclxuICAgICAgICAgICAgKCF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUpKSAmJlxyXG4gICAgICAgICAgICAoIXRoaXMubWluRGF0ZSB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlLCB0aGlzLm1pbkRhdGUpID49IDApICYmXHJcbiAgICAgICAgICAgICghdGhpcy5tYXhEYXRlIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGRhdGUsIHRoaXMubWF4RGF0ZSkgPD0gMClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IGEgdmFsaWQgZGF0ZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiZcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChvYmopXHJcbiAgICAgICAgICAgID8gb2JqXHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlIGRhdGVzIGFyZSBub25lLW51bGwgYW5kIGluIHRoZSBzYW1lIG1vbnRoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc1NhbWVNb250aChkYXRlTGVmdDogVCwgZGF0ZVJpZ2h0OiBUKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhKFxyXG4gICAgICAgICAgICBkYXRlTGVmdCAmJlxyXG4gICAgICAgICAgICBkYXRlUmlnaHQgJiZcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChkYXRlTGVmdCkgJiZcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChkYXRlUmlnaHQpICYmXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZUxlZnQpID09PVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlUmlnaHQpICYmXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGVMZWZ0KSA9PT1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGVSaWdodClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBzZWxlY3RlZERhdGVzIHZhbHVlLlxyXG4gICAgICogSW4gc2luZ2xlIG1vZGUsIGl0IGhhcyBvbmx5IG9uZSB2YWx1ZSB3aGljaCByZXByZXNlbnQgdGhlIHNlbGVjdGVkIGRhdGVcclxuICAgICAqIEluIHJhbmdlIG1vZGUsIGl0IHdvdWxkIGhhcyB0d28gdmFsdWVzLCBvbmUgZm9yIHRoZSBmcm9tVmFsdWUgYW5kIHRoZSBvdGhlciBmb3IgdGhlIHRvVmFsdWVcclxuICAgICAqICovXHJcbiAgICBwcml2YXRlIHNldFNlbGVjdGVkRGF0ZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVzID0gW107XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5maXJzdERhdGVPZk1vbnRoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlICYmIHRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF5RGlmZiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGhcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVzWzBdID0gZGF5RGlmZiArIDE7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUgJiYgdGhpcy5zZWxlY3RlZHMpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGVzID0gdGhpcy5zZWxlY3RlZHMubWFwKHNlbGVjdGVkID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKHNlbGVjdGVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRheURpZmYgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kaWZmZXJlbmNlSW5DYWxlbmRhckRheXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0RGF0ZU9mTW9udGhcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXlEaWZmICsgMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZvY3VzQWN0aXZlQ2VsbCgpIHtcclxuICAgICAgICB0aGlzLmNhbGVuZGFyQm9keUVsbS5mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICAgIH1cclxufVxyXG4iXX0=