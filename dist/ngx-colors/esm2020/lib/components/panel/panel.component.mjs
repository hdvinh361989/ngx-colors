import { Component, ViewChild, HostListener, HostBinding, } from "@angular/core";
import { trigger, transition, query, style, stagger, animate, keyframes, } from "@angular/animations";
import { ColorFormats } from "../../enums/formats";
import { DefaultColors } from "../../helpers/default-colors";
import { formats } from "../../helpers/formats";
import { Hsva } from "../../clases/formats";
import { NgxColor } from "../../clases/color";
import { HEX_REGEX } from "../../constants/contants";
import * as i0 from "@angular/core";
import * as i1 from "../../services/converter.service";
import * as i2 from "@angular/common";
import * as i3 from "../color-picker/color-picker.component";
export class PanelComponent {
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
    constructor(service, cdr) {
        this.service = service;
        this.cdr = cdr;
        this.color = "#000000";
        this.previewColor = "#000000";
        this.hsva = new Hsva(0, 1, 1, 1);
        this.colorsAnimationEffect = "slide-in";
        this.palette = DefaultColors;
        this.variants = [];
        this.colorFormats = formats;
        this.format = ColorFormats.HEX;
        this.canChangeFormat = true;
        this.menu = 1;
        this.hideColorPicker = false;
        this.hideTextInput = false;
        this.colorPickerControls = "default";
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
        this.palette = palette ?? DefaultColors;
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
        if (typeof color === "string") {
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
        if (!this.disabled) {
            this.triggerInstance.setColor(this.color);
            this.triggerInstance.close();
        }
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
    get disabled() {
        return !HEX_REGEX.test(this.color);
    }
}
PanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: PanelComponent, deps: [{ token: i1.ConverterService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
PanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.1.2", type: PanelComponent, selector: "ngx-colors-panel", host: { listeners: { "document:mousedown": "click($event)", "document:scroll": "onScroll($event)", "window:resize": "onResize()" }, properties: { "style.top.px": "this.top", "style.left.px": "this.left" } }, viewQueries: [{ propertyName: "panelRef", first: true, predicate: ["dialog"], descendants: true }], ngImport: i0, template: "<div\r\n  class=\"opened\"\r\n  [style]=\"positionString\"\r\n  (scroll)=\"onOpenedScroll($event)\"\r\n  #dialog\r\n>\r\n  <section class=\"main-content-container\">\r\n    <article class=\"left\">\r\n      <!--Menu 1-->\r\n      <ng-container *ngIf=\"menu == 1\">\r\n        <!--Color list-->\r\n        <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\r\n          <ng-container *ngFor=\"let color of palette; let i = index\">\r\n            <div class=\"circle wrapper color\">\r\n              <div\r\n                (click)=\"onColorClick(color)\"\r\n                class=\"circle color circle-border\"\r\n                [ngStyle]=\"getBackgroundColor(color)\"\r\n              >\r\n                <div *ngIf=\"i == this.indexSeleccionado\" class=\"selected\"></div>\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n        </div>\r\n      </ng-container>\r\n\r\n      <!--Menu 2: Variants of selected color-->\r\n      <ng-container *ngIf=\"menu == 2\">\r\n        <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\r\n          <div class=\"circle wrapper\">\r\n            <div (click)=\"onClickBack()\" class=\"add\">\r\n              <svg\r\n                xmlns=\"http://www.w3.org/2000/svg\"\r\n                width=\"24\"\r\n                height=\"24\"\r\n                viewBox=\"0 0 24 24\"\r\n              >\r\n                <path d=\"M0 0h24v24H0z\" fill=\"none\" />\r\n                <path\r\n                  d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"\r\n                />\r\n              </svg>\r\n            </div>\r\n          </div>\r\n\r\n          <ng-container *ngFor=\"let variant of variants\">\r\n            <div class=\"circle wrapper color\">\r\n              <div\r\n                (click)=\"changeColor(variant)\"\r\n                class=\"circle circle-border\"\r\n                [ngStyle]=\"{ background: variant }\"\r\n              >\r\n                <div *ngIf=\"isSelected(variant)\" class=\"selected\"></div>\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n        </div>\r\n      </ng-container>\r\n    </article>\r\n\r\n    <article class=\"right\">\r\n      <div\r\n        class=\"color-picker-wrapper\"\r\n        *ngIf=\"!hideColorPicker && this.colorPickerControls != 'only-alpha'\"\r\n      >\r\n        <!-- <span [(colorPicker)]=\"color\"></span> -->\r\n        <color-picker\r\n          [controls]=\"colorPickerControls\"\r\n          [color]=\"hsva\"\r\n          (sliderChange)=\"onChangeColorPicker($event)\"\r\n        ></color-picker>\r\n      </div>\r\n      <color-picker\r\n        *ngIf=\"!hideColorPicker && this.colorPickerControls == 'only-alpha'\"\r\n        [controls]=\"colorPickerControls\"\r\n        [color]=\"hsva\"\r\n        (colorChange)=\"onChangeColorPicker($event)\"\r\n        (onAlphaChange)=\"onAlphaChange($event)\"\r\n      ></color-picker>\r\n    </article>\r\n  </section>\r\n\r\n  <!--Format & Manual input-->\r\n  <div class=\"manual-input-wrapper\" *ngIf=\"!hideTextInput\">\r\n    <p (click)=\"nextFormat()\">{{ colorFormats[format] }}</p>\r\n    <div class=\"g-input\">\r\n      <input\r\n        placeholder=\"#FFFFFF\"\r\n        type=\"text\"\r\n        [value]=\"color\"\r\n        [style.font-size.px]=\"color && color.length > 23 ? 9 : 10\"\r\n        [style.letter-spacing.px]=\"color && color.length > 16 ? 0 : 1.5\"\r\n        (keyup)=\"changeColorManual(paintInput.value)\"\r\n        (keydown.enter)=\"accept()\"\r\n        #paintInput\r\n      />\r\n      <span *ngIf=\"disabled\" class=\"error-message\">\r\n        Color value should be hexa format\r\n      </span>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"nav-wrapper\">\r\n    <button (click)=\"close()\" style=\"float: right\">\r\n      {{ cancelLabel }}\r\n    </button>\r\n    <button (click)=\"accept()\" [disabled]=\"disabled\" style=\"float: right\">\r\n      {{ acceptLabel }}\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [":host{position:fixed;z-index:2001}.hidden{display:none}.button{display:flex;align-items:center;justify-content:center}.top{transform:translateY(-100%)}.opened{box-sizing:border-box;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background:#fff;width:420px;border-radius:5px;position:absolute}.opened button{border:none;font-family:inherit;font-size:12px;background-color:unset;-webkit-user-select:none;user-select:none;padding:10px;letter-spacing:1px;color:#222;border-radius:3px;line-height:20px;cursor:pointer}.opened button:hover,.opened .button:hover{background-color:#0000000d;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1);transition-property:opacity,background-color;transition-duration:.2s,.2s;transition-timing-function:cubic-bezier(.35,0,.25,1),cubic-bezier(.35,0,.25,1);transition-delay:0s,0s}.opened button:focus{outline:none}.opened button:disabled{color:#aaa;background:#ddd}.opened .colors{display:flex;flex-wrap:wrap;align-items:center;margin:15px}.opened .colors .circle{height:34px;width:34px;box-sizing:border-box;border-radius:100%;cursor:pointer}.opened .colors .circle .add{font-size:20px;line-height:45px;text-align:center}.opened .colors .circle .selected{border:2px solid white;border-radius:100%;height:28px;width:28px;box-sizing:border-box;margin:2px}.opened .colors .circle.wrapper{margin:0 5px 5px;flex:34px 0 0}.opened .colors .circle.button{margin:0 5px 5px}.opened .colors .circle.wrapper.color{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.opened .colors .circle-border{border:1px solid rgba(0,0,0,.03)}.opened .color-picker-wrapper{margin:16px 16px 0 0}.opened .nav-wrapper{overflow:hidden;padding:8px 16px}.opened .nav-wrapper .round-button{padding:5px 0;width:40px;height:40px;box-sizing:border-box;border-radius:100%;text-align:center;line-height:45px}.opened .manual-input-wrapper{display:flex;margin:15px;font-family:sans-serif}.opened .manual-input-wrapper p{margin:0;text-align:center;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;line-height:48px;width:145px;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.opened .manual-input-wrapper .g-input{border:1px solid #e8ebed;height:45px;border-radius:5px;width:100%}.opened .manual-input-wrapper .g-input input{font-size:9px;border:none;width:100%;text-transform:uppercase;outline:none;text-align:center;letter-spacing:1px;color:#595b65;height:100%;border-radius:5px;margin:0;padding:0}.opened .manual-input-wrapper .g-input span.error-message{margin-top:3px;display:inline-block;font-size:11px;color:#f44336}.main-content-container{display:flex;max-height:250px;overflow:auto}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i3.ColorPickerComponent, selector: "color-picker", inputs: ["color", "controls"], outputs: ["sliderChange", "onAlphaChange"] }], animations: [
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: PanelComponent, decorators: [{
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
                    ], template: "<div\r\n  class=\"opened\"\r\n  [style]=\"positionString\"\r\n  (scroll)=\"onOpenedScroll($event)\"\r\n  #dialog\r\n>\r\n  <section class=\"main-content-container\">\r\n    <article class=\"left\">\r\n      <!--Menu 1-->\r\n      <ng-container *ngIf=\"menu == 1\">\r\n        <!--Color list-->\r\n        <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\r\n          <ng-container *ngFor=\"let color of palette; let i = index\">\r\n            <div class=\"circle wrapper color\">\r\n              <div\r\n                (click)=\"onColorClick(color)\"\r\n                class=\"circle color circle-border\"\r\n                [ngStyle]=\"getBackgroundColor(color)\"\r\n              >\r\n                <div *ngIf=\"i == this.indexSeleccionado\" class=\"selected\"></div>\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n        </div>\r\n      </ng-container>\r\n\r\n      <!--Menu 2: Variants of selected color-->\r\n      <ng-container *ngIf=\"menu == 2\">\r\n        <div class=\"colors\" [@colorsAnimation]=\"colorsAnimationEffect\">\r\n          <div class=\"circle wrapper\">\r\n            <div (click)=\"onClickBack()\" class=\"add\">\r\n              <svg\r\n                xmlns=\"http://www.w3.org/2000/svg\"\r\n                width=\"24\"\r\n                height=\"24\"\r\n                viewBox=\"0 0 24 24\"\r\n              >\r\n                <path d=\"M0 0h24v24H0z\" fill=\"none\" />\r\n                <path\r\n                  d=\"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\"\r\n                />\r\n              </svg>\r\n            </div>\r\n          </div>\r\n\r\n          <ng-container *ngFor=\"let variant of variants\">\r\n            <div class=\"circle wrapper color\">\r\n              <div\r\n                (click)=\"changeColor(variant)\"\r\n                class=\"circle circle-border\"\r\n                [ngStyle]=\"{ background: variant }\"\r\n              >\r\n                <div *ngIf=\"isSelected(variant)\" class=\"selected\"></div>\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n        </div>\r\n      </ng-container>\r\n    </article>\r\n\r\n    <article class=\"right\">\r\n      <div\r\n        class=\"color-picker-wrapper\"\r\n        *ngIf=\"!hideColorPicker && this.colorPickerControls != 'only-alpha'\"\r\n      >\r\n        <!-- <span [(colorPicker)]=\"color\"></span> -->\r\n        <color-picker\r\n          [controls]=\"colorPickerControls\"\r\n          [color]=\"hsva\"\r\n          (sliderChange)=\"onChangeColorPicker($event)\"\r\n        ></color-picker>\r\n      </div>\r\n      <color-picker\r\n        *ngIf=\"!hideColorPicker && this.colorPickerControls == 'only-alpha'\"\r\n        [controls]=\"colorPickerControls\"\r\n        [color]=\"hsva\"\r\n        (colorChange)=\"onChangeColorPicker($event)\"\r\n        (onAlphaChange)=\"onAlphaChange($event)\"\r\n      ></color-picker>\r\n    </article>\r\n  </section>\r\n\r\n  <!--Format & Manual input-->\r\n  <div class=\"manual-input-wrapper\" *ngIf=\"!hideTextInput\">\r\n    <p (click)=\"nextFormat()\">{{ colorFormats[format] }}</p>\r\n    <div class=\"g-input\">\r\n      <input\r\n        placeholder=\"#FFFFFF\"\r\n        type=\"text\"\r\n        [value]=\"color\"\r\n        [style.font-size.px]=\"color && color.length > 23 ? 9 : 10\"\r\n        [style.letter-spacing.px]=\"color && color.length > 16 ? 0 : 1.5\"\r\n        (keyup)=\"changeColorManual(paintInput.value)\"\r\n        (keydown.enter)=\"accept()\"\r\n        #paintInput\r\n      />\r\n      <span *ngIf=\"disabled\" class=\"error-message\">\r\n        Color value should be hexa format\r\n      </span>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"nav-wrapper\">\r\n    <button (click)=\"close()\" style=\"float: right\">\r\n      {{ cancelLabel }}\r\n    </button>\r\n    <button (click)=\"accept()\" [disabled]=\"disabled\" style=\"float: right\">\r\n      {{ acceptLabel }}\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [":host{position:fixed;z-index:2001}.hidden{display:none}.button{display:flex;align-items:center;justify-content:center}.top{transform:translateY(-100%)}.opened{box-sizing:border-box;box-shadow:0 2px 4px -1px #0003,0 4px 5px #00000024,0 1px 10px #0000001f;background:#fff;width:420px;border-radius:5px;position:absolute}.opened button{border:none;font-family:inherit;font-size:12px;background-color:unset;-webkit-user-select:none;user-select:none;padding:10px;letter-spacing:1px;color:#222;border-radius:3px;line-height:20px;cursor:pointer}.opened button:hover,.opened .button:hover{background-color:#0000000d;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1);transition-property:opacity,background-color;transition-duration:.2s,.2s;transition-timing-function:cubic-bezier(.35,0,.25,1),cubic-bezier(.35,0,.25,1);transition-delay:0s,0s}.opened button:focus{outline:none}.opened button:disabled{color:#aaa;background:#ddd}.opened .colors{display:flex;flex-wrap:wrap;align-items:center;margin:15px}.opened .colors .circle{height:34px;width:34px;box-sizing:border-box;border-radius:100%;cursor:pointer}.opened .colors .circle .add{font-size:20px;line-height:45px;text-align:center}.opened .colors .circle .selected{border:2px solid white;border-radius:100%;height:28px;width:28px;box-sizing:border-box;margin:2px}.opened .colors .circle.wrapper{margin:0 5px 5px;flex:34px 0 0}.opened .colors .circle.button{margin:0 5px 5px}.opened .colors .circle.wrapper.color{background-image:linear-gradient(45deg,#ccc 25%,transparent 25%),linear-gradient(-45deg,#ccc 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ccc 75%),linear-gradient(-45deg,transparent 75%,#ccc 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0px}.opened .colors .circle-border{border:1px solid rgba(0,0,0,.03)}.opened .color-picker-wrapper{margin:16px 16px 0 0}.opened .nav-wrapper{overflow:hidden;padding:8px 16px}.opened .nav-wrapper .round-button{padding:5px 0;width:40px;height:40px;box-sizing:border-box;border-radius:100%;text-align:center;line-height:45px}.opened .manual-input-wrapper{display:flex;margin:15px;font-family:sans-serif}.opened .manual-input-wrapper p{margin:0;text-align:center;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;line-height:48px;width:145px;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.opened .manual-input-wrapper .g-input{border:1px solid #e8ebed;height:45px;border-radius:5px;width:100%}.opened .manual-input-wrapper .g-input input{font-size:9px;border:none;width:100%;text-transform:uppercase;outline:none;text-align:center;letter-spacing:1px;color:#595b65;height:100%;border-radius:5px;margin:0;padding:0}.opened .manual-input-wrapper .g-input span.error-message{margin-top:3px;display:inline-block;font-size:11px;color:#f44336}.main-content-container{display:flex;max-height:250px;overflow:auto}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { click: [{
                type: HostListener,
                args: ["document:mousedown", ["$event"]]
            }], onScroll: [{
                type: HostListener,
                args: ["document:scroll", ["$event"]]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNvbG9ycy9zcmMvbGliL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNvbG9ycy9zcmMvbGliL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFHVCxTQUFTLEVBRVQsWUFBWSxFQUNaLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsT0FBTyxFQUNQLFVBQVUsRUFDVixLQUFLLEVBQ0wsS0FBSyxFQUNMLE9BQU8sRUFDUCxPQUFPLEVBQ1AsU0FBUyxHQUNWLE1BQU0scUJBQXFCLENBQUM7QUFDN0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFaEQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0FBc0RyRCxNQUFNLE9BQU8sY0FBYztJQUV6QixLQUFLLENBQUMsS0FBSztRQUNULElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6Qiw0QkFBNEI7U0FDN0I7SUFDSCxDQUFDO0lBR0QsUUFBUSxDQUFDLEtBQUs7UUFDWixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBR0QsUUFBUTtRQUNOLElBQUksQ0FB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UyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7cUNBQ3hELENBQUMsQ0FDSDtpQ0FDRixDQUFDLEVBQ0YsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQ25COzZCQUNGLENBQUM7eUJBQ0gsQ0FBQztxQkFDSDt1SUFJRCxLQUFLO3NCQURKLFlBQVk7dUJBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBUTlDLFFBQVE7c0JBRFAsWUFBWTt1QkFBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNM0MsUUFBUTtzQkFEUCxZQUFZO3VCQUFDLGVBQWU7Z0JBS08sR0FBRztzQkFBdEMsV0FBVzt1QkFBQyxjQUFjO2dCQUNVLElBQUk7c0JBQXhDLFdBQVc7dUJBQUMsZUFBZTtnQkFDUCxRQUFRO3NCQUE1QixTQUFTO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEhvc3RCaW5kaW5nLFxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7XHJcbiAgdHJpZ2dlcixcclxuICB0cmFuc2l0aW9uLFxyXG4gIHF1ZXJ5LFxyXG4gIHN0eWxlLFxyXG4gIHN0YWdnZXIsXHJcbiAgYW5pbWF0ZSxcclxuICBrZXlmcmFtZXMsXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2FuaW1hdGlvbnNcIjtcclxuaW1wb3J0IHsgQ29sb3JGb3JtYXRzIH0gZnJvbSBcIi4uLy4uL2VudW1zL2Zvcm1hdHNcIjtcclxuaW1wb3J0IHsgQ29udmVydGVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb252ZXJ0ZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBEZWZhdWx0Q29sb3JzIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvZGVmYXVsdC1jb2xvcnNcIjtcclxuaW1wb3J0IHsgZm9ybWF0cyB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL2Zvcm1hdHNcIjtcclxuaW1wb3J0IHsgTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZSB9IGZyb20gXCIuLi8uLi9kaXJlY3RpdmVzL25neC1jb2xvcnMtdHJpZ2dlci5kaXJlY3RpdmVcIjtcclxuaW1wb3J0IHsgSHN2YSB9IGZyb20gXCIuLi8uLi9jbGFzZXMvZm9ybWF0c1wiO1xyXG5pbXBvcnQgeyBOZ3hDb2xvciB9IGZyb20gXCIuLi8uLi9jbGFzZXMvY29sb3JcIjtcclxuaW1wb3J0IHsgSEVYX1JFR0VYIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9jb250YW50c1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwibmd4LWNvbG9ycy1wYW5lbFwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vcGFuZWwuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcIi4vcGFuZWwuY29tcG9uZW50LnNjc3NcIl0sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcihcImNvbG9yc0FuaW1hdGlvblwiLCBbXHJcbiAgICAgIHRyYW5zaXRpb24oXCJ2b2lkID0+IHNsaWRlLWluXCIsIFtcclxuICAgICAgICAvLyBJbml0aWFsbHkgYWxsIGNvbG9ycyBhcmUgaGlkZGVuXHJcbiAgICAgICAgcXVlcnkoXCI6ZW50ZXJcIiwgc3R5bGUoeyBvcGFjaXR5OiAwIH0pLCB7IG9wdGlvbmFsOiB0cnVlIH0pLFxyXG4gICAgICAgIC8vc2xpZGUtaW4gYW5pbWF0aW9uXHJcbiAgICAgICAgcXVlcnkoXHJcbiAgICAgICAgICBcIjplbnRlclwiLFxyXG4gICAgICAgICAgc3RhZ2dlcihcIjEwbXNcIiwgW1xyXG4gICAgICAgICAgICBhbmltYXRlKFxyXG4gICAgICAgICAgICAgIFwiLjNzIGVhc2UtaW5cIixcclxuICAgICAgICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06IFwidHJhbnNsYXRleCgtNTAlKVwiLCBvZmZzZXQ6IDAgfSksXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7XHJcbiAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNSxcclxuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZXgoLTEwcHgpIHNjYWxlKDEuMSlcIixcclxuICAgICAgICAgICAgICAgICAgb2Zmc2V0OiAwLjMsXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZXgoMClcIiwgb2Zmc2V0OiAxIH0pLFxyXG4gICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICBdKSxcclxuICAgICAgICAgIHsgb3B0aW9uYWw6IHRydWUgfVxyXG4gICAgICAgICksXHJcbiAgICAgIF0pLFxyXG4gICAgICAvL3BvcHVwIGFuaW1hdGlvblxyXG4gICAgICB0cmFuc2l0aW9uKFwidm9pZCA9PiBwb3B1cFwiLCBbXHJcbiAgICAgICAgcXVlcnkoXCI6ZW50ZXJcIiwgc3R5bGUoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06IFwic2NhbGUoMClcIiB9KSwge1xyXG4gICAgICAgICAgb3B0aW9uYWw6IHRydWUsXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgcXVlcnkoXHJcbiAgICAgICAgICBcIjplbnRlclwiLFxyXG4gICAgICAgICAgc3RhZ2dlcihcIjEwbXNcIiwgW1xyXG4gICAgICAgICAgICBhbmltYXRlKFxyXG4gICAgICAgICAgICAgIFwiNTAwbXMgZWFzZS1vdXRcIixcclxuICAgICAgICAgICAgICBrZXlmcmFtZXMoW1xyXG4gICAgICAgICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAwLjUsIHRyYW5zZm9ybTogXCJzY2FsZSguNSlcIiwgb2Zmc2V0OiAwLjMgfSksXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDEsIHRyYW5zZm9ybTogXCJzY2FsZSgxLjEpXCIsIG9mZnNldDogMC44IH0pLFxyXG4gICAgICAgICAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxLCB0cmFuc2Zvcm06IFwic2NhbGUoMSlcIiwgb2Zmc2V0OiAxIH0pLFxyXG4gICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICBdKSxcclxuICAgICAgICAgIHsgb3B0aW9uYWw6IHRydWUgfVxyXG4gICAgICAgICksXHJcbiAgICAgIF0pLFxyXG4gICAgXSksXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASG9zdExpc3RlbmVyKFwiZG9jdW1lbnQ6bW91c2Vkb3duXCIsIFtcIiRldmVudFwiXSlcclxuICBjbGljayhldmVudCkge1xyXG4gICAgaWYgKHRoaXMuaXNPdXRzaWRlKGV2ZW50KSkge1xyXG4gICAgICAvLyB0aGlzLmVtaXRDbG9zZShcImNhbmNlbFwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoXCJkb2N1bWVudDpzY3JvbGxcIiwgW1wiJGV2ZW50XCJdKVxyXG4gIG9uU2Nyb2xsKGV2ZW50KSB7XHJcbiAgICB0aGlzLm9uU2NyZWVuTW92ZW1lbnQoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoXCJ3aW5kb3c6cmVzaXplXCIpXHJcbiAgb25SZXNpemUoKSB7XHJcbiAgICB0aGlzLm9uU2NyZWVuTW92ZW1lbnQoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZyhcInN0eWxlLnRvcC5weFwiKSBwdWJsaWMgdG9wOiBudW1iZXI7XHJcbiAgQEhvc3RCaW5kaW5nKFwic3R5bGUubGVmdC5weFwiKSBwdWJsaWMgbGVmdDogbnVtYmVyO1xyXG4gIEBWaWV3Q2hpbGQoXCJkaWFsb2dcIikgcGFuZWxSZWY6IEVsZW1lbnRSZWY7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIHNlcnZpY2U6IENvbnZlcnRlclNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHt9XHJcblxyXG4gIGNvbG9yID0gXCIjMDAwMDAwXCI7XHJcblxyXG4gIHB1YmxpYyBwcmV2aWV3Q29sb3I6IHN0cmluZyA9IFwiIzAwMDAwMFwiO1xyXG4gIHB1YmxpYyBoc3ZhID0gbmV3IEhzdmEoMCwgMSwgMSwgMSk7XHJcblxyXG4gIHB1YmxpYyBjb2xvcnNBbmltYXRpb25FZmZlY3QgPSBcInNsaWRlLWluXCI7XHJcblxyXG4gIHB1YmxpYyBwYWxldHRlID0gRGVmYXVsdENvbG9ycztcclxuICBwdWJsaWMgdmFyaWFudHMgPSBbXTtcclxuXHJcbiAgcHVibGljIGNvbG9yRm9ybWF0cyA9IGZvcm1hdHM7XHJcbiAgcHVibGljIGZvcm1hdDogQ29sb3JGb3JtYXRzID0gQ29sb3JGb3JtYXRzLkhFWDtcclxuXHJcbiAgcHVibGljIGNhbkNoYW5nZUZvcm1hdDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIHB1YmxpYyBtZW51ID0gMTtcclxuXHJcbiAgcHVibGljIGhpZGVDb2xvclBpY2tlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBoaWRlVGV4dElucHV0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGFjY2VwdExhYmVsOiBzdHJpbmc7XHJcbiAgcHVibGljIGNhbmNlbExhYmVsOiBzdHJpbmc7XHJcbiAgcHVibGljIGNvbG9yUGlja2VyQ29udHJvbHM6IFwiZGVmYXVsdFwiIHwgXCJvbmx5LWFscGhhXCIgfCBcIm5vLWFscGhhXCIgPSBcImRlZmF1bHRcIjtcclxuICBwcml2YXRlIHRyaWdnZXJJbnN0YW5jZTogTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZTtcclxuICBwcml2YXRlIFRyaWdnZXJCQm94O1xyXG4gIHB1YmxpYyBpc1NlbGVjdGVkQ29sb3JJblBhbGV0dGU6IGJvb2xlYW47XHJcbiAgcHVibGljIGluZGV4U2VsZWNjaW9uYWRvO1xyXG4gIHB1YmxpYyBwb3NpdGlvblN0cmluZztcclxuICBwdWJsaWMgdGVtcG9yYWxDb2xvcjtcclxuICBwdWJsaWMgYmFja3VwQ29sb3I7XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2V0UG9zaXRpb24oKTtcclxuICAgIHRoaXMuaHN2YSA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEodGhpcy5jb2xvcik7XHJcbiAgICB0aGlzLmluZGV4U2VsZWNjaW9uYWRvID0gdGhpcy5maW5kSW5kZXhTZWxlY3RlZENvbG9yKHRoaXMucGFsZXR0ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5zZXRQb3NpdGlvblkoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25TY3JlZW5Nb3ZlbWVudCgpIHtcclxuICAgIHRoaXMuc2V0UG9zaXRpb24oKTtcclxuICAgIHRoaXMuc2V0UG9zaXRpb25ZKCk7XHJcbiAgICBpZiAoIXRoaXMucGFuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uKSB7XHJcbiAgICAgIHRoaXMucGFuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gXCJ0cmFuc2Zvcm0gMC41cyBlYXNlLW91dFwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBmaW5kSW5kZXhTZWxlY3RlZENvbG9yKGNvbG9ycyk6IG51bWJlciB7XHJcbiAgICBsZXQgcmVzdWx0SW5kZXggPSB1bmRlZmluZWQ7XHJcbiAgICBpZiAodGhpcy5jb2xvcikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW2ldO1xyXG4gICAgICAgIGlmICh0eXBlb2YgY29sb3IgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Gb3JtYXQodGhpcy5jb2xvciwgQ29sb3JGb3JtYXRzLkhFWCkgPT1cclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnN0cmluZ1RvRm9ybWF0KGNvbG9yLCBDb2xvckZvcm1hdHMuSEVYKVxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdEluZGV4ID0gaTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKHRoaXMuZmluZEluZGV4U2VsZWN0ZWRDb2xvcihjb2xvci52YXJpYW50cykgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdEluZGV4ID0gaTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHRJbmRleDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbmljaWF0ZShcclxuICAgIHRyaWdnZXJJbnN0YW5jZTogTmd4Q29sb3JzVHJpZ2dlckRpcmVjdGl2ZSxcclxuICAgIHRyaWdnZXJFbGVtZW50UmVmLFxyXG4gICAgY29sb3IsXHJcbiAgICBwYWxldHRlLFxyXG4gICAgYW5pbWF0aW9uLFxyXG4gICAgZm9ybWF0OiBzdHJpbmcsXHJcbiAgICBoaWRlVGV4dElucHV0OiBib29sZWFuLFxyXG4gICAgaGlkZUNvbG9yUGlja2VyOiBib29sZWFuLFxyXG4gICAgYWNjZXB0TGFiZWw6IHN0cmluZyxcclxuICAgIGNhbmNlbExhYmVsOiBzdHJpbmcsXHJcbiAgICBjb2xvclBpY2tlckNvbnRyb2xzOiBcImRlZmF1bHRcIiB8IFwib25seS1hbHBoYVwiIHwgXCJuby1hbHBoYVwiLFxyXG4gICAgcG9zaXRpb246IFwidG9wXCIgfCBcImJvdHRvbVwiXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNvbG9yUGlja2VyQ29udHJvbHMgPSBjb2xvclBpY2tlckNvbnRyb2xzO1xyXG4gICAgdGhpcy50cmlnZ2VySW5zdGFuY2UgPSB0cmlnZ2VySW5zdGFuY2U7XHJcbiAgICB0aGlzLlRyaWdnZXJCQm94ID0gdHJpZ2dlckVsZW1lbnRSZWY7XHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB0aGlzLmhpZGVDb2xvclBpY2tlciA9IGhpZGVDb2xvclBpY2tlcjtcclxuICAgIHRoaXMuaGlkZVRleHRJbnB1dCA9IGhpZGVUZXh0SW5wdXQ7XHJcbiAgICB0aGlzLmFjY2VwdExhYmVsID0gYWNjZXB0TGFiZWw7XHJcbiAgICB0aGlzLmNhbmNlbExhYmVsID0gY2FuY2VsTGFiZWw7XHJcbiAgICBpZiAoZm9ybWF0KSB7XHJcbiAgICAgIGlmIChmb3JtYXRzLmluY2x1ZGVzKGZvcm1hdCkpIHtcclxuICAgICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdHMuaW5kZXhPZihmb3JtYXQudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgdGhpcy5jYW5DaGFuZ2VGb3JtYXQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0Rm9ybWF0QnlTdHJpbmcodGhpcy5jb2xvcikgIT0gZm9ybWF0LnRvTG93ZXJDYXNlKClcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHRoaXMuc2V0Q29sb3JGcm9tSHN2YSh0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Ic3ZhKHRoaXMuY29sb3IpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkZvcm1hdCBwcm92aWRlZCBpcyBpbnZhbGlkLCB1c2luZyBIRVhcIik7XHJcbiAgICAgICAgdGhpcy5mb3JtYXQgPSBDb2xvckZvcm1hdHMuSEVYO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZvcm1hdCA9IGZvcm1hdHMuaW5kZXhPZih0aGlzLnNlcnZpY2UuZ2V0Rm9ybWF0QnlTdHJpbmcodGhpcy5jb2xvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJldmlld0NvbG9yID0gdGhpcy5jb2xvcjtcclxuICAgIHRoaXMucGFsZXR0ZSA9IHBhbGV0dGUgPz8gRGVmYXVsdENvbG9ycztcclxuICAgIHRoaXMuY29sb3JzQW5pbWF0aW9uRWZmZWN0ID0gYW5pbWF0aW9uO1xyXG4gICAgaWYgKHBvc2l0aW9uID09IFwidG9wXCIpIHtcclxuICAgICAgbGV0IFRyaWdnZXJCQm94ID0gdGhpcy5UcmlnZ2VyQkJveC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uU3RyaW5nID1cclxuICAgICAgICBcInRyYW5zZm9ybTogdHJhbnNsYXRlWShjYWxjKCAtMTAwJSAtIFwiICsgVHJpZ2dlckJCb3guaGVpZ2h0ICsgXCJweCApKVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFBvc2l0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuVHJpZ2dlckJCb3gpIHtcclxuICAgICAgdmFyIHZpZXdwb3J0T2Zmc2V0ID1cclxuICAgICAgICB0aGlzLlRyaWdnZXJCQm94Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIHRoaXMudG9wID0gdmlld3BvcnRPZmZzZXQudG9wICsgdmlld3BvcnRPZmZzZXQuaGVpZ2h0O1xyXG4gICAgICB0aGlzLmxlZnQgPVxyXG4gICAgICAgIHZpZXdwb3J0T2Zmc2V0LmxlZnQgKyA0MjAgPiB3aW5kb3cuaW5uZXJXaWR0aFxyXG4gICAgICAgICAgPyB2aWV3cG9ydE9mZnNldC5yaWdodCAtIDQyMFxyXG4gICAgICAgICAgOiB2aWV3cG9ydE9mZnNldC5sZWZ0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRQb3NpdGlvblkoKSB7XHJcbiAgICB2YXIgdHJpZ2dlckJCb3ggPSB0aGlzLlRyaWdnZXJCQm94Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICB2YXIgcGFuZWxCQm94ID0gdGhpcy5wYW5lbFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgdmFyIHBhbmVsSGVpZ2h0ID0gcGFuZWxCQm94LmhlaWdodDtcclxuXHJcbiAgICAvL0NoZWNrIGZvciBzcGFjZSBhYm92ZSB0aGUgdHJpZ2dlclxyXG4gICAgaWYgKDAgPiBwYW5lbEJCb3gudG9wIC0gNSkge1xyXG4gICAgICB0aGlzLnBvc2l0aW9uU3RyaW5nID0gXCJcIjtcclxuICAgIH1cclxuICAgIC8vQ2hlY2sgZm9yIHNwYWNlIGJlbG93IHRoZSB0cmlnZ2VyXHJcbiAgICBpZiAocGFuZWxIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAocGFuZWxCQm94LnRvcCAtIDUpKSB7XHJcbiAgICAgIC8vdGhlcmUgaXMgbm8gc3BhY2UsIG1vdmUgcGFuZWwgb3ZlciB0aGUgdHJpZ2dlclxyXG4gICAgICB0aGlzLnBvc2l0aW9uU3RyaW5nID1cclxuICAgICAgICBcInRyYW5zZm9ybTogdHJhbnNsYXRlWShjYWxjKCAtMTAwJSAtIFwiICsgdHJpZ2dlckJCb3guaGVpZ2h0ICsgXCJweCApKTtcIjtcclxuICAgIH1cclxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYXNWYXJpYW50KGNvbG9yKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMucHJldmlld0NvbG9yKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiAoXHJcbiAgICAgIHR5cGVvZiBjb2xvciAhPSBcInN0cmluZ1wiICYmXHJcbiAgICAgIGNvbG9yLnZhcmlhbnRzLnNvbWUoXHJcbiAgICAgICAgKHYpID0+IHYudG9VcHBlckNhc2UoKSA9PSB0aGlzLnByZXZpZXdDb2xvci50b1VwcGVyQ2FzZSgpXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNTZWxlY3RlZChjb2xvcikge1xyXG4gICAgaWYgKCF0aGlzLnByZXZpZXdDb2xvcikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICB0eXBlb2YgY29sb3IgPT0gXCJzdHJpbmdcIiAmJlxyXG4gICAgICBjb2xvci50b1VwcGVyQ2FzZSgpID09IHRoaXMucHJldmlld0NvbG9yLnRvVXBwZXJDYXNlKClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QmFja2dyb3VuZENvbG9yKGNvbG9yKSB7XHJcbiAgICBpZiAodHlwZW9mIGNvbG9yID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgcmV0dXJuIHsgYmFja2dyb3VuZDogY29sb3IgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB7IGJhY2tncm91bmQ6IGNvbG9yPy5wcmV2aWV3IH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25BbHBoYUNoYW5nZShldmVudCkge1xyXG4gICAgdGhpcy5wYWxldHRlID0gdGhpcy5DaGFuZ2VBbHBoYU9uUGFsZXR0ZShldmVudCwgdGhpcy5wYWxldHRlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgQ2hhbmdlQWxwaGFPblBhbGV0dGUoXHJcbiAgICBhbHBoYSxcclxuICAgIGNvbG9yczogQXJyYXk8c3RyaW5nIHwgTmd4Q29sb3I+XHJcbiAgKTogQXJyYXk8YW55PiB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW2ldO1xyXG4gICAgICBpZiAodHlwZW9mIGNvbG9yID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBjb25zdCBuZXdDb2xvciA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEoY29sb3IpO1xyXG4gICAgICAgIG5ld0NvbG9yLm9uQWxwaGFDaGFuZ2UoYWxwaGEpO1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuc2VydmljZS50b0Zvcm1hdChuZXdDb2xvciwgdGhpcy5mb3JtYXQpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBuZXdDb2xvciA9IG5ldyBOZ3hDb2xvcigpO1xyXG4gICAgICAgIGNvbnN0IG5ld0NvbG9yUHJldmlldyA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEoY29sb3IucHJldmlldyk7XHJcbiAgICAgICAgbmV3Q29sb3JQcmV2aWV3Lm9uQWxwaGFDaGFuZ2UoYWxwaGEpO1xyXG4gICAgICAgIG5ld0NvbG9yLnByZXZpZXcgPSB0aGlzLnNlcnZpY2UudG9Gb3JtYXQobmV3Q29sb3JQcmV2aWV3LCB0aGlzLmZvcm1hdCk7XHJcbiAgICAgICAgbmV3Q29sb3IudmFyaWFudHMgPSB0aGlzLkNoYW5nZUFscGhhT25QYWxldHRlKGFscGhhLCBjb2xvci52YXJpYW50cyk7XHJcbiAgICAgICAgcmVzdWx0LnB1c2gobmV3Q29sb3IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlIGNvbG9yIGZyb20gZGVmYXVsdCBjb2xvcnNcclxuICAgKiBAcGFyYW0gc3RyaW5nIGNvbG9yXHJcbiAgICovXHJcbiAgcHVibGljIGNoYW5nZUNvbG9yKGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0Q29sb3JGcm9tU3RyaW5nKGNvbG9yKTtcclxuICAgIHRoaXMubWVudSA9IDE7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25DaGFuZ2VDb2xvclBpY2tlcihldmVudDogSHN2YSkge1xyXG4gICAgdGhpcy50ZW1wb3JhbENvbG9yID0gZXZlbnQ7XHJcbiAgICB0aGlzLmNvbG9yID0gdGhpcy5zZXJ2aWNlLnRvRm9ybWF0KGV2ZW50LCB0aGlzLmZvcm1hdCk7XHJcbiAgICB0aGlzLnRyaWdnZXJJbnN0YW5jZS5zbGlkZXJDaGFuZ2UoXHJcbiAgICAgIHRoaXMuc2VydmljZS50b0Zvcm1hdChldmVudCwgdGhpcy5mb3JtYXQpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZUNvbG9yTWFudWFsKGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0Q29sb3JGcm9tU3RyaW5nKGNvbG9yKTtcclxuICB9XHJcblxyXG4gIHNldENvbG9yRnJvbUhzdmEodmFsdWU6IEhzdmEpIHtcclxuICAgIHRoaXMuaHN2YSA9IHZhbHVlO1xyXG4gICAgdGhpcy5jb2xvciA9IHRoaXMuc2VydmljZS50b0Zvcm1hdCh2YWx1ZSwgdGhpcy5mb3JtYXQpO1xyXG4gICAgdGhpcy5wcmV2aWV3Q29sb3IgPSB0aGlzLnNlcnZpY2UuaHN2YVRvUmdiYSh2YWx1ZSkudG9TdHJpbmcoKTtcclxuICB9XHJcblxyXG4gIHNldENvbG9yRnJvbVN0cmluZyhjb2xvcjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmhzdmEgPSB0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Ic3ZhKGNvbG9yKTtcclxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIHRoaXMucHJldmlld0NvbG9yID0gY29sb3I7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Db2xvckNsaWNrKGNvbG9yKSB7XHJcbiAgICBpZiAodHlwZW9mIGNvbG9yID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQ29sb3IoY29sb3IpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YXJpYW50cyA9IGNvbG9yLnZhcmlhbnRzO1xyXG4gICAgICB0aGlzLm1lbnUgPSAyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5leHRGb3JtYXQoKSB7XHJcbiAgICBpZiAodGhpcy5jYW5DaGFuZ2VGb3JtYXQpIHtcclxuICAgICAgdGhpcy5mb3JtYXQgPSAodGhpcy5mb3JtYXQgKyAxKSAlIHRoaXMuY29sb3JGb3JtYXRzLmxlbmd0aDtcclxuICAgICAgdGhpcy5zZXRDb2xvckZyb21Ic3ZhKHRoaXMuaHN2YSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMudHJpZ2dlckluc3RhbmNlLmNsb3NlKCk7XHJcbiAgfVxyXG5cclxuICBhY2NlcHQoKSB7XHJcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgdGhpcy50cmlnZ2VySW5zdGFuY2Uuc2V0Q29sb3IodGhpcy5jb2xvcik7XHJcbiAgICAgIHRoaXMudHJpZ2dlckluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25DbGlja0JhY2soKSB7XHJcbiAgICBpZiAodGhpcy5tZW51ID09IDMpIHtcclxuICAgICAgdGhpcy5jb2xvciA9IHRoaXMuYmFja3VwQ29sb3I7XHJcbiAgICAgIHRoaXMuaHN2YSA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEodGhpcy5jb2xvcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluZGV4U2VsZWNjaW9uYWRvID0gdGhpcy5maW5kSW5kZXhTZWxlY3RlZENvbG9yKHRoaXMucGFsZXR0ZSk7XHJcbiAgICB0aGlzLm1lbnUgPSAxO1xyXG4gIH1cclxuXHJcbiAgaXNPdXRzaWRlKGV2ZW50KSB7XHJcbiAgICByZXR1cm4gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm5neC1jb2xvcnMtb3ZlcmxheVwiKTtcclxuICB9XHJcblxyXG4gIG9uT3BlbmVkU2Nyb2xsKCRldmVudCkge1xyXG4gICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICFIRVhfUkVHRVgudGVzdCh0aGlzLmNvbG9yKTtcclxuICB9XHJcbn1cclxuIiwiPGRpdlxyXG4gIGNsYXNzPVwib3BlbmVkXCJcclxuICBbc3R5bGVdPVwicG9zaXRpb25TdHJpbmdcIlxyXG4gIChzY3JvbGwpPVwib25PcGVuZWRTY3JvbGwoJGV2ZW50KVwiXHJcbiAgI2RpYWxvZ1xyXG4+XHJcbiAgPHNlY3Rpb24gY2xhc3M9XCJtYWluLWNvbnRlbnQtY29udGFpbmVyXCI+XHJcbiAgICA8YXJ0aWNsZSBjbGFzcz1cImxlZnRcIj5cclxuICAgICAgPCEtLU1lbnUgMS0tPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibWVudSA9PSAxXCI+XHJcbiAgICAgICAgPCEtLUNvbG9yIGxpc3QtLT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sb3JzXCIgW0Bjb2xvcnNBbmltYXRpb25dPVwiY29sb3JzQW5pbWF0aW9uRWZmZWN0XCI+XHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2xvciBvZiBwYWxldHRlOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgd3JhcHBlciBjb2xvclwiPlxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNvbG9yQ2xpY2soY29sb3IpXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwiY2lyY2xlIGNvbG9yIGNpcmNsZS1ib3JkZXJcIlxyXG4gICAgICAgICAgICAgICAgW25nU3R5bGVdPVwiZ2V0QmFja2dyb3VuZENvbG9yKGNvbG9yKVwiXHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImkgPT0gdGhpcy5pbmRleFNlbGVjY2lvbmFkb1wiIGNsYXNzPVwic2VsZWN0ZWRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICA8IS0tTWVudSAyOiBWYXJpYW50cyBvZiBzZWxlY3RlZCBjb2xvci0tPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibWVudSA9PSAyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbG9yc1wiIFtAY29sb3JzQW5pbWF0aW9uXT1cImNvbG9yc0FuaW1hdGlvbkVmZmVjdFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNpcmNsZSB3cmFwcGVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgKGNsaWNrKT1cIm9uQ2xpY2tCYWNrKClcIiBjbGFzcz1cImFkZFwiPlxyXG4gICAgICAgICAgICAgIDxzdmdcclxuICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgICAgICAgd2lkdGg9XCIyNFwiXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ9XCIyNFwiXHJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cclxuICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgIGQ9XCJNMjAgMTFINy44M2w1LjU5LTUuNTlMMTIgNGwtOCA4IDggOCAxLjQxLTEuNDFMNy44MyAxM0gyMHYtMnpcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCB2YXJpYW50IG9mIHZhcmlhbnRzXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaXJjbGUgd3JhcHBlciBjb2xvclwiPlxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VDb2xvcih2YXJpYW50KVwiXHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImNpcmNsZSBjaXJjbGUtYm9yZGVyXCJcclxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInsgYmFja2dyb3VuZDogdmFyaWFudCB9XCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNTZWxlY3RlZCh2YXJpYW50KVwiIGNsYXNzPVwic2VsZWN0ZWRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2FydGljbGU+XHJcblxyXG4gICAgPGFydGljbGUgY2xhc3M9XCJyaWdodFwiPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3M9XCJjb2xvci1waWNrZXItd3JhcHBlclwiXHJcbiAgICAgICAgKm5nSWY9XCIhaGlkZUNvbG9yUGlja2VyICYmIHRoaXMuY29sb3JQaWNrZXJDb250cm9scyAhPSAnb25seS1hbHBoYSdcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPCEtLSA8c3BhbiBbKGNvbG9yUGlja2VyKV09XCJjb2xvclwiPjwvc3Bhbj4gLS0+XHJcbiAgICAgICAgPGNvbG9yLXBpY2tlclxyXG4gICAgICAgICAgW2NvbnRyb2xzXT1cImNvbG9yUGlja2VyQ29udHJvbHNcIlxyXG4gICAgICAgICAgW2NvbG9yXT1cImhzdmFcIlxyXG4gICAgICAgICAgKHNsaWRlckNoYW5nZSk9XCJvbkNoYW5nZUNvbG9yUGlja2VyKCRldmVudClcIlxyXG4gICAgICAgID48L2NvbG9yLXBpY2tlcj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxjb2xvci1waWNrZXJcclxuICAgICAgICAqbmdJZj1cIiFoaWRlQ29sb3JQaWNrZXIgJiYgdGhpcy5jb2xvclBpY2tlckNvbnRyb2xzID09ICdvbmx5LWFscGhhJ1wiXHJcbiAgICAgICAgW2NvbnRyb2xzXT1cImNvbG9yUGlja2VyQ29udHJvbHNcIlxyXG4gICAgICAgIFtjb2xvcl09XCJoc3ZhXCJcclxuICAgICAgICAoY29sb3JDaGFuZ2UpPVwib25DaGFuZ2VDb2xvclBpY2tlcigkZXZlbnQpXCJcclxuICAgICAgICAob25BbHBoYUNoYW5nZSk9XCJvbkFscGhhQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICA+PC9jb2xvci1waWNrZXI+XHJcbiAgICA8L2FydGljbGU+XHJcbiAgPC9zZWN0aW9uPlxyXG5cclxuICA8IS0tRm9ybWF0ICYgTWFudWFsIGlucHV0LS0+XHJcbiAgPGRpdiBjbGFzcz1cIm1hbnVhbC1pbnB1dC13cmFwcGVyXCIgKm5nSWY9XCIhaGlkZVRleHRJbnB1dFwiPlxyXG4gICAgPHAgKGNsaWNrKT1cIm5leHRGb3JtYXQoKVwiPnt7IGNvbG9yRm9ybWF0c1tmb3JtYXRdIH19PC9wPlxyXG4gICAgPGRpdiBjbGFzcz1cImctaW5wdXRcIj5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCIjRkZGRkZGXCJcclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgW3ZhbHVlXT1cImNvbG9yXCJcclxuICAgICAgICBbc3R5bGUuZm9udC1zaXplLnB4XT1cImNvbG9yICYmIGNvbG9yLmxlbmd0aCA+IDIzID8gOSA6IDEwXCJcclxuICAgICAgICBbc3R5bGUubGV0dGVyLXNwYWNpbmcucHhdPVwiY29sb3IgJiYgY29sb3IubGVuZ3RoID4gMTYgPyAwIDogMS41XCJcclxuICAgICAgICAoa2V5dXApPVwiY2hhbmdlQ29sb3JNYW51YWwocGFpbnRJbnB1dC52YWx1ZSlcIlxyXG4gICAgICAgIChrZXlkb3duLmVudGVyKT1cImFjY2VwdCgpXCJcclxuICAgICAgICAjcGFpbnRJbnB1dFxyXG4gICAgICAvPlxyXG4gICAgICA8c3BhbiAqbmdJZj1cImRpc2FibGVkXCIgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+XHJcbiAgICAgICAgQ29sb3IgdmFsdWUgc2hvdWxkIGJlIGhleGEgZm9ybWF0XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG5cclxuICA8ZGl2IGNsYXNzPVwibmF2LXdyYXBwZXJcIj5cclxuICAgIDxidXR0b24gKGNsaWNrKT1cImNsb3NlKClcIiBzdHlsZT1cImZsb2F0OiByaWdodFwiPlxyXG4gICAgICB7eyBjYW5jZWxMYWJlbCB9fVxyXG4gICAgPC9idXR0b24+XHJcbiAgICA8YnV0dG9uIChjbGljayk9XCJhY2NlcHQoKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIHN0eWxlPVwiZmxvYXQ6IHJpZ2h0XCI+XHJcbiAgICAgIHt7IGFjY2VwdExhYmVsIH19XHJcbiAgICA8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==