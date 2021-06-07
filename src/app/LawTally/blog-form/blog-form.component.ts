import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/users.service';
import { ModalService } from 'src/app/core/modal.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  @Output() blogSubmitted = new EventEmitter();
  blogForm: FormGroup;
  submitted: boolean = false;
  blogData: any;
  @Input()
  set blogInfo(blogData) {
    if (blogData) {
      this.blogData = blogData;
      console.log(blogData)
      this.blogForm.patchValue({
        blogs_image: blogData.blogs_image,
        title: blogData.title,
        category_id: blogData.category_id,
        category_slug: blogData.category_slug,
        meta_title: blogData.meta_title,
        meta_keyword: blogData.meta_keyword,
        meta_description: blogData.meta_description,
        short_description: blogData.short_description,
        description: blogData.description
      });
    }
  }

  constructor(
    public usersService: UsersService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.newForm();
    // this.usersService.getBlogCategory();
  }

  newForm() {
    this.blogForm = this.formBuilder.group({
      blogs_image: ['', Validators.required],
      title: ['', Validators.required],
      category_id: ['', Validators.required],
      category_slug: ['', Validators.required],
      meta_title: ['', Validators.required],
      meta_keyword: ['', Validators.required],
      meta_description: ['', Validators.required],
      short_description: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  onSelectedArea(practiceArea) {
    console.log(practiceArea)
  }

  onSubmit(blogForm) {
    if (blogForm.valid) {
      console.log(blogForm.value);
      this.blogSubmitted.emit(blogForm.value);
      this.newForm();
    }
    else {
      console.log("Invalid");
      this.submitted = true;
    }
  }

  onDiscard() {
    this.modalService.close('addBlogForm');
    this.modalService.close('editBlogForm');
    if (!this.blogData) {
      this.newForm();
    }
  }
}

