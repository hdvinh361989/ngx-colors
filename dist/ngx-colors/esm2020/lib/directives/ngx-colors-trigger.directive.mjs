import { EventEmitter, Input, Output, Directive, HostListener, forwardRef, } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import * as i0 from "@angular/core";
import * as i1 from "../services/panel-factory.service";
export class NgxColorsTriggerDirective {
    onClick() {
        this.open();
    }
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
NgxColorsTriggerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsTriggerDirective, deps: [{ token: i0.ElementRef }, { token: i1.PanelFactoryService }], target: i0.ɵɵFactoryTarget.Directive });
NgxColorsTriggerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.1.2", type: NgxColorsTriggerDirective, selector: "[ngx-colors-trigger]", inputs: { colorsAnimation: "colorsAnimation", palette: "palette", format: "format", position: "position", hideTextInput: "hideTextInput", hideColorPicker: "hideColorPicker", attachTo: "attachTo", overlayClassName: "overlayClassName", colorPickerControls: "colorPickerControls", acceptLabel: "acceptLabel", cancelLabel: "cancelLabel" }, outputs: { change: "change", input: "input", slider: "slider" }, host: { listeners: { "click": "onClick()" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxColorsTriggerDirective),
            multi: true,
        },
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: NgxColorsTriggerDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvbG9ycy10cmlnZ2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1jb2xvcnMvc3JjL2xpYi9kaXJlY3RpdmVzL25neC1jb2xvcnMtdHJpZ2dlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFHVCxZQUFZLEVBQ1osVUFBVSxHQUNYLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBYXpFLE1BQU0sT0FBTyx5QkFBeUI7SUE4QmIsT0FBTztRQUM1QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBQ0QsWUFDVSxVQUFzQixFQUN0QixZQUFpQztRQURqQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQWxDM0MsdUNBQXVDO1FBQ3ZDLDhCQUE4QjtRQUM5QiwyRUFBMkU7UUFFM0UsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVYLHVFQUF1RTtRQUM5RCxvQkFBZSxHQUF5QixVQUFVLENBQUM7UUFNbkQsYUFBUSxHQUFxQixRQUFRLENBQUM7UUFHdEMsYUFBUSxHQUErQyxTQUFTLENBQUM7UUFDakUscUJBQWdCLEdBQXVCLFNBQVMsQ0FBQztRQUNqRCx3QkFBbUIsR0FDMUIsU0FBUyxDQUFDO1FBQ0gsZ0JBQVcsR0FBVyxRQUFRLENBQUM7UUFDL0IsZ0JBQVcsR0FBVyxRQUFRLENBQUM7UUFDeEMsNkRBQTZEO1FBQ25ELFdBQU0sR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNwRSw2RUFBNkU7UUFDbkUsVUFBSyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ25FLDZFQUE2RTtRQUNuRSxXQUFNLEdBQXlCLElBQUksWUFBWSxF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QkFDRjttSUFTVSxlQUFlO3NCQUF2QixLQUFLO2dCQUdHLE9BQU87c0JBQWYsS0FBSztnQkFFRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUVHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBRUcsS0FBSztzQkFBZCxNQUFNO2dCQUVHLE1BQU07c0JBQWYsTUFBTTtnQkFFZ0IsT0FBTztzQkFBN0IsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgZm9yd2FyZFJlZixcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBQYW5lbEZhY3RvcnlTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL3BhbmVsLWZhY3Rvcnkuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQYW5lbENvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BhbmVsL3BhbmVsLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgTmd4Q29sb3IgfSBmcm9tIFwiLi4vY2xhc2VzL2NvbG9yXCI7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogXCJbbmd4LWNvbG9ycy10cmlnZ2VyXVwiLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZSksXHJcbiAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuICAvL01haW4gaW5wdXQvb3V0cHV0IG9mIHRoZSBjb2xvciBwaWNrZXJcclxuICAvLyBASW5wdXQoKSBjb2xvciA9ICcjMDAwMDAwJztcclxuICAvLyBAT3V0cHV0KCkgY29sb3JDaGFuZ2U6RXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgY29sb3IgPSBcIlwiO1xyXG5cclxuICAvL1RoaXMgZGVmaW5lcyB0aGUgdHlwZSBvZiBhbmltYXRpb24gZm9yIHRoZSBwYWxhdHRlLihzbGlkZS1pbiB8IHBvcHVwKVxyXG4gIEBJbnB1dCgpIGNvbG9yc0FuaW1hdGlvbjogXCJzbGlkZS1pblwiIHwgXCJwb3B1cFwiID0gXCJzbGlkZS1pblwiO1xyXG5cclxuICAvL1RoaXMgaXMgdXNlZCB0byBzZXQgYSBjdXN0b20gcGFsZXR0ZSBvZiBjb2xvcnMgaW4gdGhlIHBhbmVsO1xyXG4gIEBJbnB1dCgpIHBhbGV0dGU6IEFycmF5PHN0cmluZz4gfCBBcnJheTxOZ3hDb2xvcj47XHJcblxyXG4gIEBJbnB1dCgpIGZvcm1hdDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBvc2l0aW9uOiBcInRvcFwiIHwgXCJib3R0b21cIiA9IFwiYm90dG9tXCI7XHJcbiAgQElucHV0KCkgaGlkZVRleHRJbnB1dDogYm9vbGVhbjtcclxuICBASW5wdXQoKSBoaWRlQ29sb3JQaWNrZXI6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgYXR0YWNoVG86IHN0cmluZyB8IEhUTUxFbGVtZW50IHwgRWxlbWVudCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICBASW5wdXQoKSBvdmVybGF5Q2xhc3NOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgQElucHV0KCkgY29sb3JQaWNrZXJDb250cm9sczogXCJkZWZhdWx0XCIgfCBcIm9ubHktYWxwaGFcIiB8IFwibm8tYWxwaGFcIiA9XHJcbiAgICBcImRlZmF1bHRcIjtcclxuICBASW5wdXQoKSBhY2NlcHRMYWJlbDogc3RyaW5nID0gXCJBQ0NFUFRcIjtcclxuICBASW5wdXQoKSBjYW5jZWxMYWJlbDogc3RyaW5nID0gXCJDQU5DRUxcIjtcclxuICAvLyBUaGlzIGV2ZW50IGlzIHRyaWdnZXIgZXZlcnkgdGltZSB0aGUgc2VsZWN0ZWQgY29sb3IgY2hhbmdlXHJcbiAgQE91dHB1dCgpIGNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAvLyBUaGlzIGV2ZW50IGlzIHRyaWdnZXIgZXZlcnkgdGltZSB0aGUgdXNlciBjaGFuZ2UgdGhlIGNvbG9yIHVzaW5nIHRoZSBwYW5lbFxyXG4gIEBPdXRwdXQoKSBpbnB1dDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAvLyBUaGlzIGV2ZW50IGlzIHRyaWdnZXIgZXZlcnkgdGltZSB0aGUgdXNlciBjaGFuZ2UgdGhlIGNvbG9yIHVzaW5nIHRoZSBwYW5lbFxyXG4gIEBPdXRwdXQoKSBzbGlkZXI6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoXCJjbGlja1wiKSBvbkNsaWNrKCkge1xyXG4gICAgdGhpcy5vcGVuKCk7XHJcbiAgfVxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB0cmlnZ2VyUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBwYW5lbEZhY3Rvcnk6IFBhbmVsRmFjdG9yeVNlcnZpY2VcclxuICApIHt9XHJcblxyXG4gIHBhbmVsUmVmOiBDb21wb25lbnRSZWY8UGFuZWxDb21wb25lbnQ+O1xyXG4gIGlzRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcclxuICBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XHJcblxyXG4gIG9wZW4oKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNEaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLnBhbmVsUmVmID0gdGhpcy5wYW5lbEZhY3RvcnkuY3JlYXRlUGFuZWwoXHJcbiAgICAgICAgdGhpcy5hdHRhY2hUbyxcclxuICAgICAgICB0aGlzLm92ZXJsYXlDbGFzc05hbWVcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5wYW5lbFJlZi5pbnN0YW5jZS5pbmljaWF0ZShcclxuICAgICAgICB0aGlzLFxyXG4gICAgICAgIHRoaXMudHJpZ2dlclJlZixcclxuICAgICAgICB0aGlzLmNvbG9yLFxyXG4gICAgICAgIHRoaXMucGFsZXR0ZSxcclxuICAgICAgICB0aGlzLmNvbG9yc0FuaW1hdGlvbixcclxuICAgICAgICB0aGlzLmZvcm1hdCxcclxuICAgICAgICB0aGlzLmhpZGVUZXh0SW5wdXQsXHJcbiAgICAgICAgdGhpcy5oaWRlQ29sb3JQaWNrZXIsXHJcbiAgICAgICAgdGhpcy5hY2NlcHRMYWJlbCxcclxuICAgICAgICB0aGlzLmNhbmNlbExhYmVsLFxyXG4gICAgICAgIHRoaXMuY29sb3JQaWNrZXJDb250cm9scyxcclxuICAgICAgICB0aGlzLnBvc2l0aW9uXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICB0aGlzLnBhbmVsRmFjdG9yeS5yZW1vdmVQYW5lbCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5pc0Rpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIHRoaXMudHJpZ2dlclJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBpc0Rpc2FibGVkID8gMC41IDogdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldENvbG9yKGNvbG9yKSB7XHJcbiAgICBpZiAoY29sb3IgIT09IHRoaXMuY29sb3IpIHtcclxuICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgICB0aGlzLmNoYW5nZS5lbWl0KGNvbG9yKTtcclxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKGNvbG9yKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5wdXQuZW1pdChjb2xvcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2xpZGVyQ2hhbmdlKGNvbG9yKSB7XHJcbiAgICB0aGlzLnNsaWRlci5lbWl0KGNvbG9yKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5jb2xvcikge1xyXG4gICAgICB0aGlzLmNvbG9yID0gdmFsdWU7XHJcbiAgICAgIHRoaXMuY2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcclxuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcclxuICB9XHJcbn1cclxuIl19