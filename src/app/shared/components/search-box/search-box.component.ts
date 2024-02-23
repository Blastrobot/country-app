import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input() public placeholder: string = '';

  @Output() public onSearchValue = new EventEmitter<string>();

  public emitSearchValue( value: string ) {
    this.onSearchValue.emit( value );
  }

}
