import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ReportMessage } from '../models/report';

export function createInitialState(): ReportMessage {
  return {
    error: null,
    id: '',
    result: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'report' })
export class ReportStore extends Store<ReportMessage> {
  constructor() {
    super(createInitialState());
  }
}
