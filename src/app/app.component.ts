import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogHeaderComponent } from "./components/blog-header/blog-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BlogHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'simple-blog-front';
}
