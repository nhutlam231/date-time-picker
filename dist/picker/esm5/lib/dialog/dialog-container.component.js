/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * dialog-container.component
 */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Optional, ViewChild } from '@angular/core';
import { animate, animateChild, keyframes, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
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
    tslib_1.__extends(OwlDialogContainerComponent, _super);
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
        _this.animationStateChanged = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'owl-dialog-container',
                    template: "<ng-template cdkPortalOutlet></ng-template>\r\n",
                    animations: [
                        trigger('slideModal', [
                            transition('void => enter', [
                                style(zoomFadeInFrom),
                                animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style('*')),
                                animate('150ms', keyframes([
                                    style({ transform: 'scale(1)', offset: 0 }),
                                    style({ transform: 'scale(1.05)', offset: 0.3 }),
                                    style({ transform: 'scale(.95)', offset: 0.8 }),
                                    style({ transform: 'scale(1)', offset: 1.0 })
                                ])),
                                animateChild()
                            ], {
                                params: {
                                    x: '0px',
                                    y: '0px',
                                    ox: '50%',
                                    oy: '50%',
                                    scale: 1
                                }
                            }),
                            transition('enter => exit', [animateChild(), animate(200, style(zoomFadeIn))], { params: { x: '0px', y: '0px', ox: '50%', oy: '50%' } })
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
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: FocusTrapFactory },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    OwlDialogContainerComponent.propDecorators = {
        portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }]
    };
    return OwlDialogContainerComponent;
}(BasePortalOutlet));
export { OwlDialogContainerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RpYWxvZy9kaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsU0FBUyxFQUVULFVBQVUsRUFFVixZQUFZLEVBQ1osTUFBTSxFQUVOLFFBQVEsRUFDUixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUNILE9BQU8sRUFDUCxZQUFZLEVBRVosU0FBUyxFQUNULEtBQUssRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNWLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBYSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hFLE9BQU8sRUFDSCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUdsQixNQUFNLHFCQUFxQixDQUFDOztJQUd2QixVQUFVLEdBQUc7SUFDZixPQUFPLEVBQUUsQ0FBQztJQUNWLFNBQVMsRUFBRSwwREFBMEQ7Q0FDeEU7O0lBQ0ssY0FBYyxHQUFHO0lBQ25CLE9BQU8sRUFBRSxDQUFDO0lBQ1YsU0FBUyxFQUFFLDBEQUEwRDtJQUNyRSxlQUFlLEVBQUUsbUJBQW1CO0NBQ3ZDO0FBRUQ7SUFrRGlELHVEQUFnQjtJQWdFN0QscUNBQ1ksY0FBaUMsRUFDakMsVUFBc0IsRUFDdEIsZ0JBQWtDLEVBR2xDLFFBQWE7UUFOekIsWUFRSSxpQkFBTyxTQUNWO1FBUlcsb0JBQWMsR0FBZCxjQUFjLENBQW1CO1FBQ2pDLGdCQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHNCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFHbEMsY0FBUSxHQUFSLFFBQVEsQ0FBSzs7OztRQTdEbEIsb0JBQWMsR0FBa0Is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QUUseUJBQXlCO3dCQUN6RCxpQkFBaUIsRUFBRSw0QkFBNEI7d0JBQy9DLFdBQVcsRUFBRSxzQkFBc0I7d0JBQ25DLGFBQWEsRUFBRSx3QkFBd0I7d0JBQ3ZDLHdCQUF3QixFQUFFLGtDQUFrQzt3QkFDNUQseUJBQXlCLEVBQUUsbUNBQW1DO3dCQUM5RCxlQUFlLEVBQUUsNkJBQTZCO3FCQUNqRDtpQkFDSjs7OztnQkF6RkcsaUJBQWlCO2dCQUdqQixVQUFVO2dCQWtCTSxnQkFBZ0I7Z0RBeUkzQixRQUFRLFlBQ1IsTUFBTSxTQUFDLFFBQVE7OzsrQkFuRW5CLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztJQThMaEQsa0NBQUM7Q0FBQSxBQWxQRCxDQWtEaUQsZ0JBQWdCLEdBZ01oRTtTQWhNWSwyQkFBMkI7OztJQUVwQyxtREFDOEI7Ozs7OztJQUc5QixnREFBNkI7Ozs7O0lBRzdCLHFEQUE0Qzs7Ozs7SUFHNUMsNERBQWtFOztJQUVsRSxrREFBMkI7Ozs7O0lBRTNCLDhDQUFpQzs7Ozs7SUFLakMsNENBQW1EOzs7OztJQUduRCw2Q0FNRTs7Ozs7SUFJRiwwRUFBdUU7Ozs7O0lBK0JuRSxxREFBeUM7Ozs7O0lBQ3pDLGlEQUE4Qjs7Ozs7SUFDOUIsdURBQTBDOzs7OztJQUMxQywrQ0FFcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnRcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBDb21wb25lbnRSZWYsXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgRW1iZWRkZWRWaWV3UmVmLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5qZWN0LFxyXG4gICAgT25Jbml0LFxyXG4gICAgT3B0aW9uYWwsXHJcbiAgICBWaWV3Q2hpbGRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICAgIGFuaW1hdGUsXHJcbiAgICBhbmltYXRlQ2hpbGQsXHJcbiAgICBBbmltYXRpb25FdmVudCxcclxuICAgIGtleWZyYW1lcyxcclxuICAgIHN0eWxlLFxyXG4gICAgdHJhbnNpdGlvbixcclxuICAgIHRyaWdnZXJcclxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb2N1c1RyYXAsIEZvY3VzVHJhcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XHJcbmltcG9ydCB7XHJcbiAgICBCYXNlUG9ydGFsT3V0bGV0LFxyXG4gICAgQ2RrUG9ydGFsT3V0bGV0LFxyXG4gICAgQ29tcG9uZW50UG9ydGFsLFxyXG4gICAgVGVtcGxhdGVQb3J0YWxcclxufSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcclxuaW1wb3J0IHsgT3dsRGlhbG9nQ29uZmlnIH0gZnJvbSAnLi9kaWFsb2ctY29uZmlnLmNsYXNzJztcclxuXHJcbmNvbnN0IHpvb21GYWRlSW4gPSB7XHJcbiAgICBvcGFjaXR5OiAwLFxyXG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCh7eyB4IH19KSB0cmFuc2xhdGVZKHt7IHkgfX0pIHNjYWxlKHt7c2NhbGV9fSknXHJcbn07XHJcbmNvbnN0IHpvb21GYWRlSW5Gcm9tID0ge1xyXG4gICAgb3BhY2l0eTogMCxcclxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoe3sgeCB9fSkgdHJhbnNsYXRlWSh7eyB5IH19KSBzY2FsZSh7e3NjYWxlfX0pJyxcclxuICAgIHRyYW5zZm9ybU9yaWdpbjogJ3t7IG94IH19IHt7IG95IH19J1xyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ293bC1kaWFsb2ctY29udGFpbmVyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9kaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICB0cmlnZ2VyKCdzbGlkZU1vZGFsJywgW1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKFxyXG4gICAgICAgICAgICAgICAgJ3ZvaWQgPT4gZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHpvb21GYWRlSW5Gcm9tKSxcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlKCczMDBtcyBjdWJpYy1iZXppZXIoMC4zNSwgMCwgMC4yNSwgMSknLCBzdHlsZSgnKicpKSxcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnMTUwbXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgxKScsIG9mZnNldDogMCB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoMS4wNSknLCBvZmZzZXQ6IDAuMyB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAnc2NhbGUoLjk1KScsIG9mZnNldDogMC44IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgxKScsIG9mZnNldDogMS4wIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlQ2hpbGQoKVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogJzBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6ICcwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBveDogJzUwJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG95OiAnNTAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oXHJcbiAgICAgICAgICAgICAgICAnZW50ZXIgPT4gZXhpdCcsXHJcbiAgICAgICAgICAgICAgICBbYW5pbWF0ZUNoaWxkKCksIGFuaW1hdGUoMjAwLCBzdHlsZSh6b29tRmFkZUluKSldLFxyXG4gICAgICAgICAgICAgICAgeyBwYXJhbXM6IHsgeDogJzBweCcsIHk6ICcwcHgnLCBveDogJzUwJScsIG95OiAnNTAlJyB9IH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIF0pXHJcbiAgICBdLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICcoQHNsaWRlTW9kYWwuc3RhcnQpJzogJ29uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KScsXHJcbiAgICAgICAgJyhAc2xpZGVNb2RhbC5kb25lKSc6ICdvbkFuaW1hdGlvbkRvbmUoJGV2ZW50KScsXHJcbiAgICAgICAgJ1tjbGFzcy5vd2wtZGlhbG9nLWNvbnRhaW5lcl0nOiAnb3dsRGlhbG9nQ29udGFpbmVyQ2xhc3MnLFxyXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnb3dsRGlhbG9nQ29udGFpbmVyVGFiSW5kZXgnLFxyXG4gICAgICAgICdbYXR0ci5pZF0nOiAnb3dsRGlhbG9nQ29udGFpbmVySWQnLFxyXG4gICAgICAgICdbYXR0ci5yb2xlXSc6ICdvd2xEaWFsb2dDb250YWluZXJSb2xlJyxcclxuICAgICAgICAnW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XSc6ICdvd2xEaWFsb2dDb250YWluZXJBcmlhTGFiZWxsZWRieScsXHJcbiAgICAgICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ293bERpYWxvZ0NvbnRhaW5lckFyaWFEZXNjcmliZWRieScsXHJcbiAgICAgICAgJ1tAc2xpZGVNb2RhbF0nOiAnb3dsRGlhbG9nQ29udGFpbmVyQW5pbWF0aW9uJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgT3dsRGlhbG9nQ29udGFpbmVyQ29tcG9uZW50IGV4dGVuZHMgQmFzZVBvcnRhbE91dGxldFxyXG4gICAgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQsIHsgc3RhdGljOiB0cnVlIH0pXHJcbiAgICBwb3J0YWxPdXRsZXQ6IENka1BvcnRhbE91dGxldDtcclxuXHJcbiAgICAvKiogVGhlIGNsYXNzIHRoYXQgdHJhcHMgYW5kIG1hbmFnZXMgZm9jdXMgd2l0aGluIHRoZSBkaWFsb2cuICovXHJcbiAgICBwcml2YXRlIGZvY3VzVHJhcDogRm9jdXNUcmFwO1xyXG5cclxuICAgIC8qKiBJRCBvZiB0aGUgZWxlbWVudCB0aGF0IHNob3VsZCBiZSBjb25zaWRlcmVkIGFzIHRoZSBkaWFsb2cncyBsYWJlbC4gKi9cclxuICAgIHB1YmxpYyBhcmlhTGFiZWxsZWRCeTogc3RyaW5nIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgLyoqIEVtaXRzIHdoZW4gYW4gYW5pbWF0aW9uIHN0YXRlIGNoYW5nZXMuICovXHJcbiAgICBwdWJsaWMgYW5pbWF0aW9uU3RhdGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxBbmltYXRpb25FdmVudD4oKTtcclxuXHJcbiAgICBwdWJsaWMgaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9jb25maWc6IE93bERpYWxvZ0NvbmZpZztcclxuICAgIGdldCBjb25maWcoKTogT3dsRGlhbG9nQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGU6ICd2b2lkJyB8ICdlbnRlcicgfCAnZXhpdCcgPSAnZW50ZXInO1xyXG5cclxuICAgIC8vIGZvciBhbmltYXRpb24gcHVycG9zZVxyXG4gICAgcHJpdmF0ZSBwYXJhbXM6IGFueSA9IHtcclxuICAgICAgICB4OiAnMHB4JyxcclxuICAgICAgICB5OiAnMHB4JyxcclxuICAgICAgICBveDogJzUwJScsXHJcbiAgICAgICAgb3k6ICc1MCUnLFxyXG4gICAgICAgIHNjYWxlOiAwXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEEgdmFyaWFibGUgdG8gaG9sZCB0aGUgZm9jdXNlZCBlbGVtZW50IGJlZm9yZSB0aGUgZGlhbG9nIHdhcyBvcGVuLlxyXG4gICAgLy8gVGhpcyB3b3VsZCBoZWxwIHVzIHRvIHJlZm9jdXMgYmFjayB0byBlbGVtZW50IHdoZW4gdGhlIGRpYWxvZyB3YXMgY2xvc2VkLlxyXG4gICAgcHJpdmF0ZSBlbGVtZW50Rm9jdXNlZEJlZm9yZURpYWxvZ1dhc09wZW5lZDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBnZXQgb3dsRGlhbG9nQ29udGFpbmVyQ2xhc3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERpYWxvZ0NvbnRhaW5lclRhYkluZGV4KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xEaWFsb2dDb250YWluZXJJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERpYWxvZ0NvbnRhaW5lclJvbGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnJvbGUgfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsRGlhbG9nQ29udGFpbmVyQXJpYUxhYmVsbGVkYnkoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hcmlhTGFiZWxsZWRCeTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsRGlhbG9nQ29udGFpbmVyQXJpYURlc2NyaWJlZGJ5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5hcmlhRGVzY3JpYmVkQnkgfHwgbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsRGlhbG9nQ29udGFpbmVyQW5pbWF0aW9uKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHRoaXMuc3RhdGUsIHBhcmFtczogdGhpcy5wYXJhbXMgfTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBmb2N1c1RyYXBGYWN0b3J5OiBGb2N1c1RyYXBGYWN0b3J5LFxyXG4gICAgICAgIEBPcHRpb25hbCgpXHJcbiAgICAgICAgQEluamVjdChET0NVTUVOVClcclxuICAgICAgICBwcml2YXRlIGRvY3VtZW50OiBhbnlcclxuICAgICkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIEF0dGFjaCBhIENvbXBvbmVudFBvcnRhbCBhcyBjb250ZW50IHRvIHRoaXMgZGlhbG9nIGNvbnRhaW5lci5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihcclxuICAgICAgICBwb3J0YWw6IENvbXBvbmVudFBvcnRhbDxUPlxyXG4gICAgKTogQ29tcG9uZW50UmVmPFQ+IHtcclxuICAgICAgICBpZiAodGhpcy5wb3J0YWxPdXRsZXQuaGFzQXR0YWNoZWQoKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcclxuICAgICAgICAgICAgICAgICdBdHRlbXB0aW5nIHRvIGF0dGFjaCBkaWFsb2cgY29udGVudCBhZnRlciBjb250ZW50IGlzIGFscmVhZHkgYXR0YWNoZWQnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNhdmVQcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3J0YWxPdXRsZXQuYXR0YWNoQ29tcG9uZW50UG9ydGFsKHBvcnRhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGF0dGFjaFRlbXBsYXRlUG9ydGFsPEM+KFxyXG4gICAgICAgIHBvcnRhbDogVGVtcGxhdGVQb3J0YWw8Qz5cclxuICAgICk6IEVtYmVkZGVkVmlld1JlZjxDPiB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDb25maWcoY29uZmlnOiBPd2xEaWFsb2dDb25maWcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcblxyXG4gICAgICAgIGlmIChjb25maWcuZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVab29tT3JpZ2luKGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uQW5pbWF0aW9uU3RhcnQoIGV2ZW50OiBBbmltYXRpb25FdmVudCApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25BbmltYXRpb25Eb25lKCBldmVudDogQW5pbWF0aW9uRXZlbnQgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdlbnRlcicpIHtcclxuICAgICAgICAgICAgdGhpcy50cmFwRm9jdXMoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdleGl0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3RvcmVGb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZUNoYW5nZWQuZW1pdChldmVudCk7XHJcbiAgICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydEV4aXRBbmltYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9ICdleGl0JztcclxuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsY3VsYXRlIG9yaWdpbiB1c2VkIGluIHRoZSBgem9vbUZhZGVJbkZyb20oKWBcclxuICAgICAqIGZvciBhbmltYXRpb24gcHVycG9zZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNhbGN1bGF0ZVpvb21PcmlnaW4oZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghZXZlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2xpZW50WCA9IGV2ZW50LmNsaWVudFg7XHJcbiAgICAgICAgY29uc3QgY2xpZW50WSA9IGV2ZW50LmNsaWVudFk7XHJcblxyXG4gICAgICAgIGNvbnN0IHdoID0gd2luZG93LmlubmVyV2lkdGggLyAyO1xyXG4gICAgICAgIGNvbnN0IGhoID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcclxuICAgICAgICBjb25zdCB4ID0gY2xpZW50WCAtIHdoO1xyXG4gICAgICAgIGNvbnN0IHkgPSBjbGllbnRZIC0gaGg7XHJcbiAgICAgICAgY29uc3Qgb3ggPSBjbGllbnRYIC8gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgY29uc3Qgb3kgPSBjbGllbnRZIC8gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgICAgICB0aGlzLnBhcmFtcy54ID0gYCR7eH1weGA7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMueSA9IGAke3l9cHhgO1xyXG4gICAgICAgIHRoaXMucGFyYW1zLm94ID0gYCR7b3ggKiAxMDB9JWA7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMub3kgPSBgJHtveSAqIDEwMH0lYDtcclxuICAgICAgICB0aGlzLnBhcmFtcy5zY2FsZSA9IDA7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNhdmUgdGhlIGZvY3VzZWQgZWxlbWVudCBiZWZvcmUgZGlhbG9nIHdhcyBvcGVuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2F2ZVByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRGb2N1c2VkQmVmb3JlRGlhbG9nV2FzT3BlbmVkID0gdGhpcy5kb2N1bWVudFxyXG4gICAgICAgICAgICAgICAgLmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRyYXBGb2N1cygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuZm9jdXNUcmFwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUcmFwID0gdGhpcy5mb2N1c1RyYXBGYWN0b3J5LmNyZWF0ZShcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5fY29uZmlnLmF1dG9Gb2N1cykge1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzVHJhcC5mb2N1c0luaXRpYWxFbGVtZW50V2hlblJlYWR5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzdG9yZUZvY3VzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRvRm9jdXMgPSB0aGlzLmVsZW1lbnRGb2N1c2VkQmVmb3JlRGlhbG9nV2FzT3BlbmVkO1xyXG5cclxuICAgICAgICAvLyBXZSBuZWVkIHRoZSBleHRyYSBjaGVjaywgYmVjYXVzZSBJRSBjYW4gc2V0IHRoZSBgYWN0aXZlRWxlbWVudGAgdG8gbnVsbCBpbiBzb21lIGNhc2VzLlxyXG4gICAgICAgIGlmICh0b0ZvY3VzICYmIHR5cGVvZiB0b0ZvY3VzLmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRvRm9jdXMuZm9jdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmZvY3VzVHJhcCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvY3VzVHJhcC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==