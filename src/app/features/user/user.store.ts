import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class UserStore {

  users$ = new BehaviorSubject<any[]>([]);

  userId$ = this.route.paramMap.pipe(
    map(params => params.get('id'))
  );

  activeUser$ = combineLatest([
    this.users$,
    this.userId$
  ]).pipe(
    map(([users, id]) => users.find(user => user.id == id))
  )

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.userService.getUsers().subscribe(users => {
      this.users$.next(users);
    })
  }
}
