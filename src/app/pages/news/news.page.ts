import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { News } from 'src/app/core/models/news';
import { ConfirmDialog } from 'src/app/shared/dialogs/confirm/confirm.dialog';
import { SpinnerDialog } from 'src/app/shared/dialogs/spinner/spinner.dialog';
import { NewsCreateDialog } from './dialogs/news-create/news-create.dialog';
import { NewsEditDialog } from './dialogs/news-edit/news-edit.dialog';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss']
})
export class NewsPage implements OnInit {
  arrNews: News[];

  constructor(
    private _news: NewsService,
    public dialog: MatDialog,
    private router: Router,
    private _auth: AuthService,
    private _jwt: JwtService,
  ) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this._news.getList().subscribe((res: News[]) => {
      this.arrNews = res;
    })
  }

  onCreate() {
    let dialogData = this.dialog.open(NewsCreateDialog);
    dialogData.afterClosed().subscribe(res => {
      this.getList();
    })
  }

  onEdit(news) {
    let dialogData = this.dialog.open(NewsEditDialog, {
      data: news
    });
    dialogData.afterClosed().subscribe(res => {
      this.getList()
    })
  }

  onDelete(id) {          
    let dialogData = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete',
        content: 'Do you want delete it?'
      },
      minWidth: '30%'
    });
    dialogData.afterClosed().subscribe(res => {
      if(res) {
        this.dialog.open(SpinnerDialog);
        this._news.delete(id).subscribe(res => {         
          this.dialog.closeAll();   
          this.getList();      
        })
      }
    })
  }
}
