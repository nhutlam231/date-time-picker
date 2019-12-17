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
export class OwlDialogRef {
    /**
     * @param {?} overlayRef
     * @param {?} container
     * @param {?} id
     * @param {?=} location
     */
    constructor(overlayRef, container, id, location) {
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
        (event) => event.phaseName === 'done' && event.toState === 'enter')), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._afterOpen$.next();
            this._afterOpen$.complete();
        }));
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => event.phaseName === 'done' && event.toState === 'exit')), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.overlayRef.dispose();
            this.locationChanged.unsubscribe();
            this._afterClosed$.next(this.result);
            this._afterClosed$.complete();
            this.componentInstance = (/** @type {?} */ (null));
        }));
        this.overlayRef.keydownEvents()
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.keyCode === ESCAPE && !this.disableClose)))
            .subscribe((/**
         * @return {?}
         */
        () => this.close()));
        if (location) {
            this.locationChanged = location.subscribe((/**
             * @return {?}
             */
            () => {
                if (this.container.config.closeOnNavigation) {
                    this.close();
                }
            }));
        }
    }
    /**
     * @param {?=} dialogResult
     * @return {?}
     */
    close(dialogResult) {
        this.result = dialogResult;
        this.container.animationStateChanged
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        (event) => event.phaseName === 'start')), take(1))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this._beforeClose$.next(dialogResult);
            this._beforeClose$.complete();
            this.overlayRef.detachBackdrop();
        }));
        this.container.startExitAnimation();
    }
    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     * @return {?}
     */
    backdropClick() {
        return this.overlayRef.backdropClick();
    }
    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     * @return {?}
     */
    keydownEvents() {
        return this.overlayRef.keydownEvents();
    }
    /**
     * Updates the dialog's position.
     * @template THIS
     * @this {THIS}
     * @param {?=} position New dialog position.
     * @return {THIS}
     */
    updatePosition(position) {
        /** @type {?} */
        let strategy = (/** @type {?} */ (this)).getPositionStrategy();
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
    }
    /**
     * Updates the dialog's width and height.
     * @template THIS
     * @this {THIS}
     * @param {?=} width New width of the dialog.
     * @param {?=} height New height of the dialog.
     * @return {THIS}
     */
    updateSize(width = 'auto', height = 'auto') {
        (/** @type {?} */ (this)).getPositionStrategy().width(width).height(height);
        (/** @type {?} */ (this)).overlayRef.updatePosition();
        return (/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    isAnimating() {
        return this.container.isAnimating;
    }
    /**
     * @return {?}
     */
    afterOpen() {
        return this._afterOpen$.asObservable();
    }
    /**
     * @return {?}
     */
    beforeClose() {
        return this._beforeClose$.asObservable();
    }
    /**
     * @return {?}
     */
    afterClosed() {
        return this._afterClosed$.asObservable();
    }
    /**
     * Fetches the position strategy object from the overlay ref.
     * @private
     * @return {?}
     */
    getPositionStrategy() {
        return (/** @type {?} */ (this.overlayRef.getConfig().positionStrategy));
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXJlZi5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGlhbG9nL2RpYWxvZy1yZWYuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU1BLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUcvQyxPQUFPLEVBQWMsT0FBTyxFQUFFLFlBQVksRUFBcUMsTUFBTSxNQUFNLENBQUM7QUFDNUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUU5QyxNQUFNLE9BQU8sWUFBWTs7Ozs7OztJQXFCckIsWUFBcUIsVUFBc0IsRUFDdEIsU0FBc0MsRUFDOUIsRUFBVSxFQUMxQixRQUFtQjtRQUhYLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBNkI7UUFDOUIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQW5CL0Isa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBRW5DLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUVqQyxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7Ozs7UUFHbkMsb0JBQWUsR0FBa0IsWUFBWSxDQUFDLEtBQUssQ0FBQzs7OztRQVFyRCxpQkFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztRQU9yRCxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQjthQUMvQixJQUFJLENBQ0QsTUFBTTs7OztRQUFDLENBQUUsS0FBcUIsRUFBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUMsRUFDNUYsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNWO2FBQ0EsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLFdBQVcs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Q0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM3QyxDQUFDOzs7Ozs7SUFHTyxtQkFBbUI7UUFDdkIsT0FBTyxtQkFBQSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUEwQixDQUFDO0lBQ2xGLENBQUM7Q0FDSjs7Ozs7O0lBbEpHLDhCQUFvQjs7Ozs7SUFFcEIscUNBQTJDOzs7OztJQUUzQyxtQ0FBeUM7Ozs7O0lBRXpDLHFDQUEyQzs7Ozs7O0lBRzNDLHVDQUE0RDs7Ozs7O0lBSzVELHlDQUE0Qjs7Ozs7SUFHNUIsb0NBQXlEOzs7OztJQUU1QyxrQ0FBOEI7Ozs7O0lBQzlCLGlDQUE4Qzs7SUFDOUMsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGRpYWxvZy1yZWYuY2xhc3NcclxuICovXHJcbmltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgR2xvYmFsUG9zaXRpb25TdHJhdGVneSwgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcclxuaW1wb3J0IHsgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERpYWxvZ1Bvc2l0aW9uIH0gZnJvbSAnLi9kaWFsb2ctY29uZmlnLmNsYXNzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBTdWJzY3JpcHRpb25MaWtlIGFzIElTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE93bERpYWxvZ1JlZjxUPiB7XHJcblxyXG4gICAgcHJpdmF0ZSByZXN1bHQ6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIF9iZWZvcmVDbG9zZSQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWZ0ZXJPcGVuJCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9hZnRlckNsb3NlZCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblxyXG4gICAgLyoqIFN1YnNjcmlwdGlvbiB0byBjaGFuZ2VzIGluIHRoZSB1c2VyJ3MgbG9jYXRpb24uICovXHJcbiAgICBwcml2YXRlIGxvY2F0aW9uQ2hhbmdlZDogSVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpbnN0YW5jZSBvZiBjb21wb25lbnQgb3BlbmVkIGludG8gbW9kYWxcclxuICAgICAqICovXHJcbiAgICBwdWJsaWMgY29tcG9uZW50SW5zdGFuY2U6IFQ7XHJcblxyXG4gICAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgaXMgYWxsb3dlZCB0byBjbG9zZSB0aGUgZGlhbG9nLiAqL1xyXG4gICAgcHVibGljIGRpc2FibGVDbG9zZSA9IHRoaXMuY29udGFpbmVyLmNvbmZpZy5kaXNhYmxlQ2xvc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcclxuICAgICAgICAgICAgICAgICBwcml2YXRlIGNvbnRhaW5lcjogT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgIGxvY2F0aW9uPzogTG9jYXRpb24gKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFuaW1hdGlvblN0YXRlQ2hhbmdlZFxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIGZpbHRlcigoIGV2ZW50OiBBbmltYXRpb25FdmVudCApID0+IGV2ZW50LnBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIGV2ZW50LnRvU3RhdGUgPT09ICdlbnRlcicpLFxyXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJPcGVuJC5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlck9wZW4kLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hbmltYXRpb25TdGF0ZUNoYW5nZWRcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIoKCBldmVudDogQW5pbWF0aW9uRXZlbnQgKSA9PiBldmVudC5waGFzZU5hbWUgPT09ICdkb25lJyAmJiBldmVudC50b1N0YXRlID09PSAnZXhpdCcpLFxyXG4gICAgICAgICAgICAgICAgdGFrZSgxKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb25DaGFuZ2VkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlckNsb3NlZCQubmV4dCh0aGlzLnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlckNsb3NlZCQuY29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50SW5zdGFuY2UgPSBudWxsITtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKClcclxuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSAmJiAhdGhpcy5kaXNhYmxlQ2xvc2UpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XHJcblxyXG4gICAgICAgIGlmIChsb2NhdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uQ2hhbmdlZCA9IGxvY2F0aW9uLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb250YWluZXIuY29uZmlnLmNsb3NlT25OYXZpZ2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlKCBkaWFsb2dSZXN1bHQ/OiBhbnkgKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHQgPSBkaWFsb2dSZXN1bHQ7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFuaW1hdGlvblN0YXRlQ2hhbmdlZFxyXG4gICAgICAgICAgICAucGlwZShcclxuICAgICAgICAgICAgICAgIGZpbHRlcigoIGV2ZW50OiBBbmltYXRpb25FdmVudCApID0+IGV2ZW50LnBoYXNlTmFtZSA9PT0gJ3N0YXJ0JyksXHJcbiAgICAgICAgICAgICAgICB0YWtlKDEpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWZvcmVDbG9zZSQubmV4dChkaWFsb2dSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmVmb3JlQ2xvc2UkLmNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoQmFja2Ryb3AoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0YXJ0RXhpdEFuaW1hdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgZW1pdHMgd2hlbiB0aGUgb3ZlcmxheSdzIGJhY2tkcm9wIGhhcyBiZWVuIGNsaWNrZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBiYWNrZHJvcENsaWNrKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXRzIGFuIG9ic2VydmFibGUgdGhhdCBlbWl0cyB3aGVuIGtleWRvd24gZXZlbnRzIGFyZSB0YXJnZXRlZCBvbiB0aGUgb3ZlcmxheS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGtleWRvd25FdmVudHMoKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBkaWFsb2cncyBwb3NpdGlvbi5cclxuICAgICAqIEBwYXJhbSBwb3NpdGlvbiBOZXcgZGlhbG9nIHBvc2l0aW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlUG9zaXRpb24oIHBvc2l0aW9uPzogRGlhbG9nUG9zaXRpb24gKTogdGhpcyB7XHJcbiAgICAgICAgbGV0IHN0cmF0ZWd5ID0gdGhpcy5nZXRQb3NpdGlvblN0cmF0ZWd5KCk7XHJcblxyXG4gICAgICAgIGlmIChwb3NpdGlvbiAmJiAocG9zaXRpb24ubGVmdCB8fCBwb3NpdGlvbi5yaWdodCkpIHtcclxuICAgICAgICAgICAgcG9zaXRpb24ubGVmdCA/IHN0cmF0ZWd5LmxlZnQocG9zaXRpb24ubGVmdCkgOiBzdHJhdGVneS5yaWdodChwb3NpdGlvbi5yaWdodCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RyYXRlZ3kuY2VudGVySG9yaXpvbnRhbGx5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocG9zaXRpb24gJiYgKHBvc2l0aW9uLnRvcCB8fCBwb3NpdGlvbi5ib3R0b20pKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uLnRvcCA/IHN0cmF0ZWd5LnRvcChwb3NpdGlvbi50b3ApIDogc3RyYXRlZ3kuYm90dG9tKHBvc2l0aW9uLmJvdHRvbSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RyYXRlZ3kuY2VudGVyVmVydGljYWxseSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgZGlhbG9nJ3Mgd2lkdGggYW5kIGhlaWdodC5cclxuICAgICAqIEBwYXJhbSB3aWR0aCBOZXcgd2lkdGggb2YgdGhlIGRpYWxvZy5cclxuICAgICAqIEBwYXJhbSBoZWlnaHQgTmV3IGhlaWdodCBvZiB0aGUgZGlhbG9nLlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVTaXplKCB3aWR0aDogc3RyaW5nID0gJ2F1dG8nLCBoZWlnaHQ6IHN0cmluZyA9ICdhdXRvJyApOiB0aGlzIHtcclxuICAgICAgICB0aGlzLmdldFBvc2l0aW9uU3RyYXRlZ3koKS53aWR0aCh3aWR0aCkuaGVpZ2h0KGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzQW5pbWF0aW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5pc0FuaW1hdGluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWZ0ZXJPcGVuKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FmdGVyT3BlbiQuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJlZm9yZUNsb3NlKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JlZm9yZUNsb3NlJC5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWZ0ZXJDbG9zZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWZ0ZXJDbG9zZWQkLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBGZXRjaGVzIHRoZSBwb3NpdGlvbiBzdHJhdGVneSBvYmplY3QgZnJvbSB0aGUgb3ZlcmxheSByZWYuICovXHJcbiAgICBwcml2YXRlIGdldFBvc2l0aW9uU3RyYXRlZ3koKTogR2xvYmFsUG9zaXRpb25TdHJhdGVneSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5IGFzIEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3k7XHJcbiAgICB9XHJcbn1cclxuIl19