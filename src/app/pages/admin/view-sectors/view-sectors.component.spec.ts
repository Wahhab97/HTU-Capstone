import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSectorsComponent } from './view-sectors.component';

describe('ViewSectorsComponent', () => {
  let component: ViewSectorsComponent;
  let fixture: ComponentFixture<ViewSectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSectorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
