import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent implements OnInit{
  posts: any[] = [];

  constructor(private blogService: BlogService, private router:Router){

  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(){
    this.blogService.getPosts().subscribe((data)=>{
      console.log(data);
      this.posts = data;
    })
  }

  onEdit(id:any){
    console.log(id);
    this.router.navigate(["/edit-post",id]);
  }

  onDelete(id:any){
    console.log(id);
    this.blogService.deletePost(id).subscribe(()=>{
      this.posts = this.posts.filter(post => post.id !== id);
    })
    this.getAllPosts();
  }
}
