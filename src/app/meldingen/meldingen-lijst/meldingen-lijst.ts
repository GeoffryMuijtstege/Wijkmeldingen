import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MeldingenService } from '../services/meldingen.service';
import { Melding } from '../models/meldingen.model';

@Component({
  imports: [DatePipe],
  selector: 'app-meldingen-lijst',
  styleUrl: './meldingen-lijst.scss',
  templateUrl: './meldingen-lijst.html',
})

export class MeldingenLijst implements OnInit {
  meldingen = signal<Melding[]>([]);
  fout = signal<string | null>(null);

  private meldingenService = inject(MeldingenService);

  ngOnInit(): void {
    this.meldingenService.getMeldingen().subscribe({
      next: lijst => this.meldingen.set(lijst),
      error: (e: Error) => this.fout.set(e.message),
    });
  }
}
