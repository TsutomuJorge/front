import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-auto-complete-com-busca',
  templateUrl: './auto-complete-com-busca.component.html',
  styleUrls: ['./auto-complete-com-busca.component.scss'],
})
export class AutoCompleteComBuscaComponent implements OnInit {
  @Input() formControl!: FormControl;
  @Input() valores: string[] = [];
  @Input() label: string = '';
  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {
    this.formControl.setValue('');
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.valores.filter((option) =>
      option.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
}
