import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabarComponent } from './databar.component';

describe('DatabarComponent', () => {
  let component: DatabarComponent;
  let fixture: ComponentFixture<DatabarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
