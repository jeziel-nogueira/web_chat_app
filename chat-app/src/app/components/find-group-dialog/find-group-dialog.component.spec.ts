import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindGroupDialogComponent } from './find-group-dialog.component';

describe('FindGroupDialogComponent', () => {
  let component: FindGroupDialogComponent;
  let fixture: ComponentFixture<FindGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindGroupDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
