/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * date-time-picker-container.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Optional, ViewChild } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { OwlCalendarComponent } from './calendar.component';
import { OwlTimerComponent } from './timer.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { Subject } from 'rxjs';
import { owlDateTimePickerAnimations } from './date-time-picker.animations';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
/**
 * @template T
 */
var OwlDateTimeContainerComponent = /** @class */ (function () {
    function OwlDateTimeContainerComponent(cdRef, elmRef, pickerIntl, dateTimeAdapter) {
        this.cdRef = cdRef;
        this.elmRef = elmRef;
        this.pickerIntl = pickerIntl;
        this.dateTimeAdapter = dateTimeAdapter;
        this.activeSelectedIndex = 0; // The current active SelectedIndex in range select mode (0: 'from', 1: 'to')
        // The current active SelectedIndex in range select mode (0: 'from', 1: 'to')
        /**
         * Stream emits when try to hide picker
         *
         */
        this.hidePicker$ = new Subject();
        /**
         * Stream emits when try to confirm the selected value
         *
         */
        this.confirmSelected$ = new Subject();
        this.pickerOpened$ = new Subject();
    }
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "hidePickerStream", {
        get: /**
         * @return {?}
         */
        function () {
            return this.hidePicker$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "confirmSelectedStream", {
        get: /**
         * @return {?}
         */
        function () {
            return this.confirmSelected$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerOpenedStream", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerOpened$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerMoment", {
        get: /**
         * @return {?}
         */
        function () {
            return this._clamPickerMoment;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._clamPickerMoment = this.dateTimeAdapter.clampDate(value, this.picker.minDateTime, this.picker.maxDateTime);
            }
            this.cdRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerType", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "cancelLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.cancelBtnLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "setLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pickerIntl.setBtnLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "fromLabel", {
        /**
         * The range 'from' label
         * */
        get: /**
         * The range 'from' label
         *
         * @return {?}
         */
        function () {
            return this.pickerIntl.rangeFromLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "toLabel", {
        /**
         * The range 'to' label
         * */
        get: /**
         * The range 'to' label
         *
         * @return {?}
         */
        function () {
            return this.pickerIntl.rangeToLabel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "fromFormattedValue", {
        /**
         * The range 'from' formatted value
         * */
        get: /**
         * The range 'from' formatted value
         *
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = this.picker.selecteds[0];
            return value
                ? this.dateTimeAdapter.format(value, this.picker.formatString)
                : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "toFormattedValue", {
        /**
         * The range 'to' formatted value
         * */
        get: /**
         * The range 'to' formatted value
         *
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = this.picker.selecteds[1];
            return value
                ? this.dateTimeAdapter.format(value, this.picker.formatString)
                : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "showControlButtons", {
        /**
         * Cases in which the control buttons show in the picker
         * 1) picker mode is 'dialog'
         * 2) picker type is NOT 'calendar' and the picker mode is NOT 'inline'
         * */
        get: /**
         * Cases in which the control buttons show in the picker
         * 1) picker mode is 'dialog'
         * 2) picker type is NOT 'calendar' and the picker mode is NOT 'inline'
         *
         * @return {?}
         */
        function () {
            return (this.picker.pickerMode === 'dialog' ||
                (this.picker.pickerType !== 'calendar' &&
                    this.picker.pickerMode !== 'inline'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "containerElm", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elmRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTPopupContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerMode === 'popup';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTDialogContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerMode === 'dialog';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTInlineContainerClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerMode === 'inline';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerDisabledClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerId", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerAnimation", {
        get: /**
         * @return {?}
         */
        function () {
            return this.picker.pickerMode === 'inline' ? '' : 'enter';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.initPicker();
    };
    /**
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.focusPicker();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.handleContainerAnimationDone = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var toState = event.toState;
        if (toState === 'enter') {
            this.pickerOpened$.next();
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.dateSelected = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var result;
        if (this.picker.isInSingleMode) {
            result = this.dateSelectedInSingleMode(date);
            if (result) {
                this.pickerMoment = result;
                this.picker.select(result);
            }
            else {
                // we close the picker when result is null and pickerType is calendar.
                if (this.pickerType === 'calendar') {
                    this.hidePicker$.next(null);
                }
            }
            return;
        }
        if (this.picker.isInRangeMode) {
            result = this.dateSelectedInRangeMode(date);
            if (result) {
                this.pickerMoment = result[this.activeSelectedIndex];
                this.picker.select(result);
            }
        }
    };
    /**
     * @param {?} time
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.timeSelected = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
        this.pickerMoment = this.dateTimeAdapter.clone(time);
        if (!this.picker.dateTimeChecker(this.pickerMoment)) {
            return;
        }
        if (this.picker.isInSingleMode) {
            this.picker.select(this.pickerMoment);
            return;
        }
        if (this.picker.isInRangeMode) {
            /** @type {?} */
            var selecteds = tslib_1.__spread(this.picker.selecteds);
            // check if the 'from' is after 'to' or 'to'is before 'from'
            // In this case, we set both the 'from' and 'to' the same value
            if ((this.activeSelectedIndex === 0 &&
                selecteds[1] &&
                this.dateTimeAdapter.compare(this.pickerMoment, selecteds[1]) === 1) ||
                (this.activeSelectedIndex === 1 &&
                    selecteds[0] &&
                    this.dateTimeAdapter.compare(this.pickerMoment, selecteds[0]) === -1)) {
                selecteds[0] = this.pickerMoment;
                selecteds[1] = this.pickerMoment;
            }
            else {
                selecteds[this.activeSelectedIndex] = this.pickerMoment;
            }
            this.picker.select(selecteds);
        }
    };
    /**
     * Handle click on cancel button
     */
    /**
     * Handle click on cancel button
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.onCancelClicked = /**
     * Handle click on cancel button
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.hidePicker$.next(null);
        event.preventDefault();
        return;
    };
    /**
     * Handle click on set button
     */
    /**
     * Handle click on set button
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.onSetClicked = /**
     * Handle click on set button
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.picker.dateTimeChecker(this.pickerMoment)) {
            this.hidePicker$.next(null);
            event.preventDefault();
            return;
        }
        this.confirmSelected$.next(event);
        event.preventDefault();
        return;
    };
    /**
     * Handle click on inform radio group
     */
    /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.handleClickOnInfoGroup = /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.setActiveSelectedIndex(index);
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * Handle click on inform radio group
     */
    /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} next
     * @param {?} index
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.handleKeydownOnInfoGroup = /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} next
     * @param {?} index
     * @return {?}
     */
    function (event, next, index) {
        switch (event.keyCode) {
            case DOWN_ARROW:
            case RIGHT_ARROW:
            case UP_ARROW:
            case LEFT_ARROW:
                next.focus();
                this.setActiveSelectedIndex(index === 0 ? 1 : 0);
                event.preventDefault();
                event.stopPropagation();
                break;
            case SPACE:
                this.setActiveSelectedIndex(index);
                event.preventDefault();
                event.stopPropagation();
                break;
            default:
                return;
        }
    };
    /**
     * Set the value of activeSelectedIndex
     */
    /**
     * Set the value of activeSelectedIndex
     * @private
     * @param {?} index
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.setActiveSelectedIndex = /**
     * Set the value of activeSelectedIndex
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.picker.selectMode === 'range' &&
            this.activeSelectedIndex !== index) {
            this.activeSelectedIndex = index;
            /** @type {?} */
            var selected = this.picker.selecteds[this.activeSelectedIndex];
            if (this.picker.selecteds && selected) {
                this.pickerMoment = this.dateTimeAdapter.clone(selected);
            }
        }
        return;
    };
    /**
     * @private
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.initPicker = /**
     * @private
     * @return {?}
     */
    function () {
        this.pickerMoment = this.picker.startAt || this.dateTimeAdapter.now();
        this.activeSelectedIndex = this.picker.selectMode === 'rangeTo' ? 1 : 0;
    };
    /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     */
    /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.dateSelectedInSingleMode = /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.dateTimeAdapter.isSameDay(date, this.picker.selected)) {
            return null;
        }
        return this.updateAndCheckCalendarDate(date);
    };
    /**
     * Select dates in range Mode
     */
    /**
     * Select dates in range Mode
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.dateSelectedInRangeMode = /**
     * Select dates in range Mode
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var from = this.picker.selecteds[0];
        /** @type {?} */
        var to = this.picker.selecteds[1];
        /** @type {?} */
        var result = this.updateAndCheckCalendarDate(date);
        if (!result) {
            return null;
        }
        // if the given calendar day is after or equal to 'from',
        // set ths given date as 'to'
        // otherwise, set it as 'from' and set 'to' to null
        if (this.picker.selectMode === 'range') {
            if (this.picker.selecteds &&
                this.picker.selecteds.length &&
                !to &&
                from &&
                this.dateTimeAdapter.differenceInCalendarDays(result, from) >= 0) {
                to = result;
                this.activeSelectedIndex = 1;
            }
            else {
                from = result;
                to = null;
                this.activeSelectedIndex = 0;
            }
        }
        else if (this.picker.selectMode === 'rangeFrom') {
            from = result;
            // if the from value is after the to value, set the to value as null
            if (to && this.dateTimeAdapter.compare(from, to) > 0) {
                to = null;
            }
        }
        else if (this.picker.selectMode === 'rangeTo') {
            to = result;
            // if the from value is after the to value, set the from value as null
            if (from && this.dateTimeAdapter.compare(from, to) > 0) {
                from = null;
            }
        }
        return [from, to];
    };
    /**
     * Update the given calendar date's time and check if it is valid
     * Because the calendar date has 00:00:00 as default time, if the picker type is 'both',
     * we need to update the given calendar date's time before selecting it.
     * if it is valid, return the updated dateTime
     * if it is not valid, return null
     */
    /**
     * Update the given calendar date's time and check if it is valid
     * Because the calendar date has 00:00:00 as default time, if the picker type is 'both',
     * we need to update the given calendar date's time before selecting it.
     * if it is valid, return the updated dateTime
     * if it is not valid, return null
     * @private
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.updateAndCheckCalendarDate = /**
     * Update the given calendar date's time and check if it is valid
     * Because the calendar date has 00:00:00 as default time, if the picker type is 'both',
     * we need to update the given calendar date's time before selecting it.
     * if it is valid, return the updated dateTime
     * if it is not valid, return null
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var result;
        // if the picker is 'both', update the calendar date's time value
        if (this.picker.pickerType === 'both') {
            result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(date), this.dateTimeAdapter.getMonth(date), this.dateTimeAdapter.getDate(date), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
            result = this.dateTimeAdapter.clampDate(result, this.picker.minDateTime, this.picker.maxDateTime);
        }
        else {
            result = this.dateTimeAdapter.clone(date);
        }
        // check the updated dateTime
        return this.picker.dateTimeChecker(result) ? result : null;
    };
    /**
     * Focus to the picker
     * */
    /**
     * Focus to the picker
     *
     * @private
     * @return {?}
     */
    OwlDateTimeContainerComponent.prototype.focusPicker = /**
     * Focus to the picker
     *
     * @private
     * @return {?}
     */
    function () {
        if (this.picker.pickerMode === 'inline') {
            return;
        }
        if (this.calendar) {
            this.calendar.focusActiveCell();
        }
        else if (this.timer) {
            this.timer.focus();
        }
    };
    OwlDateTimeContainerComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'owlDateTimeContainer',
                    selector: 'owl-date-time-container',
                    template: "<div [cdkTrapFocus]=\"picker.pickerMode !== 'inline'\"\r\n     [@fadeInPicker]=\"picker.pickerMode === 'inline'? '' : 'enter'\"\r\n     class=\"owl-dt-container-inner\">\r\n\r\n    <owl-date-time-calendar\r\n            *ngIf=\"pickerType === 'both' || pickerType === 'calendar'\"\r\n            class=\"owl-dt-container-row\"\r\n            [firstDayOfWeek]=\"picker.firstDayOfWeek\"\r\n            [(pickerMoment)]=\"pickerMoment\"\r\n            [selected]=\"picker.selected\"\r\n            [selecteds]=\"picker.selecteds\"\r\n            [selectMode]=\"picker.selectMode\"\r\n            [minDate]=\"picker.minDateTime\"\r\n            [maxDate]=\"picker.maxDateTime\"\r\n            [dateFilter]=\"picker.dateTimeFilter\"\r\n            [startView]=\"picker.startView\"\r\n            [hideOtherMonths]=\"picker.hideOtherMonths\"\r\n            (yearSelected)=\"picker.selectYear($event)\"\r\n            (monthSelected)=\"picker.selectMonth($event)\"\r\n            (selectedChange)=\"dateSelected($event)\"></owl-date-time-calendar>\r\n\r\n    <owl-date-time-timer\r\n            *ngIf=\"pickerType === 'both' || pickerType === 'timer'\"\r\n            class=\"owl-dt-container-row\"\r\n            [pickerMoment]=\"pickerMoment\"\r\n            [minDateTime]=\"picker.minDateTime\"\r\n            [maxDateTime]=\"picker.maxDateTime\"\r\n            [showSecondsTimer]=\"picker.showSecondsTimer\"\r\n            [hour12Timer]=\"picker.hour12Timer\"\r\n            [stepHour]=\"picker.stepHour\"\r\n            [stepMinute]=\"picker.stepMinute\"\r\n            [stepSecond]=\"picker.stepSecond\"\r\n            [debounceTime]=\"picker.debounceTime\"\r\n            (selectedChange)=\"timeSelected($event)\"></owl-date-time-timer>\r\n\r\n    <div *ngIf=\"picker.isInRangeMode\"\r\n         role=\"radiogroup\"\r\n         class=\"owl-dt-container-info owl-dt-container-row\">\r\n        <div role=\"radio\" [tabindex]=\"activeSelectedIndex === 0 ? 0 : -1\"\r\n             [attr.aria-checked]=\"activeSelectedIndex === 0\"\r\n             class=\"owl-dt-control owl-dt-container-range owl-dt-container-from\"\r\n             [ngClass]=\"{'owl-dt-container-info-active': activeSelectedIndex === 0}\"\r\n             (click)=\"handleClickOnInfoGroup($event, 0)\"\r\n             (keydown)=\"handleKeydownOnInfoGroup($event, to, 0)\" #from>\r\n            <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\r\n                <span class=\"owl-dt-container-info-label\">{{fromLabel}}:</span>\r\n                <span class=\"owl-dt-container-info-value\">{{fromFormattedValue}}</span>\r\n            </span>\r\n        </div>\r\n        <div role=\"radio\" [tabindex]=\"activeSelectedIndex === 1 ? 0 : -1\"\r\n             [attr.aria-checked]=\"activeSelectedIndex === 1\"\r\n             class=\"owl-dt-control owl-dt-container-range owl-dt-container-to\"\r\n             [ngClass]=\"{'owl-dt-container-info-active': activeSelectedIndex === 1}\"\r\n             (click)=\"handleClickOnInfoGroup($event, 1)\"\r\n             (keydown)=\"handleKeydownOnInfoGroup($event, from, 1)\" #to>\r\n            <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\r\n                <span class=\"owl-dt-container-info-label\">{{toLabel}}:</span>\r\n                <span class=\"owl-dt-container-info-value\">{{toFormattedValue}}</span>\r\n            </span>\r\n        </div>\r\n    </div>\r\n\r\n    <div *ngIf=\"showControlButtons\" class=\"owl-dt-container-buttons owl-dt-container-row\">\r\n        <button class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\"\r\n                type=\"button\" tabindex=\"0\"\r\n                (click)=\"onCancelClicked($event)\">\r\n            <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\r\n                {{cancelLabel}}\r\n            </span>\r\n        </button>\r\n        <button class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\"\r\n                type=\"button\" tabindex=\"0\"\r\n                (click)=\"onSetClicked($event)\">\r\n            <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\r\n                {{setLabel}}\r\n            </span>\r\n        </button>\r\n    </div>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    animations: [
                        owlDateTimePickerAnimations.transformPicker,
                        owlDateTimePickerAnimations.fadeInPicker
                    ],
                    host: {
                        '(@transformPicker.done)': 'handleContainerAnimationDone($event)',
                        '[class.owl-dt-container]': 'owlDTContainerClass',
                        '[class.owl-dt-popup-container]': 'owlDTPopupContainerClass',
                        '[class.owl-dt-dialog-container]': 'owlDTDialogContainerClass',
                        '[class.owl-dt-inline-container]': 'owlDTInlineContainerClass',
                        '[class.owl-dt-container-disabled]': 'owlDTContainerDisabledClass',
                        '[attr.id]': 'owlDTContainerId',
                        '[@transformPicker]': 'owlDTContainerAnimation',
                    },
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OwlDateTimeContainerComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: OwlDateTimeIntl },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] }
    ]; };
    OwlDateTimeContainerComponent.propDecorators = {
        calendar: [{ type: ViewChild, args: [OwlCalendarComponent, { static: false },] }],
        timer: [{ type: ViewChild, args: [OwlTimerComponent, { static: false },] }]
    };
    return OwlDateTimeContainerComponent;
}());
export { OwlDateTimeContainerComponent };
if (false) {
    /** @type {?} */
    OwlDateTimeContainerComponent.prototype.calendar;
    /** @type {?} */
    OwlDateTimeContainerComponent.prototype.timer;
    /** @type {?} */
    OwlDateTimeContainerComponent.prototype.picker;
    /** @type {?} */
    OwlDateTimeContainerComponent.prototype.activeSelectedIndex;
    /**
     * Stream emits when try to hide picker
     *
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.hidePicker$;
    /**
     * Stream emits when try to confirm the selected value
     *
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.confirmSelected$;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.pickerOpened$;
    /**
     * The current picker moment. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype._clamPickerMoment;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.pickerIntl;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeContainerComponent.prototype.dateTimeAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsT0FBTyxFQUdILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFFVixRQUFRLEVBQ1IsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEUsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RSxPQUFPLEVBQ0gsVUFBVSxFQUNWLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLFFBQVEsRUFDWCxNQUFNLHVCQUF1QixDQUFDOzs7O0FBRS9CO0lBd0tJLHVDQUFxQixLQUF3QixFQUN2QixNQUFrQixFQUNsQixVQUEyQixFQUNoQixlQUFtQztRQUgvQyxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN2QixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQ2hCLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQTdJN0Qsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUMsNkVBQTZFOzs7Ozs7UUFLckcsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDOzs7OztRQVNqQyxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBTXRDLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztJQTBIM0MsQ0FBQztJQXZJRCxzQkFBSSwyREFBZ0I7Ozs7UUFBcEI7WUFDSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7SUFPRCxzQkFBSSxnRUFBcUI7Ozs7UUFBekI7WUFDSSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQUlELHNCQUFJLDZEQUFrQjs7OztRQUF0QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQVFELHNCQUFJLHVEQUFZOzs7O1FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDbEMsQ0FBQzs7Ozs7UUFFRCxVQUFpQixLQUFRO1lBQ3JCLElBQUksS0FBSyxFQUFFO2dCQUNQLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FDbkQsS0FBSyxFQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FDMUIsQ0FBQzthQUNMO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM5QixDQUFDOzs7T0FYQTtJQWFELHNCQUFJLHFEQUFVOzs7O1FBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksc0RBQVc7Ozs7UUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxtREFBUTs7OztRQUFaO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLG9EQUFTO1FBSGI7O2FBRUs7Ozs7OztRQUNMO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLGtEQUFPO1FBSFg7O2FBRUs7Ozs7OztRQUNMO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUN4QyxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLDZEQUFrQjtRQUh0Qjs7YUFFSzs7Ozs7O1FBQ0w7O2dCQUNVLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsT0FBTyxLQUFLO2dCQUNSLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7Z0JBQzlELENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDYixDQUFDOzs7T0FBQTtJQUtELHNCQUFJLDJEQUFnQjtRQUhwQjs7YUFFSzs7Ozs7O1FBQ0w7O2dCQUNVLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsT0FBTyxLQUFLO2dCQUNSLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7Z0JBQzlELENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDYixDQUFDOzs7T0FBQTtJQU9ELHNCQUFJLDZEQUFrQjtRQUx0Qjs7OzthQUlLOzs7Ozs7OztRQUNMO1lBQ0ksT0FBTyxDQUNILElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFFBQVE7Z0JBQ25DLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssVUFBVTtvQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQzNDLENBQUM7UUFDTixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVEQUFZOzs7O1FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDhEQUFtQjs7OztRQUF2QjtZQUNJLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksbUVBQXdCOzs7O1FBQTVCO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxPQUFPLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxvRUFBeUI7Ozs7UUFBN0I7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQztRQUMvQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9FQUF5Qjs7OztRQUE3QjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBRUQsc0JBQUksc0VBQTJCOzs7O1FBQS9CO1lBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDJEQUFnQjs7OztRQUFwQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxrRUFBdUI7Ozs7UUFBM0I7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDOUQsQ0FBQzs7O09BQUE7Ozs7SUFRTSxnREFBUTs7O0lBQWYsY0FBbUIsQ0FBQzs7OztJQUViLDBEQUFrQjs7O0lBQXpCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFTSx1REFBZTs7O0lBQXRCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRU0sb0VBQTRCOzs7O0lBQW5DLFVBQW9DLEtBQXFCOztZQUMvQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU87UUFDN0IsSUFBSSxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDN0I7SUFDTCxDQUFDOzs7OztJQUVNLG9EQUFZOzs7O0lBQW5CLFVBQW9CLElBQU87O1lBQ25CLE1BQU07UUFFVixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO1lBQzVCLE1BQU0sR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNILHNFQUFzRTtnQkFDdEUsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtvQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQy9CO2FBQ0o7WUFDRCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO1lBQzNCLE1BQU0sR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzlCO1NBQ0o7SUFDTCxDQUFDOzs7OztJQUVNLG9EQUFZOzs7O0lBQW5CLFVBQW9CLElBQU87UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ2pELE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RDLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7O2dCQUNyQixTQUFTLG9CQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBRTVDLDREQUE0RDtZQUM1RCwrREFBK0Q7WUFDL0QsSUFDSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxDQUFDO2dCQUMzQixTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUN4QixJQUFJLENBQUMsWUFBWSxFQUNqQixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQ2YsS0FBSyxDQUFDLENBQUM7Z0JBQ1osQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEtBQUssQ0FBQztvQkFDM0IsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDWixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FDeEIsSUFBSSxDQUFDLFlBQVksRUFDakIsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUNmLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDZjtnQkFDRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDakMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0gsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDM0Q7WUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0ksdURBQWU7Ozs7O0lBQXRCLFVBQXVCLEtBQVU7UUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLE9BQU87SUFDWCxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNJLG9EQUFZOzs7OztJQUFuQixVQUFvQixLQUFVO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLE9BQU87SUFDWCxDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSSw4REFBc0I7Ozs7OztJQUE3QixVQUE4QixLQUFVLEVBQUUsS0FBYTtRQUNuRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7O0lBQ0ksZ0VBQXdCOzs7Ozs7O0lBQS9CLFVBQ0ksS0FBVSxFQUNWLElBQVMsRUFDVCxLQUFhO1FBRWIsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ25CLEtBQUssVUFBVSxDQUFDO1lBQ2hCLEtBQUssV0FBVyxDQUFDO1lBQ2pCLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDYixJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hCLE1BQU07WUFFVixLQUFLLEtBQUs7Z0JBQ04sSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsTUFBTTtZQUVWO2dCQUNJLE9BQU87U0FDZDtJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNLLDhEQUFzQjs7Ozs7O0lBQTlCLFVBQStCLEtBQWE7UUFDeEMsSUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxPQUFPO1lBQ2xDLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxLQUFLLEVBQ3BDO1lBQ0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQzs7Z0JBRTNCLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7WUFDaEUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxRQUFRLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDNUQ7U0FDSjtRQUNELE9BQU87SUFDWCxDQUFDOzs7OztJQUVPLGtEQUFVOzs7O0lBQWxCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7O0lBQ0ssZ0VBQXdCOzs7Ozs7O0lBQWhDLFVBQWlDLElBQU87UUFDcEMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1RCxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHOzs7Ozs7O0lBQ0ssK0RBQXVCOzs7Ozs7SUFBL0IsVUFBZ0MsSUFBTzs7WUFDL0IsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7WUFDL0IsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7WUFFM0IsTUFBTSxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUM7UUFFcEQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCx5REFBeUQ7UUFDekQsNkJBQTZCO1FBQzdCLG1EQUFtRDtRQUNuRCxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLE9BQU8sRUFBRTtZQUNwQyxJQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUztnQkFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTTtnQkFDNUIsQ0FBQyxFQUFFO2dCQUNILElBQUk7Z0JBQ0osSUFBSSxDQUFDLGVBQWUsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUNsRTtnQkFDRSxFQUFFLEdBQUcsTUFBTSxDQUFDO2dCQUNaLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7YUFDaEM7aUJBQU07Z0JBQ0gsSUFBSSxHQUFHLE1BQU0sQ0FBQztnQkFDZCxFQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUNWLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUM7YUFDaEM7U0FDSjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssV0FBVyxFQUFFO1lBQy9DLElBQUksR0FBRyxNQUFNLENBQUM7WUFFZCxvRUFBb0U7WUFDcEUsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbEQsRUFBRSxHQUFHLElBQUksQ0FBQzthQUNiO1NBQ0o7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUM3QyxFQUFFLEdBQUcsTUFBTSxDQUFDO1lBRVosc0VBQXNFO1lBQ3RFLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BELElBQUksR0FBRyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBRUQsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7Ozs7OztJQUNLLGtFQUEwQjs7Ozs7Ozs7OztJQUFsQyxVQUFtQyxJQUFPOztZQUNsQyxNQUFNO1FBRVYsaUVBQWlFO1FBQ2pFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO1lBQ25DLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUNoRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQ2xELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDckQsQ0FBQztZQUNGLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FDbkMsTUFBTSxFQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FDMUIsQ0FBQztTQUNMO2FBQU07WUFDSCxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0M7UUFFRCw2QkFBNkI7UUFDN0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDL0QsQ0FBQztJQUVEOztTQUVLOzs7Ozs7O0lBQ0csbURBQVc7Ozs7OztJQUFuQjtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUFFO1lBQ3JDLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDbkM7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7O2dCQXBjSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsdXdJQUEwRDtvQkFFMUQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLFVBQVUsRUFBRTt3QkFDUiwyQkFBMkIsQ0FBQyxlQUFlO3dCQUMzQywyQkFBMkIsQ0FBQyxZQUFZO3FCQUMzQztvQkFDRCxJQUFJLEVBQUU7d0JBQ0YseUJBQXlCLEVBQUUsc0NBQXNDO3dCQUNqRSwwQkFBMEIsRUFBRSxxQkFBcUI7d0JBQ2pELGdDQUFnQyxFQUFFLDBCQUEwQjt3QkFDNUQsaUNBQWlDLEVBQUUsMkJBQTJCO3dCQUM5RCxpQ0FBaUMsRUFBRSwyQkFBMkI7d0JBQzlELG1DQUFtQyxFQUFFLDZCQUE2Qjt3QkFDbEUsV0FBVyxFQUFFLGtCQUFrQjt3QkFDL0Isb0JBQW9CLEVBQUUseUJBQXlCO3FCQUNsRDs7aUJBQ0o7Ozs7Z0JBNUNHLGlCQUFpQjtnQkFFakIsVUFBVTtnQkFNTCxlQUFlO2dCQUdmLGVBQWUsdUJBdUxOLFFBQVE7OzsyQkFuSnJCLFNBQVMsU0FBQyxvQkFBb0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7d0JBRWpELFNBQVMsU0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7O0lBMmFuRCxvQ0FBQztDQUFBLEFBcmNELElBcWNDO1NBL2FZLDZCQUE2Qjs7O0lBRXRDLGlEQUNrQzs7SUFDbEMsOENBQzRCOztJQUU1QiwrQ0FBOEI7O0lBQzlCLDREQUErQjs7Ozs7OztJQUsvQixvREFBeUM7Ozs7Ozs7SUFTekMseURBQThDOzs7OztJQU05QyxzREFBMkM7Ozs7Ozs7SUFVM0MsMERBQTZCOzs7OztJQTRHaEIsOENBQWdDOzs7OztJQUMvQiwrQ0FBMEI7Ozs7O0lBQzFCLG1EQUFtQzs7Ozs7SUFDcEMsd0RBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGRhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudFxyXG4gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBBZnRlckNvbnRlbnRJbml0LFxyXG4gICAgQWZ0ZXJWaWV3SW5pdCxcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3B0aW9uYWwsXHJcbiAgICBWaWV3Q2hpbGRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQW5pbWF0aW9uRXZlbnQgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnRsIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWludGwuc2VydmljZSc7XHJcbmltcG9ydCB7IE93bENhbGVuZGFyQ29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPd2xUaW1lckNvbXBvbmVudCB9IGZyb20gJy4vdGltZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcclxuaW1wb3J0IHsgT3dsRGF0ZVRpbWUsIFBpY2tlclR5cGUgfSBmcm9tICcuL2RhdGUtdGltZS5jbGFzcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgb3dsRGF0ZVRpbWVQaWNrZXJBbmltYXRpb25zIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmFuaW1hdGlvbnMnO1xyXG5pbXBvcnQge1xyXG4gICAgRE9XTl9BUlJPVyxcclxuICAgIExFRlRfQVJST1csXHJcbiAgICBSSUdIVF9BUlJPVyxcclxuICAgIFNQQUNFLFxyXG4gICAgVVBfQVJST1dcclxufSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lQ29udGFpbmVyJyxcclxuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZS1jb250YWluZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2RhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIG93bERhdGVUaW1lUGlja2VyQW5pbWF0aW9ucy50cmFuc2Zvcm1QaWNrZXIsXHJcbiAgICAgICAgb3dsRGF0ZVRpbWVQaWNrZXJBbmltYXRpb25zLmZhZGVJblBpY2tlclxyXG4gICAgXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnKEB0cmFuc2Zvcm1QaWNrZXIuZG9uZSknOiAnaGFuZGxlQ29udGFpbmVyQW5pbWF0aW9uRG9uZSgkZXZlbnQpJyxcclxuICAgICAgICAnW2NsYXNzLm93bC1kdC1jb250YWluZXJdJzogJ293bERUQ29udGFpbmVyQ2xhc3MnLFxyXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LXBvcHVwLWNvbnRhaW5lcl0nOiAnb3dsRFRQb3B1cENvbnRhaW5lckNsYXNzJyxcclxuICAgICAgICAnW2NsYXNzLm93bC1kdC1kaWFsb2ctY29udGFpbmVyXSc6ICdvd2xEVERpYWxvZ0NvbnRhaW5lckNsYXNzJyxcclxuICAgICAgICAnW2NsYXNzLm93bC1kdC1pbmxpbmUtY29udGFpbmVyXSc6ICdvd2xEVElubGluZUNvbnRhaW5lckNsYXNzJyxcclxuICAgICAgICAnW2NsYXNzLm93bC1kdC1jb250YWluZXItZGlzYWJsZWRdJzogJ293bERUQ29udGFpbmVyRGlzYWJsZWRDbGFzcycsXHJcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdvd2xEVENvbnRhaW5lcklkJyxcclxuICAgICAgICAnW0B0cmFuc2Zvcm1QaWNrZXJdJzogJ293bERUQ29udGFpbmVyQW5pbWF0aW9uJyxcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+XHJcbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBAVmlld0NoaWxkKE93bENhbGVuZGFyQ29tcG9uZW50LCB7IHN0YXRpYzogZmFsc2UgfSlcclxuICAgIGNhbGVuZGFyOiBPd2xDYWxlbmRhckNvbXBvbmVudDxUPjtcclxuICAgIEBWaWV3Q2hpbGQoT3dsVGltZXJDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gICAgdGltZXI6IE93bFRpbWVyQ29tcG9uZW50PFQ+O1xyXG5cclxuICAgIHB1YmxpYyBwaWNrZXI6IE93bERhdGVUaW1lPFQ+O1xyXG4gICAgcHVibGljIGFjdGl2ZVNlbGVjdGVkSW5kZXggPSAwOyAvLyBUaGUgY3VycmVudCBhY3RpdmUgU2VsZWN0ZWRJbmRleCBpbiByYW5nZSBzZWxlY3QgbW9kZSAoMDogJ2Zyb20nLCAxOiAndG8nKVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RyZWFtIGVtaXRzIHdoZW4gdHJ5IHRvIGhpZGUgcGlja2VyXHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBoaWRlUGlja2VyJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgICBnZXQgaGlkZVBpY2tlclN0cmVhbSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhpZGVQaWNrZXIkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RyZWFtIGVtaXRzIHdoZW4gdHJ5IHRvIGNvbmZpcm0gdGhlIHNlbGVjdGVkIHZhbHVlXHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBjb25maXJtU2VsZWN0ZWQkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuICAgIGdldCBjb25maXJtU2VsZWN0ZWRTdHJlYW0oKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maXJtU2VsZWN0ZWQkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGlja2VyT3BlbmVkJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgICBnZXQgcGlja2VyT3BlbmVkU3RyZWFtKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyT3BlbmVkJC5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBjdXJyZW50IHBpY2tlciBtb21lbnQuIFRoaXMgZGV0ZXJtaW5lcyB3aGljaCB0aW1lIHBlcmlvZCBpcyBzaG93biBhbmQgd2hpY2ggZGF0ZSBpc1xyXG4gICAgICogaGlnaGxpZ2h0ZWQgd2hlbiB1c2luZyBrZXlib2FyZCBuYXZpZ2F0aW9uLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jbGFtUGlja2VyTW9tZW50OiBUO1xyXG5cclxuICAgIGdldCBwaWNrZXJNb21lbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsYW1QaWNrZXJNb21lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBpY2tlck1vbWVudCh2YWx1ZTogVCkge1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jbGFtUGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xhbXBEYXRlKFxyXG4gICAgICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5taW5EYXRlVGltZSxcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLm1heERhdGVUaW1lXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBpY2tlclR5cGUoKTogUGlja2VyVHlwZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLnBpY2tlclR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNhbmNlbExhYmVsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5jYW5jZWxCdG5MYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2V0TGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnNldEJ0bkxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHJhbmdlICdmcm9tJyBsYWJlbFxyXG4gICAgICogKi9cclxuICAgIGdldCBmcm9tTGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLnJhbmdlRnJvbUxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHJhbmdlICd0bycgbGFiZWxcclxuICAgICAqICovXHJcbiAgICBnZXQgdG9MYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwucmFuZ2VUb0xhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHJhbmdlICdmcm9tJyBmb3JtYXR0ZWQgdmFsdWVcclxuICAgICAqICovXHJcbiAgICBnZXQgZnJvbUZvcm1hdHRlZFZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBpY2tlci5zZWxlY3RlZHNbMF07XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KHZhbHVlLCB0aGlzLnBpY2tlci5mb3JtYXRTdHJpbmcpXHJcbiAgICAgICAgICAgIDogJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcmFuZ2UgJ3RvJyBmb3JtYXR0ZWQgdmFsdWVcclxuICAgICAqICovXHJcbiAgICBnZXQgdG9Gb3JtYXR0ZWRWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5waWNrZXIuc2VsZWN0ZWRzWzFdO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGhpcy5waWNrZXIuZm9ybWF0U3RyaW5nKVxyXG4gICAgICAgICAgICA6ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FzZXMgaW4gd2hpY2ggdGhlIGNvbnRyb2wgYnV0dG9ucyBzaG93IGluIHRoZSBwaWNrZXJcclxuICAgICAqIDEpIHBpY2tlciBtb2RlIGlzICdkaWFsb2cnXHJcbiAgICAgKiAyKSBwaWNrZXIgdHlwZSBpcyBOT1QgJ2NhbGVuZGFyJyBhbmQgdGhlIHBpY2tlciBtb2RlIGlzIE5PVCAnaW5saW5lJ1xyXG4gICAgICogKi9cclxuICAgIGdldCBzaG93Q29udHJvbEJ1dHRvbnMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2RpYWxvZycgfHxcclxuICAgICAgICAgICAgKHRoaXMucGlja2VyLnBpY2tlclR5cGUgIT09ICdjYWxlbmRhcicgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLnBpY2tlck1vZGUgIT09ICdpbmxpbmUnKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGNvbnRhaW5lckVsbSgpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERUQ29udGFpbmVyQ2xhc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERUUG9wdXBDb250YWluZXJDbGFzcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ3BvcHVwJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsRFREaWFsb2dDb250YWluZXJDbGFzcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2RpYWxvZyc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERUSW5saW5lQ29udGFpbmVyQ2xhc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLnBpY2tlck1vZGUgPT09ICdpbmxpbmUnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xEVENvbnRhaW5lckRpc2FibGVkQ2xhc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLmRpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xEVENvbnRhaW5lcklkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xEVENvbnRhaW5lckFuaW1hdGlvbigpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnaW5saW5lJyA/ICcnIDogJ2VudGVyJztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgICAgICAgICAgIHByaXZhdGUgZWxtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgICAgICBwcml2YXRlIHBpY2tlckludGw6IE93bERhdGVUaW1lSW50bCxcclxuICAgICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+ICkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHt9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRQaWNrZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZm9jdXNQaWNrZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFuZGxlQ29udGFpbmVyQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0b1N0YXRlID0gZXZlbnQudG9TdGF0ZTtcclxuICAgICAgICBpZiAodG9TdGF0ZSA9PT0gJ2VudGVyJykge1xyXG4gICAgICAgICAgICB0aGlzLnBpY2tlck9wZW5lZCQubmV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGF0ZVNlbGVjdGVkKGRhdGU6IFQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5waWNrZXIuaXNJblNpbmdsZU1vZGUpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5kYXRlU2VsZWN0ZWRJblNpbmdsZU1vZGUoZGF0ZSk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB3ZSBjbG9zZSB0aGUgcGlja2VyIHdoZW4gcmVzdWx0IGlzIG51bGwgYW5kIHBpY2tlclR5cGUgaXMgY2FsZW5kYXIuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5waWNrZXJUeXBlID09PSAnY2FsZW5kYXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUGlja2VyJC5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5pc0luUmFuZ2VNb2RlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVNlbGVjdGVkSW5SYW5nZU1vZGUoZGF0ZSk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gcmVzdWx0W3RoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3QocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGltZVNlbGVjdGVkKHRpbWU6IFQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBpY2tlck1vbWVudCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNsb25lKHRpbWUpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMucGlja2VyLmRhdGVUaW1lQ2hlY2tlcih0aGlzLnBpY2tlck1vbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGlja2VyLmlzSW5TaW5nbGVNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyLnNlbGVjdCh0aGlzLnBpY2tlck1vbWVudCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5pc0luUmFuZ2VNb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkcyA9IFsuLi50aGlzLnBpY2tlci5zZWxlY3RlZHNdO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlICdmcm9tJyBpcyBhZnRlciAndG8nIG9yICd0bydpcyBiZWZvcmUgJ2Zyb20nXHJcbiAgICAgICAgICAgIC8vIEluIHRoaXMgY2FzZSwgd2Ugc2V0IGJvdGggdGhlICdmcm9tJyBhbmQgJ3RvJyB0aGUgc2FtZSB2YWx1ZVxyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAodGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID09PSAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRzWzFdICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkc1sxXVxyXG4gICAgICAgICAgICAgICAgICAgICkgPT09IDEpIHx8XHJcbiAgICAgICAgICAgICAgICAodGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRzWzBdICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuY29tcGFyZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkc1swXVxyXG4gICAgICAgICAgICAgICAgICAgICkgPT09IC0xKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkc1swXSA9IHRoaXMucGlja2VyTW9tZW50O1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRzWzFdID0gdGhpcy5waWNrZXJNb21lbnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZHNbdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4XSA9IHRoaXMucGlja2VyTW9tZW50O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3Qoc2VsZWN0ZWRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgY2xpY2sgb24gY2FuY2VsIGJ1dHRvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25DYW5jZWxDbGlja2VkKGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhpZGVQaWNrZXIkLm5leHQobnVsbCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgY2xpY2sgb24gc2V0IGJ1dHRvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb25TZXRDbGlja2VkKGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucGlja2VyLmRhdGVUaW1lQ2hlY2tlcih0aGlzLnBpY2tlck1vbWVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlUGlja2VyJC5uZXh0KG51bGwpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZCQubmV4dChldmVudCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgY2xpY2sgb24gaW5mb3JtIHJhZGlvIGdyb3VwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYW5kbGVDbGlja09uSW5mb0dyb3VwKGV2ZW50OiBhbnksIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldEFjdGl2ZVNlbGVjdGVkSW5kZXgoaW5kZXgpO1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgY2xpY2sgb24gaW5mb3JtIHJhZGlvIGdyb3VwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYW5kbGVLZXlkb3duT25JbmZvR3JvdXAoXHJcbiAgICAgICAgZXZlbnQ6IGFueSxcclxuICAgICAgICBuZXh0OiBhbnksXHJcbiAgICAgICAgaW5kZXg6IG51bWJlclxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcclxuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcclxuICAgICAgICAgICAgY2FzZSBVUF9BUlJPVzpcclxuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxyXG4gICAgICAgICAgICAgICAgbmV4dC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVTZWxlY3RlZEluZGV4KGluZGV4ID09PSAwID8gMSA6IDApO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVTZWxlY3RlZEluZGV4KGluZGV4KTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHZhbHVlIG9mIGFjdGl2ZVNlbGVjdGVkSW5kZXhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRBY3RpdmVTZWxlY3RlZEluZGV4KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgJiZcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ICE9PSBpbmRleFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5waWNrZXIuc2VsZWN0ZWRzW3RoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleF07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBpY2tlci5zZWxlY3RlZHMgJiYgc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xvbmUoc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRQaWNrZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSB0aGlzLnBpY2tlci5zdGFydEF0IHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9IHRoaXMucGlja2VyLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJyA/IDEgOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IGNhbGVuZGFyIGRhdGUgaW4gc2luZ2xlIG1vZGUsXHJcbiAgICAgKiBpdCByZXR1cm5zIG51bGwgd2hlbiBkYXRlIGlzIG5vdCBzZWxlY3RlZC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkYXRlU2VsZWN0ZWRJblNpbmdsZU1vZGUoZGF0ZTogVCk6IFQgfCBudWxsIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNTYW1lRGF5KGRhdGUsIHRoaXMucGlja2VyLnNlbGVjdGVkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUFuZENoZWNrQ2FsZW5kYXJEYXRlKGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IGRhdGVzIGluIHJhbmdlIE1vZGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkYXRlU2VsZWN0ZWRJblJhbmdlTW9kZShkYXRlOiBUKTogVFtdIHwgbnVsbCB7XHJcbiAgICAgICAgbGV0IGZyb20gPSB0aGlzLnBpY2tlci5zZWxlY3RlZHNbMF07XHJcbiAgICAgICAgbGV0IHRvID0gdGhpcy5waWNrZXIuc2VsZWN0ZWRzWzFdO1xyXG5cclxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnVwZGF0ZUFuZENoZWNrQ2FsZW5kYXJEYXRlKGRhdGUpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSBnaXZlbiBjYWxlbmRhciBkYXkgaXMgYWZ0ZXIgb3IgZXF1YWwgdG8gJ2Zyb20nLFxyXG4gICAgICAgIC8vIHNldCB0aHMgZ2l2ZW4gZGF0ZSBhcyAndG8nXHJcbiAgICAgICAgLy8gb3RoZXJ3aXNlLCBzZXQgaXQgYXMgJ2Zyb20nIGFuZCBzZXQgJ3RvJyB0byBudWxsXHJcbiAgICAgICAgaWYgKHRoaXMucGlja2VyLnNlbGVjdE1vZGUgPT09ICdyYW5nZScpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0ZWRzICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3RlZHMubGVuZ3RoICYmXHJcbiAgICAgICAgICAgICAgICAhdG8gJiZcclxuICAgICAgICAgICAgICAgIGZyb20gJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRpZmZlcmVuY2VJbkNhbGVuZGFyRGF5cyhyZXN1bHQsIGZyb20pID49IDBcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0byA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9IDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmcm9tID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdG8gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScpIHtcclxuICAgICAgICAgICAgZnJvbSA9IHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSBmcm9tIHZhbHVlIGlzIGFmdGVyIHRoZSB0byB2YWx1ZSwgc2V0IHRoZSB0byB2YWx1ZSBhcyBudWxsXHJcbiAgICAgICAgICAgIGlmICh0byAmJiB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGZyb20sIHRvKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRvID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nKSB7XHJcbiAgICAgICAgICAgIHRvID0gcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlIGZyb20gdmFsdWUgaXMgYWZ0ZXIgdGhlIHRvIHZhbHVlLCBzZXQgdGhlIGZyb20gdmFsdWUgYXMgbnVsbFxyXG4gICAgICAgICAgICBpZiAoZnJvbSAmJiB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGZyb20sIHRvKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGZyb20gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gW2Zyb20sIHRvXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZSB0aGUgZ2l2ZW4gY2FsZW5kYXIgZGF0ZSdzIHRpbWUgYW5kIGNoZWNrIGlmIGl0IGlzIHZhbGlkXHJcbiAgICAgKiBCZWNhdXNlIHRoZSBjYWxlbmRhciBkYXRlIGhhcyAwMDowMDowMCBhcyBkZWZhdWx0IHRpbWUsIGlmIHRoZSBwaWNrZXIgdHlwZSBpcyAnYm90aCcsXHJcbiAgICAgKiB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgZ2l2ZW4gY2FsZW5kYXIgZGF0ZSdzIHRpbWUgYmVmb3JlIHNlbGVjdGluZyBpdC5cclxuICAgICAqIGlmIGl0IGlzIHZhbGlkLCByZXR1cm4gdGhlIHVwZGF0ZWQgZGF0ZVRpbWVcclxuICAgICAqIGlmIGl0IGlzIG5vdCB2YWxpZCwgcmV0dXJuIG51bGxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVBbmRDaGVja0NhbGVuZGFyRGF0ZShkYXRlOiBUKTogVCB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIHBpY2tlciBpcyAnYm90aCcsIHVwZGF0ZSB0aGUgY2FsZW5kYXIgZGF0ZSdzIHRpbWUgdmFsdWVcclxuICAgICAgICBpZiAodGhpcy5waWNrZXIucGlja2VyVHlwZSA9PT0gJ2JvdGgnKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKGRhdGUpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgoZGF0ZSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKGRhdGUpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5waWNrZXJNb21lbnQpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLnBpY2tlck1vbWVudCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRTZWNvbmRzKHRoaXMucGlja2VyTW9tZW50KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jbGFtcERhdGUoXHJcbiAgICAgICAgICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5taW5EYXRlVGltZSxcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLm1heERhdGVUaW1lXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xvbmUoZGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjaGVjayB0aGUgdXBkYXRlZCBkYXRlVGltZVxyXG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlci5kYXRlVGltZUNoZWNrZXIocmVzdWx0KSA/IHJlc3VsdCA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb2N1cyB0byB0aGUgcGlja2VyXHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBmb2N1c1BpY2tlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2lubGluZScpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2FsZW5kYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZXIpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lci5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=