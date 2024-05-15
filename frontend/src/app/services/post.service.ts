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
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getPost(postId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${postId}`);
  }

  createPost(userId: number, post: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { ...post, userId });
  }

  updatePost(postId: number, post: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${postId}`, post);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${postId}`);
  }

  getUserPosts(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }
}
