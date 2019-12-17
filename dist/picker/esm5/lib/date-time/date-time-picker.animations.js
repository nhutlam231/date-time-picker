/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time-picker.animations
 */
import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
/** @type {?} */
export var owlDateTimePickerAnimations = {
    transformPicker: trigger('transformPicker', [
        state('void', style({ opacity: 0, transform: 'scale(1, 0)' })),
        state('enter', style({ opacity: 1, transform: 'scale(1, 1)' })),
        transition('void => enter', group([
            query('@fadeInPicker', animateChild(), { optional: true }),
            animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
        ])),
        transition('enter => void', animate('100ms linear', style({ opacity: 0 })))
    ]),
    fadeInPicker: trigger('fadeInPicker', [
        state('enter', style({ opacity: 1 })),
        state('void', style({ opacity: 0 })),
        transition('void => enter', animate('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')),
    ])
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLXBpY2tlci5hbmltYXRpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctcGljay1kYXRldGltZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRlLXRpbWUvZGF0ZS10aW1lLXBpY2tlci5hbmltYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxPQUFPLEVBQ0gsT0FBTyxFQUFFLFlBQVksRUFFckIsS0FBSyxFQUNMLEtBQUssRUFDTCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBQ1YsTUFBTSxxQkFBcUIsQ0FBQzs7QUFFN0IsTUFBTSxLQUFPLDJCQUEyQixHQUdwQztJQUVBLGVBQWUsRUFBRSxPQUFPLENBQUMsaUJBQWlCLEVBQUU7UUFDeEMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUMsQ0FBQyxDQUFDO1FBQzVELEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFDLENBQUMsQ0FBQztRQUM3RCxVQUFVLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQztZQUM5QixLQUFLLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQzFELE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQztTQUNwRCxDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztLQUM1RSxDQUFDO0lBRUYsWUFBWSxFQUFFLE9BQU8sQ0FBQyxjQUFjLEVBQUU7UUFDbEMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUNuQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ2xDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7S0FDdkYsQ0FBQztDQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGRhdGUtdGltZS1waWNrZXIuYW5pbWF0aW9uc1xyXG4gKi9cclxuaW1wb3J0IHtcclxuICAgIGFuaW1hdGUsIGFuaW1hdGVDaGlsZCxcclxuICAgIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSxcclxuICAgIGdyb3VwLFxyXG4gICAgcXVlcnksXHJcbiAgICBzdGF0ZSxcclxuICAgIHN0eWxlLFxyXG4gICAgdHJhbnNpdGlvbixcclxuICAgIHRyaWdnZXJcclxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmV4cG9ydCBjb25zdCBvd2xEYXRlVGltZVBpY2tlckFuaW1hdGlvbnM6IHtcclxuICAgIHJlYWRvbmx5IHRyYW5zZm9ybVBpY2tlcjogQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhO1xyXG4gICAgcmVhZG9ubHkgZmFkZUluUGlja2VyOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE7XHJcbn0gPSB7XHJcblxyXG4gICAgdHJhbnNmb3JtUGlja2VyOiB0cmlnZ2VyKCd0cmFuc2Zvcm1QaWNrZXInLCBbXHJcbiAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7b3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMSwgMCknfSkpLFxyXG4gICAgICAgIHN0YXRlKCdlbnRlcicsIHN0eWxlKHtvcGFjaXR5OiAxLCB0cmFuc2Zvcm06ICdzY2FsZSgxLCAxKSd9KSksXHJcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiBlbnRlcicsIGdyb3VwKFtcclxuICAgICAgICAgICAgcXVlcnkoJ0BmYWRlSW5QaWNrZXInLCBhbmltYXRlQ2hpbGQoKSwgeyBvcHRpb25hbDogdHJ1ZSB9KSxcclxuICAgICAgICAgICAgYW5pbWF0ZSgnNDAwbXMgY3ViaWMtYmV6aWVyKDAuMjUsIDAuOCwgMC4yNSwgMSknKVxyXG4gICAgICAgIF0pKSxcclxuICAgICAgICB0cmFuc2l0aW9uKCdlbnRlciA9PiB2b2lkJywgYW5pbWF0ZSgnMTAwbXMgbGluZWFyJywgc3R5bGUoe29wYWNpdHk6IDB9KSkpXHJcbiAgICBdKSxcclxuXHJcbiAgICBmYWRlSW5QaWNrZXI6IHRyaWdnZXIoJ2ZhZGVJblBpY2tlcicsIFtcclxuICAgICAgICBzdGF0ZSgnZW50ZXInLCBzdHlsZSh7b3BhY2l0eTogMX0pKSxcclxuICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtvcGFjaXR5OiAwfSkpLFxyXG4gICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gZW50ZXInLCBhbmltYXRlKCc0MDBtcyAxMDBtcyBjdWJpYy1iZXppZXIoMC41NSwgMCwgMC41NSwgMC4yKScpKSxcclxuICAgIF0pXHJcbn07XHJcbiJdfQ==