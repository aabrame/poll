import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Polls2Component } from './polls2.component';

describe('Polls2Component', () => {
  let component: Polls2Component;
  let fixture: ComponentFixture<Polls2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Polls2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Polls2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
