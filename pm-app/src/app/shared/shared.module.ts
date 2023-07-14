import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { MatCardModule } from '@angular/material/card';
import { KanbanItemComponent } from './kanban-board/kanban-item/kanban-item.component';
import { KanbanItemDialogComponent } from './kanban-board/kanban-item-dialog/kanban-item-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    KanbanBoardComponent,
    KanbanItemComponent,
    KanbanItemDialogComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    DragDropModule,
    MatCardModule,
  ],
  exports: [KanbanBoardComponent],
})
export class SharedModule {}
