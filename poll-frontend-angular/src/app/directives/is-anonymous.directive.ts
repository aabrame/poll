import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appIsAnonymous]'
})
export class IsAnonymousDirective implements OnInit, OnDestroy {

  private subscription?: Subscription

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authenticationService.connectedUser.subscribe(user => {
      if (user === undefined)
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      else
        this.viewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
