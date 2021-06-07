import { UsersService } from './../../core/users.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blog: any;
  blogInfo: any;

  constructor( private userService: UsersService,private route: Router,public activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    // this.blog = this.route.snapshot.paramMap.get('blogdata');
    // this.blog = this.activatedRoute.paramMap
    // .pipe(map(() => window.history.state))
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      this.blog=res;
      console.log("edit blog page  blog",this.blog);
    })
  
    
  }

  editBlog(blogData) {
   
    console.log(blogData,"edit blog page blog data");
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

}
