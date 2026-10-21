import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeldingIndienen } from './melding-indienen';

describe('MeldingIndienen', () => {
  let component: MeldingIndienen;
  let fixture: ComponentFixture<MeldingIndienen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeldingIndienen],
    }).compileComponents();

    fixture = TestBed.createComponent(MeldingIndienen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 3 controls', () => {
    expect(component.form.contains('titel')).toBe(true);
    expect(component.form.contains('categorie')).toBe(true);
    expect(component.form.contains('omschrijving')).toBe(true);
  });

  it('should make the titel control required', () => {
    const control = component.form.get('titel');
    control?.setValue('');
    expect(control?.valid).toBe(false);
  });

  it('should make the categorie control required', () => {
    const control = component.form.get('categorie');
    control?.setValue('');
    expect(control?.valid).toBe(false);
  });

  it('should make the omschrijving control required', () => {
    const control = component.form.get('omschrijving');
    control?.setValue('');
    expect(control?.valid).toBe(false);
  });

  it('roept onSubmit aan bij het versturen van het formulier', () => {
    const spy = vi.spyOn(component, 'onSubmit');
    const formElement = fixture.nativeElement.querySelector('form') as HTMLFormElement;

    formElement.dispatchEvent(new Event('submit'));

    expect(spy).toHaveBeenCalled();
  });
});
