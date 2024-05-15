import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  getComments(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/post/${postId}`);
  }

  createComment(userId: number, comment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { ...comment, userId });
  }

  updateComment(commentId: number, comment: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${commentId}`, comment);
  }

  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${commentId}`);
  }

  getUserComments(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/${userId}`);
  }
}
