import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupFormComponent } from './startup-form.component';

describe('StartupFormComponent', () => {
  let component: StartupFormComponent;
  let fixture: ComponentFixture<StartupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
