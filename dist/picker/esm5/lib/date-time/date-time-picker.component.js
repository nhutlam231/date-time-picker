/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
export var OWL_DTPICKER_SCROLL_STRATEGY = new InjectionToken('owl-dtpicker-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    /** @type {?} */
    var fn = (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.block(); });
    return fn;
}
/**
 * \@docs-private
 * @type {?}
 */
export var OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER = {
    provide: OWL_DTPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/**
 * @template T
 */
var OwlDateTimeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OwlDateTimeComponent, _super);
    function OwlDateTimeComponent(overlay, viewContainerRef, dialogService, ngZone, changeDetector, dateTimeAdapter, defaultScrollStrategy, dateTimeFormats, document) {
        var _this = _super.call(this, dateTimeAdapter, dateTimeFormats) || this;
        _this.overlay = overlay;
        _this.viewContainerRef = viewContainerRef;
        _this.dialogService = dialogService;
        _this.ngZone = ngZone;
        _this.changeDetector = changeDetector;
        _this.dateTimeAdapter = dateTimeAdapter;
        _this.dateTimeFormats = dateTimeFormats;
        _this.document = document;
        /**
         * Custom class for the picker backdrop.
         */
        _this.backdropClass = [];
        /**
         * Custom class for the picker overlay pane.
         */
        _this.panelClass = [];
        /**
         * Set the type of the dateTime picker
         *      'both' -- show both calendar and timer
         *      'calendar' -- show only calendar
         *      'timer' -- show only timer
         */
        _this._pickerType = 'both';
        /**
         * Whether the picker open as a dialog
         */
        _this._pickerMode = 'popup';
        /**
         * Whether the calendar is open.
         */
        _this._opened = false;
        /**
         * Callback when the picker is closed
         *
         */
        _this.afterPickerClosed = new EventEmitter();
        /**
         * Callback when the picker is open
         *
         */
        _this.afterPickerOpen = new EventEmitter();
        /**
         * Emits selected year in multi-year view
         * This doesn't imply a change on the selected date.
         *
         */
        _this.yearSelected = new EventEmitter();
        /**
         * Emits selected month in year view
         * This doesn't imply a change on the selected date.
         *
         */
        _this.monthSelected = new EventEmitter();
        /**
         * Emit when the selected value has been confirmed
         *
         */
        _this.confirmSelectedChange = new EventEmitter();
        /**
         * Emits when the date time picker is disabled.
         *
         */
        _this.disabledChange = new EventEmitter();
        _this.dtInputSub = Subscription.EMPTY;
        _this.hidePickerStreamSub = Subscription.EMPTY;
        _this.confirmSelectedStreamSub = Subscription.EMPTY;
        _this.pickerOpenedStreamSub = Subscription.EMPTY;
        /**
         * The element that was focused before the date time picker was opened.
         */
        _this.focusedElementBeforeOpen = null;
        _this._selecteds = [];
        _this.defaultScrollStrategy = defaultScrollStrategy;
        return _this;
    }
    Object.defineProperty(OwlDateTimeComponent.prototype, "startAt", {
        get: /**
         * @return {?}
         */
        function () {
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
        },
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(date));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "pickerType", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pickerType;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            if (val !== this._pickerType) {
                this._pickerType = val;
                if (this._dtInput) {
                    this._dtInput.formatNativeInputValue();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "pickerMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._pickerMode;
        },
        set: /**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            if (mode === 'popup') {
                this._pickerMode = mode;
            }
            else {
                this._pickerMode = 'dialog';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled === undefined && this._dtInput
                ? this._dtInput.disabled
                : !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = coerceBooleanProperty(value);
            if (value !== this._disabled) {
                this._disabled = value;
                this.disabledChange.next(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "opened", {
        get: /**
         * @return {?}
         */
        function () {
            return this._opened;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            val ? this.open() : this.close();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "dtInput", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "selected", {
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
            this._selected = value;
            this.changeDetector.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "selecteds", {
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
            this._selecteds = values;
            this.changeDetector.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "minDateTime", {
        /** The minimum selectable date. */
        get: /**
         * The minimum selectable date.
         * @return {?}
         */
        function () {
            return this._dtInput && this._dtInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "maxDateTime", {
        /** The maximum selectable date. */
        get: /**
         * The maximum selectable date.
         * @return {?}
         */
        function () {
            return this._dtInput && this._dtInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "dateTimeFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput && this._dtInput.dateTimeFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "selectMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput.selectMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput.isInSingleMode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeComponent.prototype, "isInRangeMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dtInput.isInRangeMode;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlDateTimeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    OwlDateTimeComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
        this.dtInputSub.unsubscribe();
        this.disabledChange.complete();
        if (this.popupRef) {
            this.popupRef.dispose();
        }
    };
    /**
     * @param {?} input
     * @return {?}
     */
    OwlDateTimeComponent.prototype.registerInput = /**
     * @param {?} input
     * @return {?}
     */
    function (input) {
        var _this = this;
        if (this._dtInput) {
            throw Error('A Owl DateTimePicker can only be associated with a single input.');
        }
        this._dtInput = input;
        this.dtInputSub = this._dtInput.valueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (Array.isArray(value)) {
                _this.selecteds = value;
            }
            else {
                _this.selected = value;
            }
        }));
    };
    /**
     * @return {?}
     */
    OwlDateTimeComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
        function () {
            _this.close();
        }));
        // Listen to picker container's confirmSelectedStream
        this.confirmSelectedStreamSub = this.pickerContainer.confirmSelectedStream.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.confirmSelect(event);
        }));
    };
    /**
     * Selects the given date
     */
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    OwlDateTimeComponent.prototype.select = /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (Array.isArray(date)) {
            this.selecteds = tslib_1.__spread(date);
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
    };
    /**
     * Emits the selected year in multi-year view
     * */
    /**
     * Emits the selected year in multi-year view
     *
     * @param {?} normalizedYear
     * @return {?}
     */
    OwlDateTimeComponent.prototype.selectYear = /**
     * Emits the selected year in multi-year view
     *
     * @param {?} normalizedYear
     * @return {?}
     */
    function (normalizedYear) {
        this.yearSelected.emit(normalizedYear);
    };
    /**
     * Emits selected month in year view
     * */
    /**
     * Emits selected month in year view
     *
     * @param {?} normalizedMonth
     * @return {?}
     */
    OwlDateTimeComponent.prototype.selectMonth = /**
     * Emits selected month in year view
     *
     * @param {?} normalizedMonth
     * @return {?}
     */
    function (normalizedMonth) {
        this.monthSelected.emit(normalizedMonth);
    };
    /**
     * Hide the picker
     */
    /**
     * Hide the picker
     * @return {?}
     */
    OwlDateTimeComponent.prototype.close = /**
     * Hide the picker
     * @return {?}
     */
    function () {
        var _this = this;
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
        var completeClose = (/**
         * @return {?}
         */
        function () {
            if (_this._opened) {
                _this._opened = false;
                _this.afterPickerClosed.emit(null);
                _this.focusedElementBeforeOpen = null;
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
    };
    /**
     * Confirm the selected value
     */
    /**
     * Confirm the selected value
     * @param {?=} event
     * @return {?}
     */
    OwlDateTimeComponent.prototype.confirmSelect = /**
     * Confirm the selected value
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        if (this.isInSingleMode) {
            /** @type {?} */
            var selected = this.selected || this.startAt || this.dateTimeAdapter.now();
            this.confirmSelectedChange.emit(selected);
        }
        else if (this.isInRangeMode) {
            this.confirmSelectedChange.emit(this.selecteds);
        }
        this.close();
        return;
    };
    /**
     * Open the picker as a dialog
     */
    /**
     * Open the picker as a dialog
     * @private
     * @return {?}
     */
    OwlDateTimeComponent.prototype.openAsDialog = /**
     * Open the picker as a dialog
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.dialogRef = this.dialogService.open(OwlDateTimeContainerComponent, {
            autoFocus: false,
            backdropClass: tslib_1.__spread([
                'cdk-overlay-dark-backdrop'
            ], coerceArray(this.backdropClass)),
            paneClass: tslib_1.__spread(['owl-dt-dialog'], coerceArray(this.panelClass)),
            viewContainerRef: this.viewContainerRef,
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy()
        });
        this.pickerContainer = this.dialogRef.componentInstance;
        this.dialogRef.afterOpen().subscribe((/**
         * @return {?}
         */
        function () {
            _this.afterPickerOpen.emit(null);
            _this._opened = true;
        }));
        this.dialogRef.afterClosed().subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    };
    /**
     * Open the picker as popup
     */
    /**
     * Open the picker as popup
     * @private
     * @return {?}
     */
    OwlDateTimeComponent.prototype.openAsPopup = /**
     * Open the picker as popup
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.pickerContainerPortal) {
            this.pickerContainerPortal = new ComponentPortal(OwlDateTimeContainerComponent, this.viewContainerRef);
        }
        if (!this.popupRef) {
            this.createPopup();
        }
        if (!this.popupRef.hasAttached()) {
            /** @type {?} */
            var componentRef = this.popupRef.attach(this.pickerContainerPortal);
            this.pickerContainer = componentRef.instance;
            // Update the position once the calendar has rendered.
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.popupRef.updatePosition();
            }));
            // emit open stream
            this.pickerOpenedStreamSub = this.pickerContainer.pickerOpenedStream
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.afterPickerOpen.emit(null);
                _this._opened = true;
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    OwlDateTimeComponent.prototype.createPopup = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var overlayConfig = new OverlayConfig({
            positionStrategy: this.createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: tslib_1.__spread([
                'cdk-overlay-transparent-backdrop'
            ], coerceArray(this.backdropClass)),
            scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
            panelClass: tslib_1.__spread(['owl-dt-popup'], coerceArray(this.panelClass))
        });
        this.popupRef = this.overlay.create(overlayConfig);
        merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef
            .keydownEvents()
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return event.keyCode === ESCAPE ||
                (_this._dtInput &&
                    event.altKey &&
                    event.keyCode === UP_ARROW);
        })))).subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    };
    /**
     * Create the popup PositionStrategy.
     * */
    /**
     * Create the popup PositionStrategy.
     *
     * @private
     * @return {?}
     */
    OwlDateTimeComponent.prototype.createPopupPositionStrategy = /**
     * Create the popup PositionStrategy.
     *
     * @private
     * @return {?}
     */
    function () {
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
    };
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
    OwlDateTimeComponent.ctorParameters = function () { return [
        { type: Overlay },
        { type: ViewContainerRef },
        { type: OwlDialogService },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Inject, args: [OWL_DTPICKER_SCROLL_STRATEGY,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
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
    return OwlDateTimeComponent;
}(OwlDateTime));
export { OwlDateTimeComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLE9BQU8sRUFDSCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sZ0JBQWdCLEVBQ25CLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUVILE9BQU8sRUFDUCxhQUFhLEVBSWhCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0UsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFdkYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFDSCxxQkFBcUIsRUFFeEIsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQ0gsV0FBVyxFQUlkLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FB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Qzs7Ozs7O0lBRzFDLHdDQUEyQjs7Ozs7Ozs7O0lBcUMzQiwyQ0FBeUM7Ozs7O0lBa0J6QywyQ0FBa0M7Ozs7OztJQWVsQyx5Q0FBMkI7Ozs7OztJQWlCM0IsdUNBQWlDOzs7Ozs7O0lBY2pDLDhDQUNzQzs7Ozs7O0lBS3RDLGlEQUM0Qzs7Ozs7O0lBSzVDLCtDQUMwQzs7Ozs7OztJQU0xQyw0Q0FDcUM7Ozs7Ozs7SUFNckMsNkNBQ3NDOzs7Ozs7SUFLdEMscURBQTJEOzs7Ozs7SUFLM0QsOENBQW9EOzs7OztJQUVwRCxxREFFRTs7Ozs7SUFDRiwrQ0FBMEQ7Ozs7O0lBQzFELHdDQUE2Qjs7Ozs7SUFDN0IseUNBQWtFOzs7OztJQUNsRSwwQ0FBd0M7Ozs7O0lBQ3hDLG1EQUFpRDs7Ozs7SUFDakQsd0RBQXNEOzs7OztJQUN0RCxxREFBbUQ7Ozs7OztJQUduRCx3REFBNEQ7Ozs7O0lBRTVELHdDQUErQzs7Ozs7SUFLL0MseUNBQTRCOzs7OztJQVU1QiwwQ0FBNkI7Ozs7O0lBb0M3QixxREFBb0Q7Ozs7O0lBR2hELHVDQUF3Qjs7Ozs7SUFDeEIsZ0RBQTBDOzs7OztJQUMxQyw2Q0FBdUM7Ozs7O0lBQ3ZDLHNDQUFzQjs7Ozs7SUFDdEIsOENBQTJDOzs7OztJQUMzQywrQ0FBeUQ7Ozs7O0lBRXpELCtDQUU2Qzs7Ozs7SUFDN0Msd0NBRXFCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBDb21wb25lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbmplY3QsXHJcbiAgICBJbmplY3Rpb25Ub2tlbixcclxuICAgIElucHV0LFxyXG4gICAgTmdab25lLFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3B0aW9uYWwsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7XHJcbiAgICBCbG9ja1Njcm9sbFN0cmF0ZWd5LFxyXG4gICAgT3ZlcmxheSxcclxuICAgIE92ZXJsYXlDb25maWcsXHJcbiAgICBPdmVybGF5UmVmLFxyXG4gICAgUG9zaXRpb25TdHJhdGVneSxcclxuICAgIFNjcm9sbFN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xyXG5pbXBvcnQgeyBFU0NBUEUsIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcclxuaW1wb3J0IHsgY29lcmNlQXJyYXksIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XHJcbmltcG9ydCB7IE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLWlucHV0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBPV0xfREFURV9USU1FX0ZPUk1BVFMsXHJcbiAgICBPd2xEYXRlVGltZUZvcm1hdHNcclxufSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBPd2xEYXRlVGltZSxcclxuICAgIFBpY2tlck1vZGUsXHJcbiAgICBQaWNrZXJUeXBlLFxyXG4gICAgU2VsZWN0TW9kZVxyXG59IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcclxuaW1wb3J0IHsgT3dsRGlhbG9nUmVmIH0gZnJvbSAnLi4vZGlhbG9nL2RpYWxvZy1yZWYuY2xhc3MnO1xyXG5pbXBvcnQgeyBPd2xEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vZGlhbG9nL2RpYWxvZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG4vKiogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBkdFBpY2tlciBpcyBvcGVuLiAqL1xyXG5leHBvcnQgY29uc3QgT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxcclxuICAgICgpID0+IFNjcm9sbFN0cmF0ZWd5XHJcbj4oJ293bC1kdHBpY2tlci1zY3JvbGwtc3RyYXRlZ3knKTtcclxuXHJcbi8qKiBAZG9jcy1wcml2YXRlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSX0ZBQ1RPUlkoXHJcbiAgICBvdmVybGF5OiBPdmVybGF5XHJcbik6ICgpID0+IEJsb2NrU2Nyb2xsU3RyYXRlZ3kge1xyXG4gICAgY29uc3QgZm4gPSAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKTtcclxuICAgIHJldHVybiBmbjtcclxufVxyXG5cclxuLyoqIEBkb2NzLXByaXZhdGUgKi9cclxuZXhwb3J0IGNvbnN0IE9XTF9EVFBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIgPSB7XHJcbiAgICBwcm92aWRlOiBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZLFxyXG4gICAgZGVwczogW092ZXJsYXldLFxyXG4gICAgdXNlRmFjdG9yeTogT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnb3dsLWRhdGUtdGltZScsXHJcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2RhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lQ29tcG9uZW50PFQ+IGV4dGVuZHMgT3dsRGF0ZVRpbWU8VD5cclxuICAgIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgLyoqIEN1c3RvbSBjbGFzcyBmb3IgdGhlIHBpY2tlciBiYWNrZHJvcC4gKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgYmFja2Ryb3BDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAvKiogQ3VzdG9tIGNsYXNzIGZvciB0aGUgcGlja2VyIG92ZXJsYXkgcGFuZS4gKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBwdWJsaWMgcGFuZWxDbGFzczogc3RyaW5nIHwgc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICAvKiogVGhlIGRhdGUgdG8gb3BlbiB0aGUgY2FsZW5kYXIgdG8gaW5pdGlhbGx5LiAqL1xyXG4gICAgcHJpdmF0ZSBfc3RhcnRBdDogVCB8IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHN0YXJ0QXQoKTogVCB8IG51bGwge1xyXG4gICAgICAgIC8vIElmIGFuIGV4cGxpY2l0IHN0YXJ0QXQgaXMgc2V0IHdlIHN0YXJ0IHRoZXJlLCBvdGhlcndpc2Ugd2Ugc3RhcnQgYXQgd2hhdGV2ZXIgdGhlIGN1cnJlbnRseVxyXG4gICAgICAgIC8vIHNlbGVjdGVkIHZhbHVlIGlzLlxyXG4gICAgICAgIGlmICh0aGlzLl9zdGFydEF0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGFydEF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2R0SW5wdXQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LnZhbHVlIHx8IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kdElucHV0LnNlbGVjdE1vZGUgPT09ICdyYW5nZScgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2R0SW5wdXQuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbSdcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dC52YWx1ZXNbMF0gfHwgbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9kdElucHV0LnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2R0SW5wdXQudmFsdWVzWzFdIHx8IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHN0YXJ0QXQoZGF0ZTogVCB8IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5nZXRWYWxpZERhdGUoXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGRhdGUpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgdHlwZSBvZiB0aGUgZGF0ZVRpbWUgcGlja2VyXHJcbiAgICAgKiAgICAgICdib3RoJyAtLSBzaG93IGJvdGggY2FsZW5kYXIgYW5kIHRpbWVyXHJcbiAgICAgKiAgICAgICdjYWxlbmRhcicgLS0gc2hvdyBvbmx5IGNhbGVuZGFyXHJcbiAgICAgKiAgICAgICd0aW1lcicgLS0gc2hvdyBvbmx5IHRpbWVyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3BpY2tlclR5cGU6IFBpY2tlclR5cGUgPSAnYm90aCc7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHBpY2tlclR5cGUoKTogUGlja2VyVHlwZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlclR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBpY2tlclR5cGUodmFsOiBQaWNrZXJUeXBlKSB7XHJcbiAgICAgICAgaWYgKHZhbCAhPT0gdGhpcy5fcGlja2VyVHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9waWNrZXJUeXBlID0gdmFsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZHRJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZHRJbnB1dC5mb3JtYXROYXRpdmVJbnB1dFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSBwaWNrZXIgb3BlbiBhcyBhIGRpYWxvZ1xyXG4gICAgICovXHJcbiAgICBfcGlja2VyTW9kZTogUGlja2VyTW9kZSA9ICdwb3B1cCc7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHBpY2tlck1vZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BpY2tlck1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBpY2tlck1vZGUobW9kZTogUGlja2VyTW9kZSkge1xyXG4gICAgICAgIGlmIChtb2RlID09PSAncG9wdXAnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlck1vZGUgPSBtb2RlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BpY2tlck1vZGUgPSAnZGlhbG9nJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRhdGUgdGltZSBwaWNrZXIgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xyXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCA9PT0gdW5kZWZpbmVkICYmIHRoaXMuX2R0SW5wdXRcclxuICAgICAgICAgICAgPyB0aGlzLl9kdElucHV0LmRpc2FibGVkXHJcbiAgICAgICAgICAgIDogISF0aGlzLl9kaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLm5leHQodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgaXMgb3Blbi4gKi9cclxuICAgIHByaXZhdGUgX29wZW5lZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBvcGVuZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgb3BlbmVkKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIHZhbCA/IHRoaXMub3BlbigpIDogdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHNjcm9sbCBzdHJhdGVneSB3aGVuIHRoZSBwaWNrZXIgaXMgb3BlblxyXG4gICAgICogTGVhcm4gbW9yZSB0aGlzIGZyb20gaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyLmlvL2Nkay9vdmVybGF5L292ZXJ2aWV3I3Njcm9sbC1zdHJhdGVnaWVzXHJcbiAgICAgKiAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHB1YmxpYyBzY3JvbGxTdHJhdGVneTogU2Nyb2xsU3RyYXRlZ3k7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayB3aGVuIHRoZSBwaWNrZXIgaXMgY2xvc2VkXHJcbiAgICAgKiAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBhZnRlclBpY2tlckNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgd2hlbiB0aGUgcGlja2VyIGlzIG9wZW5cclxuICAgICAqICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIGFmdGVyUGlja2VyT3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1pdHMgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aS15ZWFyIHZpZXdcclxuICAgICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cclxuICAgICAqICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHllYXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlld1xyXG4gICAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxyXG4gICAgICogKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgbW9udGhTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtaXQgd2hlbiB0aGUgc2VsZWN0ZWQgdmFsdWUgaGFzIGJlZW4gY29uZmlybWVkXHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIGNvbmZpcm1TZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VFtdIHwgVD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtaXRzIHdoZW4gdGhlIGRhdGUgdGltZSBwaWNrZXIgaXMgZGlzYWJsZWQuXHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIGRpc2FibGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAgIHByaXZhdGUgcGlja2VyQ29udGFpbmVyUG9ydGFsOiBDb21wb25lbnRQb3J0YWw8XHJcbiAgICAgICAgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD5cclxuICAgID47XHJcbiAgICBwcml2YXRlIHBpY2tlckNvbnRhaW5lcjogT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD47XHJcbiAgICBwcml2YXRlIHBvcHVwUmVmOiBPdmVybGF5UmVmO1xyXG4gICAgcHJpdmF0ZSBkaWFsb2dSZWY6IE93bERpYWxvZ1JlZjxPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPj47XHJcbiAgICBwcml2YXRlIGR0SW5wdXRTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcbiAgICBwcml2YXRlIGhpZGVQaWNrZXJTdHJlYW1TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcbiAgICBwcml2YXRlIGNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuICAgIHByaXZhdGUgcGlja2VyT3BlbmVkU3RyZWFtU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xyXG5cclxuICAgIC8qKiBUaGUgZWxlbWVudCB0aGF0IHdhcyBmb2N1c2VkIGJlZm9yZSB0aGUgZGF0ZSB0aW1lIHBpY2tlciB3YXMgb3BlbmVkLiAqL1xyXG4gICAgcHJpdmF0ZSBmb2N1c2VkRWxlbWVudEJlZm9yZU9wZW46IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfZHRJbnB1dDogT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZTxUPjtcclxuICAgIGdldCBkdElucHV0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBUIHwgbnVsbDtcclxuICAgIGdldCBzZWxlY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHNlbGVjdGVkKHZhbHVlOiBUIHwgbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZHM6IFRbXSA9IFtdO1xyXG4gICAgZ2V0IHNlbGVjdGVkcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZWxlY3RlZHModmFsdWVzOiBUW10pIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZHMgPSB2YWx1ZXM7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gICAgZ2V0IG1pbkRhdGVUaW1lKCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dCAmJiB0aGlzLl9kdElucHV0Lm1pbjtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gICAgZ2V0IG1heERhdGVUaW1lKCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dCAmJiB0aGlzLl9kdElucHV0Lm1heDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0ZVRpbWVGaWx0ZXIoKTogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZHRJbnB1dCAmJiB0aGlzLl9kdElucHV0LmRhdGVUaW1lRmlsdGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzZWxlY3RNb2RlKCk6IFNlbGVjdE1vZGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LnNlbGVjdE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LmlzSW5TaW5nbGVNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0luUmFuZ2VNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kdElucHV0LmlzSW5SYW5nZU1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWZhdWx0U2Nyb2xsU3RyYXRlZ3k6ICgpID0+IFNjcm9sbFN0cmF0ZWd5O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgb3ZlcmxheTogT3ZlcmxheSxcclxuICAgICAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBkaWFsb2dTZXJ2aWNlOiBPd2xEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICAgICAgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICBAT3B0aW9uYWwoKSBwcm90ZWN0ZWQgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXHJcbiAgICAgICAgQEluamVjdChPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZKSBkZWZhdWx0U2Nyb2xsU3RyYXRlZ3k6IGFueSxcclxuICAgICAgICBAT3B0aW9uYWwoKVxyXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxyXG4gICAgICAgIHByb3RlY3RlZCBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0cyxcclxuICAgICAgICBAT3B0aW9uYWwoKVxyXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpXHJcbiAgICAgICAgcHJpdmF0ZSBkb2N1bWVudDogYW55XHJcbiAgICApIHtcclxuICAgICAgICBzdXBlcihkYXRlVGltZUFkYXB0ZXIsIGRhdGVUaW1lRm9ybWF0cyk7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0U2Nyb2xsU3RyYXRlZ3kgPSBkZWZhdWx0U2Nyb2xsU3RyYXRlZ3k7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cclxuXHJcbiAgICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIHRoaXMuZHRJbnB1dFN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UuY29tcGxldGUoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucG9wdXBSZWYpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi5kaXNwb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlcklucHV0KGlucHV0OiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlPFQ+KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2R0SW5wdXQpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICAnQSBPd2wgRGF0ZVRpbWVQaWNrZXIgY2FuIG9ubHkgYmUgYXNzb2NpYXRlZCB3aXRoIGEgc2luZ2xlIGlucHV0LidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2R0SW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB0aGlzLmR0SW5wdXRTdWIgPSB0aGlzLl9kdElucHV0LnZhbHVlQ2hhbmdlLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKHZhbHVlOiBUW10gfCBUIHwgbnVsbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHMgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlbigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fb3BlbmVkIHx8IHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9kdElucHV0KSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgJ0F0dGVtcHRlZCB0byBvcGVuIGFuIERhdGVUaW1lUGlja2VyIHdpdGggbm8gYXNzb2NpYXRlZCBpbnB1dC4nXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiA9IHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlc2V0IHRoZSBwaWNrZXIgc2VsZWN0ZWQgdmFsdWVcclxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5fZHRJbnB1dC52YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkcyA9IHRoaXMuX2R0SW5wdXQudmFsdWVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gd2hlbiB0aGUgcGlja2VyIGlzIG9wZW4gLCB3ZSBtYWtlIHN1cmUgdGhlIHBpY2tlcidzIGN1cnJlbnQgc2VsZWN0ZWQgdGltZSB2YWx1ZVxyXG4gICAgICAgIC8vIGlzIHRoZSBzYW1lIGFzIHRoZSBfc3RhcnRBdCB0aW1lIHZhbHVlLlxyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkICYmIHRoaXMucGlja2VyVHlwZSAhPT0gJ2NhbGVuZGFyJyAmJiB0aGlzLl9zdGFydEF0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnNlbGVjdGVkKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldE1vbnRoKHRoaXMuc2VsZWN0ZWQpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLnNlbGVjdGVkKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldEhvdXJzKHRoaXMuX3N0YXJ0QXQpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLl9zdGFydEF0KSxcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmdldFNlY29uZHModGhpcy5fc3RhcnRBdClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucGlja2VyTW9kZSA9PT0gJ2RpYWxvZycgPyB0aGlzLm9wZW5Bc0RpYWxvZygpIDogdGhpcy5vcGVuQXNQb3B1cCgpO1xyXG5cclxuICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lci5waWNrZXIgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBMaXN0ZW4gdG8gcGlja2VyIGNvbnRhaW5lcidzIGhpZGVQaWNrZXJTdHJlYW1cclxuICAgICAgICB0aGlzLmhpZGVQaWNrZXJTdHJlYW1TdWIgPSB0aGlzLnBpY2tlckNvbnRhaW5lci5oaWRlUGlja2VyU3RyZWFtLnN1YnNjcmliZShcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gTGlzdGVuIHRvIHBpY2tlciBjb250YWluZXIncyBjb25maXJtU2VsZWN0ZWRTdHJlYW1cclxuICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3RlZFN0cmVhbVN1YiA9IHRoaXMucGlja2VyQ29udGFpbmVyLmNvbmZpcm1TZWxlY3RlZFN0cmVhbS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1TZWxlY3QoZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdHMgdGhlIGdpdmVuIGRhdGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlbGVjdChkYXRlOiBUW10gfCBUKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZHMgPSBbLi4uZGF0ZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYXNlcyBpbiB3aGljaCBhdXRvbWF0aWNhbGx5IGNvbmZpcm0gdGhlIHNlbGVjdCB3aGVuIGRhdGUgb3IgZGF0ZXMgYXJlIHNlbGVjdGVkOlxyXG4gICAgICAgICAqIDEpIHBpY2tlciBtb2RlIGlzIE5PVCAnZGlhbG9nJ1xyXG4gICAgICAgICAqIDIpIHBpY2tlciB0eXBlIGlzICdjYWxlbmRhcicgYW5kIHNlbGVjdE1vZGUgaXMgJ3NpbmdsZScuXHJcbiAgICAgICAgICogMykgcGlja2VyIHR5cGUgaXMgJ2NhbGVuZGFyJyBhbmQgc2VsZWN0TW9kZSBpcyAncmFuZ2UnIGFuZFxyXG4gICAgICAgICAqICAgIHRoZSAnc2VsZWN0ZWRzJyBoYXMgJ2Zyb20nKHNlbGVjdGVkc1swXSkgYW5kICd0bycoc2VsZWN0ZWRzWzFdKSB2YWx1ZXMuXHJcbiAgICAgICAgICogNCkgc2VsZWN0TW9kZSBpcyAncmFuZ2VGcm9tJyBhbmQgc2VsZWN0ZWRzWzBdIGhhcyB2YWx1ZS5cclxuICAgICAgICAgKiA1KSBzZWxlY3RNb2RlIGlzICdyYW5nZVRvJyBhbmQgc2VsZWN0ZWRzWzFdIGhhcyB2YWx1ZS5cclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5waWNrZXJNb2RlICE9PSAnZGlhbG9nJyAmJlxyXG4gICAgICAgICAgICB0aGlzLnBpY2tlclR5cGUgPT09ICdjYWxlbmRhcicgJiZcclxuICAgICAgICAgICAgKCh0aGlzLnNlbGVjdE1vZGUgPT09ICdzaW5nbGUnICYmIHRoaXMuc2VsZWN0ZWQpIHx8XHJcbiAgICAgICAgICAgICAgICAodGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyAmJiB0aGlzLnNlbGVjdGVkc1swXSkgfHxcclxuICAgICAgICAgICAgICAgICh0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZVRvJyAmJiB0aGlzLnNlbGVjdGVkc1sxXSkgfHxcclxuICAgICAgICAgICAgICAgICh0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZScgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkc1swXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzWzFdKSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1pdHMgdGhlIHNlbGVjdGVkIHllYXIgaW4gbXVsdGkteWVhciB2aWV3XHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIHNlbGVjdFllYXIobm9ybWFsaXplZFllYXI6IFQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnllYXJTZWxlY3RlZC5lbWl0KG5vcm1hbGl6ZWRZZWFyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlld1xyXG4gICAgICogKi9cclxuICAgIHB1YmxpYyBzZWxlY3RNb250aChub3JtYWxpemVkTW9udGg6IFQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1vbnRoU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkTW9udGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZSB0aGUgcGlja2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX29wZW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wb3B1cFJlZiAmJiB0aGlzLnBvcHVwUmVmLmhhc0F0dGFjaGVkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi5kZXRhY2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwgJiZcclxuICAgICAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXJQb3J0YWwuaXNBdHRhY2hlZFxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbC5kZXRhY2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmhpZGVQaWNrZXJTdHJlYW1TdWIpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlUGlja2VyU3RyZWFtU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZVBpY2tlclN0cmVhbVN1YiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jb25maXJtU2VsZWN0ZWRTdHJlYW1TdWIpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRTdHJlYW1TdWIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgdGhpcy5jb25maXJtU2VsZWN0ZWRTdHJlYW1TdWIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGlja2VyT3BlbmVkU3RyZWFtU3ViKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyT3BlbmVkU3RyZWFtU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGlja2VyT3BlbmVkU3RyZWFtU3ViID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpYWxvZ1JlZikge1xyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1JlZiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb21wbGV0ZUNsb3NlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fb3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJQaWNrZXJDbG9zZWQuZW1pdChudWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgdGhpcy5mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gJiZcclxuICAgICAgICAgICAgdHlwZW9mIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuLmZvY3VzID09PSAnZnVuY3Rpb24nXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIC8vIEJlY2F1c2UgSUUgbW92ZXMgZm9jdXMgYXN5bmNocm9ub3VzbHksIHdlIGNhbid0IGNvdW50IG9uIGl0IGJlaW5nIHJlc3RvcmVkIGJlZm9yZSB3ZSd2ZVxyXG4gICAgICAgICAgICAvLyBtYXJrZWQgdGhlIGRhdGVwaWNrZXIgYXMgY2xvc2VkLiBJZiB0aGUgZXZlbnQgZmlyZXMgb3V0IG9mIHNlcXVlbmNlIGFuZCB0aGUgZWxlbWVudCB0aGF0XHJcbiAgICAgICAgICAgIC8vIHdlJ3JlIHJlZm9jdXNpbmcgb3BlbnMgdGhlIGRhdGVwaWNrZXIgb24gZm9jdXMsIHRoZSB1c2VyIGNvdWxkIGJlIHN0dWNrIHdpdGggbm90IGJlaW5nXHJcbiAgICAgICAgICAgIC8vIGFibGUgdG8gY2xvc2UgdGhlIGNhbGVuZGFyIGF0IGFsbC4gV2Ugd29yayBhcm91bmQgaXQgYnkgbWFraW5nIHRoZSBsb2dpYywgdGhhdCBtYXJrc1xyXG4gICAgICAgICAgICAvLyB0aGUgZGF0ZXBpY2tlciBhcyBjbG9zZWQsIGFzeW5jIGFzIHdlbGwuXHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoY29tcGxldGVDbG9zZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29tcGxldGVDbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmZpcm0gdGhlIHNlbGVjdGVkIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25maXJtU2VsZWN0KGV2ZW50PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCB8fCB0aGlzLnN0YXJ0QXQgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIubm93KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlybVNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE9wZW4gdGhlIHBpY2tlciBhcyBhIGRpYWxvZ1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9wZW5Bc0RpYWxvZygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuZGlhbG9nU2VydmljZS5vcGVuKFxyXG4gICAgICAgICAgICBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJhY2tkcm9wQ2xhc3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAnY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uY29lcmNlQXJyYXkodGhpcy5iYWNrZHJvcENsYXNzKVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHBhbmVDbGFzczogWydvd2wtZHQtZGlhbG9nJywgLi4uY29lcmNlQXJyYXkodGhpcy5wYW5lbENsYXNzKV0sXHJcbiAgICAgICAgICAgICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxTdHJhdGVneTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFN0cmF0ZWd5IHx8IHRoaXMuZGVmYXVsdFNjcm9sbFN0cmF0ZWd5KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXIgPSB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZTtcclxuXHJcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuYWZ0ZXJPcGVuKCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZnRlclBpY2tlck9wZW4uZW1pdChudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5fb3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbiB0aGUgcGlja2VyIGFzIHBvcHVwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb3BlbkFzUG9wdXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbCkge1xyXG4gICAgICAgICAgICB0aGlzLnBpY2tlckNvbnRhaW5lclBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWw8XHJcbiAgICAgICAgICAgICAgICBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudDxUPlxyXG4gICAgICAgICAgICA+KE93bERhdGVUaW1lQ29udGFpbmVyQ29tcG9uZW50LCB0aGlzLnZpZXdDb250YWluZXJSZWYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnBvcHVwUmVmKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlUG9wdXAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5wb3B1cFJlZi5oYXNBdHRhY2hlZCgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFxyXG4gICAgICAgICAgICAgICAgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD5cclxuICAgICAgICAgICAgPiA9IHRoaXMucG9wdXBSZWYuYXR0YWNoKHRoaXMucGlja2VyQ29udGFpbmVyUG9ydGFsKTtcclxuICAgICAgICAgICAgdGhpcy5waWNrZXJDb250YWluZXIgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcblxyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHBvc2l0aW9uIG9uY2UgdGhlIGNhbGVuZGFyIGhhcyByZW5kZXJlZC5cclxuICAgICAgICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGVcclxuICAgICAgICAgICAgICAgIC5hc09ic2VydmFibGUoKVxyXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9wdXBSZWYudXBkYXRlUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gZW1pdCBvcGVuIHN0cmVhbVxyXG4gICAgICAgICAgICB0aGlzLnBpY2tlck9wZW5lZFN0cmVhbVN1YiA9IHRoaXMucGlja2VyQ29udGFpbmVyLnBpY2tlck9wZW5lZFN0cmVhbVxyXG4gICAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWZ0ZXJQaWNrZXJPcGVuLmVtaXQobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZVBvcHVwKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSBuZXcgT3ZlcmxheUNvbmZpZyh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuY3JlYXRlUG9wdXBQb3NpdGlvblN0cmF0ZWd5KCksXHJcbiAgICAgICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxyXG4gICAgICAgICAgICBiYWNrZHJvcENsYXNzOiBbXHJcbiAgICAgICAgICAgICAgICAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnLFxyXG4gICAgICAgICAgICAgICAgLi4uY29lcmNlQXJyYXkodGhpcy5iYWNrZHJvcENsYXNzKVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5zY3JvbGxTdHJhdGVneSB8fCB0aGlzLmRlZmF1bHRTY3JvbGxTdHJhdGVneSgpLFxyXG4gICAgICAgICAgICBwYW5lbENsYXNzOiBbJ293bC1kdC1wb3B1cCcsIC4uLmNvZXJjZUFycmF5KHRoaXMucGFuZWxDbGFzcyldXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMucG9wdXBSZWYgPSB0aGlzLm92ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xyXG5cclxuICAgICAgICBtZXJnZShcclxuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZi5iYWNrZHJvcENsaWNrKCksXHJcbiAgICAgICAgICAgIHRoaXMucG9wdXBSZWYuZGV0YWNobWVudHMoKSxcclxuICAgICAgICAgICAgdGhpcy5wb3B1cFJlZlxyXG4gICAgICAgICAgICAgICAgLmtleWRvd25FdmVudHMoKVxyXG4gICAgICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5fZHRJbnB1dCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmFsdEtleSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LmtleUNvZGUgPT09IFVQX0FSUk9XKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRoZSBwb3B1cCBQb3NpdGlvblN0cmF0ZWd5LlxyXG4gICAgICogKi9cclxuICAgIHByaXZhdGUgY3JlYXRlUG9wdXBQb3NpdGlvblN0cmF0ZWd5KCk6IFBvc2l0aW9uU3RyYXRlZ3kge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlcclxuICAgICAgICAgICAgLnBvc2l0aW9uKClcclxuICAgICAgICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5fZHRJbnB1dC5lbGVtZW50UmVmKVxyXG4gICAgICAgICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcub3dsLWR0LWNvbnRhaW5lcicpXHJcbiAgICAgICAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxyXG4gICAgICAgICAgICAud2l0aFB1c2goZmFsc2UpXHJcbiAgICAgICAgICAgIC53aXRoUG9zaXRpb25zKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICdib3R0b20nLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnZW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcclxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ2VuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblg6ICdlbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnZW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ2JvdHRvbSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luWDogJ3N0YXJ0JyxcclxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcclxuICAgICAgICAgICAgICAgICAgICBvdmVybGF5WTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WTogLTE3NlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXlZOiAndG9wJyxcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZOiAtMzUyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==