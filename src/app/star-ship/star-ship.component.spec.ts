import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarShipComponent } from './star-ship.component';

describe('StarshipComponent', () => {
  let component: StarShipComponent;
  let fixture: ComponentFixture<StarShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarShipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StarShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
