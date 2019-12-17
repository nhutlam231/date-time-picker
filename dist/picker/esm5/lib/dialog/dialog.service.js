/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * dialog.service
 */
import { Inject, Injectable, InjectionToken, Injector, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { OwlDialogConfig } from './dialog-config.class';
import { OwlDialogRef } from './dialog-ref.class';
import { OwlDialogContainerComponent } from './dialog-container.component';
import { extendObject } from '../utils';
import { defer, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Overlay, OverlayConfig, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
/** @type {?} */
export var OWL_DIALOG_DATA = new InjectionToken('OwlDialogData');
/**
 * Injection token that determines the scroll handling while the dialog is open.
 *
 * @type {?}
 */
export var OWL_DIALOG_SCROLL_STRATEGY = new InjectionToken('owl-dialog-scroll-strategy');
/**
 * @param {?} overlay
 * @return {?}
 */
export function OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
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
export var OWL_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: OWL_DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY
};
/**
 * I
 * njection token that can be used to specify default dialog options.
 *
 * @type {?}
 */
export var OWL_DIALOG_DEFAULT_OPTIONS = new InjectionToken('owl-dialog-default-options');
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
        this._afterOpenAtThisLevel = new Subject();
        this._afterAllClosedAtThisLevel = new Subject();
        /**
         * Stream that emits when all open dialog have finished closing.
         * Will emit on subscribe if there are no open dialogs to begin with.
         */
        this.afterAllClosed = defer((/**
         * @return {?}
         */
        function () {
            return _this._openDialogsAtThisLevel.length
                ? _this._afterAllClosed
                : _this._afterAllClosed.pipe(startWith(undefined));
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
        if (componentOrTemplateRef instanceof TemplateRef) {
        }
        else {
            /** @type {?} */
            var injector = this.createInjector(config, dialogRef, dialogContainer);
            /** @type {?} */
            var contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
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
        return new PortalInjector(userInjector || this.injector, injectionTokens);
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
        var containerPortal = new ComponentPortal(OwlDialogContainerComponent, config.viewContainerRef);
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
        var state = new OverlayConfig({
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
        { type: Injectable }
    ];
    /** @nocollapse */
    OwlDialogService.ctorParameters = function () { return [
        { type: Overlay },
        { type: Injector },
        { type: Location, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Inject, args: [OWL_DIALOG_SCROLL_STRATEGY,] }] },
        { type: OwlDialogConfig, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DIALOG_DEFAULT_OPTIONS,] }] },
        { type: OwlDialogService, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: OverlayContainer }
    ]; };
    return OwlDialogService;
}());
export { OwlDialogService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RpYWxvZy9kaWFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUVILE1BQU0sRUFDTixVQUFVLEVBQ1YsY0FBYyxFQUNkLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQ0gsT0FBTyxFQUNQLGFBQWEsRUFDYixnQkFBZ0IsRUFHbkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQ0gsZUFBZSxFQUVmLGNBQWMsRUFDakIsTUFBTSxxQkFBcUIsQ0FBQzs7QUFFN0IsTUFBTSxLQUFPLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBTSxlQUFlLENBQUM7Ozs7OztBQUt2RSxNQUFNLEtBQU8sMEJBQTBCLEdBQUcsSUFBSSxjQUFjLENBRTFELDRCQUE0QixDQUFDOzs7OztBQUUvQixNQUFNLFVBQVUsMkNBQTJDLENBQ3ZELE9BQWdCOztRQUVWLEVBQUU7OztJQUFHLGNBQU0sT0FBQSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEVBQWhDLENB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QywwQ0FFdUM7Ozs7O0lBQ3ZDLHdDQUVzQzs7Ozs7SUFDdEMsNENBQTBDOzs7Ozs7OztBQStObEQsU0FBUyxtQkFBbUIsQ0FDeEIsTUFBd0IsRUFDeEIsY0FBZ0M7SUFFaEMsT0FBTyxZQUFZLENBQUMsSUFBSSxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDdkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBkaWFsb2cuc2VydmljZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnRSZWYsXHJcbiAgICBJbmplY3QsXHJcbiAgICBJbmplY3RhYmxlLFxyXG4gICAgSW5qZWN0aW9uVG9rZW4sXHJcbiAgICBJbmplY3RvcixcclxuICAgIE9wdGlvbmFsLFxyXG4gICAgU2tpcFNlbGYsXHJcbiAgICBUZW1wbGF0ZVJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE93bERpYWxvZ0NvbmZpZyB9IGZyb20gJy4vZGlhbG9nLWNvbmZpZy5jbGFzcyc7XHJcbmltcG9ydCB7IE93bERpYWxvZ1JlZiB9IGZyb20gJy4vZGlhbG9nLXJlZi5jbGFzcyc7XHJcbmltcG9ydCB7IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBleHRlbmRPYmplY3QgfSBmcm9tICcuLi91dGlscyc7XHJcbmltcG9ydCB7IGRlZmVyLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHtcclxuICAgIE92ZXJsYXksXHJcbiAgICBPdmVybGF5Q29uZmlnLFxyXG4gICAgT3ZlcmxheUNvbnRhaW5lcixcclxuICAgIE92ZXJsYXlSZWYsXHJcbiAgICBTY3JvbGxTdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudFBvcnRhbCxcclxuICAgIENvbXBvbmVudFR5cGUsXHJcbiAgICBQb3J0YWxJbmplY3RvclxyXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xyXG5cclxuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfREFUQSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxhbnk+KCdPd2xEaWFsb2dEYXRhJyk7XHJcblxyXG4vKipcclxuICogSW5qZWN0aW9uIHRva2VuIHRoYXQgZGV0ZXJtaW5lcyB0aGUgc2Nyb2xsIGhhbmRsaW5nIHdoaWxlIHRoZSBkaWFsb2cgaXMgb3Blbi5cclxuICogKi9cclxuZXhwb3J0IGNvbnN0IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZID0gbmV3IEluamVjdGlvblRva2VuPFxyXG4gICAgKCkgPT4gU2Nyb2xsU3RyYXRlZ3lcclxuPignb3dsLWRpYWxvZy1zY3JvbGwtc3RyYXRlZ3knKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUl9GQUNUT1JZKFxyXG4gICAgb3ZlcmxheTogT3ZlcmxheVxyXG4pOiAoKSA9PiBTY3JvbGxTdHJhdGVneSB7XHJcbiAgICBjb25zdCBmbiA9ICgpID0+IG92ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ibG9jaygpO1xyXG4gICAgcmV0dXJuIGZuO1xyXG59XHJcblxyXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xyXG5leHBvcnQgY29uc3QgT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVIgPSB7XHJcbiAgICBwcm92aWRlOiBPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWSxcclxuICAgIGRlcHM6IFtPdmVybGF5XSxcclxuICAgIHVzZUZhY3Rvcnk6IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSX0ZBQ1RPUllcclxufTtcclxuXHJcbi8qKiBJXHJcbiAqIG5qZWN0aW9uIHRva2VuIHRoYXQgY2FuIGJlIHVzZWQgdG8gc3BlY2lmeSBkZWZhdWx0IGRpYWxvZyBvcHRpb25zLlxyXG4gKiAqL1xyXG5leHBvcnQgY29uc3QgT1dMX0RJQUxPR19ERUZBVUxUX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48T3dsRGlhbG9nQ29uZmlnPihcclxuICAgICdvd2wtZGlhbG9nLWRlZmF1bHQtb3B0aW9ucydcclxuKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE93bERpYWxvZ1NlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBhcmlhSGlkZGVuRWxlbWVudHMgPSBuZXcgTWFwPEVsZW1lbnQsIHN0cmluZyB8IG51bGw+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBfb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbDogT3dsRGlhbG9nUmVmPGFueT5bXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfYWZ0ZXJPcGVuQXRUaGlzTGV2ZWwgPSBuZXcgU3ViamVjdDxPd2xEaWFsb2dSZWY8YW55Pj4oKTtcclxuICAgIHByaXZhdGUgX2FmdGVyQWxsQ2xvc2VkQXRUaGlzTGV2ZWwgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICAgIC8qKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudGx5LW9wZW4gZGlhbG9ncy4gKi9cclxuICAgIGdldCBvcGVuRGlhbG9ncygpOiBPd2xEaWFsb2dSZWY8YW55PltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnREaWFsb2dcclxuICAgICAgICAgICAgPyB0aGlzLnBhcmVudERpYWxvZy5vcGVuRGlhbG9nc1xyXG4gICAgICAgICAgICA6IHRoaXMuX29wZW5EaWFsb2dzQXRUaGlzTGV2ZWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gYSBkaWFsb2cgaGFzIGJlZW4gb3BlbmVkLiAqL1xyXG4gICAgZ2V0IGFmdGVyT3BlbigpOiBTdWJqZWN0PE93bERpYWxvZ1JlZjxhbnk+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50RGlhbG9nXHJcbiAgICAgICAgICAgID8gdGhpcy5wYXJlbnREaWFsb2cuYWZ0ZXJPcGVuXHJcbiAgICAgICAgICAgIDogdGhpcy5fYWZ0ZXJPcGVuQXRUaGlzTGV2ZWw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IF9hZnRlckFsbENsb3NlZCgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMucGFyZW50RGlhbG9nO1xyXG4gICAgICAgIHJldHVybiBwYXJlbnRcclxuICAgICAgICAgICAgPyBwYXJlbnQuX2FmdGVyQWxsQ2xvc2VkXHJcbiAgICAgICAgICAgIDogdGhpcy5fYWZ0ZXJBbGxDbG9zZWRBdFRoaXNMZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gYWxsIG9wZW4gZGlhbG9nIGhhdmUgZmluaXNoZWQgY2xvc2luZy5cclxuICAgICAqIFdpbGwgZW1pdCBvbiBzdWJzY3JpYmUgaWYgdGhlcmUgYXJlIG5vIG9wZW4gZGlhbG9ncyB0byBiZWdpbiB3aXRoLlxyXG4gICAgICovXHJcblxyXG4gICAgYWZ0ZXJBbGxDbG9zZWQ6IE9ic2VydmFibGU8e30+ID0gZGVmZXIoXHJcbiAgICAgICAgKCkgPT5cclxuICAgICAgICAgICAgdGhpcy5fb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbC5sZW5ndGhcclxuICAgICAgICAgICAgICAgID8gdGhpcy5fYWZ0ZXJBbGxDbG9zZWRcclxuICAgICAgICAgICAgICAgIDogdGhpcy5fYWZ0ZXJBbGxDbG9zZWQucGlwZShzdGFydFdpdGgodW5kZWZpbmVkKSlcclxuICAgICk7XHJcblxyXG4gICAgcHJpdmF0ZSBzY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5OiBPdmVybGF5LFxyXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLFxyXG4gICAgICAgIEBJbmplY3QoT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1kpIHNjcm9sbFN0cmF0ZWd5OiBhbnksXHJcbiAgICAgICAgQE9wdGlvbmFsKClcclxuICAgICAgICBASW5qZWN0KE9XTF9ESUFMT0dfREVGQVVMVF9PUFRJT05TKVxyXG4gICAgICAgIHByaXZhdGUgZGVmYXVsdE9wdGlvbnM6IE93bERpYWxvZ0NvbmZpZyxcclxuICAgICAgICBAT3B0aW9uYWwoKVxyXG4gICAgICAgIEBTa2lwU2VsZigpXHJcbiAgICAgICAgcHJpdmF0ZSBwYXJlbnREaWFsb2c6IE93bERpYWxvZ1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBvdmVybGF5Q29udGFpbmVyOiBPdmVybGF5Q29udGFpbmVyXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLnNjcm9sbFN0cmF0ZWd5ID0gc2Nyb2xsU3RyYXRlZ3k7XHJcbiAgICAgICAgaWYgKCFwYXJlbnREaWFsb2cgJiYgbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgbG9jYXRpb24uc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2VBbGwoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuPFQ+KFxyXG4gICAgICAgIGNvbXBvbmVudE9yVGVtcGxhdGVSZWY6IENvbXBvbmVudFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPixcclxuICAgICAgICBjb25maWc/OiBPd2xEaWFsb2dDb25maWdcclxuICAgICk6IE93bERpYWxvZ1JlZjxhbnk+IHtcclxuICAgICAgICBjb25maWcgPSBhcHBseUNvbmZpZ0RlZmF1bHRzKGNvbmZpZywgdGhpcy5kZWZhdWx0T3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmIChjb25maWcuaWQgJiYgdGhpcy5nZXREaWFsb2dCeUlkKGNvbmZpZy5pZCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgRGlhbG9nIHdpdGggaWQgXCIke1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5pZFxyXG4gICAgICAgICAgICAgICAgfVwiIGV4aXN0cyBhbHJlYWR5LiBUaGUgZGlhbG9nIGlkIG11c3QgYmUgdW5pcXVlLmBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLmNyZWF0ZU92ZXJsYXkoY29uZmlnKTtcclxuICAgICAgICBjb25zdCBkaWFsb2dDb250YWluZXIgPSB0aGlzLmF0dGFjaERpYWxvZ0NvbnRhaW5lcihvdmVybGF5UmVmLCBjb25maWcpO1xyXG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IHRoaXMuYXR0YWNoRGlhbG9nQ29udGVudDxUPihcclxuICAgICAgICAgICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZixcclxuICAgICAgICAgICAgZGlhbG9nQ29udGFpbmVyLFxyXG4gICAgICAgICAgICBvdmVybGF5UmVmLFxyXG4gICAgICAgICAgICBjb25maWdcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMub3BlbkRpYWxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZU5vbkRpYWxvZ0NvbnRlbnRGcm9tQXNzaXN0aXZlVGVjaG5vbG9neSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9ncy5wdXNoKGRpYWxvZ1JlZik7XHJcbiAgICAgICAgZGlhbG9nUmVmXHJcbiAgICAgICAgICAgIC5hZnRlckNsb3NlZCgpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW1vdmVPcGVuRGlhbG9nKGRpYWxvZ1JlZikpO1xyXG4gICAgICAgIHRoaXMuYWZ0ZXJPcGVuLm5leHQoZGlhbG9nUmVmKTtcclxuICAgICAgICByZXR1cm4gZGlhbG9nUmVmO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc2VzIGFsbCBvZiB0aGUgY3VycmVudGx5LW9wZW4gZGlhbG9ncy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb3NlQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBpID0gdGhpcy5vcGVuRGlhbG9ncy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuRGlhbG9nc1tpXS5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmRzIGFuIG9wZW4gZGlhbG9nIGJ5IGl0cyBpZC5cclxuICAgICAqIEBwYXJhbSBpZCBJRCB0byB1c2Ugd2hlbiBsb29raW5nIHVwIHRoZSBkaWFsb2cuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREaWFsb2dCeUlkKGlkOiBzdHJpbmcpOiBPd2xEaWFsb2dSZWY8YW55PiB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbkRpYWxvZ3MuZmluZChkaWFsb2cgPT4gZGlhbG9nLmlkID09PSBpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdHRhY2hEaWFsb2dDb250ZW50PFQ+KFxyXG4gICAgICAgIGNvbXBvbmVudE9yVGVtcGxhdGVSZWY6IENvbXBvbmVudFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPixcclxuICAgICAgICBkaWFsb2dDb250YWluZXI6IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCxcclxuICAgICAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmLFxyXG4gICAgICAgIGNvbmZpZzogT3dsRGlhbG9nQ29uZmlnXHJcbiAgICApIHtcclxuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSBuZXcgT3dsRGlhbG9nUmVmPFQ+KFxyXG4gICAgICAgICAgICBvdmVybGF5UmVmLFxyXG4gICAgICAgICAgICBkaWFsb2dDb250YWluZXIsXHJcbiAgICAgICAgICAgIGNvbmZpZy5pZCxcclxuICAgICAgICAgICAgdGhpcy5sb2NhdGlvblxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChjb25maWcuaGFzQmFja2Ryb3ApIHtcclxuICAgICAgICAgICAgb3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZGlhbG9nUmVmLmRpc2FibGVDbG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ1JlZi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb21wb25lbnRPclRlbXBsYXRlUmVmIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBpbmplY3RvciA9IHRoaXMuY3JlYXRlSW5qZWN0b3I8VD4oXHJcbiAgICAgICAgICAgICAgICBjb25maWcsXHJcbiAgICAgICAgICAgICAgICBkaWFsb2dSZWYsXHJcbiAgICAgICAgICAgICAgICBkaWFsb2dDb250YWluZXJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgY29uc3QgY29udGVudFJlZiA9IGRpYWxvZ0NvbnRhaW5lci5hdHRhY2hDb21wb25lbnRQb3J0YWwoXHJcbiAgICAgICAgICAgICAgICBuZXcgQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsIHVuZGVmaW5lZCwgaW5qZWN0b3IpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZSA9IGNvbnRlbnRSZWYuaW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkaWFsb2dSZWZcclxuICAgICAgICAgICAgLnVwZGF0ZVNpemUoY29uZmlnLndpZHRoLCBjb25maWcuaGVpZ2h0KVxyXG4gICAgICAgICAgICAudXBkYXRlUG9zaXRpb24oY29uZmlnLnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZUluamVjdG9yPFQ+KFxyXG4gICAgICAgIGNvbmZpZzogT3dsRGlhbG9nQ29uZmlnLFxyXG4gICAgICAgIGRpYWxvZ1JlZjogT3dsRGlhbG9nUmVmPFQ+LFxyXG4gICAgICAgIGRpYWxvZ0NvbnRhaW5lcjogT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50XHJcbiAgICApIHtcclxuICAgICAgICBjb25zdCB1c2VySW5qZWN0b3IgPVxyXG4gICAgICAgICAgICBjb25maWcgJiZcclxuICAgICAgICAgICAgY29uZmlnLnZpZXdDb250YWluZXJSZWYgJiZcclxuICAgICAgICAgICAgY29uZmlnLnZpZXdDb250YWluZXJSZWYuaW5qZWN0b3I7XHJcbiAgICAgICAgY29uc3QgaW5qZWN0aW9uVG9rZW5zID0gbmV3IFdlYWtNYXAoKTtcclxuXHJcbiAgICAgICAgaW5qZWN0aW9uVG9rZW5zLnNldChPd2xEaWFsb2dSZWYsIGRpYWxvZ1JlZik7XHJcbiAgICAgICAgaW5qZWN0aW9uVG9rZW5zLnNldChPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQsIGRpYWxvZ0NvbnRhaW5lcik7XHJcbiAgICAgICAgaW5qZWN0aW9uVG9rZW5zLnNldChPV0xfRElBTE9HX0RBVEEsIGNvbmZpZy5kYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQb3J0YWxJbmplY3RvcihcclxuICAgICAgICAgICAgdXNlckluamVjdG9yIHx8IHRoaXMuaW5qZWN0b3IsXHJcbiAgICAgICAgICAgIGluamVjdGlvblRva2Vuc1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVPdmVybGF5KGNvbmZpZzogT3dsRGlhbG9nQ29uZmlnKTogT3ZlcmxheVJlZiB7XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IHRoaXMuZ2V0T3ZlcmxheUNvbmZpZyhjb25maWcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXR0YWNoRGlhbG9nQ29udGFpbmVyKFxyXG4gICAgICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXHJcbiAgICAgICAgY29uZmlnOiBPd2xEaWFsb2dDb25maWdcclxuICAgICk6IE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChcclxuICAgICAgICAgICAgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgICAgICAgICBjb25maWcudmlld0NvbnRhaW5lclJlZlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVmOiBDb21wb25lbnRSZWY8XHJcbiAgICAgICAgICAgIE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudFxyXG4gICAgICAgID4gPSBvdmVybGF5UmVmLmF0dGFjaChjb250YWluZXJQb3J0YWwpO1xyXG4gICAgICAgIGNvbnRhaW5lclJlZi5pbnN0YW5jZS5zZXRDb25maWcoY29uZmlnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lclJlZi5pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE92ZXJsYXlDb25maWcoZGlhbG9nQ29uZmlnOiBPd2xEaWFsb2dDb25maWcpOiBPdmVybGF5Q29uZmlnIHtcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IG5ldyBPdmVybGF5Q29uZmlnKHtcclxuICAgICAgICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5vdmVybGF5LnBvc2l0aW9uKCkuZ2xvYmFsKCksXHJcbiAgICAgICAgICAgIHNjcm9sbFN0cmF0ZWd5OlxyXG4gICAgICAgICAgICAgICAgZGlhbG9nQ29uZmlnLnNjcm9sbFN0cmF0ZWd5IHx8IHRoaXMuc2Nyb2xsU3RyYXRlZ3koKSxcclxuICAgICAgICAgICAgcGFuZWxDbGFzczogZGlhbG9nQ29uZmlnLnBhbmVDbGFzcyxcclxuICAgICAgICAgICAgaGFzQmFja2Ryb3A6IGRpYWxvZ0NvbmZpZy5oYXNCYWNrZHJvcCxcclxuICAgICAgICAgICAgbWluV2lkdGg6IGRpYWxvZ0NvbmZpZy5taW5XaWR0aCxcclxuICAgICAgICAgICAgbWluSGVpZ2h0OiBkaWFsb2dDb25maWcubWluSGVpZ2h0LFxyXG4gICAgICAgICAgICBtYXhXaWR0aDogZGlhbG9nQ29uZmlnLm1heFdpZHRoLFxyXG4gICAgICAgICAgICBtYXhIZWlnaHQ6IGRpYWxvZ0NvbmZpZy5tYXhIZWlnaHRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGRpYWxvZ0NvbmZpZy5iYWNrZHJvcENsYXNzKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLmJhY2tkcm9wQ2xhc3MgPSBkaWFsb2dDb25maWcuYmFja2Ryb3BDbGFzcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZU9wZW5EaWFsb2coZGlhbG9nUmVmOiBPd2xEaWFsb2dSZWY8YW55Pik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbC5pbmRleE9mKGRpYWxvZ1JlZik7XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkRpYWxvZ3Muc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgLy8gSWYgYWxsIHRoZSBkaWFsb2dzIHdlcmUgY2xvc2VkLCByZW1vdmUvcmVzdG9yZSB0aGUgYGFyaWEtaGlkZGVuYFxyXG4gICAgICAgICAgICAvLyB0byBhIHRoZSBzaWJsaW5ncyBhbmQgZW1pdCB0byB0aGUgYGFmdGVyQWxsQ2xvc2VkYCBzdHJlYW0uXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5vcGVuRGlhbG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJpYUhpZGRlbkVsZW1lbnRzLmZvckVhY2goKHByZXZpb3VzVmFsdWUsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBwcmV2aW91c1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFyaWFIaWRkZW5FbGVtZW50cy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWZ0ZXJBbGxDbG9zZWQubmV4dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGlkZXMgYWxsIG9mIHRoZSBjb250ZW50IHRoYXQgaXNuJ3QgYW4gb3ZlcmxheSBmcm9tIGFzc2lzdGl2ZSB0ZWNobm9sb2d5LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhpZGVOb25EaWFsb2dDb250ZW50RnJvbUFzc2lzdGl2ZVRlY2hub2xvZ3koKSB7XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheUNvbnRhaW5lciA9IHRoaXMub3ZlcmxheUNvbnRhaW5lci5nZXRDb250YWluZXJFbGVtZW50KCk7XHJcblxyXG4gICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBvdmVybGF5IGNvbnRhaW5lciBpcyBhdHRhY2hlZCB0byB0aGUgRE9NLlxyXG4gICAgICAgIGlmIChvdmVybGF5Q29udGFpbmVyLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2libGluZ3MgPSBvdmVybGF5Q29udGFpbmVyLnBhcmVudEVsZW1lbnQuY2hpbGRyZW47XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gc2libGluZ3MubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBzaWJsaW5nID0gc2libGluZ3NbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgICAgIHNpYmxpbmcgIT09IG92ZXJsYXlDb250YWluZXIgJiZcclxuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nLm5vZGVOYW1lICE9PSAnU0NSSVBUJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHNpYmxpbmcubm9kZU5hbWUgIT09ICdTVFlMRScgJiZcclxuICAgICAgICAgICAgICAgICAgICAhc2libGluZy5oYXNBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScpXHJcbiAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFyaWFIaWRkZW5FbGVtZW50cy5zZXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmcuZ2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICBzaWJsaW5nLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQXBwbGllcyBkZWZhdWx0IG9wdGlvbnMgdG8gdGhlIGRpYWxvZyBjb25maWcuXHJcbiAqIEBwYXJhbSBjb25maWcgQ29uZmlnIHRvIGJlIG1vZGlmaWVkLlxyXG4gKiBAcGFyYW0gZGVmYXVsdE9wdGlvbnMgRGVmYXVsdCBjb25maWcgc2V0dGluZ1xyXG4gKiBAcmV0dXJucyBUaGUgbmV3IGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxyXG4gKi9cclxuZnVuY3Rpb24gYXBwbHlDb25maWdEZWZhdWx0cyhcclxuICAgIGNvbmZpZz86IE93bERpYWxvZ0NvbmZpZyxcclxuICAgIGRlZmF1bHRPcHRpb25zPzogT3dsRGlhbG9nQ29uZmlnXHJcbik6IE93bERpYWxvZ0NvbmZpZyB7XHJcbiAgICByZXR1cm4gZXh0ZW5kT2JqZWN0KG5ldyBPd2xEaWFsb2dDb25maWcoKSwgY29uZmlnLCBkZWZhdWx0T3B0aW9ucyk7XHJcbn1cclxuIl19