import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDestinacijaComponent } from './add-destinacija.component';

describe('AddDestinacijaComponent', () => {
  let component: AddDestinacijaComponent;
  let fixture: ComponentFixture<AddDestinacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDestinacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDestinacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
