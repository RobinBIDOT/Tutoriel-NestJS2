import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  createComment(postId: number, content: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, { postId, ...content });
  }

  // Add methods for update, delete
}
