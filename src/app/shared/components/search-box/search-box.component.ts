import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;
  
  @Input() public placeholder: string = '';
  
  @Input() public initialValue: string = ''
  
  @Output() public onSearchValue = new EventEmitter<string>();

  @Output() public onDebounce = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe( value => {
        this.onDebounce.emit( value );
      });
  };

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  };

  public emitSearchValue( value: string ) {
    this.onSearchValue.emit( value );
  }

  public onKeyPress (searchTerm: string) {
    // console.log(searchTerm);
    this.debouncer.next(searchTerm);
  }
}
