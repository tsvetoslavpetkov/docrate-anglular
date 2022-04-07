import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceErrorComponent } from './resource-error.component';

describe('ResourceErrorComponent', () => {
  let component: ResourceErrorComponent;
  let fixture: ComponentFixture<ResourceErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
