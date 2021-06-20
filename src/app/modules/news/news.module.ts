import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';

import { SharedModule } from 'src/app/shared/shared.module';
import { NewsPage } from '../../pages/news/news.page';
import { NewsCreateDialog } from '../../pages/news/dialogs/news-create/news-create.dialog';
import { SlugPipe } from 'src/app/shared/pipes/slug.pipe';
import { NewsEditDialog } from '../../pages/news/dialogs/news-edit/news-edit.dialog';

const routes: Routes = [
  {
    path: '',
    component: NewsPage
  }
]

@NgModule({
  declarations: [
    NewsPage,
    NewsCreateDialog,
    NewsEditDialog,
    
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [SlugPipe]
})
export class NewsModule { }
