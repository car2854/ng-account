import { Component, EventEmitter, Input, Output, signal, SimpleChanges } from '@angular/core';

export interface ComboBoxInterface {
  id: number,
  name: string
}

@Component({
  selector: 'app-combo-box-component',
  templateUrl: './combo-box.html',
  styleUrl: './combo-box.css',
})
export class ComboBoxComponent {
  @Input({ required: true }) options: ComboBoxInterface[] = [];
  @Output() idSelected = new EventEmitter<ComboBoxInterface>();

  public optionsFilter = signal<ComboBoxInterface[]>([]);
  public value = signal<string>('');

  ngOnChanges(changes: SimpleChanges): void {
    this.optionsFilter.update((_) => this.options);
  }
  public onChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    this.optionsFilter.update((_) => {
      return this.options
        .filter((v) => v.name.toLowerCase().includes(value.toLocaleLowerCase()))
        .map((_) => _);
    });
  };

  public onSelect = (id: number) => {
    const dataFiltered = this.options.find((v) => v.id == id);
    if (dataFiltered == null) return;
    this.value.update((_) => dataFiltered?.name);
    this.idSelected.emit(dataFiltered);
  };
}
