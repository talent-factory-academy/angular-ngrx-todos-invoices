import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { map, share, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    {{ (user$ | async)?.username }}
    {{ (user$ | async)?.username }}
    {{ (user$ | async)?.username }}

    <div *ngIf="showSecondDiv">
      Second div
      {{ (user$ | async)?.username }}
    </div>

    <button (click)="userId$.next('2')">+</button>
  `,
})
export class AppComponent {

  showSecondDiv = false;

  userId$ = new BehaviorSubject<string | null>('1');

  user$ = this.userId$.pipe(
    switchMap(userId =>
      this.http.get<any>('https://jsonplaceholder.typicode.com/users/' + userId)
    ),
    share({

    })
  )

  constructor(private http: HttpClient) {
    setTimeout(() => {
      this.showSecondDiv = true;
    }, 3000)
  }
}
