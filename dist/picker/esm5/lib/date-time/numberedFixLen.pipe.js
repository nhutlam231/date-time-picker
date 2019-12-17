/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * numberFixedLen.pipe
 */
import { Pipe } from '@angular/core';
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
        { type: Pipe, args: [{
                    name: 'numberFixedLen'
                },] }
    ];
    return NumberFixedLenPipe;
}());
export { NumberFixedLenPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyZWRGaXhMZW4ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL251bWJlcmVkRml4TGVuLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBEO0lBQUE7SUFvQkEsQ0FBQzs7Ozs7O0lBaEJHLHNDQUFTOzs7OztJQUFULFVBQVcsR0FBVyxFQUFFLEdBQVc7O1lBQ3pCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7WUFDeEIsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBRTlCLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hELE9BQU8sR0FBRyxDQUFDO1NBQ2Q7O1lBRUcsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFFakMsT0FBTyxTQUFTLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtZQUM5QixTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQztTQUMvQjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7O2dCQW5CSixJQUFJLFNBQUM7b0JBQ0YsSUFBSSxFQUFFLGdCQUFnQjtpQkFDekI7O0lBa0JELHlCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FqQlksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIG51bWJlckZpeGVkTGVuLnBpcGVcclxuICovXHJcblxyXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnbnVtYmVyRml4ZWRMZW4nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOdW1iZXJGaXhlZExlblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIHRyYW5zZm9ybSggbnVtOiBudW1iZXIsIGxlbjogbnVtYmVyICk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihudW0pO1xyXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IE1hdGguZmxvb3IobGVuKTtcclxuXHJcbiAgICAgICAgaWYgKG51bSA9PT0gbnVsbCB8fCBpc05hTihudW1iZXIpIHx8IGlzTmFOKGxlbmd0aCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBudW1TdHJpbmcgPSBudW1iZXIudG9TdHJpbmcoKTtcclxuXHJcbiAgICAgICAgd2hpbGUgKG51bVN0cmluZy5sZW5ndGggPCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgbnVtU3RyaW5nID0gJzAnICsgbnVtU3RyaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bVN0cmluZztcclxuICAgIH1cclxufVxyXG4iXX0=