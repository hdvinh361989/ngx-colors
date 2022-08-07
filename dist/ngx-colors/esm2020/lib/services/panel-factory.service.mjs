import { Injectable, } from "@angular/core";
import { PanelComponent } from "../components/panel/panel.component";
import { OVERLAY_STYLES } from "./overlay-styles";
import * as i0 from "@angular/core";
export class PanelFactoryService {
    constructor(resolver, applicationRef, injector) {
        this.resolver = resolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
    }
    createPanel(attachTo, overlayClassName) {
        if (this.componentRef != undefined) {
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
PanelFactoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PanelFactoryService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
PanelFactoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PanelFactoryService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.0", ngImport: i0, type: PanelFactoryService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtZmFjdG9yeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWNvbG9ycy9zcmMvbGliL3NlcnZpY2VzL3BhbmVsLWZhY3Rvcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsVUFBVSxHQVVYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0FBR2xELE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFDVSxRQUFrQyxFQUNsQyxjQUE4QixFQUM5QixRQUFrQjtRQUZsQixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUN6QixDQUFDO0lBTUosV0FBVyxDQUNULFFBQW1ELEVBQ25ELGdCQUFvQztRQUVwQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksU0FBUyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQjtRQUNELE1BQU0sT0FBTyxHQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFeEQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELE1BQU0sT0FBTyxHQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBaUM7YUFDakUsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUUvQixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsb0JBQW9CLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRTtZQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pDO2FBQU0sSUFBRyxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDdEMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdEO2FBQUk7WUFDSCxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7O2dIQWpEVSxtQkFBbUI7b0hBQW5CLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQUQvQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBJbmplY3RvcixcbiAgSW5qZWN0LFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgQXBwbGljYXRpb25SZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgQ29tcG9uZW50UmVmLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBQYW5lbENvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BhbmVsL3BhbmVsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgT1ZFUkxBWV9TVFlMRVMgfSBmcm9tIFwiLi9vdmVybGF5LXN0eWxlc1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFuZWxGYWN0b3J5U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGFwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxuICApIHt9XG5cbiAgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8UGFuZWxDb21wb25lbnQ+O1xuICBfZmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeTxQYW5lbENvbXBvbmVudD47XG4gIG92ZXJsYXk7XG5cbiAgY3JlYXRlUGFuZWwoXG4gICAgYXR0YWNoVG86c3RyaW5nIHwgSFRNTEVsZW1lbnQgfCBFbGVtZW50IHwgdW5kZWZpbmVkLFxuICAgIG92ZXJsYXlDbGFzc05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZFxuICApOiBDb21wb25lbnRSZWY8UGFuZWxDb21wb25lbnQ+IHtcbiAgICBpZiAodGhpcy5jb21wb25lbnRSZWYgIT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnJlbW92ZVBhbmVsKCk7XG4gICAgfVxuICAgIGNvbnN0IGZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8UGFuZWxDb21wb25lbnQ+ID1cbiAgICAgIHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUGFuZWxDb21wb25lbnQpO1xuXG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSBmYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcodGhpcy5jb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgIGNvbnN0IGRvbUVsZW0gPSAodGhpcy5jb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pXG4gICAgICAucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuXG4gICAgdGhpcy5vdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLm92ZXJsYXkuaWQgPSBcIm5neC1jb2xvcnMtb3ZlcmxheVwiO1xuICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwibmd4LWNvbG9ycy1vdmVybGF5XCIpO1xuICAgIHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuYWRkKG92ZXJsYXlDbGFzc05hbWUpO1xuICAgIE9iamVjdC5rZXlzKE9WRVJMQVlfU1RZTEVTKS5mb3JFYWNoKChhdHRyOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMub3ZlcmxheS5zdHlsZVthdHRyXSA9IE9WRVJMQVlfU1RZTEVTW2F0dHJdO1xuICAgIH0pO1xuICAgIGlmICghYXR0YWNoVG8pIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcbiAgICB9IGVsc2UgaWYodHlwZW9mIGF0dGFjaFRvID09PSAnc3RyaW5nJykge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYXR0YWNoVG8pLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSk7XG4gICAgfWVsc2V7XG4gICAgICBhdHRhY2hUby5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXkpO1xuICAgIH1cbiAgICB0aGlzLm92ZXJsYXkuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XG5cbiAgICByZXR1cm4gdGhpcy5jb21wb25lbnRSZWY7XG4gIH1cblxuICByZW1vdmVQYW5lbCgpIHtcbiAgICB0aGlzLmFwcGxpY2F0aW9uUmVmLmRldGFjaFZpZXcodGhpcy5jb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgIHRoaXMuY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICB0aGlzLm92ZXJsYXkucmVtb3ZlKCk7XG4gIH1cbn1cbiJdfQ==