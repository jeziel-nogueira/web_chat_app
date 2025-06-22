import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletaAccountDialogComponent } from './deleta-account-dialog.component';

describe('DeletaAccountDialogComponent', () => {
  let component: DeletaAccountDialogComponent;
  let fixture: ComponentFixture<DeletaAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletaAccountDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletaAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
