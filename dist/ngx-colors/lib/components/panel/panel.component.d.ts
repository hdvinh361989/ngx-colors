import { OnInit, ChangeDetectorRef, ElementRef } from "@angular/core";
import { ColorFormats } from "../../enums/formats";
import { ConverterService } from "../../services/converter.service";
import { NgxColorsTriggerDirective } from "../../directives/ngx-colors-trigger.directive";
import { Hsva } from "../../clases/formats";
import * as i0 from "@angular/core";
export declare class PanelComponent implements OnInit {
    service: ConverterService;
    private cdr;
    click(event: any): void;
    onScroll(event: any): void;
    onResize(): void;
    top: number;
    left: number;
    panelRef: ElementRef;
    constructor(service: ConverterService, cdr: ChangeDetectorRef);
    color: string;
    previewColor: string;
    hsva: Hsva;
    colorsAnimationEffect: string;
    palette: {
        color: string;
        preview: string;
        variants: string[];
    }[];
    variants: any[];
    colorFormats: string[];
    format: ColorFormats;
    canChangeFormat: boolean;
    menu: number;
    hideColorPicker: boolean;
    hideTextInput: boolean;
    acceptLabel: string;
    cancelLabel: string;
    colorPickerControls: "default" | "only-alpha" | "no-alpha";
    private triggerInstance;
    private TriggerBBox;
    isSelectedColorInPalette: boolean;
    indexSeleccionado: any;
    positionString: any;
    temporalColor: any;
    backupColor: any;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private onScreenMovement;
    private findIndexSelectedColor;
    iniciate(triggerInstance: NgxColorsTriggerDirective, triggerElementRef: any, color: any, palette: any, animation: any, format: string, hideTextInput: boolean, hideColorPicker: boolean, acceptLabel: string, cancelLabel: string, colorPickerControls: "default" | "only-alpha" | "no-alpha", position: "top" | "bottom"): void;
    setPosition(): void;
    private setPositionY;
    hasVariant(color: any): boolean;
    isSelected(color: any): boolean;
    getBackgroundColor(color: any): {
        background: any;
    };
    onAlphaChange(event: any): void;
    private ChangeAlphaOnPalette;
    /**
     * Change color from default colors
     * @param string color
     */
    changeColor(color: string): void;
    onChangeColorPicker(event: Hsva): void;
    changeColorManual(color: string): void;
    setColorFromHsva(value: Hsva): void;
    setColorFromString(color: string): void;
    onColorClick(color: any): void;
    nextFormat(): void;
    close(): void;
    accept(): void;
    onClickBack(): void;
    isOutside(event: any): any;
    onOpenedScroll($event: any): void;
    get disabled(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<PanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PanelComponent, "ngx-colors-panel", never, {}, {}, never, never, false, never>;
}
