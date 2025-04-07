import { ComponentFixture, TestBed } from '@angular/core/testing';

import { US014Component } from './us014.component';

describe('US014Component', () => {
  let component: US014Component;
  let fixture: ComponentFixture<US014Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [US014Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(US014Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
