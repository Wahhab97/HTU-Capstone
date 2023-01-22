import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStartupComponent } from './edit-startup.component';

describe('EditStartupComponent', () => {
  let component: EditStartupComponent;
  let fixture: ComponentFixture<EditStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStartupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
