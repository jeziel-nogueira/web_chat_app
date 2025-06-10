import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidSectionComponent } from './mid-section.component';

describe('MidSectionComponent', () => {
  let component: MidSectionComponent;
  let fixture: ComponentFixture<MidSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MidSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MidSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
