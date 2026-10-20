import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { MeldingenService } from '../services/meldingen.service';
import { Melding, Status } from '../models/meldingen.model';
import { StatusBadge } from '../status-badge/status-badge';
import { FilterOverlay, MeldingFilter } from '../filter-overlay/filter-overlay';

const statusVolgorde: Record<Status, number> = {
  [Status.Nieuw]: 0,
  [Status.InBehandeling]: 1,
  [Status.Afgehandeld]: 2,
};

@Component({
  imports: [DatePipe, StatusBadge, FilterOverlay],
  selector: 'app-meldingen-lijst',
  styleUrl: './meldingen-lijst.scss',
  templateUrl: './meldingen-lijst.html',
})
export class MeldingenLijst {
  private meldingenService = inject(MeldingenService);
  meldingen = toSignal(this.meldingenService.getMeldingen(), { initialValue: [] });
  fout = signal<string | null>(null);
  gesorteerdOpType = signal<keyof Melding>('datum');
  sorteerWaarde = signal<'asc' | 'desc'>('desc');
  filterModalOpen = signal(false);

  statusOpties = computed(() => {
    const statusSet = new Set(this.meldingen().map((melding) => melding.status));
    return Array.from(statusSet);
  });

  categorieOpties = computed(() => {
    const categorieSet = new Set(this.meldingen().map((melding) => melding.categorie));
    return Array.from(categorieSet).sort((a, b) => a.localeCompare(b, 'nl'));
  });

  actiefFilter = signal<MeldingFilter>({ status: null, categorie: null });

  filterActief = computed(() => {
    const { status, categorie } = this.actiefFilter();
    return !!status || !!categorie;
  });

  gefilterdeMeldingen = computed(() => {
    const { status, categorie } = this.actiefFilter();
    return this.meldingen().filter(
      (m) => (!status || m.status === status) && (!categorie || m.categorie === categorie),
    );
  });

  //Sorteer logica
  gesorteerdeMeldingen = computed(() => {
    const veld = this.gesorteerdOpType();
    const waarde = this.sorteerWaarde() === 'asc' ? 1 : -1;

    return [...this.gefilterdeMeldingen()].sort((a, b) => {
      if (veld === 'status') {
        return (statusVolgorde[a.status] - statusVolgorde[b.status]) * waarde;
      }
      return String(a[veld]).localeCompare(String(b[veld]), 'nl') * waarde;
    });
  });

  ariaSort(veld: keyof Melding): 'ascending' | 'descending' | 'none' {
    if (this.gesorteerdOpType() !== veld) return 'none';
    return this.sorteerWaarde() === 'asc' ? 'ascending' : 'descending';
  }

  sorteerMeldingen(veld: keyof Melding) {
    if (this.gesorteerdOpType() === veld) {
      this.sorteerWaarde.set(this.sorteerWaarde() === 'asc' ? 'desc' : 'asc');
    } else {
      this.gesorteerdOpType.set(veld);
      this.sorteerWaarde.set('desc');
    }
  }

  sorteerPijl(veld: keyof Melding): string {
    if (this.gesorteerdOpType() !== veld) return '';
    return this.sorteerWaarde() === 'asc' ? '▲' : '▼';
  }
  //Einde sorteer logica

  //Filter functions
  openFilterModal() {
    this.filterModalOpen.set(true);
  }

  pasFilterToe(filter: MeldingFilter) {
    this.actiefFilter.set(filter);
    this.filterModalOpen.set(false);
  }
  //Einde filter functions
}
