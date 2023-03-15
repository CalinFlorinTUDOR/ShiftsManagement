import { NgModule } from '@angular/core';
import { MatSidenavModule } from'@angular/material/sidenav';
import { MatTabsModule } from'@angular/material/tabs';
import { MatToolbarModule } from'@angular/material/toolbar';
import { MatMenuModule } from'@angular/material/menu';
import { MatIconModule } from'@angular/material/icon';
import { MatButtonModule } from'@angular/material/button';
import { MatListModule } from'@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from'@angular/material/card';
import { MatFormFieldModule } from'@angular/material/form-field';
import { MatInputModule } from'@angular/material/input';
import { MatProgressSpinnerModule } from'@angular/material/progress-spinner';

@NgModule
(
  {
    imports: 
    [
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatListModule,
      MatMenuModule,
      MatTabsModule,
      MatSliderModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatProgressSpinnerModule
  
    ],
  exports:
    [
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatListModule,
      MatMenuModule,
      MatTabsModule,
      MatSliderModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatProgressSpinnerModule

    ]
  }
)

export class MaterialModule{ }
