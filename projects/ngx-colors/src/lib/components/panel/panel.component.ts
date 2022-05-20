import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  HostListener,
  HostBinding,
} from "@angular/core";
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
  keyframes,
} from "@angular/animations";
import {isDescendantOrSame} from "../../helpers/helpers";
import {ColorFormats} from "../../enums/formats";
import {ConverterService} from "../../services/converter.service";
import {DefaultColors} from "../../helpers/default-colors";
import {formats} from "../../helpers/formats";
import {NgxColorsTriggerDirective} from "../../directives/ngx-colors-trigger.directive";
import {Hsva} from "../../clases/formats";
import {NgxColor} from "../../clases/color";

@Component({
  selector: "ngx-colors-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.scss"],
  animations: [
    trigger("colorsAnimation", [
      transition("void => slide-in", [
        // Initially all colors are hidden
        query(":enter", style({opacity: 0}), {optional: true}),
        //slide-in animation
        query(
          ":enter",
          stagger("10ms", [
            animate(
              ".3s ease-in",
              keyframes([
                style({opacity: 0, transform: "translatex(-50%)", offset: 0}),
                style({
                  opacity: 0.5,
                  transform: "translatex(-10px) scale(1.1)",
                  offset: 0.3,
                }),
                style({opacity: 1, transform: "translatex(0)", offset: 1}),
              ])
            ),
          ]),
          {optional: true}
        ),
      ]),
      //popup animation
      transition("void => popup", [
        query(":enter", style({opacity: 0, transform: "scale(0)"}), {
          optional: true,
        }),
        query(
          ":enter",
          stagger("10ms", [
            animate(
              "500ms ease-out",
              keyframes([
                style({opacity: 0.5, transform: "scale(.5)", offset: 0.3}),
                style({opacity: 1, transform: "scale(1.1)", offset: 0.8}),
                style({opacity: 1, transform: "scale(1)", offset: 1}),
              ])
            ),
          ]),
          {optional: true}
        ),
      ]),
    ]),
  ],
})
export class PanelComponent implements OnInit {
  @HostListener("document:mousedown", ["$event"])
  click(event) {
    if (this.isOutside(event)) {
      // this.emitClose("cancel");
    }
  }

  @HostListener("document:scroll", ['$event'])
  onScroll(event) {
    this.onScreenMovement();
  }

  @HostListener("window:resize")
  onResize() {
    this.onScreenMovement();
  }

  @HostBinding("style.top.px") public top: number;
  @HostBinding("style.left.px") public left: number;
  @ViewChild("dialog") panelRef: ElementRef;

  constructor(
    public service: ConverterService,
    private cdr: ChangeDetectorRef
  ) {
  }

  color = "#000000";

  public previewColor: string = "#000000";
  public hsva = new Hsva(0, 1, 1, 1);

  public colorsAnimationEffect = "slide-in";

  public palette = DefaultColors;
  public variants = [];

  public colorFormats = formats;
  public format: ColorFormats = ColorFormats.HEX;

  public canChangeFormat: boolean = true;

  public menu = 1;

  public hideColorPicker: boolean = false;
  public hideTextInput: boolean = false;
  public acceptLabel: string;
  public cancelLabel: string;
  public colorPickerControls: "default" | "only-alpha" | "no-alpha" = "default";
  private triggerInstance: NgxColorsTriggerDirective;
  private TriggerBBox;
  public isSelectedColorInPalette: boolean;
  public indexSeleccionado;
  public positionString;
  public temporalColor;
  public backupColor;

  public ngOnInit() {
    this.setPosition();
    this.hsva = this.service.stringToHsva(this.color);
    this.indexSeleccionado = this.findIndexSelectedColor(this.palette);
  }

  public ngAfterViewInit() {
    this.setPositionY();
  }

  private onScreenMovement() {
    this.setPosition();
    this.setPositionY();
    if (!this.panelRef.nativeElement.style.transition) {
      this.panelRef.nativeElement.style.transition = "transform 0.5s ease-out";
    }
  }

