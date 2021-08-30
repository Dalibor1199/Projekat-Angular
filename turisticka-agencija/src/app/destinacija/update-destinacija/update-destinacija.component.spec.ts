import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDestinacijaComponent } from './update-destinacija.component';

describe('UpdateDestinacijaComponent', () => {
  let component: UpdateDestinacijaComponent;
  let fixture: ComponentFixture<UpdateDestinacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDestinacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDestinacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
