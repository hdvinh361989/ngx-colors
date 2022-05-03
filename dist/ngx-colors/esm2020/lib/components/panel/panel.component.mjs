import { Component, ViewChild, HostListener, HostBinding, } from "@angular/core";
import { trigger, transition, query, style, stagger, animate, keyframes, } from "@angular/animations";
import { ColorFormats } from "../../enums/formats";
import { defaultColors } from "../../helpers/default-colors";
import { formats } from "../../helpers/formats";
import { Hsva } from "../../clases/formats";
import { NgxColor } from "../../clases/color";
import * as i0 from "@angular/core";
import * as i1 from "../../services/converter.service";
import * as i2 from "../color-picker/color-picker.component";
import * as i3 from "@angular/common";
export class PanelComponent {
    constructor(service, cdr) {
        this.service = service;
        this.cdr = cdr;
        this.color = "#000000";
        this.previewColor = "#000000";
        this.hsva = new Hsva(0, 1, 1, 1);
        this.colorsAnimationEffect = "slide-in";
        this.palette = defaultColors;
        this.variants = [];
        this.colorFormats = formats;
        this.format = ColorFormats.HEX;
        this.canChangeFormat = true;
        this.menu = 1;
        this.hideColorPicker = false;
        this.hideTextInput = false;
        this.colorPickerControls = "default";
    }
    click(event) {
        if (this.isOutside(event)) {
            // this.emitClose("cancel");
        }
    }
    onScroll(event) {
        this.onScreenMovement();
    }
    onResize() {
        this.onScreenMovement();
    }
    ngOnInit() {
        this.setPosition();
        this.hsva = this.service.stringToHsva(this.color);
        this.indexSeleccionado = this.findIndexSelectedColor(this.palette);
    }
    ngAfterViewInit() {
        this.setPositionY();
    }
    onScreenMovement() {
        this.setPosition();
        this.setPositionY();
        if (!this.panelRef.nativeElement.style.transition) {
            this.panelRef.nativeElement.style.transition = "transform 0.5s ease-out";
        }
    }
    findIndexSelectedColor(colors) {
        let resultIndex = undefined;
        if (this.color) {
            for (let i = 0; i < colors.length; i++) {
                const color = colors[i];
                if (typeof color == "string") {
                    if (this.service.stringToFormat(this.color, ColorFormats.HEX) ==
                        this.service.stringToFormat(color, ColorFormats.HEX)) {
                        resultIndex = i;
                    }
                }
                else {
                    if (this.findIndexSelectedColor(color.variants) != undefined) {
                        resultIndex = i;
                    }
                }
            }
        }
        return resultIndex;
    }
    iniciate(triggerInstance, triggerElementRef, color, palette, animation, format, hideTextInput, hideColorPicker, acceptLabel, cancelLabel, colorPickerControls, position) {
        this.colorPickerControls = colorPickerControls;
        this.triggerInstance = triggerInstance;
        this.TriggerBBox = triggerElementRef;
        this.color = color;
        this.hideColorPicker = hideColorPicker;
        this.hideTextInput = hideTextInput;
        this.acceptLabel = acceptLabel;
        this.cancelLabel = cancelLabel;
        if (format) {
            if (formats.includes(format)) {
                this.format = formats.indexOf(format.toLowerCase());
                this.canChangeFormat = false;
                if (this.service.getFormatByString(this.color) != format.toLowerCase()) {
                    this.setColorFromHsva(this.service.stringToHsva(this.color));
                }
            }
            else {
                console.error("Format provided is invalid, using HEX");
                this.format = ColorFormats.HEX;
            }
        }
        else {
            this.format = formats.indexOf(this.service.getFormatByString(this.color));
        }
        this.previewColor = this.color;
        this.palette = palette ?? defaultColors;
        this.colorsAnimationEffect = animation;
        if (position == "top") {
            let TriggerBBox = this.TriggerBBox.nativeElement.getBoundingClientRect();
            this.positionString =
                "transform: translateY(calc( -100% - " + TriggerBBox.height + "px ))";
        }
    }
    setPosition() {
        if (this.TriggerBBox) {
            var viewportOffset = this.TriggerBBox.nativeElement.getBoundingClientRect();
            this.top = viewportOffset.top + viewportOffset.height;
            this.left =
                viewportOffset.left + 250 > window.innerWidth
                    ? viewportOffset.right - 250
                    : viewportOffset.left;
        }
    }
    setPositionY() {
        var triggerBBox = this.TriggerBBox.nativeElement.getBoundingClientRect();
        var panelBBox = this.panelRef.nativeElement.getBoundingClientRect();
        var panelHeight = panelBBox.height;
        //Check for space above the trigger
        if (0 > panelBBox.top - 5) {
            this.positionString = "";
        }
        //Check for space below the trigger
        if (panelHeight > window.innerHeight - (panelBBox.top - 5)) {
            //there is no space, move panel over the trigger
            this.positionString =
                "transform: translateY(calc( -100% - " + triggerBBox.height + "px ));";
        }
        this.cdr.detectChanges();
    }
    hasVariant(color) {
        if (!this.previewColor) {
            return false;
        }
        return (typeof color != "string" &&
            color.variants.some((v) => v.toUpperCase() == this.previewColor.toUpperCase()));
    }
    isSelected(color) {
        if (!this.previewColor) {
            return false;
        }
        return (typeof color == "string" &&
            color.toUpperCase() == this.previewColor.toUpperCase());
    }
    getBackgroundColor(color) {
        if (typeof color == "string") {
            return { background: color };
        }
        else {
            return { background: color?.preview };
        }
    }
    onAlphaChange(event) {
        this.palette = this.ChangeAlphaOnPalette(event, this.palette);
    }
    ChangeAlphaOnPalette(alpha, colors) {
        const result = [];
        for (let i = 0; i < colors.length; i++) {
            const color = colors[i];
            if (typeof color == "string") {
                const newColor = this.service.stringToHsva(color);
                newColor.onAlphaChange(alpha);
                result.push(this.service.toFormat(newColor, this.format));
            }
            else {
                const newColor = new NgxColor();
                const newColorPreview = this.service.stringToHsva(color.preview);
                newColorPreview.onAlphaChange(alpha);
                newColor.preview = this.service.toFormat(newColorPreview, this.format);
                newColor.variants = this.ChangeAlphaOnPalette(alpha, color.variants);
                result.push(newColor);
            }
        }
        return result;
    }
    /**
     * Change color from default colors
     * @param string color
     */
    changeColor(color) {
        this.setColorFromString(color);
        this.menu = 1;
    }
    onChangeColorPicker(event) {
        this.temporalColor = event;
        this.color = this.service.toFormat(event, this.format);
        this.triggerInstance.sliderChange(this.service.toFormat(event, this.format));
    }
    changeColorManual(color) {
        this.setColorFromString(color);
    }
    setColorFromHsva(value) {
        this.hsva = value;
        this.color = this.service.toFormat(value, this.format);
        this.previewColor = this.service.hsvaToRgba(value).toString();
    }
    setColorFromString(color) {
        this.hsva = this.service.stringToHsva(color);
        this.color = color;
        this.previewColor = color;
    }
    onColorClick(color) {
        if (typeof color === 'string') {
            this.changeColor(color);
        }
        else {
            this.variants = color.variants;
            this.menu = 2;
        }
    }
    nextFormat() {
        if (this.canChangeFormat) {
            this.format = (this.format + 1) % this.colorFormats.length;
            this.setColorFromHsva(this.hsva);
        }
    }
    close() {
        this.triggerInstance.close();
    }
    accept() {
        this.triggerInstance.setColor(this.color);
        this.triggerInstance.close();
    }
    onClickBack() {
        if (this.menu == 3) {
            this.color = this.backupColor;
            this.hsva = this.service.stringToHsva(this.color);
        }
        this.indexSeleccionado = this.findIndexSelectedColor(this.palette);
        this.menu = 1;
    }
    isOutside(event) {
        return event.target.classList.contains("ngx-colors-overlay");
    }
    onOpenedScroll($event) {
        console.log('on scroll');
        $event.stopPropagation();
    }
}
PanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PanelComponent, deps: [{ token: i1.ConverterService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.0", type: PanelComponent, selector: "ngx-colors-panel", host: { listeners: { "document:mousedown": "click($event)", "document:scroll": "onScroll($event)", "window:resize": "onResize()" }, properties: { "style.top.px": "this.top", "style.left.px": "this.left" } }, viewQueries: [{ propertyName: "panelRef", first: true, predicate: ["dialog"], descendants: true }], ngImport: i0, template: "<div class=\"opened\" [style]=\"positionString\" (scroll)=\"onOpenedScroll($event)\" #dialog>\n  <section class=\"main-content-container\">\n    <article class=\"left\">\n      <!--Menu 1-->\n      <ng-container *ngIf=\"menu == 1\">\n        <!--Color list-->\n        <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\n          <ng-container *ngFor=\"let color of palette; let i = index\">\n            <div class=\"circle wrapper color\">\n              <div\n                (click)=\"onColorClick(color)\"\n                class=\"circle color circle-border\"\n                [ngStyle]=\"getBackgroundColor(color)\"\n              >\n                <div *ngIf=\"i == this.indexSeleccionado\" class=\"selected\"></div>\n              </div>\n            </div>\n          </ng-container>\n        </div>\n      </ng-container>\n\n      <!--Menu 2: Variants of selected color-->\n      <ng-container *ngIf=\"menu == 2\">\n        <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\n          <div class=\"circle wrapper\">\n            <div (click)=\"onClickBack()\" class=\"add\">\n              <svg\n                xmlns=\"http://www.w3.org/2000/svg\"\n                width=\"24\"\n                height=\"24\"\n                viewBox=\"0 0 24 24\"\n              >\n                <path d=\"M0 0h24v24H0z\" fill=\"none\" />\n                <path\n                  d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"\n                />\n              </svg>\n            </div>\n          </div>\n\n          <ng-container *ngFor=\"let variant of variants\">\n            <div class=\"circle wrapper color\">\n              <div\n                (click)=\"changeColor(variant)\"\n                class=\"circle circle-border\"\n                [ngStyle]=\"{ background: variant }\"\n              >\n                <div *ngIf=\"isSelected(variant)\" class=\"selected\"></div>\n              </div>\n            </div>\n          </ng-container>\n        </div>\n      </ng-container>\n    </article>\n\n    <article class=\"right\">\n      <div class=\"color-picker-wrapper\" *ngIf=\"!hideColorPicker && this.colorPickerControls != 'only-alpha'\">\n        <!-- <span [(colorPicker)]=\"color\"></span> -->\n        <color-picker\n          [controls]=\"colorPickerControls\"\n          [color]=\"hsva\"\n          (sliderChange)=\"onChangeColorPicker($event)\"\n        ></color-picker>\n      </div>\n      <color-picker\n        *ngIf=\"!hideColorPicker && this.colorPickerControls == 'only-alpha'\"\n        [controls]=\"colorPickerControls\"\n        [color]=\"hsva\"\n        (colorChange)=\"onChangeColorPicker($event)\"\n        (onAlphaChange)=\"onAlphaChange($event)\"\n      ></color-picker>\n    </article>\n  </section>\n\n  <!--Format & Manual input-->\n  <div class=\"manual-input-wrapper\" *ngIf=\"!hideTextInput\">\n    <p (click)=\"nextFormat()\">{{ colorFormats[format] }}</p>\n    <div class=\"g-input\">\n      <input\n        placeholder=\"#FFFFFF\"\n        type=\"text\"\n        [value]=\"color\"\n        [style.font-size.px]=\"color && color.length > 23 ? 9 : 10\"\n        [style.letter-spacing.px]=\"color && color.length > 16 ? 0 : 1.5\"\n        (keyup)=\"changeColorManual(paintInput.value)\"\n        (keydown.enter)=\"accept()\"\n        #paintInput\n      />\n    </div>\n  </div>\n\n  <div class=\"nav-wrapper\">\n    <button (click)=\"close()\" style=\"float: right\">\n      {{ cancelLabel }}\n    </button>\n    <button (click)=\"accept()\" style=\"float: right\">\n      {{ acceptLabel }}\n    </button>\n  </div>\n</div>\n", styles: [":host{position:fixed;z-index:2001}.hidden{display:none}.button{display:flex;align-items:center;justify-content:center}.top{transform:translateY(-100%)}.opened{box-sizing:border-box;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background:#fff;width:420px;border-radius:5px;position:absolute}.opened button{border:none;font-family:inherit;font-size:12px;background-color:unset;-webkit-user-select:none;user-select:none;padding:10px;letter-spacing:1px;color:#222;border-radius:3px;line-height:20px}.opened button:hover,.opened .button:hover{background-color:#0000000d;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1);transition-property:opacity,background-color;transition-duration:.2s,.2s;transition-timing-function:cubic-bezier(.35,0,.25,1),cubic-bezier(.35,0,.25,1);transition-delay:0s,0s}.opened button:focus{outline:none}.opened .colors{display:flex;flex-wrap:wrap;align-items:center;margin:15px}.opened .colors .circle{height:34px;width:34px;box-sizing:border-box;border-radius:100%;cursor:pointer}.opened .colors .circle .add{font-size:20px;line-height:45px;text-align:center}.opened .colors .circle .selected{border:2px solid white;border-radius:100%;height:28px;width:28px;box-sizing:border-box;margin:2px}.opened .colors .circle.wrapper{margin:0 5px 5px;flex:34px 0 0}.opened .colors .circle.button{margin:0 5px 5px}.opened .colors .circle.wrapper.color{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.opened .colors .circle-border{border:1px solid rgba(0,0,0,.03)}.opened .color-picker-wrapper{margin:16px 16px 0 0}.opened .nav-wrapper{overflow:hidden;padding:8px 16px}.opened .nav-wrapper .round-button{padding:5px 0;width:40px;height:40px;box-sizing:border-box;border-radius:100%;text-align:center;line-height:45px}.opened .manual-input-wrapper{display:flex;margin:15px;font-family:sans-serif}.opened .manual-input-wrapper p{margin:0;text-align:center;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;line-height:48px;width:145px;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.opened .manual-input-wrapper .g-input{border:1px solid #e8ebed;height:45px;border-radius:5px;width:100%}.opened .manual-input-wrapper .g-input input{font-size:9px;border:none;width:100%;text-transform:uppercase;outline:none;text-align:center;letter-spacing:1px;color:#595b65;height:100%;border-radius:5px;margin:0;padding:0}.main-content-container{display:flex;max-height:250px;overflow:auto}\n"], components: [{ type: i2.ColorPickerComponent, selector: "color-picker", inputs: ["color", "controls"], outputs: ["sliderChange", "onAlphaChange"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
        trigger("colorsAnimation", [
            transition("void => slide-in", [
                // Initially all colors are hidden
                query(":enter", style({ opacity: 0 }), { optional: true }),
                //slide-in animation
                query(":enter", stagger("10ms", [
                    animate(".3s ease-in", keyframes([
                        style({ opacity: 0, transform: "translatex(-50%)", offset: 0 }),
                        style({
                            opacity: 0.5,
                            transform: "translatex(-10px) scale(1.1)",
                            offset: 0.3,
                        }),
                        style({ opacity: 1, transform: "translatex(0)", offset: 1 }),
                    ])),
                ]), { optional: true }),
            ]),
            //popup animation
            transition("void => popup", [
                query(":enter", style({ opacity: 0, transform: "scale(0)" }), {
                    optional: true,
                }),
                query(":enter", stagger("10ms", [
                    animate("500ms ease-out", keyframes([
                        style({ opacity: 0.5, transform: "scale(.5)", offset: 0.3 }),
                        style({ opacity: 1, transform: "scale(1.1)", offset: 0.8 }),
                        style({ opacity: 1, transform: "scale(1)", offset: 1 }),
                    ])),
                ]), { optional: true }),
            ]),
        ]),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PanelComponent, decorators: [{
            type: Component,
            args: [{ selector: "ngx-colors-panel", animations: [
                        trigger("colorsAnimation", [
                            transition("void => slide-in", [
                                // Initially all colors are hidden
                                query(":enter", style({ opacity: 0 }), { optional: true }),
                                //slide-in animation
                                query(":enter", stagger("10ms", [
                                    animate(".3s ease-in", keyframes([
                                        style({ opacity: 0, transform: "translatex(-50%)", offset: 0 }),
                                        style({
                                            opacity: 0.5,
                                            transform: "translatex(-10px) scale(1.1)",
                                            offset: 0.3,
                                        }),
                                        style({ opacity: 1, transform: "translatex(0)", offset: 1 }),
                                    ])),
                                ]), { optional: true }),
                            ]),
                            //popup animation
                            transition("void => popup", [
                                query(":enter", style({ opacity: 0, transform: "scale(0)" }), {
                                    optional: true,
                                }),
                                query(":enter", stagger("10ms", [
                                    animate("500ms ease-out", keyframes([
                                        style({ opacity: 0.5, transform: "scale(.5)", offset: 0.3 }),
                                        style({ opacity: 1, transform: "scale(1.1)", offset: 0.8 }),
                                        style({ opacity: 1, transform: "scale(1)", offset: 1 }),
                                    ])),
                                ]), { optional: true }),
                            ]),
                        ]),
                    ], template: "<div class=\"opened\" [style]=\"positionString\" (scroll)=\"onOpenedScroll($event)\" #dialog>\n  <section class=\"main-content-container\">\n    <article class=\"left\">\n      <!--Menu 1-->\n      <ng-container *ngIf=\"menu == 1\">\n        <!--Color list-->\n        <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\n          <ng-container *ngFor=\"let color of palette; let i = index\">\n            <div class=\"circle wrapper color\">\n              <div\n                (click)=\"onColorClick(color)\"\n                class=\"circle color circle-border\"\n                [ngStyle]=\"getBackgroundColor(color)\"\n              >\n                <div *ngIf=\"i == this.indexSeleccionado\" class=\"selected\"></div>\n              </div>\n            </div>\n          </ng-container>\n        </div>\n      </ng-container>\n\n      <!--Menu 2: Variants of selected color-->\n      <ng-container *ngIf=\"menu == 2\">\n        <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\n          <div class=\"circle wrapper\">\n            <div (click)=\"onClickBack()\" class=\"add\">\n              <svg\n                xmlns=\"http://www.w3.org/2000/svg\"\n                width=\"24\"\n                height=\"24\"\n                viewBox=\"0 0 24 24\"\n              >\n                <path d=\"M0 0h24v24H0z\" fill=\"none\" />\n                <path\n                  d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"\n                />\n              </svg>\n            </div>\n          </div>\n\n          <ng-container *ngFor=\"let variant of variants\">\n            <div class=\"circle wrapper color\">\n              <div\n                (click)=\"changeColor(variant)\"\n                class=\"circle circle-border\"\n                [ngStyle]=\"{ background: variant }\"\n              >\n                <div *ngIf=\"isSelected(variant)\" class=\"selected\"></div>\n              </div>\n            </div>\n          </ng-container>\n        </div>\n      </ng-container>\n    </article>\n\n    <article class=\"right\">\n      <div class=\"color-picker-wrapper\" *ngIf=\"!hideColorPicker && this.colorPickerControls != 'only-alpha'\">\n        <!-- <span [(colorPicker)]=\"color\"></span> -->\n        <color-picker\n          [controls]=\"colorPickerControls\"\n          [color]=\"hsva\"\n          (sliderChange)=\"onChangeColorPicker($event)\"\n        ></color-picker>\n      </div>\n      <color-picker\n        *ngIf=\"!hideColorPicker && this.colorPickerControls == 'only-alpha'\"\n        [controls]=\"colorPickerControls\"\n        [color]=\"hsva\"\n        (colorChange)=\"onChangeColorPicker($event)\"\n        (onAlphaChange)=\"onAlphaChange($event)\"\n      ></color-picker>\n    </article>\n  </section>\n\n  <!--Format & Manual input-->\n  <div class=\"manual-input-wrapper\" *ngIf=\"!hideTextInput\">\n    <p (click)=\"nextFormat()\">{{ colorFormats[format] }}</p>\n    <div class=\"g-input\">\n      <input\n        placeholder=\"#FFFFFF\"\n        type=\"text\"\n        [value]=\"color\"\n        [style.font-size.px]=\"color && color.length > 23 ? 9 : 10\"\n        [style.letter-spacing.px]=\"color && color.length > 16 ? 0 : 1.5\"\n        (keyup)=\"changeColorManual(paintInput.value)\"\n        (keydown.enter)=\"accept()\"\n        #paintInput\n      />\n    </div>\n  </div>\n\n  <div class=\"nav-wrapper\">\n    <button (click)=\"close()\" style=\"float: right\">\n      {{ cancelLabel }}\n    </button>\n    <button (click)=\"accept()\" style=\"float: right\">\n      {{ acceptLabel }}\n    </button>\n  </div>\n</div>\n", styles: [":host{position:fixed;z-index:2001}.hidden{display:none}.button{display:flex;align-items:center;justify-content:center}.top{transform:translateY(-100%)}.opened{box-sizing:border-box;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background:#fff;width:420px;border-radius:5px;position:absolute}.opened button{border:none;font-family:inherit;font-size:12px;background-color:unset;-webkit-user-select:none;user-select:none;padding:10px;letter-spacing:1px;color:#222;border-radius:3px;line-height:20px}.opened button:hover,.opened .button:hover{background-color:#0000000d;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1);transition-property:opacity,background-color;transition-duration:.2s,.2s;transition-timing-function:cubic-bezier(.35,0,.25,1),cubic-bezier(.35,0,.25,1);transition-delay:0s,0s}.opened button:focus{outline:none}.opened .colors{display:flex;flex-wrap:wrap;align-items:center;margin:15px}.opened .colors .circle{height:34px;width:34px;box-sizing:border-box;border-radius:100%;cursor:pointer}.opened .colors .circle .add{font-size:20px;line-height:45px;text-align:center}.opened .colors .circle .selected{border:2px solid white;border-radius:100%;height:28px;width:28px;box-sizing:border-box;margin:2px}.opened .colors .circle.wrapper{margin:0 5px 5px;flex:34px 0 0}.opened .colors .circle.button{margin:0 5px 5px}.opened .colors .circle.wrapper.color{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.opened .colors .circle-border{border:1px solid rgba(0,0,0,.03)}.opened .color-picker-wrapper{margin:16px 16px 0 0}.opened .nav-wrapper{overflow:hidden;padding:8px 16px}.opened .nav-wrapper .round-button{padding:5px 0;width:40px;height:40px;box-sizing:border-box;border-radius:100%;text-align:center;line-height:45px}.opened .manual-input-wrapper{display:flex;margin:15px;font-family:sans-serif}.opened .manual-input-wrapper p{margin:0;text-align:center;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;line-height:48px;width:145px;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.opened .manual-input-wrapper .g-input{border:1px solid #e8ebed;height:45px;border-radius:5px;width:100%}.opened .manual-input-wrapper .g-input input{font-size:9px;border:none;width:100%;text-transform:uppercase;outline:none;text-align:center;letter-spacing:1px;color:#595b65;height:100%;border-radius:5px;margin:0;padding:0}.main-content-container{display:flex;max-height:250px;overflow:auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { click: [{
                type: HostListener,
                args: ["document:mousedown", ["$event"]]
            }], onScroll: [{
                type: HostListener,
                args: ["document:scroll", ['$event']]
            }], onResize: [{
                type: HostListener,
                args: ["window:resize"]
            }], top: [{
                type: HostBinding,
                args: ["style.top.px"]
            }], left: [{
                type: HostBinding,
                args: ["style.left.px"]
            }], panelRef: [{
                type: ViewChild,
                args: ["dialog"]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNvbG9ycy9zcmMvbGliL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNvbG9ycy9zcmMvbGliL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFNVCxTQUFTLEVBRVQsWUFBWSxFQUNaLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsT0FBTyxFQUNQLFVBQVUsRUFDVixLQUFLLEVBQ0wsS0FBSyxFQUNMLE9BQU8sRUFDUCxPQUFPLEVBQ1AsU0FBUyxHQUNWLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRWpELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFOUMsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7QUFzRDVDLE1BQU0sT0FBTyxjQUFjO0lBc0J6QixZQUNTLE9BQXlCLEVBQ3hCLEdBQXNCO1FBRHZCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBSWhDLFVBQUssR0FBRyxTQUFTLENBQUM7UUFFWCxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUNqQyxTQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFNUIsMEJBQXFC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O3FCQUNIO3VJQUlELEtBQUs7c0JBREosWUFBWTt1QkFBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFROUMsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLGlCQUFpQixFQUFFLENBQUMsUUFBUSxDQUFDO2dCQU0zQyxRQUFRO3NCQURQLFlBQVk7dUJBQUMsZUFBZTtnQkFLTyxHQUFHO3NCQUF0QyxXQUFXO3VCQUFDLGNBQWM7Z0JBQ1UsSUFBSTtzQkFBeEMsV0FBVzt1QkFBQyxlQUFlO2dCQUNQLFFBQVE7c0JBQTVCLFNBQVM7dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSG9zdEJpbmRpbmcsXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICB0cmlnZ2VyLFxuICB0cmFuc2l0aW9uLFxuICBxdWVyeSxcbiAgc3R5bGUsXG4gIHN0YWdnZXIsXG4gIGFuaW1hdGUsXG4gIGtleWZyYW1lcyxcbn0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcbmltcG9ydCB7aXNEZXNjZW5kYW50T3JTYW1lfSBmcm9tIFwiLi4vLi4vaGVscGVycy9oZWxwZXJzXCI7XG5pbXBvcnQge0NvbG9yRm9ybWF0c30gZnJvbSBcIi4uLy4uL2VudW1zL2Zvcm1hdHNcIjtcbmltcG9ydCB7Q29udmVydGVyU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvbnZlcnRlci5zZXJ2aWNlXCI7XG5pbXBvcnQge2RlZmF1bHRDb2xvcnN9IGZyb20gXCIuLi8uLi9oZWxwZXJzL2RlZmF1bHQtY29sb3JzXCI7XG5pbXBvcnQge2Zvcm1hdHN9IGZyb20gXCIuLi8uLi9oZWxwZXJzL2Zvcm1hdHNcIjtcbmltcG9ydCB7Tmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZX0gZnJvbSBcIi4uLy4uL2RpcmVjdGl2ZXMvbmd4LWNvbG9ycy10cmlnZ2VyLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtIc3ZhfSBmcm9tIFwiLi4vLi4vY2xhc2VzL2Zvcm1hdHNcIjtcbmltcG9ydCB7Tmd4Q29sb3J9IGZyb20gXCIuLi8uLi9jbGFzZXMvY29sb3JcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIm5neC1jb2xvcnMtcGFuZWxcIixcbiAgdGVtcGxhdGVVcmw6IFwiLi9wYW5lbC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcIi4vcGFuZWwuY29tcG9uZW50LnNjc3NcIl0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKFwiY29sb3JzQW5pbWF0aW9uXCIsIFtcbiAgICAgIHRyYW5zaXRpb24oXCJ2b2lkID0+IHNsaWRlLWluXCIsIFtcbiAgICAgICAgLy8gSW5pdGlhbGx5IGFsbCBjb2xvcnMgYXJlIGhpZGRlblxuICAgICAgICBxdWVyeShcIjplbnRlclwiLCBzdHlsZSh7b3BhY2l0eTogMH0pLCB7b3B0aW9uYWw6IHRydWV9KSxcbiAgICAgICAgLy9zbGlkZS1pbiBhbmltYXRpb25cbiAgICAgICAgcXVlcnkoXG4gICAgICAgICAgXCI6ZW50ZXJcIixcbiAgICAgICAgICBzdGFnZ2VyKFwiMTBtc1wiLCBbXG4gICAgICAgICAgICBhbmltYXRlKFxuICAgICAgICAgICAgICBcIi4zcyBlYXNlLWluXCIsXG4gICAgICAgICAgICAgIGtleWZyYW1lcyhbXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGV4KC01MCUpXCIsIG9mZnNldDogMH0pLFxuICAgICAgICAgICAgICAgIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNSxcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGV4KC0xMHB4KSBzY2FsZSgxLjEpXCIsXG4gICAgICAgICAgICAgICAgICBvZmZzZXQ6IDAuMyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZXgoMClcIiwgb2Zmc2V0OiAxfSksXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgIF0pLFxuICAgICAgICAgIHtvcHRpb25hbDogdHJ1ZX1cbiAgICAgICAgKSxcbiAgICAgIF0pLFxuICAgICAgLy9wb3B1cCBhbmltYXRpb25cbiAgICAgIHRyYW5zaXRpb24oXCJ2b2lkID0+IHBvcHVwXCIsIFtcbiAgICAgICAgcXVlcnkoXCI6ZW50ZXJcIiwgc3R5bGUoe29wYWNpdHk6IDAsIHRyYW5zZm9ybTogXCJzY2FsZSgwKVwifSksIHtcbiAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIHF1ZXJ5KFxuICAgICAgICAgIFwiOmVudGVyXCIsXG4gICAgICAgICAgc3RhZ2dlcihcIjEwbXNcIiwgW1xuICAgICAgICAgICAgYW5pbWF0ZShcbiAgICAgICAgICAgICAgXCI1MDBtcyBlYXNlLW91dFwiLFxuICAgICAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLjUsIHRyYW5zZm9ybTogXCJzY2FsZSguNSlcIiwgb2Zmc2V0OiAwLjN9KSxcbiAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiBcInNjYWxlKDEuMSlcIiwgb2Zmc2V0OiAwLjh9KSxcbiAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMSwgdHJhbnNmb3JtOiBcInNjYWxlKDEpXCIsIG9mZnNldDogMX0pLFxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICBdKSxcbiAgICAgICAgICB7b3B0aW9uYWw6IHRydWV9XG4gICAgICAgICksXG4gICAgICBdKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASG9zdExpc3RlbmVyKFwiZG9jdW1lbnQ6bW91c2Vkb3duXCIsIFtcIiRldmVudFwiXSlcbiAgY2xpY2soZXZlbnQpIHtcbiAgICBpZiAodGhpcy5pc091dHNpZGUoZXZlbnQpKSB7XG4gICAgICAvLyB0aGlzLmVtaXRDbG9zZShcImNhbmNlbFwiKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKFwiZG9jdW1lbnQ6c2Nyb2xsXCIsIFsnJGV2ZW50J10pXG4gIG9uU2Nyb2xsKGV2ZW50KSB7XG4gICAgdGhpcy5vblNjcmVlbk1vdmVtZW50KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKFwid2luZG93OnJlc2l6ZVwiKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLm9uU2NyZWVuTW92ZW1lbnQoKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZyhcInN0eWxlLnRvcC5weFwiKSBwdWJsaWMgdG9wOiBudW1iZXI7XG4gIEBIb3N0QmluZGluZyhcInN0eWxlLmxlZnQucHhcIikgcHVibGljIGxlZnQ6IG51bWJlcjtcbiAgQFZpZXdDaGlsZChcImRpYWxvZ1wiKSBwYW5lbFJlZjogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgc2VydmljZTogQ29udmVydGVyU2VydmljZSxcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gIH1cblxuICBjb2xvciA9IFwiIzAwMDAwMFwiO1xuXG4gIHB1YmxpYyBwcmV2aWV3Q29sb3I6IHN0cmluZyA9IFwiIzAwMDAwMFwiO1xuICBwdWJsaWMgaHN2YSA9IG5ldyBIc3ZhKDAsIDEsIDEsIDEpO1xuXG4gIHB1YmxpYyBjb2xvcnNBbmltYXRpb25FZmZlY3QgPSBcInNsaWRlLWluXCI7XG5cbiAgcHVibGljIHBhbGV0dGUgPSBkZWZhdWx0Q29sb3JzO1xuICBwdWJsaWMgdmFyaWFudHMgPSBbXTtcblxuICBwdWJsaWMgY29sb3JGb3JtYXRzID0gZm9ybWF0cztcbiAgcHVibGljIGZvcm1hdDogQ29sb3JGb3JtYXRzID0gQ29sb3JGb3JtYXRzLkhFWDtcblxuICBwdWJsaWMgY2FuQ2hhbmdlRm9ybWF0OiBib29sZWFuID0gdHJ1ZTtcblxuICBwdWJsaWMgbWVudSA9IDE7XG5cbiAgcHVibGljIGhpZGVDb2xvclBpY2tlcjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgaGlkZVRleHRJbnB1dDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgYWNjZXB0TGFiZWw6IHN0cmluZztcbiAgcHVibGljIGNhbmNlbExhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBjb2xvclBpY2tlckNvbnRyb2xzOiBcImRlZmF1bHRcIiB8IFwib25seS1hbHBoYVwiIHwgXCJuby1hbHBoYVwiID0gXCJkZWZhdWx0XCI7XG4gIHByaXZhdGUgdHJpZ2dlckluc3RhbmNlOiBOZ3hDb2xvcnNUcmlnZ2VyRGlyZWN0aXZlO1xuICBwcml2YXRlIFRyaWdnZXJCQm94O1xuICBwdWJsaWMgaXNTZWxlY3RlZENvbG9ySW5QYWxldHRlOiBib29sZWFuO1xuICBwdWJsaWMgaW5kZXhTZWxlY2Npb25hZG87XG4gIHB1YmxpYyBwb3NpdGlvblN0cmluZztcbiAgcHVibGljIHRlbXBvcmFsQ29sb3I7XG4gIHB1YmxpYyBiYWNrdXBDb2xvcjtcblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXRQb3NpdGlvbigpO1xuICAgIHRoaXMuaHN2YSA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEodGhpcy5jb2xvcik7XG4gICAgdGhpcy5pbmRleFNlbGVjY2lvbmFkbyA9IHRoaXMuZmluZEluZGV4U2VsZWN0ZWRDb2xvcih0aGlzLnBhbGV0dGUpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uWSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblNjcmVlbk1vdmVtZW50KCkge1xuICAgIHRoaXMuc2V0UG9zaXRpb24oKTtcbiAgICB0aGlzLnNldFBvc2l0aW9uWSgpO1xuICAgIGlmICghdGhpcy5wYW5lbFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zaXRpb24pIHtcbiAgICAgIHRoaXMucGFuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gXCJ0cmFuc2Zvcm0gMC41cyBlYXNlLW91dFwiO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZEluZGV4U2VsZWN0ZWRDb2xvcihjb2xvcnMpOiBudW1iZXIge1xuICAgIGxldCByZXN1bHRJbmRleCA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5jb2xvcikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY29sb3IgPSBjb2xvcnNbaV07XG4gICAgICAgIGlmICh0eXBlb2YgY29sb3IgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5zdHJpbmdUb0Zvcm1hdCh0aGlzLmNvbG9yLCBDb2xvckZvcm1hdHMuSEVYKSA9PVxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnN0cmluZ1RvRm9ybWF0KGNvbG9yLCBDb2xvckZvcm1hdHMuSEVYKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcmVzdWx0SW5kZXggPSBpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5maW5kSW5kZXhTZWxlY3RlZENvbG9yKGNvbG9yLnZhcmlhbnRzKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc3VsdEluZGV4ID0gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdEluZGV4O1xuICB9XG5cbiAgcHVibGljIGluaWNpYXRlKFxuICAgIHRyaWdnZXJJbnN0YW5jZTogTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZSxcbiAgICB0cmlnZ2VyRWxlbWVudFJlZixcbiAgICBjb2xvcixcbiAgICBwYWxldHRlLFxuICAgIGFuaW1hdGlvbixcbiAgICBmb3JtYXQ6IHN0cmluZyxcbiAgICBoaWRlVGV4dElucHV0OiBib29sZWFuLFxuICAgIGhpZGVDb2xvclBpY2tlcjogYm9vbGVhbixcbiAgICBhY2NlcHRMYWJlbDogc3RyaW5nLFxuICAgIGNhbmNlbExhYmVsOiBzdHJpbmcsXG4gICAgY29sb3JQaWNrZXJDb250cm9sczogXCJkZWZhdWx0XCIgfCBcIm9ubHktYWxwaGFcIiB8IFwibm8tYWxwaGFcIixcbiAgICBwb3NpdGlvbjogXCJ0b3BcIiB8IFwiYm90dG9tXCJcbiAgKSB7XG4gICAgdGhpcy5jb2xvclBpY2tlckNvbnRyb2xzID0gY29sb3JQaWNrZXJDb250cm9scztcbiAgICB0aGlzLnRyaWdnZXJJbnN0YW5jZSA9IHRyaWdnZXJJbnN0YW5jZTtcbiAgICB0aGlzLlRyaWdnZXJCQm94ID0gdHJpZ2dlckVsZW1lbnRSZWY7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuaGlkZUNvbG9yUGlja2VyID0gaGlkZUNvbG9yUGlja2VyO1xuICAgIHRoaXMuaGlkZVRleHRJbnB1dCA9IGhpZGVUZXh0SW5wdXQ7XG4gICAgdGhpcy5hY2NlcHRMYWJlbCA9IGFjY2VwdExhYmVsO1xuICAgIHRoaXMuY2FuY2VsTGFiZWwgPSBjYW5jZWxMYWJlbDtcbiAgICBpZiAoZm9ybWF0KSB7XG4gICAgICBpZiAoZm9ybWF0cy5pbmNsdWRlcyhmb3JtYXQpKSB7XG4gICAgICAgIHRoaXMuZm9ybWF0ID0gZm9ybWF0cy5pbmRleE9mKGZvcm1hdC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgdGhpcy5jYW5DaGFuZ2VGb3JtYXQgPSBmYWxzZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuc2VydmljZS5nZXRGb3JtYXRCeVN0cmluZyh0aGlzLmNvbG9yKSAhPSBmb3JtYXQudG9Mb3dlckNhc2UoKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLnNldENvbG9yRnJvbUhzdmEodGhpcy5zZXJ2aWNlLnN0cmluZ1RvSHN2YSh0aGlzLmNvbG9yKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGb3JtYXQgcHJvdmlkZWQgaXMgaW52YWxpZCwgdXNpbmcgSEVYXCIpO1xuICAgICAgICB0aGlzLmZvcm1hdCA9IENvbG9yRm9ybWF0cy5IRVg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybWF0ID0gZm9ybWF0cy5pbmRleE9mKHRoaXMuc2VydmljZS5nZXRGb3JtYXRCeVN0cmluZyh0aGlzLmNvbG9yKSk7XG4gICAgfVxuXG4gICAgdGhpcy5wcmV2aWV3Q29sb3IgPSB0aGlzLmNvbG9yO1xuICAgIHRoaXMucGFsZXR0ZSA9IHBhbGV0dGUgPz8gZGVmYXVsdENvbG9ycztcbiAgICB0aGlzLmNvbG9yc0FuaW1hdGlvbkVmZmVjdCA9IGFuaW1hdGlvbjtcbiAgICBpZiAocG9zaXRpb24gPT0gXCJ0b3BcIikge1xuICAgICAgbGV0IFRyaWdnZXJCQm94ID0gdGhpcy5UcmlnZ2VyQkJveC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGhpcy5wb3NpdGlvblN0cmluZyA9XG4gICAgICAgIFwidHJhbnNmb3JtOiB0cmFuc2xhdGVZKGNhbGMoIC0xMDAlIC0gXCIgKyBUcmlnZ2VyQkJveC5oZWlnaHQgKyBcInB4ICkpXCI7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldFBvc2l0aW9uKCkge1xuICAgIGlmICh0aGlzLlRyaWdnZXJCQm94KSB7XG4gICAgICB2YXIgdmlld3BvcnRPZmZzZXQgPVxuICAgICAgICB0aGlzLlRyaWdnZXJCQm94Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB0aGlzLnRvcCA9IHZpZXdwb3J0T2Zmc2V0LnRvcCArIHZpZXdwb3J0T2Zmc2V0LmhlaWdodDtcbiAgICAgIHRoaXMubGVmdCA9XG4gICAgICAgIHZpZXdwb3J0T2Zmc2V0LmxlZnQgKyAyNTAgPiB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICAgID8gdmlld3BvcnRPZmZzZXQucmlnaHQgLSAyNTBcbiAgICAgICAgICA6IHZpZXdwb3J0T2Zmc2V0LmxlZnQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRQb3NpdGlvblkoKSB7XG4gICAgdmFyIHRyaWdnZXJCQm94ID0gdGhpcy5UcmlnZ2VyQkJveC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBwYW5lbEJCb3ggPSB0aGlzLnBhbmVsUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdmFyIHBhbmVsSGVpZ2h0ID0gcGFuZWxCQm94LmhlaWdodDtcblxuICAgIC8vQ2hlY2sgZm9yIHNwYWNlIGFib3ZlIHRoZSB0cmlnZ2VyXG4gICAgaWYgKDAgPiBwYW5lbEJCb3gudG9wIC0gNSkge1xuICAgICAgdGhpcy5wb3NpdGlvblN0cmluZyA9IFwiXCI7XG4gICAgfVxuICAgIC8vQ2hlY2sgZm9yIHNwYWNlIGJlbG93IHRoZSB0cmlnZ2VyXG4gICAgaWYgKHBhbmVsSGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0IC0gKHBhbmVsQkJveC50b3AgLSA1KSkge1xuICAgICAgLy90aGVyZSBpcyBubyBzcGFjZSwgbW92ZSBwYW5lbCBvdmVyIHRoZSB0cmlnZ2VyXG4gICAgICB0aGlzLnBvc2l0aW9uU3RyaW5nID1cbiAgICAgICAgXCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoY2FsYyggLTEwMCUgLSBcIiArIHRyaWdnZXJCQm94LmhlaWdodCArIFwicHggKSk7XCI7XG4gICAgfVxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNWYXJpYW50KGNvbG9yKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLnByZXZpZXdDb2xvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgdHlwZW9mIGNvbG9yICE9IFwic3RyaW5nXCIgJiZcbiAgICAgIGNvbG9yLnZhcmlhbnRzLnNvbWUoXG4gICAgICAgICh2KSA9PiB2LnRvVXBwZXJDYXNlKCkgPT0gdGhpcy5wcmV2aWV3Q29sb3IudG9VcHBlckNhc2UoKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgaXNTZWxlY3RlZChjb2xvcikge1xuICAgIGlmICghdGhpcy5wcmV2aWV3Q29sb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiBjb2xvciA9PSBcInN0cmluZ1wiICYmXG4gICAgICBjb2xvci50b1VwcGVyQ2FzZSgpID09IHRoaXMucHJldmlld0NvbG9yLnRvVXBwZXJDYXNlKClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdldEJhY2tncm91bmRDb2xvcihjb2xvcikge1xuICAgIGlmICh0eXBlb2YgY29sb3IgPT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHtiYWNrZ3JvdW5kOiBjb2xvcn07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7YmFja2dyb3VuZDogY29sb3I/LnByZXZpZXd9O1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkFscGhhQ2hhbmdlKGV2ZW50KSB7XG4gICAgdGhpcy5wYWxldHRlID0gdGhpcy5DaGFuZ2VBbHBoYU9uUGFsZXR0ZShldmVudCwgdGhpcy5wYWxldHRlKTtcbiAgfVxuXG4gIHByaXZhdGUgQ2hhbmdlQWxwaGFPblBhbGV0dGUoXG4gICAgYWxwaGEsXG4gICAgY29sb3JzOiBBcnJheTxzdHJpbmcgfCBOZ3hDb2xvcj5cbiAgKTogQXJyYXk8YW55PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2xvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW2ldO1xuICAgICAgaWYgKHR5cGVvZiBjb2xvciA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbnN0IG5ld0NvbG9yID0gdGhpcy5zZXJ2aWNlLnN0cmluZ1RvSHN2YShjb2xvcik7XG4gICAgICAgIG5ld0NvbG9yLm9uQWxwaGFDaGFuZ2UoYWxwaGEpO1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLnNlcnZpY2UudG9Gb3JtYXQobmV3Q29sb3IsIHRoaXMuZm9ybWF0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBuZXdDb2xvciA9IG5ldyBOZ3hDb2xvcigpO1xuICAgICAgICBjb25zdCBuZXdDb2xvclByZXZpZXcgPSB0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Ic3ZhKGNvbG9yLnByZXZpZXcpO1xuICAgICAgICBuZXdDb2xvclByZXZpZXcub25BbHBoYUNoYW5nZShhbHBoYSk7XG4gICAgICAgIG5ld0NvbG9yLnByZXZpZXcgPSB0aGlzLnNlcnZpY2UudG9Gb3JtYXQobmV3Q29sb3JQcmV2aWV3LCB0aGlzLmZvcm1hdCk7XG4gICAgICAgIG5ld0NvbG9yLnZhcmlhbnRzID0gdGhpcy5DaGFuZ2VBbHBoYU9uUGFsZXR0ZShhbHBoYSwgY29sb3IudmFyaWFudHMpO1xuICAgICAgICByZXN1bHQucHVzaChuZXdDb2xvcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hhbmdlIGNvbG9yIGZyb20gZGVmYXVsdCBjb2xvcnNcbiAgICogQHBhcmFtIHN0cmluZyBjb2xvclxuICAgKi9cbiAgcHVibGljIGNoYW5nZUNvbG9yKGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnNldENvbG9yRnJvbVN0cmluZyhjb2xvcik7XG4gICAgdGhpcy5tZW51ID0gMTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNoYW5nZUNvbG9yUGlja2VyKGV2ZW50OiBIc3ZhKSB7XG4gICAgdGhpcy50ZW1wb3JhbENvbG9yID0gZXZlbnQ7XG4gICAgdGhpcy5jb2xvciA9IHRoaXMuc2VydmljZS50b0Zvcm1hdChldmVudCwgdGhpcy5mb3JtYXQpO1xuICAgIHRoaXMudHJpZ2dlckluc3RhbmNlLnNsaWRlckNoYW5nZShcbiAgICAgIHRoaXMuc2VydmljZS50b0Zvcm1hdChldmVudCwgdGhpcy5mb3JtYXQpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFuZ2VDb2xvck1hbnVhbChjb2xvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDb2xvckZyb21TdHJpbmcoY29sb3IpO1xuICB9XG5cbiAgc2V0Q29sb3JGcm9tSHN2YSh2YWx1ZTogSHN2YSkge1xuICAgIHRoaXMuaHN2YSA9IHZhbHVlO1xuICAgIHRoaXMuY29sb3IgPSB0aGlzLnNlcnZpY2UudG9Gb3JtYXQodmFsdWUsIHRoaXMuZm9ybWF0KTtcbiAgICB0aGlzLnByZXZpZXdDb2xvciA9IHRoaXMuc2VydmljZS5oc3ZhVG9SZ2JhKHZhbHVlKS50b1N0cmluZygpO1xuICB9XG5cbiAgc2V0Q29sb3JGcm9tU3RyaW5nKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmhzdmEgPSB0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Ic3ZhKGNvbG9yKTtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5wcmV2aWV3Q29sb3IgPSBjb2xvcjtcbiAgfVxuXG4gIHB1YmxpYyBvbkNvbG9yQ2xpY2soY29sb3IpIHtcbiAgICBpZiAodHlwZW9mIGNvbG9yID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5jaGFuZ2VDb2xvcihjb2xvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFyaWFudHMgPSBjb2xvci52YXJpYW50cztcbiAgICAgIHRoaXMubWVudSA9IDI7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5leHRGb3JtYXQoKSB7XG4gICAgaWYgKHRoaXMuY2FuQ2hhbmdlRm9ybWF0KSB7XG4gICAgICB0aGlzLmZvcm1hdCA9ICh0aGlzLmZvcm1hdCArIDEpICUgdGhpcy5jb2xvckZvcm1hdHMubGVuZ3RoO1xuICAgICAgdGhpcy5zZXRDb2xvckZyb21Ic3ZhKHRoaXMuaHN2YSk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2UoKXtcbiAgICB0aGlzLnRyaWdnZXJJbnN0YW5jZS5jbG9zZSgpO1xuXG4gIH1cblxuICBhY2NlcHQoKXtcbiAgICB0aGlzLnRyaWdnZXJJbnN0YW5jZS5zZXRDb2xvcih0aGlzLmNvbG9yKTtcbiAgICB0aGlzLnRyaWdnZXJJbnN0YW5jZS5jbG9zZSgpO1xuXG4gIH1cblxuICBwdWJsaWMgb25DbGlja0JhY2soKSB7XG4gICAgaWYgKHRoaXMubWVudSA9PSAzKSB7XG4gICAgICB0aGlzLmNvbG9yID0gdGhpcy5iYWNrdXBDb2xvcjtcbiAgICAgIHRoaXMuaHN2YSA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEodGhpcy5jb2xvcik7XG4gICAgfVxuICAgIHRoaXMuaW5kZXhTZWxlY2Npb25hZG8gPSB0aGlzLmZpbmRJbmRleFNlbGVjdGVkQ29sb3IodGhpcy5wYWxldHRlKTtcbiAgICB0aGlzLm1lbnUgPSAxO1xuICB9XG5cbiAgaXNPdXRzaWRlKGV2ZW50KSB7XG4gICAgcmV0dXJuIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZ3gtY29sb3JzLW92ZXJsYXlcIik7XG4gIH1cblxuICBvbk9wZW5lZFNjcm9sbCgkZXZlbnQpe1xuICAgIGNvbnNvbGUubG9nKCdvbiBzY3JvbGwnKTtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJvcGVuZWRcIiBbc3R5bGVdPVwicG9zaXRpb25TdHJpbmdcIiAoc2Nyb2xsKT1cIm9uT3BlbmVkU2Nyb2xsKCRldmVudClcIiAjZGlhbG9nPlxuICA8c2VjdGlvbiBjbGFzcz1cIm1haW4tY29udGVudC1jb250YWluZXJcIj5cbiAgICA8YXJ0aWNsZSBjbGFzcz1cImxlZnRcIj5cbiAgICAgIDwhLS1NZW51IDEtLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtZW51ID09IDFcIj5cbiAgICAgICAgPCEtLUNvbG9yIGxpc3QtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbG9yc1wiIFtAY29sb3JzQW5pbWF0aW9uXT1cImNvbG9yc0FuaW1hdGlvbkVmZmVjdFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbG9yIG9mIHBhbGV0dGU7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgd3JhcHBlciBjb2xvclwiPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ29sb3JDbGljayhjb2xvcilcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiY2lyY2xlIGNvbG9yIGNpcmNsZS1ib3JkZXJcIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEJhY2tncm91bmRDb2xvcihjb2xvcilcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImkgPT0gdGhpcy5pbmRleFNlbGVjY2lvbmFkb1wiIGNsYXNzPVwic2VsZWN0ZWRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPCEtLU1lbnUgMjogVmFyaWFudHMgb2Ygc2VsZWN0ZWQgY29sb3ItLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtZW51ID09IDJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbG9yc1wiIFtAY29sb3JzQW5pbWF0aW9uXT1cImNvbG9yc0FuaW1hdGlvbkVmZmVjdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgd3JhcHBlclwiPlxuICAgICAgICAgICAgPGRpdiAoY2xpY2spPVwib25DbGlja0JhY2soKVwiIGNsYXNzPVwiYWRkXCI+XG4gICAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjI0XCJcbiAgICAgICAgICAgICAgICBoZWlnaHQ9XCIyNFwiXG4gICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgZD1cIk0yMCAxMUg3LjgzbDUuNTktNS41OUwxMiA0bC04IDggOCA4IDEuNDEtMS40MUw3LjgzIDEzSDIwdi0yelwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHZhcmlhbnQgb2YgdmFyaWFudHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgd3JhcHBlciBjb2xvclwiPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZUNvbG9yKHZhcmlhbnQpXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImNpcmNsZSBjaXJjbGUtYm9yZGVyXCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7IGJhY2tncm91bmQ6IHZhcmlhbnQgfVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNTZWxlY3RlZCh2YXJpYW50KVwiIGNsYXNzPVwic2VsZWN0ZWRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2FydGljbGU+XG5cbiAgICA8YXJ0aWNsZSBjbGFzcz1cInJpZ2h0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sb3ItcGlja2VyLXdyYXBwZXJcIiAqbmdJZj1cIiFoaWRlQ29sb3JQaWNrZXIgJiYgdGhpcy5jb2xvclBpY2tlckNvbnRyb2xzICE9ICdvbmx5LWFscGhhJ1wiPlxuICAgICAgICA8IS0tIDxzcGFuIFsoY29sb3JQaWNrZXIpXT1cImNvbG9yXCI+PC9zcGFuPiAtLT5cbiAgICAgICAgPGNvbG9yLXBpY2tlclxuICAgICAgICAgIFtjb250cm9sc109XCJjb2xvclBpY2tlckNvbnRyb2xzXCJcbiAgICAgICAgICBbY29sb3JdPVwiaHN2YVwiXG4gICAgICAgICAgKHNsaWRlckNoYW5nZSk9XCJvbkNoYW5nZUNvbG9yUGlja2VyKCRldmVudClcIlxuICAgICAgICA+PC9jb2xvci1waWNrZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxjb2xvci1waWNrZXJcbiAgICAgICAgKm5nSWY9XCIhaGlkZUNvbG9yUGlja2VyICYmIHRoaXMuY29sb3JQaWNrZXJDb250cm9scyA9PSAnb25seS1hbHBoYSdcIlxuICAgICAgICBbY29udHJvbHNdPVwiY29sb3JQaWNrZXJDb250cm9sc1wiXG4gICAgICAgIFtjb2xvcl09XCJoc3ZhXCJcbiAgICAgICAgKGNvbG9yQ2hhbmdlKT1cIm9uQ2hhbmdlQ29sb3JQaWNrZXIoJGV2ZW50KVwiXG4gICAgICAgIChvbkFscGhhQ2hhbmdlKT1cIm9uQWxwaGFDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICA+PC9jb2xvci1waWNrZXI+XG4gICAgPC9hcnRpY2xlPlxuICA8L3NlY3Rpb24+XG5cbiAgPCEtLUZvcm1hdCAmIE1hbnVhbCBpbnB1dC0tPlxuICA8ZGl2IGNsYXNzPVwibWFudWFsLWlucHV0LXdyYXBwZXJcIiAqbmdJZj1cIiFoaWRlVGV4dElucHV0XCI+XG4gICAgPHAgKGNsaWNrKT1cIm5leHRGb3JtYXQoKVwiPnt7IGNvbG9yRm9ybWF0c1tmb3JtYXRdIH19PC9wPlxuICAgIDxkaXYgY2xhc3M9XCJnLWlucHV0XCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgcGxhY2Vob2xkZXI9XCIjRkZGRkZGXCJcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBbdmFsdWVdPVwiY29sb3JcIlxuICAgICAgICBbc3R5bGUuZm9udC1zaXplLnB4XT1cImNvbG9yICYmIGNvbG9yLmxlbmd0aCA+IDIzID8gOSA6IDEwXCJcbiAgICAgICAgW3N0eWxlLmxldHRlci1zcGFjaW5nLnB4XT1cImNvbG9yICYmIGNvbG9yLmxlbmd0aCA+IDE2ID8gMCA6IDEuNVwiXG4gICAgICAgIChrZXl1cCk9XCJjaGFuZ2VDb2xvck1hbnVhbChwYWludElucHV0LnZhbHVlKVwiXG4gICAgICAgIChrZXlkb3duLmVudGVyKT1cImFjY2VwdCgpXCJcbiAgICAgICAgI3BhaW50SW5wdXRcbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJuYXYtd3JhcHBlclwiPlxuICAgIDxidXR0b24gKGNsaWNrKT1cImNsb3NlKClcIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuICAgICAge3sgY2FuY2VsTGFiZWwgfX1cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIChjbGljayk9XCJhY2NlcHQoKVwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XG4gICAgICB7eyBhY2NlcHRMYWJlbCB9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19