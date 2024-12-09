import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarShipsComponent } from './star-ships.component';

describe('StarshipComponent', () => {
  let component: StarShipsComponent;
  let fixture: ComponentFixture<StarShipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarShipsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StarShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
