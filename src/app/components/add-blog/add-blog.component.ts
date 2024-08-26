import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent implements OnInit{
  blogForm!: FormGroup;
  submitted = false;
  isEdit = false;
  blogId: any;
  
  constructor(private formBuilder: FormBuilder, private blogService:BlogService, private router:Router, private route:ActivatedRoute){}
  
  ngOnInit():void{
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ['', Validators.required],
    });  

    // Check if we're editing an existing post
    this.blogId = this.route.snapshot.paramMap.get('id');
    if (this.blogId) {
      this.isEdit = true;
      this.blogService.getPost(this.blogId).subscribe((post) => {
        this.blogForm.patchValue({
          title: post.title,
          author: post.author,
          content: post.content,
        });
      });
    }
  }

  onSubmitBlog(){
    this.submitted = true;
    if (this.blogForm.invalid) {
      return;
    }
    console.log(this.blogForm.value);

    if (this.isEdit && this.blogId) {
      this.blogService.updatePost(this.blogId, this.blogForm.value).subscribe((data) => {
        console.log('Post updated:', data);
        this.router.navigate(['/posts']); 
      });
    } else {
      this.blogService.createPost(this.blogForm.value).subscribe((data) => {
        console.log('New post created:', data);
        this.router.navigate(['/posts']); 
      });
    }
  }
}
