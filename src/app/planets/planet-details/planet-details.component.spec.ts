import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetDetailsComponent } from './planet-details.component';

describe('PlanetComponent', () => {
  let component: PlanetDetailsComponent;
  let fixture: ComponentFixture<PlanetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