  private findIndexSelectedColor(colors): number {
    let resultIndex = undefined;
    if (this.color) {
      for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        if (typeof color == "string") {
          if (
            this.service.stringToFormat(this.color, ColorFormats.HEX) ==
            this.service.stringToFormat(color, ColorFormats.HEX)
          ) {
            resultIndex = i;
          }
        } else {
          if (this.findIndexSelectedColor(color.variants) != undefined) {
            resultIndex = i;
          }
        }
      }
    }
    return resultIndex;
  }

  public iniciate(
    triggerInstance: NgxColorsTriggerDirective,
    triggerElementRef,
    color,
    palette,
    animation,
    format: string,
    hideTextInput: boolean,
    hideColorPicker: boolean,
    acceptLabel: string,
    cancelLabel: string,
    colorPickerControls: "default" | "only-alpha" | "no-alpha",
    position: "top" | "bottom"
  ) {
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
        if (
          this.service.getFormatByString(this.color) != format.toLowerCase()
        ) {
          this.setColorFromHsva(this.service.stringToHsva(this.color));
        }
      } else {
        console.error("Format provided is invalid, using HEX");
        this.format = ColorFormats.HEX;
      }
    } else {
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

  public setPosition() {
    if (this.TriggerBBox) {
      var viewportOffset =
        this.TriggerBBox.nativeElement.getBoundingClientRect();
      this.top = viewportOffset.top + viewportOffset.height;
      this.left =
        viewportOffset.left + 420 > window.innerWidth
          ? viewportOffset.right - 420
          : viewportOffset.left;
    }
  }

  private setPositionY() {
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

  public hasVariant(color): boolean {
    if (!this.previewColor) {
      return false;
    }
    return (
      typeof color != "string" &&
      color.variants.some(
        (v) => v.toUpperCase() == this.previewColor.toUpperCase()
      )
    );
  }

  public isSelected(color) {
    if (!this.previewColor) {
      return false;
    }
    return (
      typeof color == "string" &&
      color.toUpperCase() == this.previewColor.toUpperCase()
    );
  }

  public getBackgroundColor(color) {
    if (typeof color == "string") {
      return {background: color};
    } else {
      return {background: color?.preview};
    }
  }

  public onAlphaChange(event) {
    this.palette = this.ChangeAlphaOnPalette(event, this.palette);
  }

  private ChangeAlphaOnPalette(
    alpha,
    colors: Array<string | NgxColor>
  ): Array<any> {
    const result = [];
    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];
      if (typeof color == "string") {
        const newColor = this.service.stringToHsva(color);
        newColor.onAlphaChange(alpha);
        result.push(this.service.toFormat(newColor, this.format));
      } else {
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
  public changeColor(color: string): void {
    this.setColorFromString(color);
    this.menu = 1;
  }

  public onChangeColorPicker(event: Hsva) {
    this.temporalColor = event;
    this.color = this.service.toFormat(event, this.format);
    this.triggerInstance.sliderChange(
      this.service.toFormat(event, this.format)
    );
  }

  public changeColorManual(color: string): void {
    this.setColorFromString(color);
  }

  setColorFromHsva(value: Hsva) {
    this.hsva = value;
    this.color = this.service.toFormat(value, this.format);
    this.previewColor = this.service.hsvaToRgba(value).toString();
  }

  setColorFromString(color: string) {
    this.hsva = this.service.stringToHsva(color);
    this.color = color;
    this.previewColor = color;
  }

  public onColorClick(color) {
    if (typeof color === 'string') {
      this.changeColor(color);
    } else {
      this.variants = color.variants;
      this.menu = 2;
    }
  }

  public nextFormat() {
    if (this.canChangeFormat) {
      this.format = (this.format + 1) % this.colorFormats.length;
      this.setColorFromHsva(this.hsva);
    }
  }

  close(){
    this.triggerInstance.close();

  }

  accept(){
    this.triggerInstance.setColor(this.color);
    this.triggerInstance.close();

  }

  public onClickBack() {
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

  onOpenedScroll($event){
    $event.stopPropagation();
  }
}
