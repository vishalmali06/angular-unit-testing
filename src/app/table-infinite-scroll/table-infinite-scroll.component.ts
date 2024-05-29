import { Component, OnInit } from '@angular/core';
import { TableInfiniteScrollService } from '../table-infinite-scroll.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-table-infinite-scroll',
  templateUrl: './table-infinite-scroll.component.html',
  styleUrl: './table-infinite-scroll.component.css'
})
export class TableInfiniteScrollComponent implements OnInit {
  posts: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'body'];
  page = 1;
  limit = 20;
  loading = false;

  constructor(private tableService: TableInfiniteScrollService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  async loadPosts(): Promise<void> {
    if (this.loading) return;

    this.loading = true;
    try {
      const data = await firstValueFrom(this.tableService.getPosts(this.page, this.limit));
      this.posts = [...this.posts, ...data];
      this.page++;
    } catch (error) {
      console.error('Error fetching posts', error);
    } finally {
      this.loading = false;
    }
  }

  onScroll(): void {
    this.loadPosts();
  }
}
