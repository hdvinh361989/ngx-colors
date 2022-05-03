import { NgModule } from "@angular/core";
import { NgxColorsComponent } from "./ngx-colors.component";
import { CommonModule } from "@angular/common";
import { ColorPickerComponent } from "./components/color-picker/color-picker.component";
import { ConverterService } from "./services/converter.service";
import { SliderDirective } from "./directives/slider.directive";
import { PanelComponent } from "./components/panel/panel.component";
import { PanelFactoryService } from "./services/panel-factory.service";
import { NgxColorsTriggerDirective } from "./directives/ngx-colors-trigger.directive";
import * as i0 from "@angular/core";
export class NgxColorsModule {
}
NgxColorsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NgxColorsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxColorsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NgxColorsModule, declarations: [NgxColorsComponent,
        ColorPickerComponent,
        SliderDirective,
        PanelComponent,
        NgxColorsTriggerDirective], imports: [CommonModule], exports: [NgxColorsComponent, NgxColorsTriggerDirective] });
NgxColorsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NgxColorsModule, providers: [ConverterService, PanelFactoryService], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NgxColorsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NgxColorsComponent,
                        ColorPickerComponent,
                        SliderDirective,
                        PanelComponent,
                        NgxColorsTriggerDirective,
                    ],
                    imports: [CommonModule],
                    providers: [ConverterService, PanelFactoryService],
                    exports: [NgxColorsComponent, NgxColorsTriggerDirective],
                    entryComponents: [PanelComponent, ColorPickerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvbG9ycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtY29sb3JzL3NyYy9saWIvbmd4LWNvbG9ycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7QUFldEYsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFYeEIsa0JBQWtCO1FBQ2xCLG9CQUFvQjtRQUNwQixlQUFlO1FBQ2YsY0FBYztRQUNkLHlCQUF5QixhQUVqQixZQUFZLGFBRVosa0JBQWtCLEVBQUUseUJBQXlCOzZHQUc1QyxlQUFlLGFBSmYsQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxZQUR6QyxDQUFDLFlBQVksQ0FBQzsyRkFLWixlQUFlO2tCQWIzQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixrQkFBa0I7d0JBQ2xCLG9CQUFvQjt3QkFDcEIsZUFBZTt3QkFDZixjQUFjO3dCQUNkLHlCQUF5QjtxQkFDMUI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQztvQkFDbEQsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUUseUJBQXlCLENBQUM7b0JBQ3hELGVBQWUsRUFBRSxDQUFDLGNBQWMsRUFBRSxvQkFBb0IsQ0FBQztpQkFDeEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOZ3hDb2xvcnNDb21wb25lbnQgfSBmcm9tIFwiLi9uZ3gtY29sb3JzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgQ29sb3JQaWNrZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2NvbG9yLXBpY2tlci9jb2xvci1waWNrZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDb252ZXJ0ZXJTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvY29udmVydGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNsaWRlckRpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvc2xpZGVyLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgUGFuZWxDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3BhbmVsL3BhbmVsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUGFuZWxGYWN0b3J5U2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL3BhbmVsLWZhY3Rvcnkuc2VydmljZVwiO1xuaW1wb3J0IHsgTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvbmd4LWNvbG9ycy10cmlnZ2VyLmRpcmVjdGl2ZVwiO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ3hDb2xvcnNDb21wb25lbnQsXG4gICAgQ29sb3JQaWNrZXJDb21wb25lbnQsXG4gICAgU2xpZGVyRGlyZWN0aXZlLFxuICAgIFBhbmVsQ29tcG9uZW50LFxuICAgIE5neENvbG9yc1RyaWdnZXJEaXJlY3RpdmUsXG4gIF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtDb252ZXJ0ZXJTZXJ2aWNlLCBQYW5lbEZhY3RvcnlTZXJ2aWNlXSxcbiAgZXhwb3J0czogW05neENvbG9yc0NvbXBvbmVudCwgTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZV0sXG4gIGVudHJ5Q29tcG9uZW50czogW1BhbmVsQ29tcG9uZW50LCBDb2xvclBpY2tlckNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neENvbG9yc01vZHVsZSB7fVxuIl19