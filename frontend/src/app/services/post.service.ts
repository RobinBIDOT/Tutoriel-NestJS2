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

  createPost(post: any): Observable<any> {
    return this.http.post(this.baseUrl, post);
  }

  updatePost(postId: string, post: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${postId}`, post);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${postId}`);
  }
}
