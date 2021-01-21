import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";

@Component({
  selector: "app-context-menu",
  templateUrl: "./context-menu.component.html",
  styleUrls: ["./context-menu.component.scss"],
  host: {
    "(window:scroll)": "scrollListening($event)",
    "(document:mousedown)": "closeMenu($event)"
  }
})
export class ContextMenuComponent implements OnInit {
  @Input() buttonHtmlElement: HTMLElement;
  @Output() destroyComponentEmitter: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  public left: string;
  public top: string;

  constructor(private _eref: ElementRef) {}

  ngOnInit() {
    this.setPositionOfMenu();
  }

  private setPositionOfMenu(): void {
    const menuHtmlElement = document.getElementById("menu");
    const positionMenu = menuHtmlElement.getBoundingClientRect();
    const positionButton = this.buttonHtmlElement.getBoundingClientRect();

    this.left = positionButton.left - positionMenu.width + "px";
    this.top = positionButton.top - positionMenu.height + "px";

    if (positionButton.top - positionMenu.height < 0)
      this.top = positionButton.bottom + "px";
  }

  private closeMenu(event: MouseEvent): void {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.destroyThisComponent();
    }
  }

  private scrollListening(event: Event): void {
    this.setPositionOfMenu();
  }

  public destroyThisComponent(): void {
    this.destroyComponentEmitter.emit(true);
  }
}
