import { Component, output, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MeldingenService } from '../services/meldingen.service';

export interface MeldingFilter {
  status: string | null;
  categorie: string | null;
}

@Component({
  imports: [FormsModule],
  selector: 'app-filter-overlay',
  styleUrl: './filter-overlay.scss',
  templateUrl: './filter-overlay.html',
})
export class FilterOverlay {
  statusOpties = input<string[]>([]);
  categorieOpties = input<string[]>([]);
  selectedStatus: string | null = null;
  selectedCategorie: string | null = null;
  private meldingenService = inject(MeldingenService);

  close = output<void>();
  applyFilter = output<MeldingFilter>();

  onClose() {
    this.close.emit();
  }

  onApply() {
    this.applyFilter.emit({
      status: this.selectedStatus,
      categorie: this.selectedCategorie,
    });
  }
}
