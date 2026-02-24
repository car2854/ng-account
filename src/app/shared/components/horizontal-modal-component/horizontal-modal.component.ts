import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { XIcon, LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-horizontal-modal-component',
  templateUrl: './horizontal-modal.component.html',
  styleUrls: ['./horizontal-modal.component.css'],
  imports: [LucideAngularModule],
})
export class HorizontalModalComponentComponent implements AfterViewInit {
  readonly XIcon = XIcon;
  @ViewChild('myModal') myModalRef!: ElementRef<HTMLDialogElement>;
  @Input({ required: true }) title!: string;

  ngAfterViewInit(): void {
    this.myModalRef.nativeElement.addEventListener('click', (event) => {
      const rect = this.myModalRef.nativeElement.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        this.onCloseModal();
      }
    });
  }

  public onOpenModal = () => {
    this.myModalRef.nativeElement.showModal();
    requestAnimationFrame(() => {});
  };

  public onCloseModal = () => {
    this.myModalRef.nativeElement.style.transform = 'translateX(100%)';

    setTimeout(() => {
      this.myModalRef.nativeElement.close();
      this.myModalRef.nativeElement.style.transform = '';
    }, 300);
  };
}
