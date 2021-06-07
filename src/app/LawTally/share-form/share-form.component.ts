import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/core/modal.service';
import { UsersService } from 'src/app/core/users.service';

declare let $: any;
declare let jQuery: any
@Component({
  selector: 'app-share-form',
  templateUrl: './share-form.component.html',
  styleUrls: ['./share-form.component.css']
})
export class ShareFormComponent implements OnInit {
  currentUrl: string;
  validEmail: boolean = false;
  validSendTo: boolean = false;
  activeIdString: string[];

  constructor(
    private modalService: ModalService,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.activeIdString = ['url-tab'];
    $('#addEmailForm').parsley();
    this.currentUrl = window.location.href
  }

  copyInputMessage(inputElement) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.innerText = inputElement;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.modalService.close('shareForm')
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Copy Url to clipboard',
      showConfirmButton: false,
      timer: 500,
    });
  }

  sendSms(mob) {
    this.modalService.close('shareForm')
    let data = {
      'profile_link': window.location.href,
      'share_with': 'mobile'
    }
    this.userService.shareProfile(data).subscribe((data) => {
      if (data['status'] === 'SUCCESS') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data['message'],
          showConfirmButton: false,
          timer: 500,
        });
      }
      mob = null;
      this.activeIdString = ['url-tab'];
    })
  }

  send(addEmailForm) {
    this.modalService.close('shareForm')
    let data = addEmailForm['value']
    data['profile_link'] = window.location.href
    data['share_with'] = 'email'
    if (addEmailForm.valid && this.validEmail && this.validSendTo) {
      this.userService.shareProfile(addEmailForm.value).subscribe((data) => {
        if (data['status'] === 'SUCCESS') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data['message'],
            showConfirmButton: false,
            timer: 500,
          });
          $('#addEmailForm').parsley().reset();
          $('#addEmailForm').parsley('reset');
          this.activeIdString = ['url-tab'];
        }
      })
    }
    else {
      console.log("Invalid");
    }
  }

  emailValid(event) {
    var regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g
    this.validEmail = regex.test(event.target.value)
  }

  sendToValid(event) {
    var regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g
    this.validSendTo = regex.test(event.target.value)
  }

}
