import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Feature } from '../models/feature';
import { Priority } from 'src/app/shared/enums/priority.enum';
import { State } from 'src/app/shared/enums/state.enum';

@Component({
  selector: 'app-feature-edit-form',
  templateUrl: './feature-edit-form.component.html',
  styleUrls: ['./feature-edit-form.component.scss'],
})
export class FeatureEditFormComponent implements OnInit {
  priorities = Object.values(Priority);
  states = Object.values(State);
  featureForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FeatureEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feature
  ) {
    this.featureForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      state: new FormControl(''),
      priority: new FormControl(''),
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.featureForm.controls['name'].setValue(this.data.name);
      this.featureForm.controls['description'].setValue(this.data.description);
      this.featureForm.controls['state'].setValue(this.data.state);
      this.featureForm.controls['priority'].setValue(this.data.priority);
    }
  }

  onSave(): void {
    const updatedFeature = this.featureForm.value;
    this.dialogRef.close(updatedFeature);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
