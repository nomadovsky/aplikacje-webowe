import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FeatureFormComponent } from './feature-form/feature-form.component';
import { FeaturesComponent } from './features.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { FeatureEditFormComponent } from './feature-edit-form/feature-edit-form.component';

@NgModule({
  declarations: [FeatureFormComponent, FeaturesComponent, FeatureEditFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgFor,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatListModule,
  ],
  exports: [FeaturesComponent],
})
export class FeaturesModule {}
