/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * date-time.module
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { OwlDateTimeTriggerDirective } from './date-time-picker-trigger.directive';
import { OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER, OwlDateTimeComponent } from './date-time-picker.component';
import { OwlDateTimeContainerComponent } from './date-time-picker-container.component';
import { OwlDateTimeInputDirective } from './date-time-picker-input.directive';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { OwlMonthViewComponent } from './calendar-month-view.component';
import { OwlCalendarBodyComponent } from './calendar-body.component';
import { OwlYearViewComponent } from './calendar-year-view.component';
import { OwlMultiYearViewComponent } from './calendar-multi-year-view.component';
import { OwlTimerBoxComponent } from './timer-box.component';
import { OwlTimerComponent } from './timer.component';
import { NumberFixedLenPipe } from './numberedFixLen.pipe';
import { OwlCalendarComponent } from './calendar.component';
import { OwlDateTimeInlineComponent } from './date-time-inline.component';
import { OwlDialogModule } from '../dialog/dialog.module';
export class OwlDateTimeModule {
}
OwlDateTimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, OverlayModule, OwlDialogModule, A11yModule],
                exports: [
                    OwlCalendarComponent,
                    OwlTimerComponent,
                    OwlDateTimeTriggerDirective,
                    OwlDateTimeInputDirective,
                    OwlDateTimeComponent,
                    OwlDateTimeInlineComponent,
                    OwlMultiYearViewComponent,
                    OwlYearViewComponent,
                    OwlMonthViewComponent,
                ],
                declarations: [
                    OwlDateTimeTriggerDirective,
                    OwlDateTimeInputDirective,
                    OwlDateTimeComponent,
                    OwlDateTimeContainerComponent,
                    OwlMultiYearViewComponent,
                    OwlYearViewComponent,
                    OwlMonthViewComponent,
                    OwlTimerComponent,
                    OwlTimerBoxComponent,
                    OwlCalendarComponent,
                    OwlCalendarBodyComponent,
                    NumberFixedLenPipe,
                    OwlDateTimeInlineComponent,
                ],
                providers: [
                    OwlDateTimeIntl,
                    OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER,
                ],
                entryComponents: [
                    OwlDateTimeContainerComponent,
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10aW1lLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXBpY2stZGF0ZXRpbWUvIiwic291cmNlcyI6WyJsaWIvZGF0ZS10aW1lL2RhdGUtdGltZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDbkYsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDM0csT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdkYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDL0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQXNDMUQsTUFBTSxPQUFPLGlCQUFpQjs7O1lBcEM3QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsVUFBVSxDQUFDO2dCQUNuRSxPQUFPLEVBQUU7b0JBQ0wsb0JBQW9CO29CQUNwQixpQkFBaUI7b0JBQ2pCLDJCQUEyQjtvQkFDM0IseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLDBCQUEwQjtvQkFDMUIseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLHFCQUFxQjtpQkFDeEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLDJCQUEyQjtvQkFDM0IseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLDZCQUE2QjtvQkFDN0IseUJBQXlCO29CQUN6QixvQkFBb0I7b0JBQ3BCLHFCQUFxQjtvQkFDckIsaUJBQWlCO29CQUNqQixvQkFBb0I7b0JBQ3BCLG9CQUFvQjtvQkFDcEIsd0JBQXdCO29CQUN4QixrQkFBa0I7b0JBQ2xCLDBCQUEwQjtpQkFDN0I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLGVBQWU7b0JBQ2YscUNBQXFDO2lCQUN4QztnQkFDRCxlQUFlLEVBQUU7b0JBQ2IsNkJBQTZCO2lCQUNoQzthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGRhdGUtdGltZS5tb2R1bGVcclxuICovXHJcblxyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xyXG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xyXG5pbXBvcnQgeyBPd2xEYXRlVGltZVRyaWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItdHJpZ2dlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBPV0xfRFRQSUNLRVJfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSLCBPd2xEYXRlVGltZUNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1jb250YWluZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbnB1dERpcmVjdGl2ZSB9IGZyb20gJy4vZGF0ZS10aW1lLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBPd2xEYXRlVGltZUludGwgfSBmcm9tICcuL2RhdGUtdGltZS1waWNrZXItaW50bC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgT3dsTW9udGhWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE93bENhbGVuZGFyQm9keUNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPd2xZZWFyVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIteWVhci12aWV3LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE93bE11bHRpWWVhclZpZXdDb21wb25lbnQgfSBmcm9tICcuL2NhbGVuZGFyLW11bHRpLXllYXItdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBPd2xUaW1lckJveENvbXBvbmVudCB9IGZyb20gJy4vdGltZXItYm94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE93bFRpbWVyQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOdW1iZXJGaXhlZExlblBpcGUgfSBmcm9tICcuL251bWJlcmVkRml4TGVuLnBpcGUnO1xyXG5pbXBvcnQgeyBPd2xDYWxlbmRhckNvbXBvbmVudCB9IGZyb20gJy4vY2FsZW5kYXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgT3dsRGF0ZVRpbWVJbmxpbmVDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtdGltZS1pbmxpbmUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgT3dsRGlhbG9nTW9kdWxlIH0gZnJvbSAnLi4vZGlhbG9nL2RpYWxvZy5tb2R1bGUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE93bERpYWxvZ01vZHVsZSwgQTExeU1vZHVsZV0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgT3dsQ2FsZW5kYXJDb21wb25lbnQsXHJcbiAgICAgICAgT3dsVGltZXJDb21wb25lbnQsXHJcbiAgICAgICAgT3dsRGF0ZVRpbWVUcmlnZ2VyRGlyZWN0aXZlLFxyXG4gICAgICAgIE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmUsXHJcbiAgICAgICAgT3dsRGF0ZVRpbWVDb21wb25lbnQsXHJcbiAgICAgICAgT3dsRGF0ZVRpbWVJbmxpbmVDb21wb25lbnQsXHJcbiAgICAgICAgT3dsTXVsdGlZZWFyVmlld0NvbXBvbmVudCxcclxuICAgICAgICBPd2xZZWFyVmlld0NvbXBvbmVudCxcclxuICAgICAgICBPd2xNb250aFZpZXdDb21wb25lbnQsXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgT3dsRGF0ZVRpbWVUcmlnZ2VyRGlyZWN0aXZlLFxyXG4gICAgICAgIE93bERhdGVUaW1lSW5wdXREaXJlY3RpdmUsXHJcbiAgICAgICAgT3dsRGF0ZVRpbWVDb21wb25lbnQsXHJcbiAgICAgICAgT3dsRGF0ZVRpbWVDb250YWluZXJDb21wb25lbnQsXHJcbiAgICAgICAgT3dsTXVsdGlZZWFyVmlld0NvbXBvbmVudCxcclxuICAgICAgICBPd2xZZWFyVmlld0NvbXBvbmVudCxcclxuICAgICAgICBPd2xNb250aFZpZXdDb21wb25lbnQsXHJcbiAgICAgICAgT3dsVGltZXJDb21wb25lbnQsXHJcbiAgICAgICAgT3dsVGltZXJCb3hDb21wb25lbnQsXHJcbiAgICAgICAgT3dsQ2FsZW5kYXJDb21wb25lbnQsXHJcbiAgICAgICAgT3dsQ2FsZW5kYXJCb2R5Q29tcG9uZW50LFxyXG4gICAgICAgIE51bWJlckZpeGVkTGVuUGlwZSxcclxuICAgICAgICBPd2xEYXRlVGltZUlubGluZUNvbXBvbmVudCxcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBPd2xEYXRlVGltZUludGwsXHJcbiAgICAgICAgT1dMX0RUUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9QUk9WSURFUixcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgICAgICBPd2xEYXRlVGltZUNvbnRhaW5lckNvbXBvbmVudCxcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE93bERhdGVUaW1lTW9kdWxlIHtcclxufVxyXG4iXX0=