import { ComponentFixture, TestBed } from '@angular/core/testing';

import { US013Component } from './us013.component';

describe('US013Component', () => {
  let component: US013Component;
  let fixture: ComponentFixture<US013Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [US013Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(US013Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
