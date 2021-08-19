import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppIdentifierComponent } from './app-identifier.component';

describe('AppIdentifierComponent', () => {
  let component: AppIdentifierComponent;
  let fixture: ComponentFixture<AppIdentifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppIdentifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppIdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
