import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarShipDetailsComponent } from './star-ship-details.component';

describe('StarshipDetailsComponent', () => {
  let component: StarShipDetailsComponent;
  let fixture: ComponentFixture<StarShipDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarShipDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StarShipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
