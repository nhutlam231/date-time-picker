(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/cdk/a11y'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('@angular/cdk/keycodes'), require('@angular/cdk/coercion'), require('rxjs'), require('rxjs/operators'), require('@angular/animations'), require('@angular/forms'), require('@angular/cdk/platform')) :
    typeof define === 'function' && define.amd ? define('ng-pick-datetime', ['exports', '@angular/core', '@angular/common', '@angular/cdk/a11y', '@angular/cdk/overlay', '@angular/cdk/portal', '@angular/cdk/keycodes', '@angular/cdk/coercion', 'rxjs', 'rxjs/operators', '@angular/animations', '@angular/forms', '@angular/cdk/platform'], factory) :
    (global = global || self, factory(global['ng-pick-datetime'] = {}, global.ng.core, global.ng.common, global.ng.cdk.a11y, global.ng.cdk.overlay, global.ng.cdk.portal, global.ng.cdk.keycodes, global.ng.cdk.coercion, global.rxjs, global.rxjs.operators, global.ng.animations, global.ng.forms, global.ng.cdk.platform));
}(this, function (exports, core, common, a11y, overlay, portal, keycodes, coercion, rxjs, operators, animations, forms, platform) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OwlDateTimeIntl = /** @class */ (function () {
        function OwlDateTimeIntl() {
            /**
             * Stream that emits whenever the labels here are changed. Use this to notify
             * components if the labels have changed after initialization.
             */
            this.changes = new rxjs.Subject();
            /**
             * A label for the up second button (used by screen readers).
             */
            this.upSecondLabel = 'Add a second';
            /**
             * A label for the down second button (used by screen readers).
             */
            this.downSecondLabel = 'Minus a second';
            /**
             * A label for the up minute button (used by screen readers).
             */
            this.upMinuteLabel = 'Add a minute';
            /**
             * A label for the down minute button (used by screen readers).
             */
            this.downMinuteLabel = 'Minus a minute';
            /**
             * A label for the up hour button (used by screen readers).
             */
            this.upHourLabel = 'Add a hour';
            /**
             * A label for the down hour button (used by screen readers).
             */
            this.downHourLabel = 'Minus a hour';
            /**
             * A label for the previous month button (used by screen readers).
             */
            this.prevMonthLabel = 'Previous month';
            /**
             * A label for the next month button (used by screen readers).
             */
            this.nextMonthLabel = 'Next month';
            /**
             * A label for the previous year button (used by screen readers).
             */
            this.prevYearLabel = 'Previous year';
            /**
             * A label for the next year button (used by screen readers).
             */
            this.nextYearLabel = 'Next year';
            /**
             * A label for the previous multi-year button (used by screen readers).
             */
            this.prevMultiYearLabel = 'Previous 21 years';
            /**
             * A label for the next multi-year button (used by screen readers).
             */
            this.nextMultiYearLabel = 'Next 21 years';
            /**
             * A label for the 'switch to month view' button (used by screen readers).
             */
            this.switchToMonthViewLabel = 'Change to month view';
            /**
             * A label for the 'switch to year view' button (used by screen readers).
             */
            this.switchToMultiYearViewLabel = 'Choose month and year';
            /**
             * A label for the cancel button
             */
            this.cancelBtnLabel = 'Cancel';
            /**
             * A label for the set button
             */
            this.setBtnLabel = 'Set';
            /**
             * A label for the range 'from' in picker info
             */
            this.rangeFromLabel = 'From';
            /**
             * A label for the range 'to' in picker info
             */
            this.rangeToLabel = 'To';
            /**
             * A label for the hour12 button (AM)
             */
            this.hour12AMLabel = 'AM';
            /**
             * A label for the hour12 button (PM)
             */
            this.hour12PMLabel = 'PM';
        }
        OwlDateTimeIntl.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */ OwlDateTimeIntl.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function OwlDateTimeIntl_Factory() { return new OwlDateTimeIntl(); }, token: OwlDateTimeIntl, providedIn: "root" });
        return OwlDateTimeIntl;
    }());
    if (false) {
        /**
         * Stream that emits whenever the labels here are changed. Use this to notify
         * components if the labels have changed after initialization.
         * @type {?}
         */
        OwlDateTimeIntl.prototype.changes;
        /**
         * A label for the up second button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.upSecondLabel;
        /**
         * A label for the down second button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.downSecondLabel;
        /**
         * A label for the up minute button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.upMinuteLabel;
        /**
         * A label for the down minute button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.downMinuteLabel;
        /**
         * A label for the up hour button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.upHourLabel;
        /**
         * A label for the down hour button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.downHourLabel;
        /**
         * A label for the previous month button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.prevMonthLabel;
        /**
         * A label for the next month button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.nextMonthLabel;
        /**
         * A label for the previous year button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.prevYearLabel;
        /**
         * A label for the next year button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.nextYearLabel;
        /**
         * A label for the previous multi-year button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.prevMultiYearLabel;
        /**
         * A label for the next multi-year button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.nextMultiYearLabel;
        /**
         * A label for the 'switch to month view' button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.switchToMonthViewLabel;
        /**
         * A label for the 'switch to year view' button (used by screen readers).
         * @type {?}
         */
        OwlDateTimeIntl.prototype.switchToMultiYearViewLabel;
        /**
         * A label for the cancel button
         * @type {?}
         */
        OwlDateTimeIntl.prototype.cancelBtnLabel;
        /**
         * A label for the set button
         * @type {?}
         */
        OwlDateTimeIntl.prototype.setBtnLabel;
        /**
         * A label for the range 'from' in picker info
         * @type {?}
         */
        OwlDateTimeIntl.prototype.rangeFromLabel;
        /**
         * A label for the range 'to' in picker info
         * @type {?}
         */
        OwlDateTimeIntl.prototype.rangeToLabel;
        /**
         * A label for the hour12 button (AM)
         * @type {?}
         */
        OwlDateTimeIntl.prototype.hour12AMLabel;
        /**
         * A label for the hour12 button (PM)
         * @type {?}
         */
        OwlDateTimeIntl.prototype.hour12PMLabel;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * InjectionToken for date time picker that can be used to override default locale code.
     * @type {?}
     */
    var OWL_DATE_TIME_LOCALE = new core.InjectionToken('OWL_DATE_TIME_LOCALE', {
        providedIn: 'root',
        factory: OWL_DATE_TIME_LOCALE_FACTORY
    });
    /**
     * \@docs-private
     * @return {?}
     */
    function OWL_DATE_TIME_LOCALE_FACTORY() {
        return core.inject(core.LOCALE_ID);
    }
    /**
     * Provider for OWL_DATE_TIME_LOCALE injection token.
     * @type {?}
     */
    var OWL_DATE_TIME_LOCALE_PROVIDER = {
        provide: OWL_DATE_TIME_LOCALE,
        useExisting: core.LOCALE_ID
    };
    /**
     * @abstract
     * @template T
     */
    var   /**
     * @abstract
     * @template T
     */
    DateTimeAdapter = /** @class */ (function () {
        function DateTimeAdapter() {
            /**
             * A stream that emits when the locale changes.
             */
            this._localeChanges = new rxjs.Subject();
            /**
             * total milliseconds in a day.
             */
            this.millisecondsInDay = 86400000;
            /**
             * total milliseconds in a minute.
             */
            this.milliseondsInMinute = 60000;
        }
        Object.defineProperty(DateTimeAdapter.prototype, "localeChanges", {
            get: /**
             * @return {?}
             */
            function () {
                return this._localeChanges;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Compare two given dates
         * 1 if the first date is after the second,
         * -1 if the first date is before the second
         * 0 if dates are equal.
         * */
        /**
         * Compare two given dates
         * 1 if the first date is after the second,
         * -1 if the first date is before the second
         * 0 if dates are equal.
         *
         * @param {?} first
         * @param {?} second
         * @return {?}
         */
        DateTimeAdapter.prototype.compare = /**
         * Compare two given dates
         * 1 if the first date is after the second,
         * -1 if the first date is before the second
         * 0 if dates are equal.
         *
         * @param {?} first
         * @param {?} second
         * @return {?}
         */
        function (first, second) {
            if (!this.isValid(first) || !this.isValid(second)) {
                throw Error('JSNativeDate: Cannot compare invalid dates.');
            }
            /** @type {?} */
            var dateFirst = this.clone(first);
            /** @type {?} */
            var dateSecond = this.clone(second);
            /** @type {?} */
            var diff = this.getTime(dateFirst) - this.getTime(dateSecond);
            if (diff < 0) {
                return -1;
            }
            else if (diff > 0) {
                return 1;
            }
            else {
                // Return 0 if diff is 0; return NaN if diff is NaN
                return diff;
            }
        };
        /**
         * Check if two given dates are in the same year
         * 1 if the first date's year is after the second,
         * -1 if the first date's year is before the second
         * 0 if two given dates are in the same year
         * */
        /**
         * Check if two given dates are in the same year
         * 1 if the first date's year is after the second,
         * -1 if the first date's year is before the second
         * 0 if two given dates are in the same year
         *
         * @param {?} first
         * @param {?} second
         * @return {?}
         */
        DateTimeAdapter.prototype.compareYear = /**
         * Check if two given dates are in the same year
         * 1 if the first date's year is after the second,
         * -1 if the first date's year is before the second
         * 0 if two given dates are in the same year
         *
         * @param {?} first
         * @param {?} second
         * @return {?}
         */
        function (first, second) {
            if (!this.isValid(first) || !this.isValid(second)) {
                throw Error('JSNativeDate: Cannot compare invalid dates.');
            }
            /** @type {?} */
            var yearLeft = this.getYear(first);
            /** @type {?} */
            var yearRight = this.getYear(second);
            /** @type {?} */
            var diff = yearLeft - yearRight;
            if (diff < 0) {
                return -1;
            }
            else if (diff > 0) {
                return 1;
            }
            else {
                return 0;
            }
        };
        /**
         * Attempts to deserialize a value to a valid date object. This is different from parsing in that
         * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
         * string). The default implementation does not allow any deserialization, it simply checks that
         * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
         * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
         * support passing values from your backend directly to these properties by overriding this method
         * to also deserialize the format used by your backend.
         */
        /**
         * Attempts to deserialize a value to a valid date object. This is different from parsing in that
         * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
         * string). The default implementation does not allow any deserialization, it simply checks that
         * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
         * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
         * support passing values from your backend directly to these properties by overriding this method
         * to also deserialize the format used by your backend.
         * @param {?} value
         * @return {?}
         */
        DateTimeAdapter.prototype.deserialize = /**
         * Attempts to deserialize a value to a valid date object. This is different from parsing in that
         * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
         * string). The default implementation does not allow any deserialization, it simply checks that
         * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
         * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
         * support passing values from your backend directly to these properties by overriding this method
         * to also deserialize the format used by your backend.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value == null ||
                (this.isDateInstance(value) && this.isValid(value))) {
                return value;
            }
            return this.invalid();
        };
        /**
         * Sets the locale used for all dates.
         */
        /**
         * Sets the locale used for all dates.
         * @param {?} locale
         * @return {?}
         */
        DateTimeAdapter.prototype.setLocale = /**
         * Sets the locale used for all dates.
         * @param {?} locale
         * @return {?}
         */
        function (locale) {
            this.locale = locale;
            this._localeChanges.next();
        };
        /**
         * Clamp the given date between min and max dates.
         */
        /**
         * Clamp the given date between min and max dates.
         * @param {?} date
         * @param {?=} min
         * @param {?=} max
         * @return {?}
         */
        DateTimeAdapter.prototype.clampDate = /**
         * Clamp the given date between min and max dates.
         * @param {?} date
         * @param {?=} min
         * @param {?=} max
         * @return {?}
         */
        function (date, min, max) {
            if (min && this.compare(date, min) < 0) {
                return min;
            }
            if (max && this.compare(date, max) > 0) {
                return max;
            }
            return date;
        };
        return DateTimeAdapter;
    }());
    if (false) {
        /**
         * The locale to use for all dates.
         * @type {?}
         * @protected
         */
        DateTimeAdapter.prototype.locale;
        /**
         * A stream that emits when the locale changes.
         * @type {?}
         * @protected
         */
        DateTimeAdapter.prototype._localeChanges;
        /**
         * total milliseconds in a day.
         * @type {?}
         * @protected
         */
        DateTimeAdapter.prototype.millisecondsInDay;
        /**
         * total milliseconds in a minute.
         * @type {?}
         * @protected
         */
        DateTimeAdapter.prototype.milliseondsInMinute;
        /**
         * Get the year of the given date
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.getYear = function (date) { };
        /**
         * Get the month of the given date
         * 0 -- January
         * 11 -- December
         *
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.getMonth = function (date) { };
        /**
         * Get the day of the week of the given date
         * 0 -- Sunday
         * 6 -- Saturday
         *
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.getDay = function (date) { };
        /**
         * Get the day num of the given date
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.getDate = function (date) { };
        /**
         * Get the hours of the given date
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.getHours = function (date) { };
        /**
         * Get the minutes of the given date
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.getMinutes = function (date) { };
        /**
         * Get the seconds of the given date
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.getSeconds = function (date) { };
        /**
         * Get the milliseconds timestamp of the given date
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.getTime = function (date) { };
        /**
         * Gets the number of days in the month of the given date.
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.getNumDaysInMonth = function (date) { };
        /**
         * Get the number of calendar days between the given dates.
         * If dateLeft is before dateRight, it would return positive value
         * If dateLeft is after dateRight, it would return negative value
         * @abstract
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        DateTimeAdapter.prototype.differenceInCalendarDays = function (dateLeft, dateRight) { };
        /**
         * Gets the name for the year of the given date.
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.getYearName = function (date) { };
        /**
         * Get a list of month names
         * @abstract
         * @param {?} style
         * @return {?}
         */
        DateTimeAdapter.prototype.getMonthNames = function (style) { };
        /**
         * Get a list of week names
         * @abstract
         * @param {?} style
         * @return {?}
         */
        DateTimeAdapter.prototype.getDayOfWeekNames = function (style) { };
        /**
         * Gets a list of names for the dates of the month.
         * @abstract
         * @return {?}
         */
        DateTimeAdapter.prototype.getDateNames = function () { };
        /**
         * Return a Date object as a string, using the ISO standard
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.toIso8601 = function (date) { };
        /**
         * Check if the give dates are equal
         * @abstract
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        DateTimeAdapter.prototype.isEqual = function (dateLeft, dateRight) { };
        /**
         * Check if the give dates are the same day
         * @abstract
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        DateTimeAdapter.prototype.isSameDay = function (dateLeft, dateRight) { };
        /**
         * Checks whether the given date is valid.
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.isValid = function (date) { };
        /**
         * Gets date instance that is not valid.
         * @abstract
         * @return {?}
         */
        DateTimeAdapter.prototype.invalid = function () { };
        /**
         * Checks whether the given object is considered a date instance by this DateTimeAdapter.
         * @abstract
         * @param {?} obj
         * @return {?}
         */
        DateTimeAdapter.prototype.isDateInstance = function (obj) { };
        /**
         * Add the specified number of years to the given date
         * @abstract
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        DateTimeAdapter.prototype.addCalendarYears = function (date, amount) { };
        /**
         * Add the specified number of months to the given date
         * @abstract
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        DateTimeAdapter.prototype.addCalendarMonths = function (date, amount) { };
        /**
         * Add the specified number of days to the given date
         * @abstract
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        DateTimeAdapter.prototype.addCalendarDays = function (date, amount) { };
        /**
         * Set the hours to the given date.
         * @abstract
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        DateTimeAdapter.prototype.setHours = function (date, amount) { };
        /**
         * Set the minutes to the given date.
         * @abstract
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        DateTimeAdapter.prototype.setMinutes = function (date, amount) { };
        /**
         * Set the seconds to the given date.
         * @abstract
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        DateTimeAdapter.prototype.setSeconds = function (date, amount) { };
        /**
         * Creates a date with the given year, month, date, hour, minute and second. Does not allow over/under-flow of the
         * month and date.
         * @abstract
         * @param {?} year
         * @param {?} month
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.createDate = function (year, month, date) { };
        /**
         * @abstract
         * @param {?} year
         * @param {?} month
         * @param {?} date
         * @param {?} hours
         * @param {?} minutes
         * @param {?} seconds
         * @return {?}
         */
        DateTimeAdapter.prototype.createDate = function (year, month, date, hours, minutes, seconds) { };
        /**
         * Clone the given date
         * @abstract
         * @param {?} date
         * @return {?}
         */
        DateTimeAdapter.prototype.clone = function (date) { };
        /**
         * Get a new moment
         *
         * @abstract
         * @return {?}
         */
        DateTimeAdapter.prototype.now = function () { };
        /**
         * Formats a date as a string according to the given format.
         * @abstract
         * @param {?} date
         * @param {?} displayFormat
         * @return {?}
         */
        DateTimeAdapter.prototype.format = function (date, displayFormat) { };
        /**
         * Parse a user-provided value to a Date Object
         * @abstract
         * @param {?} value
         * @param {?} parseFormat
         * @return {?}
         */
        DateTimeAdapter.prototype.parse = function (value, parseFormat) { };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * InjectionToken for date time picker that can be used to override default format.
     * @type {?}
     */
    var OWL_DATE_TIME_FORMATS = new core.InjectionToken('OWL_DATE_TIME_FORMATS');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            this.pickerMomentChange = new core.EventEmitter();
            /**
             * Emits when the currently selected date changes.
             */
            this.selectedChange = new core.EventEmitter();
            /**
             * Emits when any date is selected.
             */
            this.userSelection = new core.EventEmitter();
            /**
             * Emits the selected year. This doesn't imply a change on the selected date
             *
             */
            this.yearSelected = new core.EventEmitter();
            /**
             * Emits the selected month. This doesn't imply a change on the selected date
             *
             */
            this.monthSelected = new core.EventEmitter();
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
            this.intlChangesSub = rxjs.Subscription.EMPTY;
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
                    .pipe(operators.take(1))
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
            { type: core.Component, args: [{
                        selector: 'owl-date-time-calendar',
                        exportAs: 'owlDateTimeCalendar',
                        template: "<div class=\"owl-dt-calendar-control\">\r\n    <!-- focus when keyboard tab (http://kizu.ru/en/blog/keyboard-only-focus/#x) -->\r\n    <button class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\r\n            type=\"button\" tabindex=\"0\"\r\n            [style.visibility]=\"showControlArrows? 'visible': 'hidden'\"\r\n            [disabled]=\"!prevButtonEnabled()\"\r\n            [attr.aria-label]=\"prevButtonLabel\"\r\n            (click)=\"previousClicked()\">\r\n        <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\r\n            <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\r\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 250.738 250.738\"\r\n                 style=\"enable-background:new 0 0 250.738 250.738;\" xml:space=\"preserve\"\r\n                 width=\"100%\" height=\"100%\">\r\n                <path style=\"fill-rule: evenodd; clip-rule: evenodd;\" d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"/>\r\n            </svg>\r\n            <!-- </editor-fold> -->\r\n        </span>\r\n    </button>\r\n    <div class=\"owl-dt-calendar-control-content\">\r\n        <button class=\"owl-dt-control owl-dt-control-button owl-dt-control-period-button\"\r\n                type=\"button\" tabindex=\"0\"\r\n                [attr.aria-label]=\"periodButtonLabel\"\r\n                (click)=\"toggleViews()\">\r\n            <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\r\n                {{periodButtonText}}\r\n\r\n                <span class=\"owl-dt-control-button-arrow\"\r\n                      [style.transform]=\"'rotate(' + (isMonthView? 0 : 180) +'deg)'\">\r\n                    <!-- <editor-fold desc=\"SVG Arrow\"> -->\r\n                    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n                         width=\"50%\" height=\"50%\" viewBox=\"0 0 292.362 292.362\" style=\"enable-background:new 0 0 292.362 292.362;\"\r\n                         xml:space=\"preserve\">\r\n                        <g>\r\n                            <path d=\"M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424\r\n                                C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428\r\n                                s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z\"/>\r\n                        </g>\r\n                    </svg>\r\n                    <!-- </editor-fold> -->\r\n                </span>\r\n            </span>\r\n        </button>\r\n    </div>\r\n    <button class=\"owl-dt-control owl-dt-control-button owl-dt-control-arrow-button\"\r\n            type=\"button\" tabindex=\"0\"\r\n            [style.visibility]=\"showControlArrows? 'visible': 'hidden'\"\r\n            [disabled]=\"!nextButtonEnabled()\"\r\n            [attr.aria-label]=\"nextButtonLabel\"\r\n            (click)=\"nextClicked()\">\r\n        <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\r\n            <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\r\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n                 viewBox=\"0 0 250.738 250.738\" style=\"enable-background:new 0 0 250.738 250.738;\" xml:space=\"preserve\">\r\n                <path style=\"fill-rule:evenodd;clip-rule:evenodd;\" d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\r\n                    c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\r\n                    c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\r\n                    C197.237,120.447,195.534,115.448,191.75,111.689z\"/>\r\n            </svg>\r\n            <!-- </editor-fold> -->\r\n        </span>\r\n    </button>\r\n</div>\r\n<div class=\"owl-dt-calendar-main\" cdkMonitorSubtreeFocus [ngSwitch]=\"currentView\" tabindex=\"-1\">\r\n    <owl-date-time-month-view\r\n            *ngSwitchCase=\"'month'\"\r\n            [pickerMoment]=\"pickerMoment\"\r\n            [firstDayOfWeek]=\"firstDayOfWeek\"\r\n            [selected]=\"selected\"\r\n            [selecteds]=\"selecteds\"\r\n            [selectMode]=\"selectMode\"\r\n            [minDate]=\"minDate\"\r\n            [maxDate]=\"maxDate\"\r\n            [dateFilter]=\"dateFilter\"\r\n            [hideOtherMonths]=\"hideOtherMonths\"\r\n            (pickerMomentChange)=\"handlePickerMomentChange($event)\"\r\n            (selectedChange)=\"dateSelected($event)\"\r\n            (userSelection)=\"userSelected()\"></owl-date-time-month-view>\r\n\r\n    <owl-date-time-year-view\r\n            *ngSwitchCase=\"'year'\"\r\n            [pickerMoment]=\"pickerMoment\"\r\n            [selected]=\"selected\"\r\n            [selecteds]=\"selecteds\"\r\n            [selectMode]=\"selectMode\"\r\n            [minDate]=\"minDate\"\r\n            [maxDate]=\"maxDate\"\r\n            [dateFilter]=\"dateFilter\"\r\n            (keyboardEnter)=\"focusActiveCell()\"\r\n            (pickerMomentChange)=\"handlePickerMomentChange($event)\"\r\n            (monthSelected)=\"selectMonthInYearView($event)\"\r\n            (change)=\"goToDateInView($event, 'month')\"></owl-date-time-year-view>\r\n\r\n    <owl-date-time-multi-year-view\r\n            *ngSwitchCase=\"'multi-years'\"\r\n            [pickerMoment]=\"pickerMoment\"\r\n            [selected]=\"selected\"\r\n            [selecteds]=\"selecteds\"\r\n            [selectMode]=\"selectMode\"\r\n            [minDate]=\"minDate\"\r\n            [maxDate]=\"maxDate\"\r\n            [dateFilter]=\"dateFilter\"\r\n            (keyboardEnter)=\"focusActiveCell()\"\r\n            (pickerMomentChange)=\"handlePickerMomentChange($event)\"\r\n            (yearSelected)=\"selectYearInMultiYearView($event)\"\r\n            (change)=\"goToDateInView($event, 'year')\"></owl-date-time-multi-year-view>\r\n</div>\r\n",
                        host: {
                            '[class.owl-dt-calendar]': 'owlDTCalendarClass'
                        },
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        OwlCalendarComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: OwlDateTimeIntl },
            { type: core.NgZone },
            { type: core.ChangeDetectorRef },
            { type: DateTimeAdapter, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
        ]; };
        OwlCalendarComponent.propDecorators = {
            dateFilter: [{ type: core.Input }],
            firstDayOfWeek: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            pickerMoment: [{ type: core.Input }],
            selectMode: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            selecteds: [{ type: core.Input }],
            startView: [{ type: core.Input }],
            hideOtherMonths: [{ type: core.Input }],
            pickerMomentChange: [{ type: core.Output }],
            selectedChange: [{ type: core.Output }],
            userSelection: [{ type: core.Output }],
            yearSelected: [{ type: core.Output }],
            monthSelected: [{ type: core.Output }]
        };
        return OwlCalendarComponent;
    }());
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var OwlTimerComponent = /** @class */ (function () {
        function OwlTimerComponent(ngZone, elmRef, pickerIntl, cdRef, dateTimeAdapter) {
            this.ngZone = ngZone;
            this.elmRef = elmRef;
            this.pickerIntl = pickerIntl;
            this.cdRef = cdRef;
            this.dateTimeAdapter = dateTimeAdapter;
            this.isPM = false; // a flag indicates the current timer moment is in PM or AM
            /**
             * Hours to change per step
             */
            this.stepHour = 1;
            /**
             * Minutes to change per step
             */
            this.stepMinute = 1;
            /**
             * Seconds to change per step
             */
            this.stepSecond = 1;
            /**
             * Seconds to auto update time value
             */
            this.debounceTime = 500;
            this.selectedChange = new core.EventEmitter();
        }
        Object.defineProperty(OwlTimerComponent.prototype, "pickerMoment", {
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
        Object.defineProperty(OwlTimerComponent.prototype, "minDateTime", {
            get: /**
             * @return {?}
             */
            function () {
                return this._minDateTime;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._minDateTime = this.getValidDate(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "maxDateTime", {
            get: /**
             * @return {?}
             */
            function () {
                return this._maxDateTime;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                value = this.dateTimeAdapter.deserialize(value);
                this._maxDateTime = this.getValidDate(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "hourValue", {
            get: /**
             * @return {?}
             */
            function () {
                return this.dateTimeAdapter.getHours(this.pickerMoment);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "hourBoxValue", {
            /**
             * The value would be displayed in hourBox.
             * We need this because the value displayed in hourBox it not
             * the same as the hourValue when the timer is in hour12Timer mode.
             * */
            get: /**
             * The value would be displayed in hourBox.
             * We need this because the value displayed in hourBox it not
             * the same as the hourValue when the timer is in hour12Timer mode.
             *
             * @return {?}
             */
            function () {
                /** @type {?} */
                var hours = this.hourValue;
                if (!this.hour12Timer) {
                    return hours;
                }
                else {
                    if (hours === 0) {
                        hours = 12;
                        this.isPM = false;
                    }
                    else if (hours > 0 && hours < 12) {
                        this.isPM = false;
                    }
                    else if (hours === 12) {
                        this.isPM = true;
                    }
                    else if (hours > 12 && hours < 24) {
                        hours = hours - 12;
                        this.isPM = true;
                    }
                    return hours;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "minuteValue", {
            get: /**
             * @return {?}
             */
            function () {
                return this.dateTimeAdapter.getMinutes(this.pickerMoment);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "secondValue", {
            get: /**
             * @return {?}
             */
            function () {
                return this.dateTimeAdapter.getSeconds(this.pickerMoment);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "upHourButtonLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return this.pickerIntl.upHourLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "downHourButtonLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return this.pickerIntl.downHourLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "upMinuteButtonLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return this.pickerIntl.upMinuteLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "downMinuteButtonLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return this.pickerIntl.downMinuteLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "upSecondButtonLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return this.pickerIntl.upSecondLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "downSecondButtonLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return this.pickerIntl.downSecondLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "hour12ButtonLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return this.isPM
                    ? this.pickerIntl.hour12PMLabel
                    : this.pickerIntl.hour12AMLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "owlDTTimerClass", {
            get: /**
             * @return {?}
             */
            function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerComponent.prototype, "owlDTTimeTabIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        OwlTimerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () { };
        /**
         * Focus to the host element
         * */
        /**
         * Focus to the host element
         *
         * @return {?}
         */
        OwlTimerComponent.prototype.focus = /**
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
                    .pipe(operators.take(1))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.elmRef.nativeElement.focus();
                }));
            }));
        };
        /**
         * Set the hour value via typing into timer box input
         * We need this to handle the hour value when the timer is in hour12 mode
         * */
        /**
         * Set the hour value via typing into timer box input
         * We need this to handle the hour value when the timer is in hour12 mode
         *
         * @param {?} hours
         * @return {?}
         */
        OwlTimerComponent.prototype.setHourValueViaInput = /**
         * Set the hour value via typing into timer box input
         * We need this to handle the hour value when the timer is in hour12 mode
         *
         * @param {?} hours
         * @return {?}
         */
        function (hours) {
            if (this.hour12Timer && this.isPM && hours >= 1 && hours <= 11) {
                hours = hours + 12;
            }
            else if (this.hour12Timer && !this.isPM && hours === 12) {
                hours = 0;
            }
            this.setHourValue(hours);
        };
        /**
         * @param {?} hours
         * @return {?}
         */
        OwlTimerComponent.prototype.setHourValue = /**
         * @param {?} hours
         * @return {?}
         */
        function (hours) {
            /** @type {?} */
            var m = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
            this.selectedChange.emit(m);
            this.cdRef.markForCheck();
        };
        /**
         * @param {?} minutes
         * @return {?}
         */
        OwlTimerComponent.prototype.setMinuteValue = /**
         * @param {?} minutes
         * @return {?}
         */
        function (minutes) {
            /** @type {?} */
            var m = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
            this.selectedChange.emit(m);
            this.cdRef.markForCheck();
        };
        /**
         * @param {?} seconds
         * @return {?}
         */
        OwlTimerComponent.prototype.setSecondValue = /**
         * @param {?} seconds
         * @return {?}
         */
        function (seconds) {
            /** @type {?} */
            var m = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
            this.selectedChange.emit(m);
            this.cdRef.markForCheck();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        OwlTimerComponent.prototype.setMeridiem = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.isPM = !this.isPM;
            /** @type {?} */
            var hours = this.hourValue;
            if (this.isPM) {
                hours = hours + 12;
            }
            else {
                hours = hours - 12;
            }
            if (hours >= 0 && hours <= 23) {
                this.setHourValue(hours);
            }
            this.cdRef.markForCheck();
            event.preventDefault();
        };
        /**
         * Check if the up hour button is enabled
         */
        /**
         * Check if the up hour button is enabled
         * @return {?}
         */
        OwlTimerComponent.prototype.upHourEnabled = /**
         * Check if the up hour button is enabled
         * @return {?}
         */
        function () {
            return (!this.maxDateTime ||
                this.compareHours(this.stepHour, this.maxDateTime) < 1);
        };
        /**
         * Check if the down hour button is enabled
         */
        /**
         * Check if the down hour button is enabled
         * @return {?}
         */
        OwlTimerComponent.prototype.downHourEnabled = /**
         * Check if the down hour button is enabled
         * @return {?}
         */
        function () {
            return (!this.minDateTime ||
                this.compareHours(-this.stepHour, this.minDateTime) > -1);
        };
        /**
         * Check if the up minute button is enabled
         */
        /**
         * Check if the up minute button is enabled
         * @return {?}
         */
        OwlTimerComponent.prototype.upMinuteEnabled = /**
         * Check if the up minute button is enabled
         * @return {?}
         */
        function () {
            return (!this.maxDateTime ||
                this.compareMinutes(this.stepMinute, this.maxDateTime) < 1);
        };
        /**
         * Check if the down minute button is enabled
         */
        /**
         * Check if the down minute button is enabled
         * @return {?}
         */
        OwlTimerComponent.prototype.downMinuteEnabled = /**
         * Check if the down minute button is enabled
         * @return {?}
         */
        function () {
            return (!this.minDateTime ||
                this.compareMinutes(-this.stepMinute, this.minDateTime) > -1);
        };
        /**
         * Check if the up second button is enabled
         */
        /**
         * Check if the up second button is enabled
         * @return {?}
         */
        OwlTimerComponent.prototype.upSecondEnabled = /**
         * Check if the up second button is enabled
         * @return {?}
         */
        function () {
            return (!this.maxDateTime ||
                this.compareSeconds(this.stepSecond, this.maxDateTime) < 1);
        };
        /**
         * Check if the down second button is enabled
         */
        /**
         * Check if the down second button is enabled
         * @return {?}
         */
        OwlTimerComponent.prototype.downSecondEnabled = /**
         * Check if the down second button is enabled
         * @return {?}
         */
        function () {
            return (!this.minDateTime ||
                this.compareSeconds(-this.stepSecond, this.minDateTime) > -1);
        };
        /**
         * PickerMoment's hour value +/- certain amount and compare it to the give date
         * 1 is after the comparedDate
         * -1 is before the comparedDate
         * 0 is equal the comparedDate
         * */
        /**
         * PickerMoment's hour value +/- certain amount and compare it to the give date
         * 1 is after the comparedDate
         * -1 is before the comparedDate
         * 0 is equal the comparedDate
         *
         * @private
         * @param {?} amount
         * @param {?} comparedDate
         * @return {?}
         */
        OwlTimerComponent.prototype.compareHours = /**
         * PickerMoment's hour value +/- certain amount and compare it to the give date
         * 1 is after the comparedDate
         * -1 is before the comparedDate
         * 0 is equal the comparedDate
         *
         * @private
         * @param {?} amount
         * @param {?} comparedDate
         * @return {?}
         */
        function (amount, comparedDate) {
            /** @type {?} */
            var hours = this.dateTimeAdapter.getHours(this.pickerMoment) + amount;
            /** @type {?} */
            var result = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
            return this.dateTimeAdapter.compare(result, comparedDate);
        };
        /**
         * PickerMoment's minute value +/- certain amount and compare it to the give date
         * 1 is after the comparedDate
         * -1 is before the comparedDate
         * 0 is equal the comparedDate
         * */
        /**
         * PickerMoment's minute value +/- certain amount and compare it to the give date
         * 1 is after the comparedDate
         * -1 is before the comparedDate
         * 0 is equal the comparedDate
         *
         * @private
         * @param {?} amount
         * @param {?} comparedDate
         * @return {?}
         */
        OwlTimerComponent.prototype.compareMinutes = /**
         * PickerMoment's minute value +/- certain amount and compare it to the give date
         * 1 is after the comparedDate
         * -1 is before the comparedDate
         * 0 is equal the comparedDate
         *
         * @private
         * @param {?} amount
         * @param {?} comparedDate
         * @return {?}
         */
        function (amount, comparedDate) {
            /** @type {?} */
            var minutes = this.dateTimeAdapter.getMinutes(this.pickerMoment) + amount;
            /** @type {?} */
            var result = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
            return this.dateTimeAdapter.compare(result, comparedDate);
        };
        /**
         * PickerMoment's second value +/- certain amount and compare it to the give date
         * 1 is after the comparedDate
         * -1 is before the comparedDate
         * 0 is equal the comparedDate
         * */
        /**
         * PickerMoment's second value +/- certain amount and compare it to the give date
         * 1 is after the comparedDate
         * -1 is before the comparedDate
         * 0 is equal the comparedDate
         *
         * @private
         * @param {?} amount
         * @param {?} comparedDate
         * @return {?}
         */
        OwlTimerComponent.prototype.compareSeconds = /**
         * PickerMoment's second value +/- certain amount and compare it to the give date
         * 1 is after the comparedDate
         * -1 is before the comparedDate
         * 0 is equal the comparedDate
         *
         * @private
         * @param {?} amount
         * @param {?} comparedDate
         * @return {?}
         */
        function (amount, comparedDate) {
            /** @type {?} */
            var seconds = this.dateTimeAdapter.getSeconds(this.pickerMoment) + amount;
            /** @type {?} */
            var result = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
            return this.dateTimeAdapter.compare(result, comparedDate);
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
        OwlTimerComponent.prototype.getValidDate = /**
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
        OwlTimerComponent.decorators = [
            { type: core.Component, args: [{
                        exportAs: 'owlDateTimeTimer',
                        selector: 'owl-date-time-timer',
                        template: "<owl-date-time-timer-box\r\n        [upBtnAriaLabel]=\"upHourButtonLabel\"\r\n        [downBtnAriaLabel]=\"downHourButtonLabel\"\r\n        [upBtnDisabled]=\"!upHourEnabled()\"\r\n        [downBtnDisabled]=\"!downHourEnabled()\"\r\n        [boxValue]=\"hourBoxValue\"\r\n        [value]=\"hourValue\" [min]=\"0\" [max]=\"23\"\r\n        [step]=\"stepHour\" [inputLabel]=\"'Hour'\"\r\n        [debounceTime]=\"debounceTime\"\r\n        (inputChange)=\"setHourValueViaInput($event)\"\r\n        (valueChange)=\"setHourValue($event)\"></owl-date-time-timer-box>\r\n<owl-date-time-timer-box\r\n        [showDivider]=\"true\"\r\n        [upBtnAriaLabel]=\"upMinuteButtonLabel\"\r\n        [downBtnAriaLabel]=\"downMinuteButtonLabel\"\r\n        [upBtnDisabled]=\"!upMinuteEnabled()\"\r\n        [downBtnDisabled]=\"!downMinuteEnabled()\"\r\n        [value]=\"minuteValue\" [min]=\"0\" [max]=\"59\"\r\n        [step]=\"stepMinute\" [inputLabel]=\"'Minute'\"\r\n        [debounceTime]=\"debounceTime\"\r\n        (inputChange)=\"setMinuteValue($event)\"\r\n        (valueChange)=\"setMinuteValue($event)\"></owl-date-time-timer-box>\r\n<owl-date-time-timer-box\r\n        *ngIf=\"showSecondsTimer\"\r\n        [showDivider]=\"true\"\r\n        [upBtnAriaLabel]=\"upSecondButtonLabel\"\r\n        [downBtnAriaLabel]=\"downSecondButtonLabel\"\r\n        [upBtnDisabled]=\"!upSecondEnabled()\"\r\n        [downBtnDisabled]=\"!downSecondEnabled()\"\r\n        [value]=\"secondValue\" [min]=\"0\" [max]=\"59\"\r\n        [step]=\"stepSecond\" [inputLabel]=\"'Second'\"\r\n        [debounceTime]=\"debounceTime\"\r\n        (inputChange)=\"setSecondValue($event)\"\r\n        (valueChange)=\"setSecondValue($event)\"></owl-date-time-timer-box>\r\n\r\n<div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\">\r\n    <button class=\"owl-dt-control-button owl-dt-timer-hour12-box\"\r\n            type=\"button\" tabindex=\"0\"\r\n            (click)=\"setMeridiem($event)\">\r\n        <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n            {{hour12ButtonLabel}}\r\n        </span>\r\n    </button>\r\n</div>\r\n",
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            '[class.owl-dt-timer]': 'owlDTTimerClass',
                            '[attr.tabindex]': 'owlDTTimeTabIndex'
                        },
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        OwlTimerComponent.ctorParameters = function () { return [
            { type: core.NgZone },
            { type: core.ElementRef },
            { type: OwlDateTimeIntl },
            { type: core.ChangeDetectorRef },
            { type: DateTimeAdapter, decorators: [{ type: core.Optional }] }
        ]; };
        OwlTimerComponent.propDecorators = {
            pickerMoment: [{ type: core.Input }],
            minDateTime: [{ type: core.Input }],
            maxDateTime: [{ type: core.Input }],
            showSecondsTimer: [{ type: core.Input }],
            hour12Timer: [{ type: core.Input }],
            stepHour: [{ type: core.Input }],
            stepMinute: [{ type: core.Input }],
            stepSecond: [{ type: core.Input }],
            debounceTime: [{ type: core.Input }],
            selectedChange: [{ type: core.Output }]
        };
        return OwlTimerComponent;
    }());
    if (false) {
        /**
         * The current picker moment
         * @type {?}
         * @private
         */
        OwlTimerComponent.prototype._pickerMoment;
        /**
         * The minimum selectable date time.
         * @type {?}
         * @private
         */
        OwlTimerComponent.prototype._minDateTime;
        /**
         * The maximum selectable date time.
         * @type {?}
         * @private
         */
        OwlTimerComponent.prototype._maxDateTime;
        /**
         * @type {?}
         * @private
         */
        OwlTimerComponent.prototype.isPM;
        /**
         * Whether to show the second's timer
         * @type {?}
         */
        OwlTimerComponent.prototype.showSecondsTimer;
        /**
         * Whether the timer is in hour12 format
         * @type {?}
         */
        OwlTimerComponent.prototype.hour12Timer;
        /**
         * Hours to change per step
         * @type {?}
         */
        OwlTimerComponent.prototype.stepHour;
        /**
         * Minutes to change per step
         * @type {?}
         */
        OwlTimerComponent.prototype.stepMinute;
        /**
         * Seconds to change per step
         * @type {?}
         */
        OwlTimerComponent.prototype.stepSecond;
        /**
         * Seconds to auto update time value
         * @type {?}
         */
        OwlTimerComponent.prototype.debounceTime;
        /** @type {?} */
        OwlTimerComponent.prototype.selectedChange;
        /**
         * @type {?}
         * @private
         */
        OwlTimerComponent.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        OwlTimerComponent.prototype.elmRef;
        /**
         * @type {?}
         * @private
         */
        OwlTimerComponent.prototype.pickerIntl;
        /**
         * @type {?}
         * @private
         */
        OwlTimerComponent.prototype.cdRef;
        /**
         * @type {?}
         * @private
         */
        OwlTimerComponent.prototype.dateTimeAdapter;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var owlDateTimePickerAnimations = {
        transformPicker: animations.trigger('transformPicker', [
            animations.state('void', animations.style({ opacity: 0, transform: 'scale(1, 0)' })),
            animations.state('enter', animations.style({ opacity: 1, transform: 'scale(1, 1)' })),
            animations.transition('void => enter', animations.group([
                animations.query('@fadeInPicker', animations.animateChild(), { optional: true }),
                animations.animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
            ])),
            animations.transition('enter => void', animations.animate('100ms linear', animations.style({ opacity: 0 })))
        ]),
        fadeInPicker: animations.trigger('fadeInPicker', [
            animations.state('enter', animations.style({ opacity: 1 })),
            animations.state('void', animations.style({ opacity: 0 })),
            animations.transition('void => enter', animations.animate('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')),
        ])
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            this.hidePicker$ = new rxjs.Subject();
            /**
             * Stream emits when try to confirm the selected value
             *
             */
            this.confirmSelected$ = new rxjs.Subject();
            this.pickerOpened$ = new rxjs.Subject();
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
                var selecteds = __spread(this.picker.selecteds);
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
                case keycodes.DOWN_ARROW:
                case keycodes.RIGHT_ARROW:
                case keycodes.UP_ARROW:
                case keycodes.LEFT_ARROW:
                    next.focus();
                    this.setActiveSelectedIndex(index === 0 ? 1 : 0);
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                case keycodes.SPACE:
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
            { type: core.Component, args: [{
                        exportAs: 'owlDateTimeContainer',
                        selector: 'owl-date-time-container',
                        template: "<div [cdkTrapFocus]=\"picker.pickerMode !== 'inline'\"\r\n     [@fadeInPicker]=\"picker.pickerMode === 'inline'? '' : 'enter'\"\r\n     class=\"owl-dt-container-inner\">\r\n\r\n    <owl-date-time-calendar\r\n            *ngIf=\"pickerType === 'both' || pickerType === 'calendar'\"\r\n            class=\"owl-dt-container-row\"\r\n            [firstDayOfWeek]=\"picker.firstDayOfWeek\"\r\n            [(pickerMoment)]=\"pickerMoment\"\r\n            [selected]=\"picker.selected\"\r\n            [selecteds]=\"picker.selecteds\"\r\n            [selectMode]=\"picker.selectMode\"\r\n            [minDate]=\"picker.minDateTime\"\r\n            [maxDate]=\"picker.maxDateTime\"\r\n            [dateFilter]=\"picker.dateTimeFilter\"\r\n            [startView]=\"picker.startView\"\r\n            [hideOtherMonths]=\"picker.hideOtherMonths\"\r\n            (yearSelected)=\"picker.selectYear($event)\"\r\n            (monthSelected)=\"picker.selectMonth($event)\"\r\n            (selectedChange)=\"dateSelected($event)\"></owl-date-time-calendar>\r\n\r\n    <owl-date-time-timer\r\n            *ngIf=\"pickerType === 'both' || pickerType === 'timer'\"\r\n            class=\"owl-dt-container-row\"\r\n            [pickerMoment]=\"pickerMoment\"\r\n            [minDateTime]=\"picker.minDateTime\"\r\n            [maxDateTime]=\"picker.maxDateTime\"\r\n            [showSecondsTimer]=\"picker.showSecondsTimer\"\r\n            [hour12Timer]=\"picker.hour12Timer\"\r\n            [stepHour]=\"picker.stepHour\"\r\n            [stepMinute]=\"picker.stepMinute\"\r\n            [stepSecond]=\"picker.stepSecond\"\r\n            [debounceTime]=\"picker.debounceTime\"\r\n            (selectedChange)=\"timeSelected($event)\"></owl-date-time-timer>\r\n\r\n    <div *ngIf=\"picker.isInRangeMode\"\r\n         role=\"radiogroup\"\r\n         class=\"owl-dt-container-info owl-dt-container-row\">\r\n        <div role=\"radio\" [tabindex]=\"activeSelectedIndex === 0 ? 0 : -1\"\r\n             [attr.aria-checked]=\"activeSelectedIndex === 0\"\r\n             class=\"owl-dt-control owl-dt-container-range owl-dt-container-from\"\r\n             [ngClass]=\"{'owl-dt-container-info-active': activeSelectedIndex === 0}\"\r\n             (click)=\"handleClickOnInfoGroup($event, 0)\"\r\n             (keydown)=\"handleKeydownOnInfoGroup($event, to, 0)\" #from>\r\n            <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\r\n                <span class=\"owl-dt-container-info-label\">{{fromLabel}}:</span>\r\n                <span class=\"owl-dt-container-info-value\">{{fromFormattedValue}}</span>\r\n            </span>\r\n        </div>\r\n        <div role=\"radio\" [tabindex]=\"activeSelectedIndex === 1 ? 0 : -1\"\r\n             [attr.aria-checked]=\"activeSelectedIndex === 1\"\r\n             class=\"owl-dt-control owl-dt-container-range owl-dt-container-to\"\r\n             [ngClass]=\"{'owl-dt-container-info-active': activeSelectedIndex === 1}\"\r\n             (click)=\"handleClickOnInfoGroup($event, 1)\"\r\n             (keydown)=\"handleKeydownOnInfoGroup($event, from, 1)\" #to>\r\n            <span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\">\r\n                <span class=\"owl-dt-container-info-label\">{{toLabel}}:</span>\r\n                <span class=\"owl-dt-container-info-value\">{{toFormattedValue}}</span>\r\n            </span>\r\n        </div>\r\n    </div>\r\n\r\n    <div *ngIf=\"showControlButtons\" class=\"owl-dt-container-buttons owl-dt-container-row\">\r\n        <button class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\"\r\n                type=\"button\" tabindex=\"0\"\r\n                (click)=\"onCancelClicked($event)\">\r\n            <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\r\n                {{cancelLabel}}\r\n            </span>\r\n        </button>\r\n        <button class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\"\r\n                type=\"button\" tabindex=\"0\"\r\n                (click)=\"onSetClicked($event)\">\r\n            <span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">\r\n                {{setLabel}}\r\n            </span>\r\n        </button>\r\n    </div>\r\n</div>\r\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
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
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: OwlDateTimeIntl },
            { type: DateTimeAdapter, decorators: [{ type: core.Optional }] }
        ]; };
        OwlDateTimeContainerComponent.propDecorators = {
            calendar: [{ type: core.ViewChild, args: [OwlCalendarComponent, { static: false },] }],
            timer: [{ type: core.ViewChild, args: [OwlTimerComponent, { static: false },] }]
        };
        return OwlDateTimeContainerComponent;
    }());
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var nextUniqueId = 0;
    /**
     * @abstract
     * @template T
     */
    var OwlDateTime = /** @class */ (function () {
        function OwlDateTime(dateTimeAdapter, dateTimeFormats) {
            var _this = this;
            this.dateTimeAdapter = dateTimeAdapter;
            this.dateTimeFormats = dateTimeFormats;
            /**
             * Whether to show the second's timer
             */
            this._showSecondsTimer = false;
            /**
             * Whether the timer is in hour12 format
             */
            this._hour12Timer = false;
            /**
             * The view that the calendar should start in.
             */
            this.startView = 'month';
            /**
             * debounceTime for auto correct timer.
             */
            this.debounceTime = 500;
            /**
             * Hours to change per step
             */
            this._stepHour = 1;
            /**
             * Minutes to change per step
             */
            this._stepMinute = 1;
            /**
             * Seconds to change per step
             */
            this._stepSecond = 1;
            /**
             * Set the first day of week
             */
            this._firstDayOfWeek = 0;
            /**
             * Whether to hide dates in other months at the start or end of the current month.
             */
            this._hideOtherMonths = false;
            /**
             * Date Time Checker to check if the give dateTime is selectable
             */
            this.dateTimeChecker = (/**
             * @param {?} dateTime
             * @return {?}
             */
            function (dateTime) {
                return (!!dateTime &&
                    (!_this.dateTimeFilter || _this.dateTimeFilter(dateTime)) &&
                    (!_this.minDateTime ||
                        _this.dateTimeAdapter.compare(dateTime, _this.minDateTime) >=
                            0) &&
                    (!_this.maxDateTime ||
                        _this.dateTimeAdapter.compare(dateTime, _this.maxDateTime) <= 0));
            });
            if (!this.dateTimeAdapter) {
                throw Error("OwlDateTimePicker: No provider found for DateTimeAdapter. You must import one of the following " +
                    "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                    "custom implementation.");
            }
            if (!this.dateTimeFormats) {
                throw Error("OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following " +
                    "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " +
                    "custom implementation.");
            }
            this._id = "owl-dt-picker-" + nextUniqueId++;
        }
        Object.defineProperty(OwlDateTime.prototype, "showSecondsTimer", {
            get: /**
             * @return {?}
             */
            function () {
                return this._showSecondsTimer;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._showSecondsTimer = coercion.coerceBooleanProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "hour12Timer", {
            get: /**
             * @return {?}
             */
            function () {
                return this._hour12Timer;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._hour12Timer = coercion.coerceBooleanProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "stepHour", {
            get: /**
             * @return {?}
             */
            function () {
                return this._stepHour;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._stepHour = coercion.coerceNumberProperty(val, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "stepMinute", {
            get: /**
             * @return {?}
             */
            function () {
                return this._stepMinute;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._stepMinute = coercion.coerceNumberProperty(val, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "stepSecond", {
            get: /**
             * @return {?}
             */
            function () {
                return this._stepSecond;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._stepSecond = coercion.coerceNumberProperty(val, 1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "firstDayOfWeek", {
            get: /**
             * @return {?}
             */
            function () {
                return this._firstDayOfWeek;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                value = coercion.coerceNumberProperty(value, 0);
                if (value > 6 || value < 0) {
                    this._firstDayOfWeek = 0;
                }
                else {
                    this._firstDayOfWeek = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "hideOtherMonths", {
            get: /**
             * @return {?}
             */
            function () {
                return this._hideOtherMonths;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._hideOtherMonths = coercion.coerceBooleanProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "id", {
            get: /**
             * @return {?}
             */
            function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "formatString", {
            get: /**
             * @return {?}
             */
            function () {
                return this.pickerType === 'both'
                    ? this.dateTimeFormats.fullPickerInput
                    : this.pickerType === 'calendar'
                        ? this.dateTimeFormats.datePickerInput
                        : this.dateTimeFormats.timePickerInput;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTime.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @protected
         * @param {?} obj
         * @return {?}
         */
        OwlDateTime.prototype.getValidDate = /**
         * @protected
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            return this.dateTimeAdapter.isDateInstance(obj) &&
                this.dateTimeAdapter.isValid(obj)
                ? obj
                : null;
        };
        /** @nocollapse */
        OwlDateTime.ctorParameters = function () { return [
            { type: DateTimeAdapter, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
        ]; };
        OwlDateTime.propDecorators = {
            showSecondsTimer: [{ type: core.Input }],
            hour12Timer: [{ type: core.Input }],
            startView: [{ type: core.Input }],
            debounceTime: [{ type: core.Input }],
            stepHour: [{ type: core.Input }],
            stepMinute: [{ type: core.Input }],
            stepSecond: [{ type: core.Input }],
            firstDayOfWeek: [{ type: core.Input }],
            hideOtherMonths: [{ type: core.Input }]
        };
        return OwlDateTime;
    }());
    if (false) {
        /**
         * Whether to show the second's timer
         * @type {?}
         * @private
         */
        OwlDateTime.prototype._showSecondsTimer;
        /**
         * Whether the timer is in hour12 format
         * @type {?}
         * @private
         */
        OwlDateTime.prototype._hour12Timer;
        /**
         * The view that the calendar should start in.
         * @type {?}
         */
        OwlDateTime.prototype.startView;
        /**
         * debounceTime for auto correct timer.
         * @type {?}
         */
        OwlDateTime.prototype.debounceTime;
        /**
         * Hours to change per step
         * @type {?}
         * @private
         */
        OwlDateTime.prototype._stepHour;
        /**
         * Minutes to change per step
         * @type {?}
         * @private
         */
        OwlDateTime.prototype._stepMinute;
        /**
         * Seconds to change per step
         * @type {?}
         * @private
         */
        OwlDateTime.prototype._stepSecond;
        /**
         * Set the first day of week
         * @type {?}
         * @private
         */
        OwlDateTime.prototype._firstDayOfWeek;
        /**
         * Whether to hide dates in other months at the start or end of the current month.
         * @type {?}
         * @private
         */
        OwlDateTime.prototype._hideOtherMonths;
        /**
         * @type {?}
         * @private
         */
        OwlDateTime.prototype._id;
        /** @type {?} */
        OwlDateTime.prototype.yearSelected;
        /** @type {?} */
        OwlDateTime.prototype.monthSelected;
        /**
         * Date Time Checker to check if the give dateTime is selectable
         * @type {?}
         */
        OwlDateTime.prototype.dateTimeChecker;
        /**
         * @type {?}
         * @protected
         */
        OwlDateTime.prototype.dateTimeAdapter;
        /**
         * @type {?}
         * @protected
         */
        OwlDateTime.prototype.dateTimeFormats;
        /**
         * @abstract
         * @return {?}
         */
        OwlDateTime.prototype.selected = function () { };
        /**
         * @abstract
         * @return {?}
         */
        OwlDateTime.prototype.selecteds = function () { };
        /**
         * @abstract
         * @return {?}
         */
        OwlDateTime.prototype.dateTimeFilter = function () { };
        /**
         * @abstract
         * @return {?}
         */
        OwlDateTime.prototype.maxDateTime = function () { };
        /**
         * @abstract
         * @return {?}
         */
        OwlDateTime.prototype.minDateTime = function () { };
        /**
         * @abstract
         * @return {?}
         */
        OwlDateTime.prototype.selectMode = function () { };
        /**
         * @abstract
         * @return {?}
         */
        OwlDateTime.prototype.startAt = function () { };
        /**
         * @abstract
         * @return {?}
         */
        OwlDateTime.prototype.opened = function () { };
        /**
         * @abstract
         * @return {?}
         */
        OwlDateTime.prototype.pickerMode = function () { };
        /**
         * @abstract
         * @return {?}
         */
        OwlDateTime.prototype.pickerType = function () { };
        /**
         * @abstract
         * @return {?}
         */
        OwlDateTime.prototype.isInSingleMode = function () { };
        /**
         * @abstract
         * @return {?}
         */
        OwlDateTime.prototype.isInRangeMode = function () { };
        /**
         * @abstract
         * @param {?} date
         * @return {?}
         */
        OwlDateTime.prototype.select = function (date) { };
        /**
         * @abstract
         * @param {?} normalizedYear
         * @return {?}
         */
        OwlDateTime.prototype.selectYear = function (normalizedYear) { };
        /**
         * @abstract
         * @param {?} normalizedMonth
         * @return {?}
         */
        OwlDateTime.prototype.selectMonth = function (normalizedMonth) { };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var uniqueId = 0;
    /**
     * Possible overrides for a dialog's position.
     * @record
     */
    function DialogPosition() { }
    if (false) {
        /**
         * Override for the dialog's top position.
         * @type {?|undefined}
         */
        DialogPosition.prototype.top;
        /**
         * Override for the dialog's bottom position.
         * @type {?|undefined}
         */
        DialogPosition.prototype.bottom;
        /**
         * Override for the dialog's left position.
         * @type {?|undefined}
         */
        DialogPosition.prototype.left;
        /**
         * Override for the dialog's right position.
         * @type {?|undefined}
         */
        DialogPosition.prototype.right;
    }
    var OwlDialogConfig = /** @class */ (function () {
        function OwlDialogConfig() {
            /**
             * ID of the element that describes the dialog.
             */
            this.ariaDescribedBy = null;
            /**
             * Whether to focus the dialog when the dialog is opened
             */
            this.autoFocus = true;
            /**
             * Whether the dialog has a backdrop.
             */
            this.hasBackdrop = true;
            /**
             * Data being injected into the child component.
             */
            this.data = null;
            /**
             * Whether the user can use escape or clicking outside to close a modal.
             */
            this.disableClose = false;
            /**
             * The ARIA role of the dialog element.
             */
            this.role = 'dialog';
            /**
             * Custom class for the pane
             *
             */
            this.paneClass = '';
            /**
             * Mouse Event
             *
             */
            this.event = null;
            /**
             * Custom class for the backdrop
             *
             */
            this.backdropClass = '';
            /**
             * Whether the dialog should close when the user goes backwards/forwards in history.
             *
             */
            this.closeOnNavigation = true;
            /**
             * Width of the dialog.
             */
            this.width = '';
            /**
             * Height of the dialog.
             */
            this.height = '';
            /**
             * The max-width of the overlay panel.
             * If a number is provided, pixel units are assumed.
             *
             */
            this.maxWidth = '85vw';
            /**
             * The scroll strategy when the dialog is open
             * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
             *
             */
            this.scrollStrategy = new overlay.NoopScrollStrategy();
            this.id = "owl-dialog-" + uniqueId++;
        }
        return OwlDialogConfig;
    }());
    if (false) {
        /**
         * ID of the element that describes the dialog.
         * @type {?}
         */
        OwlDialogConfig.prototype.ariaDescribedBy;
        /**
         * Whether to focus the dialog when the dialog is opened
         * @type {?}
         */
        OwlDialogConfig.prototype.autoFocus;
        /**
         * Whether the dialog has a backdrop.
         * @type {?}
         */
        OwlDialogConfig.prototype.hasBackdrop;
        /**
         * Custom style for the backdrop
         *
         * @type {?}
         */
        OwlDialogConfig.prototype.backdropStyle;
        /**
         * Data being injected into the child component.
         * @type {?}
         */
        OwlDialogConfig.prototype.data;
        /**
         * Whether the user can use escape or clicking outside to close a modal.
         * @type {?}
         */
        OwlDialogConfig.prototype.disableClose;
        /**
         * ID for the modal. If omitted, a unique one will be generated.
         * @type {?}
         */
        OwlDialogConfig.prototype.id;
        /**
         * The ARIA role of the dialog element.
         * @type {?}
         */
        OwlDialogConfig.prototype.role;
        /**
         * Custom class for the pane
         *
         * @type {?}
         */
        OwlDialogConfig.prototype.paneClass;
        /**
         * Mouse Event
         *
         * @type {?}
         */
        OwlDialogConfig.prototype.event;
        /**
         * Custom class for the backdrop
         *
         * @type {?}
         */
        OwlDialogConfig.prototype.backdropClass;
        /**
         * Whether the dialog should close when the user goes backwards/forwards in history.
         *
         * @type {?}
         */
        OwlDialogConfig.prototype.closeOnNavigation;
        /**
         * Width of the dialog.
         * @type {?}
         */
        OwlDialogConfig.prototype.width;
        /**
         * Height of the dialog.
         * @type {?}
         */
        OwlDialogConfig.prototype.height;
        /**
         * The min-width of the overlay panel.
         * If a number is provided, pixel units are assumed.
         *
         * @type {?}
         */
        OwlDialogConfig.prototype.minWidth;
        /**
         * The min-height of the overlay panel.
         * If a number is provided, pixel units are assumed.
         *
         * @type {?}
         */
        OwlDialogConfig.prototype.minHeight;
        /**
         * The max-width of the overlay panel.
         * If a number is provided, pixel units are assumed.
         *
         * @type {?}
         */
        OwlDialogConfig.prototype.maxWidth;
        /**
         * The max-height of the overlay panel.
         * If a number is provided, pixel units are assumed.
         *
         * @type {?}
         */
        OwlDialogConfig.prototype.maxHeight;
        /**
         * Position overrides.
         * @type {?}
         */
        OwlDialogConfig.prototype.position;
        /**
         * The scroll strategy when the dialog is open
         * Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies
         *
         * @type {?}
         */
        OwlDialogConfig.prototype.scrollStrategy;
        /** @type {?} */
        OwlDialogConfig.prototype.viewContainerRef;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var /**
     * @template T
     */
    OwlDialogRef = /** @class */ (function () {
        function OwlDialogRef(overlayRef, container, id, location) {
            var _this = this;
            this.overlayRef = overlayRef;
            this.container = container;
            this.id = id;
            this._beforeClose$ = new rxjs.Subject();
            this._afterOpen$ = new rxjs.Subject();
            this._afterClosed$ = new rxjs.Subject();
            /**
             * Subscription to changes in the user's location.
             */
            this.locationChanged = rxjs.Subscription.EMPTY;
            /**
             * Whether the user is allowed to close the dialog.
             */
            this.disableClose = this.container.config.disableClose;
            this.container.animationStateChanged
                .pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.phaseName === 'done' && event.toState === 'enter'; })), operators.take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this._afterOpen$.next();
                _this._afterOpen$.complete();
            }));
            this.container.animationStateChanged
                .pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.phaseName === 'done' && event.toState === 'exit'; })), operators.take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.overlayRef.dispose();
                _this.locationChanged.unsubscribe();
                _this._afterClosed$.next(_this.result);
                _this._afterClosed$.complete();
                _this.componentInstance = (/** @type {?} */ (null));
            }));
            this.overlayRef.keydownEvents()
                .pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.keyCode === keycodes.ESCAPE && !_this.disableClose; })))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.close(); }));
            if (location) {
                this.locationChanged = location.subscribe((/**
                 * @return {?}
                 */
                function () {
                    if (_this.container.config.closeOnNavigation) {
                        _this.close();
                    }
                }));
            }
        }
        /**
         * @param {?=} dialogResult
         * @return {?}
         */
        OwlDialogRef.prototype.close = /**
         * @param {?=} dialogResult
         * @return {?}
         */
        function (dialogResult) {
            var _this = this;
            this.result = dialogResult;
            this.container.animationStateChanged
                .pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.phaseName === 'start'; })), operators.take(1))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this._beforeClose$.next(dialogResult);
                _this._beforeClose$.complete();
                _this.overlayRef.detachBackdrop();
            }));
            this.container.startExitAnimation();
        };
        /**
         * Gets an observable that emits when the overlay's backdrop has been clicked.
         */
        /**
         * Gets an observable that emits when the overlay's backdrop has been clicked.
         * @return {?}
         */
        OwlDialogRef.prototype.backdropClick = /**
         * Gets an observable that emits when the overlay's backdrop has been clicked.
         * @return {?}
         */
        function () {
            return this.overlayRef.backdropClick();
        };
        /**
         * Gets an observable that emits when keydown events are targeted on the overlay.
         */
        /**
         * Gets an observable that emits when keydown events are targeted on the overlay.
         * @return {?}
         */
        OwlDialogRef.prototype.keydownEvents = /**
         * Gets an observable that emits when keydown events are targeted on the overlay.
         * @return {?}
         */
        function () {
            return this.overlayRef.keydownEvents();
        };
        /**
         * Updates the dialog's position.
         * @param position New dialog position.
         */
        /**
         * Updates the dialog's position.
         * @template THIS
         * @this {THIS}
         * @param {?=} position New dialog position.
         * @return {THIS}
         */
        OwlDialogRef.prototype.updatePosition = /**
         * Updates the dialog's position.
         * @template THIS
         * @this {THIS}
         * @param {?=} position New dialog position.
         * @return {THIS}
         */
        function (position) {
            /** @type {?} */
            var strategy = (/** @type {?} */ (this)).getPositionStrategy();
            if (position && (position.left || position.right)) {
                position.left ? strategy.left(position.left) : strategy.right(position.right);
            }
            else {
                strategy.centerHorizontally();
            }
            if (position && (position.top || position.bottom)) {
                position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
            }
            else {
                strategy.centerVertically();
            }
            (/** @type {?} */ (this)).overlayRef.updatePosition();
            return (/** @type {?} */ (this));
        };
        /**
         * Updates the dialog's width and height.
         * @param width New width of the dialog.
         * @param height New height of the dialog.
         */
        /**
         * Updates the dialog's width and height.
         * @template THIS
         * @this {THIS}
         * @param {?=} width New width of the dialog.
         * @param {?=} height New height of the dialog.
         * @return {THIS}
         */
        OwlDialogRef.prototype.updateSize = /**
         * Updates the dialog's width and height.
         * @template THIS
         * @this {THIS}
         * @param {?=} width New width of the dialog.
         * @param {?=} height New height of the dialog.
         * @return {THIS}
         */
        function (width, height) {
            if (width === void 0) { width = 'auto'; }
            if (height === void 0) { height = 'auto'; }
            (/** @type {?} */ (this)).getPositionStrategy().width(width).height(height);
            (/** @type {?} */ (this)).overlayRef.updatePosition();
            return (/** @type {?} */ (this));
        };
        /**
         * @return {?}
         */
        OwlDialogRef.prototype.isAnimating = /**
         * @return {?}
         */
        function () {
            return this.container.isAnimating;
        };
        /**
         * @return {?}
         */
        OwlDialogRef.prototype.afterOpen = /**
         * @return {?}
         */
        function () {
            return this._afterOpen$.asObservable();
        };
        /**
         * @return {?}
         */
        OwlDialogRef.prototype.beforeClose = /**
         * @return {?}
         */
        function () {
            return this._beforeClose$.asObservable();
        };
        /**
         * @return {?}
         */
        OwlDialogRef.prototype.afterClosed = /**
         * @return {?}
         */
        function () {
            return this._afterClosed$.asObservable();
        };
        /** Fetches the position strategy object from the overlay ref. */
        /**
         * Fetches the position strategy object from the overlay ref.
         * @private
         * @return {?}
         */
        OwlDialogRef.prototype.getPositionStrategy = /**
         * Fetches the position strategy object from the overlay ref.
         * @private
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.overlayRef.getConfig().positionStrategy));
        };
        return OwlDialogRef;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        OwlDialogRef.prototype.result;
        /**
         * @type {?}
         * @private
         */
        OwlDialogRef.prototype._beforeClose$;
        /**
         * @type {?}
         * @private
         */
        OwlDialogRef.prototype._afterOpen$;
        /**
         * @type {?}
         * @private
         */
        OwlDialogRef.prototype._afterClosed$;
        /**
         * Subscription to changes in the user's location.
         * @type {?}
         * @private
         */
        OwlDialogRef.prototype.locationChanged;
        /**
         * The instance of component opened into modal
         *
         * @type {?}
         */
        OwlDialogRef.prototype.componentInstance;
        /**
         * Whether the user is allowed to close the dialog.
         * @type {?}
         */
        OwlDialogRef.prototype.disableClose;
        /**
         * @type {?}
         * @private
         */
        OwlDialogRef.prototype.overlayRef;
        /**
         * @type {?}
         * @private
         */
        OwlDialogRef.prototype.container;
        /** @type {?} */
        OwlDialogRef.prototype.id;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var zoomFadeIn = {
        opacity: 0,
        transform: 'translateX({{ x }}) translateY({{ y }}) scale({{scale}})'
    };
    /** @type {?} */
    var zoomFadeInFrom = {
        opacity: 0,
        transform: 'translateX({{ x }}) translateY({{ y }}) scale({{scale}})',
        transformOrigin: '{{ ox }} {{ oy }}'
    };
    var OwlDialogContainerComponent = /** @class */ (function (_super) {
        __extends(OwlDialogContainerComponent, _super);
        function OwlDialogContainerComponent(changeDetector, elementRef, focusTrapFactory, document) {
            var _this = _super.call(this) || this;
            _this.changeDetector = changeDetector;
            _this.elementRef = elementRef;
            _this.focusTrapFactory = focusTrapFactory;
            _this.document = document;
            /**
             * ID of the element that should be considered as the dialog's label.
             */
            _this.ariaLabelledBy = null;
            /**
             * Emits when an animation state changes.
             */
            _this.animationStateChanged = new core.EventEmitter();
            _this.isAnimating = false;
            _this.state = 'enter';
            // for animation purpose
            _this.params = {
                x: '0px',
                y: '0px',
                ox: '50%',
                oy: '50%',
                scale: 0
            };
            // A variable to hold the focused element before the dialog was open.
            // This would help us to refocus back to element when the dialog was closed.
            _this.elementFocusedBeforeDialogWasOpened = null;
            return _this;
        }
        Object.defineProperty(OwlDialogContainerComponent.prototype, "config", {
            get: /**
             * @return {?}
             */
            function () {
                return this._config;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerClass", {
            get: /**
             * @return {?}
             */
            function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerTabIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerId", {
            get: /**
             * @return {?}
             */
            function () {
                return this._config.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerRole", {
            get: /**
             * @return {?}
             */
            function () {
                return this._config.role || null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerAriaLabelledby", {
            get: /**
             * @return {?}
             */
            function () {
                return this.ariaLabelledBy;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerAriaDescribedby", {
            get: /**
             * @return {?}
             */
            function () {
                return this._config.ariaDescribedBy || null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerAnimation", {
            get: /**
             * @return {?}
             */
            function () {
                return { value: this.state, params: this.params };
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        OwlDialogContainerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () { };
        /**
         * Attach a ComponentPortal as content to this dialog container.
         */
        /**
         * Attach a ComponentPortal as content to this dialog container.
         * @template T
         * @param {?} portal
         * @return {?}
         */
        OwlDialogContainerComponent.prototype.attachComponentPortal = /**
         * Attach a ComponentPortal as content to this dialog container.
         * @template T
         * @param {?} portal
         * @return {?}
         */
        function (portal) {
            if (this.portalOutlet.hasAttached()) {
                throw Error('Attempting to attach dialog content after content is already attached');
            }
            this.savePreviouslyFocusedElement();
            return this.portalOutlet.attachComponentPortal(portal);
        };
        /**
         * @template C
         * @param {?} portal
         * @return {?}
         */
        OwlDialogContainerComponent.prototype.attachTemplatePortal = /**
         * @template C
         * @param {?} portal
         * @return {?}
         */
        function (portal) {
            throw new Error('Method not implemented.');
        };
        /**
         * @param {?} config
         * @return {?}
         */
        OwlDialogContainerComponent.prototype.setConfig = /**
         * @param {?} config
         * @return {?}
         */
        function (config) {
            this._config = config;
            if (config.event) {
                this.calculateZoomOrigin(event);
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        OwlDialogContainerComponent.prototype.onAnimationStart = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.isAnimating = true;
            this.animationStateChanged.emit(event);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        OwlDialogContainerComponent.prototype.onAnimationDone = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.toState === 'enter') {
                this.trapFocus();
            }
            else if (event.toState === 'exit') {
                this.restoreFocus();
            }
            this.animationStateChanged.emit(event);
            this.isAnimating = false;
        };
        /**
         * @return {?}
         */
        OwlDialogContainerComponent.prototype.startExitAnimation = /**
         * @return {?}
         */
        function () {
            this.state = 'exit';
            this.changeDetector.markForCheck();
        };
        /**
         * Calculate origin used in the `zoomFadeInFrom()`
         * for animation purpose
         */
        /**
         * Calculate origin used in the `zoomFadeInFrom()`
         * for animation purpose
         * @private
         * @param {?} event
         * @return {?}
         */
        OwlDialogContainerComponent.prototype.calculateZoomOrigin = /**
         * Calculate origin used in the `zoomFadeInFrom()`
         * for animation purpose
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (!event) {
                return;
            }
            /** @type {?} */
            var clientX = event.clientX;
            /** @type {?} */
            var clientY = event.clientY;
            /** @type {?} */
            var wh = window.innerWidth / 2;
            /** @type {?} */
            var hh = window.innerHeight / 2;
            /** @type {?} */
            var x = clientX - wh;
            /** @type {?} */
            var y = clientY - hh;
            /** @type {?} */
            var ox = clientX / window.innerWidth;
            /** @type {?} */
            var oy = clientY / window.innerHeight;
            this.params.x = x + "px";
            this.params.y = y + "px";
            this.params.ox = ox * 100 + "%";
            this.params.oy = oy * 100 + "%";
            this.params.scale = 0;
            return;
        };
        /**
         * Save the focused element before dialog was open
         */
        /**
         * Save the focused element before dialog was open
         * @private
         * @return {?}
         */
        OwlDialogContainerComponent.prototype.savePreviouslyFocusedElement = /**
         * Save the focused element before dialog was open
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.document) {
                this.elementFocusedBeforeDialogWasOpened = (/** @type {?} */ (this.document
                    .activeElement));
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () { return _this.elementRef.nativeElement.focus(); }));
            }
        };
        /**
         * @private
         * @return {?}
         */
        OwlDialogContainerComponent.prototype.trapFocus = /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.focusTrap) {
                this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
            }
            if (this._config.autoFocus) {
                this.focusTrap.focusInitialElementWhenReady();
            }
        };
        /**
         * @private
         * @return {?}
         */
        OwlDialogContainerComponent.prototype.restoreFocus = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var toFocus = this.elementFocusedBeforeDialogWasOpened;
            // We need the extra check, because IE can set the `activeElement` to null in some cases.
            if (toFocus && typeof toFocus.focus === 'function') {
                toFocus.focus();
            }
            if (this.focusTrap) {
                this.focusTrap.destroy();
            }
        };
        OwlDialogContainerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'owl-dialog-container',
                        template: "<ng-template cdkPortalOutlet></ng-template>\r\n",
                        animations: [
                            animations.trigger('slideModal', [
                                animations.transition('void => enter', [
                                    animations.style(zoomFadeInFrom),
                                    animations.animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', animations.style('*')),
                                    animations.animate('150ms', animations.keyframes([
                                        animations.style({ transform: 'scale(1)', offset: 0 }),
                                        animations.style({ transform: 'scale(1.05)', offset: 0.3 }),
                                        animations.style({ transform: 'scale(.95)', offset: 0.8 }),
                                        animations.style({ transform: 'scale(1)', offset: 1.0 })
                                    ])),
                                    animations.animateChild()
                                ], {
                                    params: {
                                        x: '0px',
                                        y: '0px',
                                        ox: '50%',
                                        oy: '50%',
                                        scale: 1
                                    }
                                }),
                                animations.transition('enter => exit', [animations.animateChild(), animations.animate(200, animations.style(zoomFadeIn))], { params: { x: '0px', y: '0px', ox: '50%', oy: '50%' } })
                            ])
                        ],
                        host: {
                            '(@slideModal.start)': 'onAnimationStart($event)',
                            '(@slideModal.done)': 'onAnimationDone($event)',
                            '[class.owl-dialog-container]': 'owlDialogContainerClass',
                            '[attr.tabindex]': 'owlDialogContainerTabIndex',
                            '[attr.id]': 'owlDialogContainerId',
                            '[attr.role]': 'owlDialogContainerRole',
                            '[attr.aria-labelledby]': 'owlDialogContainerAriaLabelledby',
                            '[attr.aria-describedby]': 'owlDialogContainerAriaDescribedby',
                            '[@slideModal]': 'owlDialogContainerAnimation'
                        }
                    }] }
        ];
        /** @nocollapse */
        OwlDialogContainerComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: a11y.FocusTrapFactory },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        OwlDialogContainerComponent.propDecorators = {
            portalOutlet: [{ type: core.ViewChild, args: [portal.CdkPortalOutlet, { static: true },] }]
        };
        return OwlDialogContainerComponent;
    }(portal.BasePortalOutlet));
    if (false) {
        /** @type {?} */
        OwlDialogContainerComponent.prototype.portalOutlet;
        /**
         * The class that traps and manages focus within the dialog.
         * @type {?}
         * @private
         */
        OwlDialogContainerComponent.prototype.focusTrap;
        /**
         * ID of the element that should be considered as the dialog's label.
         * @type {?}
         */
        OwlDialogContainerComponent.prototype.ariaLabelledBy;
        /**
         * Emits when an animation state changes.
         * @type {?}
         */
        OwlDialogContainerComponent.prototype.animationStateChanged;
        /** @type {?} */
        OwlDialogContainerComponent.prototype.isAnimating;
        /**
         * @type {?}
         * @private
         */
        OwlDialogContainerComponent.prototype._config;
        /**
         * @type {?}
         * @private
         */
        OwlDialogContainerComponent.prototype.state;
        /**
         * @type {?}
         * @private
         */
        OwlDialogContainerComponent.prototype.params;
        /**
         * @type {?}
         * @private
         */
        OwlDialogContainerComponent.prototype.elementFocusedBeforeDialogWasOpened;
        /**
         * @type {?}
         * @private
         */
        OwlDialogContainerComponent.prototype.changeDetector;
        /**
         * @type {?}
         * @private
         */
        OwlDialogContainerComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        OwlDialogContainerComponent.prototype.focusTrapFactory;
        /**
         * @type {?}
         * @private
         */
        OwlDialogContainerComponent.prototype.document;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * object.utils
     */
    /**
     * Extends an object with the *enumerable* and *own* properties of one or more source objects,
     * similar to Object.assign.
     *
     * @param {?} dest The object which will have properties copied to it.
     * @param {...?} sources The source objects from which properties will be copied.
     * @return {?}
     */
    function extendObject(dest) {
        var e_1, _a;
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        if (dest == null) {
            throw TypeError('Cannot convert undefined or null to object');
        }
        try {
            for (var sources_1 = __values(sources), sources_1_1 = sources_1.next(); !sources_1_1.done; sources_1_1 = sources_1.next()) {
                var source = sources_1_1.value;
                if (source != null) {
                    for (var key in source) {
                        if (source.hasOwnProperty(key)) {
                            dest[key] = source[key];
                        }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (sources_1_1 && !sources_1_1.done && (_a = sources_1.return)) _a.call(sources_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return dest;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var OWL_DIALOG_DATA = new core.InjectionToken('OwlDialogData');
    /**
     * Injection token that determines the scroll handling while the dialog is open.
     *
     * @type {?}
     */
    var OWL_DIALOG_SCROLL_STRATEGY = new core.InjectionToken('owl-dialog-scroll-strategy');
    /**
     * @param {?} overlay
     * @return {?}
     */
    function OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
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
    var OWL_DIALOG_SCROLL_STRATEGY_PROVIDER = {
        provide: OWL_DIALOG_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
        useFactory: OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY
    };
    /**
     * I
     * njection token that can be used to specify default dialog options.
     *
     * @type {?}
     */
    var OWL_DIALOG_DEFAULT_OPTIONS = new core.InjectionToken('owl-dialog-default-options');
    var OwlDialogService = /** @class */ (function () {
        function OwlDialogService(overlay, injector, location, scrollStrategy, defaultOptions, parentDialog, overlayContainer) {
            var _this = this;
            this.overlay = overlay;
            this.injector = injector;
            this.location = location;
            this.defaultOptions = defaultOptions;
            this.parentDialog = parentDialog;
            this.overlayContainer = overlayContainer;
            this.ariaHiddenElements = new Map();
            this._openDialogsAtThisLevel = [];
            this._afterOpenAtThisLevel = new rxjs.Subject();
            this._afterAllClosedAtThisLevel = new rxjs.Subject();
            /**
             * Stream that emits when all open dialog have finished closing.
             * Will emit on subscribe if there are no open dialogs to begin with.
             */
            this.afterAllClosed = rxjs.defer((/**
             * @return {?}
             */
            function () {
                return _this._openDialogsAtThisLevel.length
                    ? _this._afterAllClosed
                    : _this._afterAllClosed.pipe(operators.startWith(undefined));
            }));
            this.scrollStrategy = scrollStrategy;
            if (!parentDialog && location) {
                location.subscribe((/**
                 * @return {?}
                 */
                function () { return _this.closeAll(); }));
            }
        }
        Object.defineProperty(OwlDialogService.prototype, "openDialogs", {
            /** Keeps track of the currently-open dialogs. */
            get: /**
             * Keeps track of the currently-open dialogs.
             * @return {?}
             */
            function () {
                return this.parentDialog
                    ? this.parentDialog.openDialogs
                    : this._openDialogsAtThisLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDialogService.prototype, "afterOpen", {
            /** Stream that emits when a dialog has been opened. */
            get: /**
             * Stream that emits when a dialog has been opened.
             * @return {?}
             */
            function () {
                return this.parentDialog
                    ? this.parentDialog.afterOpen
                    : this._afterOpenAtThisLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDialogService.prototype, "_afterAllClosed", {
            get: /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var parent = this.parentDialog;
                return parent
                    ? parent._afterAllClosed
                    : this._afterAllClosedAtThisLevel;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @template T
         * @param {?} componentOrTemplateRef
         * @param {?=} config
         * @return {?}
         */
        OwlDialogService.prototype.open = /**
         * @template T
         * @param {?} componentOrTemplateRef
         * @param {?=} config
         * @return {?}
         */
        function (componentOrTemplateRef, config) {
            var _this = this;
            config = applyConfigDefaults(config, this.defaultOptions);
            if (config.id && this.getDialogById(config.id)) {
                throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
            }
            /** @type {?} */
            var overlayRef = this.createOverlay(config);
            /** @type {?} */
            var dialogContainer = this.attachDialogContainer(overlayRef, config);
            /** @type {?} */
            var dialogRef = this.attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
            if (!this.openDialogs.length) {
                this.hideNonDialogContentFromAssistiveTechnology();
            }
            this.openDialogs.push(dialogRef);
            dialogRef
                .afterClosed()
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.removeOpenDialog(dialogRef); }));
            this.afterOpen.next(dialogRef);
            return dialogRef;
        };
        /**
         * Closes all of the currently-open dialogs.
         */
        /**
         * Closes all of the currently-open dialogs.
         * @return {?}
         */
        OwlDialogService.prototype.closeAll = /**
         * Closes all of the currently-open dialogs.
         * @return {?}
         */
        function () {
            /** @type {?} */
            var i = this.openDialogs.length;
            while (i--) {
                this.openDialogs[i].close();
            }
        };
        /**
         * Finds an open dialog by its id.
         * @param id ID to use when looking up the dialog.
         */
        /**
         * Finds an open dialog by its id.
         * @param {?} id ID to use when looking up the dialog.
         * @return {?}
         */
        OwlDialogService.prototype.getDialogById = /**
         * Finds an open dialog by its id.
         * @param {?} id ID to use when looking up the dialog.
         * @return {?}
         */
        function (id) {
            return this.openDialogs.find((/**
             * @param {?} dialog
             * @return {?}
             */
            function (dialog) { return dialog.id === id; }));
        };
        /**
         * @private
         * @template T
         * @param {?} componentOrTemplateRef
         * @param {?} dialogContainer
         * @param {?} overlayRef
         * @param {?} config
         * @return {?}
         */
        OwlDialogService.prototype.attachDialogContent = /**
         * @private
         * @template T
         * @param {?} componentOrTemplateRef
         * @param {?} dialogContainer
         * @param {?} overlayRef
         * @param {?} config
         * @return {?}
         */
        function (componentOrTemplateRef, dialogContainer, overlayRef, config) {
            /** @type {?} */
            var dialogRef = new OwlDialogRef(overlayRef, dialogContainer, config.id, this.location);
            if (config.hasBackdrop) {
                overlayRef.backdropClick().subscribe((/**
                 * @return {?}
                 */
                function () {
                    if (!dialogRef.disableClose) {
                        dialogRef.close();
                    }
                }));
            }
            if (componentOrTemplateRef instanceof core.TemplateRef) {
            }
            else {
                /** @type {?} */
                var injector = this.createInjector(config, dialogRef, dialogContainer);
                /** @type {?} */
                var contentRef = dialogContainer.attachComponentPortal(new portal.ComponentPortal(componentOrTemplateRef, undefined, injector));
                dialogRef.componentInstance = contentRef.instance;
            }
            dialogRef
                .updateSize(config.width, config.height)
                .updatePosition(config.position);
            return dialogRef;
        };
        /**
         * @private
         * @template T
         * @param {?} config
         * @param {?} dialogRef
         * @param {?} dialogContainer
         * @return {?}
         */
        OwlDialogService.prototype.createInjector = /**
         * @private
         * @template T
         * @param {?} config
         * @param {?} dialogRef
         * @param {?} dialogContainer
         * @return {?}
         */
        function (config, dialogRef, dialogContainer) {
            /** @type {?} */
            var userInjector = config &&
                config.viewContainerRef &&
                config.viewContainerRef.injector;
            /** @type {?} */
            var injectionTokens = new WeakMap();
            injectionTokens.set(OwlDialogRef, dialogRef);
            injectionTokens.set(OwlDialogContainerComponent, dialogContainer);
            injectionTokens.set(OWL_DIALOG_DATA, config.data);
            return new portal.PortalInjector(userInjector || this.injector, injectionTokens);
        };
        /**
         * @private
         * @param {?} config
         * @return {?}
         */
        OwlDialogService.prototype.createOverlay = /**
         * @private
         * @param {?} config
         * @return {?}
         */
        function (config) {
            /** @type {?} */
            var overlayConfig = this.getOverlayConfig(config);
            return this.overlay.create(overlayConfig);
        };
        /**
         * @private
         * @param {?} overlayRef
         * @param {?} config
         * @return {?}
         */
        OwlDialogService.prototype.attachDialogContainer = /**
         * @private
         * @param {?} overlayRef
         * @param {?} config
         * @return {?}
         */
        function (overlayRef, config) {
            /** @type {?} */
            var containerPortal = new portal.ComponentPortal(OwlDialogContainerComponent, config.viewContainerRef);
            /** @type {?} */
            var containerRef = overlayRef.attach(containerPortal);
            containerRef.instance.setConfig(config);
            return containerRef.instance;
        };
        /**
         * @private
         * @param {?} dialogConfig
         * @return {?}
         */
        OwlDialogService.prototype.getOverlayConfig = /**
         * @private
         * @param {?} dialogConfig
         * @return {?}
         */
        function (dialogConfig) {
            /** @type {?} */
            var state = new overlay.OverlayConfig({
                positionStrategy: this.overlay.position().global(),
                scrollStrategy: dialogConfig.scrollStrategy || this.scrollStrategy(),
                panelClass: dialogConfig.paneClass,
                hasBackdrop: dialogConfig.hasBackdrop,
                minWidth: dialogConfig.minWidth,
                minHeight: dialogConfig.minHeight,
                maxWidth: dialogConfig.maxWidth,
                maxHeight: dialogConfig.maxHeight
            });
            if (dialogConfig.backdropClass) {
                state.backdropClass = dialogConfig.backdropClass;
            }
            return state;
        };
        /**
         * @private
         * @param {?} dialogRef
         * @return {?}
         */
        OwlDialogService.prototype.removeOpenDialog = /**
         * @private
         * @param {?} dialogRef
         * @return {?}
         */
        function (dialogRef) {
            /** @type {?} */
            var index = this._openDialogsAtThisLevel.indexOf(dialogRef);
            if (index > -1) {
                this.openDialogs.splice(index, 1);
                // If all the dialogs were closed, remove/restore the `aria-hidden`
                // to a the siblings and emit to the `afterAllClosed` stream.
                if (!this.openDialogs.length) {
                    this.ariaHiddenElements.forEach((/**
                     * @param {?} previousValue
                     * @param {?} element
                     * @return {?}
                     */
                    function (previousValue, element) {
                        if (previousValue) {
                            element.setAttribute('aria-hidden', previousValue);
                        }
                        else {
                            element.removeAttribute('aria-hidden');
                        }
                    }));
                    this.ariaHiddenElements.clear();
                    this._afterAllClosed.next();
                }
            }
        };
        /**
         * Hides all of the content that isn't an overlay from assistive technology.
         */
        /**
         * Hides all of the content that isn't an overlay from assistive technology.
         * @private
         * @return {?}
         */
        OwlDialogService.prototype.hideNonDialogContentFromAssistiveTechnology = /**
         * Hides all of the content that isn't an overlay from assistive technology.
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var overlayContainer = this.overlayContainer.getContainerElement();
            // Ensure that the overlay container is attached to the DOM.
            if (overlayContainer.parentElement) {
                /** @type {?} */
                var siblings = overlayContainer.parentElement.children;
                for (var i = siblings.length - 1; i > -1; i--) {
                    /** @type {?} */
                    var sibling = siblings[i];
                    if (sibling !== overlayContainer &&
                        sibling.nodeName !== 'SCRIPT' &&
                        sibling.nodeName !== 'STYLE' &&
                        !sibling.hasAttribute('aria-live')) {
                        this.ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
                        sibling.setAttribute('aria-hidden', 'true');
                    }
                }
            }
        };
        OwlDialogService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        OwlDialogService.ctorParameters = function () { return [
            { type: overlay.Overlay },
            { type: core.Injector },
            { type: common.Location, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [OWL_DIALOG_SCROLL_STRATEGY,] }] },
            { type: OwlDialogConfig, decorators: [{ type: core.Optional }, { type: core.Inject, args: [OWL_DIALOG_DEFAULT_OPTIONS,] }] },
            { type: OwlDialogService, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: overlay.OverlayContainer }
        ]; };
        return OwlDialogService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        OwlDialogService.prototype.ariaHiddenElements;
        /**
         * @type {?}
         * @private
         */
        OwlDialogService.prototype._openDialogsAtThisLevel;
        /**
         * @type {?}
         * @private
         */
        OwlDialogService.prototype._afterOpenAtThisLevel;
        /**
         * @type {?}
         * @private
         */
        OwlDialogService.prototype._afterAllClosedAtThisLevel;
        /**
         * Stream that emits when all open dialog have finished closing.
         * Will emit on subscribe if there are no open dialogs to begin with.
         * @type {?}
         */
        OwlDialogService.prototype.afterAllClosed;
        /**
         * @type {?}
         * @private
         */
        OwlDialogService.prototype.scrollStrategy;
        /**
         * @type {?}
         * @private
         */
        OwlDialogService.prototype.overlay;
        /**
         * @type {?}
         * @private
         */
        OwlDialogService.prototype.injector;
        /**
         * @type {?}
         * @private
         */
        OwlDialogService.prototype.location;
        /**
         * @type {?}
         * @private
         */
        OwlDialogService.prototype.defaultOptions;
        /**
         * @type {?}
         * @private
         */
        OwlDialogService.prototype.parentDialog;
        /**
         * @type {?}
         * @private
         */
        OwlDialogService.prototype.overlayContainer;
    }
    /**
     * Applies default options to the dialog config.
     * @param {?=} config Config to be modified.
     * @param {?=} defaultOptions Default config setting
     * @return {?} The new configuration object.
     */
    function applyConfigDefaults(config, defaultOptions) {
        return extendObject(new OwlDialogConfig(), config, defaultOptions);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Injection token that determines the scroll handling while the dtPicker is open.
     * @type {?}
     */
    var OWL_DTPICKER_SCROLL_STRATEGY = new core.InjectionToken('owl-dtpicker-scroll-strategy');
    /**
     * \@docs-private
     * @param {?} overlay
     * @return {?}
     */
    function OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
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
    var OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER = {
        provide: OWL_DTPICKER_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
        useFactory: OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY
    };
    /**
     * @template T
     */
    var OwlDateTimeComponent = /** @class */ (function (_super) {
        __extends(OwlDateTimeComponent, _super);
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
            _this.afterPickerClosed = new core.EventEmitter();
            /**
             * Callback when the picker is open
             *
             */
            _this.afterPickerOpen = new core.EventEmitter();
            /**
             * Emits selected year in multi-year view
             * This doesn't imply a change on the selected date.
             *
             */
            _this.yearSelected = new core.EventEmitter();
            /**
             * Emits selected month in year view
             * This doesn't imply a change on the selected date.
             *
             */
            _this.monthSelected = new core.EventEmitter();
            /**
             * Emit when the selected value has been confirmed
             *
             */
            _this.confirmSelectedChange = new core.EventEmitter();
            /**
             * Emits when the date time picker is disabled.
             *
             */
            _this.disabledChange = new core.EventEmitter();
            _this.dtInputSub = rxjs.Subscription.EMPTY;
            _this.hidePickerStreamSub = rxjs.Subscription.EMPTY;
            _this.confirmSelectedStreamSub = rxjs.Subscription.EMPTY;
            _this.pickerOpenedStreamSub = rxjs.Subscription.EMPTY;
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
                value = coercion.coerceBooleanProperty(value);
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
                this.selecteds = __spread(date);
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
                backdropClass: __spread([
                    'cdk-overlay-dark-backdrop'
                ], coercion.coerceArray(this.backdropClass)),
                paneClass: __spread(['owl-dt-dialog'], coercion.coerceArray(this.panelClass)),
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
                this.pickerContainerPortal = new portal.ComponentPortal(OwlDateTimeContainerComponent, this.viewContainerRef);
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
                    .pipe(operators.take(1))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.popupRef.updatePosition();
                }));
                // emit open stream
                this.pickerOpenedStreamSub = this.pickerContainer.pickerOpenedStream
                    .pipe(operators.take(1))
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
            var overlayConfig = new overlay.OverlayConfig({
                positionStrategy: this.createPopupPositionStrategy(),
                hasBackdrop: true,
                backdropClass: __spread([
                    'cdk-overlay-transparent-backdrop'
                ], coercion.coerceArray(this.backdropClass)),
                scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
                panelClass: __spread(['owl-dt-popup'], coercion.coerceArray(this.panelClass))
            });
            this.popupRef = this.overlay.create(overlayConfig);
            rxjs.merge(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef
                .keydownEvents()
                .pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                return event.keyCode === keycodes.ESCAPE ||
                    (_this._dtInput &&
                        event.altKey &&
                        event.keyCode === keycodes.UP_ARROW);
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
            { type: core.Component, args: [{
                        selector: 'owl-date-time',
                        exportAs: 'owlDateTime',
                        template: "",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        OwlDateTimeComponent.ctorParameters = function () { return [
            { type: overlay.Overlay },
            { type: core.ViewContainerRef },
            { type: OwlDialogService },
            { type: core.NgZone },
            { type: core.ChangeDetectorRef },
            { type: DateTimeAdapter, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [OWL_DTPICKER_SCROLL_STRATEGY,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [OWL_DATE_TIME_FORMATS,] }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        OwlDateTimeComponent.propDecorators = {
            backdropClass: [{ type: core.Input }],
            panelClass: [{ type: core.Input }],
            startAt: [{ type: core.Input }],
            pickerType: [{ type: core.Input }],
            pickerMode: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            opened: [{ type: core.Input }],
            scrollStrategy: [{ type: core.Input }],
            afterPickerClosed: [{ type: core.Output }],
            afterPickerOpen: [{ type: core.Output }],
            yearSelected: [{ type: core.Output }],
            monthSelected: [{ type: core.Output }]
        };
        return OwlDateTimeComponent;
    }(OwlDateTime));
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var OwlDateTimeTriggerDirective = /** @class */ (function () {
        function OwlDateTimeTriggerDirective(changeDetector) {
            this.changeDetector = changeDetector;
            this.stateChanges = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(OwlDateTimeTriggerDirective.prototype, "disabled", {
            get: /**
             * @return {?}
             */
            function () {
                return this._disabled === undefined ? this.dtPicker.disabled : !!this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeTriggerDirective.prototype, "owlDTTriggerDisabledClass", {
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
        OwlDateTimeTriggerDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        OwlDateTimeTriggerDirective.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.datepicker) {
                this.watchStateChanges();
            }
        };
        /**
         * @return {?}
         */
        OwlDateTimeTriggerDirective.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this.watchStateChanges();
        };
        /**
         * @return {?}
         */
        OwlDateTimeTriggerDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.stateChanges.unsubscribe();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        OwlDateTimeTriggerDirective.prototype.handleClickOnHost = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (this.dtPicker) {
                this.dtPicker.open();
                event.stopPropagation();
            }
        };
        /**
         * @private
         * @return {?}
         */
        OwlDateTimeTriggerDirective.prototype.watchStateChanges = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.stateChanges.unsubscribe();
            /** @type {?} */
            var inputDisabled = this.dtPicker && this.dtPicker.dtInput ?
                this.dtPicker.dtInput.disabledChange : rxjs.of();
            /** @type {?} */
            var pickerDisabled = this.dtPicker ?
                this.dtPicker.disabledChange : rxjs.of();
            this.stateChanges = rxjs.merge(pickerDisabled, inputDisabled)
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.changeDetector.markForCheck();
            }));
        };
        OwlDateTimeTriggerDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[owlDateTimeTrigger]',
                        host: {
                            '(click)': 'handleClickOnHost($event)',
                            '[class.owl-dt-trigger-disabled]': 'owlDTTriggerDisabledClass'
                        }
                    },] }
        ];
        /** @nocollapse */
        OwlDateTimeTriggerDirective.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        OwlDateTimeTriggerDirective.propDecorators = {
            dtPicker: [{ type: core.Input, args: ['owlDateTimeTrigger',] }],
            disabled: [{ type: core.Input }]
        };
        return OwlDateTimeTriggerDirective;
    }());
    if (false) {
        /** @type {?} */
        OwlDateTimeTriggerDirective.prototype.dtPicker;
        /**
         * @type {?}
         * @private
         */
        OwlDateTimeTriggerDirective.prototype._disabled;
        /**
         * @type {?}
         * @private
         */
        OwlDateTimeTriggerDirective.prototype.stateChanges;
        /**
         * @type {?}
         * @protected
         */
        OwlDateTimeTriggerDirective.prototype.changeDetector;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var OWL_DATETIME_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return OwlDateTimeInputDirective; })),
        multi: true
    };
    /** @type {?} */
    var OWL_DATETIME_VALIDATORS = {
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef((/**
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
            this.dateTimeChange = new core.EventEmitter();
            /**
             * Callback to invoke when an `input` event is fired on this `<input>`.
             *
             */
            this.dateTimeInput = new core.EventEmitter();
            this.dtPickerSub = rxjs.Subscription.EMPTY;
            this.localeSub = rxjs.Subscription.EMPTY;
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
            this.validator = forms.Validators.compose([
                this.parseValidator,
                this.minValidator,
                this.maxValidator,
                this.filterValidator,
                this.rangeValidator
            ]);
            /**
             * Emits when the value changes (either due to user input or programmatic change).
             */
            this.valueChange = new core.EventEmitter();
            /**
             * Emits when the disabled state has changed
             */
            this.disabledChange = new core.EventEmitter();
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
                var newValue = coercion.coerceBooleanProperty(value);
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
            if (event.altKey && event.keyCode === keycodes.DOWN_ARROW) {
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
            { type: core.Directive, args: [{
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
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: DateTimeAdapter, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
        ]; };
        OwlDateTimeInputDirective.propDecorators = {
            owlDateTime: [{ type: core.Input }],
            owlDateTimeFilter: [{ type: core.Input }],
            _disabled: [{ type: core.Input }],
            min: [{ type: core.Input }],
            max: [{ type: core.Input }],
            selectMode: [{ type: core.Input }],
            rangeSeparator: [{ type: core.Input }],
            value: [{ type: core.Input }],
            values: [{ type: core.Input }],
            dateTimeChange: [{ type: core.Output }],
            dateTimeInput: [{ type: core.Output }]
        };
        return OwlDateTimeInputDirective;
    }());
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            this.select = new core.EventEmitter();
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
                    .pipe(operators.take(1))
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
            { type: core.Component, args: [{
                        selector: '[owl-date-time-calendar-body]',
                        exportAs: 'owlDateTimeCalendarBody',
                        template: "<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\r\n    <td *ngFor=\"let item of row; let colIndex = index\"\r\n        class=\"owl-dt-calendar-cell {{item.cellClass}}\"\r\n        [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\"\r\n        [class.owl-dt-calendar-cell-active]=\"isActiveCell(rowIndex, colIndex)\"\r\n        [class.owl-dt-calendar-cell-disabled]=\"!item.enabled\"\r\n        [class.owl-dt-calendar-cell-in-range]=\"isInRange(item.value)\"\r\n        [class.owl-dt-calendar-cell-range-from]=\"isRangeFrom(item.value)\"\r\n        [class.owl-dt-calendar-cell-range-to]=\"isRangeTo(item.value)\"\r\n        [attr.aria-label]=\"item.ariaLabel\"\r\n        [attr.aria-disabled]=\"!item.enabled || null\"\r\n        [style.width.%]=\"100 / numCols\"\r\n        [style.paddingTop.%]=\"50 * cellRatio / numCols\"\r\n        [style.paddingBottom.%]=\"50 * cellRatio / numCols\"\r\n        (click)=\"selectCell(item)\">\r\n        <span class=\"owl-dt-calendar-cell-content\"\r\n              [ngClass]=\"{\r\n                'owl-dt-calendar-cell-out': item.out,\r\n                'owl-dt-calendar-cell-today': item.value === todayValue,\r\n                'owl-dt-calendar-cell-selected': isSelected(item.value)\r\n              }\">\r\n            {{item.displayValue}}\r\n        </span>\r\n    </td>\r\n</tr>\r\n",
                        host: {
                            '[class.owl-dt-calendar-body]': 'owlDTCalendarBodyClass'
                        },
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        OwlCalendarBodyComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        OwlCalendarBodyComponent.propDecorators = {
            activeCell: [{ type: core.Input }],
            rows: [{ type: core.Input }],
            numCols: [{ type: core.Input }],
            cellRatio: [{ type: core.Input }],
            todayValue: [{ type: core.Input }],
            selectedValues: [{ type: core.Input }],
            selectMode: [{ type: core.Input }],
            select: [{ type: core.Output }]
        };
        return OwlCalendarBodyComponent;
    }());
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DAYS_PER_WEEK = 7;
    /** @type {?} */
    var WEEKS_PER_VIEW = 6;
    /**
     * @template T
     */
    var OwlMonthViewComponent = /** @class */ (function () {
        function OwlMonthViewComponent(cdRef, dateTimeAdapter, dateTimeFormats) {
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
            this.localeSub = rxjs.Subscription.EMPTY;
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
            this.selectedChange = new core.EventEmitter();
            /**
             * Callback to invoke when any date is selected.
             *
             */
            this.userSelection = new core.EventEmitter();
            /**
             * Emits when any date is activated.
             */
            this.pickerMomentChange = new core.EventEmitter();
        }
        Object.defineProperty(OwlMonthViewComponent.prototype, "firstDayOfWeek", {
            get: /**
             * @return {?}
             */
            function () {
                return this._firstDayOfWeek;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                val = coercion.coerceNumberProperty(val);
                if (val >= 0 && val <= 6 && val !== this._firstDayOfWeek) {
                    this._firstDayOfWeek = val;
                    if (this.initiated) {
                        this.generateWeekDays();
                        this.generateCalendar();
                        this.cdRef.markForCheck();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "selectMode", {
            get: /**
             * @return {?}
             */
            function () {
                return this._selectMode;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._selectMode = val;
                if (this.initiated) {
                    this.generateCalendar();
                    this.cdRef.markForCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "selected", {
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
                /** @type {?} */
                var oldSelected = this._selected;
                value = this.dateTimeAdapter.deserialize(value);
                this._selected = this.getValidDate(value);
                if (!this.dateTimeAdapter.isSameDay(oldSelected, this._selected)) {
                    this.setSelectedDates();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "selecteds", {
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
                this.setSelectedDates();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "pickerMoment", {
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
                /** @type {?} */
                var oldMoment = this._pickerMoment;
                value = this.dateTimeAdapter.deserialize(value);
                this._pickerMoment =
                    this.getValidDate(value) || this.dateTimeAdapter.now();
                this.firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this._pickerMoment), this.dateTimeAdapter.getMonth(this._pickerMoment), 1);
                if (!this.isSameMonth(oldMoment, this._pickerMoment) &&
                    this.initiated) {
                    this.generateCalendar();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "dateFilter", {
            get: /**
             * @return {?}
             */
            function () {
                return this._dateFilter;
            },
            set: /**
             * @param {?} filter
             * @return {?}
             */
            function (filter) {
                this._dateFilter = filter;
                if (this.initiated) {
                    this.generateCalendar();
                    this.cdRef.markForCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "minDate", {
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
                this._minDate = this.getValidDate(value);
                if (this.initiated) {
                    this.generateCalendar();
                    this.cdRef.markForCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "maxDate", {
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
                this._maxDate = this.getValidDate(value);
                if (this.initiated) {
                    this.generateCalendar();
                    this.cdRef.markForCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "weekdays", {
            get: /**
             * @return {?}
             */
            function () {
                return this._weekdays;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "days", {
            get: /**
             * @return {?}
             */
            function () {
                return this._days;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "activeCell", {
            get: /**
             * @return {?}
             */
            function () {
                if (this.pickerMoment) {
                    return (this.dateTimeAdapter.getDate(this.pickerMoment) +
                        this.firstRowOffset -
                        1);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "isInSingleMode", {
            get: /**
             * @return {?}
             */
            function () {
                return this.selectMode === 'single';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMonthViewComponent.prototype, "isInRangeMode", {
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
        Object.defineProperty(OwlMonthViewComponent.prototype, "owlDTCalendarView", {
            get: /**
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
        OwlMonthViewComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.generateWeekDays();
            this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
             * @return {?}
             */
            function () {
                _this.generateWeekDays();
                _this.generateCalendar();
                _this.cdRef.markForCheck();
            }));
        };
        /**
         * @return {?}
         */
        OwlMonthViewComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this.generateCalendar();
            this.initiated = true;
        };
        /**
         * @return {?}
         */
        OwlMonthViewComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.localeSub.unsubscribe();
        };
        /**
         * Handle a calendarCell selected
         */
        /**
         * Handle a calendarCell selected
         * @param {?} cell
         * @return {?}
         */
        OwlMonthViewComponent.prototype.selectCalendarCell = /**
         * Handle a calendarCell selected
         * @param {?} cell
         * @return {?}
         */
        function (cell) {
            // Cases in which the date would not be selected
            // 1, the calendar cell is NOT enabled (is NOT valid)
            // 2, the selected date is NOT in current picker's month and the hideOtherMonths is enabled
            if (!cell.enabled || (this.hideOtherMonths && cell.out)) {
                return;
            }
            this.selectDate(cell.value);
        };
        /**
         * Handle a new date selected
         */
        /**
         * Handle a new date selected
         * @private
         * @param {?} date
         * @return {?}
         */
        OwlMonthViewComponent.prototype.selectDate = /**
         * Handle a new date selected
         * @private
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var daysDiff = date - 1;
            /** @type {?} */
            var selected = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
            this.selectedChange.emit(selected);
            this.userSelection.emit();
        };
        /**
         * Handle keydown event on calendar body
         */
        /**
         * Handle keydown event on calendar body
         * @param {?} event
         * @return {?}
         */
        OwlMonthViewComponent.prototype.handleCalendarKeydown = /**
         * Handle keydown event on calendar body
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var moment;
            switch (event.keyCode) {
                // minus 1 day
                case keycodes.LEFT_ARROW:
                    moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 day
                case keycodes.RIGHT_ARROW:
                    moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // minus 1 week
                case keycodes.UP_ARROW:
                    moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -7);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 week
                case keycodes.DOWN_ARROW:
                    moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 7);
                    this.pickerMomentChange.emit(moment);
                    break;
                // move to first day of current month
                case keycodes.HOME:
                    moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1 - this.dateTimeAdapter.getDate(this.pickerMoment));
                    this.pickerMomentChange.emit(moment);
                    break;
                // move to last day of current month
                case keycodes.END:
                    moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment) -
                        this.dateTimeAdapter.getDate(this.pickerMoment));
                    this.pickerMomentChange.emit(moment);
                    break;
                // minus 1 month (or 1 year)
                case keycodes.PAGE_UP:
                    moment = event.altKey
                        ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1)
                        : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 month (or 1 year)
                case keycodes.PAGE_DOWN:
                    moment = event.altKey
                        ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1)
                        : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // select the pickerMoment
                case keycodes.ENTER:
                    if (!this.dateFilter || this.dateFilter(this.pickerMoment)) {
                        this.selectDate(this.dateTimeAdapter.getDate(this.pickerMoment));
                    }
                    break;
                default:
                    return;
            }
            this.focusActiveCell();
            event.preventDefault();
        };
        /**
         * Generate the calendar weekdays array
         * */
        /**
         * Generate the calendar weekdays array
         *
         * @private
         * @return {?}
         */
        OwlMonthViewComponent.prototype.generateWeekDays = /**
         * Generate the calendar weekdays array
         *
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var longWeekdays = this.dateTimeAdapter.getDayOfWeekNames('long');
            /** @type {?} */
            var shortWeekdays = this.dateTimeAdapter.getDayOfWeekNames('short');
            /** @type {?} */
            var narrowWeekdays = this.dateTimeAdapter.getDayOfWeekNames('narrow');
            /** @type {?} */
            var firstDayOfWeek = this.firstDayOfWeek;
            /** @type {?} */
            var weekdays = longWeekdays.map((/**
             * @param {?} long
             * @param {?} i
             * @return {?}
             */
            function (long, i) {
                return { long: long, short: shortWeekdays[i], narrow: narrowWeekdays[i] };
            }));
            this._weekdays = weekdays
                .slice(firstDayOfWeek)
                .concat(weekdays.slice(0, firstDayOfWeek));
            this.dateNames = this.dateTimeAdapter.getDateNames();
            return;
        };
        /**
         * Generate the calendar days array
         * */
        /**
         * Generate the calendar days array
         *
         * @private
         * @return {?}
         */
        OwlMonthViewComponent.prototype.generateCalendar = /**
         * Generate the calendar days array
         *
         * @private
         * @return {?}
         */
        function () {
            if (!this.pickerMoment) {
                return;
            }
            this.todayDate = null;
            // the first weekday of the month
            /** @type {?} */
            var startWeekdayOfMonth = this.dateTimeAdapter.getDay(this.firstDateOfMonth);
            /** @type {?} */
            var firstDayOfWeek = this.firstDayOfWeek;
            // the amount of days from the first date of the month
            // if it is < 0, it means the date is in previous month
            /** @type {?} */
            var daysDiff = 0 -
                ((startWeekdayOfMonth + (DAYS_PER_WEEK - firstDayOfWeek)) %
                    DAYS_PER_WEEK);
            // the index of cell that contains the first date of the month
            this.firstRowOffset = Math.abs(daysDiff);
            this._days = [];
            for (var i = 0; i < WEEKS_PER_VIEW; i++) {
                /** @type {?} */
                var week = [];
                for (var j = 0; j < DAYS_PER_WEEK; j++) {
                    /** @type {?} */
                    var date = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
                    /** @type {?} */
                    var dateCell = this.createDateCell(date, daysDiff);
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
        };
        /**
         * Creates CalendarCell for days.
         */
        /**
         * Creates CalendarCell for days.
         * @private
         * @param {?} date
         * @param {?} daysDiff
         * @return {?}
         */
        OwlMonthViewComponent.prototype.createDateCell = /**
         * Creates CalendarCell for days.
         * @private
         * @param {?} date
         * @param {?} daysDiff
         * @return {?}
         */
        function (date, daysDiff) {
            // total days of the month
            /** @type {?} */
            var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment);
            /** @type {?} */
            var dateNum = this.dateTimeAdapter.getDate(date);
            // const dateName = this.dateNames[dateNum - 1];
            /** @type {?} */
            var dateName = dateNum.toString();
            /** @type {?} */
            var ariaLabel = this.dateTimeAdapter.format(date, this.dateTimeFormats.dateA11yLabel);
            // check if the date if selectable
            /** @type {?} */
            var enabled = this.isDateEnabled(date);
            // check if date is not in current month
            /** @type {?} */
            var dayValue = daysDiff + 1;
            /** @type {?} */
            var out = dayValue < 1 || dayValue > daysInMonth;
            /** @type {?} */
            var cellClass = 'owl-dt-day-' + this.dateTimeAdapter.getDay(date);
            return new CalendarCell(dayValue, dateName, ariaLabel, enabled, out, cellClass);
        };
        /**
         * Check if the date is valid
         */
        /**
         * Check if the date is valid
         * @private
         * @param {?} date
         * @return {?}
         */
        OwlMonthViewComponent.prototype.isDateEnabled = /**
         * Check if the date is valid
         * @private
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return (!!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate ||
                    this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
                (!this.maxDate ||
                    this.dateTimeAdapter.compare(date, this.maxDate) <= 0));
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
        OwlMonthViewComponent.prototype.getValidDate = /**
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
        /**
         * Check if the give dates are none-null and in the same month
         */
        /**
         * Check if the give dates are none-null and in the same month
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        OwlMonthViewComponent.prototype.isSameMonth = /**
         * Check if the give dates are none-null and in the same month
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        function (dateLeft, dateRight) {
            return !!(dateLeft &&
                dateRight &&
                this.dateTimeAdapter.isValid(dateLeft) &&
                this.dateTimeAdapter.isValid(dateRight) &&
                this.dateTimeAdapter.getYear(dateLeft) ===
                    this.dateTimeAdapter.getYear(dateRight) &&
                this.dateTimeAdapter.getMonth(dateLeft) ===
                    this.dateTimeAdapter.getMonth(dateRight));
        };
        /**
         * Set the selectedDates value.
         * In single mode, it has only one value which represent the selected date
         * In range mode, it would has two values, one for the fromValue and the other for the toValue
         * */
        /**
         * Set the selectedDates value.
         * In single mode, it has only one value which represent the selected date
         * In range mode, it would has two values, one for the fromValue and the other for the toValue
         *
         * @private
         * @return {?}
         */
        OwlMonthViewComponent.prototype.setSelectedDates = /**
         * Set the selectedDates value.
         * In single mode, it has only one value which represent the selected date
         * In range mode, it would has two values, one for the fromValue and the other for the toValue
         *
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.selectedDates = [];
            if (!this.firstDateOfMonth) {
                return;
            }
            if (this.isInSingleMode && this.selected) {
                /** @type {?} */
                var dayDiff = this.dateTimeAdapter.differenceInCalendarDays(this.selected, this.firstDateOfMonth);
                this.selectedDates[0] = dayDiff + 1;
                return;
            }
            if (this.isInRangeMode && this.selecteds) {
                this.selectedDates = this.selecteds.map((/**
                 * @param {?} selected
                 * @return {?}
                 */
                function (selected) {
                    if (_this.dateTimeAdapter.isValid(selected)) {
                        /** @type {?} */
                        var dayDiff = _this.dateTimeAdapter.differenceInCalendarDays(selected, _this.firstDateOfMonth);
                        return dayDiff + 1;
                    }
                    else {
                        return null;
                    }
                }));
            }
        };
        /**
         * @private
         * @return {?}
         */
        OwlMonthViewComponent.prototype.focusActiveCell = /**
         * @private
         * @return {?}
         */
        function () {
            this.calendarBodyElm.focusActiveCell();
        };
        OwlMonthViewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'owl-date-time-month-view',
                        exportAs: 'owlYearView',
                        template: "<table class=\"owl-dt-calendar-table owl-dt-calendar-month-table\"\r\n       [class.owl-dt-calendar-only-current-month]=\"hideOtherMonths\">\r\n    <thead class=\"owl-dt-calendar-header\">\r\n    <tr class=\"owl-dt-weekdays\">\r\n        <th *ngFor=\"let weekday of weekdays\"\r\n            [attr.aria-label]=\"weekday.long\"\r\n            class=\"owl-dt-weekday\" scope=\"col\">\r\n            <span>{{weekday.short}}</span>\r\n        </th>\r\n    </tr>\r\n    <tr>\r\n        <th class=\"owl-dt-calendar-table-divider\" aria-hidden=\"true\" colspan=\"7\"></th>\r\n    </tr>\r\n    </thead>\r\n    <tbody owl-date-time-calendar-body role=\"grid\"\r\n           [rows]=\"days\" [todayValue]=\"todayDate\"\r\n           [selectedValues]=\"selectedDates\"\r\n           [selectMode]=\"selectMode\"\r\n           [activeCell]=\"activeCell\"\r\n           (keydown)=\"handleCalendarKeydown($event)\"\r\n           (select)=\"selectCalendarCell($event)\">\r\n    </tbody>\r\n</table>\r\n",
                        host: {
                            '[class.owl-dt-calendar-view]': 'owlDTCalendarView'
                        },
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        OwlMonthViewComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: DateTimeAdapter, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
        ]; };
        OwlMonthViewComponent.propDecorators = {
            hideOtherMonths: [{ type: core.Input }],
            firstDayOfWeek: [{ type: core.Input }],
            selectMode: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            selecteds: [{ type: core.Input }],
            pickerMoment: [{ type: core.Input }],
            dateFilter: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            selectedChange: [{ type: core.Output }],
            userSelection: [{ type: core.Output }],
            pickerMomentChange: [{ type: core.Output }],
            calendarBodyElm: [{ type: core.ViewChild, args: [OwlCalendarBodyComponent, { static: true },] }]
        };
        return OwlMonthViewComponent;
    }());
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MONTHS_PER_YEAR = 12;
    /** @type {?} */
    var MONTHS_PER_ROW = 3;
    /**
     * @template T
     */
    var OwlYearViewComponent = /** @class */ (function () {
        function OwlYearViewComponent(cdRef, dateTimeAdapter, dateTimeFormats) {
            this.cdRef = cdRef;
            this.dateTimeAdapter = dateTimeAdapter;
            this.dateTimeFormats = dateTimeFormats;
            /**
             * The select mode of the picker;
             *
             */
            this._selectMode = 'single';
            this._selecteds = [];
            this.localeSub = rxjs.Subscription.EMPTY;
            this.initiated = false;
            /**
             * An array to hold all selectedDates' month value
             * the value is the month number in current year
             *
             */
            this.selectedMonths = [];
            /**
             * Callback to invoke when a new month is selected
             *
             */
            this.change = new core.EventEmitter();
            /**
             * Emits the selected year. This doesn't imply a change on the selected date
             *
             */
            this.monthSelected = new core.EventEmitter();
            /**
             * Emits when any date is activated.
             */
            this.pickerMomentChange = new core.EventEmitter();
            /**
             * Emits when use keyboard enter to select a calendar cell
             */
            this.keyboardEnter = new core.EventEmitter();
            this.monthNames = this.dateTimeAdapter.getMonthNames('short');
        }
        Object.defineProperty(OwlYearViewComponent.prototype, "selectMode", {
            get: /**
             * @return {?}
             */
            function () {
                return this._selectMode;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._selectMode = val;
                if (this.initiated) {
                    this.generateMonthList();
                    this.cdRef.markForCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "selected", {
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
                this.setSelectedMonths();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "selecteds", {
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
                this._selecteds = [];
                for (var i = 0; i < values.length; i++) {
                    /** @type {?} */
                    var value = this.dateTimeAdapter.deserialize(values[i]);
                    this._selecteds.push(this.getValidDate(value));
                }
                this.setSelectedMonths();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "pickerMoment", {
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
                /** @type {?} */
                var oldMoment = this._pickerMoment;
                value = this.dateTimeAdapter.deserialize(value);
                this._pickerMoment =
                    this.getValidDate(value) || this.dateTimeAdapter.now();
                if (!this.hasSameYear(oldMoment, this._pickerMoment) &&
                    this.initiated) {
                    this.generateMonthList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "dateFilter", {
            get: /**
             * @return {?}
             */
            function () {
                return this._dateFilter;
            },
            set: /**
             * @param {?} filter
             * @return {?}
             */
            function (filter) {
                this._dateFilter = filter;
                if (this.initiated) {
                    this.generateMonthList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "minDate", {
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
                this._minDate = this.getValidDate(value);
                if (this.initiated) {
                    this.generateMonthList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "maxDate", {
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
                this._maxDate = this.getValidDate(value);
                if (this.initiated) {
                    this.generateMonthList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "months", {
            get: /**
             * @return {?}
             */
            function () {
                return this._months;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "activeCell", {
            get: /**
             * @return {?}
             */
            function () {
                if (this._pickerMoment) {
                    return this.dateTimeAdapter.getMonth(this._pickerMoment);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "isInSingleMode", {
            get: /**
             * @return {?}
             */
            function () {
                return this.selectMode === 'single';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlYearViewComponent.prototype, "isInRangeMode", {
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
        Object.defineProperty(OwlYearViewComponent.prototype, "owlDTCalendarView", {
            get: /**
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
        OwlYearViewComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.localeSub = this.dateTimeAdapter.localeChanges.subscribe((/**
             * @return {?}
             */
            function () {
                _this.generateMonthList();
                _this.cdRef.markForCheck();
            }));
        };
        /**
         * @return {?}
         */
        OwlYearViewComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this.generateMonthList();
            this.initiated = true;
        };
        /**
         * @return {?}
         */
        OwlYearViewComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.localeSub.unsubscribe();
        };
        /**
         * Handle a calendarCell selected
         */
        /**
         * Handle a calendarCell selected
         * @param {?} cell
         * @return {?}
         */
        OwlYearViewComponent.prototype.selectCalendarCell = /**
         * Handle a calendarCell selected
         * @param {?} cell
         * @return {?}
         */
        function (cell) {
            this.selectMonth(cell.value);
        };
        /**
         * Handle a new month selected
         */
        /**
         * Handle a new month selected
         * @private
         * @param {?} month
         * @return {?}
         */
        OwlYearViewComponent.prototype.selectMonth = /**
         * Handle a new month selected
         * @private
         * @param {?} month
         * @return {?}
         */
        function (month) {
            /** @type {?} */
            var firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
            this.monthSelected.emit(firstDateOfMonth);
            /** @type {?} */
            var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
            /** @type {?} */
            var result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
            this.change.emit(result);
        };
        /**
         * Handle keydown event on calendar body
         */
        /**
         * Handle keydown event on calendar body
         * @param {?} event
         * @return {?}
         */
        OwlYearViewComponent.prototype.handleCalendarKeydown = /**
         * Handle keydown event on calendar body
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var moment;
            switch (event.keyCode) {
                // minus 1 month
                case keycodes.LEFT_ARROW:
                    moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 month
                case keycodes.RIGHT_ARROW:
                    moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // minus 3 months
                case keycodes.UP_ARROW:
                    moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -3);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 3 months
                case keycodes.DOWN_ARROW:
                    moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 3);
                    this.pickerMomentChange.emit(moment);
                    break;
                // move to first month of current year
                case keycodes.HOME:
                    moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -this.dateTimeAdapter.getMonth(this.pickerMoment));
                    this.pickerMomentChange.emit(moment);
                    break;
                // move to last month of current year
                case keycodes.END:
                    moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 11 - this.dateTimeAdapter.getMonth(this.pickerMoment));
                    this.pickerMomentChange.emit(moment);
                    break;
                // minus 1 year (or 10 year)
                case keycodes.PAGE_UP:
                    moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? -10 : -1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 year (or 10 year)
                case keycodes.PAGE_DOWN:
                    moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? 10 : 1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // Select current month
                case keycodes.ENTER:
                    this.selectMonth(this.dateTimeAdapter.getMonth(this.pickerMoment));
                    this.keyboardEnter.emit();
                    break;
                default:
                    return;
            }
            this.focusActiveCell();
            event.preventDefault();
        };
        /**
         * Generate the calendar month list
         * */
        /**
         * Generate the calendar month list
         *
         * @private
         * @return {?}
         */
        OwlYearViewComponent.prototype.generateMonthList = /**
         * Generate the calendar month list
         *
         * @private
         * @return {?}
         */
        function () {
            if (!this.pickerMoment) {
                return;
            }
            this.setSelectedMonths();
            this.todayMonth = this.getMonthInCurrentYear(this.dateTimeAdapter.now());
            this._months = [];
            for (var i = 0; i < MONTHS_PER_YEAR / MONTHS_PER_ROW; i++) {
                /** @type {?} */
                var row = [];
                for (var j = 0; j < MONTHS_PER_ROW; j++) {
                    /** @type {?} */
                    var month = j + i * MONTHS_PER_ROW;
                    /** @type {?} */
                    var monthCell = this.createMonthCell(month);
                    row.push(monthCell);
                }
                this._months.push(row);
            }
            return;
        };
        /**
         * Creates an CalendarCell for the given month.
         */
        /**
         * Creates an CalendarCell for the given month.
         * @private
         * @param {?} month
         * @return {?}
         */
        OwlYearViewComponent.prototype.createMonthCell = /**
         * Creates an CalendarCell for the given month.
         * @private
         * @param {?} month
         * @return {?}
         */
        function (month) {
            /** @type {?} */
            var startDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
            /** @type {?} */
            var ariaLabel = this.dateTimeAdapter.format(startDateOfMonth, this.dateTimeFormats.monthYearA11yLabel);
            /** @type {?} */
            var cellClass = 'owl-dt-month-' + month;
            return new CalendarCell(month, this.monthNames[month], ariaLabel, this.isMonthEnabled(month), false, cellClass);
        };
        /**
         * Check if the given month is enable
         */
        /**
         * Check if the given month is enable
         * @private
         * @param {?} month
         * @return {?}
         */
        OwlYearViewComponent.prototype.isMonthEnabled = /**
         * Check if the given month is enable
         * @private
         * @param {?} month
         * @return {?}
         */
        function (month) {
            /** @type {?} */
            var firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
            // If any date in the month is selectable,
            // we count the month as enable
            for (var date = firstDateOfMonth; this.dateTimeAdapter.getMonth(date) === month; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
                if (!!date &&
                    (!this.dateFilter || this.dateFilter(date)) &&
                    (!this.minDate ||
                        this.dateTimeAdapter.compare(date, this.minDate) >= 0) &&
                    (!this.maxDate ||
                        this.dateTimeAdapter.compare(date, this.maxDate) <= 0)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Gets the month in this year that the given Date falls on.
         * Returns null if the given Date is in another year.
         */
        /**
         * Gets the month in this year that the given Date falls on.
         * Returns null if the given Date is in another year.
         * @private
         * @param {?} date
         * @return {?}
         */
        OwlYearViewComponent.prototype.getMonthInCurrentYear = /**
         * Gets the month in this year that the given Date falls on.
         * Returns null if the given Date is in another year.
         * @private
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (this.getValidDate(date) && this.getValidDate(this._pickerMoment)) {
                /** @type {?} */
                var result = this.dateTimeAdapter.compareYear(date, this._pickerMoment);
                // < 0 : the given date's year is before pickerMoment's year, we return -1 as selected month value.
                // > 0 : the given date's year is after pickerMoment's year, we return 12 as selected month value.
                // 0 : the give date's year is same as the pickerMoment's year, we return the actual month value.
                if (result < 0) {
                    return -1;
                }
                else if (result > 0) {
                    return 12;
                }
                else {
                    return this.dateTimeAdapter.getMonth(date);
                }
            }
            else {
                return null;
            }
        };
        /**
         * Set the selectedMonths value
         * In single mode, it has only one value which represent the month the selected date in
         * In range mode, it would has two values, one for the month the fromValue in and the other for the month the toValue in
         * */
        /**
         * Set the selectedMonths value
         * In single mode, it has only one value which represent the month the selected date in
         * In range mode, it would has two values, one for the month the fromValue in and the other for the month the toValue in
         *
         * @private
         * @return {?}
         */
        OwlYearViewComponent.prototype.setSelectedMonths = /**
         * Set the selectedMonths value
         * In single mode, it has only one value which represent the month the selected date in
         * In range mode, it would has two values, one for the month the fromValue in and the other for the month the toValue in
         *
         * @private
         * @return {?}
         */
        function () {
            this.selectedMonths = [];
            if (this.isInSingleMode && this.selected) {
                this.selectedMonths[0] = this.getMonthInCurrentYear(this.selected);
            }
            if (this.isInRangeMode && this.selecteds) {
                this.selectedMonths[0] = this.getMonthInCurrentYear(this.selecteds[0]);
                this.selectedMonths[1] = this.getMonthInCurrentYear(this.selecteds[1]);
            }
        };
        /**
         * Check the given dates are in the same year
         */
        /**
         * Check the given dates are in the same year
         * @private
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        OwlYearViewComponent.prototype.hasSameYear = /**
         * Check the given dates are in the same year
         * @private
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        function (dateLeft, dateRight) {
            return !!(dateLeft &&
                dateRight &&
                this.dateTimeAdapter.getYear(dateLeft) ===
                    this.dateTimeAdapter.getYear(dateRight));
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
        OwlYearViewComponent.prototype.getValidDate = /**
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
        /**
         * @private
         * @return {?}
         */
        OwlYearViewComponent.prototype.focusActiveCell = /**
         * @private
         * @return {?}
         */
        function () {
            this.calendarBodyElm.focusActiveCell();
        };
        OwlYearViewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'owl-date-time-year-view',
                        exportAs: 'owlMonthView',
                        template: "<table class=\"owl-dt-calendar-table owl-dt-calendar-year-table\">\r\n    <thead class=\"owl-dt-calendar-header\">\r\n    <tr>\r\n        <th class=\"owl-dt-calendar-table-divider\" aria-hidden=\"true\" colspan=\"3\"></th>\r\n    </tr>\r\n    </thead>\r\n    <tbody owl-date-time-calendar-body role=\"grid\"\r\n           [rows]=\"months\" [numCols]=\"3\" [cellRatio]=\"3 / 7\"\r\n           [activeCell]=\"activeCell\"\r\n           [todayValue]=\"todayMonth\"\r\n           [selectedValues]=\"selectedMonths\"\r\n           [selectMode]=\"selectMode\"\r\n           (keydown)=\"handleCalendarKeydown($event)\"\r\n           (select)=\"selectCalendarCell($event)\">\r\n    </tbody>\r\n</table>\r\n",
                        host: {
                            '[class.owl-dt-calendar-view]': 'owlDTCalendarView'
                        },
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        OwlYearViewComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: DateTimeAdapter, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
        ]; };
        OwlYearViewComponent.propDecorators = {
            selectMode: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            selecteds: [{ type: core.Input }],
            pickerMoment: [{ type: core.Input }],
            dateFilter: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            change: [{ type: core.Output }],
            monthSelected: [{ type: core.Output }],
            pickerMomentChange: [{ type: core.Output }],
            keyboardEnter: [{ type: core.Output }],
            calendarBodyElm: [{ type: core.ViewChild, args: [OwlCalendarBodyComponent, { static: true },] }]
        };
        return OwlYearViewComponent;
    }());
    if (false) {
        /**
         * The select mode of the picker;
         *
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype._selectMode;
        /**
         * The currently selected date.
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype._selected;
        /**
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype._selecteds;
        /**
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype._pickerMoment;
        /**
         * A function used to filter which dates are selectable
         *
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype._dateFilter;
        /**
         * The minimum selectable date.
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype._minDate;
        /**
         * The maximum selectable date.
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype._maxDate;
        /**
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype.monthNames;
        /**
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype._months;
        /**
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype.localeSub;
        /**
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype.initiated;
        /** @type {?} */
        OwlYearViewComponent.prototype.todayMonth;
        /**
         * An array to hold all selectedDates' month value
         * the value is the month number in current year
         *
         * @type {?}
         */
        OwlYearViewComponent.prototype.selectedMonths;
        /**
         * Callback to invoke when a new month is selected
         *
         * @type {?}
         */
        OwlYearViewComponent.prototype.change;
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         *
         * @type {?}
         */
        OwlYearViewComponent.prototype.monthSelected;
        /**
         * Emits when any date is activated.
         * @type {?}
         */
        OwlYearViewComponent.prototype.pickerMomentChange;
        /**
         * Emits when use keyboard enter to select a calendar cell
         * @type {?}
         */
        OwlYearViewComponent.prototype.keyboardEnter;
        /**
         * The body of calendar table
         * @type {?}
         */
        OwlYearViewComponent.prototype.calendarBodyElm;
        /**
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype.cdRef;
        /**
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype.dateTimeAdapter;
        /**
         * @type {?}
         * @private
         */
        OwlYearViewComponent.prototype.dateTimeFormats;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var YEARS_PER_ROW = 3;
    /** @type {?} */
    var YEAR_ROWS = 7;
    /**
     * @template T
     */
    var OwlMultiYearViewComponent = /** @class */ (function () {
        function OwlMultiYearViewComponent(cdRef, pickerIntl, dateTimeAdapter) {
            this.cdRef = cdRef;
            this.pickerIntl = pickerIntl;
            this.dateTimeAdapter = dateTimeAdapter;
            /**
             * The select mode of the picker;
             *
             */
            this._selectMode = 'single';
            this._selecteds = [];
            this.initiated = false;
            /**
             * Callback to invoke when a new month is selected
             *
             */
            this.change = new core.EventEmitter();
            /**
             * Emits the selected year. This doesn't imply a change on the selected date
             *
             */
            this.yearSelected = new core.EventEmitter();
            /**
             * Emits when any date is activated.
             */
            this.pickerMomentChange = new core.EventEmitter();
            /**
             * Emits when use keyboard enter to select a calendar cell
             */
            this.keyboardEnter = new core.EventEmitter();
        }
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "selectMode", {
            get: /**
             * @return {?}
             */
            function () {
                return this._selectMode;
            },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._selectMode = val;
                if (this.initiated) {
                    this.setSelectedYears();
                    this.cdRef.markForCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "selected", {
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
                /** @type {?} */
                var oldSelected = this._selected;
                value = this.dateTimeAdapter.deserialize(value);
                this._selected = this.getValidDate(value);
                if (!this.dateTimeAdapter.isSameDay(oldSelected, this._selected)) {
                    this.setSelectedYears();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "selecteds", {
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
                this.setSelectedYears();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "pickerMoment", {
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
                /** @type {?} */
                var oldMoment = this._pickerMoment;
                value = this.dateTimeAdapter.deserialize(value);
                this._pickerMoment = this.getValidDate(value) || this.dateTimeAdapter.now();
                if (oldMoment && this._pickerMoment &&
                    !this.isSameYearList(oldMoment, this._pickerMoment)) {
                    this.generateYearList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "dateFilter", {
            get: /**
             * @return {?}
             */
            function () {
                return this._dateFilter;
            },
            set: /**
             * @param {?} filter
             * @return {?}
             */
            function (filter) {
                this._dateFilter = filter;
                if (this.initiated) {
                    this.generateYearList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "minDate", {
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
                this._minDate = this.getValidDate(value);
                if (this.initiated) {
                    this.generateYearList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "maxDate", {
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
                this._maxDate = this.getValidDate(value);
                if (this.initiated) {
                    this.generateYearList();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "todayYear", {
            get: /**
             * @return {?}
             */
            function () {
                return this._todayYear;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "years", {
            get: /**
             * @return {?}
             */
            function () {
                return this._years;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "selectedYears", {
            get: /**
             * @return {?}
             */
            function () {
                return this._selectedYears;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "isInSingleMode", {
            get: /**
             * @return {?}
             */
            function () {
                return this.selectMode === 'single';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "isInRangeMode", {
            get: /**
             * @return {?}
             */
            function () {
                return this.selectMode === 'range' || this.selectMode === 'rangeFrom'
                    || this.selectMode === 'rangeTo';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "activeCell", {
            get: /**
             * @return {?}
             */
            function () {
                if (this._pickerMoment) {
                    return this.dateTimeAdapter.getYear(this._pickerMoment) % (YEARS_PER_ROW * YEAR_ROWS);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "tableHeader", {
            get: /**
             * @return {?}
             */
            function () {
                if (this._years && this._years.length > 0) {
                    return this._years[0][0].displayValue + " ~ " + this._years[YEAR_ROWS - 1][YEARS_PER_ROW - 1].displayValue;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "prevButtonLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return this.pickerIntl.prevMultiYearLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "nextButtonLabel", {
            get: /**
             * @return {?}
             */
            function () {
                return this.pickerIntl.nextMultiYearLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "owlDTCalendarView", {
            get: /**
             * @return {?}
             */
            function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlMultiYearViewComponent.prototype, "owlDTCalendarMultiYearView", {
            get: /**
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
        OwlMultiYearViewComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
        };
        /**
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this._todayYear = this.dateTimeAdapter.getYear(this.dateTimeAdapter.now());
            this.generateYearList();
            this.initiated = true;
        };
        /**
         * Handle a calendarCell selected
         */
        /**
         * Handle a calendarCell selected
         * @param {?} cell
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.selectCalendarCell = /**
         * Handle a calendarCell selected
         * @param {?} cell
         * @return {?}
         */
        function (cell) {
            this.selectYear(cell.value);
        };
        /**
         * @private
         * @param {?} year
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.selectYear = /**
         * @private
         * @param {?} year
         * @return {?}
         */
        function (year) {
            this.yearSelected.emit(this.dateTimeAdapter.createDate(year, 0, 1));
            /** @type {?} */
            var firstDateOfMonth = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), 1);
            /** @type {?} */
            var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
            /** @type {?} */
            var selected = this.dateTimeAdapter.createDate(year, this.dateTimeAdapter.getMonth(this.pickerMoment), Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
            this.change.emit(selected);
        };
        /**
         * Generate the previous year list
         * */
        /**
         * Generate the previous year list
         *
         * @param {?} event
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.prevYearList = /**
         * Generate the previous year list
         *
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1 * YEAR_ROWS * YEARS_PER_ROW);
            this.generateYearList();
            event.preventDefault();
        };
        /**
         * Generate the next year list
         * */
        /**
         * Generate the next year list
         *
         * @param {?} event
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.nextYearList = /**
         * Generate the next year list
         *
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, YEAR_ROWS * YEARS_PER_ROW);
            this.generateYearList();
            event.preventDefault();
        };
        /**
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.generateYearList = /**
         * @return {?}
         */
        function () {
            this._years = [];
            /** @type {?} */
            var pickerMomentYear = this.dateTimeAdapter.getYear(this._pickerMoment);
            /** @type {?} */
            var offset = pickerMomentYear % (YEARS_PER_ROW * YEAR_ROWS);
            for (var i = 0; i < YEAR_ROWS; i++) {
                /** @type {?} */
                var row = [];
                for (var j = 0; j < YEARS_PER_ROW; j++) {
                    /** @type {?} */
                    var year = pickerMomentYear - offset + (j + i * YEARS_PER_ROW);
                    /** @type {?} */
                    var yearCell = this.createYearCell(year);
                    row.push(yearCell);
                }
                this._years.push(row);
            }
            return;
        };
        /** Whether the previous period button is enabled. */
        /**
         * Whether the previous period button is enabled.
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.previousEnabled = /**
         * Whether the previous period button is enabled.
         * @return {?}
         */
        function () {
            if (!this.minDate) {
                return true;
            }
            return !this.minDate || !this.isSameYearList(this._pickerMoment, this.minDate);
        };
        /** Whether the next period button is enabled. */
        /**
         * Whether the next period button is enabled.
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.nextEnabled = /**
         * Whether the next period button is enabled.
         * @return {?}
         */
        function () {
            return !this.maxDate || !this.isSameYearList(this._pickerMoment, this.maxDate);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.handleCalendarKeydown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var moment;
            switch (event.keyCode) {
                // minus 1 year
                case keycodes.LEFT_ARROW:
                    moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 year
                case keycodes.RIGHT_ARROW:
                    moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, 1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // minus 3 years
                case keycodes.UP_ARROW:
                    moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -1 * YEARS_PER_ROW);
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 3 years
                case keycodes.DOWN_ARROW:
                    moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, YEARS_PER_ROW);
                    this.pickerMomentChange.emit(moment);
                    break;
                // go to the first year of the year page
                case keycodes.HOME:
                    moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -this.dateTimeAdapter.getYear(this._pickerMoment) % (YEARS_PER_ROW * YEAR_ROWS));
                    this.pickerMomentChange.emit(moment);
                    break;
                // go to the last year of the year page
                case keycodes.END:
                    moment = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, (YEARS_PER_ROW * YEAR_ROWS) - this.dateTimeAdapter.getYear(this._pickerMoment) % (YEARS_PER_ROW * YEAR_ROWS) - 1);
                    this.pickerMomentChange.emit(moment);
                    break;
                // minus 1 year page (or 10 year pages)
                case keycodes.PAGE_UP:
                    moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? -10 * (YEARS_PER_ROW * YEAR_ROWS) : -1 * (YEARS_PER_ROW * YEAR_ROWS));
                    this.pickerMomentChange.emit(moment);
                    break;
                // add 1 year page (or 10 year pages)
                case keycodes.PAGE_DOWN:
                    moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? 10 * (YEARS_PER_ROW * YEAR_ROWS) : (YEARS_PER_ROW * YEAR_ROWS));
                    this.pickerMomentChange.emit(moment);
                    break;
                case keycodes.ENTER:
                    this.selectYear(this.dateTimeAdapter.getYear(this._pickerMoment));
                    this.keyboardEnter.emit();
                    break;
                default:
                    return;
            }
            this.focusActiveCell();
            event.preventDefault();
        };
        /**
         * Creates an CalendarCell for the given year.
         */
        /**
         * Creates an CalendarCell for the given year.
         * @private
         * @param {?} year
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.createYearCell = /**
         * Creates an CalendarCell for the given year.
         * @private
         * @param {?} year
         * @return {?}
         */
        function (year) {
            /** @type {?} */
            var startDateOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
            /** @type {?} */
            var ariaLabel = this.dateTimeAdapter.getYearName(startDateOfYear);
            /** @type {?} */
            var cellClass = 'owl-dt-year-' + year;
            return new CalendarCell(year, year.toString(), ariaLabel, this.isYearEnabled(year), false, cellClass);
        };
        /**
         * @private
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.setSelectedYears = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this._selectedYears = [];
            if (this.isInSingleMode && this.selected) {
                this._selectedYears[0] = this.dateTimeAdapter.getYear(this.selected);
            }
            if (this.isInRangeMode && this.selecteds) {
                this._selectedYears = this.selecteds.map((/**
                 * @param {?} selected
                 * @return {?}
                 */
                function (selected) {
                    if (_this.dateTimeAdapter.isValid(selected)) {
                        return _this.dateTimeAdapter.getYear(selected);
                    }
                    else {
                        return null;
                    }
                }));
            }
        };
        /** Whether the given year is enabled. */
        /**
         * Whether the given year is enabled.
         * @private
         * @param {?} year
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.isYearEnabled = /**
         * Whether the given year is enabled.
         * @private
         * @param {?} year
         * @return {?}
         */
        function (year) {
            // disable if the year is greater than maxDate lower than minDate
            if (year === undefined || year === null ||
                (this.maxDate && year > this.dateTimeAdapter.getYear(this.maxDate)) ||
                (this.minDate && year < this.dateTimeAdapter.getYear(this.minDate))) {
                return false;
            }
            // enable if it reaches here and there's no filter defined
            if (!this.dateFilter) {
                return true;
            }
            /** @type {?} */
            var firstOfYear = this.dateTimeAdapter.createDate(year, 0, 1);
            // If any date in the year is enabled count the year as enabled.
            for (var date = firstOfYear; this.dateTimeAdapter.getYear(date) == year; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
                if (this.dateFilter(date)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * @private
         * @param {?} date1
         * @param {?} date2
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.isSameYearList = /**
         * @private
         * @param {?} date1
         * @param {?} date2
         * @return {?}
         */
        function (date1, date2) {
            return Math.floor(this.dateTimeAdapter.getYear(date1) / (YEARS_PER_ROW * YEAR_ROWS)) ===
                Math.floor(this.dateTimeAdapter.getYear(date2) / (YEARS_PER_ROW * YEAR_ROWS));
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
        OwlMultiYearViewComponent.prototype.getValidDate = /**
         * Get a valid date object
         * @private
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            return (this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj)) ? obj : null;
        };
        /**
         * @private
         * @return {?}
         */
        OwlMultiYearViewComponent.prototype.focusActiveCell = /**
         * @private
         * @return {?}
         */
        function () {
            this.calendarBodyElm.focusActiveCell();
        };
        OwlMultiYearViewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'owl-date-time-multi-year-view',
                        template: "<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\r\n        [disabled]=\"!previousEnabled()\" [attr.aria-label]=\"prevButtonLabel\"\r\n        type=\"button\" tabindex=\"0\" (click)=\"prevYearList($event)\">\r\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n        <!-- <editor-fold desc=\"SVG Arrow Left\"> -->\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\r\n             version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 250.738 250.738\"\r\n             style=\"enable-background:new 0 0 250.738 250.738;\" xml:space=\"preserve\"\r\n             width=\"100%\" height=\"100%\">\r\n            <path style=\"fill-rule: evenodd; clip-rule: evenodd;\" d=\"M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z\"/>\r\n        </svg>\r\n        <!-- </editor-fold> -->\r\n    </span>\r\n</button>\r\n<table class=\"owl-dt-calendar-table owl-dt-calendar-multi-year-table\">\r\n    <thead class=\"owl-dt-calendar-header\">\r\n    <tr>\r\n        <th colspan=\"3\">{{tableHeader}}</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody owl-date-time-calendar-body role=\"grid\"\r\n           [rows]=\"years\" [numCols]=\"3\" [cellRatio]=\"3 / 7\"\r\n           [activeCell]=\"activeCell\"\r\n           [todayValue]=\"todayYear\"\r\n           [selectedValues]=\"selectedYears\"\r\n           [selectMode]=\"selectMode\"\r\n           (keydown)=\"handleCalendarKeydown($event)\"\r\n           (select)=\"selectCalendarCell($event)\"></tbody>\r\n</table>\r\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\r\n        [disabled]=\"!nextEnabled()\" [attr.aria-label]=\"nextButtonLabel\"\r\n        type=\"button\" tabindex=\"0\" (click)=\"nextYearList($event)\">\r\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n        <!-- <editor-fold desc=\"SVG Arrow Right\"> -->\r\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n             viewBox=\"0 0 250.738 250.738\" style=\"enable-background:new 0 0 250.738 250.738;\" xml:space=\"preserve\">\r\n            <path style=\"fill-rule:evenodd;clip-rule:evenodd;\" d=\"M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\r\n                c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\r\n                c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\r\n                C197.237,120.447,195.534,115.448,191.75,111.689z\"/>\r\n        </svg>\r\n        <!-- </editor-fold> -->\r\n    </span>\r\n</button>\r\n",
                        host: {
                            '[class.owl-dt-calendar-view]': 'owlDTCalendarView',
                            '[class.owl-dt-calendar-multi-year-view]': 'owlDTCalendarMultiYearView'
                        },
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        OwlMultiYearViewComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: OwlDateTimeIntl },
            { type: DateTimeAdapter, decorators: [{ type: core.Optional }] }
        ]; };
        OwlMultiYearViewComponent.propDecorators = {
            selectMode: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            selecteds: [{ type: core.Input }],
            pickerMoment: [{ type: core.Input }],
            dateFilter: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            change: [{ type: core.Output }],
            yearSelected: [{ type: core.Output }],
            pickerMomentChange: [{ type: core.Output }],
            keyboardEnter: [{ type: core.Output }],
            calendarBodyElm: [{ type: core.ViewChild, args: [OwlCalendarBodyComponent, { static: true },] }]
        };
        return OwlMultiYearViewComponent;
    }());
    if (false) {
        /**
         * The select mode of the picker;
         *
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype._selectMode;
        /**
         * The currently selected date.
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype._selected;
        /**
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype._selecteds;
        /**
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype._pickerMoment;
        /**
         * A function used to filter which dates are selectable
         *
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype._dateFilter;
        /**
         * The minimum selectable date.
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype._minDate;
        /**
         * The maximum selectable date.
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype._maxDate;
        /**
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype._todayYear;
        /**
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype._years;
        /**
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype._selectedYears;
        /**
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype.initiated;
        /**
         * Callback to invoke when a new month is selected
         *
         * @type {?}
         */
        OwlMultiYearViewComponent.prototype.change;
        /**
         * Emits the selected year. This doesn't imply a change on the selected date
         *
         * @type {?}
         */
        OwlMultiYearViewComponent.prototype.yearSelected;
        /**
         * Emits when any date is activated.
         * @type {?}
         */
        OwlMultiYearViewComponent.prototype.pickerMomentChange;
        /**
         * Emits when use keyboard enter to select a calendar cell
         * @type {?}
         */
        OwlMultiYearViewComponent.prototype.keyboardEnter;
        /**
         * The body of calendar table
         * @type {?}
         */
        OwlMultiYearViewComponent.prototype.calendarBodyElm;
        /**
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype.cdRef;
        /**
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype.pickerIntl;
        /**
         * @type {?}
         * @private
         */
        OwlMultiYearViewComponent.prototype.dateTimeAdapter;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OwlTimerBoxComponent = /** @class */ (function () {
        function OwlTimerBoxComponent() {
            this.showDivider = false;
            this.step = 1;
            this.debounceTime = 500;
            this.valueChange = new core.EventEmitter();
            this.inputChange = new core.EventEmitter();
            this.inputStream = new rxjs.Subject();
            this.inputStreamSub = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(OwlTimerBoxComponent.prototype, "displayValue", {
            get: /**
             * @return {?}
             */
            function () {
                return this.boxValue || this.value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlTimerBoxComponent.prototype, "owlDTTimerBoxClass", {
            get: /**
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
        OwlTimerBoxComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.inputStreamSub = this.inputStream.pipe(operators.debounceTime(this.debounceTime), operators.distinctUntilChanged()).subscribe((/**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                if (val) {
                    /** @type {?} */
                    var inputValue = coercion.coerceNumberProperty(val, 0);
                    _this.updateValueViaInput(inputValue);
                }
            }));
        };
        /**
         * @return {?}
         */
        OwlTimerBoxComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.inputStreamSub.unsubscribe();
        };
        /**
         * @return {?}
         */
        OwlTimerBoxComponent.prototype.upBtnClicked = /**
         * @return {?}
         */
        function () {
            this.updateValue(this.value + this.step);
        };
        /**
         * @return {?}
         */
        OwlTimerBoxComponent.prototype.downBtnClicked = /**
         * @return {?}
         */
        function () {
            this.updateValue(this.value - this.step);
        };
        /**
         * @param {?} val
         * @return {?}
         */
        OwlTimerBoxComponent.prototype.handleInputChange = /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.inputStream.next(val);
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        OwlTimerBoxComponent.prototype.updateValue = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.valueChange.emit(value);
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        OwlTimerBoxComponent.prototype.updateValueViaInput = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value > this.max || value < this.min) {
                return;
            }
            this.inputChange.emit(value);
        };
        OwlTimerBoxComponent.decorators = [
            { type: core.Component, args: [{
                        exportAs: 'owlDateTimeTimerBox',
                        selector: 'owl-date-time-timer-box',
                        template: "<div *ngIf=\"showDivider\" class=\"owl-dt-timer-divider\" aria-hidden=\"true\"></div>\r\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\r\n        type=\"button\" tabindex=\"-1\"\r\n        [disabled]=\"upBtnDisabled\"\r\n        [attr.aria-label]=\"upBtnAriaLabel\"\r\n        (click)=\"upBtnClicked()\">\r\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n        <!-- <editor-fold desc=\"SVG Arrow Up\"> -->\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\r\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\r\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\r\n                 width=\"100%\" height=\"100%\">\r\n                    <path d=\"M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0\r\n                        L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4\r\n                        c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z\"/>\r\n                </svg>\r\n        <!-- </editor-fold> -->\r\n    </span>\r\n</button>\r\n<label class=\"owl-dt-timer-content\">\r\n    <input class=\"owl-dt-timer-input\" maxlength=\"2\"\r\n           [value]=\"displayValue | numberFixedLen : 2\"\r\n           (focus)=\"valueInput.select()\"\r\n           (input)=\"handleInputChange(valueInput.value)\" #valueInput>\r\n    <span class=\"owl-hidden-accessible\">{{inputLabel}}</span>\r\n</label>\r\n<button class=\"owl-dt-control-button owl-dt-control-arrow-button\"\r\n        type=\"button\" tabindex=\"-1\"\r\n        [disabled]=\"downBtnDisabled\"\r\n        [attr.aria-label]=\"downBtnAriaLabel\"\r\n        (click)=\"downBtnClicked()\">\r\n    <span class=\"owl-dt-control-button-content\" tabindex=\"-1\">\r\n        <!-- <editor-fold desc=\"SVG Arrow Down\"> -->\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\r\n                 version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 451.847 451.846\"\r\n                 style=\"enable-background:new 0 0 451.847 451.846;\" xml:space=\"preserve\"\r\n                 width=\"100%\" height=\"100%\">\r\n                    <path d=\"M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751\r\n                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0\r\n                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z\"/>\r\n                </svg>\r\n        <!-- </editor-fold> -->\r\n    </span>\r\n</button>\r\n",
                        preserveWhitespaces: false,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            '[class.owl-dt-timer-box]': 'owlDTTimerBoxClass'
                        },
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        OwlTimerBoxComponent.ctorParameters = function () { return []; };
        OwlTimerBoxComponent.propDecorators = {
            showDivider: [{ type: core.Input }],
            upBtnAriaLabel: [{ type: core.Input }],
            upBtnDisabled: [{ type: core.Input }],
            downBtnAriaLabel: [{ type: core.Input }],
            downBtnDisabled: [{ type: core.Input }],
            boxValue: [{ type: core.Input }],
            value: [{ type: core.Input }],
            min: [{ type: core.Input }],
            max: [{ type: core.Input }],
            step: [{ type: core.Input }],
            inputLabel: [{ type: core.Input }],
            debounceTime: [{ type: core.Input }],
            valueChange: [{ type: core.Output }],
            inputChange: [{ type: core.Output }]
        };
        return OwlTimerBoxComponent;
    }());
    if (false) {
        /** @type {?} */
        OwlTimerBoxComponent.prototype.showDivider;
        /** @type {?} */
        OwlTimerBoxComponent.prototype.upBtnAriaLabel;
        /** @type {?} */
        OwlTimerBoxComponent.prototype.upBtnDisabled;
        /** @type {?} */
        OwlTimerBoxComponent.prototype.downBtnAriaLabel;
        /** @type {?} */
        OwlTimerBoxComponent.prototype.downBtnDisabled;
        /**
         * Value would be displayed in the box
         * If it is null, the box would display [value]
         *
         * @type {?}
         */
        OwlTimerBoxComponent.prototype.boxValue;
        /** @type {?} */
        OwlTimerBoxComponent.prototype.value;
        /** @type {?} */
        OwlTimerBoxComponent.prototype.min;
        /** @type {?} */
        OwlTimerBoxComponent.prototype.max;
        /** @type {?} */
        OwlTimerBoxComponent.prototype.step;
        /** @type {?} */
        OwlTimerBoxComponent.prototype.inputLabel;
        /** @type {?} */
        OwlTimerBoxComponent.prototype.debounceTime;
        /** @type {?} */
        OwlTimerBoxComponent.prototype.valueChange;
        /** @type {?} */
        OwlTimerBoxComponent.prototype.inputChange;
        /**
         * @type {?}
         * @private
         */
        OwlTimerBoxComponent.prototype.inputStream;
        /**
         * @type {?}
         * @private
         */
        OwlTimerBoxComponent.prototype.inputStreamSub;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NumberFixedLenPipe = /** @class */ (function () {
        function NumberFixedLenPipe() {
        }
        /**
         * @param {?} num
         * @param {?} len
         * @return {?}
         */
        NumberFixedLenPipe.prototype.transform = /**
         * @param {?} num
         * @param {?} len
         * @return {?}
         */
        function (num, len) {
            /** @type {?} */
            var number = Math.floor(num);
            /** @type {?} */
            var length = Math.floor(len);
            if (num === null || isNaN(number) || isNaN(length)) {
                return num;
            }
            /** @type {?} */
            var numString = number.toString();
            while (numString.length < length) {
                numString = '0' + numString;
            }
            return numString;
        };
        NumberFixedLenPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'numberFixedLen'
                    },] }
        ];
        return NumberFixedLenPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var OWL_DATETIME_VALUE_ACCESSOR$1 = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return OwlDateTimeInlineComponent; })),
        multi: true
    };
    /**
     * @template T
     */
    var OwlDateTimeInlineComponent = /** @class */ (function (_super) {
        __extends(OwlDateTimeInlineComponent, _super);
        function OwlDateTimeInlineComponent(changeDetector, dateTimeAdapter, dateTimeFormats) {
            var _this = _super.call(this, dateTimeAdapter, dateTimeFormats) || this;
            _this.changeDetector = changeDetector;
            _this.dateTimeAdapter = dateTimeAdapter;
            _this.dateTimeFormats = dateTimeFormats;
            /**
             * Set the type of the dateTime picker
             *      'both' -- show both calendar and timer
             *      'calendar' -- show only calendar
             *      'timer' -- show only timer
             */
            _this._pickerType = 'both';
            _this._disabled = false;
            _this._selectMode = 'single';
            _this._values = [];
            /**
             * Emits selected year in multi-year view
             * This doesn't imply a change on the selected date.
             *
             */
            _this.yearSelected = new core.EventEmitter();
            /**
             * Emits selected month in year view
             * This doesn't imply a change on the selected date.
             *
             */
            _this.monthSelected = new core.EventEmitter();
            _this._selecteds = [];
            _this.onModelChange = (/**
             * @return {?}
             */
            function () { });
            _this.onModelTouched = (/**
             * @return {?}
             */
            function () { });
            return _this;
        }
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "pickerType", {
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
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "disabled", {
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
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "selectMode", {
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
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "startAt", {
            get: /**
             * @return {?}
             */
            function () {
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
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "dateTimeFilter", {
            get: /**
             * @return {?}
             */
            function () {
                return this._dateTimeFilter;
            },
            set: /**
             * @param {?} filter
             * @return {?}
             */
            function (filter) {
                this._dateTimeFilter = filter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "minDateTime", {
            get: /**
             * @return {?}
             */
            function () {
                return this._min || null;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
                this.changeDetector.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "maxDateTime", {
            get: /**
             * @return {?}
             */
            function () {
                return this._max || null;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
                this.changeDetector.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "value", {
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
                value = this.getValidDate(value);
                this._value = value;
                this.selected = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "values", {
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
                    values = values.map((/**
                     * @param {?} v
                     * @return {?}
                     */
                    function (v) {
                        v = _this.dateTimeAdapter.deserialize(v);
                        v = _this.getValidDate(v);
                        return v ? _this.dateTimeAdapter.clone(v) : null;
                    }));
                    this._values = __spread(values);
                    this.selecteds = __spread(values);
                }
                else {
                    this._values = [];
                    this.selecteds = [];
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "selected", {
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
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "selecteds", {
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
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "opened", {
            get: /**
             * @return {?}
             */
            function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "pickerMode", {
            get: /**
             * @return {?}
             */
            function () {
                return 'inline';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "isInSingleMode", {
            get: /**
             * @return {?}
             */
            function () {
                return this._selectMode === 'single';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "isInRangeMode", {
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
        Object.defineProperty(OwlDateTimeInlineComponent.prototype, "owlDTInlineClass", {
            get: /**
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
        OwlDateTimeInlineComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.container.picker = this;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        OwlDateTimeInlineComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this.isInSingleMode) {
                this.value = value;
                this.container.pickerMoment = value;
            }
            else {
                this.values = value;
                this.container.pickerMoment = this._values[this.container.activeSelectedIndex];
            }
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        OwlDateTimeInlineComponent.prototype.registerOnChange = /**
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
        OwlDateTimeInlineComponent.prototype.registerOnTouched = /**
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
        OwlDateTimeInlineComponent.prototype.setDisabledState = /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this.disabled = isDisabled;
        };
        /**
         * @param {?} date
         * @return {?}
         */
        OwlDateTimeInlineComponent.prototype.select = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (this.disabled) {
                return;
            }
            if (Array.isArray(date)) {
                this.values = __spread(date);
            }
            else {
                this.value = date;
            }
            this.onModelChange(date);
            this.onModelTouched();
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
        OwlDateTimeInlineComponent.prototype.selectYear = /**
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
        OwlDateTimeInlineComponent.prototype.selectMonth = /**
         * Emits selected month in year view
         *
         * @param {?} normalizedMonth
         * @return {?}
         */
        function (normalizedMonth) {
            this.monthSelected.emit(normalizedMonth);
        };
        OwlDateTimeInlineComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'owl-date-time-inline',
                        template: "<owl-date-time-container></owl-date-time-container>",
                        host: {
                            '[class.owl-dt-inline]': 'owlDTInlineClass'
                        },
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false,
                        providers: [OWL_DATETIME_VALUE_ACCESSOR$1],
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        OwlDateTimeInlineComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: DateTimeAdapter, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [OWL_DATE_TIME_FORMATS,] }] }
        ]; };
        OwlDateTimeInlineComponent.propDecorators = {
            container: [{ type: core.ViewChild, args: [OwlDateTimeContainerComponent, { static: true },] }],
            pickerType: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            selectMode: [{ type: core.Input }],
            startAt: [{ type: core.Input }],
            dateTimeFilter: [{ type: core.Input, args: ['owlDateTimeFilter',] }],
            minDateTime: [{ type: core.Input, args: ['min',] }],
            maxDateTime: [{ type: core.Input, args: ['max',] }],
            value: [{ type: core.Input }],
            values: [{ type: core.Input }],
            yearSelected: [{ type: core.Output }],
            monthSelected: [{ type: core.Output }]
        };
        return OwlDateTimeInlineComponent;
    }(OwlDateTime));
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OwlDialogModule = /** @class */ (function () {
        function OwlDialogModule() {
        }
        OwlDialogModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, a11y.A11yModule, overlay.OverlayModule, portal.PortalModule],
                        exports: [],
                        declarations: [
                            OwlDialogContainerComponent,
                        ],
                        providers: [
                            OWL_DIALOG_SCROLL_STRATEGY_PROVIDER,
                            OwlDialogService,
                        ],
                        entryComponents: [
                            OwlDialogContainerComponent,
                        ]
                    },] }
        ];
        return OwlDialogModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OwlDateTimeModule = /** @class */ (function () {
        function OwlDateTimeModule() {
        }
        OwlDateTimeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, overlay.OverlayModule, OwlDialogModule, a11y.A11yModule],
                        exports: [
                            OwlCalendarComponent,
                            OwlTimerComponent,
                            OwlDateTimeTriggerDirective,
                            OwlDateTimeInputDirective,
                            OwlDateTimeComponent,
                            OwlDateTimeInlineComponent,
                            OwlMultiYearViewComponent,
                            OwlYearViewComponent,
                            OwlMonthViewComponent,
                        ],
                        declarations: [
                            OwlDateTimeTriggerDirective,
                            OwlDateTimeInputDirective,
                            OwlDateTimeComponent,
                            OwlDateTimeContainerComponent,
                            OwlMultiYearViewComponent,
                            OwlYearViewComponent,
                            OwlMonthViewComponent,
                            OwlTimerComponent,
                            OwlTimerBoxComponent,
                            OwlCalendarComponent,
                            OwlCalendarBodyComponent,
                            NumberFixedLenPipe,
                            OwlDateTimeInlineComponent,
                        ],
                        providers: [
                            OwlDateTimeIntl,
                            OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER,
                        ],
                        entryComponents: [
                            OwlDateTimeContainerComponent,
                        ]
                    },] }
        ];
        return OwlDateTimeModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * The default month names to use if Intl API is not available.
     * @type {?}
     */
    var DEFAULT_MONTH_NAMES = {
        long: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        short: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
    };
    /**
     * The default day of the week names to use if Intl API is not available.
     * @type {?}
     */
    var DEFAULT_DAY_OF_WEEK_NAMES = {
        long: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    };
    var ɵ0 = /**
     * @param {?} i
     * @return {?}
     */
    function (i) { return String(i + 1); };
    /**
     * The default date names to use if Intl API is not available.
     * @type {?}
     */
    var DEFAULT_DATE_NAMES = range(31, (ɵ0));
    /**
     * Whether the browser supports the Intl API.
     * @type {?}
     */
    var SUPPORTS_INTL_API = typeof Intl !== 'undefined';
    /**
     * Matches strings that have the form of a valid RFC 3339 string
     * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
     * because the regex will match strings an with out of bounds month, date, etc.
     * @type {?}
     */
    var ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
    /**
     * Creates an array and fills it with values.
     * @template T
     * @param {?} length
     * @param {?} valueFunction
     * @return {?}
     */
    function range(length, valueFunction) {
        /** @type {?} */
        var valuesArray = Array(length);
        for (var i = 0; i < length; i++) {
            valuesArray[i] = valueFunction(i);
        }
        return valuesArray;
    }
    var NativeDateTimeAdapter = /** @class */ (function (_super) {
        __extends(NativeDateTimeAdapter, _super);
        function NativeDateTimeAdapter(owlDateTimeLocale, platform) {
            var _this = _super.call(this) || this;
            _this.owlDateTimeLocale = owlDateTimeLocale;
            _super.prototype.setLocale.call(_this, owlDateTimeLocale);
            // IE does its own time zone correction, so we disable this on IE.
            _this.useUtcForDisplay = !platform.TRIDENT;
            _this._clampDate = platform.TRIDENT || platform.EDGE;
            return _this;
        }
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getYear = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getFullYear();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getMonth = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getMonth();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getDay = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getDay();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getDate = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getDate();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getHours = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getHours();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getMinutes = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getMinutes();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getSeconds = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getSeconds();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getTime = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getTime();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getNumDaysInMonth = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var lastDateOfMonth = this.createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0);
            return this.getDate(lastDateOfMonth);
        };
        /**
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.differenceInCalendarDays = /**
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        function (dateLeft, dateRight) {
            if (this.isValid(dateLeft) && this.isValid(dateRight)) {
                /** @type {?} */
                var dateLeftStartOfDay = this.createDate(this.getYear(dateLeft), this.getMonth(dateLeft), this.getDate(dateLeft));
                /** @type {?} */
                var dateRightStartOfDay = this.createDate(this.getYear(dateRight), this.getMonth(dateRight), this.getDate(dateRight));
                /** @type {?} */
                var timeStampLeft = this.getTime(dateLeftStartOfDay) -
                    dateLeftStartOfDay.getTimezoneOffset() *
                        this.milliseondsInMinute;
                /** @type {?} */
                var timeStampRight = this.getTime(dateRightStartOfDay) -
                    dateRightStartOfDay.getTimezoneOffset() *
                        this.milliseondsInMinute;
                return Math.round((timeStampLeft - timeStampRight) / this.millisecondsInDay);
            }
            else {
                return null;
            }
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getYearName = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (SUPPORTS_INTL_API) {
                /** @type {?} */
                var dtf = new Intl.DateTimeFormat(this.locale, {
                    year: 'numeric',
                    timeZone: 'utc'
                });
                return this.stripDirectionalityCharacters(this._format(dtf, date));
            }
            return String(this.getYear(date));
        };
        /**
         * @param {?} style
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getMonthNames = /**
         * @param {?} style
         * @return {?}
         */
        function (style) {
            var _this = this;
            if (SUPPORTS_INTL_API) {
                /** @type {?} */
                var dtf_1 = new Intl.DateTimeFormat(this.locale, {
                    month: style,
                    timeZone: 'utc'
                });
                return range(12, (/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) {
                    return _this.stripDirectionalityCharacters(_this._format(dtf_1, new Date(2017, i, 1)));
                }));
            }
            return DEFAULT_MONTH_NAMES[style];
        };
        /**
         * @param {?} style
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getDayOfWeekNames = /**
         * @param {?} style
         * @return {?}
         */
        function (style) {
            var _this = this;
            if (SUPPORTS_INTL_API) {
                /** @type {?} */
                var dtf_2 = new Intl.DateTimeFormat(this.locale, {
                    weekday: style,
                    timeZone: 'utc'
                });
                return range(7, (/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) {
                    return _this.stripDirectionalityCharacters(_this._format(dtf_2, new Date(2017, 0, i + 1)));
                }));
            }
            return DEFAULT_DAY_OF_WEEK_NAMES[style];
        };
        /**
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.getDateNames = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (SUPPORTS_INTL_API) {
                /** @type {?} */
                var dtf_3 = new Intl.DateTimeFormat(this.locale, {
                    day: 'numeric',
                    timeZone: 'utc'
                });
                return range(31, (/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) {
                    return _this.stripDirectionalityCharacters(_this._format(dtf_3, new Date(2017, 0, i + 1)));
                }));
            }
            return DEFAULT_DATE_NAMES;
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.toIso8601 = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.toISOString();
        };
        /**
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.isEqual = /**
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        function (dateLeft, dateRight) {
            if (this.isValid(dateLeft) && this.isValid(dateRight)) {
                return dateLeft.getTime() === dateRight.getTime();
            }
            else {
                return false;
            }
        };
        /**
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.isSameDay = /**
         * @param {?} dateLeft
         * @param {?} dateRight
         * @return {?}
         */
        function (dateLeft, dateRight) {
            if (this.isValid(dateLeft) && this.isValid(dateRight)) {
                /** @type {?} */
                var dateLeftStartOfDay = this.clone(dateLeft);
                /** @type {?} */
                var dateRightStartOfDay = this.clone(dateRight);
                dateLeftStartOfDay.setHours(0, 0, 0, 0);
                dateRightStartOfDay.setHours(0, 0, 0, 0);
                return (dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime());
            }
            else {
                return false;
            }
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.isValid = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date && !isNaN(date.getTime());
        };
        /**
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.invalid = /**
         * @return {?}
         */
        function () {
            return new Date(NaN);
        };
        /**
         * @param {?} obj
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.isDateInstance = /**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            return obj instanceof Date;
        };
        /**
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.addCalendarYears = /**
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        function (date, amount) {
            return this.addCalendarMonths(date, amount * 12);
        };
        /**
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.addCalendarMonths = /**
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        function (date, amount) {
            /** @type {?} */
            var result = this.clone(date);
            amount = Number(amount);
            /** @type {?} */
            var desiredMonth = result.getMonth() + amount;
            /** @type {?} */
            var dateWithDesiredMonth = new Date(0);
            dateWithDesiredMonth.setFullYear(result.getFullYear(), desiredMonth, 1);
            dateWithDesiredMonth.setHours(0, 0, 0, 0);
            /** @type {?} */
            var daysInMonth = this.getNumDaysInMonth(dateWithDesiredMonth);
            // Set the last day of the new month
            // if the original date was the last day of the longer month
            result.setMonth(desiredMonth, Math.min(daysInMonth, result.getDate()));
            return result;
        };
        /**
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.addCalendarDays = /**
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        function (date, amount) {
            /** @type {?} */
            var result = this.clone(date);
            amount = Number(amount);
            result.setDate(result.getDate() + amount);
            return result;
        };
        /**
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.setHours = /**
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        function (date, amount) {
            /** @type {?} */
            var result = this.clone(date);
            result.setHours(amount);
            return result;
        };
        /**
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.setMinutes = /**
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        function (date, amount) {
            /** @type {?} */
            var result = this.clone(date);
            result.setMinutes(amount);
            return result;
        };
        /**
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.setSeconds = /**
         * @param {?} date
         * @param {?} amount
         * @return {?}
         */
        function (date, amount) {
            /** @type {?} */
            var result = this.clone(date);
            result.setSeconds(amount);
            return result;
        };
        /**
         * @param {?} year
         * @param {?} month
         * @param {?} date
         * @param {?=} hours
         * @param {?=} minutes
         * @param {?=} seconds
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.createDate = /**
         * @param {?} year
         * @param {?} month
         * @param {?} date
         * @param {?=} hours
         * @param {?=} minutes
         * @param {?=} seconds
         * @return {?}
         */
        function (year, month, date, hours, minutes, seconds) {
            if (hours === void 0) { hours = 0; }
            if (minutes === void 0) { minutes = 0; }
            if (seconds === void 0) { seconds = 0; }
            if (month < 0 || month > 11) {
                throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
            }
            if (date < 1) {
                throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
            }
            if (hours < 0 || hours > 23) {
                throw Error("Invalid hours \"" + hours + "\". Hours has to be between 0 and 23.");
            }
            if (minutes < 0 || minutes > 59) {
                throw Error("Invalid minutes \"" + minutes + "\". Minutes has to between 0 and 59.");
            }
            if (seconds < 0 || seconds > 59) {
                throw Error("Invalid seconds \"" + seconds + "\". Seconds has to be between 0 and 59.");
            }
            /** @type {?} */
            var result = this.createDateWithOverflow(year, month, date, hours, minutes, seconds);
            // Check that the date wasn't above the upper bound for the month, causing the month to overflow
            // For example, createDate(2017, 1, 31) would try to create a date 2017/02/31 which is invalid
            if (result.getMonth() !== month) {
                throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
            }
            return result;
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.clone = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date), this.getSeconds(date));
        };
        /**
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.now = /**
         * @return {?}
         */
        function () {
            return new Date();
        };
        /**
         * @param {?} date
         * @param {?} displayFormat
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.format = /**
         * @param {?} date
         * @param {?} displayFormat
         * @return {?}
         */
        function (date, displayFormat) {
            if (!this.isValid(date)) {
                throw Error('JSNativeDate: Cannot format invalid date.');
            }
            if (SUPPORTS_INTL_API) {
                if (this._clampDate &&
                    (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
                    date = this.clone(date);
                    date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
                }
                displayFormat = __assign({}, displayFormat, { timeZone: 'utc' });
                /** @type {?} */
                var dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
                return this.stripDirectionalityCharacters(this._format(dtf, date));
            }
            return this.stripDirectionalityCharacters(date.toDateString());
        };
        /**
         * @param {?} value
         * @param {?} parseFormat
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.parse = /**
         * @param {?} value
         * @param {?} parseFormat
         * @return {?}
         */
        function (value, parseFormat) {
            // There is no way using the native JS Date to set the parse format or locale
            if (typeof value === 'number') {
                return new Date(value);
            }
            return value ? new Date(Date.parse(value)) : null;
        };
        /**
         * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
         * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
         * invalid date for all other values.
         */
        /**
         * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
         * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
         * invalid date for all other values.
         * @param {?} value
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.deserialize = /**
         * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
         * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
         * invalid date for all other values.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                if (!value) {
                    return null;
                }
                // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
                // string is the right format first.
                if (ISO_8601_REGEX.test(value)) {
                    /** @type {?} */
                    var date = new Date(value);
                    if (this.isValid(date)) {
                        return date;
                    }
                }
            }
            return _super.prototype.deserialize.call(this, value);
        };
        /**
         * Creates a date but allows the month and date to overflow.
         */
        /**
         * Creates a date but allows the month and date to overflow.
         * @private
         * @param {?} year
         * @param {?} month
         * @param {?} date
         * @param {?=} hours
         * @param {?=} minutes
         * @param {?=} seconds
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.createDateWithOverflow = /**
         * Creates a date but allows the month and date to overflow.
         * @private
         * @param {?} year
         * @param {?} month
         * @param {?} date
         * @param {?=} hours
         * @param {?=} minutes
         * @param {?=} seconds
         * @return {?}
         */
        function (year, month, date, hours, minutes, seconds) {
            if (hours === void 0) { hours = 0; }
            if (minutes === void 0) { minutes = 0; }
            if (seconds === void 0) { seconds = 0; }
            /** @type {?} */
            var result = new Date(year, month, date, hours, minutes, seconds);
            if (year >= 0 && year < 100) {
                result.setFullYear(this.getYear(result) - 1900);
            }
            return result;
        };
        /**
         * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
         * other browsers do not. We remove them to make output consistent and because they interfere with
         * date parsing.
         */
        /**
         * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
         * other browsers do not. We remove them to make output consistent and because they interfere with
         * date parsing.
         * @private
         * @param {?} str
         * @return {?}
         */
        NativeDateTimeAdapter.prototype.stripDirectionalityCharacters = /**
         * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
         * other browsers do not. We remove them to make output consistent and because they interfere with
         * date parsing.
         * @private
         * @param {?} str
         * @return {?}
         */
        function (str) {
            return str.replace(/[\u200e\u200f]/g, '');
        };
        /**
         * When converting Date object to string, javascript built-in functions may return wrong
         * results because it applies its internal DST rules. The DST rules around the world change
         * very frequently, and the current valid rule is not always valid in previous years though.
         * We work around this problem building a new Date object which has its internal UTC
         * representation with the local date and time.
         */
        /**
         * When converting Date object to string, javascript built-in functions may return wrong
         * results because it applies its internal DST rules. The DST rules around the world change
         * very frequently, and the current valid rule is not always valid in previous years though.
         * We work around this problem building a new Date object which has its internal UTC
         * representation with the local date and time.
         * @private
         * @param {?} dtf
         * @param {?} date
         * @return {?}
         */
        NativeDateTimeAdapter.prototype._format = /**
         * When converting Date object to string, javascript built-in functions may return wrong
         * results because it applies its internal DST rules. The DST rules around the world change
         * very frequently, and the current valid rule is not always valid in previous years though.
         * We work around this problem building a new Date object which has its internal UTC
         * representation with the local date and time.
         * @private
         * @param {?} dtf
         * @param {?} date
         * @return {?}
         */
        function (dtf, date) {
            /** @type {?} */
            var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
            return dtf.format(d);
        };
        NativeDateTimeAdapter.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NativeDateTimeAdapter.ctorParameters = function () { return [
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [OWL_DATE_TIME_LOCALE,] }] },
            { type: platform.Platform }
        ]; };
        return NativeDateTimeAdapter;
    }(DateTimeAdapter));
    if (false) {
        /**
         * Whether to clamp the date between 1 and 9999 to avoid IE and Edge errors.
         * @type {?}
         * @private
         */
        NativeDateTimeAdapter.prototype._clampDate;
        /**
         * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
         * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
         * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
         * will produce `'8/13/1800'`.
         * @type {?}
         */
        NativeDateTimeAdapter.prototype.useUtcForDisplay;
        /**
         * @type {?}
         * @private
         */
        NativeDateTimeAdapter.prototype.owlDateTimeLocale;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var OWL_NATIVE_DATE_TIME_FORMATS = {
        parseInput: null,
        fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
        datePickerInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        timePickerInput: { hour: 'numeric', minute: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NativeDateTimeModule = /** @class */ (function () {
        function NativeDateTimeModule() {
        }
        NativeDateTimeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [platform.PlatformModule],
                        providers: [
                            { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter },
                        ],
                    },] }
        ];
        return NativeDateTimeModule;
    }());
    var ɵ0$1 = OWL_NATIVE_DATE_TIME_FORMATS;
    var OwlNativeDateTimeModule = /** @class */ (function () {
        function OwlNativeDateTimeModule() {
        }
        OwlNativeDateTimeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [NativeDateTimeModule],
                        providers: [{ provide: OWL_DATE_TIME_FORMATS, useValue: ɵ0$1 }],
                    },] }
        ];
        return OwlNativeDateTimeModule;
    }());

    exports.DateTimeAdapter = DateTimeAdapter;
    exports.OWL_DATE_TIME_FORMATS = OWL_DATE_TIME_FORMATS;
    exports.OWL_DATE_TIME_LOCALE = OWL_DATE_TIME_LOCALE;
    exports.OWL_DATE_TIME_LOCALE_PROVIDER = OWL_DATE_TIME_LOCALE_PROVIDER;
    exports.OwlDateTimeComponent = OwlDateTimeComponent;
    exports.OwlDateTimeInlineComponent = OwlDateTimeInlineComponent;
    exports.OwlDateTimeIntl = OwlDateTimeIntl;
    exports.OwlDateTimeModule = OwlDateTimeModule;
    exports.OwlNativeDateTimeModule = OwlNativeDateTimeModule;
    exports.ɵa = NativeDateTimeModule;
    exports.ɵb = OWL_DATE_TIME_LOCALE_FACTORY;
    exports.ɵba = OwlMonthViewComponent;
    exports.ɵbb = OwlTimerBoxComponent;
    exports.ɵbc = NumberFixedLenPipe;
    exports.ɵbd = NativeDateTimeAdapter;
    exports.ɵbe = OWL_NATIVE_DATE_TIME_FORMATS;
    exports.ɵc = OWL_DATETIME_VALUE_ACCESSOR$1;
    exports.ɵd = OWL_DTPICKER_SCROLL_STRATEGY;
    exports.ɵe = OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY;
    exports.ɵf = OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER;
    exports.ɵg = OwlDialogModule;
    exports.ɵh = OwlDialogContainerComponent;
    exports.ɵi = OWL_DIALOG_SCROLL_STRATEGY;
    exports.ɵj = OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY;
    exports.ɵk = OWL_DIALOG_SCROLL_STRATEGY_PROVIDER;
    exports.ɵl = OWL_DIALOG_DEFAULT_OPTIONS;
    exports.ɵm = OwlDialogService;
    exports.ɵn = OwlDialogConfig;
    exports.ɵo = OwlCalendarComponent;
    exports.ɵp = OwlTimerComponent;
    exports.ɵq = OwlDateTimeTriggerDirective;
    exports.ɵr = OWL_DATETIME_VALUE_ACCESSOR;
    exports.ɵs = OWL_DATETIME_VALIDATORS;
    exports.ɵt = OwlDateTimeInputDirective;
    exports.ɵu = OwlDateTime;
    exports.ɵv = OwlDateTimeContainerComponent;
    exports.ɵw = owlDateTimePickerAnimations;
    exports.ɵx = OwlMultiYearViewComponent;
    exports.ɵy = OwlCalendarBodyComponent;
    exports.ɵz = OwlYearViewComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng-pick-datetime.umd.js.map
