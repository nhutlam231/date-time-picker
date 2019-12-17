/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-inline.component
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { OwlDateTime } from './date-time.class';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './adapter/date-time-format.class';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
/** @type {?} */
export const OWL_DATETIME_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => OwlDateTimeInlineComponent)),
    multi: true
};
/**
 * @template T
 */
export class OwlDateTimeInlineComponent extends OwlDateTime {
    /**
     * @param {?} changeDetector
     * @param {?} dateTimeAdapter
     * @param {?} dateTimeFormats
     */
    constructor(changeDetector, dateTimeAdapter, dateTimeFormats) {
        super(dateTimeAdapter, dateTimeFormats);
        this.changeDetector = changeDetector;
        this.dateTimeAdapter = dateTimeAdapter;
        this.dateTimeFormats = dateTimeFormats;
        /**
         * Set the type of the dateTime picker
         *      'both' -- show both calendar and timer
         *      'calendar' -- show only calendar
         *      'timer' -- show only timer
         */
        this._pickerType = 'both';
        this._disabled = false;
        this._selectMode = 'single';
        this._values = [];
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
        this._selecteds = [];
        this.onModelChange = (/**
         * @return {?}
         */
        () => { });
        this.onModelTouched = (/**
         * @return {?}
         */
        () => { });
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
        }
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
        this._disabled = coerceBooleanProperty(value);
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
    get startAt() {
        if (this._startAt) {
            return this._startAt;
        }
        if (this.selectMode === 'single') {
            return this.value || null;
        }
        else if (this.selectMode === 'range' ||
            this.selectMode === 'rangeFrom') {
            return this.values[0] || null;
        }
        else if (this.selectMode === 'rangeTo') {
            return this.values[1] || null;
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
    get dateTimeFilter() {
        return this._dateTimeFilter;
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    set dateTimeFilter(filter) {
        this._dateTimeFilter = filter;
    }
    /**
     * @return {?}
     */
    get minDateTime() {
        return this._min || null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDateTime(value) {
        this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
        this.changeDetector.markForCheck();
    }
    /**
     * @return {?}
     */
    get maxDateTime() {
        return this._max || null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDateTime(value) {
        this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
        this.changeDetector.markForCheck();
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
        value = this.getValidDate(value);
        this._value = value;
        this.selected = value;
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
            values = values.map((/**
             * @param {?} v
             * @return {?}
             */
            v => {
                v = this.dateTimeAdapter.deserialize(v);
                v = this.getValidDate(v);
                return v ? this.dateTimeAdapter.clone(v) : null;
            }));
            this._values = [...values];
            this.selecteds = [...values];
        }
        else {
            this._values = [];
            this.selecteds = [];
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
     * @return {?}
     */
    get opened() {
        return true;
    }
    /**
     * @return {?}
     */
    get pickerMode() {
        return 'inline';
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
    get owlDTInlineClass() {
        return true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.container.picker = this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.isInSingleMode) {
            this.value = value;
            this.container.pickerMoment = value;
        }
        else {
            this.values = value;
            this.container.pickerMoment = this._values[this.container.activeSelectedIndex];
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
     * @param {?} date
     * @return {?}
     */
    select(date) {
        if (this.disabled) {
            return;
        }
        if (Array.isArray(date)) {
            this.values = [...date];
        }
        else {
            this.value = date;
        }
        this.onModelChange(date);
        this.onModelTouched();
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
}
OwlDateTimeInlineComponent.decorators = [
    { type: Component, args: [{
                selector: 'owl-date-time-inline',
                template: "<owl-date-time-container></owl-date-time-container>",
                host: {
                    '[class.owl-dt-inline]': 'owlDTInlineClass'
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                providers: [OWL_DATETIME_VALUE_ACCESSOR],
                styles: [""]
            }] }
];
/** @nocollapse */
OwlDateTimeInlineComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DateTimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
];
OwlDateTimeInlineComponent.propDecorators = {
    container: [{ type: ViewChild, args: [OwlDateTimeContainerComponent, { static: true },] }],
    pickerType: [{ type: Input }],
    disabled: [{ type: Input }],
    selectMode: [{ type: Input }],
    startAt: [{ type: Input }],
    dateTimeFilter: [{ type: Input, args: ['owlDateTimeFilter',] }],
    minDateTime: [{ type: Input, args: ['min',] }],
    maxDateTime: [{ type: Input, args: ['max',] }],
    value: [{ type: Input }],
    values: [{ type: Input }],
    yearSelected: [{ type: Output }],
    monthSelected: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    OwlDateTimeInlineComponent.prototype.container;
    /**
     * Set the type of the dateTime picker
     *      'both' -- show both calendar and timer
     *      'calendar' -- show only calendar
     *      'timer' -- show only timer
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._pickerType;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._selectMode;
    /**
     * The date to open the calendar to initially.
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._startAt;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._dateTimeFilter;
    /**
     * The minimum valid date.
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._min;
    /**
     * The maximum valid date.
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._max;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._value;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._values;
    /**
     * Emits selected year in multi-year view
     * This doesn't imply a change on the selected date.
     *
     * @type {?}
     */
    OwlDateTimeInlineComponent.prototype.yearSelected;
    /**
     * Emits selected month in year view
     * This doesn't imply a change on the selected date.
     *
     * @type {?}
     */
    OwlDateTimeInlineComponent.prototype.monthSelected;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype._selecteds;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype.onModelChange;
    /**
     * @type {?}
     * @private
     */
    OwlDateTimeInlineComponent.prototype.onModelTouched;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeInlineComponent.prototype.changeDetector;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeInlineComponent.prototype.dateTimeAdapter;
    /**
     * @type {?}
     * @protected
     */
    OwlDateTimeInlineComponent.prototype.dateTimeFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLWlubGluZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9kYXRlLXRpbWUtaW5saW5lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUFFLFlBQVksRUFDdkIsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDSCxXQUFXLEVBSWQsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUNILHFCQUFxQixFQUV4QixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOztBQUV2RixNQUFNLE9BQU8sMkJBQTJCLEdBQVE7SUFDNUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsMEJBQTBCLEVBQUM7SUFDekQsS0FBSyxFQUFFLElBQUk7Q0FDZDs7OztBQWFELE1BQU0sT0FBTywwQkFBOEIsU0FBUSxXQUFjOzs7Ozs7SUFtTjdELFlBQ2MsY0FBaUMsRUFDckIsZUFBbUMsRUFHL0MsZUFBbUM7UUFFN0MsS0FBSyxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQU45QixtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFDckIsb0JBQWUsR0FBZixlQUFlLENBQW9CO1FBRy9D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Ozs7O0lBVTFCLGlEQUEyQzs7Ozs7O0lBb0IzQyw4Q0FBMkI7Ozs7O0lBMkIzQixxREFBcUQ7Ozs7OztJQVdyRCwwQ0FBdUI7Ozs7OztJQWF2QiwwQ0FBdUI7Ozs7O0lBWXZCLDRDQUF5Qjs7Ozs7SUFhekIsNkNBQTBCOzs7Ozs7O0lBeUIxQixrREFDcUM7Ozs7Ozs7SUFNckMsbURBQ3NDOzs7OztJQUV0QywrQ0FBNEI7Ozs7O0lBVTVCLGdEQUE2Qjs7Ozs7SUFrQzdCLG1EQUEyQzs7Ozs7SUFDM0Msb0RBQTRDOzs7OztJQUd4QyxvREFBMkM7Ozs7O0lBQzNDLHFEQUF5RDs7Ozs7SUFDekQscURBRTZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGRhdGUtdGltZS1pbmxpbmUuY29tcG9uZW50XHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsIEV2ZW50RW1pdHRlcixcclxuICAgIGZvcndhcmRSZWYsXHJcbiAgICBJbmplY3QsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uSW5pdCxcclxuICAgIE9wdGlvbmFsLFxyXG4gICAgT3V0cHV0LFxyXG4gICAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHtcclxuICAgIE93bERhdGVUaW1lLFxyXG4gICAgUGlja2VyTW9kZSxcclxuICAgIFBpY2tlclR5cGUsXHJcbiAgICBTZWxlY3RNb2RlXHJcbn0gZnJvbSAnLi9kYXRlLXRpbWUuY2xhc3MnO1xyXG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXIvZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xyXG5pbXBvcnQge1xyXG4gICAgT1dMX0RBVEVfVElNRV9GT1JNQVRTLFxyXG4gICAgT3dsRGF0ZVRpbWVGb3JtYXRzXHJcbn0gZnJvbSAnLi9hZGFwdGVyL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xyXG5pbXBvcnQgeyBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjb25zdCBPV0xfREFURVRJTUVfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gT3dsRGF0ZVRpbWVJbmxpbmVDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdvd2wtZGF0ZS10aW1lLWlubGluZScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS10aW1lLWlubGluZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9kYXRlLXRpbWUtaW5saW5lLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtaW5saW5lXSc6ICdvd2xEVElubGluZUNsYXNzJ1xyXG4gICAgfSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXHJcbiAgICBwcm92aWRlcnM6IFtPV0xfREFURVRJTUVfVkFMVUVfQUNDRVNTT1JdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPd2xEYXRlVGltZUlubGluZUNvbXBvbmVudDxUPiBleHRlbmRzIE93bERhdGVUaW1lPFQ+XHJcbiAgICBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG4gICAgQFZpZXdDaGlsZChPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCwgeyBzdGF0aWM6IHRydWUgfSlcclxuICAgIGNvbnRhaW5lcjogT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQ8VD47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgdGhlIHR5cGUgb2YgdGhlIGRhdGVUaW1lIHBpY2tlclxyXG4gICAgICogICAgICAnYm90aCcgLS0gc2hvdyBib3RoIGNhbGVuZGFyIGFuZCB0aW1lclxyXG4gICAgICogICAgICAnY2FsZW5kYXInIC0tIHNob3cgb25seSBjYWxlbmRhclxyXG4gICAgICogICAgICAndGltZXInIC0tIHNob3cgb25seSB0aW1lclxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9waWNrZXJUeXBlOiBQaWNrZXJUeXBlID0gJ2JvdGgnO1xyXG4gICAgQElucHV0KClcclxuICAgIGdldCBwaWNrZXJUeXBlKCk6IFBpY2tlclR5cGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9waWNrZXJUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwaWNrZXJUeXBlKHZhbDogUGlja2VyVHlwZSkge1xyXG4gICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3BpY2tlclR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGlja2VyVHlwZSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhdGhpcy5fZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3NlbGVjdE1vZGU6IFNlbGVjdE1vZGUgPSAnc2luZ2xlJztcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgc2VsZWN0TW9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0TW9kZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2VsZWN0TW9kZShtb2RlOiBTZWxlY3RNb2RlKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBtb2RlICE9PSAnc2luZ2xlJyAmJlxyXG4gICAgICAgICAgICBtb2RlICE9PSAncmFuZ2UnICYmXHJcbiAgICAgICAgICAgIG1vZGUgIT09ICdyYW5nZUZyb20nICYmXHJcbiAgICAgICAgICAgIG1vZGUgIT09ICdyYW5nZVRvJ1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignT3dsRGF0ZVRpbWUgRXJyb3I6IGludmFsaWQgc2VsZWN0TW9kZSB2YWx1ZSEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPSBtb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBUaGUgZGF0ZSB0byBvcGVuIHRoZSBjYWxlbmRhciB0byBpbml0aWFsbHkuICovXHJcbiAgICBwcml2YXRlIF9zdGFydEF0OiBUIHwgbnVsbDtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgc3RhcnRBdCgpOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXJ0QXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0QXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RNb2RlID09PSAnc2luZ2xlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSB8fCBudWxsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoXHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlJyB8fFxyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlc1swXSB8fCBudWxsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VUbycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzWzFdIHx8IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldCBzdGFydEF0KGRhdGU6IFQgfCBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRBdCA9IHRoaXMuZ2V0VmFsaWREYXRlKFxyXG4gICAgICAgICAgICB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZShkYXRlKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0ZVRpbWVGaWx0ZXI6IChkYXRlOiBUIHwgbnVsbCkgPT4gYm9vbGVhbjtcclxuICAgIEBJbnB1dCgnb3dsRGF0ZVRpbWVGaWx0ZXInKVxyXG4gICAgZ2V0IGRhdGVUaW1lRmlsdGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlVGltZUZpbHRlcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgZGF0ZVRpbWVGaWx0ZXIoZmlsdGVyOiAoZGF0ZTogVCB8IG51bGwpID0+IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9kYXRlVGltZUZpbHRlciA9IGZpbHRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIG1pbmltdW0gdmFsaWQgZGF0ZS4gKi9cclxuICAgIHByaXZhdGUgX21pbjogVCB8IG51bGw7XHJcblxyXG4gICAgZ2V0IG1pbkRhdGVUaW1lKCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluIHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCdtaW4nKVxyXG4gICAgc2V0IG1pbkRhdGVUaW1lKHZhbHVlOiBUIHwgbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX21pbiA9IHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogVGhlIG1heGltdW0gdmFsaWQgZGF0ZS4gKi9cclxuICAgIHByaXZhdGUgX21heDogVCB8IG51bGw7XHJcblxyXG4gICAgZ2V0IG1heERhdGVUaW1lKCk6IFQgfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4IHx8IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCdtYXgnKVxyXG4gICAgc2V0IG1heERhdGVUaW1lKHZhbHVlOiBUIHwgbnVsbCkge1xyXG4gICAgICAgIHRoaXMuX21heCA9IHRoaXMuZ2V0VmFsaWREYXRlKHRoaXMuZGF0ZVRpbWVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZTogVCB8IG51bGw7XHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdmFsdWUodmFsdWU6IFQgfCBudWxsKSB7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICAgICAgdmFsdWUgPSB0aGlzLmdldFZhbGlkRGF0ZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdmFsdWVzOiBUW10gPSBbXTtcclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgdmFsdWVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlcyh2YWx1ZXM6IFRbXSkge1xyXG4gICAgICAgIGlmICh2YWx1ZXMgJiYgdmFsdWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLm1hcCh2ID0+IHtcclxuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5kZXNlcmlhbGl6ZSh2KTtcclxuICAgICAgICAgICAgICAgIHYgPSB0aGlzLmdldFZhbGlkRGF0ZSh2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2ID8gdGhpcy5kYXRlVGltZUFkYXB0ZXIuY2xvbmUodikgOiBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gWy4uLnZhbHVlc107XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzID0gWy4uLnZhbHVlc107XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW1pdHMgc2VsZWN0ZWQgeWVhciBpbiBtdWx0aS15ZWFyIHZpZXdcclxuICAgICAqIFRoaXMgZG9lc24ndCBpbXBseSBhIGNoYW5nZSBvbiB0aGUgc2VsZWN0ZWQgZGF0ZS5cclxuICAgICAqICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHllYXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtaXRzIHNlbGVjdGVkIG1vbnRoIGluIHllYXIgdmlld1xyXG4gICAgICogVGhpcyBkb2Vzbid0IGltcGx5IGEgY2hhbmdlIG9uIHRoZSBzZWxlY3RlZCBkYXRlLlxyXG4gICAgICogKi9cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgbW9udGhTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VD4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9zZWxlY3RlZDogVCB8IG51bGw7XHJcbiAgICBnZXQgc2VsZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBzZWxlY3RlZCh2YWx1ZTogVCB8IG51bGwpIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWRzOiBUW10gPSBbXTtcclxuICAgIGdldCBzZWxlY3RlZHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkcztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgc2VsZWN0ZWRzKHZhbHVlczogVFtdKSB7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRzID0gdmFsdWVzO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG9wZW5lZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcGlja2VyTW9kZSgpOiBQaWNrZXJNb2RlIHtcclxuICAgICAgICByZXR1cm4gJ2lubGluZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSW5TaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RNb2RlID09PSAnc2luZ2xlJztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNJblJhbmdlTW9kZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZUZyb20nIHx8XHJcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdE1vZGUgPT09ICdyYW5nZVRvJ1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERUSW5saW5lQ2xhc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xyXG4gICAgcHJpdmF0ZSBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIEBPcHRpb25hbCgpIHByb3RlY3RlZCBkYXRlVGltZUFkYXB0ZXI6IERhdGVUaW1lQWRhcHRlcjxUPixcclxuICAgICAgICBAT3B0aW9uYWwoKVxyXG4gICAgICAgIEBJbmplY3QoT1dMX0RBVEVfVElNRV9GT1JNQVRTKVxyXG4gICAgICAgIHByb3RlY3RlZCBkYXRlVGltZUZvcm1hdHM6IE93bERhdGVUaW1lRm9ybWF0c1xyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoZGF0ZVRpbWVBZGFwdGVyLCBkYXRlVGltZUZvcm1hdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5waWNrZXIgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnBpY2tlck1vbWVudCA9IHZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnBpY2tlck1vbWVudCA9IHRoaXMuX3ZhbHVlc1tcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmFjdGl2ZVNlbGVjdGVkSW5kZXhcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VsZWN0KGRhdGU6IFRbXSB8IFQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IFsuLi5kYXRlXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKGRhdGUpO1xyXG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtaXRzIHRoZSBzZWxlY3RlZCB5ZWFyIGluIG11bHRpLXllYXIgdmlld1xyXG4gICAgICogKi9cclxuICAgIHB1YmxpYyBzZWxlY3RZZWFyKG5vcm1hbGl6ZWRZZWFyOiBUKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy55ZWFyU2VsZWN0ZWQuZW1pdChub3JtYWxpemVkWWVhcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbWl0cyBzZWxlY3RlZCBtb250aCBpbiB5ZWFyIHZpZXdcclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgc2VsZWN0TW9udGgobm9ybWFsaXplZE1vbnRoOiBUKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tb250aFNlbGVjdGVkLmVtaXQobm9ybWFsaXplZE1vbnRoKTtcclxuICAgIH1cclxufVxyXG4iXX0=