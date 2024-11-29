import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCharactersComponent } from './app-characters.component';

describe('AppCharactersComponent', () => {
  let component: AppCharactersComponent;
  let fixture: ComponentFixture<AppCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCharactersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
