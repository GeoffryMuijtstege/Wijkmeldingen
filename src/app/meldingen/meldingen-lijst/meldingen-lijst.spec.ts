import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeldingenLijst } from './meldingen-lijst';

describe('MeldingenLijst', () => {
  let component: MeldingenLijst;
  let fixture: ComponentFixture<MeldingenLijst>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeldingenLijst],
    }).compileComponents();

    fixture = TestBed.createComponent(MeldingenLijst);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
