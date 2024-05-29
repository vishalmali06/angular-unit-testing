import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TableInfiniteScrollService } from './table-infinite-scroll.service';

describe('TableInfiniteScrollService', () => {
  let service: TableInfiniteScrollService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [TableInfiniteScrollService] // Provide TableInfiniteScrollService
    });
    service = TestBed.inject(TableInfiniteScrollService); // Inject TableInfiniteScrollService
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no requests are outstanding after each test
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts from the API', () => {
    const dummyPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
    const page = 1;
    const limit = 2;

    service.getPosts(page, limit).subscribe(posts => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${service.apiUrl}?_page=${page}&_limit=${limit}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should handle error if API request fails', () => {
    const page = 1;
    const limit = 2;

    service.getPosts(page, limit).subscribe(
      () => fail('should have failed with the 404 error'),
      (error) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual('Not Found');
      }
    );

    const req = httpMock.expectOne(`${service.apiUrl}?_page=${page}&_limit=${limit}`);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

});
