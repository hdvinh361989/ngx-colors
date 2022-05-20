import { EventEmitter, Input, Output, Directive, HostListener, forwardRef, } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import * as i0 from "@angular/core";
import * as i1 from "../services/panel-factory.service";
export class NgxColorsTriggerDirective {
    constructor(triggerRef, panelFactory) {
        this.triggerRef = triggerRef;
        this.panelFactory = panelFactory;
        //Main input/output of the color picker
        // @Input() color = '#000000';
        // @Output() colorChange:EventEmitter<string> = new EventEmitter<string>();
        this.color = "";
        //This defines the type of animation for the palatte.(slide-in | popup)
        this.colorsAnimation = "slide-in";
        this.position = "bottom";
        this.attachTo = undefined;
        this.overlayClassName = undefined;
        this.colorPickerControls = "default";
        this.acceptLabel = "ACCEPT";
        this.cancelLabel = "CANCEL";
        // This event is trigger every time the selected color change
        this.change = new EventEmitter();
        // This event is trigger every time the user change the color using the panel
        this.input = new EventEmitter();
        // This event is trigger every time the user change the color using the panel
        this.slider = new EventEmitter();
        this.isDisabled = false;
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    onClick() {
        this.open();
    }
    open() {
        if (!this.isDisabled) {
            this.panelRef = this.panelFactory.createPanel(this.attachTo, this.overlayClassName);
            this.panelRef.instance.iniciate(this, this.triggerRef, this.color, this.palette, this.colorsAnimation, this.format, this.hideTextInput, this.hideColorPicker, this.acceptLabel, this.cancelLabel, this.colorPickerControls, this.position);
        }
    }
    close() {
        this.panelFactory.removePanel();
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
        this.triggerRef.nativeElement.style.opacity = isDisabled ? 0.5 : undefined;
    }
    setColor(color) {
        if (color !== this.color) {
            this.color = color;
            this.change.emit(color);
            this.onChangeCallback(color);
        }
        this.input.emit(color);
    }
    sliderChange(color) {
        this.slider.emit(color);
    }
    writeValue(value) {
        if (value !== this.color) {
            this.color = value;
            this.change.emit(value);
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
NgxColorsTriggerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NgxColorsTriggerDirective, deps: [{ token: i0.ElementRef }, { token: i1.PanelFactoryService }], target: i0.ɵɵFactoryTarget.Directive });
NgxColorsTriggerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.0", type: NgxColorsTriggerDirective, selector: "[ngx-colors-trigger]", inputs: { colorsAnimation: "colorsAnimation", palette: "palette", format: "format", position: "position", hideTextInput: "hideTextInput", hideColorPicker: "hideColorPicker", attachTo: "attachTo", overlayClassName: "overlayClassName", colorPickerControls: "colorPickerControls", acceptLabel: "acceptLabel", cancelLabel: "cancelLabel" }, outputs: { change: "change", input: "input", slider: "slider" }, host: { listeners: { "click": "onClick()" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxColorsTriggerDirective),
            multi: true,
        },
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: NgxColorsTriggerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: "[ngx-colors-trigger]",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxColorsTriggerDirective),
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.PanelFactoryService }]; }, propDecorators: { colorsAnimation: [{
                type: Input
            }], palette: [{
                type: Input
            }], format: [{
                type: Input
            }], position: [{
                type: Input
            }], hideTextInput: [{
                type: Input
            }], hideColorPicker: [{
                type: Input
            }], attachTo: [{
                type: Input
            }], overlayClassName: [{
                type: Input
            }], colorPickerControls: [{
                type: Input
            }], acceptLabel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], change: [{
                type: Output
            }], input: [{
                type: Output
            }], slider: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ["click"]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvbG9ycy10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jb2xvcnMvc3JjL2xpYi9kaXJlY3RpdmVzL25neC1jb2xvcnMtdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFHVCxZQUFZLEVBQ1osVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBYXpFLE1BQU0sT0FBTyx5QkFBeUI7SUFpQ3BDLFlBQ1UsVUFBc0IsRUFDdEIsWUFBaUM7UUFEakMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFsQzNDLHVDQUF1QztRQUN2Qyw4QkFBOEI7UUFDOUIsMkVBQTJFO1FBRTNFLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCx1RUFBdUU7UUFDOUQsb0JBQWUsR0FBeUIsVUFBVSxDQUFDO1FBTW5ELGFBQVEsR0FBcUIsUUFBUSxDQUFDO1FBR3RDLGFBQVEsR0FBdUIsU0FBUyxDQUFDO1FBQ3pDLHFCQUFnQixHQUF1QixTQUFTLENBQUM7UUFDakQsd0JBQW1CLEdBQzFCLFNBQVMsQ0FBQztRQUNILGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQy9CLGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQ3hDLDZEQUE2RDtRQUNuRCxXQUFNLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDcEUsNkVBQTZFO1FBQ25FLFVBQUssR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNuRSw2RUFBNkU7UUFDbkUsV0FBTSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBV3BFLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsc0JBQWlCLEdB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O2lCQUNGO21JQVNVLGVBQWU7c0JBQXZCLEtBQUs7Z0JBR0csT0FBTztzQkFBZixLQUFLO2dCQUVHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBRUcsV0FBVztzQkFBbkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUVJLE1BQU07c0JBQWYsTUFBTTtnQkFFRyxLQUFLO3NCQUFkLE1BQU07Z0JBRUcsTUFBTTtzQkFBZixNQUFNO2dCQUVnQixPQUFPO3NCQUE3QixZQUFZO3VCQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgQ29tcG9uZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIGZvcndhcmRSZWYsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYW5lbEZhY3RvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL3BhbmVsLWZhY3Rvcnkuc2VydmljZVwiO1xuaW1wb3J0IHsgUGFuZWxDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wYW5lbC9wYW5lbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gXCJAYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgTmd4Q29sb3IgfSBmcm9tIFwiLi4vY2xhc2VzL2NvbG9yXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogXCJbbmd4LWNvbG9ycy10cmlnZ2VyXVwiLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neENvbG9yc1RyaWdnZXJEaXJlY3RpdmUpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLy9NYWluIGlucHV0L291dHB1dCBvZiB0aGUgY29sb3IgcGlja2VyXG4gIC8vIEBJbnB1dCgpIGNvbG9yID0gJyMwMDAwMDAnO1xuICAvLyBAT3V0cHV0KCkgY29sb3JDaGFuZ2U6RXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb2xvciA9IFwiXCI7XG5cbiAgLy9UaGlzIGRlZmluZXMgdGhlIHR5cGUgb2YgYW5pbWF0aW9uIGZvciB0aGUgcGFsYXR0ZS4oc2xpZGUtaW4gfCBwb3B1cClcbiAgQElucHV0KCkgY29sb3JzQW5pbWF0aW9uOiBcInNsaWRlLWluXCIgfCBcInBvcHVwXCIgPSBcInNsaWRlLWluXCI7XG5cbiAgLy9UaGlzIGlzIHVzZWQgdG8gc2V0IGEgY3VzdG9tIHBhbGV0dGUgb2YgY29sb3JzIGluIHRoZSBwYW5lbDtcbiAgQElucHV0KCkgcGFsZXR0ZTogQXJyYXk8c3RyaW5nPiB8IEFycmF5PE5neENvbG9yPjtcblxuICBASW5wdXQoKSBmb3JtYXQ6IHN0cmluZztcbiAgQElucHV0KCkgcG9zaXRpb246IFwidG9wXCIgfCBcImJvdHRvbVwiID0gXCJib3R0b21cIjtcbiAgQElucHV0KCkgaGlkZVRleHRJbnB1dDogYm9vbGVhbjtcbiAgQElucHV0KCkgaGlkZUNvbG9yUGlja2VyOiBib29sZWFuO1xuICBASW5wdXQoKSBhdHRhY2hUbzogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBvdmVybGF5Q2xhc3NOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGNvbG9yUGlja2VyQ29udHJvbHM6IFwiZGVmYXVsdFwiIHwgXCJvbmx5LWFscGhhXCIgfCBcIm5vLWFscGhhXCIgPVxuICAgIFwiZGVmYXVsdFwiO1xuICBASW5wdXQoKSBhY2NlcHRMYWJlbDogc3RyaW5nID0gXCJBQ0NFUFRcIjtcbiAgQElucHV0KCkgY2FuY2VsTGFiZWw6IHN0cmluZyA9IFwiQ0FOQ0VMXCI7XG4gIC8vIFRoaXMgZXZlbnQgaXMgdHJpZ2dlciBldmVyeSB0aW1lIHRoZSBzZWxlY3RlZCBjb2xvciBjaGFuZ2VcbiAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgLy8gVGhpcyBldmVudCBpcyB0cmlnZ2VyIGV2ZXJ5IHRpbWUgdGhlIHVzZXIgY2hhbmdlIHRoZSBjb2xvciB1c2luZyB0aGUgcGFuZWxcbiAgQE91dHB1dCgpIGlucHV0OiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAvLyBUaGlzIGV2ZW50IGlzIHRyaWdnZXIgZXZlcnkgdGltZSB0aGUgdXNlciBjaGFuZ2UgdGhlIGNvbG9yIHVzaW5nIHRoZSBwYW5lbFxuICBAT3V0cHV0KCkgc2xpZGVyOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiKSBvbkNsaWNrKCkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdHJpZ2dlclJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHBhbmVsRmFjdG9yeTogUGFuZWxGYWN0b3J5U2VydmljZVxuICApIHt9XG5cbiAgcGFuZWxSZWY6IENvbXBvbmVudFJlZjxQYW5lbENvbXBvbmVudD47XG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgb3BlbigpIHtcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xuICAgICAgdGhpcy5wYW5lbFJlZiA9IHRoaXMucGFuZWxGYWN0b3J5LmNyZWF0ZVBhbmVsKFxuICAgICAgICB0aGlzLmF0dGFjaFRvLFxuICAgICAgICB0aGlzLm92ZXJsYXlDbGFzc05hbWVcbiAgICAgICk7XG4gICAgICB0aGlzLnBhbmVsUmVmLmluc3RhbmNlLmluaWNpYXRlKFxuICAgICAgICB0aGlzLFxuICAgICAgICB0aGlzLnRyaWdnZXJSZWYsXG4gICAgICAgIHRoaXMuY29sb3IsXG4gICAgICAgIHRoaXMucGFsZXR0ZSxcbiAgICAgICAgdGhpcy5jb2xvcnNBbmltYXRpb24sXG4gICAgICAgIHRoaXMuZm9ybWF0LFxuICAgICAgICB0aGlzLmhpZGVUZXh0SW5wdXQsXG4gICAgICAgIHRoaXMuaGlkZUNvbG9yUGlja2VyLFxuICAgICAgICB0aGlzLmFjY2VwdExhYmVsLFxuICAgICAgICB0aGlzLmNhbmNlbExhYmVsLFxuICAgICAgICB0aGlzLmNvbG9yUGlja2VyQ29udHJvbHMsXG4gICAgICAgIHRoaXMucG9zaXRpb25cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNsb3NlKCkge1xuICAgIHRoaXMucGFuZWxGYWN0b3J5LnJlbW92ZVBhbmVsKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pc0Rpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB0aGlzLnRyaWdnZXJSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gaXNEaXNhYmxlZCA/IDAuNSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDb2xvcihjb2xvcikge1xuICAgIGlmIChjb2xvciAhPT0gdGhpcy5jb2xvcikge1xuICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdChjb2xvcik7XG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2soY29sb3IpO1xuICAgIH1cbiAgICB0aGlzLmlucHV0LmVtaXQoY29sb3IpO1xuICB9XG5cbiAgcHVibGljIHNsaWRlckNoYW5nZShjb2xvcikge1xuICAgIHRoaXMuc2xpZGVyLmVtaXQoY29sb3IpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5jb2xvcikge1xuICAgICAgdGhpcy5jb2xvciA9IHZhbHVlO1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG59XG4iXX0=