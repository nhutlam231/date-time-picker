/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * dialog-container.component
 */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Optional, ViewChild } from '@angular/core';
import { animate, animateChild, keyframes, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { BasePortalOutlet, CdkPortalOutlet } from '@angular/cdk/portal';
/** @type {?} */
const zoomFadeIn = {
    opacity: 0,
    transform: 'translateX({{ x }}) translateY({{ y }}) scale({{scale}})'
};
/** @type {?} */
const zoomFadeInFrom = {
    opacity: 0,
    transform: 'translateX({{ x }}) translateY({{ y }}) scale({{scale}})',
    transformOrigin: '{{ ox }} {{ oy }}'
};
export class OwlDialogContainerComponent extends BasePortalOutlet {
    /**
     * @param {?} changeDetector
     * @param {?} elementRef
     * @param {?} focusTrapFactory
     * @param {?} document
     */
    constructor(changeDetector, elementRef, focusTrapFactory, document) {
        super();
        this.changeDetector = changeDetector;
        this.elementRef = elementRef;
        this.focusTrapFactory = focusTrapFactory;
        this.document = document;
        /**
         * ID of the element that should be considered as the dialog's label.
         */
        this.ariaLabelledBy = null;
        /**
         * Emits when an animation state changes.
         */
        this.animationStateChanged = new EventEmitter();
        this.isAnimating = false;
        this.state = 'enter';
        // for animation purpose
        this.params = {
            x: '0px',
            y: '0px',
            ox: '50%',
            oy: '50%',
            scale: 0
        };
        // A variable to hold the focused element before the dialog was open.
        // This would help us to refocus back to element when the dialog was closed.
        this.elementFocusedBeforeDialogWasOpened = null;
    }
    /**
     * @return {?}
     */
    get config() {
        return this._config;
    }
    /**
     * @return {?}
     */
    get owlDialogContainerClass() {
        return true;
    }
    /**
     * @return {?}
     */
    get owlDialogContainerTabIndex() {
        return -1;
    }
    /**
     * @return {?}
     */
    get owlDialogContainerId() {
        return this._config.id;
    }
    /**
     * @return {?}
     */
    get owlDialogContainerRole() {
        return this._config.role || null;
    }
    /**
     * @return {?}
     */
    get owlDialogContainerAriaLabelledby() {
        return this.ariaLabelledBy;
    }
    /**
     * @return {?}
     */
    get owlDialogContainerAriaDescribedby() {
        return this._config.ariaDescribedBy || null;
    }
    /**
     * @return {?}
     */
    get owlDialogContainerAnimation() {
        return { value: this.state, params: this.params };
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
    /**
     * Attach a ComponentPortal as content to this dialog container.
     * @template T
     * @param {?} portal
     * @return {?}
     */
    attachComponentPortal(portal) {
        if (this.portalOutlet.hasAttached()) {
            throw Error('Attempting to attach dialog content after content is already attached');
        }
        this.savePreviouslyFocusedElement();
        return this.portalOutlet.attachComponentPortal(portal);
    }
    /**
     * @template C
     * @param {?} portal
     * @return {?}
     */
    attachTemplatePortal(portal) {
        throw new Error('Method not implemented.');
    }
    /**
     * @param {?} config
     * @return {?}
     */
    setConfig(config) {
        this._config = config;
        if (config.event) {
            this.calculateZoomOrigin(event);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onAnimationStart(event) {
        this.isAnimating = true;
        this.animationStateChanged.emit(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onAnimationDone(event) {
        if (event.toState === 'enter') {
            this.trapFocus();
        }
        else if (event.toState === 'exit') {
            this.restoreFocus();
        }
        this.animationStateChanged.emit(event);
        this.isAnimating = false;
    }
    /**
     * @return {?}
     */
    startExitAnimation() {
        this.state = 'exit';
        this.changeDetector.markForCheck();
    }
    /**
     * Calculate origin used in the `zoomFadeInFrom()`
     * for animation purpose
     * @private
     * @param {?} event
     * @return {?}
     */
    calculateZoomOrigin(event) {
        if (!event) {
            return;
        }
        /** @type {?} */
        const clientX = event.clientX;
        /** @type {?} */
        const clientY = event.clientY;
        /** @type {?} */
        const wh = window.innerWidth / 2;
        /** @type {?} */
        const hh = window.innerHeight / 2;
        /** @type {?} */
        const x = clientX - wh;
        /** @type {?} */
        const y = clientY - hh;
        /** @type {?} */
        const ox = clientX / window.innerWidth;
        /** @type {?} */
        const oy = clientY / window.innerHeight;
        this.params.x = `${x}px`;
        this.params.y = `${y}px`;
        this.params.ox = `${ox * 100}%`;
        this.params.oy = `${oy * 100}%`;
        this.params.scale = 0;
        return;
    }
    /**
     * Save the focused element before dialog was open
     * @private
     * @return {?}
     */
    savePreviouslyFocusedElement() {
        if (this.document) {
            this.elementFocusedBeforeDialogWasOpened = (/** @type {?} */ (this.document
                .activeElement));
            Promise.resolve().then((/**
             * @return {?}
             */
            () => this.elementRef.nativeElement.focus()));
        }
    }
    /**
     * @private
     * @return {?}
     */
    trapFocus() {
        if (!this.focusTrap) {
            this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
        }
        if (this._config.autoFocus) {
            this.focusTrap.focusInitialElementWhenReady();
        }
    }
    /**
     * @private
     * @return {?}
     */
    restoreFocus() {
        /** @type {?} */
        const toFocus = this.elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    }
}
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
OwlDialogContainerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: FocusTrapFactory },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
OwlDialogContainerComponent.propDecorators = {
    portalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet, { static: true },] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RpYWxvZy9kaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBSUEsT0FBTyxFQUNILGlCQUFpQixFQUNqQixTQUFTLEVBRVQsVUFBVSxFQUVWLFlBQVksRUFDWixNQUFNLEVBRU4sUUFBUSxFQUNSLFNBQVMsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsT0FBTyxFQUNQLFlBQVksRUFFWixTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBQ1YsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFhLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEUsT0FBTyxFQUNILGdCQUFnQixFQUNoQixlQUFlLEVBR2xCLE1BQU0scUJBQXFCLENBQUM7O01BR3ZCLFVBQVUsR0FBRztJQUNmLE9BQU8sRUFBRSxDQUFDO0lBQ1YsU0FBUyxFQUFFLDBEQUEwRDtDQUN4RTs7TUFDSyxjQUFjLEdBQUc7SUFDbkIsT0FBTyxFQUFFLENBQUM7SUFDVixTQUFTLEVBQUUsMERBQTBEO0lBQ3JFLGVBQWUsRUFBRSxtQkFBbUI7Q0FDdkM7QUFvREQsTUFBTSxPQUFPLDJCQUE0QixTQUFRLGdCQUFnQjs7Ozs7OztJQWdFN0QsWUFDWSxjQUFpQyxFQUNqQyxVQUFzQixFQUN0QixnQkFBa0MsRUFHbEMsUUFBYTtRQUVyQixLQUFLLEVBQUUsQ0FBQztRQVBBLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQUNqQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFHbEMsYUFBUSxHQUFSLFFBQVEsQ0FBSzs7OztR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TUFBTSxTQUFDLFFBQVE7OzsyQkFuRW5CLFNBQVMsU0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzs7O0lBQTVDLG1EQUM4Qjs7Ozs7O0lBRzlCLGdEQUE2Qjs7Ozs7SUFHN0IscURBQTRDOzs7OztJQUc1Qyw0REFBa0U7O0lBRWxFLGtEQUEyQjs7Ozs7SUFFM0IsOENBQWlDOzs7OztJQUtqQyw0Q0FBbUQ7Ozs7O0lBR25ELDZDQU1FOzs7OztJQUlGLDBFQUF1RTs7Ozs7SUErQm5FLHFEQUF5Qzs7Ozs7SUFDekMsaURBQThCOzs7OztJQUM5Qix1REFBMEM7Ozs7O0lBQzFDLCtDQUVxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBkaWFsb2ctY29udGFpbmVyLmNvbXBvbmVudFxyXG4gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIENvbXBvbmVudCxcclxuICAgIENvbXBvbmVudFJlZixcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBFbWJlZGRlZFZpZXdSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBJbmplY3QsXHJcbiAgICBPbkluaXQsXHJcbiAgICBPcHRpb25hbCxcclxuICAgIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gICAgYW5pbWF0ZSxcclxuICAgIGFuaW1hdGVDaGlsZCxcclxuICAgIEFuaW1hdGlvbkV2ZW50LFxyXG4gICAga2V5ZnJhbWVzLFxyXG4gICAgc3R5bGUsXHJcbiAgICB0cmFuc2l0aW9uLFxyXG4gICAgdHJpZ2dlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvY3VzVHJhcCwgRm9jdXNUcmFwRmFjdG9yeSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcclxuaW1wb3J0IHtcclxuICAgIEJhc2VQb3J0YWxPdXRsZXQsXHJcbiAgICBDZGtQb3J0YWxPdXRsZXQsXHJcbiAgICBDb21wb25lbnRQb3J0YWwsXHJcbiAgICBUZW1wbGF0ZVBvcnRhbFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xyXG5pbXBvcnQgeyBPd2xEaWFsb2dDb25maWcgfSBmcm9tICcuL2RpYWxvZy1jb25maWcuY2xhc3MnO1xyXG5cclxuY29uc3Qgem9vbUZhZGVJbiA9IHtcclxuICAgIG9wYWNpdHk6IDAsXHJcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKHt7IHggfX0pIHRyYW5zbGF0ZVkoe3sgeSB9fSkgc2NhbGUoe3tzY2FsZX19KSdcclxufTtcclxuY29uc3Qgem9vbUZhZGVJbkZyb20gPSB7XHJcbiAgICBvcGFjaXR5OiAwLFxyXG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCh7eyB4IH19KSB0cmFuc2xhdGVZKHt7IHkgfX0pIHNjYWxlKHt7c2NhbGV9fSknLFxyXG4gICAgdHJhbnNmb3JtT3JpZ2luOiAne3sgb3ggfX0ge3sgb3kgfX0nXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnb3dsLWRpYWxvZy1jb250YWluZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RpYWxvZy1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ3NsaWRlTW9kYWwnLCBbXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oXHJcbiAgICAgICAgICAgICAgICAndm9pZCA9PiBlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUoem9vbUZhZGVJbkZyb20pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJzMwMG1zIGN1YmljLWJlemllcigwLjM1LCAwLCAwLjI1LCAxKScsIHN0eWxlKCcqJykpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcxNTBtcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleWZyYW1lcyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDEpJywgb2Zmc2V0OiAwIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSgxLjA1KScsIG9mZnNldDogMC4zIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICdzY2FsZSguOTUpJywgb2Zmc2V0OiAwLjggfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3NjYWxlKDEpJywgb2Zmc2V0OiAxLjAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVDaGlsZCgpXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAnMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogJzBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG94OiAnNTAlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3k6ICc1MCUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbihcclxuICAgICAgICAgICAgICAgICdlbnRlciA9PiBleGl0JyxcclxuICAgICAgICAgICAgICAgIFthbmltYXRlQ2hpbGQoKSwgYW5pbWF0ZSgyMDAsIHN0eWxlKHpvb21GYWRlSW4pKV0sXHJcbiAgICAgICAgICAgICAgICB7IHBhcmFtczogeyB4OiAnMHB4JywgeTogJzBweCcsIG94OiAnNTAlJywgb3k6ICc1MCUnIH0gfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgXSlcclxuICAgIF0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJyhAc2xpZGVNb2RhbC5zdGFydCknOiAnb25BbmltYXRpb25TdGFydCgkZXZlbnQpJyxcclxuICAgICAgICAnKEBzbGlkZU1vZGFsLmRvbmUpJzogJ29uQW5pbWF0aW9uRG9uZSgkZXZlbnQpJyxcclxuICAgICAgICAnW2NsYXNzLm93bC1kaWFsb2ctY29udGFpbmVyXSc6ICdvd2xEaWFsb2dDb250YWluZXJDbGFzcycsXHJcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICdvd2xEaWFsb2dDb250YWluZXJUYWJJbmRleCcsXHJcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdvd2xEaWFsb2dDb250YWluZXJJZCcsXHJcbiAgICAgICAgJ1thdHRyLnJvbGVdJzogJ293bERpYWxvZ0NvbnRhaW5lclJvbGUnLFxyXG4gICAgICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ293bERpYWxvZ0NvbnRhaW5lckFyaWFMYWJlbGxlZGJ5JyxcclxuICAgICAgICAnW2F0dHIuYXJpYS1kZXNjcmliZWRieV0nOiAnb3dsRGlhbG9nQ29udGFpbmVyQXJpYURlc2NyaWJlZGJ5JyxcclxuICAgICAgICAnW0BzbGlkZU1vZGFsXSc6ICdvd2xEaWFsb2dDb250YWluZXJBbmltYXRpb24nXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPd2xEaWFsb2dDb250YWluZXJDb21wb25lbnQgZXh0ZW5kcyBCYXNlUG9ydGFsT3V0bGV0XHJcbiAgICBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBAVmlld0NoaWxkKENka1BvcnRhbE91dGxldCwgeyBzdGF0aWM6IHRydWUgfSlcclxuICAgIHBvcnRhbE91dGxldDogQ2RrUG9ydGFsT3V0bGV0O1xyXG5cclxuICAgIC8qKiBUaGUgY2xhc3MgdGhhdCB0cmFwcyBhbmQgbWFuYWdlcyBmb2N1cyB3aXRoaW4gdGhlIGRpYWxvZy4gKi9cclxuICAgIHByaXZhdGUgZm9jdXNUcmFwOiBGb2N1c1RyYXA7XHJcblxyXG4gICAgLyoqIElEIG9mIHRoZSBlbGVtZW50IHRoYXQgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYXMgdGhlIGRpYWxvZydzIGxhYmVsLiAqL1xyXG4gICAgcHVibGljIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAvKiogRW1pdHMgd2hlbiBhbiBhbmltYXRpb24gc3RhdGUgY2hhbmdlcy4gKi9cclxuICAgIHB1YmxpYyBhbmltYXRpb25TdGF0ZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPEFuaW1hdGlvbkV2ZW50PigpO1xyXG5cclxuICAgIHB1YmxpYyBpc0FuaW1hdGluZyA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX2NvbmZpZzogT3dsRGlhbG9nQ29uZmlnO1xyXG4gICAgZ2V0IGNvbmZpZygpOiBPd2xEaWFsb2dDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0ZTogJ3ZvaWQnIHwgJ2VudGVyJyB8ICdleGl0JyA9ICdlbnRlcic7XHJcblxyXG4gICAgLy8gZm9yIGFuaW1hdGlvbiBwdXJwb3NlXHJcbiAgICBwcml2YXRlIHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgIHg6ICcwcHgnLFxyXG4gICAgICAgIHk6ICcwcHgnLFxyXG4gICAgICAgIG94OiAnNTAlJyxcclxuICAgICAgICBveTogJzUwJScsXHJcbiAgICAgICAgc2NhbGU6IDBcclxuICAgIH07XHJcblxyXG4gICAgLy8gQSB2YXJpYWJsZSB0byBob2xkIHRoZSBmb2N1c2VkIGVsZW1lbnQgYmVmb3JlIHRoZSBkaWFsb2cgd2FzIG9wZW4uXHJcbiAgICAvLyBUaGlzIHdvdWxkIGhlbHAgdXMgdG8gcmVmb2N1cyBiYWNrIHRvIGVsZW1lbnQgd2hlbiB0aGUgZGlhbG9nIHdhcyBjbG9zZWQuXHJcbiAgICBwcml2YXRlIGVsZW1lbnRGb2N1c2VkQmVmb3JlRGlhbG9nV2FzT3BlbmVkOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIGdldCBvd2xEaWFsb2dDb250YWluZXJDbGFzcygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsRGlhbG9nQ29udGFpbmVyVGFiSW5kZXgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG93bERpYWxvZ0NvbnRhaW5lcklkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5pZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3dsRGlhbG9nQ29udGFpbmVyUm9sZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcucm9sZSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xEaWFsb2dDb250YWluZXJBcmlhTGFiZWxsZWRieSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFyaWFMYWJlbGxlZEJ5O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xEaWFsb2dDb250YWluZXJBcmlhRGVzY3JpYmVkYnkoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLmFyaWFEZXNjcmliZWRCeSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvd2xEaWFsb2dDb250YWluZXJBbmltYXRpb24oKTogYW55IHtcclxuICAgICAgICByZXR1cm4geyB2YWx1ZTogdGhpcy5zdGF0ZSwgcGFyYW1zOiB0aGlzLnBhcmFtcyB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgICAgICBwcml2YXRlIGZvY3VzVHJhcEZhY3Rvcnk6IEZvY3VzVHJhcEZhY3RvcnksXHJcbiAgICAgICAgQE9wdGlvbmFsKClcclxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKVxyXG4gICAgICAgIHByaXZhdGUgZG9jdW1lbnQ6IGFueVxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXR0YWNoIGEgQ29tcG9uZW50UG9ydGFsIGFzIGNvbnRlbnQgdG8gdGhpcyBkaWFsb2cgY29udGFpbmVyLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KFxyXG4gICAgICAgIHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFQ+XHJcbiAgICApOiBDb21wb25lbnRSZWY8VD4ge1xyXG4gICAgICAgIGlmICh0aGlzLnBvcnRhbE91dGxldC5oYXNBdHRhY2hlZCgpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgJ0F0dGVtcHRpbmcgdG8gYXR0YWNoIGRpYWxvZyBjb250ZW50IGFmdGVyIGNvbnRlbnQgaXMgYWxyZWFkeSBhdHRhY2hlZCdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2F2ZVByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvcnRhbE91dGxldC5hdHRhY2hDb21wb25lbnRQb3J0YWwocG9ydGFsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXR0YWNoVGVtcGxhdGVQb3J0YWw8Qz4oXHJcbiAgICAgICAgcG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDxDPlxyXG4gICAgKTogRW1iZWRkZWRWaWV3UmVmPEM+IHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENvbmZpZyhjb25maWc6IE93bERpYWxvZ0NvbmZpZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5ldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVpvb21PcmlnaW4oZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25BbmltYXRpb25TdGFydCggZXZlbnQ6IEFuaW1hdGlvbkV2ZW50ICk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGVDaGFuZ2VkLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkFuaW1hdGlvbkRvbmUoIGV2ZW50OiBBbmltYXRpb25FdmVudCApOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2VudGVyJykge1xyXG4gICAgICAgICAgICB0aGlzLnRyYXBGb2N1cygpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2V4aXQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZUZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlQ2hhbmdlZC5lbWl0KGV2ZW50KTtcclxuICAgICAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0RXhpdEFuaW1hdGlvbigpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gJ2V4aXQnO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxjdWxhdGUgb3JpZ2luIHVzZWQgaW4gdGhlIGB6b29tRmFkZUluRnJvbSgpYFxyXG4gICAgICogZm9yIGFuaW1hdGlvbiBwdXJwb3NlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2FsY3VsYXRlWm9vbU9yaWdpbihldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFldmVudCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjbGllbnRYID0gZXZlbnQuY2xpZW50WDtcclxuICAgICAgICBjb25zdCBjbGllbnRZID0gZXZlbnQuY2xpZW50WTtcclxuXHJcbiAgICAgICAgY29uc3Qgd2ggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XHJcbiAgICAgICAgY29uc3QgaGggPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xyXG4gICAgICAgIGNvbnN0IHggPSBjbGllbnRYIC0gd2g7XHJcbiAgICAgICAgY29uc3QgeSA9IGNsaWVudFkgLSBoaDtcclxuICAgICAgICBjb25zdCBveCA9IGNsaWVudFggLyB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBjb25zdCBveSA9IGNsaWVudFkgLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMucGFyYW1zLnggPSBgJHt4fXB4YDtcclxuICAgICAgICB0aGlzLnBhcmFtcy55ID0gYCR7eX1weGA7XHJcbiAgICAgICAgdGhpcy5wYXJhbXMub3ggPSBgJHtveCAqIDEwMH0lYDtcclxuICAgICAgICB0aGlzLnBhcmFtcy5veSA9IGAke295ICogMTAwfSVgO1xyXG4gICAgICAgIHRoaXMucGFyYW1zLnNjYWxlID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2F2ZSB0aGUgZm9jdXNlZCBlbGVtZW50IGJlZm9yZSBkaWFsb2cgd2FzIG9wZW5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzYXZlUHJldmlvdXNseUZvY3VzZWRFbGVtZW50KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudEZvY3VzZWRCZWZvcmVEaWFsb2dXYXNPcGVuZWQgPSB0aGlzLmRvY3VtZW50XHJcbiAgICAgICAgICAgICAgICAuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJhcEZvY3VzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5mb2N1c1RyYXApIHtcclxuICAgICAgICAgICAgdGhpcy5mb2N1c1RyYXAgPSB0aGlzLmZvY3VzVHJhcEZhY3RvcnkuY3JlYXRlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcuYXV0b0ZvY3VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUcmFwLmZvY3VzSW5pdGlhbEVsZW1lbnRXaGVuUmVhZHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXN0b3JlRm9jdXMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdG9Gb2N1cyA9IHRoaXMuZWxlbWVudEZvY3VzZWRCZWZvcmVEaWFsb2dXYXNPcGVuZWQ7XHJcblxyXG4gICAgICAgIC8vIFdlIG5lZWQgdGhlIGV4dHJhIGNoZWNrLCBiZWNhdXNlIElFIGNhbiBzZXQgdGhlIGBhY3RpdmVFbGVtZW50YCB0byBudWxsIGluIHNvbWUgY2FzZXMuXHJcbiAgICAgICAgaWYgKHRvRm9jdXMgJiYgdHlwZW9mIHRvRm9jdXMuZm9jdXMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdG9Gb2N1cy5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNUcmFwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUcmFwLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19