import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/users.service';
import { ModalService } from 'src/app/core/modal.service';
import Swal from 'sweetalert2';
declare let $ : any;

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  cp: number = 1;
  blogData = [];
  blogInfo: any;
  constructor(
    private userService: UsersService,
    private modalService: ModalService, private router: Router
  ) { }

  ngOnInit() {
    this.userService.getBlogs().subscribe((data) => {
      console.log(data)
      if (data['status'] === "SUCCESS") {
        this.blogData = data['response_data'];
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",this.blogData)
      }
    })
    // this.blogData.push(
    //   { title: 'Lorem Ipsum is simply dummy text', short_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has' },
    //   { title: 'Lorem Ipsum is simply', short_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    //   { title: 'Lorem Ipsum is simply', short_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    //   { title: 'Lorem Ipsum is simply dummy text', short_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has' }
    // )
  }

  addBlogModal() {
    this.modalService.open('addBlogForm')
  }

  addBlog(blogData) {
    this.modalService.close('addBlogForm')
    console.log(blogData);
    this.userService.addBlogs(blogData).subscribe((data: any) => {
      console.log(data)
      if (data.status === 'SUCCESS') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Blog Submitted successfully',
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
      this.ngOnInit();
    })
  }

  editBlogModal(blog) {
   console.log(blog)
    this.blogInfo = blog;
    this.router.navigate(['/lawyer-directory/edit-blog',blog.id]);
   // this.modalService.open('editBlogForm') ['/product-details', id]
  }

  editBlogModal1(blog) {
   
 this.router.navigate(['/lawyer-directory/edit-blog', { blogdata: blog }]);
  console.log("blog list page blog>>>>>>>>",blog);
}


  editBlog(blogData) {
    this.modalService.close('editBlogForm')
    console.log(blogData);
    blogData['blog_id'] = this.blogInfo['id'];
    this.userService.editBlogs(blogData).subscribe((data: any) => {
      console.log(data)
      if (data.status === 'SUCCESS') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Blog Updated successfully',
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: data.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
      this.ngOnInit();
    })
  }

  onDeleteBlog(id) {
    console.log(id)
    Swal.fire({
      title: 'Are you sure?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Delete Blog successfully',
          showConfirmButton: false,
          timer: 500,
        });
        this.userService.deleteBlog(id).subscribe((data) => {
          console.log(data);
          this.ngOnInit();
        })
      }
    });
  }
  exportAsXLSX() { }
}
