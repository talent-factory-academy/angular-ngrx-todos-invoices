import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserStore } from './user.store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Directive({
  selector: '[ifLogged]'
})
export class IfLoggedDirective {

  private sub = new Subscription();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userStore: UserStore
  ) {
  }

  ngOnInit() {
    this.sub = this.userStore.user$.pipe(
      map(user => !!user),
      distinctUntilChanged()
    ).subscribe(isLogged => {
      if (isLogged) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
