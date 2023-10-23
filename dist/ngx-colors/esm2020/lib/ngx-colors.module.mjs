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
NgxColorsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxColorsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsModule, declarations: [NgxColorsComponent,
        ColorPickerComponent,
        SliderDirective,
        PanelComponent,
        NgxColorsTriggerDirective], imports: [CommonModule], exports: [NgxColorsComponent, NgxColorsTriggerDirective] });
NgxColorsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsModule, providers: [ConverterService, PanelFactoryService], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvbG9ycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtY29sb3JzL3NyYy9saWIvbmd4LWNvbG9ycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDeEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7QUFldEYsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFYeEIsa0JBQWtCO1FBQ2xCLG9CQUFvQjtRQUNwQixlQUFlO1FBQ2YsY0FBYztRQUNkLHlCQUF5QixhQUVqQixZQUFZLGFBRVosa0JBQWtCLEVBQUUseUJBQXlCOzZHQUc1QyxlQUFlLGFBSmYsQ0FBQyxnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxZQUR4QyxZQUFZOzJGQUtYLGVBQWU7a0JBYjNCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGtCQUFrQjt3QkFDbEIsb0JBQW9CO3dCQUNwQixlQUFlO3dCQUNmLGNBQWM7d0JBQ2QseUJBQXlCO3FCQUMxQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDO29CQUNsRCxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSx5QkFBeUIsQ0FBQztvQkFDeEQsZUFBZSxFQUFFLENBQUMsY0FBYyxFQUFFLG9CQUFvQixDQUFDO2lCQUN4RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmd4Q29sb3JzQ29tcG9uZW50IH0gZnJvbSBcIi4vbmd4LWNvbG9ycy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBDb2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvY29sb3ItcGlja2VyL2NvbG9yLXBpY2tlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ29udmVydGVyU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2NvbnZlcnRlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNsaWRlckRpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvc2xpZGVyLmRpcmVjdGl2ZVwiO1xyXG5pbXBvcnQgeyBQYW5lbENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFBhbmVsRmFjdG9yeVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9wYW5lbC1mYWN0b3J5LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvbmd4LWNvbG9ycy10cmlnZ2VyLmRpcmVjdGl2ZVwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5neENvbG9yc0NvbXBvbmVudCxcclxuICAgIENvbG9yUGlja2VyQ29tcG9uZW50LFxyXG4gICAgU2xpZGVyRGlyZWN0aXZlLFxyXG4gICAgUGFuZWxDb21wb25lbnQsXHJcbiAgICBOZ3hDb2xvcnNUcmlnZ2VyRGlyZWN0aXZlLFxyXG4gIF0sXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbQ29udmVydGVyU2VydmljZSwgUGFuZWxGYWN0b3J5U2VydmljZV0sXHJcbiAgZXhwb3J0czogW05neENvbG9yc0NvbXBvbmVudCwgTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZV0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbUGFuZWxDb21wb25lbnQsIENvbG9yUGlja2VyQ29tcG9uZW50XSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neENvbG9yc01vZHVsZSB7fVxyXG4iXX0=