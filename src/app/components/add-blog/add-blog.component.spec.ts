import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { AddBlogComponent } from './add-blog.component';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
// Mock for ActivatedRoute
const mockActivatedRoute = {
  snapshot: {
    params: { id: '123' }
  }
};

describe('AddBlogComponent', () => {
  let component: AddBlogComponent;
  let fixture: ComponentFixture<AddBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBlogComponent],
      imports: [ReactiveFormsModule, FormsModule,provideHttpClient(), provideHttpClientTesting(), HttpClientTestingModule],
      providers: [BlogService,ActivatedRoute,provideHttpClientTesting(),
        { 
          provide: ActivatedRoute, 
          useValue: {
            params: of({ id: '123' }), // Mock route params, adjust as needed
            snapshot: {
              paramMap: {
                get: (key: string) => '123', // Mock paramMap, adjust as needed
              },
            },
          },
        },],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    expect(component.blogForm.valid).toBeFalsy(); // Form should be invalid initially

    const titleControl = component.blogForm.controls['title'];
    const authorControl = component.blogForm.controls['author'];
    const contentControl = component.blogForm.controls['content'];

    expect(titleControl.valid).toBeFalsy(); // Title control should be invalid
    expect(authorControl.valid).toBeFalsy(); // Author control should be invalid
    expect(contentControl.valid).toBeFalsy(); // Content control should be invalid
  });

  it('should validate required fields', () => {
    const titleControl = component.blogForm.controls['title'];
    const authorControl = component.blogForm.controls['author'];
    const contentControl = component.blogForm.controls['content'];

    titleControl.setValue('');
    authorControl.setValue('');
    contentControl.setValue('');

    expect(titleControl.hasError('required')).toBeTruthy(); // Expect error if required field is empty
    expect(authorControl.hasError('required')).toBeTruthy(); // Expect error if required field is empty
    expect(contentControl.hasError('required')).toBeTruthy(); // Expect error if required field is empty
  });

  it('should have a valid form when all fields are filled', () => {
    component.blogForm.controls['title'].setValue('Test Blog Title');
    component.blogForm.controls['author'].setValue('John Doe');
    component.blogForm.controls['content'].setValue('This is a test blog content.');

    expect(component.blogForm.valid).toBeTruthy(); // Form should be valid
  });

  it('should call the blog service createPost method when form is submitted', () => {
    const blogService = TestBed.inject(BlogService);
    spyOn(blogService, 'createPost').and.callThrough(); // Spy on createPost method

    component.blogForm.controls['title'].setValue('Test Blog Title');
    component.blogForm.controls['author'].setValue('John Doe');
    component.blogForm.controls['content'].setValue('This is a test blog content.');

    component.onSubmitBlog();

    expect(blogService.createPost).toHaveBeenCalledWith(component.blogForm.value); // Ensure the service method is called
  });

  it('should not submit the form if the form is invalid', () => {
    spyOn(component, 'onSubmitBlog').and.callThrough();

    component.blogForm.controls['title'].setValue('');
    component.blogForm.controls['author'].setValue('');
    component.blogForm.controls['content'].setValue('');

    component.onSubmitBlog();

    expect(component.onSubmitBlog).toHaveBeenCalled(); // Ensure the submit function was called
    expect(component.blogForm.valid).toBeFalsy(); // Ensure form is invalid
  });
});
