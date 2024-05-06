import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { ReportMessage } from './models/report';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
