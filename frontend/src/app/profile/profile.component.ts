import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  posts: any[] = [];
  comments: any[] = [];
  postForm: FormGroup;
  commentForm: FormGroup;
  editPostId: number | null = null;
  editCommentId: number | null = null;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private commentService: CommentService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });

    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user) {
      this.loadUserPosts();
      this.loadUserComments();
    }
  }

  loadUserPosts(): void {
    this.postService.getUserPosts(this.user.userId).subscribe((data: any[]) => {
      this.posts = data;
    });
  }

  loadUserComments(): void {
    this.commentService.getUserComments(this.user.userId).subscribe((data: any[]) => {
      this.comments = data;
    });
  }

  submitPost(): void {
    if (this.postForm.valid) {
      if (this.editPostId) {
        this.postService.updatePost(this.editPostId, this.postForm.value).subscribe(() => {
          this.loadUserPosts();
          this.editPostId = null;
          this.postForm.reset();
        });
      } else {
        this.postService.createPost(this.user.userId, this.postForm.value).subscribe(() => {
          this.loadUserPosts();
          this.postForm.reset();
        });
      }
    }
  }

  submitComment(): void {
    if (this.commentForm.valid) {
      if (this.editCommentId) {
        this.commentService.updateComment(this.editCommentId, this.commentForm.value).subscribe(() => {
          this.loadUserComments();
          this.editCommentId = null;
          this.commentForm.reset();
        });
      } else {
        this.commentService.createComment(this.user.userId, this.commentForm.value).subscribe(() => {
          this.loadUserComments();
          this.commentForm.reset();
        });
      }
    }
  }

  editPost(post: any): void {
    this.editPostId = post.postId;
    this.postForm.patchValue({
      title: post.title,
      body: post.body
    });
  }

  editComment(comment: any): void {
    this.editCommentId = comment.commentId;
    this.commentForm.patchValue({
      content: comment.content
    });
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(() => {
      this.loadUserPosts();
    });
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.loadUserComments();
    });
  }
}
