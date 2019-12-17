/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * native-date-time.module
 */
import { NgModule } from '@angular/core';
import { PlatformModule } from '@angular/cdk/platform';
import { DateTimeAdapter } from './date-time-adapter.class';
import { NativeDateTimeAdapter } from './native-date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS } from './date-time-format.class';
import { OWL_NATIVE_DATE_TIME_FORMATS } from './native-date-time-format.class';
var NativeDateTimeModule = /** @class */ (function () {
    function NativeDateTimeModule() {
    }
    NativeDateTimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [PlatformModule],
                    providers: [
                        { provide: DateTimeAdapter, useClass: NativeDateTimeAdapter },
                    ],
                },] }
    ];
    return NativeDateTimeModule;
}());
export { NativeDateTimeModule };
var ɵ0 = OWL_NATIVE_DATE_TIME_FORMATS;
var OwlNativeDateTimeModule = /** @class */ (function () {
    function OwlNativeDateTimeModule() {
    }
    OwlNativeDateTimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [NativeDateTimeModule],
                    providers: [{ provide: OWL_DATE_TIME_FORMATS, useValue: ɵ0 }],
                },] }
    ];
    return OwlNativeDateTimeModule;
}());
export { OwlNativeDateTimeModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtdGltZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1waWNrLWRhdGV0aW1lLyIsInNvdXJjZXMiOlsibGliL2RhdGUtdGltZS9hZGFwdGVyL25hdGl2ZS1kYXRlLXRpbWUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDekUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFL0U7SUFBQTtJQU9BLENBQUM7O2dCQVBBLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7b0JBQ3pCLFNBQVMsRUFBRTt3QkFDUCxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFDO3FCQUM5RDtpQkFDSjs7SUFFRCwyQkFBQztDQUFBLEFBUEQsSUFPQztTQURZLG9CQUFvQjtTQUswQiw0QkFBNEI7QUFGdkY7SUFBQTtJQUtBLENBQUM7O2dCQUxBLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDL0IsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxJQUE4QixFQUFDLENBQUM7aUJBQ3hGOztJQUVELDhCQUFDO0NBQUEsQUFMRCxJQUtDO1NBRFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIG5hdGl2ZS1kYXRlLXRpbWUubW9kdWxlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBEYXRlVGltZUFkYXB0ZXIgfSBmcm9tICcuL2RhdGUtdGltZS1hZGFwdGVyLmNsYXNzJztcclxuaW1wb3J0IHsgTmF0aXZlRGF0ZVRpbWVBZGFwdGVyIH0gZnJvbSAnLi9uYXRpdmUtZGF0ZS10aW1lLWFkYXB0ZXIuY2xhc3MnO1xyXG5pbXBvcnQgeyBPV0xfREFURV9USU1FX0ZPUk1BVFMgfSBmcm9tICcuL2RhdGUtdGltZS1mb3JtYXQuY2xhc3MnO1xyXG5pbXBvcnQgeyBPV0xfTkFUSVZFX0RBVEVfVElNRV9GT1JNQVRTIH0gZnJvbSAnLi9uYXRpdmUtZGF0ZS10aW1lLWZvcm1hdC5jbGFzcyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1BsYXRmb3JtTW9kdWxlXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHtwcm92aWRlOiBEYXRlVGltZUFkYXB0ZXIsIHVzZUNsYXNzOiBOYXRpdmVEYXRlVGltZUFkYXB0ZXJ9LFxyXG4gICAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5hdGl2ZURhdGVUaW1lTW9kdWxlIHtcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtOYXRpdmVEYXRlVGltZU1vZHVsZV0sXHJcbiAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogT1dMX0RBVEVfVElNRV9GT1JNQVRTLCB1c2VWYWx1ZTogT1dMX05BVElWRV9EQVRFX1RJTUVfRk9STUFUU31dLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgT3dsTmF0aXZlRGF0ZVRpbWVNb2R1bGUge1xyXG59XHJcbiJdfQ==