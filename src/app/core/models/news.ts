import { INews } from "../interfaces/news";

export class News {
    _id: string;
    title: string;
    slug: string;
    content: string;
    constructor(news: INews) {
        this._id = news._id || '';
        this.title = news.title;
        this.slug = news.slug;
        this.content = news.content;
    }
}
