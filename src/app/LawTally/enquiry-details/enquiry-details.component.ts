import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enquiry-details',
  templateUrl: './enquiry-details.component.html',
  styleUrls: ['./enquiry-details.component.css']
})
export class EnquiryDetailsComponent implements OnInit {
  enquiryData: any;

  constructor() { }

  ngOnInit() {
    let enquiryData = sessionStorage.getItem('enquirydata');
    this.enquiryData = JSON.parse(enquiryData)
    console.log(this.enquiryData)
  }

}
