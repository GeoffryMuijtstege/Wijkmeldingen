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
});
