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
PanelFactoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: PanelFactoryService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }, { token: NGX_COLOR_ATTACH_TO }], target: i0.ɵɵFactoryTarget.Injectable });
PanelFactoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: PanelFactoryService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.1.2", ngImport: i0, type: PanelFactoryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [NGX_COLOR_ATTACH_TO]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtZmFjdG9yeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNvbG9ycy9zcmMvbGliL3NlcnZpY2VzL3BhbmVsLWZhY3Rvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxFQUdWLE1BQU0sRUFNUSxjQUFjLEdBQzdCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7O0FBRWhELE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLElBQUksY0FBYyxDQUFDLG9CQUFvQixFQUFFO0lBQzFFLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7Q0FDdEIsQ0FBQyxDQUFDO0FBR0gsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUNVLFFBQWtDLEVBQ2xDLGNBQThCLEVBQzlCLFFBQWtCLEVBQ1csUUFBOEM7UUFIM0UsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDVyxhQUFRLEdBQVIsUUFBUSxDQUFzQztJQUVyRixDQUFDO0lBTUQsV0FBVyxDQUNULFdBQXVELElBQUksQ0FBQyxRQUFRLEVBQ3BFLGdCQUFvQztRQUVwQyxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ25DLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtRQUNELE1BQU0sT0FBTyxHQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELE1BQU0sT0FBTyxHQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBaUM7YUFDakUsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUUvQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsb0JBQW9CLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDdkMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7O2dIQW5EVSxtQkFBbUIsZ0hBS3BCLG1CQUFtQjtvSEFMbEIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVU7OzBCQU1OLE1BQU07MkJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBJbmplY3RhYmxlLFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBJbmplY3RvcixcclxuICBJbmplY3QsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVHlwZSxcclxuICBDb21wb25lbnRGYWN0b3J5LFxyXG4gIEFwcGxpY2F0aW9uUmVmLFxyXG4gIEVtYmVkZGVkVmlld1JlZixcclxuICBDb21wb25lbnRSZWYsIEluamVjdGlvblRva2VuLFxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHtQYW5lbENvbXBvbmVudH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGFuZWwvcGFuZWwuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7T1ZFUkxBWV9TVFlMRVN9IGZyb20gXCIuL292ZXJsYXktc3R5bGVzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgTkdYX0NPTE9SX0FUVEFDSF9UTyA9IG5ldyBJbmplY3Rpb25Ub2tlbignTmd4LWNvbG9yIGF0dGFjaFRvJywge1xyXG4gIHByb3ZpZGVkSW46ICdyb290JyxcclxuICBmYWN0b3J5OiAoKSA9PiB2b2lkIDBcclxufSk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQYW5lbEZhY3RvcnlTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgICBASW5qZWN0KE5HWF9DT0xPUl9BVFRBQ0hfVE8pIHByaXZhdGUgYXR0YWNoVG86IEhUTUxFbGVtZW50fEVsZW1lbnR8c3RyaW5nfHVuZGVmaW5lZFxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8UGFuZWxDb21wb25lbnQ+O1xyXG4gIF9mYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PFBhbmVsQ29tcG9uZW50PjtcclxuICBvdmVybGF5O1xyXG5cclxuICBjcmVhdGVQYW5lbChcclxuICAgIGF0dGFjaFRvOiBzdHJpbmcgfCBIVE1MRWxlbWVudCB8IEVsZW1lbnQgfCB1bmRlZmluZWQgPSB0aGlzLmF0dGFjaFRvLFxyXG4gICAgb3ZlcmxheUNsYXNzTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkXHJcbiAgKTogQ29tcG9uZW50UmVmPFBhbmVsQ29tcG9uZW50PiB7XHJcbiAgICBpZiAodGhpcy5jb21wb25lbnRSZWYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnJlbW92ZVBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBmYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PFBhbmVsQ29tcG9uZW50PiA9XHJcbiAgICAgIHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUGFuZWxDb21wb25lbnQpO1xyXG5cclxuICAgIHRoaXMuY29tcG9uZW50UmVmID0gZmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcodGhpcy5jb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG4gICAgY29uc3QgZG9tRWxlbSA9ICh0aGlzLmNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PilcclxuICAgICAgLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICB0aGlzLm92ZXJsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGhpcy5vdmVybGF5LmlkID0gXCJuZ3gtY29sb3JzLW92ZXJsYXlcIjtcclxuICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwibmd4LWNvbG9ycy1vdmVybGF5XCIpO1xyXG4gICAgdGhpcy5vdmVybGF5LmNsYXNzTGlzdC5hZGQob3ZlcmxheUNsYXNzTmFtZSk7XHJcbiAgICBPYmplY3Qua2V5cyhPVkVSTEFZX1NUWUxFUykuZm9yRWFjaCgoYXR0cjogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMub3ZlcmxheS5zdHlsZVthdHRyXSA9IE9WRVJMQVlfU1RZTEVTW2F0dHJdO1xyXG4gICAgfSk7XHJcbiAgICBpZiAoIWF0dGFjaFRvKSB7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGF0dGFjaFRvID09PSAnc3RyaW5nJykge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhdHRhY2hUbykuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGF0dGFjaFRvLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm92ZXJsYXkuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50UmVmO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlUGFuZWwoKSB7XHJcbiAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLmRldGFjaFZpZXcodGhpcy5jb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5vdmVybGF5LnJlbW92ZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=