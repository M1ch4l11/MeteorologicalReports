import { Injectable, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { Flight } from 'src/app/models/flight';
import { DataService } from 'src/app/services/data.service';
import { ReportStore } from 'src/app/state/report.store';

@Injectable({
  providedIn: 'root',
})
export class FacadeFormService implements OnDestroy {
  subscribtions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private reportStore: ReportStore
  ) {}

  initForm(): FormGroup {
    return this.formBuilder.group(
      {
        messageTypes: [false, Validators.requiredTrue],
        airports: ['', Validators.minLength(4)],
        countries: ['', Validators.minLength(2)],
      },
      { validator: this.atLeastOneIsNotSelected }
    );
  }

  createFlight(formValue: any, messageType: string[]): Flight {
    const stations = formValue.airports?.toUpperCase();
    const countries = formValue.countries?.toUpperCase();
    return {
      id: 'query0' + this.getValidId(stations, countries),
      method: 'query',
      params: [
        {
          id: 'briefing0' + this.getValidId(stations, countries),
          reportTypes: messageType,
          ...(formValue.airports &&
            formValue.airports.trim() !== '' && {
              stations: stations.split(' '),
            }),
          ...(formValue.countries &&
            formValue.countries.trim() !== '' && {
              countries: countries.split(' '),
            }),
        },
      ],
    };
  }

  getReports(flight: Flight): void {
    console.log('request body => ', flight);

    this.subscribtions.push(
      this.dataService
        .getFlightReport(flight)
        .pipe(
          tap((response) => {
            response.result.length === 0
              ? alert(
                  'Empty database or you need to write correct airport or country codes!'
                )
              : this.reportStore.update(response);
            console.log('response body => ', response);
          })
        )
        .subscribe(() => {})
    );
  }

  getValidId(stations: string, countries: string): number {
    if (!!stations && !countries) {
      return 1;
    } else if (!!countries && !stations) {
      return 3;
    }
    return 2;
  }

  atLeastOneIsNotSelected(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const airports = control.get('airports')?.value;
    const countries = control.get('countries')?.value;

    if (!(airports || countries)) {
      return { atLeastOneIsNotSelected: true };
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach((subscribtion) => subscribtion.unsubscribe());
  }
}
