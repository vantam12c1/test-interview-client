import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';
import { SlugPipe } from 'src/app/shared/pipes/slug.pipe';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.dialog.html',
  styleUrls: ['./news-create.dialog.scss']
})
export class NewsCreateDialog implements OnInit {
  formCreate: FormGroup;  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any, 
    public dialog: MatDialog,
    private fb: FormBuilder,
    private slugPipe: SlugPipe,
    private _new: NewsService
  ) { }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      title: ['', Validators.required],  
      slug: [''],    
      content: ['', Validators.required],     
    })
  }

  onCreate() {
    let form = this.formCreate;
    let slug =  this.slugPipe.transform(form.value.title);
    console.log(slug);
    form.controls.slug.setValue(slug);
    this.dialog.open(SpinnerDialog);
    this._new.create(form.value).subscribe(res => {
      this.dialog.closeAll();
    })
  }
}
