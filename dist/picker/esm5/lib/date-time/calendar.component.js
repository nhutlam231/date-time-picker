/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
/**
 * @template T
 */
var OwlCalendarComponent = /** @class */ (function () {
    function OwlCalendarComponent(elmRef, pickerIntl, ngZone, cdRef, dateTimeAdapter, dateTimeFormats) {
        var _this = this;
        this.elmRef = elmRef;
        this.pickerIntl = pickerIntl;
        this.ngZone = ngZone;
        this.cdRef = cdRef;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * Set the first day of week
         */
        this.firstDayOfWeek = 0;
        this._selecteds = [];
        /**
         * The view that the calendar should start in.
         */
        this.startView = 'month';
        /**
         * Emits when the currently picker moment changes.
         */
        this.pickerMomentChange = new EventEmitter();
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits when any date is selected.
         */
        this.userSelection = new EventEmitter();
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         *
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits the selected month. This doesn't imply a change on the selected date
         *
         */
        this.monthSelected = new EventEmitter();
        /**
         * Date filter for the month and year view
         */
        this.dateFilterForViews = (/**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return (!!date &&
                (!_this.dateFilter || _this.dateFilter(date)) &&
                (!_this.minDate ||
                    _this.dateTimeAdapter.compare(date, _this.minDate) >= 0) &&
                (!_this.maxDate ||
                    _this.dateTimeAdapter.compare(date, _this.maxDate) <= 0));
        });
        this.intlChangesSub = Subscription.EMPTY;
        /**
         * Used for scheduling that focus should be moved to the active cell on the next tick.
         * We need to schedule it, rather than do it immediately, because we have to wait
         * for Angular to re-evaluate the view children.
         */
        this.moveFocusOnNextTick = false;
        this.intlChangesSub = this.pickerIntl.changes.subscribe((/**
         * @return {?}
         */
        function () {
            _this.cdRef.markForCheck();
        }));
    }
    Object.defineProperty(OwlCalendarComponent.prototype, "minDate", {
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
            value = this.getValidDate(value);
            this._minDate = value
                ? this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(value), this.dateTimeAdapter.getMonth(value), this.dateTimeAdapter.getDate(value))
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "maxDate", {
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
            value = this.getValidDate(value);
            this._maxDate = value
                ? this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(value), this.dateTimeAdapter.getMonth(value), this.dateTimeAdapter.getDate(value))
                : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "pickerMoment", {
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
    Object.defineProperty(OwlCalendarComponent.prototype, "selected", {
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
            value = this.dateTimeAdapter.deserialize(value);
            this._selected = this.getValidDate(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "selecteds", {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "periodButtonText", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isMonthView
                ? this.dateTimeAdapter.format(this.pickerMoment, this.dateTimeFormats.monthYearLabel)
                : this.dateTimeAdapter.getYearName(this.pickerMoment);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "periodButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isMonthView
                ? this.pickerIntl.switchToMultiYearViewLabel
                : this.pickerIntl.switchToMonthViewLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "prevButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._currentView === 'month') {
                return this.pickerIntl.prevMonthLabel;
            }
            else if (this._currentView === 'year') {
                return this.pickerIntl.prevYearLabel;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "nextButtonLabel", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._currentView === 'month') {
                return this.pickerIntl.nextMonthLabel;
            }
            else if (this._currentView === 'year') {
                return this.pickerIntl.nextYearLabel;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "currentView", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentView;
        },
        set: /**
         * @param {?} view
         * @return {?}
         */
        function (view) {
            this._currentView = view;
            this.moveFocusOnNextTick = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "isInRangeMode", {
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
    Object.defineProperty(OwlCalendarComponent.prototype, "showControlArrows", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentView !== 'multi-years';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "isMonthView", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentView === 'month';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarComponent.prototype, "owlDTCalendarClass", {
        /**
         * Bind class 'owl-dt-calendar' to host
         * */
        get: /**
         * Bind class 'owl-dt-calendar' to host
         *
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
    OwlCalendarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    OwlCalendarComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._currentView = this.startView;
    };
    /**
     * @return {?}
     */
    OwlCalendarComponent.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        if (this.moveFocusOnNextTick) {
            this.moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    };
    /**
     * @return {?}
     */
    OwlCalendarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.intlChangesSub.unsubscribe();
    };
    /**
     * Toggle between month view and year view
     */
    /**
     * Toggle between month view and year view
     * @return {?}
     */
    OwlCalendarComponent.prototype.toggleViews = /**
     * Toggle between month view and year view
     * @return {?}
     */
    function () {
        this.currentView =
            this._currentView == 'month' ? 'multi-years' : 'month';
    };
    /**
     * Handles user clicks on the previous button.
     * */
    /**
     * Handles user clicks on the previous button.
     *
     * @return {?}
     */
    OwlCalendarComponent.prototype.previousClicked = /**
     * Handles user clicks on the previous button.
     *
     * @return {?}
     */
    function () {
        this.pickerMoment = this.isMonthView
            ? this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1)
            : this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1);
        this.pickerMomentChange.emit(this.pickerMoment);
    };
    /**
     * Handles user clicks on the next button.
     * */
    /**
     * Handles user clicks on the next button.
     *
     * @return {?}
     */
    OwlCalendarComponent.prototype.nextClicked = /**
     * Handles user clicks on the next button.
     *
     * @return {?}
     */
    function () {
        this.pickerMoment = this.isMonthView
            ? this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1)
            : this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1);
        this.pickerMomentChange.emit(this.pickerMoment);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    OwlCalendarComponent.prototype.dateSelected = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (!this.dateFilterForViews(date)) {
            return;
        }
        this.selectedChange.emit(date);
        /*if ((this.isInSingleMode && !this.dateTimeAdapter.isSameDay(date, this.selected)) ||
            this.isInRangeMode) {
            this.selectedChange.emit(date);
        }*/
    };
    /**
     * Change the pickerMoment value and switch to a specific view
     */
    /**
     * Change the pickerMoment value and switch to a specific view
     * @param {?} date
     * @param {?} view
     * @return {?}
     */
    OwlCalendarComponent.prototype.goToDateInView = /**
     * Change the pickerMoment value and switch to a specific view
     * @param {?} date
     * @param {?} view
     * @return {?}
     */
    function (date, view) {
        this.handlePickerMomentChange(date);
        this.currentView = view;
        return;
    };
    /**
     * Change the pickerMoment value
     */
    /**
     * Change the pickerMoment value
     * @param {?} date
     * @return {?}
     */
    OwlCalendarComponent.prototype.handlePickerMomentChange = /**
     * Change the pickerMoment value
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.pickerMoment = this.dateTimeAdapter.clampDate(date, this.minDate, this.maxDate);
        this.pickerMomentChange.emit(this.pickerMoment);
        return;
    };
    /**
     * @return {?}
     */
    OwlCalendarComponent.prototype.userSelected = /**
     * @return {?}
     */
    function () {
        this.userSelection.emit();
    };
    /**
     * Whether the previous period button is enabled.
     */
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    OwlCalendarComponent.prototype.prevButtonEnabled = /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    function () {
        return (!this.minDate || !this.isSameView(this.pickerMoment, this.minDate));
    };
    /**
     * Whether the next period button is enabled.
     */
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    OwlCalendarComponent.prototype.nextButtonEnabled = /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    function () {
        return (!this.maxDate || !this.isSameView(this.pickerMoment, this.maxDate));
    };
    /**
     * Focus to the host element
     * */
    /**
     * Focus to the host element
     *
     * @return {?}
     */
    OwlCalendarComponent.prototype.focusActiveCell = /**
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
                _this.elmRef.nativeElement
                    .querySelector('.owl-dt-calendar-cell-active')
                    .focus();
            }));
        }));
    };
    /**
     * @param {?} normalizedYear
     * @return {?}
     */
    OwlCalendarComponent.prototype.selectYearInMultiYearView = /**
     * @param {?} normalizedYear
     * @return {?}
     */
    function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /**
     * @param {?} normalizedMonth
     * @return {?}
     */
    OwlCalendarComponent.prototype.selectMonthInYearView = /**
     * @param {?} normalizedMonth
     * @return {?}
     */
    function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     */
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    OwlCalendarComponent.prototype.isSameView = /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    function (date1, date2) {
        if (this._currentView === 'month') {
            return !!(date1 &&
                date2 &&
                this.dateTimeAdapter.getYear(date1) ===
                    this.dateTimeAdapter.getYear(date2) &&
                this.dateTimeAdapter.getMonth(date1) ===
                    this.dateTimeAdapter.getMonth(date2));
        }
        else if (this._currentView === 'year') {
            return !!(date1 &&
                date2 &&
                this.dateTimeAdapter.getYear(date1) ===
                    this.dateTimeAdapter.getYear(date2));
        }
        else {
            return false;
        }
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
    OwlCalendarComponent.prototype.getValidDate = /**
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
    OwlCalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'owl-date-time-calendar',
                    exportAs: 'owlDateTimeCalendar',
                    template: "<div class=\"owl-dt-calendar-control\">\r\n    <!-- focus when keyboard tab (http://kizu.ru/en/blog/keyboard-only-focus/#x) -->\r\n    <button class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\r\n            type=\"button\" tabindex=\"0\"\r\n            [style.visibility]=\"showControlArrows? 'visible': 'hidden'\"\r\n            [disabled]=\"!prevButtonEnabled()\"\r\n            [attr.aria-label]=\"prevButtonLabel\"\r\n            (click)=\"previousClicked()\">\r\n        <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\r\n            <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\r\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 250.738 250.738\"\r\n                 style=\"enable-background:new 0 0 250.738 250.738;\" xml:space=\"preserve\"\r\n                 width=\"100%\" height=\"100%\">\r\n                <path style=\"fill-rule: evenodd; clip-rule: evenodd;\" d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"/>\r\n            </svg>\r\n            <!-- </editor-fold> -->\r\n        </span>\r\n    </button>\r\n    <div class=\"owl-dt-calendar-control-content\">\r\n        <button class=\"owl-dt-control owl-dt-control-button owl-dt-control-period-button\"\r\n                type=\"button\" tabindex=\"0\"\r\n                [attr.aria-label]=\"periodButtonLabel\"\r\n                (click)=\"toggleViews()\">\r\n            <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\r\n                {{periodButtonText}}\r\n\r\n                <span class=\"owl-dt-control-button-arrow\"\r\n                      [style.transform]=\"'rotate(' + (isMonthView? 0 : 180) +'deg)'\">\r\n                    <!-- <editor-fold desc=\"SVG Arrow\"> -->\r\n                    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n                         width=\"50%\" height=\"50%\" viewBox=\"0 0 292.362 292.362\" style=\"enable-background:new 0 0 292.362 292.362;\"\r\n                         xml:space=\"preserve\">\r\n                        <g>\r\n                            <path d=\"M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424\r\n                                C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428\r\n                                s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z\"/>\r\n                        </g>\r\n                    </svg>\r\n                    <!-- </editor-fold> -->\r\n                </span>\r\n            </span>\r\n        </button>\r\n    </div>\r\n    <button class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\r\n            type=\"button\" tabindex=\"0\"\r\n            [style.visibility]=\"showControlArrows? 'visible': 'hidden'\"\r\n            [disabled]=\"!nextButtonEnabled()\"\r\n            [attr.aria-label]=\"nextButtonLabel\"\r\n            (click)=\"nextClicked()\">\r\n        <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\r\n            <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\r\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n                 viewBox=\"0 0 250.738 250.738\" style=\"enable-background:new 0 0 250.738 250.738;\" xml:space=\"preserve\">\r\n                <path style=\"fill-rule:evenodd;clip-rule:evenodd;\" d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\r\n                    c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\r\n                    c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\r\n                    C197.237,120.447,195.534,115.448,191.75,111.689z\"/>\r\n            </svg>\r\n            <!-- </editor-fold> -->\r\n        </span>\r\n    </button>\r\n</div>\r\n<div class=\"owl-dt-calendar-main\" cdkMonitorSubtreeFocus [ngSwitch]=\"currentView\" tabindex=\"-1\">\r\n    <owl-date-time-month-view\r\n            *ngSwitchCase=\"'month'\"\r\n            [pickerMoment]=\"pickerMoment\"\r\n            [firstDayOfWeek]=\"firstDayOfWeek\"\r\n            [selected]=\"selected\"\r\n            [selecteds]=\"selecteds\"\r\n            [selectMode]=\"selectMode\"\r\n            [minDate]=\"minDate\"\r\n            [maxDate]=\"maxDate\"\r\n            [dateFilter]=\"dateFilter\"\r\n            [hideOtherMonths]=\"hideOtherMonths\"\r\n            (pickerMomentChange)=\"handlePickerMomentChange($event)\"\r\n            (selectedChange)=\"dateSelected($event)\"\r\n            (userSelection)=\"userSelected()\"></owl-date-time-month-view>\r\n\r\n    <owl-date-time-year-view\r\n            *ngSwitchCase=\"'year'\"\r\n            [pickerMoment]=\"pickerMoment\"\r\n            [selected]=\"selected\"\r\n            [selecteds]=\"selecteds\"\r\n            [selectMode]=\"selectMode\"\r\n            [minDate]=\"minDate\"\r\n            [maxDate]=\"maxDate\"\r\n            [dateFilter]=\"dateFilter\"\r\n            (keyboardEnter)=\"focusActiveCell()\"\r\n            (pickerMomentChange)=\"handlePickerMomentChange($event)\"\r\n            (monthSelected)=\"selectMonthInYearView($event)\"\r\n            (change)=\"goToDateInView($event, 'month')\"></owl-date-time-year-view>\r\n\r\n    <owl-date-time-multi-year-view\r\n            *ngSwitchCase=\"'multi-years'\"\r\n            [pickerMoment]=\"pickerMoment\"\r\n            [selected]=\"selected\"\r\n            [selecteds]=\"selecteds\"\r\n            [selectMode]=\"selectMode\"\r\n            [minDate]=\"minDate\"\r\n            [maxDate]=\"maxDate\"\r\n            [dateFilter]=\"dateFilter\"\r\n            (keyboardEnter)=\"focusActiveCell()\"\r\n            (pickerMomentChange)=\"handlePickerMomentChange($event)\"\r\n            (yearSelected)=\"selectYearInMultiYearView($event)\"\r\n            (change)=\"goToDateInView($event, 'year')\"></owl-date-time-multi-year-view>\r\n</div>\r\n",
                    host: {
                        '[class.owl-dt-calendar]': 'owlDTCalendarClass'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OwlCalendarComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: OwlDateTimeIntl },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
    ]; };
    OwlCalendarComponent.propDecorators = {
        dateFilter: [{ type: Input }],
        firstDayOfWeek: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        pickerMoment: [{ type: Input }],
        selectMode: [{ type: Input }],
        selected: [{ type: Input }],
        selecteds: [{ type: Input }],
        startView: [{ type: Input }],
        hideOtherMonths: [{ type: Input }],
        pickerMomentChange: [{ type: Output }],
        selectedChange: [{ type: Output }],
        userSelection: [{ type: Output }],
        yearSelected: [{ type: Output }],
        monthSelected: [{ type: Output }]
    };
    return OwlCalendarComponent;
}());
export { OwlCalendarComponent };
if (false) {
    /**
     * Date filter for the month and year view
     *
     * @type {?}
     */
    OwlCalendarComponent.prototype.dateFilter;
    /**
     * Set the first day of week
     * @type {?}
     */
    OwlCalendarComponent.prototype.firstDayOfWeek;
    /**
     * The minimum selectable date.
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype._minDate;
    /**
     * The maximum selectable date.
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype._maxDate;
    /**
     * The current picker moment
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype._pickerMoment;
    /** @type {?} */
    OwlCalendarComponent.prototype.selectMode;
    /**
     * The currently selected moment.
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype._selecteds;
    /**
     * The view that the calendar should start in.
     * @type {?}
     */
    OwlCalendarComponent.prototype.startView;
    /**
     * Whether to hide dates in other months at the start or end of the current month.
     *
     * @type {?}
     */
    OwlCalendarComponent.prototype.hideOtherMonths;
    /**
     * Emits when the currently picker moment changes.
     * @type {?}
     */
    OwlCalendarComponent.prototype.pickerMomentChange;
    /**
     * Emits when the currently selected date changes.
     * @type {?}
     */
    OwlCalendarComponent.prototype.selectedChange;
    /**
     * Emits when any date is selected.
     * @type {?}
     */
    OwlCalendarComponent.prototype.userSelection;
    /**
     * Emits the selected year. This doesn't imply a change on the selected date
     *
     * @type {?}
     */
    OwlCalendarComponent.prototype.yearSelected;
    /**
     * Emits the selected month. This doesn't imply a change on the selected date
     *
     * @type {?}
     */
    OwlCalendarComponent.prototype.monthSelected;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype._currentView;
    /**
     * Date filter for the month and year view
     * @type {?}
     */
    OwlCalendarComponent.prototype.dateFilterForViews;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.intlChangesSub;
    /**
     * Used for scheduling that focus should be moved to the active cell on the next tick.
     * We need to schedule it, rather than do it immediately, because we have to wait
     * for Angular to re-evaluate the view children.
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.moveFocusOnNextTick;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.pickerIntl;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarComponent.prototype.dateTimeFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvY2FsZW5kYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFHTixRQUFRLEVBQ1IsTUFBTSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILHFCQUFxQixFQUV4QixNQUFNLGtDQUFrQyxDQUFDO0FBRTFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBRXBDO0lBNk9JLDhCQUNZLE1BQWtCLEVBQ2xCLFVBQTJCLEVBQzNCLE1BQWMsRUFDZCxLQUF3QixFQUNaLGVBQW1DLEVBRy9DLGVBQW1DO1FBUi9DLGlCQWFDO1FBWlcsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBb0I7UUFHL0Msb0JBQWUsR0FBZixlQUFlLENBQW9COzs7O1FBOU4vQyxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQXNFWCxlQUFVLEdBQVEsRUFBRSxDQUFDOzs7O1FBaUI3QixjQUFTLEdBQXFDLE9BQU8sQ0FBQzs7OztRQVV0RCx1QkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDOzs7O1FBSTNDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQzs7OztRQUl2QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7Ozs7O1FBTWhDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQzs7Ozs7UUFNckMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDOzs7O1FBc0V4Qyx1QkFBa0I7Ozs7UUFBRyxVQUFDLElBQU87WUFDaEMsT0FBTyxDQUNILENBQUMsQ0FBQyxJQUFJO2dCQUNOLENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxJQUFJLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTztvQkFDVixLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUQsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPO29CQUNWLEtBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQzdELENBQUM7UUFDTixDQUFDLEVBQUM7UUFTTSxtQkFBYyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7Ozs7OztRQU9wQyx3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFZaEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7UUFBQztZQUNwRCxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzlCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQztJQS9ORCxzQkFDSSx5Q0FBTzs7OztRQURYO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7Ozs7O1FBRUQsVUFBWSxLQUFlO1lBQ3ZCLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRCxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVqQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUs7Z0JBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUNwQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDdEM7Z0JBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNmLENBQUM7OztPQWJBO0lBaUJELHNCQUNJLHlDQUFPOzs7O1FBRFg7WUFFSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7Ozs7UUFFRCxVQUFZLEtBQWU7WUFDdkIsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWpDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSztnQkFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUN0QztnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2YsQ0FBQzs7O09BYkE7SUFpQkQsc0JBQ0ksOENBQVk7Ozs7UUFEaEI7WUFFSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7Ozs7UUFFRCxVQUFpQixLQUFRO1lBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsYUFBYTtnQkFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDL0QsQ0FBQzs7O09BTkE7SUFhRCxzQkFDSSwwQ0FBUTs7OztRQURaO1lBRUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7Ozs7O1FBRUQsVUFBYSxLQUFlO1lBQ3hCLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQzs7O09BTEE7SUFRRCxzQkFDSSwyQ0FBUzs7OztRQURiO1lBRUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7Ozs7O1FBRUQsVUFBYyxNQUFXO1lBQXpCLGlCQUtDO1lBSkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsR0FBRzs7OztZQUFDLFVBQUEsQ0FBQztnQkFDMUIsQ0FBQyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxPQUFPLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDOzs7T0FQQTtJQTZDRCxzQkFBSSxrREFBZ0I7Ozs7UUFBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXO2dCQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQ3ZCLElBQUksQ0FBQyxZQUFZLEVBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUN0QztnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlELENBQUM7OztPQUFBO0lBRUQsc0JBQUksbURBQWlCOzs7O1FBQXJCO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVztnQkFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsMEJBQTBCO2dCQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQztRQUNqRCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlEQUFlOzs7O1FBQW5CO1lBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLE9BQU8sRUFBRTtnQkFDL0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQzthQUN6QztpQkFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFO2dCQUNyQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO2FBQ3hDO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlEQUFlOzs7O1FBQW5CO1lBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLE9BQU8sRUFBRTtnQkFDL0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQzthQUN6QztpQkFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFO2dCQUNyQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO2FBQ3hDO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDOzs7T0FBQTtJQUdELHNCQUFJLDZDQUFXOzs7O1FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7Ozs7UUFFRCxVQUFnQixJQUFzQztZQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLENBQUM7OztPQUxBO0lBT0Qsc0JBQUksZ0RBQWM7Ozs7UUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDO1FBQ3hDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksK0NBQWE7Ozs7UUFBakI7WUFDSSxPQUFPLENBQ0gsSUFBSSxDQUFDLFVBQVUsS0FBSyxPQUFPO2dCQUMzQixJQUFJLENBQUMsVUFBVSxLQUFLLFdBQVc7Z0JBQy9CLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUNoQyxDQUFDO1FBQ04sQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxtREFBaUI7Ozs7UUFBckI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssYUFBYSxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNkNBQVc7Ozs7UUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFtQkQsc0JBQUksb0RBQWtCO1FBSHRCOzthQUVLOzs7Ozs7UUFDTDtZQUNJLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7OztPQUFBOzs7O0lBMEJNLHVDQUFROzs7SUFBZixjQUFtQixDQUFDOzs7O0lBRWIsaURBQWtCOzs7SUFBekI7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVNLGlEQUFrQjs7O0lBQXpCO1FBQ0ksSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDMUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDOzs7O0lBRU0sMENBQVc7OztJQUFsQjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNJLDBDQUFXOzs7O0lBQWxCO1FBQ0ksSUFBSSxDQUFDLFdBQVc7WUFDWixJQUFJLENBQUMsWUFBWSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDL0QsQ0FBQztJQUVEOztTQUVLOzs7Ozs7SUFDRSw4Q0FBZTs7Ozs7SUFBdEI7UUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5FLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7U0FFSzs7Ozs7O0lBQ0UsMENBQVc7Ozs7O0lBQWxCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVztZQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBRU0sMkNBQVk7Ozs7SUFBbkIsVUFBb0IsSUFBTztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9COzs7V0FHRztJQUNQLENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNJLDZDQUFjOzs7Ozs7SUFBckIsVUFDSSxJQUFPLEVBQ1AsSUFBc0M7UUFFdEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLE9BQU87SUFDWCxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNJLHVEQUF3Qjs7Ozs7SUFBL0IsVUFBZ0MsSUFBTztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUM5QyxJQUFJLEVBQ0osSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsT0FBTyxDQUNmLENBQUM7UUFDRixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRCxPQUFPO0lBQ1gsQ0FBQzs7OztJQUVNLDJDQUFZOzs7SUFBbkI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSSxnREFBaUI7Ozs7SUFBeEI7UUFDSSxPQUFPLENBQ0gsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FDckUsQ0FBQztJQUNOLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSSxnREFBaUI7Ozs7SUFBeEI7UUFDSSxPQUFPLENBQ0gsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FDckUsQ0FBQztJQUNOLENBQUM7SUFFRDs7U0FFSzs7Ozs7O0lBQ0UsOENBQWU7Ozs7O0lBQXRCO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQjs7O1FBQUM7WUFDMUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO2lCQUNmLFlBQVksRUFBRTtpQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiLFNBQVM7OztZQUFDO2dCQUNQLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYTtxQkFDcEIsYUFBYSxDQUFDLDhCQUE4QixDQUFDO3FCQUM3QyxLQUFLLEVBQUUsQ0FBQztZQUNqQixDQUFDLEVBQUMsQ0FBQztRQUNYLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFTSx3REFBeUI7Ozs7SUFBaEMsVUFBaUMsY0FBaUI7UUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFTSxvREFBcUI7Ozs7SUFBNUIsVUFBNkIsZUFBa0I7UUFDM0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOztPQUVHOzs7Ozs7OztJQUNLLHlDQUFVOzs7Ozs7O0lBQWxCLFVBQW1CLEtBQVEsRUFBRSxLQUFRO1FBQ2pDLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxPQUFPLEVBQUU7WUFDL0IsT0FBTyxDQUFDLENBQUMsQ0FDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztvQkFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQzNDLENBQUM7U0FDTDthQUFNLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxNQUFNLEVBQUU7WUFDckMsT0FBTyxDQUFDLENBQUMsQ0FDTCxLQUFLO2dCQUNMLEtBQUs7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDMUMsQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNLLDJDQUFZOzs7Ozs7SUFBcEIsVUFBcUIsR0FBUTtRQUN6QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztZQUMzQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDakMsQ0FBQyxDQUFDLEdBQUc7WUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2YsQ0FBQzs7Z0JBaGFKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixvN01BQXdDO29CQUV4QyxJQUFJLEVBQUU7d0JBQ0YseUJBQXlCLEVBQUUsb0JBQW9CO3FCQUNsRDtvQkFDRCxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2xEOzs7O2dCQTlCRyxVQUFVO2dCQVVMLGVBQWU7Z0JBTnBCLE1BQU07Z0JBTk4saUJBQWlCO2dCQWFaLGVBQWUsdUJBMlBmLFFBQVE7Z0RBQ1IsUUFBUSxZQUNSLE1BQU0sU0FBQyxxQkFBcUI7Ozs2QkFwT2hDLEtBQUs7aUNBTUwsS0FBSzswQkFLTCxLQUFLOzBCQW9CTCxLQUFLOytCQW9CTCxLQUFLOzZCQVdMLEtBQUs7MkJBS0wsS0FBSzs0QkFXTCxLQUFLOzRCQWVMLEtBQUs7a0NBTUwsS0FBSztxQ0FJTCxNQUFNO2lDQUlOLE1BQU07Z0NBSU4sTUFBTTsrQkFNTixNQUFNO2dDQU1OLE1BQU07O0lBc1JYLDJCQUFDO0NBQUEsQUFqYUQsSUFpYUM7U0F0Wlksb0JBQW9COzs7Ozs7O0lBSzdCLDBDQUNxQjs7Ozs7SUFLckIsOENBQ21COzs7Ozs7SUFHbkIsd0NBQTJCOzs7Ozs7SUFvQjNCLHdDQUEyQjs7Ozs7O0lBb0IzQiw2Q0FBeUI7O0lBWXpCLDBDQUN1Qjs7Ozs7O0lBR3ZCLHlDQUE0Qjs7Ozs7SUFXNUIsMENBQTZCOzs7OztJQWdCN0IseUNBQ3NEOzs7Ozs7SUFLdEQsK0NBQ3lCOzs7OztJQUd6QixrREFDMkM7Ozs7O0lBRzNDLDhDQUN1Qzs7Ozs7SUFHdkMsNkNBQ3lDOzs7Ozs7SUFLekMsNENBQzhDOzs7Ozs7SUFLOUMsNkNBQytDOzs7OztJQXFDL0MsNENBQXVEOzs7OztJQWlDdkQsa0RBU0U7Ozs7O0lBU0YsOENBQTRDOzs7Ozs7OztJQU81QyxtREFBb0M7Ozs7O0lBR2hDLHNDQUEwQjs7Ozs7SUFDMUIsMENBQW1DOzs7OztJQUNuQyxzQ0FBc0I7Ozs7O0lBQ3RCLHFDQUFnQzs7Ozs7SUFDaEMsK0NBQXVEOzs7OztJQUN2RCwrQ0FFMkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogY2FsZW5kYXIuY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEFmdGVyQ29udGVudEluaXQsXHJcbiAgICBBZnRlclZpZXdDaGVja2VkLFxyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENvbXBvbmVudCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbmplY3QsXHJcbiAgICBJbnB1dCxcclxuICAgIE5nWm9uZSxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIE9wdGlvbmFsLFxyXG4gICAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE93bERhdGVUaW1lSW50bCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnRsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xyXG5pbXBvcnQge1xyXG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxyXG4gICAgT3dsRGF0ZVRpbWVGb3JtYXRzXHJcbn0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xyXG5pbXBvcnQgeyBTZWxlY3RNb2RlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xyXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLWNhbGVuZGFyJyxcclxuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVDYWxlbmRhcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vY2FsZW5kYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXIuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLm93bC1kdC1jYWxlbmRhcl0nOiAnb3dsRFRDYWxlbmRhckNsYXNzJ1xyXG4gICAgfSxcclxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE93bENhbGVuZGFyQ29tcG9uZW50PFQ+XHJcbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25EZXN0cm95IHtcclxuICAgIC8qKlxyXG4gICAgICogRGF0ZSBmaWx0ZXIgZm9yIHRoZSBtb250aCBhbmQgeWVhciB2aWV3XHJcbiAgICAgKiAqL1xyXG4gICAgQElucHV0KClcclxuICAgIGRhdGVGaWx0ZXI6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBmaXJzdCBkYXkgb2Ygd2Vla1xyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgZmlyc3REYXlPZldlZWsgPSAwO1xyXG5cclxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgICBwcml2YXRlIF9taW5EYXRlOiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgbWluRGF0ZSgpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1pbkRhdGUodmFsdWU6IFQgfCBudWxsKSB7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX21pbkRhdGUgPSB2YWx1ZVxyXG4gICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIodmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aCh2YWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUodmFsdWUpXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICAgIHByaXZhdGUgX21heERhdGU6IFQgfCBudWxsO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBtYXhEYXRlKCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWF4RGF0ZSh2YWx1ZTogVCB8IG51bGwpIHtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWF4RGF0ZSA9IHZhbHVlXHJcbiAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih2YWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh2YWx1ZSlcclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIGN1cnJlbnQgcGlja2VyIG1vbWVudCAqL1xyXG4gICAgcHJpdmF0ZSBfcGlja2VyTW9tZW50OiBUO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBwaWNrZXJNb21lbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGlja2VyTW9tZW50KHZhbHVlOiBUKSB7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fcGlja2VyTW9tZW50ID1cclxuICAgICAgICAgICAgdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZWxlY3RNb2RlOiBTZWxlY3RNb2RlO1xyXG5cclxuICAgIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIG1vbWVudC4gKi9cclxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgc2VsZWN0ZWQoKTogVCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IFQgfCBudWxsKSB7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRzOiBUW10gPSBbXTtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgc2VsZWN0ZWRzKCk6IFRbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2VsZWN0ZWRzKHZhbHVlczogVFtdKSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRzID0gdmFsdWVzLm1hcCh2ID0+IHtcclxuICAgICAgICAgICAgdiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHYpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWxpZERhdGUodik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdmlldyB0aGF0IHRoZSBjYWxlbmRhciBzaG91bGQgc3RhcnQgaW4uXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzdGFydFZpZXc6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcnMnID0gJ21vbnRoJztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdG8gaGlkZSBkYXRlcyBpbiBvdGhlciBtb250aHMgYXQgdGhlIHN0YXJ0IG9yIGVuZCBvZiB0aGUgY3VycmVudCBtb250aC5cclxuICAgICAqICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgaGlkZU90aGVyTW9udGhzOiBib29sZWFuO1xyXG5cclxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBjdXJyZW50bHkgcGlja2VyIG1vbWVudCBjaGFuZ2VzLiAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBwaWNrZXJNb21lbnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XHJcblxyXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlIGNoYW5nZXMuICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xyXG5cclxuICAgIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIHNlbGVjdGVkLiAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICB1c2VyU2VsZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1pdHMgdGhlIHNlbGVjdGVkIHllYXIuIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZVxyXG4gICAgICogKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcmVhZG9ubHkgeWVhclNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1pdHMgdGhlIHNlbGVjdGVkIG1vbnRoLiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGVcclxuICAgICAqICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHJlYWRvbmx5IG1vbnRoU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFQ+KCk7XHJcblxyXG4gICAgZ2V0IHBlcmlvZEJ1dHRvblRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc01vbnRoVmlld1xyXG4gICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcclxuICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLm1vbnRoWWVhckxhYmVsXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICA6IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXJOYW1lKHRoaXMucGlja2VyTW9tZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGVyaW9kQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc01vbnRoVmlld1xyXG4gICAgICAgICAgICA/IHRoaXMucGlja2VySW50bC5zd2l0Y2hUb011bHRpWWVhclZpZXdMYWJlbFxyXG4gICAgICAgICAgICA6IHRoaXMucGlja2VySW50bC5zd2l0Y2hUb01vbnRoVmlld0xhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBwcmV2QnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09ICdtb250aCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5wcmV2TW9udGhMYWJlbDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRWaWV3ID09PSAneWVhcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5wcmV2WWVhckxhYmVsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbmV4dEJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRWaWV3ID09PSAnbW9udGgnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwubmV4dE1vbnRoTGFiZWw7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50VmlldyA9PT0gJ3llYXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwubmV4dFllYXJMYWJlbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY3VycmVudFZpZXc6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcnMnO1xyXG4gICAgZ2V0IGN1cnJlbnRWaWV3KCk6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcnMnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGN1cnJlbnRWaWV3KHZpZXc6ICdtb250aCcgfCAneWVhcicgfCAnbXVsdGkteWVhcnMnKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFZpZXcgPSB2aWV3O1xyXG4gICAgICAgIHRoaXMubW92ZUZvY3VzT25OZXh0VGljayA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2hvd0NvbnRyb2xBcnJvd3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaWV3ICE9PSAnbXVsdGkteWVhcnMnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc01vbnRoVmlldygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFZpZXcgPT09ICdtb250aCc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEYXRlIGZpbHRlciBmb3IgdGhlIG1vbnRoIGFuZCB5ZWFyIHZpZXdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRhdGVGaWx0ZXJGb3JWaWV3cyA9IChkYXRlOiBUKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgISFkYXRlICYmXHJcbiAgICAgICAgICAgICghdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlKSkgJiZcclxuICAgICAgICAgICAgKCF0aGlzLm1pbkRhdGUgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZGF0ZSwgdGhpcy5taW5EYXRlKSA+PSAwKSAmJlxyXG4gICAgICAgICAgICAoIXRoaXMubWF4RGF0ZSB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShkYXRlLCB0aGlzLm1heERhdGUpIDw9IDApXHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kIGNsYXNzICdvd2wtZHQtY2FsZW5kYXInIHRvIGhvc3RcclxuICAgICAqICovXHJcbiAgICBnZXQgb3dsRFRDYWxlbmRhckNsYXNzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW50bENoYW5nZXNTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVc2VkIGZvciBzY2hlZHVsaW5nIHRoYXQgZm9jdXMgc2hvdWxkIGJlIG1vdmVkIHRvIHRoZSBhY3RpdmUgY2VsbCBvbiB0aGUgbmV4dCB0aWNrLlxyXG4gICAgICogV2UgbmVlZCB0byBzY2hlZHVsZSBpdCwgcmF0aGVyIHRoYW4gZG8gaXQgaW1tZWRpYXRlbHksIGJlY2F1c2Ugd2UgaGF2ZSB0byB3YWl0XHJcbiAgICAgKiBmb3IgQW5ndWxhciB0byByZS1ldmFsdWF0ZSB0aGUgdmlldyBjaGlsZHJlbi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb3ZlRm9jdXNPbk5leHRUaWNrID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBlbG1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBwaWNrZXJJbnRsOiBPd2xEYXRlVGltZUludGwsXHJcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+LFxyXG4gICAgICAgIEBPcHRpb25hbCgpXHJcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0c1xyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5pbnRsQ2hhbmdlc1N1YiA9IHRoaXMucGlja2VySW50bC5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gdGhpcy5zdGFydFZpZXc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5tb3ZlRm9jdXNPbk5leHRUaWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUZvY3VzT25OZXh0VGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzQWN0aXZlQ2VsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pbnRsQ2hhbmdlc1N1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVG9nZ2xlIGJldHdlZW4gbW9udGggdmlldyBhbmQgeWVhciB2aWV3XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0b2dnbGVWaWV3cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID1cclxuICAgICAgICAgICAgdGhpcy5fY3VycmVudFZpZXcgPT0gJ21vbnRoJyA/ICdtdWx0aS15ZWFycycgOiAnbW9udGgnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgcHJldmlvdXMgYnV0dG9uLlxyXG4gICAgICogKi9cclxuICAgIHB1YmxpYyBwcmV2aW91c0NsaWNrZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSB0aGlzLmlzTW9udGhWaWV3XHJcbiAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5waWNrZXJNb21lbnQsIC0xKVxyXG4gICAgICAgICAgICA6IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5waWNrZXJNb21lbnQsIC0xKTtcclxuXHJcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdCh0aGlzLnBpY2tlck1vbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBuZXh0IGJ1dHRvbi5cclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgbmV4dENsaWNrZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSB0aGlzLmlzTW9udGhWaWV3XHJcbiAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5waWNrZXJNb21lbnQsIDEpXHJcbiAgICAgICAgICAgIDogdGhpcy5kYXRlVGltZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLnBpY2tlck1vbWVudCwgMSk7XHJcblxyXG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50Q2hhbmdlLmVtaXQodGhpcy5waWNrZXJNb21lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkYXRlU2VsZWN0ZWQoZGF0ZTogVCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5kYXRlRmlsdGVyRm9yVmlld3MoZGF0ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KGRhdGUpO1xyXG5cclxuICAgICAgICAvKmlmICgodGhpcy5pc0luU2luZ2xlTW9kZSAmJiAhdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNTYW1lRGF5KGRhdGUsIHRoaXMuc2VsZWN0ZWQpKSB8fFxyXG4gICAgICAgICAgICB0aGlzLmlzSW5SYW5nZU1vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KGRhdGUpO1xyXG4gICAgICAgIH0qL1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlIHRoZSBwaWNrZXJNb21lbnQgdmFsdWUgYW5kIHN3aXRjaCB0byBhIHNwZWNpZmljIHZpZXdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdvVG9EYXRlSW5WaWV3KFxyXG4gICAgICAgIGRhdGU6IFQsXHJcbiAgICAgICAgdmlldzogJ21vbnRoJyB8ICd5ZWFyJyB8ICdtdWx0aS15ZWFycydcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUGlja2VyTW9tZW50Q2hhbmdlKGRhdGUpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSB2aWV3O1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoYW5nZSB0aGUgcGlja2VyTW9tZW50IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYW5kbGVQaWNrZXJNb21lbnRDaGFuZ2UoZGF0ZTogVCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xhbXBEYXRlKFxyXG4gICAgICAgICAgICBkYXRlLFxyXG4gICAgICAgICAgICB0aGlzLm1pbkRhdGUsXHJcbiAgICAgICAgICAgIHRoaXMubWF4RGF0ZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnRDaGFuZ2UuZW1pdCh0aGlzLnBpY2tlck1vbWVudCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1c2VyU2VsZWN0ZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51c2VyU2VsZWN0aW9uLmVtaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhlIHByZXZpb3VzIHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHByZXZCdXR0b25FbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICF0aGlzLm1pbkRhdGUgfHwgIXRoaXMuaXNTYW1lVmlldyh0aGlzLnBpY2tlck1vbWVudCwgdGhpcy5taW5EYXRlKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSBuZXh0IHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG5leHRCdXR0b25FbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICF0aGlzLm1heERhdGUgfHwgIXRoaXMuaXNTYW1lVmlldyh0aGlzLnBpY2tlck1vbWVudCwgdGhpcy5tYXhEYXRlKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb2N1cyB0byB0aGUgaG9zdCBlbGVtZW50XHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIGZvY3VzQWN0aXZlQ2VsbCgpIHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXHJcbiAgICAgICAgICAgICAgICAuYXNPYnNlcnZhYmxlKClcclxuICAgICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcub3dsLWR0LWNhbGVuZGFyLWNlbGwtYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0WWVhckluTXVsdGlZZWFyVmlldyhub3JtYWxpemVkWWVhcjogVCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMueWVhclNlbGVjdGVkLmVtaXQobm9ybWFsaXplZFllYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RNb250aEluWWVhclZpZXcobm9ybWFsaXplZE1vbnRoOiBUKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQobm9ybWFsaXplZE1vbnRoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhlIHR3byBkYXRlcyByZXByZXNlbnQgdGhlIHNhbWUgdmlldyBpbiB0aGUgY3VycmVudCB2aWV3IG1vZGUgKG1vbnRoIG9yIHllYXIpLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzU2FtZVZpZXcoZGF0ZTE6IFQsIGRhdGUyOiBUKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRWaWV3ID09PSAnbW9udGgnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhIShcclxuICAgICAgICAgICAgICAgIGRhdGUxICYmXHJcbiAgICAgICAgICAgICAgICBkYXRlMiAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMSkgPT09XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMikgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKGRhdGUxKSA9PT1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlMilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRWaWV3ID09PSAneWVhcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuICEhKFxyXG4gICAgICAgICAgICAgICAgZGF0ZTEgJiZcclxuICAgICAgICAgICAgICAgIGRhdGUyICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUxKSA9PT1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUyKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgYSB2YWxpZCBkYXRlIG9iamVjdFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFZhbGlkRGF0ZShvYmo6IGFueSk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJlxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKG9iailcclxuICAgICAgICAgICAgPyBvYmpcclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==