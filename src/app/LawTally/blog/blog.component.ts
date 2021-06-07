import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { MatTabChangeEvent } from '@angular/material';


declare let $ : any;
declare let jQuery : any;
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    id;
    category_id;
    temp_id;
    cp = 1;

  constructor(
    public usersService: UsersService
  ) { }
    ngOnInit() {
      window.scrollTo({
        top:0,
        left: 0,
        behavior: 'smooth'
      });
        this.usersService.getBlogCategory();
    }
    
    tabChanged(tabChangeEvent: MatTabChangeEvent): void {
        // console.log(tabChangeEvent.tab.textLabel.id);
        // this.category_id  = tabChangeEvent.tab.textLabel.id;
        this.category_id  = tabChangeEvent.tab.textLabel;
        this.temp_id      = this.category_id.id;

        this.usersService.getBlogListing(this.temp_id);
    }

    blogDetails(id){
      sessionStorage.setItem('blog_id',id);
    }
}
