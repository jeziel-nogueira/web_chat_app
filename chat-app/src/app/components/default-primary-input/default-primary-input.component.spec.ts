import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPrimaryInputComponent } from './default-primary-input.component';

describe('DefaultPrimaryInputComponent', () => {
  let component: DefaultPrimaryInputComponent;
  let fixture: ComponentFixture<DefaultPrimaryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultPrimaryInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultPrimaryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
