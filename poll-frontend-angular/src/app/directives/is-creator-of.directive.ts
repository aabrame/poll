import { Directive, Input, OnChanges, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';

@Directive({
  selector: '[appIsCreatorOf]'
})
export class IsCreatorOfDirective  implements OnChanges, OnDestroy {

  @Input('appIsCreatorOf') object?: { creator: User };
  private subscription?: Subscription

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authenticationService: AuthenticationService
  ) {}

  ngOnChanges(): void {
    this.subscription?.unsubscribe();
    this.subscription = this.authenticationService.connectedUser.subscribe(user => {
      if (user !== undefined && user?.id === this.object?.creator.id)
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      else
        this.viewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
