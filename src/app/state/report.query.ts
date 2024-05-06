import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ReportStore } from './report.store';
import { ReportMessage } from '../models/report';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportQuery extends Query<ReportMessage> {
  reportMessageState$ = this.select();
  grouppedResult$ = this.select('result').pipe(filter((o) => !!o));

  constructor(protected override store: ReportStore) {
    super(store);
  }
}
