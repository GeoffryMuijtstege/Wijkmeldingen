import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterOverlay } from './filter-overlay';

describe('FilterOverlay', () => {
  let component: FilterOverlay;
  let fixture: ComponentFixture<FilterOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterOverlay],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
