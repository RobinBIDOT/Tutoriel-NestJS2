import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: any;
  comments: any[] = [];
  commentForm: FormGroup;
  updateForm: FormGroup;
  editCommentId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });

    this.updateForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postService.getPost(postId).subscribe((data: any) => {
        this.post = data;
        this.comments = data.comments;
      });
    }
  }

  loadComments(postId: string): void {
    if (postId) {
      this.commentService.getComments(postId).subscribe((data: any[]) => {
        this.comments = data;
      });
    }
  }

  submitComment() {
    if (this.commentForm.valid) {
      const postId = this.route.snapshot.paramMap.get('id');
      if (postId) {
        this.commentService.createComment(+postId, this.commentForm.value).subscribe(() => {
          this.loadComments(postId);
          this.commentForm.reset();
        });
      }
    }
  }

  editComment(comment: any) {
    this.editCommentId = comment.commentId;
    this.updateForm.patchValue({
      content: comment.content
    });
  }

  updateComment() {
    if (this.updateForm.valid && this.editCommentId !== null) {
      const postId = this.route.snapshot.paramMap.get('id');
      if (postId) {
        this.commentService.updateComment(this.editCommentId, this.updateForm.value).subscribe(() => {
          this.loadComments(postId);
          this.editCommentId = null;
          this.updateForm.reset();
        });
      }
    }
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(() => {
      const postId = this.route.snapshot.paramMap.get('id');
      if (postId) {
        this.loadComments(postId);
      }
    });
  }

  isAuthor(comment: any): boolean {
    const user = this.authService.getUser();
    return user && user.userId === comment.userId;
  }
}
