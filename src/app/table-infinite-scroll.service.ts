import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableInfiniteScrollService {

  private _apiUrl  = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  get apiUrl(): string {
    return this._apiUrl;
  }

  getPosts(page: number, limit: number): Observable<any[]> {
    const url = `${this.apiUrl}?_page=${page}&_limit=${limit}`;
    return this.http.get<any[]>(url);
  }
}
