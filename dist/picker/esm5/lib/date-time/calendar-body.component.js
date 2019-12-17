/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * calendar-body.component
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { take } from 'rxjs/operators';
var CalendarCell = /** @class */ (function () {
    function CalendarCell(value, displayValue, ariaLabel, enabled, out, cellClass) {
        if (out === void 0) { out = false; }
        if (cellClass === void 0) { cellClass = ''; }
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
        this.out = out;
        this.cellClass = cellClass;
    }
    return CalendarCell;
}());
export { CalendarCell };
if (false) {
    /** @type {?} */
    CalendarCell.prototype.value;
    /** @type {?} */
    CalendarCell.prototype.displayValue;
    /** @type {?} */
    CalendarCell.prototype.ariaLabel;
    /** @type {?} */
    CalendarCell.prototype.enabled;
    /** @type {?} */
    CalendarCell.prototype.out;
    /** @type {?} */
    CalendarCell.prototype.cellClass;
}
var OwlCalendarBodyComponent = /** @class */ (function () {
    function OwlCalendarBodyComponent(elmRef, ngZone) {
        this.elmRef = elmRef;
        this.ngZone = ngZone;
        /**
         * The cell number of the active cell in the table.
         */
        this.activeCell = 0;
        /**
         * The number of columns in the table.
         *
         */
        this.numCols = 7;
        /**
         * The ratio (width / height) to use for the cells in the table.
         */
        this.cellRatio = 1;
        /**
         * Emit when a calendar cell is selected
         *
         */
        this.select = new EventEmitter();
    }
    Object.defineProperty(OwlCalendarBodyComponent.prototype, "owlDTCalendarBodyClass", {
        get: /**
         * @return {?}
         */
        function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarBodyComponent.prototype, "isInSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.selectMode === 'single';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OwlCalendarBodyComponent.prototype, "isInRangeMode", {
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
    /**
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} cell
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.selectCell = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        this.select.emit(cell);
    };
    /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isActiveCell = /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    function (rowIndex, colIndex) {
        /** @type {?} */
        var cellNumber = rowIndex * this.numCols + colIndex;
        return cellNumber === this.activeCell;
    };
    /**
     * Check if the cell is selected
     */
    /**
     * Check if the cell is selected
     * @param {?} value
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isSelected = /**
     * Check if the cell is selected
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.selectedValues || this.selectedValues.length === 0) {
            return false;
        }
        if (this.isInSingleMode) {
            return value === this.selectedValues[0];
        }
        if (this.isInRangeMode) {
            /** @type {?} */
            var fromValue = this.selectedValues[0];
            /** @type {?} */
            var toValue = this.selectedValues[1];
            return value === fromValue || value === toValue;
        }
    };
    /**
     * Check if the cell in the range
     * */
    /**
     * Check if the cell in the range
     *
     * @param {?} value
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isInRange = /**
     * Check if the cell in the range
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isInRangeMode) {
            /** @type {?} */
            var fromValue = this.selectedValues[0];
            /** @type {?} */
            var toValue = this.selectedValues[1];
            if (fromValue !== null && toValue !== null) {
                return value >= fromValue && value <= toValue;
            }
            else {
                return value === fromValue || value === toValue;
            }
        }
    };
    /**
     * Check if the cell is the range from
     * */
    /**
     * Check if the cell is the range from
     *
     * @param {?} value
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isRangeFrom = /**
     * Check if the cell is the range from
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isInRangeMode) {
            /** @type {?} */
            var fromValue = this.selectedValues[0];
            return fromValue !== null && value === fromValue;
        }
    };
    /**
     * Check if the cell is the range to
     * */
    /**
     * Check if the cell is the range to
     *
     * @param {?} value
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.isRangeTo = /**
     * Check if the cell is the range to
     *
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isInRangeMode) {
            /** @type {?} */
            var toValue = this.selectedValues[1];
            return toValue !== null && value === toValue;
        }
    };
    /**
     * Focus to a active cell
     * */
    /**
     * Focus to a active cell
     *
     * @return {?}
     */
    OwlCalendarBodyComponent.prototype.focusActiveCell = /**
     * Focus to a active cell
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
    OwlCalendarBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: '[owl-date-time-calendar-body]',
                    exportAs: 'owlDateTimeCalendarBody',
                    template: "<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\r\n    <td *ngFor=\"let item of row; let colIndex = index\"\r\n        class=\"owl-dt-calendar-cell {{item.cellClass}}\"\r\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\r\n        [class.owl-dt-calendar-cell-active]=\"isActiveCell(rowIndex, colIndex)\"\r\n        [class.owl-dt-calendar-cell-disabled]=\"!item.enabled\"\r\n        [class.owl-dt-calendar-cell-in-range]=\"isInRange(item.value)\"\r\n        [class.owl-dt-calendar-cell-range-from]=\"isRangeFrom(item.value)\"\r\n        [class.owl-dt-calendar-cell-range-to]=\"isRangeTo(item.value)\"\r\n        [attr.aria-label]=\"item.ariaLabel\"\r\n        [attr.aria-disabled]=\"!item.enabled || null\"\r\n        [style.width.%]=\"100 / numCols\"\r\n        [style.paddingTop.%]=\"50 * cellRatio / numCols\"\r\n        [style.paddingBottom.%]=\"50 * cellRatio / numCols\"\r\n        (click)=\"selectCell(item)\">\r\n        <span class=\"owl-dt-calendar-cell-content\"\r\n              [ngClass]=\"{\r\n                'owl-dt-calendar-cell-out': item.out,\r\n                'owl-dt-calendar-cell-today': item.value === todayValue,\r\n                'owl-dt-calendar-cell-selected': isSelected(item.value)\r\n              }\">\r\n            {{item.displayValue}}\r\n        </span>\r\n    </td>\r\n</tr>\r\n",
                    host: {
                        '[class.owl-dt-calendar-body]': 'owlDTCalendarBodyClass'
                    },
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    OwlCalendarBodyComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    OwlCalendarBodyComponent.propDecorators = {
        activeCell: [{ type: Input }],
        rows: [{ type: Input }],
        numCols: [{ type: Input }],
        cellRatio: [{ type: Input }],
        todayValue: [{ type: Input }],
        selectedValues: [{ type: Input }],
        selectMode: [{ type: Input }],
        select: [{ type: Output }]
    };
    return OwlCalendarBodyComponent;
}());
export { OwlCalendarBodyComponent };
if (false) {
    /**
     * The cell number of the active cell in the table.
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.activeCell;
    /**
     * The cells to display in the table.
     *
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.rows;
    /**
     * The number of columns in the table.
     *
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.numCols;
    /**
     * The ratio (width / height) to use for the cells in the table.
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.cellRatio;
    /**
     * The value in the table that corresponds to today.
     *
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.todayValue;
    /**
     * The value in the table that is currently selected.
     *
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.selectedValues;
    /**
     * Current picker select mode
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.selectMode;
    /**
     * Emit when a calendar cell is selected
     *
     * @type {?}
     */
    OwlCalendarBodyComponent.prototype.select;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarBodyComponent.prototype.elmRef;
    /**
     * @type {?}
     * @private
     */
    OwlCalendarBodyComponent.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9jYWxlbmRhci1ib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUNILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEM7SUFDSSxzQkFDVyxLQUFhLEVBQ2IsWUFBb0IsRUFDcEIsU0FBaUIsRUFDakIsT0FBZ0IsRUFDaEIsR0FBb0IsRUFDcEIsU0FBc0I7UUFEdEIsb0JBQUEsRUFBQSxXQUFvQjtRQUNwQiwwQkFBQSxFQUFBLGNBQXNCO1FBTHRCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsUUFBRyxHQUFILEdBQUcsQ0FBaUI7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBYTtJQUM5QixDQUFDO0lBQ1IsbUJBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQzs7OztJQVBPLDZCQUFvQjs7SUFDcEIsb0NBQTJCOztJQUMzQixpQ0FBd0I7O0lBQ3hCLCtCQUF1Qjs7SUFDdkIsMkJBQTJCOztJQUMzQixpQ0FBNkI7O0FBSXJDO0lBNEVJLGtDQUFvQixNQUFrQixFQUFVLE1BQWM7UUFBMUMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7Ozs7UUE1RDlELGVBQVUsR0FBRyxDQUFDLENBQUM7Ozs7O1FBWWYsWUFBTyxHQUFHLENBQUMsQ0FBQzs7OztRQU1aLGNBQVMsR0FBRyxDQUFDLENB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dCI6WyIvKipcclxuICogY2FsZW5kYXItYm9keS5jb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBOZ1pvbmUsXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2VsZWN0TW9kZSB9IGZyb20gJy4vZGF0ZS10aW1lLmNsYXNzJztcclxuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckNlbGwge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIHZhbHVlOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIGRpc3BsYXlWYWx1ZTogc3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyBhcmlhTGFiZWw6IHN0cmluZyxcclxuICAgICAgICBwdWJsaWMgZW5hYmxlZDogYm9vbGVhbixcclxuICAgICAgICBwdWJsaWMgb3V0OiBib29sZWFuID0gZmFsc2UsXHJcbiAgICAgICAgcHVibGljIGNlbGxDbGFzczogc3RyaW5nID0gJydcclxuICAgICkge31cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ1tvd2wtZGF0ZS10aW1lLWNhbGVuZGFyLWJvZHldJyxcclxuICAgIGV4cG9ydEFzOiAnb3dsRGF0ZVRpbWVDYWxlbmRhckJvZHknLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NhbGVuZGFyLWJvZHkuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgaG9zdDp7XHJcbiAgICAgICAgJ1tjbGFzcy5vd2wtZHQtY2FsZW5kYXItYm9keV0nOiAnb3dsRFRDYWxlbmRhckJvZHlDbGFzcydcclxuICAgIH0sXHJcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcclxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPd2xDYWxlbmRhckJvZHlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY2VsbCBudW1iZXIgb2YgdGhlIGFjdGl2ZSBjZWxsIGluIHRoZSB0YWJsZS5cclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIGFjdGl2ZUNlbGwgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGNlbGxzIHRvIGRpc3BsYXkgaW4gdGhlIHRhYmxlLlxyXG4gICAgICogKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICByb3dzOiBDYWxlbmRhckNlbGxbXVtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSB0YWJsZS5cclxuICAgICAqICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgbnVtQ29scyA9IDc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcmF0aW8gKHdpZHRoIC8gaGVpZ2h0KSB0byB1c2UgZm9yIHRoZSBjZWxscyBpbiB0aGUgdGFibGUuXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBjZWxsUmF0aW8gPSAxO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHZhbHVlIGluIHRoZSB0YWJsZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRvZGF5LlxyXG4gICAgICogKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICB0b2RheVZhbHVlOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgdmFsdWUgaW4gdGhlIHRhYmxlIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLlxyXG4gICAgICogKi9cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZWxlY3RlZFZhbHVlczogbnVtYmVyW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXJyZW50IHBpY2tlciBzZWxlY3QgbW9kZVxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2VsZWN0TW9kZTogU2VsZWN0TW9kZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVtaXQgd2hlbiBhIGNhbGVuZGFyIGNlbGwgaXMgc2VsZWN0ZWRcclxuICAgICAqICovXHJcbiAgICBAT3V0cHV0KClcclxuICAgIHB1YmxpYyByZWFkb25seSBzZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyQ2VsbD4oKTtcclxuXHJcbiAgICBnZXQgb3dsRFRDYWxlbmRhckJvZHlDbGFzcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNJblNpbmdsZU1vZGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3NpbmdsZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzSW5SYW5nZU1vZGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2UnIHx8XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0TW9kZSA9PT0gJ3JhbmdlRnJvbScgfHxcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RlID09PSAncmFuZ2VUbydcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxtUmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7fVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHt9XHJcblxyXG4gICAgcHVibGljIHNlbGVjdENlbGwoY2VsbDogQ2FsZW5kYXJDZWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3QuZW1pdChjZWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNBY3RpdmVDZWxsKHJvd0luZGV4OiBudW1iZXIsIGNvbEluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBjZWxsTnVtYmVyID0gcm93SW5kZXggKiB0aGlzLm51bUNvbHMgKyBjb2xJbmRleDtcclxuICAgICAgICByZXR1cm4gY2VsbE51bWJlciA9PT0gdGhpcy5hY3RpdmVDZWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIGNlbGwgaXMgc2VsZWN0ZWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzU2VsZWN0ZWQodmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RlZFZhbHVlcyB8fCB0aGlzLnNlbGVjdGVkVmFsdWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0luU2luZ2xlTW9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPT09IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0luUmFuZ2VNb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZyb21WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRWYWx1ZXNbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IHRvVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzFdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSBmcm9tVmFsdWUgfHwgdmFsdWUgPT09IHRvVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIGNlbGwgaW4gdGhlIHJhbmdlXHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIGlzSW5SYW5nZSh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBmcm9tVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdO1xyXG4gICAgICAgICAgICBjb25zdCB0b1ZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1sxXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmcm9tVmFsdWUgIT09IG51bGwgJiYgdG9WYWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID49IGZyb21WYWx1ZSAmJiB2YWx1ZSA8PSB0b1ZhbHVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID09PSBmcm9tVmFsdWUgfHwgdmFsdWUgPT09IHRvVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiB0aGUgY2VsbCBpcyB0aGUgcmFuZ2UgZnJvbVxyXG4gICAgICogKi9cclxuICAgIHB1YmxpYyBpc1JhbmdlRnJvbSh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBmcm9tVmFsdWUgPSB0aGlzLnNlbGVjdGVkVmFsdWVzWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gZnJvbVZhbHVlICE9PSBudWxsICYmIHZhbHVlID09PSBmcm9tVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdGhlIGNlbGwgaXMgdGhlIHJhbmdlIHRvXHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIGlzUmFuZ2VUbyh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNJblJhbmdlTW9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCB0b1ZhbHVlID0gdGhpcy5zZWxlY3RlZFZhbHVlc1sxXTtcclxuICAgICAgICAgICAgcmV0dXJuIHRvVmFsdWUgIT09IG51bGwgJiYgdmFsdWUgPT09IHRvVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRm9jdXMgdG8gYSBhY3RpdmUgY2VsbFxyXG4gICAgICogKi9cclxuICAgIHB1YmxpYyBmb2N1c0FjdGl2ZUNlbGwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZVxyXG4gICAgICAgICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXHJcbiAgICAgICAgICAgICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbG1SZWYubmF0aXZlRWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignLm93bC1kdC1jYWxlbmRhci1jZWxsLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19