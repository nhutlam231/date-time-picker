/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NoopScrollStrategy } from '@angular/cdk/overlay';
/** @type {?} */
let uniqueId = 0;
/**
 * Possible overrides for a dialog's position.
 * @record
 */
export function DialogPosition() { }
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
export class OwlDialogConfig {
    constructor() {
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
        this.scrollStrategy = new NoopScrollStrategy();
        this.id = `owl-dialog-${uniqueId++}`;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbmZpZy5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGlhbG9nL2RpYWxvZy1jb25maWcuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUlBLE9BQU8sRUFBRSxrQkFBa0IsRUFBa0IsTUFBTSxzQkFBc0IsQ0FBQzs7SUFFdEUsUUFBUSxHQUFHLENBQUM7Ozs7O0FBR2hCLG9DQVlDOzs7Ozs7SUFWRyw2QkFBYTs7Ozs7SUFHYixnQ0FBZ0I7Ozs7O0lBR2hCLDhCQUFjOzs7OztJQUdkLCtCQUFlOztBQUduQixNQUFNLE9BQU8sZUFBZTtJQWdHeEI7Ozs7UUE1Rk8sb0JBQWUsR0FBbUIsSUFBSSxDQUFDOzs7O1FBS3ZDLGNBQVMsR0FBSSxJQUFJLENBQUM7Ozs7UUFHbEIsZ0JBQVcsR0FBSSxJQUFJLENBQUM7Ozs7UUFRcEIsU0FBSSxHQUFTLElBQUksQ0FBQzs7OztRQUdsQixpQkFBWSxHQUFJLEtBQUssQ0FBQzs7OztRQVV0QixTQUFJLEdBQThCLFFBQVEsQ0FBQzs7Ozs7UUFLM0MsY0FBUyxHQUF1QixFQUFFLENBQUM7Ozs7O1FBS25DLFVBQUssR0FBZ0IsSUFBSSxDQUFDOzs7OztRQUsxQixrQkFBYSxHQUF1QixFQUFFLENBQUM7Ozs7O1FBS3ZDLHNCQUFpQixHQUFhLElBQUksQ0FBQzs7OztRQUduQyxVQUFLLEdBQVksRUFBRSxDQUFDOzs7O1FBR3BCLFdBQU0sR0FBWSxFQUFFLENBQUM7Ozs7OztRQWtCckIsYUFBUSxHQUFxQixNQUFNLENBQUM7Ozs7OztRQWVwQyxtQkFBYyxHQUFvQixJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFLOUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxjQUFjLFFBQVEsRUFBRSxFQUFFLENBQUM7SUFDekMsQ0FBQztDQUNKOzs7Ozs7SUEvRkcsMENBQThDOzs7OztJQUs5QyxvQ0FBeUI7Ozs7O0lBR3pCLHNDQUEyQjs7Ozs7O0lBSzNCLHdDQUEyQjs7Ozs7SUFHM0IsK0JBQXlCOzs7OztJQUd6Qix1Q0FBNkI7Ozs7O0lBSzdCLDZCQUFtQjs7Ozs7SUFLbkIsK0JBQWtEOzs7Ozs7SUFLbEQsb0NBQTBDOzs7Ozs7SUFLMUMsZ0NBQWlDOzs7Ozs7SUFLakMsd0NBQThDOzs7Ozs7SUFLOUMsNENBQTBDOzs7OztJQUcxQyxnQ0FBMkI7Ozs7O0lBRzNCLGlDQUE0Qjs7Ozs7OztJQU01QixtQ0FBa0M7Ozs7Ozs7SUFNbEMsb0NBQW1DOzs7Ozs7O0lBTW5DLG1DQUEyQzs7Ozs7OztJQU0zQyxvQ0FBbUM7Ozs7O0lBR25DLG1DQUFpQzs7Ozs7OztJQU1qQyx5Q0FBa0U7O0lBRWxFLDJDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBkaWFsb2ctY29uZmlnLmNsYXNzXHJcbiAqL1xyXG5pbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5vb3BTY3JvbGxTdHJhdGVneSwgU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcblxyXG5sZXQgdW5pcXVlSWQgPSAwO1xyXG5cclxuLyoqIFBvc3NpYmxlIG92ZXJyaWRlcyBmb3IgYSBkaWFsb2cncyBwb3NpdGlvbi4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBEaWFsb2dQb3NpdGlvbiB7XHJcbiAgICAvKiogT3ZlcnJpZGUgZm9yIHRoZSBkaWFsb2cncyB0b3AgcG9zaXRpb24uICovXHJcbiAgICB0b3A/OiBzdHJpbmc7XHJcblxyXG4gICAgLyoqIE92ZXJyaWRlIGZvciB0aGUgZGlhbG9nJ3MgYm90dG9tIHBvc2l0aW9uLiAqL1xyXG4gICAgYm90dG9tPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBPdmVycmlkZSBmb3IgdGhlIGRpYWxvZydzIGxlZnQgcG9zaXRpb24uICovXHJcbiAgICBsZWZ0Pzogc3RyaW5nO1xyXG5cclxuICAgIC8qKiBPdmVycmlkZSBmb3IgdGhlIGRpYWxvZydzIHJpZ2h0IHBvc2l0aW9uLiAqL1xyXG4gICAgcmlnaHQ/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPd2xEaWFsb2dDb25maWcge1xyXG4gICAgLyoqXHJcbiAgICAgKiBJRCBvZiB0aGUgZWxlbWVudCB0aGF0IGRlc2NyaWJlcyB0aGUgZGlhbG9nLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXJpYURlc2NyaWJlZEJ5Pzogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRvIGZvY3VzIHRoZSBkaWFsb2cgd2hlbiB0aGUgZGlhbG9nIGlzIG9wZW5lZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXV0b0ZvY3VzPyA9IHRydWU7XHJcblxyXG4gICAgLyoqIFdoZXRoZXIgdGhlIGRpYWxvZyBoYXMgYSBiYWNrZHJvcC4gKi9cclxuICAgIHB1YmxpYyBoYXNCYWNrZHJvcD8gPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3VzdG9tIHN0eWxlIGZvciB0aGUgYmFja2Ryb3BcclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgYmFja2Ryb3BTdHlsZT86IGFueTtcclxuXHJcbiAgICAvKiogRGF0YSBiZWluZyBpbmplY3RlZCBpbnRvIHRoZSBjaGlsZCBjb21wb25lbnQuICovXHJcbiAgICBwdWJsaWMgZGF0YT86IGFueSA9IG51bGw7XHJcblxyXG4gICAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgY2FuIHVzZSBlc2NhcGUgb3IgY2xpY2tpbmcgb3V0c2lkZSB0byBjbG9zZSBhIG1vZGFsLiAqL1xyXG4gICAgcHVibGljIGRpc2FibGVDbG9zZT8gPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIElEIGZvciB0aGUgbW9kYWwuIElmIG9taXR0ZWQsIGEgdW5pcXVlIG9uZSB3aWxsIGJlIGdlbmVyYXRlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGlkPzogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIEFSSUEgcm9sZSBvZiB0aGUgZGlhbG9nIGVsZW1lbnQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByb2xlPzogJ2RpYWxvZycgfCAnYWxlcnRkaWFsb2cnID0gJ2RpYWxvZyc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDdXN0b20gY2xhc3MgZm9yIHRoZSBwYW5lXHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIHBhbmVDbGFzcz86IHN0cmluZyB8IHN0cmluZ1tdID0gJyc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3VzZSBFdmVudFxyXG4gICAgICogKi9cclxuICAgIHB1YmxpYyBldmVudD86IE1vdXNlRXZlbnQgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3VzdG9tIGNsYXNzIGZvciB0aGUgYmFja2Ryb3BcclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgYmFja2Ryb3BDbGFzcz86IHN0cmluZyB8IHN0cmluZ1tdID0gJyc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRoZSBkaWFsb2cgc2hvdWxkIGNsb3NlIHdoZW4gdGhlIHVzZXIgZ29lcyBiYWNrd2FyZHMvZm9yd2FyZHMgaW4gaGlzdG9yeS5cclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgY2xvc2VPbk5hdmlnYXRpb24/OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvKiogV2lkdGggb2YgdGhlIGRpYWxvZy4gKi9cclxuICAgIHB1YmxpYyB3aWR0aD86IHN0cmluZyA9ICcnO1xyXG5cclxuICAgIC8qKiBIZWlnaHQgb2YgdGhlIGRpYWxvZy4gKi9cclxuICAgIHB1YmxpYyBoZWlnaHQ/OiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtaW4td2lkdGggb2YgdGhlIG92ZXJsYXkgcGFuZWwuXHJcbiAgICAgKiBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgcGl4ZWwgdW5pdHMgYXJlIGFzc3VtZWQuXHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIG1pbldpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1pbi1oZWlnaHQgb2YgdGhlIG92ZXJsYXkgcGFuZWwuXHJcbiAgICAgKiBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgcGl4ZWwgdW5pdHMgYXJlIGFzc3VtZWQuXHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIG1pbkhlaWdodD86IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtYXgtd2lkdGggb2YgdGhlIG92ZXJsYXkgcGFuZWwuXHJcbiAgICAgKiBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgcGl4ZWwgdW5pdHMgYXJlIGFzc3VtZWQuXHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIG1heFdpZHRoPzogbnVtYmVyIHwgc3RyaW5nID0gJzg1dncnO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1heC1oZWlnaHQgb2YgdGhlIG92ZXJsYXkgcGFuZWwuXHJcbiAgICAgKiBJZiBhIG51bWJlciBpcyBwcm92aWRlZCwgcGl4ZWwgdW5pdHMgYXJlIGFzc3VtZWQuXHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIG1heEhlaWdodD86IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgICAvKiogUG9zaXRpb24gb3ZlcnJpZGVzLiAqL1xyXG4gICAgcHVibGljIHBvc2l0aW9uPzogRGlhbG9nUG9zaXRpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2Nyb2xsIHN0cmF0ZWd5IHdoZW4gdGhlIGRpYWxvZyBpcyBvcGVuXHJcbiAgICAgKiBMZWFybiBtb3JlIHRoaXMgZnJvbSBodHRwczovL21hdGVyaWFsLmFuZ3VsYXIuaW8vY2RrL292ZXJsYXkvb3ZlcnZpZXcjc2Nyb2xsLXN0cmF0ZWdpZXNcclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgc2Nyb2xsU3RyYXRlZ3k/OiBTY3JvbGxTdHJhdGVneSA9IG5ldyBOb29wU2Nyb2xsU3RyYXRlZ3koKTtcclxuXHJcbiAgICBwdWJsaWMgdmlld0NvbnRhaW5lclJlZj86IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGBvd2wtZGlhbG9nLSR7dW5pcXVlSWQrK31gO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==