/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker-input.directive
 */
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { OwlDateTimeComponent } from './date-time-picker.component';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { Subscription } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
/** @type {?} */
export const OWL_DATETIME_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => OwlDateTimeInputDirective)),
    multi: true
};
/** @type {?} */
export const OWL_DATETIME_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => OwlDateTimeInputDirective)),
    multi: true
};
/**
 * @template T
 */
export class OwlDateTimeInputDirective {
    /**
     * @param {?} elmRef
     * @param {?} renderer
     * @param {?} dateTimeAdapter
     * @param {?} dateTimeFormats
     */
    constructor(elmRef, renderer, dateTimeAdapter, dateTimeFormats) {
        this.elmRef = elmRef;
        this.renderer = renderer;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * The picker's select mode
         */
        this._selectMode = 'single';
        /**
         * The character to separate the 'from' and 'to' in input value
         */
        this.rangeSeparator = '~';
        this._values = [];
        /**
         * Callback to invoke when `change` event is fired on this `<input>`
         *
         */
        this.dateTimeChange = new EventEmitter();
        /**
         * Callback to invoke when an `input` event is fired on this `<input>`.
         *
         */
        this.dateTimeInput = new EventEmitter();
        this.dtPickerSub = Subscription.EMPTY;
        this.localeSub = Subscription.EMPTY;
        this.lastValueValid = true;
        this.onModelChange = (/**
         * @return {?}
         */
        () => { });
        this.onModelTouched = (/**
         * @return {?}
         */
        () => { });
        this.validatorOnChange = (/**
         * @return {?}
         */
        () => { });
        /**
         * The form control validator for whether the input parses.
         */
        this.parseValidator = (/**
         * @return {?}
         */
        () => {
            return this.lastValueValid
                ? null
                : { owlDateTimeParse: { text: this.elmRef.nativeElement.value } };
        });
        /**
         * The form control validator for the min date.
         */
        this.minValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            if (this.isInSingleMode) {
                /** @type {?} */
                const controlValue = this.getValidDate(this.dateTimeAdapter.deserialize(control.value));
                return !this.min ||
                    !controlValue ||
                    this.dateTimeAdapter.compare(this.min, controlValue) <= 0
                    ? null
                    : { owlDateTimeMin: { min: this.min, actual: controlValue } };
            }
            else if (this.isInRangeMode && control.value) {
                /** @type {?} */
                const controlValueFrom = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[0]));
                /** @type {?} */
                const controlValueTo = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[1]));
                return !this.min ||
                    !controlValueFrom ||
                    !controlValueTo ||
                    this.dateTimeAdapter.compare(this.min, controlValueFrom) <= 0
                    ? null
                    : {
                        owlDateTimeMin: {
                            min: this.min,
                            actual: [controlValueFrom, controlValueTo]
                        }
                    };
            }
        });
        /**
         * The form control validator for the max date.
         */
        this.maxValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            if (this.isInSingleMode) {
                /** @type {?} */
                const controlValue = this.getValidDate(this.dateTimeAdapter.deserialize(control.value));
                return !this.max ||
                    !controlValue ||
                    this.dateTimeAdapter.compare(this.max, controlValue) >= 0
                    ? null
                    : { owlDateTimeMax: { max: this.max, actual: controlValue } };
            }
            else if (this.isInRangeMode && control.value) {
                /** @type {?} */
                const controlValueFrom = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[0]));
                /** @type {?} */
                const controlValueTo = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[1]));
                return !this.max ||
                    !controlValueFrom ||
                    !controlValueTo ||
                    this.dateTimeAdapter.compare(this.max, controlValueTo) >= 0
                    ? null
                    : {
                        owlDateTimeMax: {
                            max: this.max,
                            actual: [controlValueFrom, controlValueTo]
                        }
                    };
            }
        });
        /**
         * The form control validator for the date filter.
         */
        this.filterValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const controlValue = this.getValidDate(this.dateTimeAdapter.deserialize(control.value));
            return !this._dateTimeFilter ||
                !controlValue ||
                this._dateTimeFilter(controlValue)
                ? null
                : { owlDateTimeFilter: true };
        });
        /**
         * The form control validator for the range.
         * Check whether the 'before' value is before the 'to' value
         *
         */
        this.rangeValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            if (this.isInSingleMode || !control.value) {
                return null;
            }
            /** @type {?} */
            const controlValueFrom = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[0]));
            /** @type {?} */
            const controlValueTo = this.getValidDate(this.dateTimeAdapter.deserialize(control.value[1]));
            return !controlValueFrom ||
                !controlValueTo ||
                this.dateTimeAdapter.compare(controlValueFrom, controlValueTo) <= 0
                ? null
                : { owlDateTimeRange: true };
        });
        /**
         * The combined form control validator for this input.
         */
        this.validator = Validators.compose([
            this.parseValidator,
            this.minValidator,
            this.maxValidator,
            this.filterValidator,
            this.rangeValidator
        ]);
        /**
         * Emits when the value changes (either due to user input or programmatic change).
         */
        this.valueChange = new EventEmitter();
        /**
         * Emits when the disabled state has changed
         */
        this.disabledChange = new EventEmitter();
        if (!this.dateTimeAdapter) {
            throw Error(`OwlDateTimePicker: No provider found for DateTimePicker. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        if (!this.dateTimeFormats) {
            throw Error(`OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following ` +
                `modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a ` +
                `custom implementation.`);
        }
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        () => {
            this.value = this.value;
        }));
    }
    /**
     * The date time picker that this input is associated with.
     *
     * @param {?} value
     * @return {?}
     */
    set owlDateTime(value) {
        this.registerDateTimePicker(value);
    }
    /**
     * A function to filter date time
     * @param {?} filter
     * @return {?}
     */
    set owlDateTimeFilter(filter) {
        this._dateTimeFilter = filter;
        this.validatorOnChange();
    }
    /**
     * @return {?}
     */
    get dateTimeFilter() {
        return this._dateTimeFilter;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = coerceBooleanProperty(value);
        /** @type {?} */
        const element = this.elmRef.nativeElement;
        if (this._disabled !== newValue) {
            this._disabled = newValue;
            this.disabledChange.emit(newValue);
        }
        // We need to null check the `blur` method, because it's undefined during SSR.
        if (newValue && element.blur) {
            // Normally, native input elements automatically blur if they turn disabled. This behavior
            // is problematic, because it would mean that it triggers another change detection cycle,
            // which then causes a changed after checked error if the input element was focused before.
            element.blur();
        }
    }
    /**
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
        this.validatorOnChange();
    }
    /**
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
        this.validatorOnChange();
    }
    /**
     * @return {?}
     */
    get selectMode() {
        return this._selectMode;
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    set selectMode(mode) {
        if (mode !== 'single' &&
            mode !== 'range' &&
            mode !== 'rangeFrom' &&
            mode !== 'rangeTo') {
            throw Error('OwlDateTime Error: invalid selectMode value!');
        }
        this._selectMode = mode;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        value = this.dateTimeAdapter.deserialize(value);
        this.lastValueValid = !value || this.dateTimeAdapter.isValid(value);
        value = this.getValidDate(value);
        /** @type {?} */
        const oldDate = this._value;
        this._value = value;
        // set the input property 'value'
        this.formatNativeInputValue();
        // check if the input value changed
        if (!this.dateTimeAdapter.isEqual(oldDate, value)) {
            this.valueChange.emit(value);
        }
    }
    /**
     * @return {?}
     */
    get values() {
        return this._values;
    }
    /**
     * @param {?} values
     * @return {?}
     */
    set values(values) {
        if (values && values.length > 0) {
            this._values = values.map((/**
             * @param {?} v
             * @return {?}
             */
            v => {
                v = this.dateTimeAdapter.deserialize(v);
                return this.getValidDate(v);
            }));
            this.lastValueValid =
                (!this._values[0] ||
                    this.dateTimeAdapter.isValid(this._values[0])) &&
                    (!this._values[1] ||
                        this.dateTimeAdapter.isValid(this._values[1]));
        }
        else {
            this._values = [];
            this.lastValueValid = true;
        }
        // set the input property 'value'
        this.formatNativeInputValue();
        this.valueChange.emit(this._values);
    }
    /**
     * @return {?}
     */
    get elementRef() {
        return this.elmRef;
    }
    /**
     * @return {?}
     */
    get isInSingleMode() {
        return this._selectMode === 'single';
    }
    /**
     * @return {?}
     */
    get isInRangeMode() {
        return (this._selectMode === 'range' ||
            this._selectMode === 'rangeFrom' ||
            this._selectMode === 'rangeTo');
    }
    /**
     * @return {?}
     */
    get owlDateTimeInputAriaHaspopup() {
        return true;
    }
    /**
     * @return {?}
     */
    get owlDateTimeInputAriaOwns() {
        return (this.dtPicker.opened && this.dtPicker.id) || null;
    }
    /**
     * @return {?}
     */
    get minIso8601() {
        return this.min ? this.dateTimeAdapter.toIso8601(this.min) : null;
    }
    /**
     * @return {?}
     */
    get maxIso8601() {
        return this.max ? this.dateTimeAdapter.toIso8601(this.max) : null;
    }
    /**
     * @return {?}
     */
    get owlDateTimeInputDisabled() {
        return this.disabled;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.dtPicker) {
            throw Error(`OwlDateTimePicker: the picker input doesn't have any associated owl-date-time component`);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.dtPickerSub = this.dtPicker.confirmSelectedChange.subscribe((/**
         * @param {?} selecteds
         * @return {?}
         */
        (selecteds) => {
            if (Array.isArray(selecteds)) {
                this.values = selecteds;
            }
            else {
                this.value = selecteds;
            }
            this.onModelChange(selecteds);
            this.onModelTouched();
            this.dateTimeChange.emit({
                source: this,
                value: selecteds,
                input: this.elmRef.nativeElement
            });
            this.dateTimeInput.emit({
                source: this,
                value: selecteds,
                input: this.elmRef.nativeElement
            });
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.dtPickerSub.unsubscribe();
        this.localeSub.unsubscribe();
        this.valueChange.complete();
        this.disabledChange.complete();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.isInSingleMode) {
            this.value = value;
        }
        else {
            this.values = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        return this.validator ? this.validator(c) : null;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) {
        this.validatorOnChange = fn;
    }
    /**
     * Open the picker when user hold alt + DOWN_ARROW
     *
     * @param {?} event
     * @return {?}
     */
    handleKeydownOnHost(event) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this.dtPicker.open();
            event.preventDefault();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleBlurOnHost(event) {
        this.onModelTouched();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleInputOnHost(event) {
        /** @type {?} */
        let value = event.target.value;
        if (this._selectMode === 'single') {
            this.changeInputInSingleMode(value);
        }
        else if (this._selectMode === 'range') {
            this.changeInputInRangeMode(value);
        }
        else {
            this.changeInputInRangeFromToMode(value);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleChangeOnHost(event) {
        /** @type {?} */
        let v;
        if (this.isInSingleMode) {
            v = this.value;
        }
        else if (this.isInRangeMode) {
            v = this.values;
        }
        this.dateTimeChange.emit({
            source: this,
            value: v,
            input: this.elmRef.nativeElement
        });
    }
    /**
     * Set the native input property 'value'
     * @return {?}
     */
    formatNativeInputValue() {
        if (this.isInSingleMode) {
            this.renderer.setProperty(this.elmRef.nativeElement, 'value', this._value
                ? this.dateTimeAdapter.format(this._value, this.dtPicker.formatString)
                : '');
        }
        else if (this.isInRangeMode) {
            if (this._values && this.values.length > 0) {
                /** @type {?} */
                const from = this._values[0];
                /** @type {?} */
                const to = this._values[1];
                /** @type {?} */
                const fromFormatted = from
                    ? this.dateTimeAdapter.format(from, this.dtPicker.formatString)
                    : '';
                /** @type {?} */
                const toFormatted = to
                    ? this.dateTimeAdapter.format(to, this.dtPicker.formatString)
                    : '';
                if (!fromFormatted && !toFormatted) {
                    this.renderer.setProperty(this.elmRef.nativeElement, 'value', null);
                }
                else {
                    if (this._selectMode === 'range') {
                        this.renderer.setProperty(this.elmRef.nativeElement, 'value', fromFormatted +
                            ' ' +
                            this.rangeSeparator +
                            ' ' +
                            toFormatted);
                    }
                    else if (this._selectMode === 'rangeFrom') {
                        this.renderer.setProperty(this.elmRef.nativeElement, 'value', fromFormatted);
                    }
                    else if (this._selectMode === 'rangeTo') {
                        this.renderer.setProperty(this.elmRef.nativeElement, 'value', toFormatted);
                    }
                }
            }
            else {
                this.renderer.setProperty(this.elmRef.nativeElement, 'value', '');
            }
        }
        return;
    }
    /**
     * Register the relationship between this input and its picker component
     * @private
     * @param {?} picker
     * @return {?}
     */
    registerDateTimePicker(picker) {
        if (picker) {
            this.dtPicker = picker;
            this.dtPicker.registerInput(this);
        }
    }
    /**
     * Convert a given obj to a valid date object
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
     * Convert a time string to a date-time string
     * When pickerType is 'timer', the value in the picker's input is a time string.
     * The dateTimeAdapter parse fn could not parse a time string to a Date Object.
     * Therefore we need this fn to convert a time string to a date-time string.
     * @private
     * @param {?} timeString
     * @param {?} dateTime
     * @return {?}
     */
    convertTimeStringToDateTimeString(timeString, dateTime) {
        if (timeString) {
            /** @type {?} */
            const v = dateTime || this.dateTimeAdapter.now();
            /** @type {?} */
            const dateString = this.dateTimeAdapter.format(v, this.dateTimeFormats.datePickerInput);
            return dateString + ' ' + timeString;
        }
        else {
            return null;
        }
    }
    /**
     * Handle input change in single mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    changeInputInSingleMode(inputValue) {
        /** @type {?} */
        let value = inputValue;
        if (this.dtPicker.pickerType === 'timer') {
            value = this.convertTimeStringToDateTimeString(value, this.value);
        }
        /** @type {?} */
        let result = this.dateTimeAdapter.parse(value, this.dateTimeFormats.parseInput);
        this.lastValueValid = !result || this.dateTimeAdapter.isValid(result);
        result = this.getValidDate(result);
        // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
        // result equals to null means there is input event, but the input value is invalid
        if (!this.isSameValue(result, this._value) || result === null) {
            this._value = result;
            this.valueChange.emit(result);
            this.onModelChange(result);
            this.dateTimeInput.emit({
                source: this,
                value: result,
                input: this.elmRef.nativeElement
            });
        }
    }
    /**
     * Handle input change in rangeFrom or rangeTo mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    changeInputInRangeFromToMode(inputValue) {
        /** @type {?} */
        let originalValue = this._selectMode === 'rangeFrom'
            ? this._values[0]
            : this._values[1];
        if (this.dtPicker.pickerType === 'timer') {
            inputValue = this.convertTimeStringToDateTimeString(inputValue, originalValue);
        }
        /** @type {?} */
        let result = this.dateTimeAdapter.parse(inputValue, this.dateTimeFormats.parseInput);
        this.lastValueValid = !result || this.dateTimeAdapter.isValid(result);
        result = this.getValidDate(result);
        // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
        if ((this._selectMode === 'rangeFrom' &&
            this.isSameValue(result, this._values[0]) &&
            result) ||
            (this._selectMode === 'rangeTo' &&
                this.isSameValue(result, this._values[1]) &&
                result)) {
            return;
        }
        this._values =
            this._selectMode === 'rangeFrom'
                ? [result, this._values[1]]
                : [this._values[0], result];
        this.valueChange.emit(this._values);
        this.onModelChange(this._values);
        this.dateTimeInput.emit({
            source: this,
            value: this._values,
            input: this.elmRef.nativeElement
        });
    }
    /**
     * Handle input change in range mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    changeInputInRangeMode(inputValue) {
        /** @type {?} */
        const selecteds = inputValue.split(this.rangeSeparator);
        /** @type {?} */
        let fromString = selecteds[0];
        /** @type {?} */
        let toString = selecteds[1];
        if (this.dtPicker.pickerType === 'timer') {
            fromString = this.convertTimeStringToDateTimeString(fromString, this.values[0]);
            toString = this.convertTimeStringToDateTimeString(toString, this.values[1]);
        }
        /** @type {?} */
        let from = this.dateTimeAdapter.parse(fromString, this.dateTimeFormats.parseInput);
        /** @type {?} */
        let to = this.dateTimeAdapter.parse(toString, this.dateTimeFormats.parseInput);
        this.lastValueValid =
            (!from || this.dateTimeAdapter.isValid(from)) &&
                (!to || this.dateTimeAdapter.isValid(to));
        from = this.getValidDate(from);
        to = this.getValidDate(to);
        // if the newValue is the same as the oldValue, we intend to not fire the valueChange event
        if (!this.isSameValue(from, this._values[0]) ||
            !this.isSameValue(to, this._values[1]) ||
            (from === null && to === null)) {
            this._values = [from, to];
            this.valueChange.emit(this._values);
            this.onModelChange(this._values);
            this.dateTimeInput.emit({
                source: this,
                value: this._values,
                input: this.elmRef.nativeElement
            });
        }
    }
    /**
     * Check if the two value is the same
     * @private
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    isSameValue(first, second) {
        if (first && second) {
            return this.dateTimeAdapter.compare(first, second) === 0;
        }
        return first == second;
    }
}
OwlDateTimeInputDirective.decorators = [
    { type: Directive, args: [{
                selector: 'input[owlDateTime]',
                exportAs: 'owlDateTimeInput',
                host: {
                    '(keydown)': 'handleKeydownOnHost($event)',
                    '(blur)': 'handleBlurOnHost($event)',
                    '(input)': 'handleInputOnHost($event)',
                    '(change)': 'handleChangeOnHost($event)',
                    '[attr.aria-haspopup]': 'owlDateTimeInputAriaHaspopup',
                    '[attr.aria-owns]': 'owlDateTimeInputAriaOwns',
                    '[attr.min]': 'minIso8601',
                    '[attr.max]': 'maxIso8601',
                    '[disabled]': 'owlDateTimeInputDisabled'
                },
                providers: [
                    OWL_DATETIME_VALUE_ACCESSOR,
                    OWL_DATETIME_VALIDATORS,
                ],
            },] }
];
/** @nocollapse */
OwlDateTimeInputDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
];
OwlDateTimeInputDirective.propDecorators = {
    owlDateTime: [{ type: Input }],
    owlDateTimeFilter: [{ type: Input }],
    _disabled: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    selectMode: [{ type: Input }],
    rangeSeparator: [{ type: Input }],
    value: [{ type: Input }],
    values: [{ type: Input }],
    dateTimeChange: [{ type: Output }],
    dateTimeInput: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._dateTimeFilter;
    /**
     * Whether the date time picker's input is disabled.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._disabled;
    /**
     * The minimum valid date.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._min;
    /**
     * The maximum valid date.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._max;
    /**
     * The picker's select mode
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._selectMode;
    /**
     * The character to separate the 'from' and 'to' in input value
     * @type {?}
     */
    OwlDateTimeInputDirective.prototype.rangeSeparator;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._value;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype._values;
    /**
     * Callback to invoke when `change` event is fired on this `<input>`
     *
     * @type {?}
     */
    OwlDateTimeInputDirective.prototype.dateTimeChange;
    /**
     * Callback to invoke when an `input` event is fired on this `<input>`.
     *
     * @type {?}
     */
    OwlDateTimeInputDirective.prototype.dateTimeInput;
    /**
     * The date-time-picker that this input is associated with.
     * @type {?}
     */
    OwlDateTimeInputDirective.prototype.dtPicker;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.dtPickerSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.localeSub;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.lastValueValid;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.onModelChange;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.onModelTouched;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.validatorOnChange;
    /**
     * The form control validator for whether the input parses.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.parseValidator;
    /**
     * The form control validator for the min date.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.minValidator;
    /**
     * The form control validator for the max date.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.maxValidator;
    /**
     * The form control validator for the date filter.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.filterValidator;
    /**
     * The form control validator for the range.
     * Check whether the 'before' value is before the 'to' value
     *
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.rangeValidator;
    /**
     * The combined form control validator for this input.
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.validator;
    /**
     * Emits when the value changes (either due to user input or programmatic change).
     * @type {?}
     */
    OwlDateTimeInputDirective.prototype.valueChange;
    /**
     * Emits when the disabled state has changed
     * @type {?}
     */
    OwlDateTimeInputDirective.prototype.disabledChange;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInputDirective.prototype.dateTimeFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLWlucHV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUVILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxhQUFhLEVBQ2IsaUJBQWlCLEVBSWpCLFVBQVUsRUFDYixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILHFCQUFxQixFQUV4QixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRTlELE1BQU0sT0FBTywyQkFBMkIsR0FBUTtJQUM1QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsRUFBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNkOztBQUVELE1BQU0sT0FBTyx1QkFBdUIsR0FBUTtJQUN4QyxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMseUJBQXlCLEVBQUM7SUFDeEQsS0FBSyxFQUFFLElBQUk7Q0FD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aWNrZXItaW5wdXQuZGlyZWN0aXZlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEFmdGVyQ29udGVudEluaXQsXHJcbiAgICBEaXJlY3RpdmUsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgZm9yd2FyZFJlZixcclxuICAgIEluamVjdCxcclxuICAgIElucHV0LFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3B0aW9uYWwsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICAgIEFic3RyYWN0Q29udHJvbCxcclxuICAgIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxyXG4gICAgTkdfVkFMSURBVE9SUyxcclxuICAgIE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgVmFsaWRhdGlvbkVycm9ycyxcclxuICAgIFZhbGlkYXRvcixcclxuICAgIFZhbGlkYXRvckZuLFxyXG4gICAgVmFsaWRhdG9yc1xyXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRE9XTl9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XHJcbmltcG9ydCB7IE93bERhdGVUaW1lQ29tcG9uZW50IH0gZnJvbSAnLi9kYXRlLXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERhdGVUaW1lQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlci9kYXRlLXRpbWUtYWRhcHRlci5jbGFzcyc7XHJcbmltcG9ydCB7XHJcbiAgICBPV0xfREFURV9USU1FX0ZPUk1BVFMsXHJcbiAgICBPd2xEYXRlVGltZUZvcm1hdHNcclxufSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZWxlY3RNb2RlIH0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xyXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xyXG5cclxuZXhwb3J0IGNvbnN0IE9XTF9EQVRFVElNRV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgT1dMX0RBVEVUSU1FX1ZBTElEQVRPUlM6IGFueSA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBPd2xEYXRlVGltZUlucHV0RGlyZWN0aXZlKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnaW5wdXRbb3dsRGF0ZVRpbWVdJyxcclxuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVJbnB1dCcsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJyhrZXlkb3duKSc6ICdoYW5kbGVLZXlkb3duT25Ib3N0KCRldmVudCknLFxyXG4gICAgICAgICcoYmx1ciknOiAnaGFuZGxlQmx1ck9uSG9zdCgkZXZlbnQpJyxcclxuICAgICAgICAnKGlucHV0KSc6ICdoYW5kbGVJbnB1dE9uSG9zdCgkZXZlbnQpJyxcclxuICAgICAgICAnKGNoYW5nZSknOiAnaGFuZGxlQ2hhbmdlT25Ib3N0KCRldmVudCknLFxyXG4gICAgICAgICdbYXR0ci5hcmlhLWhhc3BvcHVwXSc6ICdvd2xEYXRlVGltZUlucHV0QXJpYUhhc3BvcHVwJyxcclxuICAgICAgICAnW2F0dHIuYXJpYS1vd25zXSc6ICdvd2xEYXRlVGltZUlucHV0QXJpYU93bnMnLFxyXG4gICAgICAgICdbYXR0ci5taW5dJzogJ21pbklzbzg2MDEnLFxyXG4gICAgICAgICdbYXR0ci5tYXhdJzogJ21heElzbzg2MDEnLFxyXG4gICAgICAgICdbZGlzYWJsZWRdJzogJ293bERhdGVUaW1lSW5wdXREaXNhYmxlZCdcclxuICAgIH0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBPV0xfREFURVRJTUVfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgICAgT1dMX0RBVEVUSU1FX1ZBTElEQVRPUlMsXHJcbiAgICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZTxUPlxyXG4gICAgaW1wbGVtZW50c1xyXG4gICAgICAgIE9uSW5pdCxcclxuICAgICAgICBBZnRlckNvbnRlbnRJbml0LFxyXG4gICAgICAgIE9uRGVzdHJveSxcclxuICAgICAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICAgICAgICBWYWxpZGF0b3Ige1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZGF0ZSB0aW1lIHBpY2tlciB0aGF0IHRoaXMgaW5wdXQgaXMgYXNzb2NpYXRlZCB3aXRoLlxyXG4gICAgICogKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgb3dsRGF0ZVRpbWUodmFsdWU6IE93bERhdGVUaW1lQ29tcG9uZW50PFQ+KSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckRhdGVUaW1lUGlja2VyKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgZnVuY3Rpb24gdG8gZmlsdGVyIGRhdGUgdGltZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IG93bERhdGVUaW1lRmlsdGVyKGZpbHRlcjogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0ZVRpbWVGaWx0ZXIgPSBmaWx0ZXI7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2RhdGVUaW1lRmlsdGVyOiAoZGF0ZTogVCB8IG51bGwpID0+IGJvb2xlYW47XHJcbiAgICBnZXQgZGF0ZVRpbWVGaWx0ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVUaW1lRmlsdGVyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBXaGV0aGVyIHRoZSBkYXRlIHRpbWUgcGlja2VyJ3MgaW5wdXQgaXMgZGlzYWJsZWQuICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBnZXQgZGlzYWJsZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fZGlzYWJsZWQgIT09IG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZWRDaGFuZ2UuZW1pdChuZXdWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBXZSBuZWVkIHRvIG51bGwgY2hlY2sgdGhlIGBibHVyYCBtZXRob2QsIGJlY2F1c2UgaXQncyB1bmRlZmluZWQgZHVyaW5nIFNTUi5cclxuICAgICAgICBpZiAobmV3VmFsdWUgJiYgZWxlbWVudC5ibHVyKSB7XHJcbiAgICAgICAgICAgIC8vIE5vcm1hbGx5LCBuYXRpdmUgaW5wdXQgZWxlbWVudHMgYXV0b21hdGljYWxseSBibHVyIGlmIHRoZXkgdHVybiBkaXNhYmxlZC4gVGhpcyBiZWhhdmlvclxyXG4gICAgICAgICAgICAvLyBpcyBwcm9ibGVtYXRpYywgYmVjYXVzZSBpdCB3b3VsZCBtZWFuIHRoYXQgaXQgdHJpZ2dlcnMgYW5vdGhlciBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlLFxyXG4gICAgICAgICAgICAvLyB3aGljaCB0aGVuIGNhdXNlcyBhIGNoYW5nZWQgYWZ0ZXIgY2hlY2tlZCBlcnJvciBpZiB0aGUgaW5wdXQgZWxlbWVudCB3YXMgZm9jdXNlZCBiZWZvcmUuXHJcbiAgICAgICAgICAgIGVsZW1lbnQuYmx1cigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIG1pbmltdW0gdmFsaWQgZGF0ZS4gKi9cclxuICAgIHByaXZhdGUgX21pbjogVCB8IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IG1pbigpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWluKHZhbHVlOiBUIHwgbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX21pbiA9IHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgbWF4aW11bSB2YWxpZCBkYXRlLiAqL1xyXG4gICAgcHJpdmF0ZSBfbWF4OiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgbWF4KCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBtYXgodmFsdWU6IFQgfCBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5fbWF4ID0gdGhpcy5nZXRWYWxpZERhdGUodGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcGlja2VyJ3Mgc2VsZWN0IG1vZGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2VsZWN0TW9kZTogU2VsZWN0TW9kZSA9ICdzaW5nbGUnO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBzZWxlY3RNb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZWxlY3RNb2RlKG1vZGU6IFNlbGVjdE1vZGUpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIG1vZGUgIT09ICdzaW5nbGUnICYmXHJcbiAgICAgICAgICAgIG1vZGUgIT09ICdyYW5nZScgJiZcclxuICAgICAgICAgICAgbW9kZSAhPT0gJ3JhbmdlRnJvbScgJiZcclxuICAgICAgICAgICAgbW9kZSAhPT0gJ3JhbmdlVG8nXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdPd2xEYXRlVGltZSBFcnJvcjogaW52YWxpZCBzZWxlY3RNb2RlIHZhbHVlIScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9IG1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY2hhcmFjdGVyIHRvIHNlcGFyYXRlIHRoZSAnZnJvbScgYW5kICd0bycgaW4gaW5wdXQgdmFsdWVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHJhbmdlU2VwYXJhdG9yID0gJ34nO1xyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlOiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgdmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB2YWx1ZSh2YWx1ZTogVCB8IG51bGwpIHtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcclxuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gIXZhbHVlIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQodmFsdWUpO1xyXG4gICAgICAgIHZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUodmFsdWUpO1xyXG4gICAgICAgIGNvbnN0IG9sZERhdGUgPSB0aGlzLl92YWx1ZTtcclxuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG5cclxuICAgICAgICAvLyBzZXQgdGhlIGlucHV0IHByb3BlcnR5ICd2YWx1ZSdcclxuICAgICAgICB0aGlzLmZvcm1hdE5hdGl2ZUlucHV0VmFsdWUoKTtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGlucHV0IHZhbHVlIGNoYW5nZWRcclxuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzRXF1YWwob2xkRGF0ZSwgdmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlczogVFtdID0gW107XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHZhbHVlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCB2YWx1ZXModmFsdWVzOiBUW10pIHtcclxuICAgICAgICBpZiAodmFsdWVzICYmIHZhbHVlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcy5tYXAodiA9PiB7XHJcbiAgICAgICAgICAgICAgICB2ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUodik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRWYWxpZERhdGUodik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID1cclxuICAgICAgICAgICAgICAgICghdGhpcy5fdmFsdWVzWzBdIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZCh0aGlzLl92YWx1ZXNbMF0pKSAmJlxyXG4gICAgICAgICAgICAgICAgKCF0aGlzLl92YWx1ZXNbMV0gfHxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKHRoaXMuX3ZhbHVlc1sxXSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNldCB0aGUgaW5wdXQgcHJvcGVydHkgJ3ZhbHVlJ1xyXG4gICAgICAgIHRoaXMuZm9ybWF0TmF0aXZlSW5wdXRWYWx1ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5fdmFsdWVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGBjaGFuZ2VgIGV2ZW50IGlzIGZpcmVkIG9uIHRoaXMgYDxpbnB1dD5gXHJcbiAgICAgKiAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBkYXRlVGltZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYW4gYGlucHV0YCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YC5cclxuICAgICAqICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIGRhdGVUaW1lSW5wdXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBnZXQgZWxlbWVudFJlZigpOiBFbGVtZW50UmVmIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbG1SZWY7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZVRvJ1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFRoZSBkYXRlLXRpbWUtcGlja2VyIHRoYXQgdGhpcyBpbnB1dCBpcyBhc3NvY2lhdGVkIHdpdGguICovXHJcbiAgICBwdWJsaWMgZHRQaWNrZXI6IE93bERhdGVUaW1lQ29tcG9uZW50PFQ+O1xyXG5cclxuICAgIHByaXZhdGUgZHRQaWNrZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuICAgIHByaXZhdGUgbG9jYWxlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gICAgcHJpdmF0ZSBsYXN0VmFsdWVWYWxpZCA9IHRydWU7XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG4gICAgcHJpdmF0ZSBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuICAgIHByaXZhdGUgdmFsaWRhdG9yT25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcblxyXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB3aGV0aGVyIHRoZSBpbnB1dCBwYXJzZXMuICovXHJcbiAgICBwcml2YXRlIHBhcnNlVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9ICgpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGFzdFZhbHVlVmFsaWRcclxuICAgICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICAgIDogeyBvd2xEYXRlVGltZVBhcnNlOiB7IHRleHQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgfSB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtaW4gZGF0ZS4gKi9cclxuICAgIHByaXZhdGUgbWluVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChcclxuICAgICAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2xcclxuICAgICk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcclxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZShcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5taW4gfHxcclxuICAgICAgICAgICAgICAgICFjb250cm9sVmFsdWUgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUodGhpcy5taW4sIGNvbnRyb2xWYWx1ZSkgPD0gMFxyXG4gICAgICAgICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICAgICAgICA6IHsgb3dsRGF0ZVRpbWVNaW46IHsgbWluOiB0aGlzLm1pbiwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlICYmIGNvbnRyb2wudmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlRnJvbSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVswXSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlVG8gPSB0aGlzLmdldFZhbGlkRGF0ZShcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMV0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5taW4gfHxcclxuICAgICAgICAgICAgICAgICFjb250cm9sVmFsdWVGcm9tIHx8XHJcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlVG8gfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUodGhpcy5taW4sIGNvbnRyb2xWYWx1ZUZyb20pIDw9IDBcclxuICAgICAgICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgICAgICAgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBvd2xEYXRlVGltZU1pbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiBbY29udHJvbFZhbHVlRnJvbSwgY29udHJvbFZhbHVlVG9dXHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBtYXggZGF0ZS4gKi9cclxuICAgIHByaXZhdGUgbWF4VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChcclxuICAgICAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2xcclxuICAgICk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcclxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZShcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5tYXggfHxcclxuICAgICAgICAgICAgICAgICFjb250cm9sVmFsdWUgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUodGhpcy5tYXgsIGNvbnRyb2xWYWx1ZSkgPj0gMFxyXG4gICAgICAgICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICAgICAgICA6IHsgb3dsRGF0ZVRpbWVNYXg6IHsgbWF4OiB0aGlzLm1heCwgYWN0dWFsOiBjb250cm9sVmFsdWUgfSB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlICYmIGNvbnRyb2wudmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlRnJvbSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVswXSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlVG8gPSB0aGlzLmdldFZhbGlkRGF0ZShcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMV0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5tYXggfHxcclxuICAgICAgICAgICAgICAgICFjb250cm9sVmFsdWVGcm9tIHx8XHJcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlVG8gfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUodGhpcy5tYXgsIGNvbnRyb2xWYWx1ZVRvKSA+PSAwXHJcbiAgICAgICAgICAgICAgICA/IG51bGxcclxuICAgICAgICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgb3dsRGF0ZVRpbWVNYXg6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogW2NvbnRyb2xWYWx1ZUZyb20sIGNvbnRyb2xWYWx1ZVRvXVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgZGF0ZSBmaWx0ZXIuICovXHJcbiAgICBwcml2YXRlIGZpbHRlclZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoXHJcbiAgICAgICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sXHJcbiAgICApOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUoXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gIXRoaXMuX2RhdGVUaW1lRmlsdGVyIHx8XHJcbiAgICAgICAgICAgICFjb250cm9sVmFsdWUgfHxcclxuICAgICAgICAgICAgdGhpcy5fZGF0ZVRpbWVGaWx0ZXIoY29udHJvbFZhbHVlKVxyXG4gICAgICAgICAgICA/IG51bGxcclxuICAgICAgICAgICAgOiB7IG93bERhdGVUaW1lRmlsdGVyOiB0cnVlIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSByYW5nZS5cclxuICAgICAqIENoZWNrIHdoZXRoZXIgdGhlICdiZWZvcmUnIHZhbHVlIGlzIGJlZm9yZSB0aGUgJ3RvJyB2YWx1ZVxyXG4gICAgICogKi9cclxuICAgIHByaXZhdGUgcmFuZ2VWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKFxyXG4gICAgICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxyXG4gICAgKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlIHx8ICFjb250cm9sLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlRnJvbSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzBdKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgY29udHJvbFZhbHVlVG8gPSB0aGlzLmdldFZhbGlkRGF0ZShcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVsxXSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gIWNvbnRyb2xWYWx1ZUZyb20gfHxcclxuICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZVRvIHx8XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoY29udHJvbFZhbHVlRnJvbSwgY29udHJvbFZhbHVlVG8pIDw9IDBcclxuICAgICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICAgIDogeyBvd2xEYXRlVGltZVJhbmdlOiB0cnVlIH07XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBUaGUgY29tYmluZWQgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhpcyBpbnB1dC4gKi9cclxuICAgIHByaXZhdGUgdmFsaWRhdG9yOiBWYWxpZGF0b3JGbiB8IG51bGwgPSBWYWxpZGF0b3JzLmNvbXBvc2UoW1xyXG4gICAgICAgIHRoaXMucGFyc2VWYWxpZGF0b3IsXHJcbiAgICAgICAgdGhpcy5taW5WYWxpZGF0b3IsXHJcbiAgICAgICAgdGhpcy5tYXhWYWxpZGF0b3IsXHJcbiAgICAgICAgdGhpcy5maWx0ZXJWYWxpZGF0b3IsXHJcbiAgICAgICAgdGhpcy5yYW5nZVZhbGlkYXRvclxyXG4gICAgXSk7XHJcblxyXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMgKGVpdGhlciBkdWUgdG8gdXNlciBpbnB1dCBvciBwcm9ncmFtbWF0aWMgY2hhbmdlKS4gKi9cclxuICAgIHB1YmxpYyB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8VFtdIHwgVCB8IG51bGw+KCk7XHJcblxyXG4gICAgLyoqIEVtaXRzIHdoZW4gdGhlIGRpc2FibGVkIHN0YXRlIGhhcyBjaGFuZ2VkICovXHJcbiAgICBwdWJsaWMgZGlzYWJsZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gICAgZ2V0IG93bERhdGVUaW1lSW5wdXRBcmlhSGFzcG9wdXAoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERhdGVUaW1lSW5wdXRBcmlhT3ducygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5kdFBpY2tlci5vcGVuZWQgJiYgdGhpcy5kdFBpY2tlci5pZCkgfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluSXNvODYwMSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbiA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnRvSXNvODYwMSh0aGlzLm1pbikgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXhJc284NjAxKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4ID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIudG9Jc284NjAxKHRoaXMubWF4KSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERhdGVUaW1lSW5wdXREaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSBlbG1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUFkYXB0ZXI8VD4sXHJcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChPV0xfREFURV9USU1FX0ZPUk1BVFMpIHByaXZhdGUgZGF0ZVRpbWVGb3JtYXRzOiBPd2xEYXRlVGltZUZvcm1hdHMgKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lQWRhcHRlcikge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcclxuICAgICAgICAgICAgICAgIGBPd2xEYXRlVGltZVBpY2tlcjogTm8gcHJvdmlkZXIgZm91bmQgZm9yIERhdGVUaW1lUGlja2VyLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBmb2xsb3dpbmcgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290OiBPd2xOYXRpdmVEYXRlVGltZU1vZHVsZSwgT3dsTW9tZW50RGF0ZVRpbWVNb2R1bGUsIG9yIHByb3ZpZGUgYSBgICtcclxuICAgICAgICAgICAgICAgICAgICBgY3VzdG9tIGltcGxlbWVudGF0aW9uLmBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5kYXRlVGltZUZvcm1hdHMpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgT3dsRGF0ZVRpbWVQaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBPV0xfREFURV9USU1FX0ZPUk1BVFMuIFlvdSBtdXN0IGltcG9ydCBvbmUgb2YgdGhlIGZvbGxvd2luZyBgICtcclxuICAgICAgICAgICAgICAgICAgICBgbW9kdWxlcyBhdCB5b3VyIGFwcGxpY2F0aW9uIHJvb3Q6IE93bE5hdGl2ZURhdGVUaW1lTW9kdWxlLCBPd2xNb21lbnREYXRlVGltZU1vZHVsZSwgb3IgcHJvdmlkZSBhIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgIGBjdXN0b20gaW1wbGVtZW50YXRpb24uYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sb2NhbGVTdWIgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5sb2NhbGVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuZHRQaWNrZXIpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgT3dsRGF0ZVRpbWVQaWNrZXI6IHRoZSBwaWNrZXIgaW5wdXQgZG9lc24ndCBoYXZlIGFueSBhc3NvY2lhdGVkIG93bC1kYXRlLXRpbWUgY29tcG9uZW50YFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHRQaWNrZXJTdWIgPSB0aGlzLmR0UGlja2VyLmNvbmZpcm1TZWxlY3RlZENoYW5nZS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIChzZWxlY3RlZHM6IFRbXSB8IFQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdGVkcykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHNlbGVjdGVkcztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2Uoc2VsZWN0ZWRzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVDaGFuZ2UuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBzZWxlY3RlZHMsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUlucHV0LmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc2VsZWN0ZWRzLFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHRQaWNrZXJTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB0aGlzLmxvY2FsZVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuY29tcGxldGUoKTtcclxuICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLmNvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IgPyB0aGlzLnZhbGlkYXRvcihjKSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvck9uQ2hhbmdlID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBPcGVuIHRoZSBwaWNrZXIgd2hlbiB1c2VyIGhvbGQgYWx0ICsgRE9XTl9BUlJPV1xyXG4gICAgICogKi9cclxuICAgIHB1YmxpYyBoYW5kbGVLZXlkb3duT25Ib3N0KCBldmVudDogS2V5Ym9hcmRFdmVudCApOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQuYWx0S2V5ICYmIGV2ZW50LmtleUNvZGUgPT09IERPV05fQVJST1cpIHtcclxuICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5vcGVuKCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVCbHVyT25Ib3N0KCBldmVudDogRXZlbnQgKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVJbnB1dE9uSG9zdCggZXZlbnQ6IGFueSApOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdzaW5nbGUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW5wdXRJblNpbmdsZU1vZGUodmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJykge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUlucHV0SW5SYW5nZU1vZGUodmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSW5wdXRJblJhbmdlRnJvbVRvTW9kZSh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVDaGFuZ2VPbkhvc3QoIGV2ZW50OiBhbnkgKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCB2O1xyXG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XHJcbiAgICAgICAgICAgIHYgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XHJcbiAgICAgICAgICAgIHYgPSB0aGlzLnZhbHVlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVDaGFuZ2UuZW1pdCh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgICAgICAgdmFsdWU6IHYsXHJcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIG5hdGl2ZSBpbnB1dCBwcm9wZXJ0eSAndmFsdWUnXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmb3JtYXROYXRpdmVJbnB1dFZhbHVlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzSW5TaW5nbGVNb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgJ3ZhbHVlJyxcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5mb3JtYXRTdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICA6ICcnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzSW5SYW5nZU1vZGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ZhbHVlcyAmJiB0aGlzLnZhbHVlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmcm9tID0gdGhpcy5fdmFsdWVzWzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdG8gPSB0aGlzLl92YWx1ZXNbMV07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbUZvcm1hdHRlZCA9IGZyb21cclxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIuZm9ybWF0U3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgOiAnJztcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvRm9ybWF0dGVkID0gdG9cclxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0byxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0UGlja2VyLmZvcm1hdFN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIDogJyc7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFmcm9tRm9ybWF0dGVkICYmICF0b0Zvcm1hdHRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGxcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tRm9ybWF0dGVkICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFuZ2VTZXBhcmF0b3IgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Gb3JtYXR0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb21Gb3JtYXR0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZVRvJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b0Zvcm1hdHRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICcnXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciB0aGUgcmVsYXRpb25zaGlwIGJldHdlZW4gdGhpcyBpbnB1dCBhbmQgaXRzIHBpY2tlciBjb21wb25lbnRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSByZWdpc3RlckRhdGVUaW1lUGlja2VyKHBpY2tlcjogT3dsRGF0ZVRpbWVDb21wb25lbnQ8VD4pIHtcclxuICAgICAgICBpZiAocGlja2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIgPSBwaWNrZXI7XHJcbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIucmVnaXN0ZXJJbnB1dCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IGEgZ2l2ZW4gb2JqIHRvIGEgdmFsaWQgZGF0ZSBvYmplY3RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRWYWxpZERhdGUob2JqOiBhbnkpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiZcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChvYmopXHJcbiAgICAgICAgICAgID8gb2JqXHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnQgYSB0aW1lIHN0cmluZyB0byBhIGRhdGUtdGltZSBzdHJpbmdcclxuICAgICAqIFdoZW4gcGlja2VyVHlwZSBpcyAndGltZXInLCB0aGUgdmFsdWUgaW4gdGhlIHBpY2tlcidzIGlucHV0IGlzIGEgdGltZSBzdHJpbmcuXHJcbiAgICAgKiBUaGUgZGF0ZVRpbWVBZGFwdGVyIHBhcnNlIGZuIGNvdWxkIG5vdCBwYXJzZSBhIHRpbWUgc3RyaW5nIHRvIGEgRGF0ZSBPYmplY3QuXHJcbiAgICAgKiBUaGVyZWZvcmUgd2UgbmVlZCB0aGlzIGZuIHRvIGNvbnZlcnQgYSB0aW1lIHN0cmluZyB0byBhIGRhdGUtdGltZSBzdHJpbmcuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxyXG4gICAgICAgIHRpbWVTdHJpbmc6IHN0cmluZyxcclxuICAgICAgICBkYXRlVGltZTogVFxyXG4gICAgKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKHRpbWVTdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc3QgdiA9IGRhdGVUaW1lIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLm5vdygpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxyXG4gICAgICAgICAgICAgICAgdixcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLmRhdGVQaWNrZXJJbnB1dFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0ZVN0cmluZyArICcgJyArIHRpbWVTdHJpbmc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGlucHV0IGNoYW5nZSBpbiBzaW5nbGUgbW9kZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoYW5nZUlucHV0SW5TaW5nbGVNb2RlKGlucHV0VmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGlucHV0VmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuZHRQaWNrZXIucGlja2VyVHlwZSA9PT0gJ3RpbWVyJykge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKHZhbHVlLCB0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5wYXJzZShcclxuICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLnBhcnNlSW5wdXRcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMubGFzdFZhbHVlVmFsaWQgPSAhcmVzdWx0IHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQocmVzdWx0KTtcclxuICAgICAgICByZXN1bHQgPSB0aGlzLmdldFZhbGlkRGF0ZShyZXN1bHQpO1xyXG5cclxuICAgICAgICAvLyBpZiB0aGUgbmV3VmFsdWUgaXMgdGhlIHNhbWUgYXMgdGhlIG9sZFZhbHVlLCB3ZSBpbnRlbmQgdG8gbm90IGZpcmUgdGhlIHZhbHVlQ2hhbmdlIGV2ZW50XHJcbiAgICAgICAgLy8gcmVzdWx0IGVxdWFscyB0byBudWxsIG1lYW5zIHRoZXJlIGlzIGlucHV0IGV2ZW50LCBidXQgdGhlIGlucHV0IHZhbHVlIGlzIGludmFsaWRcclxuICAgICAgICBpZiAoIXRoaXMuaXNTYW1lVmFsdWUocmVzdWx0LCB0aGlzLl92YWx1ZSkgfHwgcmVzdWx0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQocmVzdWx0KTtcclxuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVJbnB1dC5lbWl0KHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgaW5wdXQgY2hhbmdlIGluIHJhbmdlRnJvbSBvciByYW5nZVRvIG1vZGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VJbnB1dEluUmFuZ2VGcm9tVG9Nb2RlKGlucHV0VmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBvcmlnaW5hbFZhbHVlID1cclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbSdcclxuICAgICAgICAgICAgICAgID8gdGhpcy5fdmFsdWVzWzBdXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuX3ZhbHVlc1sxXTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHRQaWNrZXIucGlja2VyVHlwZSA9PT0gJ3RpbWVyJykge1xyXG4gICAgICAgICAgICBpbnB1dFZhbHVlID0gdGhpcy5jb252ZXJ0VGltZVN0cmluZ1RvRGF0ZVRpbWVTdHJpbmcoXHJcbiAgICAgICAgICAgICAgICBpbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWYWx1ZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKFxyXG4gICAgICAgICAgICBpbnB1dFZhbHVlLFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gIXJlc3VsdCB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKHJlc3VsdCk7XHJcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5nZXRWYWxpZERhdGUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIG5ld1ZhbHVlIGlzIHRoZSBzYW1lIGFzIHRoZSBvbGRWYWx1ZSwgd2UgaW50ZW5kIHRvIG5vdCBmaXJlIHRoZSB2YWx1ZUNoYW5nZSBldmVudFxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2FtZVZhbHVlKHJlc3VsdCwgdGhpcy5fdmFsdWVzWzBdKSAmJlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0KSB8fFxyXG4gICAgICAgICAgICAodGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlVG8nICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2FtZVZhbHVlKHJlc3VsdCwgdGhpcy5fdmFsdWVzWzFdKSAmJlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0KVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl92YWx1ZXMgPVxyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJ1xyXG4gICAgICAgICAgICAgICAgPyBbcmVzdWx0LCB0aGlzLl92YWx1ZXNbMV1dXHJcbiAgICAgICAgICAgICAgICA6IFt0aGlzLl92YWx1ZXNbMF0sIHJlc3VsdF07XHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlcyk7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMuX3ZhbHVlcyk7XHJcbiAgICAgICAgdGhpcy5kYXRlVGltZUlucHV0LmVtaXQoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLl92YWx1ZXMsXHJcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgaW5wdXQgY2hhbmdlIGluIHJhbmdlIG1vZGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VJbnB1dEluUmFuZ2VNb2RlKGlucHV0VmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkcyA9IGlucHV0VmFsdWUuc3BsaXQodGhpcy5yYW5nZVNlcGFyYXRvcik7XHJcbiAgICAgICAgbGV0IGZyb21TdHJpbmcgPSBzZWxlY3RlZHNbMF07XHJcbiAgICAgICAgbGV0IHRvU3RyaW5nID0gc2VsZWN0ZWRzWzFdO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kdFBpY2tlci5waWNrZXJUeXBlID09PSAndGltZXInKSB7XHJcbiAgICAgICAgICAgIGZyb21TdHJpbmcgPSB0aGlzLmNvbnZlcnRUaW1lU3RyaW5nVG9EYXRlVGltZVN0cmluZyhcclxuICAgICAgICAgICAgICAgIGZyb21TdHJpbmcsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlc1swXVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0b1N0cmluZyA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxyXG4gICAgICAgICAgICAgICAgdG9TdHJpbmcsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlc1sxXVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZyb20gPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5wYXJzZShcclxuICAgICAgICAgICAgZnJvbVN0cmluZyxcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUZvcm1hdHMucGFyc2VJbnB1dFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbGV0IHRvID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIucGFyc2UoXHJcbiAgICAgICAgICAgIHRvU3RyaW5nLFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID1cclxuICAgICAgICAgICAgKCFmcm9tIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQoZnJvbSkpICYmXHJcbiAgICAgICAgICAgICghdG8gfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZCh0bykpO1xyXG4gICAgICAgIGZyb20gPSB0aGlzLmdldFZhbGlkRGF0ZShmcm9tKTtcclxuICAgICAgICB0byA9IHRoaXMuZ2V0VmFsaWREYXRlKHRvKTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIG5ld1ZhbHVlIGlzIHRoZSBzYW1lIGFzIHRoZSBvbGRWYWx1ZSwgd2UgaW50ZW5kIHRvIG5vdCBmaXJlIHRoZSB2YWx1ZUNoYW5nZSBldmVudFxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgIXRoaXMuaXNTYW1lVmFsdWUoZnJvbSwgdGhpcy5fdmFsdWVzWzBdKSB8fFxyXG4gICAgICAgICAgICAhdGhpcy5pc1NhbWVWYWx1ZSh0bywgdGhpcy5fdmFsdWVzWzFdKSB8fFxyXG4gICAgICAgICAgICAoZnJvbSA9PT0gbnVsbCAmJiB0byA9PT0gbnVsbClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gW2Zyb20sIHRvXTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlcyk7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLl92YWx1ZXMpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lSW5wdXQuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5fdmFsdWVzLFxyXG4gICAgICAgICAgICAgICAgaW5wdXQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIHR3byB2YWx1ZSBpcyB0aGUgc2FtZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzU2FtZVZhbHVlKGZpcnN0OiBUIHwgbnVsbCwgc2Vjb25kOiBUIHwgbnVsbCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChmaXJzdCAmJiBzZWNvbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmNvbXBhcmUoZmlyc3QsIHNlY29uZCkgPT09IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmlyc3QgPT0gc2Vjb25kO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==