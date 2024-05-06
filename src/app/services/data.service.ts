import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportMessage } from '../models/report';
import { Flight } from '../models/flight';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = 'https://ogcie.iblsoft.com/ria/opmetquery';

  constructor(public httpClient: HttpClient) {}

  getFlightReport(body: Flight): Observable<ReportMessage> {
    return this.httpClient.post<ReportMessage>(`${this.url}`, body);
  }
}
