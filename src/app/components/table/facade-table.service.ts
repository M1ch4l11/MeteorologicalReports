import { Injectable } from '@angular/core';
import { Report } from 'src/app/models/report';

@Injectable({
  providedIn: 'root',
})
export class FacadeTableService {
  constructor() {}

  getGrouppedReports(
    reports: Report[]
  ): { stationId: string; reports: Report[] }[] {
    return this.createReportsObjects(this.createGroupedReports(reports));
  }

  createGroupedReports(reports: Report[]): { [stationId: string]: Report[] } {
    const groupedReports: { [stationId: string]: Report[] } = {};
    for (const report of reports) {
      const { stationId } = report;
      if (!groupedReports[stationId]) {
        groupedReports[stationId] = [];
      }
      groupedReports[stationId].push(report);
    }
    return groupedReports;
  }

  createReportsObjects(groupedReports: {
    [stationId: string]: Report[];
  }): { stationId: string; reports: Report[] }[] {
    const result: { stationId: string; reports: Report[] }[] = [];
    for (const stationId in groupedReports) {
      result.push({ stationId, reports: groupedReports[stationId] });
    }
    return result;
  }
}
