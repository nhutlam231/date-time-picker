/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class OwlDateTimeContainerComponent {
    /**
     * @param {?} cdRef
     * @param {?} elmRef
     * @param {?} pickerIntl
     * @param {?} dateTimeAdapter
     */
    constructor(cdRef, elmRef, pickerIntl, dateTimeAdapter) {
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
    /**
     * @return {?}
     */
    get hidePickerStream() {
        return this.hidePicker$.asObservable();
    }
    /**
     * @return {?}
     */
    get confirmSelectedStream() {
        return this.confirmSelected$.asObservable();
    }
    /**
     * @return {?}
     */
    get pickerOpenedStream() {
        return this.pickerOpened$.asObservable();
    }
    /**
     * @return {?}
     */
    get pickerMoment() {
        return this._clamPickerMoment;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set pickerMoment(value) {
        if (value) {
            this._clamPickerMoment = this.dateTimeAdapter.clampDate(value, this.picker.minDateTime, this.picker.maxDateTime);
        }
        this.cdRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get pickerType() {
        return this.picker.pickerType;
    }
    /**
     * @return {?}
     */
    get cancelLabel() {
        return this.pickerIntl.cancelBtnLabel;
    }
    /**
     * @return {?}
     */
    get setLabel() {
        return this.pickerIntl.setBtnLabel;
    }
    /**
     * The range 'from' label
     *
     * @return {?}
     */
    get fromLabel() {
        return this.pickerIntl.rangeFromLabel;
    }
    /**
     * The range 'to' label
     *
     * @return {?}
     */
    get toLabel() {
        return this.pickerIntl.rangeToLabel;
    }
    /**
     * The range 'from' formatted value
     *
     * @return {?}
     */
    get fromFormattedValue() {
        /** @type {?} */
        const value = this.picker.selecteds[0];
        return value
            ? this.dateTimeAdapter.format(value, this.picker.formatString)
            : '';
    }
    /**
     * The range 'to' formatted value
     *
     * @return {?}
     */
    get toFormattedValue() {
        /** @type {?} */
        const value = this.picker.selecteds[1];
        return value
            ? this.dateTimeAdapter.format(value, this.picker.formatString)
            : '';
    }
    /**
     * Cases in which the control buttons show in the picker
     * 1) picker mode is 'dialog'
     * 2) picker type is NOT 'calendar' and the picker mode is NOT 'inline'
     *
     * @return {?}
     */
    get showControlButtons() {
        return (this.picker.pickerMode === 'dialog' ||
            (this.picker.pickerType !== 'calendar' &&
                this.picker.pickerMode !== 'inline'));
    }
    /**
     * @return {?}
     */
    get containerElm() {
        return this.elmRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get owlDTContainerClass() {
        return true;
    }
    /**
     * @return {?}
     */
    get owlDTPopupContainerClass() {
        return this.picker.pickerMode === 'popup';
    }
    /**
     * @return {?}
     */
    get owlDTDialogContainerClass() {
        return this.picker.pickerMode === 'dialog';
    }
    /**
     * @return {?}
     */
    get owlDTInlineContainerClass() {
        return this.picker.pickerMode === 'inline';
    }
    /**
     * @return {?}
     */
    get owlDTContainerDisabledClass() {
        return this.picker.disabled;
    }
    /**
     * @return {?}
     */
    get owlDTContainerId() {
        return this.picker.id;
    }
    /**
     * @return {?}
     */
    get owlDTContainerAnimation() {
        return this.picker.pickerMode === 'inline' ? '' : 'enter';
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.initPicker();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.focusPicker();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleContainerAnimationDone(event) {
        /** @type {?} */
        const toState = event.toState;
        if (toState === 'enter') {
            this.pickerOpened$.next();
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    dateSelected(date) {
        /** @type {?} */
        let result;
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
    }
    /**
     * @param {?} time
     * @return {?}
     */
    timeSelected(time) {
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
            const selecteds = [...this.picker.selecteds];
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
    }
    /**
     * Handle click on cancel button
     * @param {?} event
     * @return {?}
     */
    onCancelClicked(event) {
        this.hidePicker$.next(null);
        event.preventDefault();
        return;
    }
    /**
     * Handle click on set button
     * @param {?} event
     * @return {?}
     */
    onSetClicked(event) {
        if (!this.picker.dateTimeChecker(this.pickerMoment)) {
            this.hidePicker$.next(null);
            event.preventDefault();
            return;
        }
        this.confirmSelected$.next(event);
        event.preventDefault();
        return;
    }
    /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    handleClickOnInfoGroup(event, index) {
        this.setActiveSelectedIndex(index);
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * Handle click on inform radio group
     * @param {?} event
     * @param {?} next
     * @param {?} index
     * @return {?}
     */
    handleKeydownOnInfoGroup(event, next, index) {
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
    }
    /**
     * Set the value of activeSelectedIndex
     * @private
     * @param {?} index
     * @return {?}
     */
    setActiveSelectedIndex(index) {
        if (this.picker.selectMode === 'range' &&
            this.activeSelectedIndex !== index) {
            this.activeSelectedIndex = index;
            /** @type {?} */
            const selected = this.picker.selecteds[this.activeSelectedIndex];
            if (this.picker.selecteds && selected) {
                this.pickerMoment = this.dateTimeAdapter.clone(selected);
            }
        }
        return;
    }
    /**
     * @private
     * @return {?}
     */
    initPicker() {
        this.pickerMoment = this.picker.startAt || this.dateTimeAdapter.now();
        this.activeSelectedIndex = this.picker.selectMode === 'rangeTo' ? 1 : 0;
    }
    /**
     * Select calendar date in single mode,
     * it returns null when date is not selected.
     * @private
     * @param {?} date
     * @return {?}
     */
    dateSelectedInSingleMode(date) {
        if (this.dateTimeAdapter.isSameDay(date, this.picker.selected)) {
            return null;
        }
        return this.updateAndCheckCalendarDate(date);
    }
    /**
     * Select dates in range Mode
     * @private
     * @param {?} date
     * @return {?}
     */
    dateSelectedInRangeMode(date) {
        /** @type {?} */
        let from = this.picker.selecteds[0];
        /** @type {?} */
        let to = this.picker.selecteds[1];
        /** @type {?} */
        const result = this.updateAndCheckCalendarDate(date);
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
    }
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
    updateAndCheckCalendarDate(date) {
        /** @type {?} */
        let result;
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
    }
    /**
     * Focus to the picker
     *
     * @private
     * @return {?}
     */
    focusPicker() {
        if (this.picker.pickerMode === 'inline') {
            return;
        }
        if (this.calendar) {
            this.calendar.focusActiveCell();
        }
        else if (this.timer) {
            this.timer.focus();
        }
    }
}
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
OwlDateTimeContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: OwlDateTimeIntl },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] }
];
OwlDateTimeContainerComponent.propDecorators = {
    calendar: [{ type: ViewChild, args: [OwlCalendarComponent, { static: false },] }],
    timer: [{ type: ViewChild, args: [OwlTimerComponent, { static: false },] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBR0gsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVWLFFBQVEsRUFDUixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzVFLE9BQU8sRUFDSCxVQUFVLEVBQ1YsVUFBVSxFQUNWLFdBQVcsRUFDWCxLQUFLLEVBQ0wsUUFBUSxFQUNYLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUF3Qi9CLE1BQU0sT0FBTyw2QkFBNkI7Ozs7Ozs7SUFrSnRDLFlBQXFCLEtBQXdCLEVBQ3ZCLE1BQWtCLEVBQ2xCLFVBQTJCLEVBQ2hCLGVBQW1DO1FBSC9DLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3ZCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFDaEIsb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBN0k3RCx3QkFBbUIsR0FBRyxDQUFDLENBQUMsQ0FBQyw2RUFBNkU7Ozs7OztRQUtyRyxnQkFBVyxHQUFHLElB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QywwREFBNkI7Ozs7O0lBNEdoQiw4Q0FBZ0M7Ozs7O0lBQy9CLCtDQUEwQjs7Ozs7SUFDMUIsbURBQW1DOzs7OztJQUNwQyx3REFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEFmdGVyQ29udGVudEluaXQsXHJcbiAgICBBZnRlclZpZXdJbml0LFxyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENvbXBvbmVudCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBPbkluaXQsXHJcbiAgICBPcHRpb25hbCxcclxuICAgIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3dsQ2FsZW5kYXJDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE93bFRpbWVyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xyXG5pbXBvcnQgeyBPd2xEYXRlVGltZSwgUGlja2VyVHlwZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBvd2xEYXRlVGltZVBpY2tlckFuaW1hdGlvbnMgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXIuYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7XHJcbiAgICBET1dOX0FSUk9XLFxyXG4gICAgTEVGVF9BUlJPVyxcclxuICAgIFJJR0hUX0FSUk9XLFxyXG4gICAgU1BBQ0UsXHJcbiAgICBVUF9BUlJPV1xyXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVDb250YWluZXInLFxyXG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLWNvbnRhaW5lcicsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgb3dsRGF0ZVRpbWVQaWNrZXJBbmltYXRpb25zLnRyYW5zZm9ybVBpY2tlcixcclxuICAgICAgICBvd2xEYXRlVGltZVBpY2tlckFuaW1hdGlvbnMuZmFkZUluUGlja2VyXHJcbiAgICBdLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICcoQHRyYW5zZm9ybVBpY2tlci5kb25lKSc6ICdoYW5kbGVDb250YWluZXJBbmltYXRpb25Eb25lKCRldmVudCknLFxyXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LWNvbnRhaW5lcl0nOiAnb3dsRFRDb250YWluZXJDbGFzcycsXHJcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtcG9wdXAtY29udGFpbmVyXSc6ICdvd2xEVFBvcHVwQ29udGFpbmVyQ2xhc3MnLFxyXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LWRpYWxvZy1jb250YWluZXJdJzogJ293bERURGlhbG9nQ29udGFpbmVyQ2xhc3MnLFxyXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LWlubGluZS1jb250YWluZXJdJzogJ293bERUSW5saW5lQ29udGFpbmVyQ2xhc3MnLFxyXG4gICAgICAgICdbY2xhc3Mub3dsLWR0LWNvbnRhaW5lci1kaXNhYmxlZF0nOiAnb3dsRFRDb250YWluZXJEaXNhYmxlZENsYXNzJyxcclxuICAgICAgICAnW2F0dHIuaWRdJzogJ293bERUQ29udGFpbmVySWQnLFxyXG4gICAgICAgICdbQHRyYW5zZm9ybVBpY2tlcl0nOiAnb3dsRFRDb250YWluZXJBbmltYXRpb24nLFxyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD5cclxuICAgIGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0IHtcclxuICAgIEBWaWV3Q2hpbGQoT3dsQ2FsZW5kYXJDb21wb25lbnQsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gICAgY2FsZW5kYXI6IE93bENhbGVuZGFyQ29tcG9uZW50PFQ+O1xyXG4gICAgQFZpZXdDaGlsZChPd2xUaW1lckNvbXBvbmVudCwgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgICB0aW1lcjogT3dsVGltZXJDb21wb25lbnQ8VD47XHJcblxyXG4gICAgcHVibGljIHBpY2tlcjogT3dsRGF0ZVRpbWU8VD47XHJcbiAgICBwdWJsaWMgYWN0aXZlU2VsZWN0ZWRJbmRleCA9IDA7IC8vIFRoZSBjdXJyZW50IGFjdGl2ZSBTZWxlY3RlZEluZGV4IGluIHJhbmdlIHNlbGVjdCBtb2RlICgwOiAnZnJvbScsIDE6ICd0bycpXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdHJlYW0gZW1pdHMgd2hlbiB0cnkgdG8gaGlkZSBwaWNrZXJcclxuICAgICAqICovXHJcbiAgICBwcml2YXRlIGhpZGVQaWNrZXIkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuICAgIGdldCBoaWRlUGlja2VyU3RyZWFtKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZVBpY2tlciQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTdHJlYW0gZW1pdHMgd2hlbiB0cnkgdG8gY29uZmlybSB0aGUgc2VsZWN0ZWQgdmFsdWVcclxuICAgICAqICovXHJcbiAgICBwcml2YXRlIGNvbmZpcm1TZWxlY3RlZCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gICAgZ2V0IGNvbmZpcm1TZWxlY3RlZFN0cmVhbSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpcm1TZWxlY3RlZCQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwaWNrZXJPcGVuZWQkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuICAgIGdldCBwaWNrZXJPcGVuZWRTdHJlYW0oKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJPcGVuZWQkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGN1cnJlbnQgcGlja2VyIG1vbWVudC4gVGhpcyBkZXRlcm1pbmVzIHdoaWNoIHRpbWUgcGVyaW9kIGlzIHNob3duIGFuZCB3aGljaCBkYXRlIGlzXHJcbiAgICAgKiBoaWdobGlnaHRlZCB3aGVuIHVzaW5nIGtleWJvYXJkIG5hdmlnYXRpb24uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NsYW1QaWNrZXJNb21lbnQ6IFQ7XHJcblxyXG4gICAgZ2V0IHBpY2tlck1vbWVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2xhbVBpY2tlck1vbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGlja2VyTW9tZW50KHZhbHVlOiBUKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsYW1QaWNrZXJNb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jbGFtcERhdGUoXHJcbiAgICAgICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLm1pbkRhdGVUaW1lLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIubWF4RGF0ZVRpbWVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGlja2VyVHlwZSgpOiBQaWNrZXJUeXBlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY2FuY2VsTGFiZWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXJJbnRsLmNhbmNlbEJ0bkxhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzZXRMYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwuc2V0QnRuTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcmFuZ2UgJ2Zyb20nIGxhYmVsXHJcbiAgICAgKiAqL1xyXG4gICAgZ2V0IGZyb21MYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlckludGwucmFuZ2VGcm9tTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcmFuZ2UgJ3RvJyBsYWJlbFxyXG4gICAgICogKi9cclxuICAgIGdldCB0b0xhYmVsKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VySW50bC5yYW5nZVRvTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcmFuZ2UgJ2Zyb20nIGZvcm1hdHRlZCB2YWx1ZVxyXG4gICAgICogKi9cclxuICAgIGdldCBmcm9tRm9ybWF0dGVkVmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGlja2VyLnNlbGVjdGVkc1swXTtcclxuICAgICAgICByZXR1cm4gdmFsdWVcclxuICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQodmFsdWUsIHRoaXMucGlja2VyLmZvcm1hdFN0cmluZylcclxuICAgICAgICAgICAgOiAnJztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSByYW5nZSAndG8nIGZvcm1hdHRlZCB2YWx1ZVxyXG4gICAgICogKi9cclxuICAgIGdldCB0b0Zvcm1hdHRlZFZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBpY2tlci5zZWxlY3RlZHNbMV07XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KHZhbHVlLCB0aGlzLnBpY2tlci5mb3JtYXRTdHJpbmcpXHJcbiAgICAgICAgICAgIDogJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYXNlcyBpbiB3aGljaCB0aGUgY29udHJvbCBidXR0b25zIHNob3cgaW4gdGhlIHBpY2tlclxyXG4gICAgICogMSkgcGlja2VyIG1vZGUgaXMgJ2RpYWxvZydcclxuICAgICAqIDIpIHBpY2tlciB0eXBlIGlzIE5PVCAnY2FsZW5kYXInIGFuZCB0aGUgcGlja2VyIG1vZGUgaXMgTk9UICdpbmxpbmUnXHJcbiAgICAgKiAqL1xyXG4gICAgZ2V0IHNob3dDb250cm9sQnV0dG9ucygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICB0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnZGlhbG9nJyB8fFxyXG4gICAgICAgICAgICAodGhpcy5waWNrZXIucGlja2VyVHlwZSAhPT0gJ2NhbGVuZGFyJyAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIucGlja2VyTW9kZSAhPT0gJ2lubGluZScpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY29udGFpbmVyRWxtKCk6IEhUTUxFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsRFRDb250YWluZXJDbGFzcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsRFRQb3B1cENvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAncG9wdXAnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xEVERpYWxvZ0NvbnRhaW5lckNsYXNzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnZGlhbG9nJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsRFRJbmxpbmVDb250YWluZXJDbGFzcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIucGlja2VyTW9kZSA9PT0gJ2lubGluZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERUQ29udGFpbmVyRGlzYWJsZWRDbGFzcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIuZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERUQ29udGFpbmVySWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERUQ29udGFpbmVyQW5pbWF0aW9uKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLnBpY2tlck1vZGUgPT09ICdpbmxpbmUnID8gJycgOiAnZW50ZXInO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBlbG1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgICAgICAgICAgIHByaXZhdGUgcGlja2VySW50bDogT3dsRGF0ZVRpbWVJbnRsLFxyXG4gICAgICAgICAgICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4gKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5pdFBpY2tlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mb2N1c1BpY2tlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVDb250YWluZXJBbmltYXRpb25Eb25lKGV2ZW50OiBBbmltYXRpb25FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRvU3RhdGUgPSBldmVudC50b1N0YXRlO1xyXG4gICAgICAgIGlmICh0b1N0YXRlID09PSAnZW50ZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyT3BlbmVkJC5uZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkYXRlU2VsZWN0ZWQoZGF0ZTogVCk6IHZvaWQge1xyXG4gICAgICAgIGxldCByZXN1bHQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5pc0luU2luZ2xlTW9kZSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmRhdGVTZWxlY3RlZEluU2luZ2xlTW9kZShkYXRlKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3QocmVzdWx0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHdlIGNsb3NlIHRoZSBwaWNrZXIgd2hlbiByZXN1bHQgaXMgbnVsbCBhbmQgcGlja2VyVHlwZSBpcyBjYWxlbmRhci5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBpY2tlclR5cGUgPT09ICdjYWxlbmRhcicpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVQaWNrZXIkLm5leHQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGlja2VyLmlzSW5SYW5nZU1vZGUpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5kYXRlU2VsZWN0ZWRJblJhbmdlTW9kZShkYXRlKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSByZXN1bHRbdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4XTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLnNlbGVjdChyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0aW1lU2VsZWN0ZWQodGltZTogVCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGlja2VyTW9tZW50ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xvbmUodGltZSk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5waWNrZXIuZGF0ZVRpbWVDaGVja2VyKHRoaXMucGlja2VyTW9tZW50KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5waWNrZXIuaXNJblNpbmdsZU1vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0KHRoaXMucGlja2VyTW9tZW50KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGlja2VyLmlzSW5SYW5nZU1vZGUpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRzID0gWy4uLnRoaXMucGlja2VyLnNlbGVjdGVkc107XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgJ2Zyb20nIGlzIGFmdGVyICd0bycgb3IgJ3RvJ2lzIGJlZm9yZSAnZnJvbSdcclxuICAgICAgICAgICAgLy8gSW4gdGhpcyBjYXNlLCB3ZSBzZXQgYm90aCB0aGUgJ2Zyb20nIGFuZCAndG8nIHRoZSBzYW1lIHZhbHVlXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICh0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPT09IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZHNbMV0gJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRzWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgKSA9PT0gMSkgfHxcclxuICAgICAgICAgICAgICAgICh0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPT09IDEgJiZcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZHNbMF0gJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tlck1vbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRzWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgKSA9PT0gLTEpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRzWzBdID0gdGhpcy5waWNrZXJNb21lbnQ7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZHNbMV0gPSB0aGlzLnBpY2tlck1vbWVudDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkc1t0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXhdID0gdGhpcy5waWNrZXJNb21lbnQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyLnNlbGVjdChzZWxlY3RlZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBjbGljayBvbiBjYW5jZWwgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkNhbmNlbENsaWNrZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGlkZVBpY2tlciQubmV4dChudWxsKTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBjbGljayBvbiBzZXQgYnV0dG9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblNldENsaWNrZWQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5waWNrZXIuZGF0ZVRpbWVDaGVja2VyKHRoaXMucGlja2VyTW9tZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVQaWNrZXIkLm5leHQobnVsbCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkJC5uZXh0KGV2ZW50KTtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBjbGljayBvbiBpbmZvcm0gcmFkaW8gZ3JvdXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUNsaWNrT25JbmZvR3JvdXAoZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlU2VsZWN0ZWRJbmRleChpbmRleCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBjbGljayBvbiBpbmZvcm0gcmFkaW8gZ3JvdXBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUtleWRvd25PbkluZm9Hcm91cChcclxuICAgICAgICBldmVudDogYW55LFxyXG4gICAgICAgIG5leHQ6IGFueSxcclxuICAgICAgICBpbmRleDogbnVtYmVyXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxyXG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxyXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxyXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XHJcbiAgICAgICAgICAgICAgICBuZXh0LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVNlbGVjdGVkSW5kZXgoaW5kZXggPT09IDAgPyAxIDogMCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZVNlbGVjdGVkSW5kZXgoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgdmFsdWUgb2YgYWN0aXZlU2VsZWN0ZWRJbmRleFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldEFjdGl2ZVNlbGVjdGVkSW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyAmJlxyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggIT09IGluZGV4XHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnBpY2tlci5zZWxlY3RlZHNbdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4XTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGlja2VyLnNlbGVjdGVkcyAmJiBzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXJNb21lbnQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jbG9uZShzZWxlY3RlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFBpY2tlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBpY2tlck1vbWVudCA9IHRoaXMucGlja2VyLnN0YXJ0QXQgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID0gdGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nID8gMSA6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgY2FsZW5kYXIgZGF0ZSBpbiBzaW5nbGUgbW9kZSxcclxuICAgICAqIGl0IHJldHVybnMgbnVsbCB3aGVuIGRhdGUgaXMgbm90IHNlbGVjdGVkLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRhdGVTZWxlY3RlZEluU2luZ2xlTW9kZShkYXRlOiBUKTogVCB8IG51bGwge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1NhbWVEYXkoZGF0ZSwgdGhpcy5waWNrZXIuc2VsZWN0ZWQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlQW5kQ2hlY2tDYWxlbmRhckRhdGUoZGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgZGF0ZXMgaW4gcmFuZ2UgTW9kZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRhdGVTZWxlY3RlZEluUmFuZ2VNb2RlKGRhdGU6IFQpOiBUW10gfCBudWxsIHtcclxuICAgICAgICBsZXQgZnJvbSA9IHRoaXMucGlja2VyLnNlbGVjdGVkc1swXTtcclxuICAgICAgICBsZXQgdG8gPSB0aGlzLnBpY2tlci5zZWxlY3RlZHNbMV07XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudXBkYXRlQW5kQ2hlY2tDYWxlbmRhckRhdGUoZGF0ZSk7XHJcblxyXG4gICAgICAgIGlmICghcmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIGdpdmVuIGNhbGVuZGFyIGRheSBpcyBhZnRlciBvciBlcXVhbCB0byAnZnJvbScsXHJcbiAgICAgICAgLy8gc2V0IHRocyBnaXZlbiBkYXRlIGFzICd0bydcclxuICAgICAgICAvLyBvdGhlcndpc2UsIHNldCBpdCBhcyAnZnJvbScgYW5kIHNldCAndG8nIHRvIG51bGxcclxuICAgICAgICBpZiAodGhpcy5waWNrZXIuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJykge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2tlci5zZWxlY3RlZHMgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLnNlbGVjdGVkcy5sZW5ndGggJiZcclxuICAgICAgICAgICAgICAgICF0byAmJlxyXG4gICAgICAgICAgICAgICAgZnJvbSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKHJlc3VsdCwgZnJvbSkgPj0gMFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHRvID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZEluZGV4ID0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZyb20gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB0byA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBpY2tlci5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJykge1xyXG4gICAgICAgICAgICBmcm9tID0gcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlIGZyb20gdmFsdWUgaXMgYWZ0ZXIgdGhlIHRvIHZhbHVlLCBzZXQgdGhlIHRvIHZhbHVlIGFzIG51bGxcclxuICAgICAgICAgICAgaWYgKHRvICYmIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZnJvbSwgdG8pID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdG8gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBpY2tlci5zZWxlY3RNb2RlID09PSAncmFuZ2VUbycpIHtcclxuICAgICAgICAgICAgdG8gPSByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB0aGUgZnJvbSB2YWx1ZSBpcyBhZnRlciB0aGUgdG8gdmFsdWUsIHNldCB0aGUgZnJvbSB2YWx1ZSBhcyBudWxsXHJcbiAgICAgICAgICAgIGlmIChmcm9tICYmIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZnJvbSwgdG8pID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZnJvbSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBbZnJvbSwgdG9dO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRoZSBnaXZlbiBjYWxlbmRhciBkYXRlJ3MgdGltZSBhbmQgY2hlY2sgaWYgaXQgaXMgdmFsaWRcclxuICAgICAqIEJlY2F1c2UgdGhlIGNhbGVuZGFyIGRhdGUgaGFzIDAwOjAwOjAwIGFzIGRlZmF1bHQgdGltZSwgaWYgdGhlIHBpY2tlciB0eXBlIGlzICdib3RoJyxcclxuICAgICAqIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBnaXZlbiBjYWxlbmRhciBkYXRlJ3MgdGltZSBiZWZvcmUgc2VsZWN0aW5nIGl0LlxyXG4gICAgICogaWYgaXQgaXMgdmFsaWQsIHJldHVybiB0aGUgdXBkYXRlZCBkYXRlVGltZVxyXG4gICAgICogaWYgaXQgaXMgbm90IHZhbGlkLCByZXR1cm4gbnVsbFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUFuZENoZWNrQ2FsZW5kYXJEYXRlKGRhdGU6IFQpOiBUIHtcclxuICAgICAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgICAgICAvLyBpZiB0aGUgcGlja2VyIGlzICdib3RoJywgdXBkYXRlIHRoZSBjYWxlbmRhciBkYXRlJ3MgdGltZSB2YWx1ZVxyXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5waWNrZXJUeXBlID09PSAnYm90aCcpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFllYXIoZGF0ZSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNb250aChkYXRlKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldERhdGUoZGF0ZSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRIb3Vycyh0aGlzLnBpY2tlck1vbWVudCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNaW51dGVzKHRoaXMucGlja2VyTW9tZW50KSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFNlY29uZHModGhpcy5waWNrZXJNb21lbnQpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNsYW1wRGF0ZShcclxuICAgICAgICAgICAgICAgIHJlc3VsdCxcclxuICAgICAgICAgICAgICAgIHRoaXMucGlja2VyLm1pbkRhdGVUaW1lLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5waWNrZXIubWF4RGF0ZVRpbWVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jbG9uZShkYXRlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIHRoZSB1cGRhdGVkIGRhdGVUaW1lXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLmRhdGVUaW1lQ2hlY2tlcihyZXN1bHQpID8gcmVzdWx0IDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZvY3VzIHRvIHRoZSBwaWNrZXJcclxuICAgICAqICovXHJcbiAgICBwcml2YXRlIGZvY3VzUGlja2VyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5waWNrZXJNb2RlID09PSAnaW5saW5lJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jYWxlbmRhcikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmZvY3VzQWN0aXZlQ2VsbCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50aW1lcikge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVyLmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==