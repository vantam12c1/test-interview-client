import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { NEWS_ENDPOINT } from 'src/app/core/enums/endpoints.enum';
import { News } from 'src/app/core/models/news';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  arrNews: News[];
  news: News;

  constructor(private _api: ApiService) { }

  getList(): Observable<News[]> {
    return this._api.get(NEWS_ENDPOINT.NEWS).pipe(
      map(res => {
        console.log(res);
        this.arrNews = res.data.map(item => new News(item))
        return this.arrNews;
      })
    )
  }

  create(form) {
    return this._api.post(NEWS_ENDPOINT.NEWS, form).pipe(
      map(res => {
        return res;
      })
    )
  }

  edit(id, form) {
    return this._api.put(NEWS_ENDPOINT.NEWS, id, form).pipe(
      map(res => {
        this.news = new News(res.data)
        return this.news;
      })
    )
  }

  delete(id) {
    return this._api.delete(NEWS_ENDPOINT.NEWS, id)
  }
}
