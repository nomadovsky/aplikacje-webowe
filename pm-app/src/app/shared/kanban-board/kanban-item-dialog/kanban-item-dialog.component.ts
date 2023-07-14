import { Component, Inject, OnInit } from '@angular/core';
import { Priority } from '../../enums/priority.enum';
import { State } from '../../enums/state.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/tasks/models/task';
import { Feature } from 'src/app/features/models/feature';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeaturesService } from 'src/app/services/feature.service';

@Component({
  selector: 'app-kanban-item-dialog',
  templateUrl: './kanban-item-dialog.component.html',
  styleUrls: ['./kanban-item-dialog.component.scss'],
})
export class KanbanItemDialogComponent implements OnInit {
  priorities = Object.values(Priority);
  states = Object.values(State);
  features: Feature[] = [];
  itemForm!: FormGroup;
  isEditable: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<KanbanItemDialogComponent>,
    private featuresService: FeaturesService,

    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.itemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      priority: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required),
      featureId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.itemForm.controls['name'].setValue(this.data.name);
      this.itemForm.controls['description'].setValue(this.data.description);
      this.itemForm.controls['priority'].setValue(this.data.priority);
      this.itemForm.controls['state'].setValue(this.data.state);
      this.itemForm.controls['user'].setValue(this.data.userId);
      this.itemForm.controls['featureId'].setValue(this.data.featureId);
    }
    this.featuresService
      .getAllFeatures()
      .subscribe((features) => (this.features = features));
  }

  onSave(): void {
    const updatedItem = this.itemForm.value;
    this.dialogRef.close(updatedItem);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
