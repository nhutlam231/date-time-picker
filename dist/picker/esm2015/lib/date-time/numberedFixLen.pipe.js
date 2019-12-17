/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * numberFixedLen.pipe
 */
import { Pipe } from '@angular/core';
export class NumberFixedLenPipe {
    /**
     * @param {?} num
     * @param {?} len
     * @return {?}
     */
    transform(num, len) {
        /** @type {?} */
        const number = Math.floor(num);
        /** @type {?} */
        const length = Math.floor(len);
        if (num === null || isNaN(number) || isNaN(length)) {
            return num;
        }
        /** @type {?} */
        let numString = number.toString();
        while (numString.length < length) {
            numString = '0' + numString;
        }
        return numString;
    }
}
NumberFixedLenPipe.decorators = [
    { type: Pipe, args: [{
                name: 'numberFixedLen'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyZWRGaXhMZW4ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL251bWJlcmVkRml4TGVuLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBS3BELE1BQU0sT0FBTyxrQkFBa0I7Ozs7OztJQUMzQixTQUFTLENBQUUsR0FBVyxFQUFFLEdBQVc7O2NBQ3pCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7Y0FDeEIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRTlCLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hELE9BQU8sR0FBRyxDQUFDO1NBQ2Q7O1lBRUcsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFFakMsT0FBTyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtZQUM5QixTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQztTQUMvQjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7OztZQW5CSixJQUFJLFNBQUM7Z0JBQ0YsSUFBSSxFQUFFLGdCQUFnQjthQUN6QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBudW1iZXJGaXhlZExlbi5waXBlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQFBpcGUoe1xyXG4gICAgbmFtZTogJ251bWJlckZpeGVkTGVuJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTnVtYmVyRml4ZWRMZW5QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgICB0cmFuc2Zvcm0oIG51bTogbnVtYmVyLCBsZW46IG51bWJlciApOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IobnVtKTtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSBNYXRoLmZsb29yKGxlbik7XHJcblxyXG4gICAgICAgIGlmIChudW0gPT09IG51bGwgfHwgaXNOYU4obnVtYmVyKSB8fCBpc05hTihsZW5ndGgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbnVtU3RyaW5nID0gbnVtYmVyLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIHdoaWxlIChudW1TdHJpbmcubGVuZ3RoIDwgbGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIG51bVN0cmluZyA9ICcwJyArIG51bVN0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudW1TdHJpbmc7XHJcbiAgICB9XHJcbn1cclxuIl19