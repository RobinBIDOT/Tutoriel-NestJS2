import { Component, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {
  @Input() postId!: number;
  commentForm: FormGroup;

  constructor(private fb: FormBuilder, private commentService: CommentService) {
    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  submitComment() {
    if (this.commentForm.valid) {
      this.commentService.createComment(this.postId, this.commentForm.value).subscribe(() => {
        // Handle success
      });
    }
  }
}
