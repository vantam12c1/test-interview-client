import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertDialog } from './dialogs/alert/alert.dialog';
import { SpinnerDialog } from './dialogs/spinner/spinner.dialog';
import { ConfirmDialog } from './dialogs/confirm/confirm.dialog';
import { SlugPipe } from './pipes/slug.pipe';

@NgModule({
  declarations: [
    AlertDialog,
    SpinnerDialog,
    ConfirmDialog,
    SlugPipe
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatDialogModule,
    AlertDialog,
    SpinnerDialog,
    ConfirmDialog
  ]
})
export class SharedModule { }
