import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription, startWith } from 'rxjs';

const defaultMessages: { [k: string]: string } = {
  required: 'required field',
  minlength: 'too short',
  email: 'not a valid email'
}

@Directive({
  selector: '[appInsertError2]'
})
export class InsertError2Directive {

  @Input('appInsertError2') control?: AbstractControl;
  private subscription?: Subscription

  constructor(
    private elementRef: ElementRef<any>,
  ) {}

  ngOnInit(): void {
    this.subscription = this.control?.statusChanges
      .pipe(startWith('?'))
      .subscribe((status) => {
        console.log(this.elementRef.nativeElement)
        if (this.control?.errors && this.elementRef.nativeElement) {
          this.elementRef.nativeElement.innerText = 'ERROR:';
          Object.keys(this.control?.errors).forEach(k => {
            this.elementRef.nativeElement.innerText += ' ' + this.control?.errors?.[k]?.message ?? defaultMessages[k];
          })
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
