import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private readonly firestore: AngularFirestore) {}

  createPost(post): void {
    const postId = this.firestore.createId();
    this.firestore
      .collection('posts')
      .doc(postId)
      .set({ ...post, postId }, { merge: true })
      .then(console.log);
  }

  getPosts() {
    return this.firestore.collection('posts').valueChanges()
  }
}
