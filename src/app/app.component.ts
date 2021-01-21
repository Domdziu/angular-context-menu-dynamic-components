import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { ContextMenuComponent } from "./context-menu/context-menu.component";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild("container", { read: ViewContainerRef })
  container: ViewContainerRef;

  private componentRef: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public createMenuComponent(elementId: string): void {
    if (this.componentRef) this.componentRef.destroy();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ContextMenuComponent
    );

    this.componentRef = this.container.createComponent(componentFactory);
    const componentInstance = <ContextMenuComponent>this.componentRef.instance;

    componentInstance.buttonHtmlElement = document.getElementById(elementId);
    componentInstance.destroyComponentEmitter.subscribe(x => {
      if (x) this.destroyMenuComponent();
    });
  }

  private destroyMenuComponent() {
    this.componentRef.destroy();
  }
}
