import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';

export const routes: Routes = [
    { path: '', redirectTo: '/posts', pathMatch: 'full' },
    { path: 'posts', component: BlogListComponent },
    { path: 'add-post', component: AddBlogComponent},
    { path: 'edit-post/:id', component: AddBlogComponent}, // Route for editing
];