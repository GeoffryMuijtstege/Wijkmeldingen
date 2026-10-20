import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MeldingenService } from '../services/meldingen.service';
import { Router } from '@angular/router';
import { Status } from '../models/meldingen.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-melding-indienen',
  styleUrl: './melding-indienen.scss',
  templateUrl: './melding-indienen.html',
})
export class MeldingIndienen {
  fout = signal<string | null>(null);
  categorieen = ['Verkeer', 'Openbare ruimte', 'Overlast', 'Diefstal', 'Vernieling', 'Vermist'];
  formWordVerwerkt = signal(false);

  private formBuilder = inject(NonNullableFormBuilder);
  private meldingService = inject(MeldingenService);
  private router = inject(Router);

  form = this.formBuilder.group({
    titel: ['', [Validators.required, Validators.minLength(3)]],
    categorie: ['', [Validators.required]],
    omschrijving: ['', [Validators.required, Validators.minLength(10)]],
  });

  toonFout(veld: string): boolean {
    const control = this.form.get(veld);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit() {
    if (this.formWordVerwerkt()) {
      return;
    }
    if (this.form.invalid) {
      this.fout.set(
        'Controleer de ingevoerde gegevens. Alle velden zijn verplicht en moeten voldoen aan de criteria.',
      );
      return;
    }
    if (this.form.valid) {
      this.formWordVerwerkt.set(true);
      this.meldingService
        .meldingVersturen({
          ...this.form.getRawValue(),
          status: Status.Nieuw,
          datum: new Date().toISOString(),
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/meldingen']);
          },
          error: () => {
            this.fout.set(
              'Er is een fout opgetreden bij het indienen van de melding. Probeer het later opnieuw.',
            );
            this.formWordVerwerkt.set(false);
          },
        });
    }
  }
}
