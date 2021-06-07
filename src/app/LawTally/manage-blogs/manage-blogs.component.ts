import Swal from "sweetalert2";
import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsersService } from "src/app/core/users.service";
import { ModalService } from "src/app/core/modal.service";
import { Router, ActivatedRoute } from "@angular/router";
declare var $: any;
@Component({
  selector: "app-manage-blogs",
  templateUrl: "./manage-blogs.component.html",
  styleUrls: ["./manage-blogs.component.css"],
})
export class ManageBlogsComponent implements OnInit {
  imageURL;
  htmlContent;
  cp: number = 1;
  blogForm: FormGroup;
  submitted: boolean = false;
  blogData: any;
  categories = [];
  EditBlogData: any;
  private sub: any;
  BlogID: any = "";
  blogInfo: any;
  constructor(
    public userService: UsersService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private activeroute:ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.newForm();
    this.userService.getBlogCategoryaddedit().subscribe((_res: any) => {
      this.categories = _res.response_data;
    });
    this.sub = this.activeroute.params.subscribe((params) => {
      this.BlogID = params["id"]; // (+) converts string 'id' to a number
      console.log(this.BlogID, "***************");
      if (this.BlogID! == undefined || this.BlogID !== null) {
        this.postBlogData(this.BlogID);
      }
      // In a real app: dispatch action to load the details here.
    });

    // This is the simple bit of jquery to duplicate the hidden field to subfile
    $("#pdffile").change(function () {
      $("#subfile").val($(this).val());
    });

    // This bit of jquery will show the actual file input box
    $("#showHidden").click(function () {
      $("#pdffile").css("visibilty", "visible");
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  imageChangedEvent = "";
  selectimage($event): void {
    console.log("iiiiiiiiii", $event);
    $("#cropmodal").modal("show");
    this.imageChangedEvent = $event;
    // this.readThis($event.target);
  }
  croppedImage;
  imageCropped(event) {
    this.imageURL = event.base64;
    console.log("Aaaasddd44", this.imageURL);
  }

  createslug(x) {
    x = x.replace(/\s+/g, "-");
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", x);
    this.blogForm.patchValue({
      category_slug: x,
    });
  }

  newForm() {
    this.blogForm = this.formBuilder.group({
      blogs_image: [""],
      image: ["", Validators.required],
      title: ["", Validators.required],
      category_id: ["", Validators.required],
      category_slug: [""],
      meta_title: ["rohanTest"],
      meta_keyword: ["rohanTest"],
      meta_description: ["", Validators.required],
      short_description: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  onSubmit(blogForm) {
    this.blogForm.value.image = this.imageURL;

    if (blogForm.valid) {
      if (
        this.BlogID !== undefined ||
        this.BlogID !== null ||
        this.BlogID !== ""
      ) {
        this.editBlog(blogForm.value);
      } else {
        console.log(blogForm.value);
        this.addBlog(blogForm.value);
      }
    } else {
      console.log("Invalid");
      this.submitted = true;
    }
  }

  addBlog(blogData) {
    console.log(blogData);
    this.userService.addBlogs(blogData).subscribe((data: any) => {
      console.log(data);
      if (data.status === "SUCCESS") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Blog Submitted successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: data.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
      this.ngOnInit();
    });
  }
  postBlogData = async (id) => {
    await this.userService.postBlogDta(id).subscribe((res: any) => {
      console.log("manage page post blog", res);
      this.EditBlogData = res;
      if (this.EditBlogData.status == "SUCCESS") {
      (<HTMLInputElement>document.getElementById("subfile")).value=this.EditBlogData.response_data.blogs_image;
        
        this.blogForm = this.formBuilder.group({
          blogs_image: [this.EditBlogData.response_data.blogs_image],
          image: [this.EditBlogData.response_data.blogs_image],
          category_slug: [this.EditBlogData.response_data.title],
          title: [this.EditBlogData.response_data.title, Validators.required],
          category_id: [
            this.EditBlogData.response_data.category_id,
            Validators.required,
          ],
          meta_title: [this.EditBlogData.response_data.meta_title],
          meta_keyword: [this.EditBlogData.response_data.meta_keyword],
          meta_description: [
            this.EditBlogData.response_data.meta_description,
            Validators.required,
          ],
          short_description: [
            this.EditBlogData.response_data.short_description,
            Validators.required,
          ],
          description: [
            this.EditBlogData.response_data.description,
            Validators.required,
          ],
        });
      }
    });
  };

  editBlog(blogData) {
    // this.modalService.close('editBlogForm')
    console.log(blogData);
    blogData["blog_id"] = this.BlogID;

    this.userService.editBlogs(blogData).subscribe((data: any) => {
      console.log(data);
      if (data.status === "SUCCESS") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Blog Updated successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        this.router.navigate(['/lawyer-directory/blog-list']);
        
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: data.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
      //this.ngOnInit();
    });

  }

}
