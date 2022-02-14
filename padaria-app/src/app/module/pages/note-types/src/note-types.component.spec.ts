import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTypesComponent } from './note-types.component';

describe('NoteTypesComponent', () => {
  let component: NoteTypesComponent;
  let fixture: ComponentFixture<NoteTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
