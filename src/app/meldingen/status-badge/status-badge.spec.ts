import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadge } from './status-badge';
import { Status } from '../models/meldingen.model';

describe('StatusBadge', () => {
  let fixture: ComponentFixture<StatusBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBadge);
    fixture.componentRef.setInput('status', Status.Nieuw);
    await fixture.whenStable();
  });

  it('should be "Nieuw" and blue', () => {
    const badge = fixture.nativeElement.querySelector('.badge') as HTMLElement;
    expect(badge.textContent).toBe('Nieuw');
    expect(badge.classList.contains('bg-primary')).toBe(true);
  });

  it('should be "In behandeling" and yellow', async () => {
    fixture.componentRef.setInput('status', Status.InBehandeling);
    await fixture.whenStable();
    const badge = fixture.nativeElement.querySelector('.badge') as HTMLElement;
    expect(badge.textContent).toBe('In behandeling');
    expect(badge.classList.contains('bg-warning')).toBe(true);
  });

  it('should be "Afgehandeld" and green', async () => {
    fixture.componentRef.setInput('status', Status.Afgehandeld);
    await fixture.whenStable();
    const badge = fixture.nativeElement.querySelector('.badge') as HTMLElement;
    expect(badge.textContent).toBe('Afgehandeld');
    expect(badge.classList.contains('bg-success')).toBe(true);
  });
});
