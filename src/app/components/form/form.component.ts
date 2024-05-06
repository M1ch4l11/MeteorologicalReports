import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageTypesComponent } from '../message-types/message-types.component';
import { FormatInputDirective } from 'src/app/directives/format-input.directive';
import { Flight } from 'src/app/models/flight';
import { DataService } from 'src/app/services/data.service';
import { catchError, Subscription, tap } from 'rxjs';
import { ReportStore } from 'src/app/state/report.store';
import { FacadeFormService } from './facade-form.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessageTypesComponent,
    FormatInputDirective,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnDestroy {
  form!: FormGroup;

  messageType!: string[];

  constructor(private facadeForm: FacadeFormService) {}

  ngOnInit(): void {
    this.form = this.facadeForm.initForm();
  }

  getReport(): void {
    if (!!this.form.valid) {
      const flight: Flight = this.facadeForm.createFlight(
        this.form.getRawValue(),
        this.messageType
      );
      this.facadeForm.getReports(flight);
    } else {
      alert('One message type is required');
    }
    this.form.reset();
  }

  changeMessageType(messageType: string[]): void {
    this.messageType = messageType.map((o) =>
      o === 'TAF' ? o + '_LONGTAF' : o
    );
  }

  ngOnDestroy(): void {}
}
