import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/users.service';
import { ModalService } from 'src/app/core/modal.service';

declare let jQuery: any;
declare let $: any;

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit {

  constructor(
    public usersService: UsersService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    
  }

  

  menuclose() {
    $("body").removeClass("desktop-left-menu");
  }

}
