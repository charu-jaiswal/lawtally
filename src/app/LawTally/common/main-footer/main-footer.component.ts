import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../core/users.service';
import { Router} from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-main-footer',
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {

  selcountry:string='';
  
    getcountryList = [
      { "name": "Australia", "id": "Australia" },
      { "name": "Canada", "id": "Canada" },
      { "name": "United Kingdom", "id": "United Kingdom" },
      { "name": "United States", "id": "United States" }
  ];

  constructor(
    public usersService: UsersService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.selcountry='United States';
    localStorage.removeItem('setsearchbyregionval');
    localStorage.setItem('setsearchbyregionval',this.selcountry);

       $(".footer-manu-head").on("click", function () {
      $(this).siblings(".footer-manu-links").slideToggle("slow");
      $(this).parent().parent().siblings().find(".footer-manu-links").slideUp("slow");
      $(this).parent().siblings().find(".footer-manu-links").slideUp("slow");
    });
  }

  setcountryvalfunc(param1) {
    localStorage.removeItem('setsearchbyregionval');
    localStorage.setItem('setsearchbyregionval',param1);
  }

  searchbycountryfunc() {
     //this.router.navigate(['/lawyer-directory/listing', { address:'undefined', lawyer:'undefined', search_country: localStorage.getItem('setsearchbyregionval')}]);

    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/lawyer-directory/listing', { search_country: localStorage.getItem('setsearchbyregionval')}]);
    }); 
    
  }

  onsubmitNewsletter(newsletter){
    if(newsletter.valid){
      this.usersService.submitNewsletter(newsletter);
    }
  }

}
