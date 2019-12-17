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
export var OWL_DATETIME_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return OwlDateTimeInputDirective; })),
    multi: true
};
/** @type {?} */
export var OWL_DATETIME_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return OwlDateTimeInputDirective; })),
    multi: true
};
/**
 * @template T
 */
var OwlDateTimeInputDirective = /** @class */ (function () {
    function OwlDateTimeInputDirective(elmRef, renderer, dateTimeAdapter, dateTimeFormats) {
        var _this = this;
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
        function () { });
        this.onModelTouched = (/**
         * @return {?}
         */
        function () { });
        this.validatorOnChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * The form control validator for whether the input parses.
         */
        this.parseValidator = (/**
         * @return {?}
         */
        function () {
            return _this.lastValueValid
                ? null
                : { owlDateTimeParse: { text: _this.elmRef.nativeElement.value } };
        });
        /**
         * The form control validator for the min date.
         */
        this.minValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            if (_this.isInSingleMode) {
                /** @type {?} */
                var controlValue = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value));
                return !_this.min ||
                    !controlValue ||
                    _this.dateTimeAdapter.compare(_this.min, controlValue) <= 0
                    ? null
                    : { owlDateTimeMin: { min: _this.min, actual: controlValue } };
            }
            else if (_this.isInRangeMode && control.value) {
                /** @type {?} */
                var controlValueFrom = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[0]));
                /** @type {?} */
                var controlValueTo = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[1]));
                return !_this.min ||
                    !controlValueFrom ||
                    !controlValueTo ||
                    _this.dateTimeAdapter.compare(_this.min, controlValueFrom) <= 0
                    ? null
                    : {
                        owlDateTimeMin: {
                            min: _this.min,
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
        function (control) {
            if (_this.isInSingleMode) {
                /** @type {?} */
                var controlValue = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value));
                return !_this.max ||
                    !controlValue ||
                    _this.dateTimeAdapter.compare(_this.max, controlValue) >= 0
                    ? null
                    : { owlDateTimeMax: { max: _this.max, actual: controlValue } };
            }
            else if (_this.isInRangeMode && control.value) {
                /** @type {?} */
                var controlValueFrom = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[0]));
                /** @type {?} */
                var controlValueTo = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[1]));
                return !_this.max ||
                    !controlValueFrom ||
                    !controlValueTo ||
                    _this.dateTimeAdapter.compare(_this.max, controlValueTo) >= 0
                    ? null
                    : {
                        owlDateTimeMax: {
                            max: _this.max,
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
        function (control) {
            /** @type {?} */
            var controlValue = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value));
            return !_this._dateTimeFilter ||
                !controlValue ||
                _this._dateTimeFilter(controlValue)
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
        function (control) {
            if (_this.isInSingleMode || !control.value) {
                return null;
            }
            /** @type {?} */
            var controlValueFrom = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[0]));
            /** @type {?} */
            var controlValueTo = _this.getValidDate(_this.dateTimeAdapter.deserialize(control.value[1]));
            return !controlValueFrom ||
                !controlValueTo ||
                _this.dateTimeAdapter.compare(controlValueFrom, controlValueTo) <= 0
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
            throw Error("OwlDateTimePicker: No provider found for DateTimePicker. You must import one of the following " +
                "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                "custom implementation.");
        }
        if (!this.dateTimeFormats) {
            throw Error("OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following " +
                "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                "custom implementation.");
        }
        this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.value = _this.value;
        }));
    }
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTime", {
        /**
         * The date time picker that this input is associated with.
         * */
        set: /**
         * The date time picker that this input is associated with.
         *
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.registerDateTimePicker(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTimeFilter", {
        /**
         * A function to filter date time
         */
        set: /**
         * A function to filter date time
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            this._dateTimeFilter = filter;
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "dateTimeFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._dateTimeFilter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = coerceBooleanProperty(value);
            /** @type {?} */
            var element = this.elmRef.nativeElement;
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "min", {
        get: /**
         * @return {?}
         */
        function () {
            return this._min;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "max", {
        get: /**
         * @return {?}
         */
        function () {
            return this._max;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
            this.validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "selectMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectMode;
        },
        set: /**
         * @param {?} mode
         * @return {?}
         */
        function (mode) {
            if (mode !== 'single' &&
                mode !== 'range' &&
                mode !== 'rangeFrom' &&
                mode !== 'rangeTo') {
                throw Error('OwlDateTime Error: invalid selectMode value!');
            }
            this._selectMode = mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this.dateTimeAdapter.deserialize(value);
            this.lastValueValid = !value || this.dateTimeAdapter.isValid(value);
            value = this.getValidDate(value);
            /** @type {?} */
            var oldDate = this._value;
            this._value = value;
            // set the input property 'value'
            this.formatNativeInputValue();
            // check if the input value changed
            if (!this.dateTimeAdapter.isEqual(oldDate, value)) {
                this.valueChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "values", {
        get: /**
         * @return {?}
         */
        function () {
            return this._values;
        },
        set: /**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            var _this = this;
            if (values && values.length > 0) {
                this._values = values.map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) {
                    v = _this.dateTimeAdapter.deserialize(v);
                    return _this.getValidDate(v);
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "elementRef", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elmRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "isInRangeMode", {
        get: /**
         * @return {?}
         */
        function () {
            return (this._selectMode === 'range' ||
                this._selectMode === 'rangeFrom' ||
                this._selectMode === 'rangeTo');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTimeInputAriaHaspopup", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTimeInputAriaOwns", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.dtPicker.opened && this.dtPicker.id) || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "minIso8601", {
        get: /**
         * @return {?}
         */
        function () {
            return this.min ? this.dateTimeAdapter.toIso8601(this.min) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "maxIso8601", {
        get: /**
         * @return {?}
         */
        function () {
            return this.max ? this.dateTimeAdapter.toIso8601(this.max) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlDateTimeInputDirective.prototype, "owlDateTimeInputDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.dtPicker) {
            throw Error("OwlDateTimePicker: the picker input doesn't have any associated owl-date-time component");
        }
    };
    /**
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.dtPickerSub = this.dtPicker.confirmSelectedChange.subscribe((/**
         * @param {?} selecteds
         * @return {?}
         */
        function (selecteds) {
            if (Array.isArray(selecteds)) {
                _this.values = selecteds;
            }
            else {
                _this.value = selecteds;
            }
            _this.onModelChange(selecteds);
            _this.onModelTouched();
            _this.dateTimeChange.emit({
                source: _this,
                value: selecteds,
                input: _this.elmRef.nativeElement
            });
            _this.dateTimeInput.emit({
                source: _this,
                value: selecteds,
                input: _this.elmRef.nativeElement
            });
        }));
    };
    /**
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.dtPickerSub.unsubscribe();
        this.localeSub.unsubscribe();
        this.valueChange.complete();
        this.disabledChange.complete();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isInSingleMode) {
            this.value = value;
        }
        else {
            this.values = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onModelTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} c
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this.validator ? this.validator(c) : null;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.validatorOnChange = fn;
    };
    /**
     * Open the picker when user hold alt + DOWN_ARROW
     * */
    /**
     * Open the picker when user hold alt + DOWN_ARROW
     *
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.handleKeydownOnHost = /**
     * Open the picker when user hold alt + DOWN_ARROW
     *
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this.dtPicker.open();
            event.preventDefault();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.handleBlurOnHost = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onModelTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.handleInputOnHost = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var value = event.target.value;
        if (this._selectMode === 'single') {
            this.changeInputInSingleMode(value);
        }
        else if (this._selectMode === 'range') {
            this.changeInputInRangeMode(value);
        }
        else {
            this.changeInputInRangeFromToMode(value);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.handleChangeOnHost = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var v;
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
    };
    /**
     * Set the native input property 'value'
     */
    /**
     * Set the native input property 'value'
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.formatNativeInputValue = /**
     * Set the native input property 'value'
     * @return {?}
     */
    function () {
        if (this.isInSingleMode) {
            this.renderer.setProperty(this.elmRef.nativeElement, 'value', this._value
                ? this.dateTimeAdapter.format(this._value, this.dtPicker.formatString)
                : '');
        }
        else if (this.isInRangeMode) {
            if (this._values && this.values.length > 0) {
                /** @type {?} */
                var from = this._values[0];
                /** @type {?} */
                var to = this._values[1];
                /** @type {?} */
                var fromFormatted = from
                    ? this.dateTimeAdapter.format(from, this.dtPicker.formatString)
                    : '';
                /** @type {?} */
                var toFormatted = to
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
    };
    /**
     * Register the relationship between this input and its picker component
     */
    /**
     * Register the relationship between this input and its picker component
     * @private
     * @param {?} picker
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.registerDateTimePicker = /**
     * Register the relationship between this input and its picker component
     * @private
     * @param {?} picker
     * @return {?}
     */
    function (picker) {
        if (picker) {
            this.dtPicker = picker;
            this.dtPicker.registerInput(this);
        }
    };
    /**
     * Convert a given obj to a valid date object
     */
    /**
     * Convert a given obj to a valid date object
     * @private
     * @param {?} obj
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.getValidDate = /**
     * Convert a given obj to a valid date object
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
    /**
     * Convert a time string to a date-time string
     * When pickerType is 'timer', the value in the picker's input is a time string.
     * The dateTimeAdapter parse fn could not parse a time string to a Date Object.
     * Therefore we need this fn to convert a time string to a date-time string.
     */
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
    OwlDateTimeInputDirective.prototype.convertTimeStringToDateTimeString = /**
     * Convert a time string to a date-time string
     * When pickerType is 'timer', the value in the picker's input is a time string.
     * The dateTimeAdapter parse fn could not parse a time string to a Date Object.
     * Therefore we need this fn to convert a time string to a date-time string.
     * @private
     * @param {?} timeString
     * @param {?} dateTime
     * @return {?}
     */
    function (timeString, dateTime) {
        if (timeString) {
            /** @type {?} */
            var v = dateTime || this.dateTimeAdapter.now();
            /** @type {?} */
            var dateString = this.dateTimeAdapter.format(v, this.dateTimeFormats.datePickerInput);
            return dateString + ' ' + timeString;
        }
        else {
            return null;
        }
    };
    /**
     * Handle input change in single mode
     */
    /**
     * Handle input change in single mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.changeInputInSingleMode = /**
     * Handle input change in single mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        /** @type {?} */
        var value = inputValue;
        if (this.dtPicker.pickerType === 'timer') {
            value = this.convertTimeStringToDateTimeString(value, this.value);
        }
        /** @type {?} */
        var result = this.dateTimeAdapter.parse(value, this.dateTimeFormats.parseInput);
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
    };
    /**
     * Handle input change in rangeFrom or rangeTo mode
     */
    /**
     * Handle input change in rangeFrom or rangeTo mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.changeInputInRangeFromToMode = /**
     * Handle input change in rangeFrom or rangeTo mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        /** @type {?} */
        var originalValue = this._selectMode === 'rangeFrom'
            ? this._values[0]
            : this._values[1];
        if (this.dtPicker.pickerType === 'timer') {
            inputValue = this.convertTimeStringToDateTimeString(inputValue, originalValue);
        }
        /** @type {?} */
        var result = this.dateTimeAdapter.parse(inputValue, this.dateTimeFormats.parseInput);
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
    };
    /**
     * Handle input change in range mode
     */
    /**
     * Handle input change in range mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.changeInputInRangeMode = /**
     * Handle input change in range mode
     * @private
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        /** @type {?} */
        var selecteds = inputValue.split(this.rangeSeparator);
        /** @type {?} */
        var fromString = selecteds[0];
        /** @type {?} */
        var toString = selecteds[1];
        if (this.dtPicker.pickerType === 'timer') {
            fromString = this.convertTimeStringToDateTimeString(fromString, this.values[0]);
            toString = this.convertTimeStringToDateTimeString(toString, this.values[1]);
        }
        /** @type {?} */
        var from = this.dateTimeAdapter.parse(fromString, this.dateTimeFormats.parseInput);
        /** @type {?} */
        var to = this.dateTimeAdapter.parse(toString, this.dateTimeFormats.parseInput);
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
    };
    /**
     * Check if the two value is the same
     */
    /**
     * Check if the two value is the same
     * @private
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    OwlDateTimeInputDirective.prototype.isSameValue = /**
     * Check if the two value is the same
     * @private
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first, second) {
        if (first && second) {
            return this.dateTimeAdapter.compare(first, second) === 0;
        }
        return first == second;
    };
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
    OwlDateTimeInputDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DateTimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
    ]; };
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
    return OwlDateTimeInputDirective;
}());
export { OwlDateTimeInputDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUtcGlja2VyLWlucHV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUVILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHSCxhQUFhLEVBQ2IsaUJBQWlCLEVBSWpCLFVBQVUsRUFDYixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILHFCQUFxQixFQUV4QixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBRTlELE1BQU0sS0FBTywyQkFBMkIsR0FBUTtJQUM1QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxjQUFNLE9BQUEseUJBQXlCLEVBQXpCLENBQXlCLEVBQUM7SUFDeEQsS0FBSyxFQUFFLElBQUk7Q0FDZDs7QUFFRCxNQUFNLEtBQU8sdUJBQXVCLEdBQVE7SUFDeEMsT0FBTyxFQUFFLGFBQWE7SUFDdEIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLGNBQU0sT0FBQSx5QkFBeUIsRUFBekIsQ0FBeUIsRUFBQztJQUN4RCxLQUFL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QXFEOzs7Ozs7SUFNckQsOENBQzJCOzs7Ozs7SUF3QjNCLHlDQUF1Qjs7Ozs7O0lBWXZCLHlDQUF1Qjs7Ozs7O0lBY3ZCLGdEQUEyQzs7Ozs7SUFzQjNDLG1EQUNxQjs7Ozs7SUFFckIsMkNBQXlCOzs7OztJQXNCekIsNENBQTBCOzs7Ozs7SUErQjFCLG1EQUN5Qzs7Ozs7O0lBS3pDLGtEQUN3Qzs7Ozs7SUFtQnhDLDZDQUF5Qzs7Ozs7SUFFekMsZ0RBQXVEOzs7OztJQUN2RCw4Q0FBcUQ7Ozs7O0lBRXJELG1EQUE4Qjs7Ozs7SUFFOUIsa0RBQTJDOzs7OztJQUMzQyxtREFBNEM7Ozs7O0lBQzVDLHNEQUErQzs7Ozs7O0lBRy9DLG1EQUlFOzs7Ozs7SUFHRixpREErQkU7Ozs7OztJQUdGLGlEQStCRTs7Ozs7O0lBR0Ysb0RBV0U7Ozs7Ozs7O0lBTUYsbURBbUJFOzs7Ozs7SUFHRiw4Q0FNRzs7Ozs7SUFHSCxnREFBd0Q7Ozs7O0lBR3hELG1EQUFvRDs7Ozs7SUFzQnZDLDJDQUEwQjs7Ozs7SUFDbkMsNkNBQTJCOzs7OztJQUMzQixvREFBdUQ7Ozs7O0lBQ3ZELG9EQUFzRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBkYXRlLXRpbWUtcGlja2VyLWlucHV0LmRpcmVjdGl2ZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBBZnRlckNvbnRlbnRJbml0LFxyXG4gICAgRGlyZWN0aXZlLFxyXG4gICAgRWxlbWVudFJlZixcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIGZvcndhcmRSZWYsXHJcbiAgICBJbmplY3QsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE9uSW5pdCxcclxuICAgIE9wdGlvbmFsLFxyXG4gICAgT3V0cHV0LFxyXG4gICAgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7XHJcbiAgICBBYnN0cmFjdENvbnRyb2wsXHJcbiAgICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICAgIE5HX1ZBTElEQVRPUlMsXHJcbiAgICBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIFZhbGlkYXRpb25FcnJvcnMsXHJcbiAgICBWYWxpZGF0b3IsXHJcbiAgICBWYWxpZGF0b3JGbixcclxuICAgIFZhbGlkYXRvcnNcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERPV05fQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xyXG5pbXBvcnQgeyBPd2xEYXRlVGltZUNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xyXG5pbXBvcnQge1xyXG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxyXG4gICAgT3dsRGF0ZVRpbWVGb3JtYXRzXHJcbn0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcclxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuXHJcbmV4cG9ydCBjb25zdCBPV0xfREFURVRJTUVfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IE9XTF9EQVRFVElNRV9WQUxJREFUT1JTOiBhbnkgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ2lucHV0W293bERhdGVUaW1lXScsXHJcbiAgICBleHBvcnRBczogJ293bERhdGVUaW1lSW5wdXQnLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICcoa2V5ZG93biknOiAnaGFuZGxlS2V5ZG93bk9uSG9zdCgkZXZlbnQpJyxcclxuICAgICAgICAnKGJsdXIpJzogJ2hhbmRsZUJsdXJPbkhvc3QoJGV2ZW50KScsXHJcbiAgICAgICAgJyhpbnB1dCknOiAnaGFuZGxlSW5wdXRPbkhvc3QoJGV2ZW50KScsXHJcbiAgICAgICAgJyhjaGFuZ2UpJzogJ2hhbmRsZUNoYW5nZU9uSG9zdCgkZXZlbnQpJyxcclxuICAgICAgICAnW2F0dHIuYXJpYS1oYXNwb3B1cF0nOiAnb3dsRGF0ZVRpbWVJbnB1dEFyaWFIYXNwb3B1cCcsXHJcbiAgICAgICAgJ1thdHRyLmFyaWEtb3duc10nOiAnb3dsRGF0ZVRpbWVJbnB1dEFyaWFPd25zJyxcclxuICAgICAgICAnW2F0dHIubWluXSc6ICdtaW5Jc284NjAxJyxcclxuICAgICAgICAnW2F0dHIubWF4XSc6ICdtYXhJc284NjAxJyxcclxuICAgICAgICAnW2Rpc2FibGVkXSc6ICdvd2xEYXRlVGltZUlucHV0RGlzYWJsZWQnXHJcbiAgICB9LFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgT1dMX0RBVEVUSU1FX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICAgIE9XTF9EQVRFVElNRV9WQUxJREFUT1JTLFxyXG4gICAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmU8VD5cclxuICAgIGltcGxlbWVudHNcclxuICAgICAgICBPbkluaXQsXHJcbiAgICAgICAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICAgICAgICBPbkRlc3Ryb3ksXHJcbiAgICAgICAgQ29udHJvbFZhbHVlQWNjZXNzb3IsXHJcbiAgICAgICAgVmFsaWRhdG9yIHtcclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRhdGUgdGltZSBwaWNrZXIgdGhhdCB0aGlzIGlucHV0IGlzIGFzc29jaWF0ZWQgd2l0aC5cclxuICAgICAqICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IG93bERhdGVUaW1lKHZhbHVlOiBPd2xEYXRlVGltZUNvbXBvbmVudDxUPikge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJEYXRlVGltZVBpY2tlcih2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIGZ1bmN0aW9uIHRvIGZpbHRlciBkYXRlIHRpbWVcclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHNldCBvd2xEYXRlVGltZUZpbHRlcihmaWx0ZXI6IChkYXRlOiBUIHwgbnVsbCkgPT4gYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2RhdGVUaW1lRmlsdGVyID0gZmlsdGVyO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kYXRlVGltZUZpbHRlcjogKGRhdGU6IFQgfCBudWxsKSA9PiBib29sZWFuO1xyXG4gICAgZ2V0IGRhdGVUaW1lRmlsdGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlVGltZUZpbHRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKiogV2hldGhlciB0aGUgZGF0ZSB0aW1lIHBpY2tlcidzIGlucHV0IGlzIGRpc2FibGVkLiAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xyXG4gICAgZ2V0IGRpc2FibGVkKCkge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuX2Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2Rpc2FibGVkICE9PSBuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLmRpc2FibGVkQ2hhbmdlLmVtaXQobmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byBudWxsIGNoZWNrIHRoZSBgYmx1cmAgbWV0aG9kLCBiZWNhdXNlIGl0J3MgdW5kZWZpbmVkIGR1cmluZyBTU1IuXHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIGVsZW1lbnQuYmx1cikge1xyXG4gICAgICAgICAgICAvLyBOb3JtYWxseSwgbmF0aXZlIGlucHV0IGVsZW1lbnRzIGF1dG9tYXRpY2FsbHkgYmx1ciBpZiB0aGV5IHR1cm4gZGlzYWJsZWQuIFRoaXMgYmVoYXZpb3JcclxuICAgICAgICAgICAgLy8gaXMgcHJvYmxlbWF0aWMsIGJlY2F1c2UgaXQgd291bGQgbWVhbiB0aGF0IGl0IHRyaWdnZXJzIGFub3RoZXIgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSxcclxuICAgICAgICAgICAgLy8gd2hpY2ggdGhlbiBjYXVzZXMgYSBjaGFuZ2VkIGFmdGVyIGNoZWNrZWQgZXJyb3IgaWYgdGhlIGlucHV0IGVsZW1lbnQgd2FzIGZvY3VzZWQgYmVmb3JlLlxyXG4gICAgICAgICAgICBlbGVtZW50LmJsdXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFRoZSBtaW5pbXVtIHZhbGlkIGRhdGUuICovXHJcbiAgICBwcml2YXRlIF9taW46IFQgfCBudWxsO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBtaW4oKTogVCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1pbih2YWx1ZTogVCB8IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9taW4gPSB0aGlzLmdldFZhbGlkRGF0ZSh0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdG9yT25DaGFuZ2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIG1heGltdW0gdmFsaWQgZGF0ZS4gKi9cclxuICAgIHByaXZhdGUgX21heDogVCB8IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IG1heCgpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWF4KHZhbHVlOiBUIHwgbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX21heCA9IHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHBpY2tlcidzIHNlbGVjdCBtb2RlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NlbGVjdE1vZGU6IFNlbGVjdE1vZGUgPSAnc2luZ2xlJztcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgc2VsZWN0TW9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2VsZWN0TW9kZShtb2RlOiBTZWxlY3RNb2RlKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBtb2RlICE9PSAnc2luZ2xlJyAmJlxyXG4gICAgICAgICAgICBtb2RlICE9PSAncmFuZ2UnICYmXHJcbiAgICAgICAgICAgIG1vZGUgIT09ICdyYW5nZUZyb20nICYmXHJcbiAgICAgICAgICAgIG1vZGUgIT09ICdyYW5nZVRvJ1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignT3dsRGF0ZVRpbWUgRXJyb3I6IGludmFsaWQgc2VsZWN0TW9kZSB2YWx1ZSEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPSBtb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNoYXJhY3RlciB0byBzZXBhcmF0ZSB0aGUgJ2Zyb20nIGFuZCAndG8nIGluIGlucHV0IHZhbHVlXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICByYW5nZVNlcGFyYXRvciA9ICd+JztcclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZTogVCB8IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IFQgfCBudWxsKSB7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICF2YWx1ZSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKHZhbHVlKTtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKHZhbHVlKTtcclxuICAgICAgICBjb25zdCBvbGREYXRlID0gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgLy8gc2V0IHRoZSBpbnB1dCBwcm9wZXJ0eSAndmFsdWUnXHJcbiAgICAgICAgdGhpcy5mb3JtYXROYXRpdmVJbnB1dFZhbHVlKCk7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBpbnB1dCB2YWx1ZSBjaGFuZ2VkXHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0VxdWFsKG9sZERhdGUsIHZhbHVlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZXM6IFRbXSA9IFtdO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCB2YWx1ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWVzKHZhbHVlczogVFtdKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXMubWFwKHYgPT4ge1xyXG4gICAgICAgICAgICAgICAgdiA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHYpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsaWREYXRlKHYpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9XHJcbiAgICAgICAgICAgICAgICAoIXRoaXMuX3ZhbHVlc1swXSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQodGhpcy5fdmFsdWVzWzBdKSkgJiZcclxuICAgICAgICAgICAgICAgICghdGhpcy5fdmFsdWVzWzFdIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZCh0aGlzLl92YWx1ZXNbMV0pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZXQgdGhlIGlucHV0IHByb3BlcnR5ICd2YWx1ZSdcclxuICAgICAgICB0aGlzLmZvcm1hdE5hdGl2ZUlucHV0VmFsdWUoKTtcclxuXHJcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBgY2hhbmdlYCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YFxyXG4gICAgICogKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgZGF0ZVRpbWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGFuIGBpbnB1dGAgZXZlbnQgaXMgZmlyZWQgb24gdGhpcyBgPGlucHV0PmAuXHJcbiAgICAgKiAqL1xyXG4gICAgQE91dHB1dCgpXHJcbiAgICBkYXRlVGltZUlucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gICAgZ2V0IGVsZW1lbnRSZWYoKTogRWxlbWVudFJlZiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxtUmVmO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0luU2luZ2xlTW9kZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyB8fFxyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VUbydcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgZGF0ZS10aW1lLXBpY2tlciB0aGF0IHRoaXMgaW5wdXQgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xyXG4gICAgcHVibGljIGR0UGlja2VyOiBPd2xEYXRlVGltZUNvbXBvbmVudDxUPjtcclxuXHJcbiAgICBwcml2YXRlIGR0UGlja2VyU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcbiAgICBwcml2YXRlIGxvY2FsZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xyXG5cclxuICAgIHByaXZhdGUgbGFzdFZhbHVlVmFsaWQgPSB0cnVlO1xyXG5cclxuICAgIHByaXZhdGUgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuICAgIHByaXZhdGUgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcbiAgICBwcml2YXRlIHZhbGlkYXRvck9uQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG5cclxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3Igd2hldGhlciB0aGUgaW5wdXQgcGFyc2VzLiAqL1xyXG4gICAgcHJpdmF0ZSBwYXJzZVZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxhc3RWYWx1ZVZhbGlkXHJcbiAgICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgICA6IHsgb3dsRGF0ZVRpbWVQYXJzZTogeyB0ZXh0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LnZhbHVlIH0gfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgbWluIGRhdGUuICovXHJcbiAgICBwcml2YXRlIG1pblZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoXHJcbiAgICAgICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sXHJcbiAgICApOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMubWluIHx8XHJcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKHRoaXMubWluLCBjb250cm9sVmFsdWUpIDw9IDBcclxuICAgICAgICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgICAgICAgOiB7IG93bERhdGVUaW1lTWluOiB7IG1pbjogdGhpcy5taW4sIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSAmJiBjb250cm9sLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZUZyb20gPSB0aGlzLmdldFZhbGlkRGF0ZShcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMF0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZVRvID0gdGhpcy5nZXRWYWxpZERhdGUoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzFdKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMubWluIHx8XHJcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlRnJvbSB8fFxyXG4gICAgICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZVRvIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKHRoaXMubWluLCBjb250cm9sVmFsdWVGcm9tKSA8PSAwXHJcbiAgICAgICAgICAgICAgICA/IG51bGxcclxuICAgICAgICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgb3dsRGF0ZVRpbWVNaW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogW2NvbnRyb2xWYWx1ZUZyb20sIGNvbnRyb2xWYWx1ZVRvXVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgbWF4IGRhdGUuICovXHJcbiAgICBwcml2YXRlIG1heFZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoXHJcbiAgICAgICAgY29udHJvbDogQWJzdHJhY3RDb250cm9sXHJcbiAgICApOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNJblNpbmdsZU1vZGUpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5nZXRWYWxpZERhdGUoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMubWF4IHx8XHJcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKHRoaXMubWF4LCBjb250cm9sVmFsdWUpID49IDBcclxuICAgICAgICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgICAgICAgOiB7IG93bERhdGVUaW1lTWF4OiB7IG1heDogdGhpcy5tYXgsIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSAmJiBjb250cm9sLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZUZyb20gPSB0aGlzLmdldFZhbGlkRGF0ZShcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMF0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZVRvID0gdGhpcy5nZXRWYWxpZERhdGUoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlWzFdKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMubWF4IHx8XHJcbiAgICAgICAgICAgICAgICAhY29udHJvbFZhbHVlRnJvbSB8fFxyXG4gICAgICAgICAgICAgICAgIWNvbnRyb2xWYWx1ZVRvIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKHRoaXMubWF4LCBjb250cm9sVmFsdWVUbykgPj0gMFxyXG4gICAgICAgICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICAgICAgICA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgIG93bERhdGVUaW1lTWF4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IFtjb250cm9sVmFsdWVGcm9tLCBjb250cm9sVmFsdWVUb11cclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIGRhdGUgZmlsdGVyLiAqL1xyXG4gICAgcHJpdmF0ZSBmaWx0ZXJWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKFxyXG4gICAgICAgIGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbFxyXG4gICAgKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuZ2V0VmFsaWREYXRlKFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLl9kYXRlVGltZUZpbHRlciB8fFxyXG4gICAgICAgICAgICAhY29udHJvbFZhbHVlIHx8XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGVUaW1lRmlsdGVyKGNvbnRyb2xWYWx1ZSlcclxuICAgICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICAgIDogeyBvd2xEYXRlVGltZUZpbHRlcjogdHJ1ZSB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgcmFuZ2UuXHJcbiAgICAgKiBDaGVjayB3aGV0aGVyIHRoZSAnYmVmb3JlJyB2YWx1ZSBpcyBiZWZvcmUgdGhlICd0bycgdmFsdWVcclxuICAgICAqICovXHJcbiAgICBwcml2YXRlIHJhbmdlVmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChcclxuICAgICAgICBjb250cm9sOiBBYnN0cmFjdENvbnRyb2xcclxuICAgICk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcclxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSB8fCAhY29udHJvbC52YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZUZyb20gPSB0aGlzLmdldFZhbGlkRGF0ZShcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZVswXSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZVRvID0gdGhpcy5nZXRWYWxpZERhdGUoXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWVbMV0pXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICFjb250cm9sVmFsdWVGcm9tIHx8XHJcbiAgICAgICAgICAgICFjb250cm9sVmFsdWVUbyB8fFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGNvbnRyb2xWYWx1ZUZyb20sIGNvbnRyb2xWYWx1ZVRvKSA8PSAwXHJcbiAgICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgICA6IHsgb3dsRGF0ZVRpbWVSYW5nZTogdHJ1ZSB9O1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogVGhlIGNvbWJpbmVkIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoaXMgaW5wdXQuICovXHJcbiAgICBwcml2YXRlIHZhbGlkYXRvcjogVmFsaWRhdG9yRm4gfCBudWxsID0gVmFsaWRhdG9ycy5jb21wb3NlKFtcclxuICAgICAgICB0aGlzLnBhcnNlVmFsaWRhdG9yLFxyXG4gICAgICAgIHRoaXMubWluVmFsaWRhdG9yLFxyXG4gICAgICAgIHRoaXMubWF4VmFsaWRhdG9yLFxyXG4gICAgICAgIHRoaXMuZmlsdGVyVmFsaWRhdG9yLFxyXG4gICAgICAgIHRoaXMucmFuZ2VWYWxpZGF0b3JcclxuICAgIF0pO1xyXG5cclxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzIChlaXRoZXIgZHVlIHRvIHVzZXIgaW5wdXQgb3IgcHJvZ3JhbW1hdGljIGNoYW5nZSkuICovXHJcbiAgICBwdWJsaWMgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFRbXSB8IFQgfCBudWxsPigpO1xyXG5cclxuICAgIC8qKiBFbWl0cyB3aGVuIHRoZSBkaXNhYmxlZCBzdGF0ZSBoYXMgY2hhbmdlZCAqL1xyXG4gICAgcHVibGljIGRpc2FibGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAgIGdldCBvd2xEYXRlVGltZUlucHV0QXJpYUhhc3BvcHVwKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xEYXRlVGltZUlucHV0QXJpYU93bnMoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuZHRQaWNrZXIub3BlbmVkICYmIHRoaXMuZHRQaWNrZXIuaWQpIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1pbklzbzg2MDEoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5taW4gPyB0aGlzLmRhdGVUaW1lQWRhcHRlci50b0lzbzg2MDEodGhpcy5taW4pIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF4SXNvODYwMSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1heCA/IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnRvSXNvODYwMSh0aGlzLm1heCkgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xEYXRlVGltZUlucHV0RGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgZWxtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGRhdGVUaW1lQWRhcHRlcjogRGF0ZVRpbWVBZGFwdGVyPFQ+LFxyXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKSBwcml2YXRlIGRhdGVUaW1lRm9ybWF0czogT3dsRGF0ZVRpbWVGb3JtYXRzICkge1xyXG4gICAgICAgIGlmICghdGhpcy5kYXRlVGltZUFkYXB0ZXIpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgT3dsRGF0ZVRpbWVQaWNrZXI6IE5vIHByb3ZpZGVyIGZvdW5kIGZvciBEYXRlVGltZVBpY2tlci4gWW91IG11c3QgaW1wb3J0IG9uZSBvZiB0aGUgZm9sbG93aW5nIGAgK1xyXG4gICAgICAgICAgICAgICAgICAgIGBtb2R1bGVzIGF0IHlvdXIgYXBwbGljYXRpb24gcm9vdDogT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUsIE93bE1vbWVudERhdGVUaW1lTW9kdWxlLCBvciBwcm92aWRlIGEgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYGN1c3RvbSBpbXBsZW1lbnRhdGlvbi5gXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuZGF0ZVRpbWVGb3JtYXRzKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiBObyBwcm92aWRlciBmb3VuZCBmb3IgT1dMX0RBVEVfVElNRV9GT1JNQVRTLiBZb3UgbXVzdCBpbXBvcnQgb25lIG9mIHRoZSBmb2xsb3dpbmcgYCArXHJcbiAgICAgICAgICAgICAgICAgICAgYG1vZHVsZXMgYXQgeW91ciBhcHBsaWNhdGlvbiByb290OiBPd2xOYXRpdmVEYXRlVGltZU1vZHVsZSwgT3dsTW9tZW50RGF0ZVRpbWVNb2R1bGUsIG9yIHByb3ZpZGUgYSBgICtcclxuICAgICAgICAgICAgICAgICAgICBgY3VzdG9tIGltcGxlbWVudGF0aW9uLmBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubG9jYWxlU3ViID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIubG9jYWxlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmR0UGlja2VyKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgYE93bERhdGVUaW1lUGlja2VyOiB0aGUgcGlja2VyIGlucHV0IGRvZXNuJ3QgaGF2ZSBhbnkgYXNzb2NpYXRlZCBvd2wtZGF0ZS10aW1lIGNvbXBvbmVudGBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmR0UGlja2VyU3ViID0gdGhpcy5kdFBpY2tlci5jb25maXJtU2VsZWN0ZWRDaGFuZ2Uuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICAoc2VsZWN0ZWRzOiBUW10gfCBUKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3RlZHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSBzZWxlY3RlZHM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBzZWxlY3RlZHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHNlbGVjdGVkcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lQ2hhbmdlLmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc2VsZWN0ZWRzLFxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVJbnB1dC5lbWl0KHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHNlbGVjdGVkcyxcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmR0UGlja2VyU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgdGhpcy5sb2NhbGVTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZENoYW5nZS5jb21wbGV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmFsaWRhdGUoYzogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdG9yID8gdGhpcy52YWxpZGF0b3IoYykgOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0b3JPbkNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogT3BlbiB0aGUgcGlja2VyIHdoZW4gdXNlciBob2xkIGFsdCArIERPV05fQVJST1dcclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgaGFuZGxlS2V5ZG93bk9uSG9zdCggZXZlbnQ6IEtleWJvYXJkRXZlbnQgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmFsdEtleSAmJiBldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIub3BlbigpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFuZGxlQmx1ck9uSG9zdCggZXZlbnQ6IEV2ZW50ICk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFuZGxlSW5wdXRPbkhvc3QoIGV2ZW50OiBhbnkgKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RNb2RlID09PSAnc2luZ2xlJykge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUlucHV0SW5TaW5nbGVNb2RlKHZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZScpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VJbnB1dEluUmFuZ2VNb2RlKHZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUlucHV0SW5SYW5nZUZyb21Ub01vZGUodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFuZGxlQ2hhbmdlT25Ib3N0KCBldmVudDogYW55ICk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgdjtcclxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xyXG4gICAgICAgICAgICB2ID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xyXG4gICAgICAgICAgICB2ID0gdGhpcy52YWx1ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRhdGVUaW1lQ2hhbmdlLmVtaXQoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgICAgICAgIHZhbHVlOiB2LFxyXG4gICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBuYXRpdmUgaW5wdXQgcHJvcGVydHkgJ3ZhbHVlJ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZm9ybWF0TmF0aXZlSW5wdXRWYWx1ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgICAgICd2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHRQaWNrZXIuZm9ybWF0U3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgOiAnJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl92YWx1ZXMgJiYgdGhpcy52YWx1ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbSA9IHRoaXMuX3ZhbHVlc1swXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvID0gdGhpcy5fdmFsdWVzWzFdO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZyb21Gb3JtYXR0ZWQgPSBmcm9tXHJcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmR0UGlja2VyLmZvcm1hdFN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIDogJyc7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b0Zvcm1hdHRlZCA9IHRvXHJcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmRhdGVUaW1lQWRhcHRlci5mb3JtYXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kdFBpY2tlci5mb3JtYXRTdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICA6ICcnO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghZnJvbUZvcm1hdHRlZCAmJiAhdG9Gb3JtYXR0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZScpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUZvcm1hdHRlZCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJhbmdlU2VwYXJhdG9yICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvRm9ybWF0dGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd2YWx1ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tRm9ybWF0dGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VUbycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndmFsdWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9Gb3JtYXR0ZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3ZhbHVlJyxcclxuICAgICAgICAgICAgICAgICAgICAnJ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgdGhlIHJlbGF0aW9uc2hpcCBiZXR3ZWVuIHRoaXMgaW5wdXQgYW5kIGl0cyBwaWNrZXIgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcmVnaXN0ZXJEYXRlVGltZVBpY2tlcihwaWNrZXI6IE93bERhdGVUaW1lQ29tcG9uZW50PFQ+KSB7XHJcbiAgICAgICAgaWYgKHBpY2tlcikge1xyXG4gICAgICAgICAgICB0aGlzLmR0UGlja2VyID0gcGlja2VyO1xyXG4gICAgICAgICAgICB0aGlzLmR0UGlja2VyLnJlZ2lzdGVySW5wdXQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydCBhIGdpdmVuIG9iaiB0byBhIHZhbGlkIGRhdGUgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VmFsaWREYXRlKG9iajogYW55KTogVCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQob2JqKVxyXG4gICAgICAgICAgICA/IG9ialxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IGEgdGltZSBzdHJpbmcgdG8gYSBkYXRlLXRpbWUgc3RyaW5nXHJcbiAgICAgKiBXaGVuIHBpY2tlclR5cGUgaXMgJ3RpbWVyJywgdGhlIHZhbHVlIGluIHRoZSBwaWNrZXIncyBpbnB1dCBpcyBhIHRpbWUgc3RyaW5nLlxyXG4gICAgICogVGhlIGRhdGVUaW1lQWRhcHRlciBwYXJzZSBmbiBjb3VsZCBub3QgcGFyc2UgYSB0aW1lIHN0cmluZyB0byBhIERhdGUgT2JqZWN0LlxyXG4gICAgICogVGhlcmVmb3JlIHdlIG5lZWQgdGhpcyBmbiB0byBjb252ZXJ0IGEgdGltZSBzdHJpbmcgdG8gYSBkYXRlLXRpbWUgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnZlcnRUaW1lU3RyaW5nVG9EYXRlVGltZVN0cmluZyhcclxuICAgICAgICB0aW1lU3RyaW5nOiBzdHJpbmcsXHJcbiAgICAgICAgZGF0ZVRpbWU6IFRcclxuICAgICk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgICAgIGlmICh0aW1lU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHYgPSBkYXRlVGltZSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5ub3coKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmZvcm1hdChcclxuICAgICAgICAgICAgICAgIHYsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5kYXRlUGlja2VySW5wdXRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmcgKyAnICcgKyB0aW1lU3RyaW5nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBpbnB1dCBjaGFuZ2UgaW4gc2luZ2xlIG1vZGVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VJbnB1dEluU2luZ2xlTW9kZShpbnB1dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLmR0UGlja2VyLnBpY2tlclR5cGUgPT09ICd0aW1lcicpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLmNvbnZlcnRUaW1lU3RyaW5nVG9EYXRlVGltZVN0cmluZyh2YWx1ZSwgdGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIucGFyc2UoXHJcbiAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lRm9ybWF0cy5wYXJzZUlucHV0XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmxhc3RWYWx1ZVZhbGlkID0gIXJlc3VsdCB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKHJlc3VsdCk7XHJcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5nZXRWYWxpZERhdGUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgLy8gaWYgdGhlIG5ld1ZhbHVlIGlzIHRoZSBzYW1lIGFzIHRoZSBvbGRWYWx1ZSwgd2UgaW50ZW5kIHRvIG5vdCBmaXJlIHRoZSB2YWx1ZUNoYW5nZSBldmVudFxyXG4gICAgICAgIC8vIHJlc3VsdCBlcXVhbHMgdG8gbnVsbCBtZWFucyB0aGVyZSBpcyBpbnB1dCBldmVudCwgYnV0IHRoZSBpbnB1dCB2YWx1ZSBpcyBpbnZhbGlkXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU2FtZVZhbHVlKHJlc3VsdCwgdGhpcy5fdmFsdWUpIHx8IHJlc3VsdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lSW5wdXQuZW1pdCh7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgaW5wdXQ6IHRoaXMuZWxtUmVmLm5hdGl2ZUVsZW1lbnRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGlucHV0IGNoYW5nZSBpbiByYW5nZUZyb20gb3IgcmFuZ2VUbyBtb2RlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hhbmdlSW5wdXRJblJhbmdlRnJvbVRvTW9kZShpbnB1dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgb3JpZ2luYWxWYWx1ZSA9XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nXHJcbiAgICAgICAgICAgICAgICA/IHRoaXMuX3ZhbHVlc1swXVxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLl92YWx1ZXNbMV07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmR0UGlja2VyLnBpY2tlclR5cGUgPT09ICd0aW1lcicpIHtcclxuICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IHRoaXMuY29udmVydFRpbWVTdHJpbmdUb0RhdGVUaW1lU3RyaW5nKFxyXG4gICAgICAgICAgICAgICAgaW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsVmFsdWVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5wYXJzZShcclxuICAgICAgICAgICAgaW5wdXRWYWx1ZSxcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUZvcm1hdHMucGFyc2VJbnB1dFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9ICFyZXN1bHQgfHwgdGhpcy5kYXRlVGltZUFkYXB0ZXIuaXNWYWxpZChyZXN1bHQpO1xyXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuZ2V0VmFsaWREYXRlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSBuZXdWYWx1ZSBpcyB0aGUgc2FtZSBhcyB0aGUgb2xkVmFsdWUsIHdlIGludGVuZCB0byBub3QgZmlyZSB0aGUgdmFsdWVDaGFuZ2UgZXZlbnRcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICh0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2VGcm9tJyAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NhbWVWYWx1ZShyZXN1bHQsIHRoaXMuX3ZhbHVlc1swXSkgJiZcclxuICAgICAgICAgICAgICAgIHJlc3VsdCkgfHxcclxuICAgICAgICAgICAgKHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZVRvJyAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1NhbWVWYWx1ZShyZXN1bHQsIHRoaXMuX3ZhbHVlc1sxXSkgJiZcclxuICAgICAgICAgICAgICAgIHJlc3VsdClcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fdmFsdWVzID1cclxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbSdcclxuICAgICAgICAgICAgICAgID8gW3Jlc3VsdCwgdGhpcy5fdmFsdWVzWzFdXVxyXG4gICAgICAgICAgICAgICAgOiBbdGhpcy5fdmFsdWVzWzBdLCByZXN1bHRdO1xyXG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZXMpO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLl92YWx1ZXMpO1xyXG4gICAgICAgIHRoaXMuZGF0ZVRpbWVJbnB1dC5lbWl0KHtcclxuICAgICAgICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5fdmFsdWVzLFxyXG4gICAgICAgICAgICBpbnB1dDogdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGlucHV0IGNoYW5nZSBpbiByYW5nZSBtb2RlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hhbmdlSW5wdXRJblJhbmdlTW9kZShpbnB1dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZHMgPSBpbnB1dFZhbHVlLnNwbGl0KHRoaXMucmFuZ2VTZXBhcmF0b3IpO1xyXG4gICAgICAgIGxldCBmcm9tU3RyaW5nID0gc2VsZWN0ZWRzWzBdO1xyXG4gICAgICAgIGxldCB0b1N0cmluZyA9IHNlbGVjdGVkc1sxXTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZHRQaWNrZXIucGlja2VyVHlwZSA9PT0gJ3RpbWVyJykge1xyXG4gICAgICAgICAgICBmcm9tU3RyaW5nID0gdGhpcy5jb252ZXJ0VGltZVN0cmluZ1RvRGF0ZVRpbWVTdHJpbmcoXHJcbiAgICAgICAgICAgICAgICBmcm9tU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbMF1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgdG9TdHJpbmcgPSB0aGlzLmNvbnZlcnRUaW1lU3RyaW5nVG9EYXRlVGltZVN0cmluZyhcclxuICAgICAgICAgICAgICAgIHRvU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbMV1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmcm9tID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIucGFyc2UoXHJcbiAgICAgICAgICAgIGZyb21TdHJpbmcsXHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVGb3JtYXRzLnBhcnNlSW5wdXRcclxuICAgICAgICApO1xyXG4gICAgICAgIGxldCB0byA9IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLnBhcnNlKFxyXG4gICAgICAgICAgICB0b1N0cmluZyxcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUZvcm1hdHMucGFyc2VJbnB1dFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5sYXN0VmFsdWVWYWxpZCA9XHJcbiAgICAgICAgICAgICghZnJvbSB8fCB0aGlzLmRhdGVUaW1lQWRhcHRlci5pc1ZhbGlkKGZyb20pKSAmJlxyXG4gICAgICAgICAgICAoIXRvIHx8IHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmlzVmFsaWQodG8pKTtcclxuICAgICAgICBmcm9tID0gdGhpcy5nZXRWYWxpZERhdGUoZnJvbSk7XHJcbiAgICAgICAgdG8gPSB0aGlzLmdldFZhbGlkRGF0ZSh0byk7XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZSBuZXdWYWx1ZSBpcyB0aGUgc2FtZSBhcyB0aGUgb2xkVmFsdWUsIHdlIGludGVuZCB0byBub3QgZmlyZSB0aGUgdmFsdWVDaGFuZ2UgZXZlbnRcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICF0aGlzLmlzU2FtZVZhbHVlKGZyb20sIHRoaXMuX3ZhbHVlc1swXSkgfHxcclxuICAgICAgICAgICAgIXRoaXMuaXNTYW1lVmFsdWUodG8sIHRoaXMuX3ZhbHVlc1sxXSkgfHxcclxuICAgICAgICAgICAgKGZyb20gPT09IG51bGwgJiYgdG8gPT09IG51bGwpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IFtmcm9tLCB0b107XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZXMpO1xyXG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5fdmFsdWVzKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlVGltZUlucHV0LmVtaXQoe1xyXG4gICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuX3ZhbHVlcyxcclxuICAgICAgICAgICAgICAgIGlucHV0OiB0aGlzLmVsbVJlZi5uYXRpdmVFbGVtZW50XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHRoZSB0d28gdmFsdWUgaXMgdGhlIHNhbWVcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1NhbWVWYWx1ZShmaXJzdDogVCB8IG51bGwsIHNlY29uZDogVCB8IG51bGwpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZmlyc3QgJiYgc2Vjb25kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVUaW1lQWRhcHRlci5jb21wYXJlKGZpcnN0LCBzZWNvbmQpID09PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZpcnN0ID09IHNlY29uZDtcclxuICAgIH1cclxufVxyXG4iXX0=