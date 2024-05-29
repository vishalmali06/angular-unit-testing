import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableInfiniteScrollComponent } from './table-infinite-scroll.component';
import { TableInfiniteScrollService } from '../table-infinite-scroll.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatTableModule } from '@angular/material/table';

describe('TableInfiniteScrollComponent', () => {
  let component: TableInfiniteScrollComponent;
  let fixture: ComponentFixture<TableInfiniteScrollComponent>;
  let tableService: TableInfiniteScrollService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableInfiniteScrollComponent],
      imports: [
        MatTableModule,
        InfiniteScrollModule
      ],
      providers: [
        { provide: TableInfiniteScrollService, useValue: jasmine.createSpyObj('TableInfiniteScrollService', ['getPosts']) }
      ]
    })
      .compileComponents();

    tableService = TestBed.inject(TableInfiniteScrollService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableInfiniteScrollComponent);
    component = fixture.componentInstance;
    (tableService.getPosts as jasmine.Spy).and.returnValue(of([{ id: 1, title: 'Test', body: 'Test body' }]));

    fixture.detectChanges();
  });

  // ... other tests go here

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should load posts on init', () => {
  //   const posts = [{ id: 1, title: 'Test', body: 'Test body' }];
  //   (tableService.getPosts as jasmine.Spy).and.returnValue(of(posts));
  //   component.ngOnInit();
  //   expect(component.posts).toEqual(posts);
  //   expect(component.page).toBe(2);
  // });

  // it('should not load posts if already loading', async () => {
  //   component.loading = true;
  //   await component.loadPosts();
  //   expect(tableService.getPosts).not.toHaveBeenCalled();
  // });

  it('should handle error when loading posts', async () => {
    (tableService.getPosts as jasmine.Spy).and.returnValue(Promise.reject('Error'));
    await component.loadPosts();
    expect(component.loading).toBeFalse();
  });

  // it('should load more posts on scroll', () => {
  //   const posts = [{ id: 1, title: 'Test', body: 'Test body' }];
  //   (tableService.getPosts as jasmine.Spy).and.returnValue(of(posts));
  //   component.onScroll();
  //   expect(component.posts).toEqual(posts);
  //   expect(component.page).toBe(2);
  // });

  it('should display posts in table', () => {
    const posts = component.posts;
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toBe(posts.length + 1); // +1 for the header row
    // ... other checks
  });
});