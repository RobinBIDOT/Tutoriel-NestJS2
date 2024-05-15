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

  createComment(postId: number, comment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, { ...comment, postId });
  }

  updateComment(commentId: number, comment: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${commentId}`, comment);
  }

  deleteComment(commentId: number, postId: number): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}/delete/${commentId}`, { body: { postId } });
  }
}
