import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinacijaListComponent } from './destinacija-list.component';

describe('DestinacijaListComponent', () => {
  let component: DestinacijaListComponent;
  let fixture: ComponentFixture<DestinacijaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinacijaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinacijaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
