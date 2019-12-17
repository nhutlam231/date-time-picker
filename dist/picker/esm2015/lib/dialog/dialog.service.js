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
export const OWL_DIALOG_DATA = new InjectionToken('OwlDialogData');
/**
 * Injection token that determines the scroll handling while the dialog is open.
 *
 * @type {?}
 */
export const OWL_DIALOG_SCROLL_STRATEGY = new InjectionToken('owl-dialog-scroll-strategy');
/**
 * @param {?} overlay
 * @return {?}
 */
export function OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    /** @type {?} */
    const fn = (/**
     * @return {?}
     */
    () => overlay.scrollStrategies.block());
    return fn;
}
/**
 * \@docs-private
 * @type {?}
 */
export const OWL_DIALOG_SCROLL_STRATEGY_PROVIDER = {
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
export const OWL_DIALOG_DEFAULT_OPTIONS = new InjectionToken('owl-dialog-default-options');
export class OwlDialogService {
    /**
     * @param {?} overlay
     * @param {?} injector
     * @param {?} location
     * @param {?} scrollStrategy
     * @param {?} defaultOptions
     * @param {?} parentDialog
     * @param {?} overlayContainer
     */
    constructor(overlay, injector, location, scrollStrategy, defaultOptions, parentDialog, overlayContainer) {
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
        () => this._openDialogsAtThisLevel.length
            ? this._afterAllClosed
            : this._afterAllClosed.pipe(startWith(undefined))));
        this.scrollStrategy = scrollStrategy;
        if (!parentDialog && location) {
            location.subscribe((/**
             * @return {?}
             */
            () => this.closeAll()));
        }
    }
    /**
     * Keeps track of the currently-open dialogs.
     * @return {?}
     */
    get openDialogs() {
        return this.parentDialog
            ? this.parentDialog.openDialogs
            : this._openDialogsAtThisLevel;
    }
    /**
     * Stream that emits when a dialog has been opened.
     * @return {?}
     */
    get afterOpen() {
        return this.parentDialog
            ? this.parentDialog.afterOpen
            : this._afterOpenAtThisLevel;
    }
    /**
     * @return {?}
     */
    get _afterAllClosed() {
        /** @type {?} */
        const parent = this.parentDialog;
        return parent
            ? parent._afterAllClosed
            : this._afterAllClosedAtThisLevel;
    }
    /**
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?=} config
     * @return {?}
     */
    open(componentOrTemplateRef, config) {
        config = applyConfigDefaults(config, this.defaultOptions);
        if (config.id && this.getDialogById(config.id)) {
            throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
        }
        /** @type {?} */
        const overlayRef = this.createOverlay(config);
        /** @type {?} */
        const dialogContainer = this.attachDialogContainer(overlayRef, config);
        /** @type {?} */
        const dialogRef = this.attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);
        if (!this.openDialogs.length) {
            this.hideNonDialogContentFromAssistiveTechnology();
        }
        this.openDialogs.push(dialogRef);
        dialogRef
            .afterClosed()
            .subscribe((/**
         * @return {?}
         */
        () => this.removeOpenDialog(dialogRef)));
        this.afterOpen.next(dialogRef);
        return dialogRef;
    }
    /**
     * Closes all of the currently-open dialogs.
     * @return {?}
     */
    closeAll() {
        /** @type {?} */
        let i = this.openDialogs.length;
        while (i--) {
            this.openDialogs[i].close();
        }
    }
    /**
     * Finds an open dialog by its id.
     * @param {?} id ID to use when looking up the dialog.
     * @return {?}
     */
    getDialogById(id) {
        return this.openDialogs.find((/**
         * @param {?} dialog
         * @return {?}
         */
        dialog => dialog.id === id));
    }
    /**
     * @private
     * @template T
     * @param {?} componentOrTemplateRef
     * @param {?} dialogContainer
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config) {
        /** @type {?} */
        const dialogRef = new OwlDialogRef(overlayRef, dialogContainer, config.id, this.location);
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe((/**
             * @return {?}
             */
            () => {
                if (!dialogRef.disableClose) {
                    dialogRef.close();
                }
            }));
        }
        if (componentOrTemplateRef instanceof TemplateRef) {
        }
        else {
            /** @type {?} */
            const injector = this.createInjector(config, dialogRef, dialogContainer);
            /** @type {?} */
            const contentRef = dialogContainer.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
            dialogRef.componentInstance = contentRef.instance;
        }
        dialogRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);
        return dialogRef;
    }
    /**
     * @private
     * @template T
     * @param {?} config
     * @param {?} dialogRef
     * @param {?} dialogContainer
     * @return {?}
     */
    createInjector(config, dialogRef, dialogContainer) {
        /** @type {?} */
        const userInjector = config &&
            config.viewContainerRef &&
            config.viewContainerRef.injector;
        /** @type {?} */
        const injectionTokens = new WeakMap();
        injectionTokens.set(OwlDialogRef, dialogRef);
        injectionTokens.set(OwlDialogContainerComponent, dialogContainer);
        injectionTokens.set(OWL_DIALOG_DATA, config.data);
        return new PortalInjector(userInjector || this.injector, injectionTokens);
    }
    /**
     * @private
     * @param {?} config
     * @return {?}
     */
    createOverlay(config) {
        /** @type {?} */
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }
    /**
     * @private
     * @param {?} overlayRef
     * @param {?} config
     * @return {?}
     */
    attachDialogContainer(overlayRef, config) {
        /** @type {?} */
        const containerPortal = new ComponentPortal(OwlDialogContainerComponent, config.viewContainerRef);
        /** @type {?} */
        const containerRef = overlayRef.attach(containerPortal);
        containerRef.instance.setConfig(config);
        return containerRef.instance;
    }
    /**
     * @private
     * @param {?} dialogConfig
     * @return {?}
     */
    getOverlayConfig(dialogConfig) {
        /** @type {?} */
        const state = new OverlayConfig({
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
    }
    /**
     * @private
     * @param {?} dialogRef
     * @return {?}
     */
    removeOpenDialog(dialogRef) {
        /** @type {?} */
        const index = this._openDialogsAtThisLevel.indexOf(dialogRef);
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
                (previousValue, element) => {
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
    }
    /**
     * Hides all of the content that isn't an overlay from assistive technology.
     * @private
     * @return {?}
     */
    hideNonDialogContentFromAssistiveTechnology() {
        /** @type {?} */
        const overlayContainer = this.overlayContainer.getContainerElement();
        // Ensure that the overlay container is attached to the DOM.
        if (overlayContainer.parentElement) {
            /** @type {?} */
            const siblings = overlayContainer.parentElement.children;
            for (let i = siblings.length - 1; i > -1; i--) {
                /** @type {?} */
                let sibling = siblings[i];
                if (sibling !== overlayContainer &&
                    sibling.nodeName !== 'SCRIPT' &&
                    sibling.nodeName !== 'STYLE' &&
                    !sibling.hasAttribute('aria-live')) {
                    this.ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
                    sibling.setAttribute('aria-hidden', 'true');
                }
            }
        }
    }
}
OwlDialogService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OwlDialogService.ctorParameters = () => [
    { type: Overlay },
    { type: Injector },
    { type: Location, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Inject, args: [OWL_DIALOG_SCROLL_STRATEGY,] }] },
    { type: OwlDialogConfig, decorators: [{ type: Optional }, { type: Inject, args: [OWL_DIALOG_DEFAULT_OPTIONS,] }] },
    { type: OwlDialogService, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: OverlayContainer }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RpYWxvZy9kaWFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUVILE1BQU0sRUFDTixVQUFVLEVBQ1YsY0FBYyxFQUNkLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQ0gsT0FBTyxFQUNQLGFBQWEsRUFDYixnQkFBZ0IsRUFHbkIsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQ0gsZUFBZSxFQUVmLGNBQWMsRUFDakIsTUFBTSxxQkFBcUIsQ0FBQzs7QUFFN0IsTUFBTSxPQUFPLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBTSxlQUFlLENBQUM7Ozs7OztBQUt2RSxNQUFNLE9BQU8sMEJBQTBCLEdBQUcsSUFBSSxjQUFjLENBRTFELDRCQUE0QixDQUFDOzs7OztBQUUvQixNQUFNLFVBQVUsMkNBQTJDLENBQ3ZELE9BQWdCOztVQUVWLEVBQUU7OztJQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FB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QUFPLENBQUMsUUFBUSxLQUFLLFFBQVE7b0JBQzdCLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTztvQkFDNUIsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUNwQztvQkFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUN2QixPQUFPLEVBQ1AsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FDdEMsQ0FBQztvQkFDRixPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDL0M7YUFDSjtTQUNKO0lBQ0wsQ0FBQzs7O1lBNVFKLFVBQVU7Ozs7WUExQ1AsT0FBTztZQWJQLFFBQVE7WUFLSCxRQUFRLHVCQWdHUixRQUFROzRDQUNSLE1BQU0sU0FBQywwQkFBMEI7WUFoR2pDLGVBQWUsdUJBaUdmLFFBQVEsWUFDUixNQUFNLFNBQUMsMEJBQTBCO1lBSVosZ0JBQWdCLHVCQUZyQyxRQUFRLFlBQ1IsUUFBUTtZQTVGYixnQkFBZ0I7Ozs7Ozs7SUEwQ2hCLDhDQUErRDs7Ozs7SUFFL0QsbURBQTBEOzs7OztJQUMxRCxpREFBaUU7Ozs7O0lBQ2pFLHNEQUF5RDs7Ozs7O0lBNEJ6RCwwQ0FLRTs7Ozs7SUFFRiwwQ0FBNkM7Ozs7O0lBR3pDLG1DQUF3Qjs7Ozs7SUFDeEIsb0NBQTBCOzs7OztJQUMxQixvQ0FBc0M7Ozs7O0lBRXRDLDBDQUV1Qzs7Ozs7SUFDdkMsd0NBRXNDOzs7OztJQUN0Qyw0Q0FBMEM7Ozs7Ozs7O0FBK05sRCxTQUFTLG1CQUFtQixDQUN4QixNQUF3QixFQUN4QixjQUFnQztJQUVoQyxPQUFPLFlBQVksQ0FBQyxJQUFJLGVBQWUsRUFBRSxFQUFFLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztBQUN2RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGRpYWxvZy5zZXJ2aWNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudFJlZixcclxuICAgIEluamVjdCxcclxuICAgIEluamVjdGFibGUsXHJcbiAgICBJbmplY3Rpb25Ub2tlbixcclxuICAgIEluamVjdG9yLFxyXG4gICAgT3B0aW9uYWwsXHJcbiAgICBTa2lwU2VsZixcclxuICAgIFRlbXBsYXRlUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgT3dsRGlhbG9nQ29uZmlnIH0gZnJvbSAnLi9kaWFsb2ctY29uZmlnLmNsYXNzJztcclxuaW1wb3J0IHsgT3dsRGlhbG9nUmVmIH0gZnJvbSAnLi9kaWFsb2ctcmVmLmNsYXNzJztcclxuaW1wb3J0IHsgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9kaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IGV4dGVuZE9iamVjdCB9IGZyb20gJy4uL3V0aWxzJztcclxuaW1wb3J0IHsgZGVmZXIsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQge1xyXG4gICAgT3ZlcmxheSxcclxuICAgIE92ZXJsYXlDb25maWcsXHJcbiAgICBPdmVybGF5Q29udGFpbmVyLFxyXG4gICAgT3ZlcmxheVJlZixcclxuICAgIFNjcm9sbFN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xyXG5pbXBvcnQge1xyXG4gICAgQ29tcG9uZW50UG9ydGFsLFxyXG4gICAgQ29tcG9uZW50VHlwZSxcclxuICAgIFBvcnRhbEluamVjdG9yXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcblxyXG5leHBvcnQgY29uc3QgT1dMX0RJQUxPR19EQVRBID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ093bERpYWxvZ0RhdGEnKTtcclxuXHJcbi8qKlxyXG4gKiBJbmplY3Rpb24gdG9rZW4gdGhhdCBkZXRlcm1pbmVzIHRoZSBzY3JvbGwgaGFuZGxpbmcgd2hpbGUgdGhlIGRpYWxvZyBpcyBvcGVuLlxyXG4gKiAqL1xyXG5leHBvcnQgY29uc3QgT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1kgPSBuZXcgSW5qZWN0aW9uVG9rZW48XHJcbiAgICAoKSA9PiBTY3JvbGxTdHJhdGVneVxyXG4+KCdvd2wtZGlhbG9nLXNjcm9sbC1zdHJhdGVneScpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSX0ZBQ1RPUlkoXHJcbiAgICBvdmVybGF5OiBPdmVybGF5XHJcbik6ICgpID0+IFNjcm9sbFN0cmF0ZWd5IHtcclxuICAgIGNvbnN0IGZuID0gKCkgPT4gb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLmJsb2NrKCk7XHJcbiAgICByZXR1cm4gZm47XHJcbn1cclxuXHJcbi8qKiBAZG9jcy1wcml2YXRlICovXHJcbmV4cG9ydCBjb25zdCBPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUiA9IHtcclxuICAgIHByb3ZpZGU6IE9XTF9ESUFMT0dfU0NST0xMX1NUUkFURUdZLFxyXG4gICAgZGVwczogW092ZXJsYXldLFxyXG4gICAgdXNlRmFjdG9yeTogT1dMX0RJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJfRkFDVE9SWVxyXG59O1xyXG5cclxuLyoqIElcclxuICogbmplY3Rpb24gdG9rZW4gdGhhdCBjYW4gYmUgdXNlZCB0byBzcGVjaWZ5IGRlZmF1bHQgZGlhbG9nIG9wdGlvbnMuXHJcbiAqICovXHJcbmV4cG9ydCBjb25zdCBPV0xfRElBTE9HX0RFRkFVTFRfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxPd2xEaWFsb2dDb25maWc+KFxyXG4gICAgJ293bC1kaWFsb2ctZGVmYXVsdC1vcHRpb25zJ1xyXG4pO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgT3dsRGlhbG9nU2VydmljZSB7XHJcbiAgICBwcml2YXRlIGFyaWFIaWRkZW5FbGVtZW50cyA9IG5ldyBNYXA8RWxlbWVudCwgc3RyaW5nIHwgbnVsbD4oKTtcclxuXHJcbiAgICBwcml2YXRlIF9vcGVuRGlhbG9nc0F0VGhpc0xldmVsOiBPd2xEaWFsb2dSZWY8YW55PltdID0gW107XHJcbiAgICBwcml2YXRlIF9hZnRlck9wZW5BdFRoaXNMZXZlbCA9IG5ldyBTdWJqZWN0PE93bERpYWxvZ1JlZjxhbnk+PigpO1xyXG4gICAgcHJpdmF0ZSBfYWZ0ZXJBbGxDbG9zZWRBdFRoaXNMZXZlbCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gICAgLyoqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50bHktb3BlbiBkaWFsb2dzLiAqL1xyXG4gICAgZ2V0IG9wZW5EaWFsb2dzKCk6IE93bERpYWxvZ1JlZjxhbnk+W10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudERpYWxvZ1xyXG4gICAgICAgICAgICA/IHRoaXMucGFyZW50RGlhbG9nLm9wZW5EaWFsb2dzXHJcbiAgICAgICAgICAgIDogdGhpcy5fb3BlbkRpYWxvZ3NBdFRoaXNMZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhIGRpYWxvZyBoYXMgYmVlbiBvcGVuZWQuICovXHJcbiAgICBnZXQgYWZ0ZXJPcGVuKCk6IFN1YmplY3Q8T3dsRGlhbG9nUmVmPGFueT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnREaWFsb2dcclxuICAgICAgICAgICAgPyB0aGlzLnBhcmVudERpYWxvZy5hZnRlck9wZW5cclxuICAgICAgICAgICAgOiB0aGlzLl9hZnRlck9wZW5BdFRoaXNMZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgX2FmdGVyQWxsQ2xvc2VkKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnREaWFsb2c7XHJcbiAgICAgICAgcmV0dXJuIHBhcmVudFxyXG4gICAgICAgICAgICA/IHBhcmVudC5fYWZ0ZXJBbGxDbG9zZWRcclxuICAgICAgICAgICAgOiB0aGlzLl9hZnRlckFsbENsb3NlZEF0VGhpc0xldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhbGwgb3BlbiBkaWFsb2cgaGF2ZSBmaW5pc2hlZCBjbG9zaW5nLlxyXG4gICAgICogV2lsbCBlbWl0IG9uIHN1YnNjcmliZSBpZiB0aGVyZSBhcmUgbm8gb3BlbiBkaWFsb2dzIHRvIGJlZ2luIHdpdGguXHJcbiAgICAgKi9cclxuXHJcbiAgICBhZnRlckFsbENsb3NlZDogT2JzZXJ2YWJsZTx7fT4gPSBkZWZlcihcclxuICAgICAgICAoKSA9PlxyXG4gICAgICAgICAgICB0aGlzLl9vcGVuRGlhbG9nc0F0VGhpc0xldmVsLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9hZnRlckFsbENsb3NlZFxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLl9hZnRlckFsbENsb3NlZC5waXBlKHN0YXJ0V2l0aCh1bmRlZmluZWQpKVxyXG4gICAgKTtcclxuXHJcbiAgICBwcml2YXRlIHNjcm9sbFN0cmF0ZWd5OiAoKSA9PiBTY3JvbGxTdHJhdGVneTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXHJcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXHJcbiAgICAgICAgQEluamVjdChPV0xfRElBTE9HX1NDUk9MTF9TVFJBVEVHWSkgc2Nyb2xsU3RyYXRlZ3k6IGFueSxcclxuICAgICAgICBAT3B0aW9uYWwoKVxyXG4gICAgICAgIEBJbmplY3QoT1dMX0RJQUxPR19ERUZBVUxUX09QVElPTlMpXHJcbiAgICAgICAgcHJpdmF0ZSBkZWZhdWx0T3B0aW9uczogT3dsRGlhbG9nQ29uZmlnLFxyXG4gICAgICAgIEBPcHRpb25hbCgpXHJcbiAgICAgICAgQFNraXBTZWxmKClcclxuICAgICAgICBwcml2YXRlIHBhcmVudERpYWxvZzogT3dsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIG92ZXJsYXlDb250YWluZXI6IE92ZXJsYXlDb250YWluZXJcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsU3RyYXRlZ3kgPSBzY3JvbGxTdHJhdGVneTtcclxuICAgICAgICBpZiAoIXBhcmVudERpYWxvZyAmJiBsb2NhdGlvbikge1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZUFsbCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW48VD4oXHJcbiAgICAgICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LFxyXG4gICAgICAgIGNvbmZpZz86IE93bERpYWxvZ0NvbmZpZ1xyXG4gICAgKTogT3dsRGlhbG9nUmVmPGFueT4ge1xyXG4gICAgICAgIGNvbmZpZyA9IGFwcGx5Q29uZmlnRGVmYXVsdHMoY29uZmlnLCB0aGlzLmRlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5pZCAmJiB0aGlzLmdldERpYWxvZ0J5SWQoY29uZmlnLmlkKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcclxuICAgICAgICAgICAgICAgIGBEaWFsb2cgd2l0aCBpZCBcIiR7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmlkXHJcbiAgICAgICAgICAgICAgICB9XCIgZXhpc3RzIGFscmVhZHkuIFRoZSBkaWFsb2cgaWQgbXVzdCBiZSB1bmlxdWUuYFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuY3JlYXRlT3ZlcmxheShjb25maWcpO1xyXG4gICAgICAgIGNvbnN0IGRpYWxvZ0NvbnRhaW5lciA9IHRoaXMuYXR0YWNoRGlhbG9nQ29udGFpbmVyKG92ZXJsYXlSZWYsIGNvbmZpZyk7XHJcbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5hdHRhY2hEaWFsb2dDb250ZW50PFQ+KFxyXG4gICAgICAgICAgICBjb21wb25lbnRPclRlbXBsYXRlUmVmLFxyXG4gICAgICAgICAgICBkaWFsb2dDb250YWluZXIsXHJcbiAgICAgICAgICAgIG92ZXJsYXlSZWYsXHJcbiAgICAgICAgICAgIGNvbmZpZ1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5vcGVuRGlhbG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlTm9uRGlhbG9nQ29udGVudEZyb21Bc3Npc3RpdmVUZWNobm9sb2d5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9wZW5EaWFsb2dzLnB1c2goZGlhbG9nUmVmKTtcclxuICAgICAgICBkaWFsb2dSZWZcclxuICAgICAgICAgICAgLmFmdGVyQ2xvc2VkKClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbW92ZU9wZW5EaWFsb2coZGlhbG9nUmVmKSk7XHJcbiAgICAgICAgdGhpcy5hZnRlck9wZW4ubmV4dChkaWFsb2dSZWYpO1xyXG4gICAgICAgIHJldHVybiBkaWFsb2dSZWY7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zZXMgYWxsIG9mIHRoZSBjdXJyZW50bHktb3BlbiBkaWFsb2dzLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xvc2VBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGkgPSB0aGlzLm9wZW5EaWFsb2dzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5EaWFsb2dzW2ldLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgYW4gb3BlbiBkaWFsb2cgYnkgaXRzIGlkLlxyXG4gICAgICogQHBhcmFtIGlkIElEIHRvIHVzZSB3aGVuIGxvb2tpbmcgdXAgdGhlIGRpYWxvZy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERpYWxvZ0J5SWQoaWQ6IHN0cmluZyk6IE93bERpYWxvZ1JlZjxhbnk+IHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcGVuRGlhbG9ncy5maW5kKGRpYWxvZyA9PiBkaWFsb2cuaWQgPT09IGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGF0dGFjaERpYWxvZ0NvbnRlbnQ8VD4oXHJcbiAgICAgICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LFxyXG4gICAgICAgIGRpYWxvZ0NvbnRhaW5lcjogT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXHJcbiAgICAgICAgY29uZmlnOiBPd2xEaWFsb2dDb25maWdcclxuICAgICkge1xyXG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IG5ldyBPd2xEaWFsb2dSZWY8VD4oXHJcbiAgICAgICAgICAgIG92ZXJsYXlSZWYsXHJcbiAgICAgICAgICAgIGRpYWxvZ0NvbnRhaW5lcixcclxuICAgICAgICAgICAgY29uZmlnLmlkLFxyXG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9uXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5oYXNCYWNrZHJvcCkge1xyXG4gICAgICAgICAgICBvdmVybGF5UmVmLmJhY2tkcm9wQ2xpY2soKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkaWFsb2dSZWYuZGlzYWJsZUNsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9nUmVmLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvbXBvbmVudE9yVGVtcGxhdGVSZWYgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluamVjdG9yID0gdGhpcy5jcmVhdGVJbmplY3RvcjxUPihcclxuICAgICAgICAgICAgICAgIGNvbmZpZyxcclxuICAgICAgICAgICAgICAgIGRpYWxvZ1JlZixcclxuICAgICAgICAgICAgICAgIGRpYWxvZ0NvbnRhaW5lclxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50UmVmID0gZGlhbG9nQ29udGFpbmVyLmF0dGFjaENvbXBvbmVudFBvcnRhbChcclxuICAgICAgICAgICAgICAgIG5ldyBDb21wb25lbnRQb3J0YWwoY29tcG9uZW50T3JUZW1wbGF0ZVJlZiwgdW5kZWZpbmVkLCBpbmplY3RvcilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlID0gY29udGVudFJlZi5pbnN0YW5jZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpYWxvZ1JlZlxyXG4gICAgICAgICAgICAudXBkYXRlU2l6ZShjb25maWcud2lkdGgsIGNvbmZpZy5oZWlnaHQpXHJcbiAgICAgICAgICAgIC51cGRhdGVQb3NpdGlvbihjb25maWcucG9zaXRpb24pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGlhbG9nUmVmO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlSW5qZWN0b3I8VD4oXHJcbiAgICAgICAgY29uZmlnOiBPd2xEaWFsb2dDb25maWcsXHJcbiAgICAgICAgZGlhbG9nUmVmOiBPd2xEaWFsb2dSZWY8VD4sXHJcbiAgICAgICAgZGlhbG9nQ29udGFpbmVyOiBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnRcclxuICAgICkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbmplY3RvciA9XHJcbiAgICAgICAgICAgIGNvbmZpZyAmJlxyXG4gICAgICAgICAgICBjb25maWcudmlld0NvbnRhaW5lclJlZiAmJlxyXG4gICAgICAgICAgICBjb25maWcudmlld0NvbnRhaW5lclJlZi5pbmplY3RvcjtcclxuICAgICAgICBjb25zdCBpbmplY3Rpb25Ub2tlbnMgPSBuZXcgV2Vha01hcCgpO1xyXG5cclxuICAgICAgICBpbmplY3Rpb25Ub2tlbnMuc2V0KE93bERpYWxvZ1JlZiwgZGlhbG9nUmVmKTtcclxuICAgICAgICBpbmplY3Rpb25Ub2tlbnMuc2V0KE93bERpYWxvZ0NvbnRhaW5lckNvbXBvbmVudCwgZGlhbG9nQ29udGFpbmVyKTtcclxuICAgICAgICBpbmplY3Rpb25Ub2tlbnMuc2V0KE9XTF9ESUFMT0dfREFUQSwgY29uZmlnLmRhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFBvcnRhbEluamVjdG9yKFxyXG4gICAgICAgICAgICB1c2VySW5qZWN0b3IgfHwgdGhpcy5pbmplY3RvcixcclxuICAgICAgICAgICAgaW5qZWN0aW9uVG9rZW5zXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNyZWF0ZU92ZXJsYXkoY29uZmlnOiBPd2xEaWFsb2dDb25maWcpOiBPdmVybGF5UmVmIHtcclxuICAgICAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gdGhpcy5nZXRPdmVybGF5Q29uZmlnKGNvbmZpZyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhdHRhY2hEaWFsb2dDb250YWluZXIoXHJcbiAgICAgICAgb3ZlcmxheVJlZjogT3ZlcmxheVJlZixcclxuICAgICAgICBjb25maWc6IE93bERpYWxvZ0NvbmZpZ1xyXG4gICAgKTogT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXJQb3J0YWwgPSBuZXcgQ29tcG9uZW50UG9ydGFsKFxyXG4gICAgICAgICAgICBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQsXHJcbiAgICAgICAgICAgIGNvbmZpZy52aWV3Q29udGFpbmVyUmVmXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBjb250YWluZXJSZWY6IENvbXBvbmVudFJlZjxcclxuICAgICAgICAgICAgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50XHJcbiAgICAgICAgPiA9IG92ZXJsYXlSZWYuYXR0YWNoKGNvbnRhaW5lclBvcnRhbCk7XHJcbiAgICAgICAgY29udGFpbmVyUmVmLmluc3RhbmNlLnNldENvbmZpZyhjb25maWcpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyUmVmLmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0T3ZlcmxheUNvbmZpZyhkaWFsb2dDb25maWc6IE93bERpYWxvZ0NvbmZpZyk6IE92ZXJsYXlDb25maWcge1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0gbmV3IE92ZXJsYXlDb25maWcoe1xyXG4gICAgICAgICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLm92ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKSxcclxuICAgICAgICAgICAgc2Nyb2xsU3RyYXRlZ3k6XHJcbiAgICAgICAgICAgICAgICBkaWFsb2dDb25maWcuc2Nyb2xsU3RyYXRlZ3kgfHwgdGhpcy5zY3JvbGxTdHJhdGVneSgpLFxyXG4gICAgICAgICAgICBwYW5lbENsYXNzOiBkaWFsb2dDb25maWcucGFuZUNsYXNzLFxyXG4gICAgICAgICAgICBoYXNCYWNrZHJvcDogZGlhbG9nQ29uZmlnLmhhc0JhY2tkcm9wLFxyXG4gICAgICAgICAgICBtaW5XaWR0aDogZGlhbG9nQ29uZmlnLm1pbldpZHRoLFxyXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IGRpYWxvZ0NvbmZpZy5taW5IZWlnaHQsXHJcbiAgICAgICAgICAgIG1heFdpZHRoOiBkaWFsb2dDb25maWcubWF4V2lkdGgsXHJcbiAgICAgICAgICAgIG1heEhlaWdodDogZGlhbG9nQ29uZmlnLm1heEhlaWdodFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoZGlhbG9nQ29uZmlnLmJhY2tkcm9wQ2xhc3MpIHtcclxuICAgICAgICAgICAgc3RhdGUuYmFja2Ryb3BDbGFzcyA9IGRpYWxvZ0NvbmZpZy5iYWNrZHJvcENsYXNzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlT3BlbkRpYWxvZyhkaWFsb2dSZWY6IE93bERpYWxvZ1JlZjxhbnk+KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9vcGVuRGlhbG9nc0F0VGhpc0xldmVsLmluZGV4T2YoZGlhbG9nUmVmKTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuRGlhbG9ncy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAvLyBJZiBhbGwgdGhlIGRpYWxvZ3Mgd2VyZSBjbG9zZWQsIHJlbW92ZS9yZXN0b3JlIHRoZSBgYXJpYS1oaWRkZW5gXHJcbiAgICAgICAgICAgIC8vIHRvIGEgdGhlIHNpYmxpbmdzIGFuZCBlbWl0IHRvIHRoZSBgYWZ0ZXJBbGxDbG9zZWRgIHN0cmVhbS5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLm9wZW5EaWFsb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmlhSGlkZGVuRWxlbWVudHMuZm9yRWFjaCgocHJldmlvdXNWYWx1ZSwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHByZXZpb3VzVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYXJpYUhpZGRlbkVsZW1lbnRzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hZnRlckFsbENsb3NlZC5uZXh0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyBhbGwgb2YgdGhlIGNvbnRlbnQgdGhhdCBpc24ndCBhbiBvdmVybGF5IGZyb20gYXNzaXN0aXZlIHRlY2hub2xvZ3kuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaGlkZU5vbkRpYWxvZ0NvbnRlbnRGcm9tQXNzaXN0aXZlVGVjaG5vbG9neSgpIHtcclxuICAgICAgICBjb25zdCBvdmVybGF5Q29udGFpbmVyID0gdGhpcy5vdmVybGF5Q29udGFpbmVyLmdldENvbnRhaW5lckVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIG92ZXJsYXkgY29udGFpbmVyIGlzIGF0dGFjaGVkIHRvIHRoZSBET00uXHJcbiAgICAgICAgaWYgKG92ZXJsYXlDb250YWluZXIucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCBzaWJsaW5ncyA9IG92ZXJsYXlDb250YWluZXIucGFyZW50RWxlbWVudC5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBzaWJsaW5ncy5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNpYmxpbmcgPSBzaWJsaW5nc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgc2libGluZyAhPT0gb3ZlcmxheUNvbnRhaW5lciAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHNpYmxpbmcubm9kZU5hbWUgIT09ICdTQ1JJUFQnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgc2libGluZy5ub2RlTmFtZSAhPT0gJ1NUWUxFJyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFzaWJsaW5nLmhhc0F0dHJpYnV0ZSgnYXJpYS1saXZlJylcclxuICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJpYUhpZGRlbkVsZW1lbnRzLnNldChcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZy5nZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIHNpYmxpbmcuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBcHBsaWVzIGRlZmF1bHQgb3B0aW9ucyB0byB0aGUgZGlhbG9nIGNvbmZpZy5cclxuICogQHBhcmFtIGNvbmZpZyBDb25maWcgdG8gYmUgbW9kaWZpZWQuXHJcbiAqIEBwYXJhbSBkZWZhdWx0T3B0aW9ucyBEZWZhdWx0IGNvbmZpZyBzZXR0aW5nXHJcbiAqIEByZXR1cm5zIFRoZSBuZXcgY29uZmlndXJhdGlvbiBvYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBhcHBseUNvbmZpZ0RlZmF1bHRzKFxyXG4gICAgY29uZmlnPzogT3dsRGlhbG9nQ29uZmlnLFxyXG4gICAgZGVmYXVsdE9wdGlvbnM/OiBPd2xEaWFsb2dDb25maWdcclxuKTogT3dsRGlhbG9nQ29uZmlnIHtcclxuICAgIHJldHVybiBleHRlbmRPYmplY3QobmV3IE93bERpYWxvZ0NvbmZpZygpLCBjb25maWcsIGRlZmF1bHRPcHRpb25zKTtcclxufVxyXG4iXX0=