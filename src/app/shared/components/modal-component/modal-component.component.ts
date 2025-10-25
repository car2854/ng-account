import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css'],
})
export class ModalComponentComponent implements OnInit {
  @ViewChild('myModal') myModalRef!: ElementRef<HTMLDialogElement>;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.myModalRef.nativeElement.addEventListener('click', (event) => {
      if (event.target === this.myModalRef.nativeElement) {
        this.myModalRef.nativeElement.close();
      }
    });
  }

  public onOpenModal = () => {
    this.myModalRef.nativeElement.showModal();
  }

  public onCloseModal = () => {
    this.myModalRef.nativeElement.close();
  }
}
