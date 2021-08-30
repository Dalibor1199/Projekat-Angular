import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinacijaItemComponent } from './destinacija-item.component';

describe('DestinacijaItemComponent', () => {
  let component: DestinacijaItemComponent;
  let fixture: ComponentFixture<DestinacijaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinacijaItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinacijaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
