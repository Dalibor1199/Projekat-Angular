import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRezervacijaComponent } from './add-rezervacija.component';

describe('AddRezervacijaComponent', () => {
  let component: AddRezervacijaComponent;
  let fixture: ComponentFixture<AddRezervacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRezervacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRezervacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
