import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictPageComponent } from './predict-page.component';

describe('PredictPageComponent', () => {
  let component: PredictPageComponent;
  let fixture: ComponentFixture<PredictPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
