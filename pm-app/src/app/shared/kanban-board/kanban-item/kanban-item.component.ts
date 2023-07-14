import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/tasks/models/task';

@Component({
  selector: 'app-kanban-item',
  templateUrl: './kanban-item.component.html',
  styleUrls: ['./kanban-item.component.scss'],
})
export class KanbanItemComponent {
  @Input() item!: Task;
  @Output() delete = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();

  onDelete(): void {
    this.delete.emit(this.item);
  }

  onEdit(): void {
    this.edit.emit(this.item);
  }
}
