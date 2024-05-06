export interface ReportMessage {
  error: null | string;
  id: string;
  result: Report[];
}

export interface Report {
  placeId: string;
  queryType: string;
  receptionTime: string;
  refs: string[];
  reportTime: string;
  reportType: string;
  stationId: string;
  text?: string;
  textHTML: string;
}
