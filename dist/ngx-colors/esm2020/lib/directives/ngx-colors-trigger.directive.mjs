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
        this.writeValue(color);
        this.input.emit(color);
    }
    sliderChange(color) {
        this.slider.emit(color);
    }
    get value() {
        return this.color;
    }
    set value(value) {
        this.setColor(value);
        this.onChangeCallback(value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvbG9ycy10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jb2xvcnMvc3JjL2xpYi9kaXJlY3RpdmVzL25neC1jb2xvcnMtdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFHVCxZQUFZLEVBQ1osVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBYXpFLE1BQU0sT0FBTyx5QkFBeUI7SUFpQ3BDLFlBQ1UsVUFBc0IsRUFDdEIsWUFBaUM7UUFEakMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFsQzNDLHVDQUF1QztRQUN2Qyw4QkFBOEI7UUFDOUIsMkVBQTJFO1FBRTNFLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCx1RUFBdUU7UUFDOUQsb0JBQWUsR0FBeUIsVUFBVSxDQUFDO1FBTW5ELGFBQVEsR0FBcUIsUUFBUSxDQUFDO1FBR3RDLGFBQVEsR0FBdUIsU0FBUyxDQUFDO1FBQ3pDLHFCQUFnQixHQUF1QixTQUFTLENBQUM7UUFDakQsd0JBQW1CLEdBQzFCLFNBQVMsQ0FBQztRQUNILGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQy9CLGdCQUFXLEdBQVcsUUFBUSxDQUFDO1FBQ3hDLDZEQUE2RDtRQUNuRCxXQUFNLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDcEUsNkVBQTZFO1FBQ25FLFVBQUssR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNuRSw2RUFBNkU7UUFDbkUsV0FBTSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBV3BFLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsc0JBQWlCLEdB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MEIsQ0FBQzs0QkFDeEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7bUlBU1UsZUFBZTtzQkFBdkIsS0FBSztnQkFHRyxPQUFPO3NCQUFmLEtBQUs7Z0JBRUcsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNO2dCQUVHLEtBQUs7c0JBQWQsTUFBTTtnQkFFRyxNQUFNO3NCQUFmLE1BQU07Z0JBRWdCLE9BQU87c0JBQTdCLFlBQVk7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBDb21wb25lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgZm9yd2FyZFJlZixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFBhbmVsRmFjdG9yeVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvcGFuZWwtZmFjdG9yeS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQYW5lbENvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BhbmVsL3BhbmVsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBOZ3hDb2xvciB9IGZyb20gXCIuLi9jbGFzZXMvY29sb3JcIjtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBcIltuZ3gtY29sb3JzLXRyaWdnZXJdXCIsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZSksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hDb2xvcnNUcmlnZ2VyRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAvL01haW4gaW5wdXQvb3V0cHV0IG9mIHRoZSBjb2xvciBwaWNrZXJcbiAgLy8gQElucHV0KCkgY29sb3IgPSAnIzAwMDAwMCc7XG4gIC8vIEBPdXRwdXQoKSBjb2xvckNoYW5nZTpFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbG9yID0gXCJcIjtcblxuICAvL1RoaXMgZGVmaW5lcyB0aGUgdHlwZSBvZiBhbmltYXRpb24gZm9yIHRoZSBwYWxhdHRlLihzbGlkZS1pbiB8IHBvcHVwKVxuICBASW5wdXQoKSBjb2xvcnNBbmltYXRpb246IFwic2xpZGUtaW5cIiB8IFwicG9wdXBcIiA9IFwic2xpZGUtaW5cIjtcblxuICAvL1RoaXMgaXMgdXNlZCB0byBzZXQgYSBjdXN0b20gcGFsZXR0ZSBvZiBjb2xvcnMgaW4gdGhlIHBhbmVsO1xuICBASW5wdXQoKSBwYWxldHRlOiBBcnJheTxzdHJpbmc+IHwgQXJyYXk8Tmd4Q29sb3I+O1xuXG4gIEBJbnB1dCgpIGZvcm1hdDogc3RyaW5nO1xuICBASW5wdXQoKSBwb3NpdGlvbjogXCJ0b3BcIiB8IFwiYm90dG9tXCIgPSBcImJvdHRvbVwiO1xuICBASW5wdXQoKSBoaWRlVGV4dElucHV0OiBib29sZWFuO1xuICBASW5wdXQoKSBoaWRlQ29sb3JQaWNrZXI6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGF0dGFjaFRvOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG92ZXJsYXlDbGFzc05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgY29sb3JQaWNrZXJDb250cm9sczogXCJkZWZhdWx0XCIgfCBcIm9ubHktYWxwaGFcIiB8IFwibm8tYWxwaGFcIiA9XG4gICAgXCJkZWZhdWx0XCI7XG4gIEBJbnB1dCgpIGFjY2VwdExhYmVsOiBzdHJpbmcgPSBcIkFDQ0VQVFwiO1xuICBASW5wdXQoKSBjYW5jZWxMYWJlbDogc3RyaW5nID0gXCJDQU5DRUxcIjtcbiAgLy8gVGhpcyBldmVudCBpcyB0cmlnZ2VyIGV2ZXJ5IHRpbWUgdGhlIHNlbGVjdGVkIGNvbG9yIGNoYW5nZVxuICBAT3V0cHV0KCkgY2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAvLyBUaGlzIGV2ZW50IGlzIHRyaWdnZXIgZXZlcnkgdGltZSB0aGUgdXNlciBjaGFuZ2UgdGhlIGNvbG9yIHVzaW5nIHRoZSBwYW5lbFxuICBAT3V0cHV0KCkgaW5wdXQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIC8vIFRoaXMgZXZlbnQgaXMgdHJpZ2dlciBldmVyeSB0aW1lIHRoZSB1c2VyIGNoYW5nZSB0aGUgY29sb3IgdXNpbmcgdGhlIHBhbmVsXG4gIEBPdXRwdXQoKSBzbGlkZXI6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIpIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0cmlnZ2VyUmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcGFuZWxGYWN0b3J5OiBQYW5lbEZhY3RvcnlTZXJ2aWNlXG4gICkge31cblxuICBwYW5lbFJlZjogQ29tcG9uZW50UmVmPFBhbmVsQ29tcG9uZW50PjtcbiAgaXNEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBvcGVuKCkge1xuICAgIGlmICghdGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLnBhbmVsUmVmID0gdGhpcy5wYW5lbEZhY3RvcnkuY3JlYXRlUGFuZWwoXG4gICAgICAgIHRoaXMuYXR0YWNoVG8sXG4gICAgICAgIHRoaXMub3ZlcmxheUNsYXNzTmFtZVxuICAgICAgKTtcbiAgICAgIHRoaXMucGFuZWxSZWYuaW5zdGFuY2UuaW5pY2lhdGUoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHRoaXMudHJpZ2dlclJlZixcbiAgICAgICAgdGhpcy5jb2xvcixcbiAgICAgICAgdGhpcy5wYWxldHRlLFxuICAgICAgICB0aGlzLmNvbG9yc0FuaW1hdGlvbixcbiAgICAgICAgdGhpcy5mb3JtYXQsXG4gICAgICAgIHRoaXMuaGlkZVRleHRJbnB1dCxcbiAgICAgICAgdGhpcy5oaWRlQ29sb3JQaWNrZXIsXG4gICAgICAgIHRoaXMuYWNjZXB0TGFiZWwsXG4gICAgICAgIHRoaXMuY2FuY2VsTGFiZWwsXG4gICAgICAgIHRoaXMuY29sb3JQaWNrZXJDb250cm9scyxcbiAgICAgICAgdGhpcy5wb3NpdGlvblxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgdGhpcy5wYW5lbEZhY3RvcnkucmVtb3ZlUGFuZWwoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmlzRGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIHRoaXMudHJpZ2dlclJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBpc0Rpc2FibGVkID8gMC41IDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVibGljIHNldENvbG9yKGNvbG9yKSB7XG4gICAgdGhpcy53cml0ZVZhbHVlKGNvbG9yKTtcbiAgICB0aGlzLmlucHV0LmVtaXQoY29sb3IpO1xuICB9XG5cbiAgcHVibGljIHNsaWRlckNoYW5nZShjb2xvcikge1xuICAgIHRoaXMuc2xpZGVyLmVtaXQoY29sb3IpO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3I7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuc2V0Q29sb3IodmFsdWUpO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmNvbG9yKSB7XG4gICAgICB0aGlzLmNvbG9yID0gdmFsdWU7XG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cbn1cbiJdfQ==