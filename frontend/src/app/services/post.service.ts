import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getPost(postId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${postId}`);
  }

  getComments(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${postId}/comments`);
  }
}
