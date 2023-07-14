import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanItemDialogComponent } from './kanban-item-dialog.component';

describe('KanbanItemDialogComponent', () => {
  let component: KanbanItemDialogComponent;
  let fixture: ComponentFixture<KanbanItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
