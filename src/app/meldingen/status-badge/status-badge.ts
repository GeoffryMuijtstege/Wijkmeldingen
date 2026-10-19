import { Component, input } from '@angular/core';
import { Status } from '../models/meldingen.model';

@Component({
  imports: [],
  selector: 'app-status-badge',
  styleUrl: './status-badge.scss',
  templateUrl: './status-badge.html',
})
export class StatusBadge {
  status = input.required<Status>();
  protected readonly Status = Status;
}
