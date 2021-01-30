import { PostsService } from './posts/posts.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'angular-bogota-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'firebase-wall';
  addPostForm: FormGroup;
  posts$: Observable<any>;

  constructor(
    public readonly auth: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly postService: PostsService
  ) {
    this.addPostForm = this.formBuilder.group({
      title: new FormControl(''),
      summary: new FormControl(''),
      description: new FormControl(''),
    });
    this.posts$ = this.postService.getPosts();
  }

  submitForm(uid: string) {
    this.postService.createPost({ ...this.addPostForm.getRawValue(), uid });
  }
}
