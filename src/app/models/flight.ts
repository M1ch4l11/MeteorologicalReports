export interface Flight {
  id: string;
  method: string;
  params: FlightParams[];
}

export interface FlightParams {
  id: string;
  reportTypes?: string[];
  stations?: string[];
  countries?: string[];
}
