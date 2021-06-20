import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';
import { SlugPipe } from 'src/app/shared/pipes/slug.pipe';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.dialog.html',
  styleUrls: ['./news-edit.dialog.scss']
})
export class NewsEditDialog implements OnInit {
  formEdit: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any, 
    public dialog: MatDialog,
    private fb: FormBuilder,
    private slugPipe: SlugPipe,
    private _new: NewsService
  ) { }

  ngOnInit(): void {
    this.formEdit = this.fb.group({
      title: [this.data.title, Validators.required],  
      slug: [this.data.slug],    
      content: [this.data.content, Validators.required],     
    })
  }

  onUpdate() {
    let form = this.formEdit;
    let slug =  this.slugPipe.transform(form.value.title);
    form.controls.slug.setValue(slug);
    this.dialog.open(SpinnerDialog);
    this._new.edit(this.data._id, form.value).subscribe(res => {
      this.dialog.closeAll();
    })
  }
}
