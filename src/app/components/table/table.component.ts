import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, map, Observable } from 'rxjs';
import { Report, ReportMessage } from 'src/app/models/report';
import { ReportQuery } from 'src/app/state/report.query';
import { DateLocalPipe } from 'src/app/pipes/date-local.pipe';
import { MessageTypePipe } from 'src/app/pipes/message-type.pipe';
import { FacadeTableService } from './facade-table.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, DateLocalPipe, MessageTypePipe],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  reports$?: Observable<{ stationId: string; reports: Report[] }[]>;
  reportMessage$?: Observable<ReportMessage | undefined>;

  constructor(
    private reportQuery: ReportQuery,
    private facadeTable: FacadeTableService
  ) {}

  ngOnInit(): void {
    this.reports$ = this.reportQuery.grouppedResult$.pipe(
      filter((o) => !!o),
      map((reports) => this.groupReportsByStationId(reports))
    );
  }

  groupReportsByStationId(
    reports: Report[]
  ): { stationId: string; reports: Report[] }[] {
    return this.facadeTable.getGrouppedReports(reports);
  }
}
