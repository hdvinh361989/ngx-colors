import { ComponentFactoryResolver, Injector, ComponentFactory, ApplicationRef, ComponentRef, InjectionToken } from "@angular/core";
import { PanelComponent } from "../components/panel/panel.component";
import * as i0 from "@angular/core";
export declare const NGX_COLOR_ATTACH_TO: InjectionToken<any>;
export declare class PanelFactoryService {
    private resolver;
    private applicationRef;
    private injector;
    private attachTo;
    constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector, attachTo: HTMLElement | Element | string | undefined);
    componentRef: ComponentRef<PanelComponent>;
    _factory: ComponentFactory<PanelComponent>;
    overlay: any;
    createPanel(attachTo: string | HTMLElement | Element | undefined, overlayClassName: string | undefined): ComponentRef<PanelComponent>;
    removePanel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PanelFactoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PanelFactoryService>;
}
