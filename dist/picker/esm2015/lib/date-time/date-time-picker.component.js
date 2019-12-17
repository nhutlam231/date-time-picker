/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { coerceArray, coerceBooleanProperty } from '@angular/cdk/coercion';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { OwlDateTime } from './date-time.class';
import { OwlDialogService } from '../dialog/dialog.service';
import { merge, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
/**
 * Injection token that determines the scroll handling while the dtPicker is open.
 * @type {?}
 */
export const OWL_DTPICKER_SCROLL_STRATEGY = new InjectionToken('owl-dtpicker-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    /** @type {?} */
    const fn = (/**
     * @return {?}
     */
    () => overlay.scrollStrategies.block());
    return fn;
}
/**
 * \@docs-private
 * @type {?}
 */
export const OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER = {
    provide: OWL_DTPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/**
 * @template T
 */
export class OwlDateTimeComponent extends OwlDateTime {
    /**
     * @param {?} overlay
     * @param {?} viewContainerRef
     * @param {?} dialogService
     * @param {?} ngZone
     * @param {?} changeDetector
     * @param {?} dateTimeAdapter
     * @param {?} defaultScrollStrategy
     * @param {?} dateTimeFormats
     * @param {?} document
     */
    constructor(overlay, viewContainerRef, dialogService, ngZone, changeDetector, dateTimeAdapter, defaultScrollStrategy, dateTimeFormats, document) {
        super(dateTimeAdapter, dateTimeFormats);
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.dialogService = dialogService;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        this.document = document;
        /**
         * Custom class for the picker backdrop.
         */
        this.backdropClass = [];
        /**
         * Custom class for the picker overlay pane.
         */
        this.panelClass = [];
        /**
         * Set the type of the dateTime picker
         *      'both' -- show both calendar and timer
         *      'calendar' -- show only calendar
         *      'timer' -- show only timer
         */
        this._pickerType = 'both';
        /**
         * Whether the picker open as a dialog
         */
        this._pickerMode = 'popup';
        /**
         * Whether the calendar is open.
         */
        this._opened = false;
        /**
         * Callback when the picker is closed
         *
         */
        this.afterPickerClosed = new EventEmitter();
        /**
         * Callback when the picker is open
         *
         */
        this.afterPickerOpen = new EventEmitter();
        /**
         * Emits selected year in multi-year view
         * This doesn't imply a change on the selected date.
         *
         */
        this.yearSelected = new EventEmitter();
        /**
         * Emits selected month in year view
         * This doesn't imply a change on the selected date.
         *
         */
        this.monthSelected = new EventEmitter();
        /**
         * Emit when the selected value has been confirmed
         *
         */
        this.confirmSelectedChange = new EventEmitter();
        /**
         * Emits when the date time picker is disabled.
         *
         */
        this.disabledChange = new EventEmitter();
        this.dtInputSub = Subscription.EMPTY;
        this.hidePickerStreamSub = Subscription.EMPTY;
        this.confirmSelectedStreamSub = Subscription.EMPTY;
        this.pickerOpenedStreamSub = Subscription.EMPTY;
        /**
         * The element that was focused before the date time picker was opened.
         */
        this.focusedElementBeforeOpen = null;
        this._selecteds = [];
        this.defaultScrollStrategy = defaultScrollStrategy;
    }
    /**
     * @return {?}
     */
    get startAt() {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        if (this._startAt) {
            return this._startAt;
        }
        if (this._dtInput) {
            if (this._dtInput.selectMode === 'single') {
                return this._dtInput.value || null;
            }
            else if (this._dtInput.selectMode === 'range' ||
                this._dtInput.selectMode === 'rangeFrom') {
                return this._dtInput.values[0] || null;
            }
            else if (this._dtInput.selectMode === 'rangeTo') {
                return this._dtInput.values[1] || null;
            }
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set startAt(date) {
        this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(date));
    }
    /**
     * @return {?}
     */
    get pickerType() {
        return this._pickerType;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set pickerType(val) {
        if (val !== this._pickerType) {
            this._pickerType = val;
            if (this._dtInput) {
                this._dtInput.formatNativeInputValue();
            }
        }
    }
    /**
     * @return {?}
     */
    get pickerMode() {
        return this._pickerMode;
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    set pickerMode(mode) {
        if (mode === 'popup') {
            this._pickerMode = mode;
        }
        else {
            this._pickerMode = 'dialog';
        }
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined && this._dtInput
            ? this._dtInput.disabled
            : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        value = coerceBooleanProperty(value);
        if (value !== this._disabled) {
            this._disabled = value;
            this.disabledChange.next(value);
        }
    }
    /**
     * @return {?}
     */
    get opened() {
        return this._opened;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set opened(val) {
        val ? this.open() : this.close();
    }
    /**
     * @return {?}
     */
    get dtInput() {
        return this._dtInput;
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
        this._selected = value;
        this.changeDetector.markForCheck();
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
        this._selecteds = values;
        this.changeDetector.markForCheck();
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get minDateTime() {
        return this._dtInput && this._dtInput.min;
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get maxDateTime() {
        return this._dtInput && this._dtInput.max;
    }
    /**
     * @return {?}
     */
    get dateTimeFilter() {
        return this._dtInput && this._dtInput.dateTimeFilter;
    }
    /**
     * @return {?}
     */
    get selectMode() {
        return this._dtInput.selectMode;
    }
    /**
     * @return {?}
     */
    get isInSingleMode() {
        return this._dtInput.isInSingleMode;
    }
    /**
     * @return {?}
     */
    get isInRangeMode() {
        return this._dtInput.isInRangeMode;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        this.dtInputSub.unsubscribe();
        this.disabledChange.complete();
        if (this.popupRef) {
            this.popupRef.dispose();
        }
    }
    /**
     * @param {?} input
     * @return {?}
     */
    registerInput(input) {
        if (this._dtInput) {
            throw Error('A Owl DateTimePicker can only be associated with a single input.');
        }
        this._dtInput = input;
        this.dtInputSub = this._dtInput.valueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            if (Array.isArray(value)) {
                this.selecteds = value;
            }
            else {
                this.selected = value;
            }
        }));
    }
    /**
     * @return {?}
     */
    open() {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this._dtInput) {
            throw Error('Attempted to open an DateTimePicker with no associated input.');
        }
        if (this.document) {
            this.focusedElementBeforeOpen = this.document.activeElement;
        }
        // reset the picker selected value
        if (this.isInSingleMode) {
            this.selected = this._dtInput.value;
        }
        else if (this.isInRangeMode) {
            this.selecteds = this._dtInput.values;
        }
        // when the picker is open , we make sure the picker's current selected time value
        // is the same as the _startAt time value.
        if (this.selected && this.pickerType !== 'calendar' && this._startAt) {
            this.selected = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.selected), this.dateTimeAdapter.getMonth(this.selected), this.dateTimeAdapter.getDate(this.selected), this.dateTimeAdapter.getHours(this._startAt), this.dateTimeAdapter.getMinutes(this._startAt), this.dateTimeAdapter.getSeconds(this._startAt));
        }
        this.pickerMode === 'dialog' ? this.openAsDialog() : this.openAsPopup();
        this.pickerContainer.picker = this;
        // Listen to picker container's hidePickerStream
        this.hidePickerStreamSub = this.pickerContainer.hidePickerStream.subscribe((/**
         * @return {?}
         */
        () => {
            this.close();
        }));
        // Listen to picker container's confirmSelectedStream
        this.confirmSelectedStreamSub = this.pickerContainer.confirmSelectedStream.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.confirmSelect(event);
        }));
    }
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    select(date) {
        if (Array.isArray(date)) {
            this.selecteds = [...date];
        }
        else {
            this.selected = date;
        }
        /**
         * Cases in which automatically confirm the select when date or dates are selected:
         * 1) picker mode is NOT 'dialog'
         * 2) picker type is 'calendar' and selectMode is 'single'.
         * 3) picker type is 'calendar' and selectMode is 'range' and
         *    the 'selecteds' has 'from'(selecteds[0]) and 'to'(selecteds[1]) values.
         * 4) selectMode is 'rangeFrom' and selecteds[0] has value.
         * 5) selectMode is 'rangeTo' and selecteds[1] has value.
         * */
        if (this.pickerMode !== 'dialog' &&
            this.pickerType === 'calendar' &&
            ((this.selectMode === 'single' && this.selected) ||
                (this.selectMode === 'rangeFrom' && this.selecteds[0]) ||
                (this.selectMode === 'rangeTo' && this.selecteds[1]) ||
                (this.selectMode === 'range' &&
                    this.selecteds[0] &&
                    this.selecteds[1]))) {
            this.confirmSelect();
        }
    }
    /**
     * Emits the selected year in multi-year view
     *
     * @param {?} normalizedYear
     * @return {?}
     */
    selectYear(normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    }
    /**
     * Emits selected month in year view
     *
     * @param {?} normalizedMonth
     * @return {?}
     */
    selectMonth(normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    }
    /**
     * Hide the picker
     * @return {?}
     */
    close() {
        if (!this._opened) {
            return;
        }
        if (this.popupRef && this.popupRef.hasAttached()) {
            this.popupRef.detach();
        }
        if (this.pickerContainerPortal &&
            this.pickerContainerPortal.isAttached) {
            this.pickerContainerPortal.detach();
        }
        if (this.hidePickerStreamSub) {
            this.hidePickerStreamSub.unsubscribe();
            this.hidePickerStreamSub = null;
        }
        if (this.confirmSelectedStreamSub) {
            this.confirmSelectedStreamSub.unsubscribe();
            this.confirmSelectedStreamSub = null;
        }
        if (this.pickerOpenedStreamSub) {
            this.pickerOpenedStreamSub.unsubscribe();
            this.pickerOpenedStreamSub = null;
        }
        if (this.dialogRef) {
            this.dialogRef.close();
            this.dialogRef = null;
        }
        /** @type {?} */
        const completeClose = (/**
         * @return {?}
         */
        () => {
            if (this._opened) {
                this._opened = false;
                this.afterPickerClosed.emit(null);
                this.focusedElementBeforeOpen = null;
            }
        });
        if (this.focusedElementBeforeOpen &&
            typeof this.focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this.focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    }
    /**
     * Confirm the selected value
     * @param {?=} event
     * @return {?}
     */
    confirmSelect(event) {
        if (this.isInSingleMode) {
            /** @type {?} */
            const selected = this.selected || this.startAt || this.dateTimeAdapter.now();
            this.confirmSelectedChange.emit(selected);
        }
        else if (this.isInRangeMode) {
            this.confirmSelectedChange.emit(this.selecteds);
        }
        this.close();
        return;
    }
    /**
     * Open the picker as a dialog
     * @private
     * @return {?}
     */
    openAsDialog() {
        this.dialogRef = this.dialogService.open(OwlDateTimeContainerComponent, {
            autoFocus: false,
            backdropClass: [
                'cdk-overlay-dark-backdrop',
                ...coerceArray(this.backdropClass)
            ],
            paneClass: ['owl-dt-dialog', ...coerceArray(this.panelClass)],
            viewContainerRef: this.viewContainerRef,
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy()
        });
        this.pickerContainer = this.dialogRef.componentInstance;
        this.dialogRef.afterOpen().subscribe((/**
         * @return {?}
         */
        () => {
            this.afterPickerOpen.emit(null);
            this._opened = true;
        }));
        this.dialogRef.afterClosed().subscribe((/**
         * @return {?}
         */
        () => this.close()));
    }
    /**
     * Open the picker as popup
     * @private
     * @return {?}
     */
    openAsPopup() {
        if (!this.pickerContainerPortal) {
            this.pickerContainerPortal = new ComponentPortal(OwlDateTimeContainerComponent, this.viewContainerRef);
        }
        if (!this.popupRef) {
            this.createPopup();
        }
        if (!this.popupRef.hasAttached()) {
            /** @type {?} */
            const componentRef = this.popupRef.attach(this.pickerContainerPortal);
            this.pickerContainer = componentRef.instance;
            // Update the position once the calendar has rendered.
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.popupRef.updatePosition();
            }));
            // emit open stream
            this.pickerOpenedStreamSub = this.pickerContainer.pickerOpenedStream
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.afterPickerOpen.emit(null);
                this._opened = true;
            }));
        }
    }
    /**
     * @private
     * @return {?}
     */
    createPopup() {
        /** @type {?} */
        const overlayConfig = new OverlayConfig({
            positionStrategy: this.createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: [
                'cdk-overlay-transparent-backdrop',
                ...coerceArray(this.backdropClass)
            ],
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
            panelClass: ['owl-dt-popup', ...coerceArray(this.panelClass)]
        });
        this.popupRef = this.overlay.create(overlayConfig);
        merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef
            .keydownEvents()
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.keyCode === ESCAPE ||
            (this._dtInput &&
                event.altKey &&
                event.keyCode === UP_ARROW))))).subscribe((/**
         * @return {?}
         */
        () => this.close()));
    }
    /**
     * Create the popup PositionStrategy.
     *
     * @private
     * @return {?}
     */
    createPopupPositionStrategy() {
        return this.overlay
            .position()
            .flexibleConnectedTo(this._dtInput.elementRef)
            .withTransformOriginOn('.owl-dt-container')
            .withFlexibleDimensions(false)
            .withPush(false)
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: -176
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
                offsetY: -352
            }
        ]);
    }
}
OwlDateTimeComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-date-time',
                exportAs: 'owlDateTime',
                template: "",
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                styles: [""]
            }] }
];
/** @nocollapse */
OwlDateTimeComponent.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef },
    { type: OwlDialogService },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Inject, args: [OWL_DTPICKER_SCROLL_STRATEGY,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
OwlDateTimeComponent.propDecorators = {
    backdropClass: [{ type: Input }],
    panelClass: [{ type: Input }],
    startAt: [{ type: Input }],
    pickerType: [{ type: Input }],
    pickerMode: [{ type: Input }],
    disabled: [{ type: Input }],
    opened: [{ type: Input }],
    scrollStrategy: [{ type: Input }],
    afterPickerClosed: [{ type: Output }],
    afterPickerOpen: [{ type: Output }],
    yearSelected: [{ type: Output }],
    monthSelected: [{ type: Output }]
};
if (false) {
    /**
     * Custom class for the picker backdrop.
     * @type {?}
     */
    OwlDateTimeComponent.prototype.backdropClass;
    /**
     * Custom class for the picker overlay pane.
     * @type {?}
     */
    OwlDateTimeComponent.prototype.panelClass;
    /**
     * The date to open the calendar to initially.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._startAt;
    /**
     * Set the type of the dateTime picker
     *      'both' -- show both calendar and timer
     *      'calendar' -- show only calendar
     *      'timer' -- show only timer
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._pickerType;
    /**
     * Whether the picker open as a dialog
     * @type {?}
     */
    OwlDateTimeComponent.prototype._pickerMode;
    /**
     * Whether the date time picker should be disabled.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._disabled;
    /**
     * Whether the calendar is open.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._opened;
    /**
     * The scroll strategy when the picker is open
     * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.scrollStrategy;
    /**
     * Callback when the picker is closed
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.afterPickerClosed;
    /**
     * Callback when the picker is open
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.afterPickerOpen;
    /**
     * Emits selected year in multi-year view
     * This doesn't imply a change on the selected date.
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.yearSelected;
    /**
     * Emits selected month in year view
     * This doesn't imply a change on the selected date.
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.monthSelected;
    /**
     * Emit when the selected value has been confirmed
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.confirmSelectedChange;
    /**
     * Emits when the date time picker is disabled.
     *
     * @type {?}
     */
    OwlDateTimeComponent.prototype.disabledChange;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.pickerContainerPortal;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.pickerContainer;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.popupRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.dialogRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.dtInputSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.hidePickerStreamSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.confirmSelectedStreamSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.pickerOpenedStreamSub;
    /**
     * The element that was focused before the date time picker was opened.
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.focusedElementBeforeOpen;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._dtInput;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.defaultScrollStrategy;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.overlay;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.dialogService;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.ngZone;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeComponent.prototype.dateTimeFormats;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeComponent.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUVULFlBQVksRUFDWixNQUFNLEVBQ04sY0FBYyxFQUNkLEtBQUssRUFDTCxNQUFNLEVBR04sUUFBUSxFQUNSLE1BQU0sRUFDTixnQkFBZ0IsRUFDbkIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBRUgsT0FBTyxFQUNQLGFBQWEsRUFJaEIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUV2RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILHFCQUFxQixFQUV4QixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFDSCxXQUFXLEVBSWQsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQUc5QyxNQUFNLE9BQU8sNEJBQTRCLEdBQUcsSUFBSSxjQUFjLENBRTVELDhCQUE4QixDQUFDOzs7Ozs7QUFHakMsTUFBTSxVQUFVLDZDQUE2QyxDQUN6RCxPQUFnQjs7VUFFVixFQUFFOzs7SUFBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDakQsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDOzs7OztBQUdELE1BQU0sT0FBTyxxQ0FBcUMsR0FBRztJQUNqRCxPQUFPLEVBQUUsNEJBQTRCO0lBQ3JDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUNmLFVBQVUsRUFBRSw2Q0FBNkM7Q0FDNUQ7Ozs7QUFVRCxNQUFNLE9BQU8sb0JBQXdCLFNBQVEsV0FBYzs7Ozs7Ozs7Ozs7O0lBME52RCxZQUNZLE9BQWdCLEVBQ2hCLGdCQUFrQyxFQUNsQyxhQUErQixFQUMvQixNQUFjLEVBQ1osY0FBaUMsRUFDckIsZUFBbUMsRUFDbkIscUJBQTBCLEVBR3RELGVBQW1DLEVBR3JDLFFBQWE7UUFFckIsS0FBSyxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQWRoQyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBQy9CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDWixtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBSS9DLG9CQUFlLEdBQWYsZUFBZSxDQUFvQjtRQUdyQyxhQUFRLEdBQVIsUUFBUSxDQUFLOzs7O1FBbk9sQixrQkFBYSxHQUFzQixFQUFFLENBQUM7Ozs7UUFJdEMsZUFBVSxHQUFzQixFQUFFLENBQUM7Ozs7Ozs7UUF3Q2xDLGdCQUFXLEdBQWUsTUFBTSxDQUFDOzs7O1FBa0J6QyxnQkFBVyxHQUFlLE9BQU8sQ0FBQzs7OztRQWdDMUIsWUFBTyxHQUFZLEtBQUssQ0FBQzs7Ozs7UUFxQmpDLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7Ozs7O1FBTTVDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQzs7Ozs7O1FBTzFDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQzs7Ozs7O1FBT3JDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQzs7Ozs7UUFLL0IsMEJBQXFCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQzs7Ozs7UUFLcEQsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBUTVDLGVBQVUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2hDLHdCQUFtQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDekMsNkJBQXdCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUM5QywwQkFBcUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDOzs7O1FBRzNDLDZCQUF3QixHQUF1QixJQUFJLENBQUM7UUFpQnBELGVBQVUsR0FBUSxFQUFFLENBQUM7UUFzRHpCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztJQUN2RCxDQUFDOzs7O0lBL05ELElBQ0ksT0FBTztRQUNQLDZGQUE2RjtRQUM3RixxQkFBcUI7UUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQUU7Z0JBQ3ZDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO2FBQ3RDO2lCQUFNLElBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEtBQUssT0FBTztnQkFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEtBQUssV0FBVyxFQUMxQztnQkFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQzthQUMxQztpQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtnQkFDL0MsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7YUFDMUM7U0FDSjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7Ozs7O0lBRUQsSUFBSSxPQUFPLENBQUMsSUFBYztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUN6QyxDQUFDO0lBQ04sQ0FBQzs7OztJQVNELElBQ0ksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELElBQUksVUFBVSxDQUFDLEdBQWU7UUFDMUIsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2FBQzFDO1NBQ0o7SUFDTCxDQUFDOzs7O0lBTUQsSUFDSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRUQsSUFBSSxVQUFVLENBQUMsSUFBZ0I7UUFDM0IsSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzNCO2FBQU07WUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztTQUMvQjtJQUNMLENBQUM7Ozs7SUFJRCxJQUNJLFFBQVE7UUFDUixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRO1lBQ2hELENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7WUFDeEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN2QixLQUFLLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztJQUNMLENBQUM7Ozs7SUFJRCxJQUNJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFFRCxJQUFJLE1BQU0sQ0FBQyxHQUFZO1FBQ25CLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckMsQ0FBQzs7OztJQTRERCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQzs7OztJQUdELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELElBQUksUUFBUSxDQUFDLEtBQWU7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7O0lBR0QsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsSUFBSSxTQUFTLENBQUMsTUFBVztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7O0lBR0QsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQzlDLENBQUM7Ozs7O0lBR0QsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQzlDLENBQUM7Ozs7SUFFRCxJQUFJLGNBQWM7UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDekQsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELElBQUksY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUM7SUFDeEMsQ0FBQzs7OztJQUVELElBQUksYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQzs7OztJQXVCTSxRQUFRLEtBQUksQ0FBQzs7OztJQUViLFdBQVc7UUFDZCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFL0IsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7Ozs7O0lBRU0sYUFBYSxDQUFDLEtBQW1DO1FBQ3BELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE1BQU0sS0FBSyxDQUNQLGtFQUFrRSxDQUNyRSxDQUFDO1NBQ0w7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVM7Ozs7UUFDakQsQ0FBQyxLQUFxQixFQUFFLEVBQUU7WUFDdEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzthQUMxQjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUN6QjtRQUNMLENBQUMsRUFDSixDQUFDO0lBQ04sQ0FBQzs7OztJQUVNLElBQUk7UUFDUCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMvQixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixNQUFNLEtBQUssQ0FDUCwrREFBK0QsQ0FDbEUsQ0FBQztTQUNMO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1NBQy9EO1FBRUQsa0NBQWtDO1FBQ2xDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7U0FDekM7UUFFRCxrRkFBa0Y7UUFDbEYsMENBQTBDO1FBQzFDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUM5QyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ2pELENBQUM7U0FDTDtRQUVELElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV4RSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkMsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFNBQVM7OztRQUN0RSxHQUFHLEVBQUU7WUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQyxFQUNKLENBQUM7UUFFRixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsU0FBUzs7OztRQUNoRixDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDLEVBQ0osQ0FBQztJQUNOLENBQUM7Ozs7OztJQUtNLE1BQU0sQ0FBQyxJQUFhO1FBQ3ZCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFFRDs7Ozs7Ozs7YUFRSztRQUNMLElBQ0ksSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRO1lBQzVCLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVTtZQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDNUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxPQUFPO29CQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzdCO1lBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO0lBQ0wsQ0FBQzs7Ozs7OztJQUtNLFVBQVUsQ0FBQyxjQUFpQjtRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7Ozs7O0lBS00sV0FBVyxDQUFDLGVBQWtCO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7O0lBS00sS0FBSztRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMxQjtRQUVELElBQ0ksSUFBSSxDQUFDLHFCQUFxQjtZQUMxQixJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUN2QztZQUNFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN2QztRQUVELElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzFCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1NBQ25DO1FBRUQsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7U0FDeEM7UUFFRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM1QixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztTQUNyQztRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3pCOztjQUVLLGFBQWE7OztRQUFHLEdBQUcsRUFBRTtZQUN2QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7YUFDeEM7UUFDTCxDQUFDLENBQUE7UUFFRCxJQUNJLElBQUksQ0FBQyx3QkFBd0I7WUFDN0IsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxLQUFLLFVBQVUsRUFDM0Q7WUFDRSwwRkFBMEY7WUFDMUYsMkZBQTJGO1lBQzNGLHlGQUF5RjtZQUN6Rix1RkFBdUY7WUFDdkYsMkNBQTJDO1lBQzNDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDN0I7YUFBTTtZQUNILGFBQWEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQzs7Ozs7O0lBS00sYUFBYSxDQUFDLEtBQVc7UUFDNUIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFOztrQkFDZixRQUFRLEdBQ1YsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFO1lBQy9ELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0M7YUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDM0IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixPQUFPO0lBQ1gsQ0FBQzs7Ozs7O0lBS08sWUFBWTtRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNwQyw2QkFBNkIsRUFDN0I7WUFDSSxTQUFTLEVBQUUsS0FBSztZQUNoQixhQUFhLEVBQUU7Z0JBQ1gsMkJBQTJCO2dCQUMzQixHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO2FBQ3JDO1lBQ0QsU0FBUyxFQUFFLENBQUMsZUFBZSxFQUFFLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3RCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3ZDLGNBQWMsRUFDVixJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtTQUMxRCxDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUM7UUFFeEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDO0lBQy9ELENBQUM7Ozs7OztJQUtPLFdBQVc7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzdCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLGVBQWUsQ0FFOUMsNkJBQTZCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDM0Q7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRTs7a0JBQ3hCLFlBQVksR0FFZCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7WUFDcEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBRTdDLHNEQUFzRDtZQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7aUJBQ2YsWUFBWSxFQUFFO2lCQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2IsU0FBUzs7O1lBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkMsQ0FBQyxFQUFDLENBQUM7WUFFUCxtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCO2lCQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiLFNBQVM7OztZQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDeEIsQ0FBQyxFQUFDLENBQUM7U0FDVjtJQUNMLENBQUM7Ozs7O0lBRU8sV0FBVzs7Y0FDVCxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUM7WUFDcEMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLDJCQUEyQixFQUFFO1lBQ3BELFdBQVcsRUFBRSxJQUFJO1lBQ2pCLGFBQWEsRUFBRTtnQkFDWCxrQ0FBa0M7Z0JBQ2xDLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7YUFDckM7WUFDRCxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDbkUsVUFBVSxFQUFFLENBQUMsY0FBYyxFQUFFLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNoRSxDQUFDO1FBRUYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVuRCxLQUFLLENBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVE7YUFDUixhQUFhLEVBQUU7YUFDZixJQUFJLENBQ0QsTUFBTTs7OztRQUNGLEtBQUssQ0FBQyxFQUFFLENBQ0osS0FBSyxDQUFDLE9BQU8sS0FBSyxNQUFNO1lBQ3hCLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQ1YsS0FBSyxDQUFDLE1BQU07Z0JBQ1osS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsRUFDdEMsQ0FDSixDQUNSLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7OztJQUtPLDJCQUEyQjtRQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPO2FBQ2QsUUFBUSxFQUFFO2FBQ1YsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7YUFDN0MscUJBQXFCLENBQUMsbUJBQW1CLENBQUM7YUFDMUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDO2FBQzdCLFFBQVEsQ0FBQyxLQUFLLENBQUM7YUFDZixhQUFhLENBQUM7WUFDWDtnQkFDSSxPQUFPLEVBQUUsT0FBTztnQkFDaEIsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsS0FBSzthQUNsQjtZQUNEO2dCQUNJLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsT0FBTztnQkFDakIsUUFBUSxFQUFFLFFBQVE7YUFDckI7WUFDRDtnQkFDSSxPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUUsUUFBUTtnQkFDakIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsUUFBUSxFQUFFLEtBQUs7YUFDbEI7WUFDRDtnQkFDSSxPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsUUFBUTthQUNyQjtZQUNEO2dCQUNJLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsT0FBTztnQkFDakIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsT0FBTyxFQUFFLENBQUMsR0FBRzthQUNoQjtZQUNEO2dCQUNJLE9BQU8sRUFBRSxPQUFPO2dCQUNoQixPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsT0FBTztnQkFDakIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsT0FBTyxFQUFFLENBQUMsR0FBRzthQUNoQjtTQUNKLENBQUMsQ0FBQztJQUNYLENBQUM7OztZQTFsQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsWUFBZ0Q7Z0JBRWhELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxtQkFBbUIsRUFBRSxLQUFLOzthQUM3Qjs7OztZQXJERyxPQUFPO1lBTlAsZ0JBQWdCO1lBNEJYLGdCQUFnQjtZQWpDckIsTUFBTTtZQVBOLGlCQUFpQjtZQTRCWixlQUFlLHVCQTRRZixRQUFROzRDQUNSLE1BQU0sU0FBQyw0QkFBNEI7NENBQ25DLFFBQVEsWUFDUixNQUFNLFNBQUMscUJBQXFCOzRDQUU1QixRQUFRLFlBQ1IsTUFBTSxTQUFDLFFBQVE7Ozs0QkFuT25CLEtBQUs7eUJBSUwsS0FBSztzQkFLTCxLQUFLO3lCQXFDTCxLQUFLO3lCQWtCTCxLQUFLO3VCQWVMLEtBQUs7cUJBaUJMLEtBQUs7NkJBYUwsS0FBSztnQ0FNTCxNQUFNOzhCQU1OLE1BQU07MkJBT04sTUFBTTs0QkFPTixNQUFNOzs7Ozs7O0lBdklQLDZDQUM2Qzs7Ozs7SUFHN0MsMENBQzBDOzs7Ozs7SUFHMUMsd0NBQTJCOzs7Ozs7Ozs7SUFxQzNCLDJDQUF5Qzs7Ozs7SUFrQnpDLDJDQUFrQzs7Ozs7O0lBZWxDLHlDQUEyQjs7Ozs7O0lBaUIzQix1Q0FBaUM7Ozs7Ozs7SUFjakMsOENBQ3NDOzs7Ozs7SUFLdEMsaURBQzRDOzs7Ozs7SUFLNUMsK0NBQzBDOzs7Ozs7O0lBTTFDLDRDQUNxQzs7Ozs7OztJQU1yQyw2Q0FDc0M7Ozs7OztJQUt0QyxxREFBMkQ7Ozs7OztJQUszRCw4Q0FBb0Q7Ozs7O0lBRXBELHFEQUVFOzs7OztJQUNGLCtDQUEwRDs7Ozs7SUFDMUQsd0NBQTZCOzs7OztJQUM3Qix5Q0FBa0U7Ozs7O0lBQ2xFLDBDQUF3Qzs7Ozs7SUFDeEMsbURBQWlEOzs7OztJQUNqRCx3REFBc0Q7Ozs7O0lBQ3RELHFEQUFtRDs7Ozs7O0lBR25ELHdEQUE0RDs7Ozs7SUFFNUQsd0NBQStDOzs7OztJQUsvQyx5Q0FBNEI7Ozs7O0lBVTVCLDBDQUE2Qjs7Ozs7SUFvQzdCLHFEQUFvRDs7Ozs7SUFHaEQsdUNBQXdCOzs7OztJQUN4QixnREFBMEM7Ozs7O0lBQzFDLDZDQUF1Qzs7Ozs7SUFDdkMsc0NBQXNCOzs7OztJQUN0Qiw4Q0FBMkM7Ozs7O0lBQzNDLCtDQUF5RDs7Ozs7SUFFekQsK0NBRTZDOzs7OztJQUM3Qyx3Q0FFcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbXBvbmVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIEluamVjdCxcclxuICAgIEluamVjdGlvblRva2VuLFxyXG4gICAgSW5wdXQsXHJcbiAgICBOZ1pvbmUsXHJcbiAgICBPbkRlc3Ryb3ksXHJcbiAgICBPbkluaXQsXHJcbiAgICBPcHRpb25hbCxcclxuICAgIE91dHB1dCxcclxuICAgIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcclxuaW1wb3J0IHtcclxuICAgIEJsb2NrU2Nyb2xsU3RyYXRlZ3ksXHJcbiAgICBPdmVybGF5LFxyXG4gICAgT3ZlcmxheUNvbmZpZyxcclxuICAgIE92ZXJsYXlSZWYsXHJcbiAgICBQb3NpdGlvblN0cmF0ZWd5LFxyXG4gICAgU2Nyb2xsU3RyYXRlZ3lcclxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IEVTQ0FQRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xyXG5pbXBvcnQgeyBjb2VyY2VBcnJheSwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHsgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItY29udGFpbmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmUgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW5wdXQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcclxuaW1wb3J0IHtcclxuICAgIE9XTF9EQVRFX1RJTUVfRk9STUFUUyxcclxuICAgIE93bERhdGVUaW1lRm9ybWF0c1xyXG59IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtZm9ybWF0LmNsYXNzJztcclxuaW1wb3J0IHtcclxuICAgIE93bERhdGVUaW1lLFxyXG4gICAgUGlja2VyTW9kZSxcclxuICAgIFBpY2tlclR5cGUsXHJcbiAgICBTZWxlY3RNb2RlXHJcbn0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xyXG5pbXBvcnQgeyBPd2xEaWFsb2dSZWYgfSBmcm9tICcuLi9kaWFsb2cvZGlhbG9nLXJlZi5jbGFzcyc7XHJcbmltcG9ydCB7IE93bERpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9kaWFsb2cvZGlhbG9nLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbi8qKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGR0UGlja2VyIGlzIG9wZW4uICovXHJcbmV4cG9ydCBjb25zdCBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZID0gbmV3IEluamVjdGlvblRva2VuPFxyXG4gICAgKCkgPT4gU2Nyb2xsU3RyYXRlZ3lcclxuPignb3dsLWR0cGlja2VyLXNjcm9sbC1zdHJhdGVneScpO1xyXG5cclxuLyoqIEBkb2NzLXByaXZhdGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWShcclxuICAgIG92ZXJsYXk6IE92ZXJsYXlcclxuKTogKCkgPT4gQmxvY2tTY3JvbGxTdHJhdGVneSB7XHJcbiAgICBjb25zdCBmbiA9ICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpO1xyXG4gICAgcmV0dXJuIGZuO1xyXG59XHJcblxyXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xyXG5leHBvcnQgY29uc3QgT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUiA9IHtcclxuICAgIHByb3ZpZGU6IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1ksXHJcbiAgICBkZXBzOiBbT3ZlcmxheV0sXHJcbiAgICB1c2VGYWN0b3J5OiBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSX0ZBQ1RPUllcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lJyxcclxuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWUnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVDb21wb25lbnQ8VD4gZXh0ZW5kcyBPd2xEYXRlVGltZTxUPlxyXG4gICAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICAvKiogQ3VzdG9tIGNsYXNzIGZvciB0aGUgcGlja2VyIGJhY2tkcm9wLiAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBiYWNrZHJvcENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIC8qKiBDdXN0b20gY2xhc3MgZm9yIHRoZSBwaWNrZXIgb3ZlcmxheSBwYW5lLiAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBwYW5lbENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIC8qKiBUaGUgZGF0ZSB0byBvcGVuIHRoZSBjYWxlbmRhciB0byBpbml0aWFsbHkuICovXHJcbiAgICBwcml2YXRlIF9zdGFydEF0OiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgc3RhcnRBdCgpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgLy8gSWYgYW4gZXhwbGljaXQgc3RhcnRBdCBpcyBzZXQgd2Ugc3RhcnQgdGhlcmUsIG90aGVyd2lzZSB3ZSBzdGFydCBhdCB3aGF0ZXZlciB0aGUgY3VycmVudGx5XHJcbiAgICAgICAgLy8gc2VsZWN0ZWQgdmFsdWUgaXMuXHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXJ0QXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0QXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fZHRJbnB1dCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlID09PSAnc2luZ2xlJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQudmFsdWUgfHwgbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgICAgIHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZHRJbnB1dC5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJ1xyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LnZhbHVlc1swXSB8fCBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC52YWx1ZXNbMV0gfHwgbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXQgc3RhcnRBdChkYXRlOiBUIHwgbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX3N0YXJ0QXQgPSB0aGlzLmdldFZhbGlkRGF0ZShcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoZGF0ZSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSB0eXBlIG9mIHRoZSBkYXRlVGltZSBwaWNrZXJcclxuICAgICAqICAgICAgJ2JvdGgnIC0tIHNob3cgYm90aCBjYWxlbmRhciBhbmQgdGltZXJcclxuICAgICAqICAgICAgJ2NhbGVuZGFyJyAtLSBzaG93IG9ubHkgY2FsZW5kYXJcclxuICAgICAqICAgICAgJ3RpbWVyJyAtLSBzaG93IG9ubHkgdGltZXJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcGlja2VyVHlwZTogUGlja2VyVHlwZSA9ICdib3RoJztcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgcGlja2VyVHlwZSgpOiBQaWNrZXJUeXBlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyVHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGlja2VyVHlwZSh2YWw6IFBpY2tlclR5cGUpIHtcclxuICAgICAgICBpZiAodmFsICE9PSB0aGlzLl9waWNrZXJUeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlclR5cGUgPSB2YWw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kdElucHV0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kdElucHV0LmZvcm1hdE5hdGl2ZUlucHV0VmFsdWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZXRoZXIgdGhlIHBpY2tlciBvcGVuIGFzIGEgZGlhbG9nXHJcbiAgICAgKi9cclxuICAgIF9waWNrZXJNb2RlOiBQaWNrZXJNb2RlID0gJ3BvcHVwJztcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgcGlja2VyTW9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGlja2VyTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgcGlja2VyTW9kZShtb2RlOiBQaWNrZXJNb2RlKSB7XHJcbiAgICAgICAgaWYgKG1vZGUgPT09ICdwb3B1cCcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGlja2VyTW9kZSA9IG1vZGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fcGlja2VyTW9kZSA9ICdkaWFsb2cnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogV2hldGhlciB0aGUgZGF0ZSB0aW1lIHBpY2tlciBzaG91bGQgYmUgZGlzYWJsZWQuICovXHJcbiAgICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5fZHRJbnB1dFxyXG4gICAgICAgICAgICA/IHRoaXMuX2R0SW5wdXQuZGlzYWJsZWRcclxuICAgICAgICAgICAgOiAhIXRoaXMuX2Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX2Rpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UubmV4dCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBpcyBvcGVuLiAqL1xyXG4gICAgcHJpdmF0ZSBfb3BlbmVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IG9wZW5lZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBvcGVuZWQodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdmFsID8gdGhpcy5vcGVuKCkgOiB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2Nyb2xsIHN0cmF0ZWd5IHdoZW4gdGhlIHBpY2tlciBpcyBvcGVuXHJcbiAgICAgKiBMZWFybiBtb3JlIHRoaXMgZnJvbSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vY2RrL292ZXJsYXkvb3ZlcnZpZXcjc2Nyb2xsLXN0cmF0ZWdpZXNcclxuICAgICAqICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHVibGljIHNjcm9sbFN0cmF0ZWd5OiBTY3JvbGxTdHJhdGVneTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHdoZW4gdGhlIHBpY2tlciBpcyBjbG9zZWRcclxuICAgICAqICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIGFmdGVyUGlja2VyQ2xvc2VkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayB3aGVuIHRoZSBwaWNrZXIgaXMgb3BlblxyXG4gICAgICogKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgYWZ0ZXJQaWNrZXJPcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbWl0cyBzZWxlY3RlZCB5ZWFyIGluIG11bHRpLXllYXIgdmlld1xyXG4gICAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxyXG4gICAgICogKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgeWVhclNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1pdHMgc2VsZWN0ZWQgbW9udGggaW4geWVhciB2aWV3XHJcbiAgICAgKiBUaGlzIGRvZXNuJ3QgaW1wbHkgYSBjaGFuZ2Ugb24gdGhlIHNlbGVjdGVkIGRhdGUuXHJcbiAgICAgKiAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBtb250aFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1pdCB3aGVuIHRoZSBzZWxlY3RlZCB2YWx1ZSBoYXMgYmVlbiBjb25maXJtZWRcclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgY29uZmlybVNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxUW10gfCBUPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1pdHMgd2hlbiB0aGUgZGF0ZSB0aW1lIHBpY2tlciBpcyBkaXNhYmxlZC5cclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgZGlzYWJsZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBwaWNrZXJDb250YWluZXJQb3J0YWw6IENvbXBvbmVudFBvcnRhbDxcclxuICAgICAgICBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPlxyXG4gICAgPjtcclxuICAgIHByaXZhdGUgcGlja2VyQ29udGFpbmVyOiBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPjtcclxuICAgIHByaXZhdGUgcG9wdXBSZWY6IE92ZXJsYXlSZWY7XHJcbiAgICBwcml2YXRlIGRpYWxvZ1JlZjogT3dsRGlhbG9nUmVmPE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+PjtcclxuICAgIHByaXZhdGUgZHRJbnB1dFN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuICAgIHByaXZhdGUgaGlkZVBpY2tlclN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuICAgIHByaXZhdGUgY29uZmlybVNlbGVjdGVkU3RyZWFtU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xyXG4gICAgcHJpdmF0ZSBwaWNrZXJPcGVuZWRTdHJlYW1TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gICAgLyoqIFRoZSBlbGVtZW50IHRoYXQgd2FzIGZvY3VzZWQgYmVmb3JlIHRoZSBkYXRlIHRpbWUgcGlja2VyIHdhcyBvcGVuZWQuICovXHJcbiAgICBwcml2YXRlIGZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbjogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9kdElucHV0OiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlPFQ+O1xyXG4gICAgZ2V0IGR0SW5wdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IFQgfCBudWxsO1xyXG4gICAgZ2V0IHNlbGVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2VsZWN0ZWQodmFsdWU6IFQgfCBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NlbGVjdGVkczogVFtdID0gW107XHJcbiAgICBnZXQgc2VsZWN0ZWRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZHM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNlbGVjdGVkcyh2YWx1ZXM6IFRbXSkge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkcyA9IHZhbHVlcztcclxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgICBnZXQgbWluRGF0ZVRpbWUoKTogVCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0ICYmIHRoaXMuX2R0SW5wdXQubWluO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgICBnZXQgbWF4RGF0ZVRpbWUoKTogVCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0ICYmIHRoaXMuX2R0SW5wdXQubWF4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkYXRlVGltZUZpbHRlcigpOiAoZGF0ZTogVCB8IG51bGwpID0+IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0ICYmIHRoaXMuX2R0SW5wdXQuZGF0ZVRpbWVGaWx0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNlbGVjdE1vZGUoKTogU2VsZWN0TW9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQuaXNJblNpbmdsZU1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQuaXNJblJhbmdlTW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlZmF1bHRTY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxyXG4gICAgICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICBwcml2YXRlIGRpYWxvZ1NlcnZpY2U6IE93bERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcclxuICAgICAgICBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcclxuICAgICAgICBASW5qZWN0KE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1kpIGRlZmF1bHRTY3JvbGxTdHJhdGVneTogYW55LFxyXG4gICAgICAgIEBPcHRpb25hbCgpXHJcbiAgICAgICAgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpXHJcbiAgICAgICAgcHJvdGVjdGVkIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzLFxyXG4gICAgICAgIEBPcHRpb25hbCgpXHJcbiAgICAgICAgQEluamVjdChET0NVTUVOVClcclxuICAgICAgICBwcml2YXRlIGRvY3VtZW50OiBhbnlcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKGRhdGVUaW1lQWRhcHRlciwgZGF0ZVRpbWVGb3JtYXRzKTtcclxuICAgICAgICB0aGlzLmRlZmF1bHRTY3JvbGxTdHJhdGVneSA9IGRlZmF1bHRTY3JvbGxTdHJhdGVneTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7fVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgdGhpcy5kdElucHV0U3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5jb21wbGV0ZSgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wb3B1cFJlZikge1xyXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVySW5wdXQoaW5wdXQ6IE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmU8VD4pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fZHRJbnB1dCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcclxuICAgICAgICAgICAgICAgICdBIE93bCBEYXRlVGltZVBpY2tlciBjYW4gb25seSBiZSBhc3NvY2lhdGVkIHdpdGggYSBzaW5nbGUgaW5wdXQuJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fZHRJbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIHRoaXMuZHRJbnB1dFN1YiA9IHRoaXMuX2R0SW5wdXQudmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAodmFsdWU6IFRbXSB8IFQgfCBudWxsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9vcGVuZWQgfHwgdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2R0SW5wdXQpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAnQXR0ZW1wdGVkIHRvIG9wZW4gYW4gRGF0ZVRpbWVQaWNrZXIgd2l0aCBubyBhc3NvY2lhdGVkIGlucHV0LidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuID0gdGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcmVzZXQgdGhlIHBpY2tlciBzZWxlY3RlZCB2YWx1ZVxyXG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLl9kdElucHV0LnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzID0gdGhpcy5fZHRJbnB1dC52YWx1ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB3aGVuIHRoZSBwaWNrZXIgaXMgb3BlbiAsIHdlIG1ha2Ugc3VyZSB0aGUgcGlja2VyJ3MgY3VycmVudCBzZWxlY3RlZCB0aW1lIHZhbHVlXHJcbiAgICAgICAgLy8gaXMgdGhlIHNhbWUgYXMgdGhlIF9zdGFydEF0IHRpbWUgdmFsdWUuXHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5waWNrZXJUeXBlICE9PSAnY2FsZW5kYXInICYmIHRoaXMuX3N0YXJ0QXQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRZZWFyKHRoaXMuc2VsZWN0ZWQpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5zZWxlY3RlZCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXREYXRlKHRoaXMuc2VsZWN0ZWQpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5fc3RhcnRBdCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5nZXRNaW51dGVzKHRoaXMuX3N0YXJ0QXQpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0U2Vjb25kcyh0aGlzLl9zdGFydEF0KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5waWNrZXJNb2RlID09PSAnZGlhbG9nJyA/IHRoaXMub3BlbkFzRGlhbG9nKCkgOiB0aGlzLm9wZW5Bc1BvcHVwKCk7XHJcblxyXG4gICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyLnBpY2tlciA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vIExpc3RlbiB0byBwaWNrZXIgY29udGFpbmVyJ3MgaGlkZVBpY2tlclN0cmVhbVxyXG4gICAgICAgIHRoaXMuaGlkZVBpY2tlclN0cmVhbVN1YiA9IHRoaXMucGlja2VyQ29udGFpbmVyLmhpZGVQaWNrZXJTdHJlYW0uc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBMaXN0ZW4gdG8gcGlja2VyIGNvbnRhaW5lcidzIGNvbmZpcm1TZWxlY3RlZFN0cmVhbVxyXG4gICAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkU3RyZWFtU3ViID0gdGhpcy5waWNrZXJDb250YWluZXIuY29uZmlybVNlbGVjdGVkU3RyZWFtLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdChldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0cyB0aGUgZ2l2ZW4gZGF0ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2VsZWN0KGRhdGU6IFRbXSB8IFQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkcyA9IFsuLi5kYXRlXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhc2VzIGluIHdoaWNoIGF1dG9tYXRpY2FsbHkgY29uZmlybSB0aGUgc2VsZWN0IHdoZW4gZGF0ZSBvciBkYXRlcyBhcmUgc2VsZWN0ZWQ6XHJcbiAgICAgICAgICogMSkgcGlja2VyIG1vZGUgaXMgTk9UICdkaWFsb2cnXHJcbiAgICAgICAgICogMikgcGlja2VyIHR5cGUgaXMgJ2NhbGVuZGFyJyBhbmQgc2VsZWN0TW9kZSBpcyAnc2luZ2xlJy5cclxuICAgICAgICAgKiAzKSBwaWNrZXIgdHlwZSBpcyAnY2FsZW5kYXInIGFuZCBzZWxlY3RNb2RlIGlzICdyYW5nZScgYW5kXHJcbiAgICAgICAgICogICAgdGhlICdzZWxlY3RlZHMnIGhhcyAnZnJvbScoc2VsZWN0ZWRzWzBdKSBhbmQgJ3RvJyhzZWxlY3RlZHNbMV0pIHZhbHVlcy5cclxuICAgICAgICAgKiA0KSBzZWxlY3RNb2RlIGlzICdyYW5nZUZyb20nIGFuZCBzZWxlY3RlZHNbMF0gaGFzIHZhbHVlLlxyXG4gICAgICAgICAqIDUpIHNlbGVjdE1vZGUgaXMgJ3JhbmdlVG8nIGFuZCBzZWxlY3RlZHNbMV0gaGFzIHZhbHVlLlxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLnBpY2tlck1vZGUgIT09ICdkaWFsb2cnICYmXHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyVHlwZSA9PT0gJ2NhbGVuZGFyJyAmJlxyXG4gICAgICAgICAgICAoKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZScgJiYgdGhpcy5zZWxlY3RlZCkgfHxcclxuICAgICAgICAgICAgICAgICh0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nICYmIHRoaXMuc2VsZWN0ZWRzWzBdKSB8fFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nICYmIHRoaXMuc2VsZWN0ZWRzWzFdKSB8fFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzWzBdICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHNbMV0pKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbWl0cyB0aGUgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aS15ZWFyIHZpZXdcclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgc2VsZWN0WWVhcihub3JtYWxpemVkWWVhcjogVCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMueWVhclNlbGVjdGVkLmVtaXQobm9ybWFsaXplZFllYXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1pdHMgc2VsZWN0ZWQgbW9udGggaW4geWVhciB2aWV3XHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIHNlbGVjdE1vbnRoKG5vcm1hbGl6ZWRNb250aDogVCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW9udGhTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRNb250aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlIHRoZSBwaWNrZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fb3BlbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBvcHVwUmVmICYmIHRoaXMucG9wdXBSZWYuaGFzQXR0YWNoZWQoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmRldGFjaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbCAmJlxyXG4gICAgICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbC5pc0F0dGFjaGVkXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsLmRldGFjaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaGlkZVBpY2tlclN0cmVhbVN1Yikge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVQaWNrZXJTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgdGhpcy5oaWRlUGlja2VyU3RyZWFtU3ViID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1Yikge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1YiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5waWNrZXJPcGVuZWRTdHJlYW1TdWIpIHtcclxuICAgICAgICAgICAgdGhpcy5waWNrZXJPcGVuZWRTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgdGhpcy5waWNrZXJPcGVuZWRTdHJlYW1TdWIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlhbG9nUmVmKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nUmVmID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlQ2xvc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9vcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29wZW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZnRlclBpY2tlckNsb3NlZC5lbWl0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4uZm9jdXMgPT09ICdmdW5jdGlvbidcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgLy8gQmVjYXVzZSBJRSBtb3ZlcyBmb2N1cyBhc3luY2hyb25vdXNseSwgd2UgY2FuJ3QgY291bnQgb24gaXQgYmVpbmcgcmVzdG9yZWQgYmVmb3JlIHdlJ3ZlXHJcbiAgICAgICAgICAgIC8vIG1hcmtlZCB0aGUgZGF0ZXBpY2tlciBhcyBjbG9zZWQuIElmIHRoZSBldmVudCBmaXJlcyBvdXQgb2Ygc2VxdWVuY2UgYW5kIHRoZSBlbGVtZW50IHRoYXRcclxuICAgICAgICAgICAgLy8gd2UncmUgcmVmb2N1c2luZyBvcGVucyB0aGUgZGF0ZXBpY2tlciBvbiBmb2N1cywgdGhlIHVzZXIgY291bGQgYmUgc3R1Y2sgd2l0aCBub3QgYmVpbmdcclxuICAgICAgICAgICAgLy8gYWJsZSB0byBjbG9zZSB0aGUgY2FsZW5kYXIgYXQgYWxsLiBXZSB3b3JrIGFyb3VuZCBpdCBieSBtYWtpbmcgdGhlIGxvZ2ljLCB0aGF0IG1hcmtzXHJcbiAgICAgICAgICAgIC8vIHRoZSBkYXRlcGlja2VyIGFzIGNsb3NlZCwgYXN5bmMgYXMgd2VsbC5cclxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4uZm9jdXMoKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChjb21wbGV0ZUNsb3NlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb21wbGV0ZUNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlybSB0aGUgc2VsZWN0ZWQgdmFsdWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbmZpcm1TZWxlY3QoZXZlbnQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkIHx8IHRoaXMuc3RhcnRBdCB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcclxuICAgICAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRDaGFuZ2UuZW1pdChzZWxlY3RlZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbiB0aGUgcGlja2VyIGFzIGEgZGlhbG9nXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb3BlbkFzRGlhbG9nKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlhbG9nUmVmID0gdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW4oXHJcbiAgICAgICAgICAgIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYmFja2Ryb3BDbGFzczogW1xyXG4gICAgICAgICAgICAgICAgICAgICdjZGstb3ZlcmxheS1kYXJrLWJhY2tkcm9wJyxcclxuICAgICAgICAgICAgICAgICAgICAuLi5jb2VyY2VBcnJheSh0aGlzLmJhY2tkcm9wQ2xhc3MpXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgcGFuZUNsYXNzOiBbJ293bC1kdC1kaWFsb2cnLCAuLi5jb2VyY2VBcnJheSh0aGlzLnBhbmVsQ2xhc3MpXSxcclxuICAgICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsU3RyYXRlZ3kgfHwgdGhpcy5kZWZhdWx0U2Nyb2xsU3RyYXRlZ3koKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lciA9IHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlO1xyXG5cclxuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5hZnRlck9wZW4oKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFmdGVyUGlja2VyT3Blbi5lbWl0KG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLl9vcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVuIHRoZSBwaWNrZXIgYXMgcG9wdXBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvcGVuQXNQb3B1cCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbDxcclxuICAgICAgICAgICAgICAgIE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50PFQ+XHJcbiAgICAgICAgICAgID4oT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMucG9wdXBSZWYpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnBvcHVwUmVmLmhhc0F0dGFjaGVkKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8XHJcbiAgICAgICAgICAgICAgICBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPlxyXG4gICAgICAgICAgICA+ID0gdGhpcy5wb3B1cFJlZi5hdHRhY2godGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwpO1xyXG4gICAgICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lciA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgcG9zaXRpb24gb25jZSB0aGUgY2FsZW5kYXIgaGFzIHJlbmRlcmVkLlxyXG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxyXG4gICAgICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXHJcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi51cGRhdGVQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBlbWl0IG9wZW4gc3RyZWFtXHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyT3BlbmVkU3RyZWFtU3ViID0gdGhpcy5waWNrZXJDb250YWluZXIucGlja2VyT3BlbmVkU3RyZWFtXHJcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZnRlclBpY2tlck9wZW4uZW1pdChudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlUG9wdXAoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcclxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5jcmVhdGVQb3B1cFBvc2l0aW9uU3RyYXRlZ3koKSxcclxuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IHRydWUsXHJcbiAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6IFtcclxuICAgICAgICAgICAgICAgICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsXHJcbiAgICAgICAgICAgICAgICAuLi5jb2VyY2VBcnJheSh0aGlzLmJhY2tkcm9wQ2xhc3MpXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLnNjcm9sbFN0cmF0ZWd5IHx8IHRoaXMuZGVmYXVsdFNjcm9sbFN0cmF0ZWd5KCksXHJcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6IFsnb3dsLWR0LXBvcHVwJywgLi4uY29lcmNlQXJyYXkodGhpcy5wYW5lbENsYXNzKV1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5wb3B1cFJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XHJcblxyXG4gICAgICAgIG1lcmdlKFxyXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmLmJhY2tkcm9wQ2xpY2soKSxcclxuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi5kZXRhY2htZW50cygpLFxyXG4gICAgICAgICAgICB0aGlzLnBvcHVwUmVmXHJcbiAgICAgICAgICAgICAgICAua2V5ZG93bkV2ZW50cygpXHJcbiAgICAgICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5rZXlDb2RlID09PSBFU0NBUEUgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLl9kdElucHV0ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuYWx0S2V5ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQua2V5Q29kZSA9PT0gVVBfQVJST1cpXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgdGhlIHBvcHVwIFBvc2l0aW9uU3RyYXRlZ3kuXHJcbiAgICAgKiAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVQb3B1cFBvc2l0aW9uU3RyYXRlZ3koKTogUG9zaXRpb25TdHJhdGVneSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVxyXG4gICAgICAgICAgICAucG9zaXRpb24oKVxyXG4gICAgICAgICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9kdElucHV0LmVsZW1lbnRSZWYpXHJcbiAgICAgICAgICAgIC53aXRoVHJhbnNmb3JtT3JpZ2luT24oJy5vd2wtZHQtY29udGFpbmVyJylcclxuICAgICAgICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXHJcbiAgICAgICAgICAgIC53aXRoUHVzaChmYWxzZSlcclxuICAgICAgICAgICAgLndpdGhQb3NpdGlvbnMoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ2JvdHRvbScsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdlbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnZW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJyxcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZOiAtMTc2XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFk6IC0zNTJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSk7XHJcbiAgICB9XHJcbn1cclxuIl19