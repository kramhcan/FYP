import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictFormComponent } from './predict-form.component';

describe('PredictFormComponent', () => {
  let component: PredictFormComponent;
  let fixture: ComponentFixture<PredictFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
