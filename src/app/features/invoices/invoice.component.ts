import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-invoice',
  template: `

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceComponent implements OnInit, OnDestroy {


  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    // TODO
  }

  ngOnDestroy() {
    // TODO
  }


}
