import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    NgFor,
    RouterLink,
  ],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  projects = [{ value: '0', name: 'Project 1' }];

  constructor() {}

  ngOnInit() {}
}
