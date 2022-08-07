import { Injectable, Inject, InjectionToken, } from "@angular/core";
import { PanelComponent } from "../components/panel/panel.component";
import { OVERLAY_STYLES } from "./overlay-styles";
import * as i0 from "@angular/core";
export const NGX_COLOR_ATTACH_TO = new InjectionToken('Ngx-color attachTo', {
    providedIn: 'root',
    factory: () => void 0
});
export class PanelFactoryService {
    constructor(resolver, applicationRef, injector, attachTo) {
        this.resolver = resolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
        this.attachTo = attachTo;
    }
    createPanel(attachTo = this.attachTo, overlayClassName) {
        if (this.componentRef !== undefined) {
            this.removePanel();
        }
        const factory = this.resolver.resolveComponentFactory(PanelComponent);
        this.componentRef = factory.create(this.injector);
        this.applicationRef.attachView(this.componentRef.hostView);
        const domElem = this.componentRef.hostView
            .rootNodes[0];
        this.overlay = document.createElement("div");
        this.overlay.id = "ngx-colors-overlay";
        this.overlay.classList.add("ngx-colors-overlay");
        this.overlay.classList.add(overlayClassName);
        Object.keys(OVERLAY_STYLES).forEach((attr) => {
            this.overlay.style[attr] = OVERLAY_STYLES[attr];
        });
        if (!attachTo) {
            document.body.appendChild(this.overlay);
        }
        else if (typeof attachTo === 'string') {
            document.getElementById(attachTo).appendChild(this.overlay);
        }
        else {
            attachTo.appendChild(this.overlay);
        }
        this.overlay.appendChild(domElem);
        return this.componentRef;
    }
    removePanel() {
        this.applicationRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.overlay.remove();
    }
}
PanelFactoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PanelFactoryService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }, { token: NGX_COLOR_ATTACH_TO }], target: i0.ɵɵFactoryTarget.Injectable });
PanelFactoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PanelFactoryService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PanelFactoryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NGX_COLOR_ATTACH_TO]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtZmFjdG9yeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNvbG9ycy9zcmMvbGliL3NlcnZpY2VzL3BhbmVsLWZhY3Rvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUdWLE1BQU0sRUFNUSxjQUFjLEdBQzdCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7O0FBRWhELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLElBQUksY0FBYyxDQUFDLG9CQUFvQixFQUFFO0lBQzFFLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7Q0FDdEIsQ0FBQyxDQUFDO0FBR0gsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUNVLFFBQWtDLEVBQ2xDLGNBQThCLEVBQzlCLFFBQWtCLEVBQ1csUUFBOEM7UUFIM0UsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDVyxhQUFRLEdBQVIsUUFBUSxDQUFzQztJQUVyRixDQUFDO0lBTUQsV0FBVyxDQUNULFdBQXVELElBQUksQ0FBQyxRQUFRLEVBQ3BFLGdCQUFvQztRQUVwQyxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ25DLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtRQUNELE1BQU0sT0FBTyxHQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELE1BQU0sT0FBTyxHQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBaUM7YUFDakUsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUUvQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsb0JBQW9CLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDdkMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7O2dIQW5EVSxtQkFBbUIsZ0hBS3BCLG1CQUFtQjtvSEFMbEIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVU7OzBCQU1OLE1BQU07MkJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBJbmplY3RvcixcbiAgSW5qZWN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgQXBwbGljYXRpb25SZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgQ29tcG9uZW50UmVmLCBJbmplY3Rpb25Ub2tlbixcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7UGFuZWxDb21wb25lbnR9IGZyb20gXCIuLi9jb21wb25lbnRzL3BhbmVsL3BhbmVsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtPVkVSTEFZX1NUWUxFU30gZnJvbSBcIi4vb3ZlcmxheS1zdHlsZXNcIjtcblxuZXhwb3J0IGNvbnN0IE5HWF9DT0xPUl9BVFRBQ0hfVE8gPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ05neC1jb2xvciBhdHRhY2hUbycsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiAoKSA9PiB2b2lkIDBcbn0pO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFuZWxGYWN0b3J5U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBASW5qZWN0KE5HWF9DT0xPUl9BVFRBQ0hfVE8pIHByaXZhdGUgYXR0YWNoVG86IEhUTUxFbGVtZW50fEVsZW1lbnR8c3RyaW5nfHVuZGVmaW5lZFxuICApIHtcbiAgfVxuXG4gIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFBhbmVsQ29tcG9uZW50PjtcbiAgX2ZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8UGFuZWxDb21wb25lbnQ+O1xuICBvdmVybGF5O1xuXG4gIGNyZWF0ZVBhbmVsKFxuICAgIGF0dGFjaFRvOiBzdHJpbmcgfCBIVE1MRWxlbWVudCB8IEVsZW1lbnQgfCB1bmRlZmluZWQgPSB0aGlzLmF0dGFjaFRvLFxuICAgIG92ZXJsYXlDbGFzc05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuICApOiBDb21wb25lbnRSZWY8UGFuZWxDb21wb25lbnQ+IHtcbiAgICBpZiAodGhpcy5jb21wb25lbnRSZWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5yZW1vdmVQYW5lbCgpO1xuICAgIH1cbiAgICBjb25zdCBmYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PFBhbmVsQ29tcG9uZW50PiA9XG4gICAgICB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFBhbmVsQ29tcG9uZW50KTtcblxuICAgIHRoaXMuY29tcG9uZW50UmVmID0gZmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgdGhpcy5hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KHRoaXMuY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICBjb25zdCBkb21FbGVtID0gKHRoaXMuY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KVxuICAgICAgLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcblxuICAgIHRoaXMub3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5vdmVybGF5LmlkID0gXCJuZ3gtY29sb3JzLW92ZXJsYXlcIjtcbiAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LmFkZChcIm5neC1jb2xvcnMtb3ZlcmxheVwiKTtcbiAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LmFkZChvdmVybGF5Q2xhc3NOYW1lKTtcbiAgICBPYmplY3Qua2V5cyhPVkVSTEFZX1NUWUxFUykuZm9yRWFjaCgoYXR0cjogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLm92ZXJsYXkuc3R5bGVbYXR0cl0gPSBPVkVSTEFZX1NUWUxFU1thdHRyXTtcbiAgICB9KTtcbiAgICBpZiAoIWF0dGFjaFRvKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXR0YWNoVG8gPT09ICdzdHJpbmcnKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhdHRhY2hUbykuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXR0YWNoVG8uYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcbiAgICB9XG4gICAgdGhpcy5vdmVybGF5LmFwcGVuZENoaWxkKGRvbUVsZW0pO1xuXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50UmVmO1xuICB9XG5cbiAgcmVtb3ZlUGFuZWwoKSB7XG4gICAgdGhpcy5hcHBsaWNhdGlvblJlZi5kZXRhY2hWaWV3KHRoaXMuY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgdGhpcy5vdmVybGF5LnJlbW92ZSgpO1xuICB9XG59XG4iXX0=