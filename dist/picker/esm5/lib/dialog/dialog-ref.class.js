/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ESCAPE } from '@angular/cdk/keycodes';
import { Subject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
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
        this._beforeClose$ = new Subject();
        this._afterOpen$ = new Subject();
        this._afterClosed$ = new Subject();
        /**
         * Subscription to changes in the user's location.
         */
        this.locationChanged = Subscription.EMPTY;
        /**
         * Whether the user is allowed to close the dialog.
         */
        this.disableClose = this.container.config.disableClose;
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'done' && event.toState === 'enter'; })), take(1))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this._afterOpen$.next();
            _this._afterOpen$.complete();
        }));
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'done' && event.toState === 'exit'; })), take(1))
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
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.keyCode === ESCAPE && !_this.disableClose; })))
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
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.phaseName === 'start'; })), take(1))
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
/**
 * @template T
 */
export { OwlDialogRef };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlZi5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGlhbG9nL2RpYWxvZy1yZWYuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU1BLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUcvQyxPQUFPLEVBQWMsT0FBTyxFQUFFLFlBQVksRUFBcUMsTUFBTSxNQUFNLENBQUM7QUFDNUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUU5Qzs7OztJQXFCSSxzQkFBcUIsVUFBc0IsRUFDdEIsU0FBc0MsRUFDOUIsRUFBVSxFQUMxQixRQUFtQjtRQUhoQyxpQkF1Q0M7UUF2Q29CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBNkI7UUFDOUIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQW5CL0Isa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBRW5DLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUVqQyxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7Ozs7UUFHbkMsb0JBQWUsR0FBa0IsWUFBWSxDQUFDLEtBQUssQ0FBQzs7OztRQVFyRCxpQkFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQU9yRCxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQjthQUMvQixJQUFJLENBQ0QsTUFBTTs7OztRQUFDLFVBQUUsS0FBcUIsSUFBTSxPQUFBLEtBQUssQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUF2RCxDQUF1RCxFQUFDLEVBQzVGLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDVjthQUNBLFNBQVM7OztRQUFDO1lBQ1AsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJ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SSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7OztJQUVNLGtDQUFXOzs7SUFBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0MsQ0FBQzs7OztJQUVNLGtDQUFXOzs7SUFBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELGlFQUFpRTs7Ozs7O0lBQ3pELDBDQUFtQjs7Ozs7SUFBM0I7UUFDSSxPQUFPLG1CQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLEVBQTBCLENBQUM7SUFDbEYsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQXBKRCxJQW9KQzs7Ozs7Ozs7OztJQWxKRyw4QkFBb0I7Ozs7O0lBRXBCLHFDQUEyQzs7Ozs7SUFFM0MsbUNBQXlDOzs7OztJQUV6QyxxQ0FBMkM7Ozs7OztJQUczQyx1Q0FBNEQ7Ozs7OztJQUs1RCx5Q0FBNEI7Ozs7O0lBRzVCLG9DQUF5RDs7Ozs7SUFFNUMsa0NBQThCOzs7OztJQUM5QixpQ0FBOEM7O0lBQzlDLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBkaWFsb2ctcmVmLmNsYXNzXHJcbiAqL1xyXG5pbXBvcnQgeyBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3ksIE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IEVTQ0FQRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XHJcbmltcG9ydCB7IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEaWFsb2dQb3NpdGlvbiB9IGZyb20gJy4vZGlhbG9nLWNvbmZpZy5jbGFzcyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiwgU3Vic2NyaXB0aW9uTGlrZSBhcyBJU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBPd2xEaWFsb2dSZWY8VD4ge1xyXG5cclxuICAgIHByaXZhdGUgcmVzdWx0OiBhbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfYmVmb3JlQ2xvc2UkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuICAgIHByaXZhdGUgX2FmdGVyT3BlbiQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWZ0ZXJDbG9zZWQkID0gbmV3IFN1YmplY3Q8YW55PigpO1xyXG5cclxuICAgIC8qKiBTdWJzY3JpcHRpb24gdG8gY2hhbmdlcyBpbiB0aGUgdXNlcidzIGxvY2F0aW9uLiAqL1xyXG4gICAgcHJpdmF0ZSBsb2NhdGlvbkNoYW5nZWQ6IElTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaW5zdGFuY2Ugb2YgY29tcG9uZW50IG9wZW5lZCBpbnRvIG1vZGFsXHJcbiAgICAgKiAqL1xyXG4gICAgcHVibGljIGNvbXBvbmVudEluc3RhbmNlOiBUO1xyXG5cclxuICAgIC8qKiBXaGV0aGVyIHRoZSB1c2VyIGlzIGFsbG93ZWQgdG8gY2xvc2UgdGhlIGRpYWxvZy4gKi9cclxuICAgIHB1YmxpYyBkaXNhYmxlQ2xvc2UgPSB0aGlzLmNvbnRhaW5lci5jb25maWcuZGlzYWJsZUNsb3NlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXHJcbiAgICAgICAgICAgICAgICAgcHJpdmF0ZSBjb250YWluZXI6IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCxcclxuICAgICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICBsb2NhdGlvbj86IExvY2F0aW9uICkge1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hbmltYXRpb25TdGF0ZUNoYW5nZWRcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKCBldmVudDogQW5pbWF0aW9uRXZlbnQgKSA9PiBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyAmJiBldmVudC50b1N0YXRlID09PSAnZW50ZXInKSxcclxuICAgICAgICAgICAgICAgIHRha2UoMSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FmdGVyT3BlbiQubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJPcGVuJC5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyKCggZXZlbnQ6IEFuaW1hdGlvbkV2ZW50ICkgPT4gZXZlbnQucGhhc2VOYW1lID09PSAnZG9uZScgJiYgZXZlbnQudG9TdGF0ZSA9PT0gJ2V4aXQnKSxcclxuICAgICAgICAgICAgICAgIHRha2UoMSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uQ2hhbmdlZC51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJDbG9zZWQkLm5leHQodGhpcy5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJDbG9zZWQkLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gbnVsbCE7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLm92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpXHJcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudC5rZXlDb2RlID09PSBFU0NBUEUgJiYgIXRoaXMuZGlzYWJsZUNsb3NlKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG5cclxuICAgICAgICBpZiAobG9jYXRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbkNoYW5nZWQgPSBsb2NhdGlvbi5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyLmNvbmZpZy5jbG9zZU9uTmF2aWdhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSggZGlhbG9nUmVzdWx0PzogYW55ICkge1xyXG4gICAgICAgIHRoaXMucmVzdWx0ID0gZGlhbG9nUmVzdWx0O1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hbmltYXRpb25TdGF0ZUNoYW5nZWRcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKCBldmVudDogQW5pbWF0aW9uRXZlbnQgKSA9PiBldmVudC5waGFzZU5hbWUgPT09ICdzdGFydCcpLFxyXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmVmb3JlQ2xvc2UkLm5leHQoZGlhbG9nUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JlZm9yZUNsb3NlJC5jb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaEJhY2tkcm9wKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdGFydEV4aXRBbmltYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHdoZW4gdGhlIG92ZXJsYXkncyBiYWNrZHJvcCBoYXMgYmVlbiBjbGlja2VkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYmFja2Ryb3BDbGljaygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYuYmFja2Ryb3BDbGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiBrZXlkb3duIGV2ZW50cyBhcmUgdGFyZ2V0ZWQgb24gdGhlIG92ZXJsYXkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBrZXlkb3duRXZlbnRzKCk6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZGlhbG9nJ3MgcG9zaXRpb24uXHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb24gTmV3IGRpYWxvZyBwb3NpdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHVwZGF0ZVBvc2l0aW9uKCBwb3NpdGlvbj86IERpYWxvZ1Bvc2l0aW9uICk6IHRoaXMge1xyXG4gICAgICAgIGxldCBzdHJhdGVneSA9IHRoaXMuZ2V0UG9zaXRpb25TdHJhdGVneSgpO1xyXG5cclxuICAgICAgICBpZiAocG9zaXRpb24gJiYgKHBvc2l0aW9uLmxlZnQgfHwgcG9zaXRpb24ucmlnaHQpKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uLmxlZnQgPyBzdHJhdGVneS5sZWZ0KHBvc2l0aW9uLmxlZnQpIDogc3RyYXRlZ3kucmlnaHQocG9zaXRpb24ucmlnaHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0cmF0ZWd5LmNlbnRlckhvcml6b250YWxseSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBvc2l0aW9uICYmIChwb3NpdGlvbi50b3AgfHwgcG9zaXRpb24uYm90dG9tKSkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbi50b3AgPyBzdHJhdGVneS50b3AocG9zaXRpb24udG9wKSA6IHN0cmF0ZWd5LmJvdHRvbShwb3NpdGlvbi5ib3R0b20pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0cmF0ZWd5LmNlbnRlclZlcnRpY2FsbHkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIGRpYWxvZydzIHdpZHRoIGFuZCBoZWlnaHQuXHJcbiAgICAgKiBAcGFyYW0gd2lkdGggTmV3IHdpZHRoIG9mIHRoZSBkaWFsb2cuXHJcbiAgICAgKiBAcGFyYW0gaGVpZ2h0IE5ldyBoZWlnaHQgb2YgdGhlIGRpYWxvZy5cclxuICAgICAqL1xyXG4gICAgdXBkYXRlU2l6ZSggd2lkdGg6IHN0cmluZyA9ICdhdXRvJywgaGVpZ2h0OiBzdHJpbmcgPSAnYXV0bycgKTogdGhpcyB7XHJcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvblN0cmF0ZWd5KCkud2lkdGgod2lkdGgpLmhlaWdodChoZWlnaHQpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0FuaW1hdGluZygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIuaXNBbmltYXRpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFmdGVyT3BlbigpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZnRlck9wZW4kLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBiZWZvcmVDbG9zZSgpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iZWZvcmVDbG9zZSQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFmdGVyQ2xvc2VkKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FmdGVyQ2xvc2VkJC5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogRmV0Y2hlcyB0aGUgcG9zaXRpb24gc3RyYXRlZ3kgb2JqZWN0IGZyb20gdGhlIG92ZXJsYXkgcmVmLiAqL1xyXG4gICAgcHJpdmF0ZSBnZXRQb3NpdGlvblN0cmF0ZWd5KCk6IEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3kge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkucG9zaXRpb25TdHJhdGVneSBhcyBHbG9iYWxQb3NpdGlvblN0cmF0ZWd5O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==