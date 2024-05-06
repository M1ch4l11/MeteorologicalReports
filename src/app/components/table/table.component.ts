import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { filter, map, Observable } from 'rxjs';
import { Report, ReportMessage } from 'src/app/models/report';
import { ReportQuery } from 'src/app/state/report.query';
import { DateLocalPipe } from 'src/app/pipes/date-local.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, DateLocalPipe],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  reports$?: Observable<{ stationId: string; reports: Report[] }[]>;
  reportMessage$?: Observable<ReportMessage | undefined>;

  constructor(private reportQuery: ReportQuery) {}

  ngOnInit(): void {
    this.reports$ = this.reportQuery.grouppedResult$.pipe(
      filter((o) => !!o),
      map((reports) => this.groupReportsByStationId(reports))
    );
  }

  groupReportsByStationId(
    reports: Report[]
  ): { stationId: string; reports: Report[] }[] {
    const groupedReports: { [stationId: string]: Report[] } = {};

    for (const report of reports) {
      const { stationId } = report;
      if (!groupedReports[stationId]) {
        groupedReports[stationId] = [];
      }
      groupedReports[stationId].push(report);
    }

    const result: { stationId: string; reports: Report[] }[] = [];
    for (const stationId in groupedReports) {
      if (Object.prototype.hasOwnProperty.call(groupedReports, stationId)) {
        result.push({ stationId, reports: groupedReports[stationId] });
      }
    }

    return result;
  }
}
