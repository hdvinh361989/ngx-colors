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
                viewportOffset.left + 420 > window.innerWidth
                    ? viewportOffset.right - 420
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNvbG9ycy9zcmMvbGliL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNvbG9ycy9zcmMvbGliL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFNVCxTQUFTLEVBRVQsWUFBWSxFQUNaLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsT0FBTyxFQUNQLFVBQVUsRUFDVixLQUFLLEVBQ0wsS0FBSyxFQUNMLE9BQU8sRUFDUCxPQUFPLEVBQ1AsU0FBUyxHQUNWLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRWpELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFOUMsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7QUFzRDVDLE1BQU0sT0FBTyxjQUFjO0lBc0J6QixZQUNTLE9BQXlCLEVBQ3hCLEdBQXNCO1FBRHZCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBSWhDLFVBQUssR0FBRyxTQUFTLENBQUM7UUFFWCxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUNqQyxTQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFNUIsMEJBQXFC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LEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBUTlDLFFBQVE7c0JBRFAsWUFBWTt1QkFBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNM0MsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLGVBQWU7Z0JBS08sR0FBRztzQkFBdEMsV0FBVzt1QkFBQyxjQUFjO2dCQUNVLElBQUk7c0JBQXhDLFdBQVc7dUJBQUMsZUFBZTtnQkFDUCxRQUFRO3NCQUE1QixTQUFTO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIEhvc3RCaW5kaW5nLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgdHJhbnNpdGlvbixcbiAgcXVlcnksXG4gIHN0eWxlLFxuICBzdGFnZ2VyLFxuICBhbmltYXRlLFxuICBrZXlmcmFtZXMsXG59IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XG5pbXBvcnQge2lzRGVzY2VuZGFudE9yU2FtZX0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvaGVscGVyc1wiO1xuaW1wb3J0IHtDb2xvckZvcm1hdHN9IGZyb20gXCIuLi8uLi9lbnVtcy9mb3JtYXRzXCI7XG5pbXBvcnQge0NvbnZlcnRlclNlcnZpY2V9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb252ZXJ0ZXIuc2VydmljZVwiO1xuaW1wb3J0IHtkZWZhdWx0Q29sb3JzfSBmcm9tIFwiLi4vLi4vaGVscGVycy9kZWZhdWx0LWNvbG9yc1wiO1xuaW1wb3J0IHtmb3JtYXRzfSBmcm9tIFwiLi4vLi4vaGVscGVycy9mb3JtYXRzXCI7XG5pbXBvcnQge05neENvbG9yc1RyaWdnZXJEaXJlY3RpdmV9IGZyb20gXCIuLi8uLi9kaXJlY3RpdmVzL25neC1jb2xvcnMtdHJpZ2dlci5kaXJlY3RpdmVcIjtcbmltcG9ydCB7SHN2YX0gZnJvbSBcIi4uLy4uL2NsYXNlcy9mb3JtYXRzXCI7XG5pbXBvcnQge05neENvbG9yfSBmcm9tIFwiLi4vLi4vY2xhc2VzL2NvbG9yXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJuZ3gtY29sb3JzLXBhbmVsXCIsXG4gIHRlbXBsYXRlVXJsOiBcIi4vcGFuZWwuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbXCIuL3BhbmVsLmNvbXBvbmVudC5zY3NzXCJdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcihcImNvbG9yc0FuaW1hdGlvblwiLCBbXG4gICAgICB0cmFuc2l0aW9uKFwidm9pZCA9PiBzbGlkZS1pblwiLCBbXG4gICAgICAgIC8vIEluaXRpYWxseSBhbGwgY29sb3JzIGFyZSBoaWRkZW5cbiAgICAgICAgcXVlcnkoXCI6ZW50ZXJcIiwgc3R5bGUoe29wYWNpdHk6IDB9KSwge29wdGlvbmFsOiB0cnVlfSksXG4gICAgICAgIC8vc2xpZGUtaW4gYW5pbWF0aW9uXG4gICAgICAgIHF1ZXJ5KFxuICAgICAgICAgIFwiOmVudGVyXCIsXG4gICAgICAgICAgc3RhZ2dlcihcIjEwbXNcIiwgW1xuICAgICAgICAgICAgYW5pbWF0ZShcbiAgICAgICAgICAgICAgXCIuM3MgZWFzZS1pblwiLFxuICAgICAgICAgICAgICBrZXlmcmFtZXMoW1xuICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06IFwidHJhbnNsYXRleCgtNTAlKVwiLCBvZmZzZXQ6IDB9KSxcbiAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjUsXG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRleCgtMTBweCkgc2NhbGUoMS4xKVwiLFxuICAgICAgICAgICAgICAgICAgb2Zmc2V0OiAwLjMsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDEsIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGV4KDApXCIsIG9mZnNldDogMX0pLFxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICBdKSxcbiAgICAgICAgICB7b3B0aW9uYWw6IHRydWV9XG4gICAgICAgICksXG4gICAgICBdKSxcbiAgICAgIC8vcG9wdXAgYW5pbWF0aW9uXG4gICAgICB0cmFuc2l0aW9uKFwidm9pZCA9PiBwb3B1cFwiLCBbXG4gICAgICAgIHF1ZXJ5KFwiOmVudGVyXCIsIHN0eWxlKHtvcGFjaXR5OiAwLCB0cmFuc2Zvcm06IFwic2NhbGUoMClcIn0pLCB7XG4gICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICBxdWVyeShcbiAgICAgICAgICBcIjplbnRlclwiLFxuICAgICAgICAgIHN0YWdnZXIoXCIxMG1zXCIsIFtcbiAgICAgICAgICAgIGFuaW1hdGUoXG4gICAgICAgICAgICAgIFwiNTAwbXMgZWFzZS1vdXRcIixcbiAgICAgICAgICAgICAga2V5ZnJhbWVzKFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7b3BhY2l0eTogMC41LCB0cmFuc2Zvcm06IFwic2NhbGUoLjUpXCIsIG9mZnNldDogMC4zfSksXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDEsIHRyYW5zZm9ybTogXCJzY2FsZSgxLjEpXCIsIG9mZnNldDogMC44fSksXG4gICAgICAgICAgICAgICAgc3R5bGUoe29wYWNpdHk6IDEsIHRyYW5zZm9ybTogXCJzY2FsZSgxKVwiLCBvZmZzZXQ6IDF9KSxcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgXSksXG4gICAgICAgICAge29wdGlvbmFsOiB0cnVlfVxuICAgICAgICApLFxuICAgICAgXSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQEhvc3RMaXN0ZW5lcihcImRvY3VtZW50Om1vdXNlZG93blwiLCBbXCIkZXZlbnRcIl0pXG4gIGNsaWNrKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuaXNPdXRzaWRlKGV2ZW50KSkge1xuICAgICAgLy8gdGhpcy5lbWl0Q2xvc2UoXCJjYW5jZWxcIik7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcihcImRvY3VtZW50OnNjcm9sbFwiLCBbJyRldmVudCddKVxuICBvblNjcm9sbChldmVudCkge1xuICAgIHRoaXMub25TY3JlZW5Nb3ZlbWVudCgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcihcIndpbmRvdzpyZXNpemVcIilcbiAgb25SZXNpemUoKSB7XG4gICAgdGhpcy5vblNjcmVlbk1vdmVtZW50KCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoXCJzdHlsZS50b3AucHhcIikgcHVibGljIHRvcDogbnVtYmVyO1xuICBASG9zdEJpbmRpbmcoXCJzdHlsZS5sZWZ0LnB4XCIpIHB1YmxpYyBsZWZ0OiBudW1iZXI7XG4gIEBWaWV3Q2hpbGQoXCJkaWFsb2dcIikgcGFuZWxSZWY6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHNlcnZpY2U6IENvbnZlcnRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICB9XG5cbiAgY29sb3IgPSBcIiMwMDAwMDBcIjtcblxuICBwdWJsaWMgcHJldmlld0NvbG9yOiBzdHJpbmcgPSBcIiMwMDAwMDBcIjtcbiAgcHVibGljIGhzdmEgPSBuZXcgSHN2YSgwLCAxLCAxLCAxKTtcblxuICBwdWJsaWMgY29sb3JzQW5pbWF0aW9uRWZmZWN0ID0gXCJzbGlkZS1pblwiO1xuXG4gIHB1YmxpYyBwYWxldHRlID0gZGVmYXVsdENvbG9ycztcbiAgcHVibGljIHZhcmlhbnRzID0gW107XG5cbiAgcHVibGljIGNvbG9yRm9ybWF0cyA9IGZvcm1hdHM7XG4gIHB1YmxpYyBmb3JtYXQ6IENvbG9yRm9ybWF0cyA9IENvbG9yRm9ybWF0cy5IRVg7XG5cbiAgcHVibGljIGNhbkNoYW5nZUZvcm1hdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgcHVibGljIG1lbnUgPSAxO1xuXG4gIHB1YmxpYyBoaWRlQ29sb3JQaWNrZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGhpZGVUZXh0SW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGFjY2VwdExhYmVsOiBzdHJpbmc7XG4gIHB1YmxpYyBjYW5jZWxMYWJlbDogc3RyaW5nO1xuICBwdWJsaWMgY29sb3JQaWNrZXJDb250cm9sczogXCJkZWZhdWx0XCIgfCBcIm9ubHktYWxwaGFcIiB8IFwibm8tYWxwaGFcIiA9IFwiZGVmYXVsdFwiO1xuICBwcml2YXRlIHRyaWdnZXJJbnN0YW5jZTogTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZTtcbiAgcHJpdmF0ZSBUcmlnZ2VyQkJveDtcbiAgcHVibGljIGlzU2VsZWN0ZWRDb2xvckluUGFsZXR0ZTogYm9vbGVhbjtcbiAgcHVibGljIGluZGV4U2VsZWNjaW9uYWRvO1xuICBwdWJsaWMgcG9zaXRpb25TdHJpbmc7XG4gIHB1YmxpYyB0ZW1wb3JhbENvbG9yO1xuICBwdWJsaWMgYmFja3VwQ29sb3I7XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0UG9zaXRpb24oKTtcbiAgICB0aGlzLmhzdmEgPSB0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Ic3ZhKHRoaXMuY29sb3IpO1xuICAgIHRoaXMuaW5kZXhTZWxlY2Npb25hZG8gPSB0aGlzLmZpbmRJbmRleFNlbGVjdGVkQ29sb3IodGhpcy5wYWxldHRlKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zZXRQb3NpdGlvblkoKTtcbiAgfVxuXG4gIHByaXZhdGUgb25TY3JlZW5Nb3ZlbWVudCgpIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKCk7XG4gICAgdGhpcy5zZXRQb3NpdGlvblkoKTtcbiAgICBpZiAoIXRoaXMucGFuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLnBhbmVsUmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwidHJhbnNmb3JtIDAuNXMgZWFzZS1vdXRcIjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmRJbmRleFNlbGVjdGVkQ29sb3IoY29sb3JzKTogbnVtYmVyIHtcbiAgICBsZXQgcmVzdWx0SW5kZXggPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMuY29sb3IpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW2ldO1xuICAgICAgICBpZiAodHlwZW9mIGNvbG9yID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Gb3JtYXQodGhpcy5jb2xvciwgQ29sb3JGb3JtYXRzLkhFWCkgPT1cbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5zdHJpbmdUb0Zvcm1hdChjb2xvciwgQ29sb3JGb3JtYXRzLkhFWClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJlc3VsdEluZGV4ID0gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuZmluZEluZGV4U2VsZWN0ZWRDb2xvcihjb2xvci52YXJpYW50cykgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXN1bHRJbmRleCA9IGk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRJbmRleDtcbiAgfVxuXG4gIHB1YmxpYyBpbmljaWF0ZShcbiAgICB0cmlnZ2VySW5zdGFuY2U6IE5neENvbG9yc1RyaWdnZXJEaXJlY3RpdmUsXG4gICAgdHJpZ2dlckVsZW1lbnRSZWYsXG4gICAgY29sb3IsXG4gICAgcGFsZXR0ZSxcbiAgICBhbmltYXRpb24sXG4gICAgZm9ybWF0OiBzdHJpbmcsXG4gICAgaGlkZVRleHRJbnB1dDogYm9vbGVhbixcbiAgICBoaWRlQ29sb3JQaWNrZXI6IGJvb2xlYW4sXG4gICAgYWNjZXB0TGFiZWw6IHN0cmluZyxcbiAgICBjYW5jZWxMYWJlbDogc3RyaW5nLFxuICAgIGNvbG9yUGlja2VyQ29udHJvbHM6IFwiZGVmYXVsdFwiIHwgXCJvbmx5LWFscGhhXCIgfCBcIm5vLWFscGhhXCIsXG4gICAgcG9zaXRpb246IFwidG9wXCIgfCBcImJvdHRvbVwiXG4gICkge1xuICAgIHRoaXMuY29sb3JQaWNrZXJDb250cm9scyA9IGNvbG9yUGlja2VyQ29udHJvbHM7XG4gICAgdGhpcy50cmlnZ2VySW5zdGFuY2UgPSB0cmlnZ2VySW5zdGFuY2U7XG4gICAgdGhpcy5UcmlnZ2VyQkJveCA9IHRyaWdnZXJFbGVtZW50UmVmO1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLmhpZGVDb2xvclBpY2tlciA9IGhpZGVDb2xvclBpY2tlcjtcbiAgICB0aGlzLmhpZGVUZXh0SW5wdXQgPSBoaWRlVGV4dElucHV0O1xuICAgIHRoaXMuYWNjZXB0TGFiZWwgPSBhY2NlcHRMYWJlbDtcbiAgICB0aGlzLmNhbmNlbExhYmVsID0gY2FuY2VsTGFiZWw7XG4gICAgaWYgKGZvcm1hdCkge1xuICAgICAgaWYgKGZvcm1hdHMuaW5jbHVkZXMoZm9ybWF0KSkge1xuICAgICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdHMuaW5kZXhPZihmb3JtYXQudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIHRoaXMuY2FuQ2hhbmdlRm9ybWF0ID0gZmFsc2U7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0Rm9ybWF0QnlTdHJpbmcodGhpcy5jb2xvcikgIT0gZm9ybWF0LnRvTG93ZXJDYXNlKClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5zZXRDb2xvckZyb21Ic3ZhKHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEodGhpcy5jb2xvcikpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRm9ybWF0IHByb3ZpZGVkIGlzIGludmFsaWQsIHVzaW5nIEhFWFwiKTtcbiAgICAgICAgdGhpcy5mb3JtYXQgPSBDb2xvckZvcm1hdHMuSEVYO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdHMuaW5kZXhPZih0aGlzLnNlcnZpY2UuZ2V0Rm9ybWF0QnlTdHJpbmcodGhpcy5jb2xvcikpO1xuICAgIH1cblxuICAgIHRoaXMucHJldmlld0NvbG9yID0gdGhpcy5jb2xvcjtcbiAgICB0aGlzLnBhbGV0dGUgPSBwYWxldHRlID8/IGRlZmF1bHRDb2xvcnM7XG4gICAgdGhpcy5jb2xvcnNBbmltYXRpb25FZmZlY3QgPSBhbmltYXRpb247XG4gICAgaWYgKHBvc2l0aW9uID09IFwidG9wXCIpIHtcbiAgICAgIGxldCBUcmlnZ2VyQkJveCA9IHRoaXMuVHJpZ2dlckJCb3gubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRoaXMucG9zaXRpb25TdHJpbmcgPVxuICAgICAgICBcInRyYW5zZm9ybTogdHJhbnNsYXRlWShjYWxjKCAtMTAwJSAtIFwiICsgVHJpZ2dlckJCb3guaGVpZ2h0ICsgXCJweCApKVwiO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRQb3NpdGlvbigpIHtcbiAgICBpZiAodGhpcy5UcmlnZ2VyQkJveCkge1xuICAgICAgdmFyIHZpZXdwb3J0T2Zmc2V0ID1cbiAgICAgICAgdGhpcy5UcmlnZ2VyQkJveC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGhpcy50b3AgPSB2aWV3cG9ydE9mZnNldC50b3AgKyB2aWV3cG9ydE9mZnNldC5oZWlnaHQ7XG4gICAgICB0aGlzLmxlZnQgPVxuICAgICAgICB2aWV3cG9ydE9mZnNldC5sZWZ0ICsgNDIwID4gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgICA/IHZpZXdwb3J0T2Zmc2V0LnJpZ2h0IC0gNDIwXG4gICAgICAgICAgOiB2aWV3cG9ydE9mZnNldC5sZWZ0O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0UG9zaXRpb25ZKCkge1xuICAgIHZhciB0cmlnZ2VyQkJveCA9IHRoaXMuVHJpZ2dlckJCb3gubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB2YXIgcGFuZWxCQm94ID0gdGhpcy5wYW5lbFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBwYW5lbEhlaWdodCA9IHBhbmVsQkJveC5oZWlnaHQ7XG5cbiAgICAvL0NoZWNrIGZvciBzcGFjZSBhYm92ZSB0aGUgdHJpZ2dlclxuICAgIGlmICgwID4gcGFuZWxCQm94LnRvcCAtIDUpIHtcbiAgICAgIHRoaXMucG9zaXRpb25TdHJpbmcgPSBcIlwiO1xuICAgIH1cbiAgICAvL0NoZWNrIGZvciBzcGFjZSBiZWxvdyB0aGUgdHJpZ2dlclxuICAgIGlmIChwYW5lbEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCAtIChwYW5lbEJCb3gudG9wIC0gNSkpIHtcbiAgICAgIC8vdGhlcmUgaXMgbm8gc3BhY2UsIG1vdmUgcGFuZWwgb3ZlciB0aGUgdHJpZ2dlclxuICAgICAgdGhpcy5wb3NpdGlvblN0cmluZyA9XG4gICAgICAgIFwidHJhbnNmb3JtOiB0cmFuc2xhdGVZKGNhbGMoIC0xMDAlIC0gXCIgKyB0cmlnZ2VyQkJveC5oZWlnaHQgKyBcInB4ICkpO1wiO1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwdWJsaWMgaGFzVmFyaWFudChjb2xvcik6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5wcmV2aWV3Q29sb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGVvZiBjb2xvciAhPSBcInN0cmluZ1wiICYmXG4gICAgICBjb2xvci52YXJpYW50cy5zb21lKFxuICAgICAgICAodikgPT4gdi50b1VwcGVyQ2FzZSgpID09IHRoaXMucHJldmlld0NvbG9yLnRvVXBwZXJDYXNlKClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGlzU2VsZWN0ZWQoY29sb3IpIHtcbiAgICBpZiAoIXRoaXMucHJldmlld0NvbG9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICB0eXBlb2YgY29sb3IgPT0gXCJzdHJpbmdcIiAmJlxuICAgICAgY29sb3IudG9VcHBlckNhc2UoKSA9PSB0aGlzLnByZXZpZXdDb2xvci50b1VwcGVyQ2FzZSgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRCYWNrZ3JvdW5kQ29sb3IoY29sb3IpIHtcbiAgICBpZiAodHlwZW9mIGNvbG9yID09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiB7YmFja2dyb3VuZDogY29sb3J9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge2JhY2tncm91bmQ6IGNvbG9yPy5wcmV2aWV3fTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25BbHBoYUNoYW5nZShldmVudCkge1xuICAgIHRoaXMucGFsZXR0ZSA9IHRoaXMuQ2hhbmdlQWxwaGFPblBhbGV0dGUoZXZlbnQsIHRoaXMucGFsZXR0ZSk7XG4gIH1cblxuICBwcml2YXRlIENoYW5nZUFscGhhT25QYWxldHRlKFxuICAgIGFscGhhLFxuICAgIGNvbG9yczogQXJyYXk8c3RyaW5nIHwgTmd4Q29sb3I+XG4gICk6IEFycmF5PGFueT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjb2xvciA9IGNvbG9yc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY29sb3IgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICBjb25zdCBuZXdDb2xvciA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEoY29sb3IpO1xuICAgICAgICBuZXdDb2xvci5vbkFscGhhQ2hhbmdlKGFscGhhKTtcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcy5zZXJ2aWNlLnRvRm9ybWF0KG5ld0NvbG9yLCB0aGlzLmZvcm1hdCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbmV3Q29sb3IgPSBuZXcgTmd4Q29sb3IoKTtcbiAgICAgICAgY29uc3QgbmV3Q29sb3JQcmV2aWV3ID0gdGhpcy5zZXJ2aWNlLnN0cmluZ1RvSHN2YShjb2xvci5wcmV2aWV3KTtcbiAgICAgICAgbmV3Q29sb3JQcmV2aWV3Lm9uQWxwaGFDaGFuZ2UoYWxwaGEpO1xuICAgICAgICBuZXdDb2xvci5wcmV2aWV3ID0gdGhpcy5zZXJ2aWNlLnRvRm9ybWF0KG5ld0NvbG9yUHJldmlldywgdGhpcy5mb3JtYXQpO1xuICAgICAgICBuZXdDb2xvci52YXJpYW50cyA9IHRoaXMuQ2hhbmdlQWxwaGFPblBhbGV0dGUoYWxwaGEsIGNvbG9yLnZhcmlhbnRzKTtcbiAgICAgICAgcmVzdWx0LnB1c2gobmV3Q29sb3IpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSBjb2xvciBmcm9tIGRlZmF1bHQgY29sb3JzXG4gICAqIEBwYXJhbSBzdHJpbmcgY29sb3JcbiAgICovXG4gIHB1YmxpYyBjaGFuZ2VDb2xvcihjb2xvcjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDb2xvckZyb21TdHJpbmcoY29sb3IpO1xuICAgIHRoaXMubWVudSA9IDE7XG4gIH1cblxuICBwdWJsaWMgb25DaGFuZ2VDb2xvclBpY2tlcihldmVudDogSHN2YSkge1xuICAgIHRoaXMudGVtcG9yYWxDb2xvciA9IGV2ZW50O1xuICAgIHRoaXMuY29sb3IgPSB0aGlzLnNlcnZpY2UudG9Gb3JtYXQoZXZlbnQsIHRoaXMuZm9ybWF0KTtcbiAgICB0aGlzLnRyaWdnZXJJbnN0YW5jZS5zbGlkZXJDaGFuZ2UoXG4gICAgICB0aGlzLnNlcnZpY2UudG9Gb3JtYXQoZXZlbnQsIHRoaXMuZm9ybWF0KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY2hhbmdlQ29sb3JNYW51YWwoY29sb3I6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc2V0Q29sb3JGcm9tU3RyaW5nKGNvbG9yKTtcbiAgfVxuXG4gIHNldENvbG9yRnJvbUhzdmEodmFsdWU6IEhzdmEpIHtcbiAgICB0aGlzLmhzdmEgPSB2YWx1ZTtcbiAgICB0aGlzLmNvbG9yID0gdGhpcy5zZXJ2aWNlLnRvRm9ybWF0KHZhbHVlLCB0aGlzLmZvcm1hdCk7XG4gICAgdGhpcy5wcmV2aWV3Q29sb3IgPSB0aGlzLnNlcnZpY2UuaHN2YVRvUmdiYSh2YWx1ZSkudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHNldENvbG9yRnJvbVN0cmluZyhjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5oc3ZhID0gdGhpcy5zZXJ2aWNlLnN0cmluZ1RvSHN2YShjb2xvcik7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMucHJldmlld0NvbG9yID0gY29sb3I7XG4gIH1cblxuICBwdWJsaWMgb25Db2xvckNsaWNrKGNvbG9yKSB7XG4gICAgaWYgKHR5cGVvZiBjb2xvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuY2hhbmdlQ29sb3IoY29sb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhcmlhbnRzID0gY29sb3IudmFyaWFudHM7XG4gICAgICB0aGlzLm1lbnUgPSAyO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZXh0Rm9ybWF0KCkge1xuICAgIGlmICh0aGlzLmNhbkNoYW5nZUZvcm1hdCkge1xuICAgICAgdGhpcy5mb3JtYXQgPSAodGhpcy5mb3JtYXQgKyAxKSAlIHRoaXMuY29sb3JGb3JtYXRzLmxlbmd0aDtcbiAgICAgIHRoaXMuc2V0Q29sb3JGcm9tSHN2YSh0aGlzLmhzdmEpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlKCl7XG4gICAgdGhpcy50cmlnZ2VySW5zdGFuY2UuY2xvc2UoKTtcblxuICB9XG5cbiAgYWNjZXB0KCl7XG4gICAgdGhpcy50cmlnZ2VySW5zdGFuY2Uuc2V0Q29sb3IodGhpcy5jb2xvcik7XG4gICAgdGhpcy50cmlnZ2VySW5zdGFuY2UuY2xvc2UoKTtcblxuICB9XG5cbiAgcHVibGljIG9uQ2xpY2tCYWNrKCkge1xuICAgIGlmICh0aGlzLm1lbnUgPT0gMykge1xuICAgICAgdGhpcy5jb2xvciA9IHRoaXMuYmFja3VwQ29sb3I7XG4gICAgICB0aGlzLmhzdmEgPSB0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Ic3ZhKHRoaXMuY29sb3IpO1xuICAgIH1cbiAgICB0aGlzLmluZGV4U2VsZWNjaW9uYWRvID0gdGhpcy5maW5kSW5kZXhTZWxlY3RlZENvbG9yKHRoaXMucGFsZXR0ZSk7XG4gICAgdGhpcy5tZW51ID0gMTtcbiAgfVxuXG4gIGlzT3V0c2lkZShldmVudCkge1xuICAgIHJldHVybiBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmd4LWNvbG9ycy1vdmVybGF5XCIpO1xuICB9XG5cbiAgb25PcGVuZWRTY3JvbGwoJGV2ZW50KXtcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJvcGVuZWRcIiBbc3R5bGVdPVwicG9zaXRpb25TdHJpbmdcIiAoc2Nyb2xsKT1cIm9uT3BlbmVkU2Nyb2xsKCRldmVudClcIiAjZGlhbG9nPlxuICA8c2VjdGlvbiBjbGFzcz1cIm1haW4tY29udGVudC1jb250YWluZXJcIj5cbiAgICA8YXJ0aWNsZSBjbGFzcz1cImxlZnRcIj5cbiAgICAgIDwhLS1NZW51IDEtLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtZW51ID09IDFcIj5cbiAgICAgICAgPCEtLUNvbG9yIGxpc3QtLT5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbG9yc1wiIFtAY29sb3JzQW5pbWF0aW9uXT1cImNvbG9yc0FuaW1hdGlvbkVmZmVjdFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbG9yIG9mIHBhbGV0dGU7IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgd3JhcHBlciBjb2xvclwiPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ29sb3JDbGljayhjb2xvcilcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiY2lyY2xlIGNvbG9yIGNpcmNsZS1ib3JkZXJcIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldEJhY2tncm91bmRDb2xvcihjb2xvcilcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImkgPT0gdGhpcy5pbmRleFNlbGVjY2lvbmFkb1wiIGNsYXNzPVwic2VsZWN0ZWRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPCEtLU1lbnUgMjogVmFyaWFudHMgb2Ygc2VsZWN0ZWQgY29sb3ItLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtZW51ID09IDJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbG9yc1wiIFtAY29sb3JzQW5pbWF0aW9uXT1cImNvbG9yc0FuaW1hdGlvbkVmZmVjdFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgd3JhcHBlclwiPlxuICAgICAgICAgICAgPGRpdiAoY2xpY2spPVwib25DbGlja0JhY2soKVwiIGNsYXNzPVwiYWRkXCI+XG4gICAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjI0XCJcbiAgICAgICAgICAgICAgICBoZWlnaHQ9XCIyNFwiXG4gICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgZD1cIk0yMCAxMUg3LjgzbDUuNTktNS41OUwxMiA0bC04IDggOCA4IDEuNDEtMS40MUw3LjgzIDEzSDIwdi0yelwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHZhcmlhbnQgb2YgdmFyaWFudHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgd3JhcHBlciBjb2xvclwiPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZUNvbG9yKHZhcmlhbnQpXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImNpcmNsZSBjaXJjbGUtYm9yZGVyXCJcbiAgICAgICAgICAgICAgICBbbmdTdHlsZV09XCJ7IGJhY2tncm91bmQ6IHZhcmlhbnQgfVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNTZWxlY3RlZCh2YXJpYW50KVwiIGNsYXNzPVwic2VsZWN0ZWRcIj48L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2FydGljbGU+XG5cbiAgICA8YXJ0aWNsZSBjbGFzcz1cInJpZ2h0XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sb3ItcGlja2VyLXdyYXBwZXJcIiAqbmdJZj1cIiFoaWRlQ29sb3JQaWNrZXIgJiYgdGhpcy5jb2xvclBpY2tlckNvbnRyb2xzICE9ICdvbmx5LWFscGhhJ1wiPlxuICAgICAgICA8IS0tIDxzcGFuIFsoY29sb3JQaWNrZXIpXT1cImNvbG9yXCI+PC9zcGFuPiAtLT5cbiAgICAgICAgPGNvbG9yLXBpY2tlclxuICAgICAgICAgIFtjb250cm9sc109XCJjb2xvclBpY2tlckNvbnRyb2xzXCJcbiAgICAgICAgICBbY29sb3JdPVwiaHN2YVwiXG4gICAgICAgICAgKHNsaWRlckNoYW5nZSk9XCJvbkNoYW5nZUNvbG9yUGlja2VyKCRldmVudClcIlxuICAgICAgICA+PC9jb2xvci1waWNrZXI+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxjb2xvci1waWNrZXJcbiAgICAgICAgKm5nSWY9XCIhaGlkZUNvbG9yUGlja2VyICYmIHRoaXMuY29sb3JQaWNrZXJDb250cm9scyA9PSAnb25seS1hbHBoYSdcIlxuICAgICAgICBbY29udHJvbHNdPVwiY29sb3JQaWNrZXJDb250cm9sc1wiXG4gICAgICAgIFtjb2xvcl09XCJoc3ZhXCJcbiAgICAgICAgKGNvbG9yQ2hhbmdlKT1cIm9uQ2hhbmdlQ29sb3JQaWNrZXIoJGV2ZW50KVwiXG4gICAgICAgIChvbkFscGhhQ2hhbmdlKT1cIm9uQWxwaGFDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICA+PC9jb2xvci1waWNrZXI+XG4gICAgPC9hcnRpY2xlPlxuICA8L3NlY3Rpb24+XG5cbiAgPCEtLUZvcm1hdCAmIE1hbnVhbCBpbnB1dC0tPlxuICA8ZGl2IGNsYXNzPVwibWFudWFsLWlucHV0LXdyYXBwZXJcIiAqbmdJZj1cIiFoaWRlVGV4dElucHV0XCI+XG4gICAgPHAgKGNsaWNrKT1cIm5leHRGb3JtYXQoKVwiPnt7IGNvbG9yRm9ybWF0c1tmb3JtYXRdIH19PC9wPlxuICAgIDxkaXYgY2xhc3M9XCJnLWlucHV0XCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgcGxhY2Vob2xkZXI9XCIjRkZGRkZGXCJcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBbdmFsdWVdPVwiY29sb3JcIlxuICAgICAgICBbc3R5bGUuZm9udC1zaXplLnB4XT1cImNvbG9yICYmIGNvbG9yLmxlbmd0aCA+IDIzID8gOSA6IDEwXCJcbiAgICAgICAgW3N0eWxlLmxldHRlci1zcGFjaW5nLnB4XT1cImNvbG9yICYmIGNvbG9yLmxlbmd0aCA+IDE2ID8gMCA6IDEuNVwiXG4gICAgICAgIChrZXl1cCk9XCJjaGFuZ2VDb2xvck1hbnVhbChwYWludElucHV0LnZhbHVlKVwiXG4gICAgICAgIChrZXlkb3duLmVudGVyKT1cImFjY2VwdCgpXCJcbiAgICAgICAgI3BhaW50SW5wdXRcbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJuYXYtd3JhcHBlclwiPlxuICAgIDxidXR0b24gKGNsaWNrKT1cImNsb3NlKClcIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxuICAgICAge3sgY2FuY2VsTGFiZWwgfX1cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uIChjbGljayk9XCJhY2NlcHQoKVwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XG4gICAgICB7eyBhY2NlcHRMYWJlbCB9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19