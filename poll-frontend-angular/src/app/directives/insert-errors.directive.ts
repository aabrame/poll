import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription, startWith } from 'rxjs';

const defaultMessages: { [k: string]: string } = {
  required: 'required field',
  minlength: 'too short',
  email: 'not a valid email'
}

@Directive({
  selector: '[appInsertErrors]'
})
export class InsertErrorsDirective implements OnInit, OnDestroy {

  @Input('appInsertErrors') control?: AbstractControl;
  private subscription?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.subscription = this.control?.statusChanges
      .pipe(startWith('?'))
      .subscribe((status) => {
          this.viewContainerRef.clear();
        if (this.control?.errors) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
          this.templateRef.elementRef.nativeElement.previousElementSibling.innerText = 'ERROR:';
          Object.keys(this.control?.errors).forEach(k => {
            this.templateRef.elementRef.nativeElement.previousElementSibling.innerText += ' ' + this.control?.errors?.[k].message ?? defaultMessages[k];
          })
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
