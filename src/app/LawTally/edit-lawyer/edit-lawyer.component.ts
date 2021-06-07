import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../core/users.service";
import { Router } from "@angular/router";
import { AuthService } from "../../core/auth.service";
import Swal from "sweetalert2";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';
declare let $: any;
declare let jQuery: any;

@Component({
  selector: "app-edit-lawyer",
  templateUrl: "./edit-lawyer.component.html",
  styleUrls: ["./edit-lawyer.component.css"],
})
export class EditLawyerComponent implements OnInit {
  background_check: boolean=false;
  currentFileUpload = null;
  ifError:boolean=false;
  imgURL;
  divtest1;
  birthDate;
  loginMessage;
  message;
  public loading = false;
  overviewForm: any;
  caseForm: any = [];
  practiceAreaForm: any = [];
  expCertForm: any = [];
  eduLangForm: any = [];
  firmForm: any = [];
  costForm: any = [];

  gender1 = [
    { name: "Male", id: "male" },
    { name: "Female", id: "female" },
  ];
  exprience = [
    { name: "1", id: "1" },
   
  ];

  options1 = [
    { name: "2017", id: "2017" },
    { name: "2018", id: "2018" },
    { name: "2019", id: "2019" },
  ];

  proficiency1 = [
    { name: "Low", id: "low" },
    { name: "Medium", id: "medium" },
    { name: "High", id: "high" },
  ];

  hourlyrates1 = [
    { name: "Above 20000", id: "20000" },
    { name: "Above 10000", id: "10000" },
    { name: "Above 5000", id: "5000" },
  ];

  consultation1 = [
    { name: "1 hr", id: "1" },
    { name: "2 hr", id: "2" },
    { name: "3 hr", id: "3" },
  ];

  consultationfees1 = [
    { name: "1000", id: "1000" },
    { name: "2000", id: "2000" },
    { name: "3000", id: "3000" },
  ];

  paymentmethods = [
    { name: "Online", id: "online" },
    { name: "Cash", id: "cash" },
    { name: "Card", id: "card" },
  ];
  dropdownSettings = {
    singleSelection: false,
    idField: "_id",
    textField: "name",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 5,
    allowSearchFilter: true,
  };
  dropdownSettings1 = {
    singleSelection: false,
    idField: "id",
    textField: "name",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  countryList = [
    { name: "Afghanistan", id: "Afghanistan" },
    { name: "land Islands", id: "land Islands" },
    { name: "Albania", id: "Albania" },
    { name: "Algeria", id: "Algeria" },
    { name: "American Samoa", id: "American Samoa" },
    { name: "AndorrA", id: "AndorrA" },
    { name: "Angola", id: "Angola" },
    { name: "Anguilla", id: "Anguilla" },
    { name: "Antarctica", id: "Antarctica" },
    { name: "Antigua and Barbuda", id: "Antigua and Barbuda" },
    { name: "Argentina", id: "Argentina" },
    { name: "Armenia", id: "Armenia" },
    { name: "Aruba", id: "Aruba" },
    { name: "Australia", id: "Australia" },
    { name: "Austria", id: "Austria" },
    { name: "Azerbaijan", id: "Azerbaijan" },
    { name: "Bahamas", id: "Bahamas" },
    { name: "Bahrain", id: "Bahrain" },
    { name: "Bangladesh", id: "Bangladesh" },
    { name: "Barbados", id: "Barbados" },
    { name: "Belarus", id: "Belarus" },
    { name: "Belgium", id: "Belgium" },
    { name: "Belize", id: "Belize" },
    { name: "Benin", id: "Benin" },
    { name: "Bermuda", id: "Bermuda" },
    { name: "Bhutan", id: "Bhutan" },
    { name: "Bolivia", id: "Bolivia" },
    { name: "Bosnia and Herzegovina", id: "Bosnia and Herzegovina" },
    { name: "Botswana", id: "Botswana" },
    { name: "Bouvet Island", id: "Bouvet Island" },
    { name: "Brazil", id: "Brazil" },
    {
      name: "British Indian Ocean Territory",
      id: "British Indian Ocean Territory",
    },
    { name: "Brunei Darussalam", id: "Brunei Darussalam" },
    { name: "Bulgaria", id: "Bulgaria" },
    { name: "Burkina Faso", id: "Burkina Faso" },
    { name: "Burundi", id: "Burundi" },
    { name: "Cambodia", id: "Cambodia" },
    { name: "Cameroon", id: "Cameroon" },
    { name: "Canada", id: "Canada" },
    { name: "Cape Verde", id: "Cape Verde" },
    { name: "Cayman Islands", id: "Cayman Islands" },
    { name: "Central African Republic", id: "Central African Republic" },
    { name: "Chad", id: "Chad" },
    { name: "Chile", id: "Chile" },
    { name: "China", id: "China" },
    { name: "Christmas Island", id: "Christmas Island" },
    { name: "Cocos (Keeling) Islands", id: "Cocos (Keeling) Islands" },
    { name: "Colombia", id: "Colombia" },
    { name: "Comoros", id: "Comoros" },
    { name: "Congo", id: "Congo" },
    {
      name: "Congo, The Democratic Republic of the",
      id: "Congo, The Democratic Republic of the",
    },
    { name: "Cook Islands", id: "Cook Islands" },
    { name: "Costa Rica", id: "Costa Rica" },
    { name: 'Cote D"Ivoire', id: 'Cote D"Ivoire' },
    { name: "Croatia", id: "Croatia" },
    { name: "Cuba", id: "Cuba" },
    { name: "Cyprus", id: "Cyprus" },
    { name: "Czech Republic", id: "Czech Republic" },
    { name: "Denmark", id: "Denmark" },
    { name: "Djibouti", id: "Djibouti" },
    { name: "Dominica", id: "Dominica" },
    { name: "Dominican Republic", id: "Dominican Republic" },
    { name: "Ecuador", id: "Ecuador" },
    { name: "Egypt", id: "Egypt" },
    { name: "El Salvador", id: "El Salvador" },
    { name: "Equatorial Guinea", id: "Equatorial Guinea" },
    { name: "Eritrea", id: "Eritrea" },
    { name: "Estonia", id: "Estonia" },
    { name: "Ethiopia", id: "Ethiopia" },
    { name: "Falkland Islands (Malvinas)", id: "Falkland Islands (Malvinas)" },
    { name: "Faroe Islands", id: "Faroe Islands" },
    { name: "Fiji", id: "Fiji" },
    { name: "Finland", id: "Finland" },
    { name: "France", id: "France" },
    { name: "French Guiana", id: "French Guiana" },
    { name: "French Polynesia", id: "French Polynesia" },
    { name: "French Southern Territories", id: "French Southern Territories" },
    { name: "Gabon", id: "Gabon" },
    { name: "Gambia", id: "Gambia" },
    { name: "Georgia", id: "Georgia" },
    { name: "Germany", id: "Germany" },
    { name: "Ghana", id: "Ghana" },
    { name: "Gibraltar", id: "Gibraltar" },
    { name: "Greece", id: "Greece" },
    { name: "Greenland", id: "Greenland" },
    { name: "Grenada", id: "Grenada" },
    { name: "Guadeloupe", id: "Guadeloupe" },
    { name: "Guam", id: "Guam" },
    { name: "Guatemala", id: "Guatemala" },
    { name: "Guernsey", id: "Guernsey" },
    { name: "Guinea", id: "Guinea" },
    { name: "Guinea-Bissau", id: "Guinea-Bissau" },
    { name: "Guyana", id: "Guyana" },
    { name: "Haiti", id: "Haiti" },
    {
      name: "Heard Island and Mcdonald Islands",
      id: "Heard Island and Mcdonald Islands",
    },
    {
      name: "Holy See (Vatican City State)",
      id: "Holy See (Vatican City State)",
    },
    { name: "Honduras", id: "Honduras" },
    { name: "Hong Kong", id: "Hong Kong" },
    { name: "Hungary", id: "Hungary" },
    { name: "Iceland", id: "Iceland" },
    { name: "India", id: "India" },
    { name: "Indonesia", id: "Indonesia" },
    { name: "Iran, Islamic Republic Of", id: "Iran, Islamic Republic Of" },
    { name: "Iraq", id: "Iraq" },
    { name: "Ireland", id: "Ireland" },
    { name: "Isle of Man", id: "Isle of Man" },
    { name: "Israel", id: "Israel" },
    { name: "Italy", id: "Italy" },
    { name: "Jamaica", id: "Jamaica" },
    { name: "Japan", id: "Japan" },
    { name: "Jersey", id: "Jersey" },
    { name: "Jordan", id: "Jordan" },
    { name: "Kazakhstan", id: "Kazakhstan" },
    { name: "Kenya", id: "Kenya" },
    { name: "Kiribati", id: "Kiribati" },
    {
      name: 'Korea, Democratic People"S Republic of',
      id: 'Korea, Democratic People"S Republic of',
    },
    { name: "Korea, Republic of", id: "Korea, Republic of" },
    { name: "Kuwait", id: "Kuwait" },
    { name: "Kyrgyzstan", id: "Kyrgyzstan" },
    {
      name: 'Lao People"S Democratic Republic',
      id: 'Lao People"S Democratic Republic',
    },
    { name: "Latvia", id: "Latvia" },
    { name: "Lebanon", id: "Lebanon" },
    { name: "Lesotho", id: "Lesotho" },
    { name: "Liberia", id: "Liberia" },
    { name: "Libyan Arab Jamahiriya", id: "Libyan Arab Jamahiriya" },
    { name: "Liechtenstein", id: "Liechtenstein" },
    { name: "Lithuania", id: "Lithuania" },
    { name: "Luxembourg", id: "Luxembourg" },
    { name: "Macao", id: "Macao" },
    {
      name: "Macedonia, The Former Yugoslav Republic of",
      id: "Macedonia, The Former Yugoslav Republic of",
    },
    { name: "Madagascar", id: "Madagascar" },
    { name: "Malawi", id: "Malawi" },
    { name: "Malaysia", id: "Malaysia" },
    { name: "Maldives", id: "Maldives" },
    { name: "Mali", id: "Mali" },
    { name: "Malta", id: "Malta" },
    { name: "Marshall Islands", id: "Marshall Islands" },
    { name: "Martinique", id: "Martinique" },
    { name: "Mauritania", id: "Mauritania" },
    { name: "Mauritius", id: "Mauritius" },
    { name: "Mayotte", id: "Mayotte" },
    { name: "Mexico", id: "Mexico" },
    {
      name: "Micronesia, Federated States of",
      id: "Micronesia, Federated States of",
    },
    { name: "Moldova, Republic of", id: "Moldova, Republic of" },
    { name: "Monaco", id: "Monaco" },
    { name: "Mongolia", id: "Mongolia" },
    { name: "Montenegro", id: "Montenegro" },
    { name: "Montserrat", id: "Montserrat" },
    { name: "Morocco", id: "Morocco" },
    { name: "Mozambique", id: "Mozambique" },
    { name: "Myanmar", id: "Myanmar" },
    { name: "Namibia", id: "Namibia" },
    { name: "Nauru", id: "Nauru" },
    { name: "Nepal", id: "Nepal" },
    { name: "Netherlands", id: "Netherlands" },
    { name: "Netherlands Antilles", id: "Netherlands Antilles" },
    { name: "New Caledonia", id: "New Caledonia" },
    { name: "New Zealand", id: "New Zealand" },
    { name: "Nicaragua", id: "Nicaragua" },
    { name: "Niger", id: "Niger" },
    { name: "Nigeria", id: "Nigeria" },
    { name: "Niue", id: "Niue" },
    { name: "Norfolk Island", id: "Norfolk Island" },
    { name: "Northern Mariana Islands", id: "Northern Mariana Islands" },
    { name: "Norway", id: "Norway" },
    { name: "Oman", id: "Oman" },
    { name: "Pakistan", id: "Pakistan" },
    { name: "Palau", id: "Palau" },
    {
      name: "Palestinian Territory, Occupied",
      id: "Palestinian Territory, Occupied",
    },
    { name: "Panama", id: "Panama" },
    { name: "Papua New Guinea", id: "Papua New Guinea" },
    { name: "Paraguay", id: "Paraguay" },
    { name: "Peru", id: "Peru" },
    { name: "Philippines", id: "Philippines" },
    { name: "Pitcairn", id: "Pitcairn" },
    { name: "Poland", id: "Poland" },
    { name: "Portugal", id: "Portugal" },
    { name: "Puerto Rico", id: "Puerto Rico" },
    { name: "Qatar", id: "Qatar" },
    { name: "Reunion", id: "Reunion" },
    { name: "Romania", id: "Romania" },
    { name: "Russian Federation", id: "Russian Federation" },
    { name: "RWANDA", id: "RWANDA" },
    { name: "Saint Helena", id: "Saint Helena" },
    { name: "Saint Kitts and Nevis", id: "Saint Kitts and Nevis" },
    { name: "Saint Lucia", id: "Saint Lucia" },
    { name: "Saint Pierre and Miquelon", id: "Saint Pierre and Miquelon" },
    {
      name: "Saint Vincent and the Grenadines",
      id: "Saint Vincent and the Grenadines",
    },
    { name: "Samoa", id: "Samoa" },
    { name: "San Marino", id: "San Marino" },
    { name: "Sao Tome and Principe", id: "Sao Tome and Principe" },
    { name: "Saudi Arabia", id: "Saudi Arabia" },
    { name: "Senegal", id: "Senegal" },
    { name: "Serbia", id: "Serbia" },
    { name: "Seychelles", id: "Seychelles" },
    { name: "Sierra Leone", id: "Sierra Leone" },
    { name: "Singapore", id: "Singapore" },
    { name: "Slovakia", id: "Slovakia" },
    { name: "Slovenia", id: "Slovenia" },
    { name: "Solomon Islands", id: "Solomon Islands" },
    { name: "Somalia", id: "Somalia" },
    { name: "South Africa", id: "South Africa" },
    {
      name: "South Georgia and the South Sandwich Islands",
      id: "South Georgia and the South Sandwich Islands",
    },
    { name: "Spain", id: "Spain" },
    { name: "Sri Lanka", id: "Sri Lanka" },
    { name: "Sudan", id: "Sudan" },
    { name: "Suriname", id: "Suriname" },
    { name: "Svalbard and Jan Mayen", id: "Svalbard and Jan Mayen" },
    { name: "Swaziland", id: "Swaziland" },
    { name: "Sweden", id: "Sweden" },
    { name: "Switzerland", id: "Switzerland" },
    { name: "Syrian Arab Republic", id: "Syrian Arab Republic" },
    { name: "Taiwan, Province of China", id: "Taiwan, Province of China" },
    { name: "Tajikistan", id: "Tajikistan" },
    {
      name: "Tanzania, United Republic of",
      id: "Tanzania, United Republic of",
    },
    { name: "Thailand", id: "Thailand" },
    { name: "Timor-Leste", id: "Timor-Leste" },
    { name: "Togo", id: "Togo" },
    { name: "Tokelau", id: "Tokelau" },
    { name: "Tonga", id: "Tonga" },
    { name: "Trinidad and Tobago", id: "Trinidad and Tobago" },
    { name: "Tunisia", id: "Tunisia" },
    { name: "Turkey", id: "Turkey" },
    { name: "Turkmenistan", id: "Turkmenistan" },
    { name: "Turks and Caicos Islands", id: "Turks and Caicos Islands" },
    { name: "Tuvalu", id: "Tuvalu" },
    { name: "Uganda", id: "Uganda" },
    { name: "Ukraine", id: "Ukraine" },
    { name: "United Arab Emirates", id: "United Arab Emirates" },
    { name: "United Kingdom", id: "United Kingdom" },
    { name: "United States", id: "United States" },
    {
      name: "United States Minor Outlying Islands",
      id: "United States Minor Outlying Islands",
    },
    { name: "Uruguay", id: "Uruguay" },
    { name: "Uzbekistan", id: "Uzbekistan" },
    { name: "Vanuatu", id: "Vanuatu" },
    { name: "Venezuela", id: "Venezuela" },
    { name: "Viet Nam", id: "Viet Nam" },
    { name: "Virgin Islands, British", id: "Virgin Islands, British" },
    { name: "Virgin Islands, U.S.", id: "Virgin Islands, U.S." },
    { name: "Wallis and Futuna", id: "Wallis and Futuna" },
    { name: "Western Sahara", id: "Western Sahara" },
    { name: "Yemen", id: "Yemen" },
    { name: "Zambia", id: "Zambia" },
    { name: "Zimbabwe", id: "Zimbabwe" },
  ];
  startYear: any;
  lastYear: any;
  yearValidate: boolean = true;
  googleAddress: any;
  latitude: any;
  longitude: any;
  isValid: boolean = true;
  descLengthMin: boolean = false;
  descLength: boolean = false;
  minLengthFlag: boolean = false;
  editorConfig: AngularEditorConfig = {
    editable: true,
    toolbarHiddenButtons: [
      [
        "undo",
        "redo",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "justifyLeft",
        "justifyCenter",
        "justifyRight",
        "justifyFull",
        "indent",
        "outdent",
        "heading",
        "fontName",
      ],
      [
        "fontSize",
        "textColor",
        "backgroundColor",
        "customClasses",
        "link",
        "unlink",
        "insertImage",
        "insertVideo",
        "insertHorizontalRule",
        "removeFormat",
        "toggleEditorMode",
      ],
    ],
  };
  totalPercent:number=100;
  isTotal:boolean=false;
  practiceAreaList:any=[];
  professionalassociations:any=[];
  honorsandawards:any=[];
  Publishdetails:any=[];
  conferencedetail:any=[];
  baradmission:any=[];
    
  constructor(
    public usersService: UsersService,
    public router: Router,
    public authService: AuthService
  ) {
 
  }

  ngOnInit() {
    $("#editOverviewForm").parsley();
    $("#editCasesForm").parsley();
    $("#editExpCertForm").parsley();
    $("#editEduLangForm").parsley();
    $("#editFirmsForm").parsley();
    $("#editCostForm").parsley();

    this.usersService.getLawyerDetails(undefined)
    this.usersService.getPracticeArea();
    this.usersService.getLanguages();
    this.usersService.getYears();
    this.getPracticArea();
  
   

    var doc_width = $(window).width();
    if (doc_width < 768) {
      $(".menu-section li a, .responsive-show-section").on(
        "click",
        function () {
          $("body").css({
            margin: "0",
            "overflow-x": "auto",
            position: "relative",
          });
          $("#mySidenav").css("transform", "translateX(-250px)");
        }
      );
      $(".menu-section li a.free-q-a-li-a").on("click", function () {
        $("body").css({
          "margin-left": "250px",
          "overflow-x": "auto",
          position: "relative",
        });
        $("#mySidenav").css("transform", "translateX(0px)");
        $(".sub-menu-section-block").slideToggle("slow");
      });
    }

    function applyFormInputScript() {
      $("input, textarea, ng-select").each(function () {
        // $('input, textarea, ng-select').on('focus', function () {
        //     $(this).parent('.form-group').addClass('active');
        // });
        // $('label').on('click', function () {
        //     $(this).parent('.form-group').addClass('active');
        //     $(this).parent().parent().siblings().removeClass('active');
        //     $(this).sibling('ng-select').focus();
        // });
        // $(this).on('blur', function () {
        //     if ($(this).val().length == 0) {
        //         $(this).parent('.form-group').removeClass('active');
        //     }
        // });
        if ($(this).val() != "")
          $(this).parent(".form-group").addClass("active");
      });
    }
    $(document).ready(function () {
      applyFormInputScript();
    });

    
    var room1 = 1;
    var room2 = 1;
    var room3 = 1;
    var room4 = 1;
    var room5 = 1;
    var room6 = 1;
    var room7 = 1;
    
    const component = this;

    $("#dob").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true,
    });
    $("#dob").on("changeDate", function () {
      var result1 = $(this).change(function (date) {
        $("#dob").submit(date);
      });
      component.birthDate = result1.val();
    });
  }
   ngAfterViewInit(): void {
    console.log("ngAfterViewInit Edir Form Data", this.usersService.editformdata);
     
   }
  //** charu Start */
  onPercentageChange(){
   
    var total=0;
    if(this.usersService.practiceArea.length>0){
     this.usersService.practiceArea.forEach(element => {
       total+=Number(element.practice_area_percentage)
     });
     if(total>this.totalPercent){
       this.isTotal=true;
       
     }else{
       this.isTotal=false;
     }
    }
  }
  BackButtonClick=(type:number)=>{
    switch (type) {  
      case 1:  
      $(".add-lawyer-form-main").removeClass("valuable-cases-main");
       break;  
      case 2:  
      $(".add-lawyer-form-main").removeClass("work-experience-main");
       break; 
       case 3:  
       $(".add-lawyer-form-main").removeClass("education-main");
       break; 
       case 4:  
       $(".add-lawyer-form-main").removeClass("cost-main");
       break; 
       case 5:  
       $(".add-lawyer-form-main").removeClass("law-firms-main");
       break; 
      default:  
      $(".add-lawyer-form-main").removeClass("valuable-cases-main");  
     }  

  }
  getPracticArea(){
    this.usersService.practic_area().subscribe((res:any)=>{
      this.practiceAreaList=res;
      console.log("getpractic_area res>>>>",this.practiceAreaList);
     
    })
  }
  //** charu End*/
  imageChangedEvent;

  onFileUpload(event: any): void {
    this.imageChangedEvent = event;
    $("#cropmodal").modal("show");
  }



  croppedImage;
  imageCropped(event) {
    this.imgURL = event.base64;
    this.currentFileUpload = event.base64;
    console.log("Aaaasddd44", this.imgURL);
  }

  onAddOverview(addOverviewForm:NgForm) {
    debugger;
    if(this.isTotal){
      this.ifError=true;
      setTimeout(()=> {
        this.ifError=false;
        
    }, 2000); 
      return false;
    }
   

    var instance = $("#editOverviewForm").parsley();
    console.log(instance.isValid());
        this.usersService.practiceArea;//charu
          if (this.imgURL) {
      addOverviewForm.value.profile_image = this.imgURL;
    }

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaayyy", addOverviewForm.value);
    this.overviewForm = addOverviewForm.value;
    this.overviewForm.practiceArea= _.toArray(  this.overviewForm.practiceArea);
    if (this.overviewForm.description.length < 50) {
      this.descLengthMin = true;
      this.descLength = true;
      this.minLengthFlag = true;
    } else {
      this.descLengthMin = false;
    }
    if (this.overviewForm.description.length > 1000) {
      this.descLength = true;
      this.descLengthMin = true;
      this.minLengthFlag = false;
    } else {
      this.descLength = false;
    }
    if (addOverviewForm.valid && (!this.descLength || !this.descLengthMin)) {
      $(".add-lawyer-form-main").addClass("valuable-cases-main");
    } else {
      console.log("Invalid");
    }
  }


  onAddValuableCase(editCasesForm) {
   
    this.caseForm = editCasesForm.value;
    var instance = $("#editCasesForm").parsley();
    console.log(instance.isValid());
    console.log(this.caseForm);
    let valid = true;
    this.usersService.lawyerCase.forEach((cases) => {
      if (
        cases.title === "" ||
        cases.description === "" ||
        cases.from_year == "" ||
        cases.to_year == ""
      )
        valid = false;
      if (cases.description.length < 50) {
        cases.descLengthMinCase = true;
        cases.descLengthCase = true;
        cases.minLengthFlagCase = true;
        valid = false;
      } else {
        cases.descLengthMinCase = false;
      }
    });

    if (valid && instance.isValid() && this.yearValidate) {
      this.caseForm = this.usersService.lawyerCase;
      console.log(this.caseForm);
      $(".add-lawyer-form-main").addClass("work-experience-main");
    } else {
      console.log("Invalid");
    }
  }

  onAddExpr(editExpCertForm) {
    let valid = true;
    var instance = $("#editExpCertForm").parsley();
    console.log(instance.isValid());
    this.usersService.lawyerExperience.forEach((cases) => {
      if (
        cases.title === "" ||
        cases.experience_at === "" ||
        cases.from_year == "" ||
        cases.to_year == ""
      )
        valid = false;
    });
    this.usersService.lawyerAwards.forEach((cert) => {
      if (cert.award_name === "" || cert.year === "") valid = false;
    });
    console.log(this.expCertForm && this.yearValidate);
    if (valid && instance.isValid()) {
      this.expCertForm["experience"] = this.usersService.lawyerExperience;
      console.log(this.expCertForm["experience"]);
      this.expCertForm["certificates"] = this.usersService.lawyerAwards;
      console.log(this.expCertForm["certificates"]);
      $(".add-lawyer-form-main").addClass("education-main");
    } else {
      console.log("Invalid");
    }
  }

  onaddEducation(editEduLangForm:NgForm) {
    let valid = true;
    var instance = $("#editEduLangForm").parsley();
    console.log(instance.isValid());
    editEduLangForm.value.languageAssociate= _.toArray(editEduLangForm.value.languageAssociate)
    editEduLangForm.value.professionalassociation= _.toArray(editEduLangForm.value.professionalassociation)
    editEduLangForm.value.publication= _.toArray(editEduLangForm.value.publication)
    editEduLangForm.value.conferencedetails= _.toArray(editEduLangForm.value.conferencedetails)
    editEduLangForm.value.baradmission= _.toArray(editEduLangForm.value.baradmission)
    editEduLangForm.value.educations=  this.usersService.lawyerAcademics;
    this.usersService.lawyerAcademics.forEach((cases) => {
      if (
        cases.university === "" ||
        cases.degree === "" ||
        cases.starting_year == "" ||
        cases.passing_year == ""
      )
        valid = false;
    });
    this.usersService.lawyerLanguages.forEach((cert) => {
      if (cert.language_id === "" || cert.proficiency === "") valid = false;
    });
    if (editEduLangForm.valid && instance.isValid() && this.yearValidate) {
          this.eduLangForm=editEduLangForm.value;
     
      $(".add-lawyer-form-main").addClass("law-firms-main");
    } else {
      console.log("Invalid");
    }
  }

  onAddLawFirms(editFirmsForm) {
   
    let valid = true;
    var instance = $("#editFirmsForm").parsley();
    console.log(instance.isValid());
    this.usersService.lawyerFirm.forEach((firms) => {
      if (
        firms.firm_name === "" ||
        firms.firm_address === "" ||
        firms.firm_city === "" ||
        firms.firm_country === "" ||
        firms.mobile_number == "" ||
        firms.fax == ""
      ) {
        valid = false;
      }
    });
    if (valid && instance.isValid() && this.isValid && editFirmsForm.valid) {
      this.firmForm = this.usersService.lawyerFirm;
      console.log(this.firmForm);
      $(".add-lawyer-form-main").addClass("cost-main");
    } else {
      console.log("Invalid");
    }
  }

  onSubmitLawyer(editCostForm) {
   debugger;
    this.costForm = editCostForm.value;
    var instance = $("#editCostForm").parsley();
    console.log(instance.isValid());
    console.log(this.overviewForm, "<<<<<<<overviewForm");
    // console.log(this.caseForm);
    // console.log(this.expCertForm);
    // console.log(this.eduLangForm);
    // console.log(this.firmForm);
    console.log(this.costForm);

    if (editCostForm.valid && instance.isValid()) {
      this.loading = true;

      this.usersService
        .updateLawyer(
          this.overviewForm,
          this.caseForm,
          this.expCertForm,
          this.eduLangForm,
          this.firmForm,
          this.costForm,
          this.currentFileUpload
        )
        .subscribe((res) => {
          this.loginMessage = res["status"];
          this.loading = false;
          if (this.loginMessage == "SUCCESS") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Update Lawyer Successfully",
              showConfirmButton: false,
              timer: 1000,
            });
            this.router.navigate(["/lawyer-directory/listing-details"]);
          } else {
            console.log("UnSUCCESS");
          }
        });
    } else {
      console.log("Invalid");
    }
  }

  fromYear(fromYear) {
    console.log(fromYear);
    this.startYear = fromYear;
    if (this.startYear > this.lastYear) {
      this.yearValidate = false;
    } else {
      this.yearValidate = true;
    }
  }

  toYear(toYear) {
    console.log(toYear);
    this.lastYear = toYear;
    if (this.startYear > this.lastYear) {
      this.yearValidate = false;
    } else {
      this.yearValidate = true;
    }
  }
  //charu
s
  addPracticeArea() {
    debugger;
    this.usersService.practiceArea.push({ practice_area_id: "",practice_area_name: "",practice_area_percentage: "",});
  }
  addprofessionalassociations() {
    this.usersService.lawyerAssociation.push({name: "",tile: "",role:""});
  }
  removeprofessionalassociations(index: number) {
    this.usersService.lawyerAssociation.splice(index, 1);
  }

 
  addPublishdetails() {
    this.usersService.lawyerpublications.push({name: "",reference: "",date:""});
  }
  removePublishdetails(index: number) {
    this.usersService.lawyerpublications.splice(index, 1);
  }
  
  addconferencedetail() {
    this.usersService.lawyerConference.push({name: "",agenda: "",date:""});
  }
  removeconferencedetail(index: number) {
    this.usersService.lawyerConference.splice(index, 1);
  }
  
  addbaradmission() { 
    this.usersService.lawyerBarAdmission.push({statename: "",status: "",date:""});
  }
  removebaradmission(index: number) {
    this.usersService.lawyerBarAdmission.splice(index, 1);
  }
  //charu end
  removePracticeArea(index: number) {
   
    this.usersService.practiceArea.splice(index, 1);
  }
  addCases() {
    this.usersService.lawyerCase.push({
      title: "",
      from_year: "",
      to_year: "",
      description: "",
    });
  }
  removeCases(index: number) {
    this.usersService.lawyerCase.splice(index, 1);
  }
  addExperiences() {
    this.usersService.lawyerExperience.push({
      title: "",
      experience_at: "",
      from_year: "",
      to_year: "",
    });
  }

  removeExperiences(index: number) {
    this.usersService.lawyerExperience.splice(index, 1);
  }

  addCertificates() {
    this.usersService.lawyerAwards.push({ award_name: "", year: "" });
  }
  removeCertificates(index: number) {
    this.usersService.lawyerAwards.splice(index, 1);
  }

  addEducations() {
    this.usersService.lawyerAcademics.push({
      university: "",
      degree: "",
      starting_year: "",
      passing_year: "",
    });
  }
  removeEducations(index: number) {
    this.usersService.lawyerAcademics.splice(index, 1);
  }
  addLanguages() {
    this.usersService.lawyerLanguages.push({
      language_id: "",
      proficiency: "",
    });
  }
  removeLanguages(index: number) {
    this.usersService.lawyerLanguages.splice(index, 1);
  }
  addFirms() {
    this.usersService.lawyerFirm.push({
      firm_name: "",
      firm_address: "",
      city: "",
      country: "",
      mobile_number: "",
      fax: "",
      latitude: "",
      longitude: "",
    });
  }
  removeFirms(index: number) {
    this.usersService.lawyerFirm.splice(index, 1);
  }

  public handleAddressChange(address: any, index: number) {
    this.usersService.lawyerFirm[index].city = "";
    this.googleAddress = address.formatted_address;
    this.isValid = true;
    console.log(address);
    this.usersService.lawyerFirm[index].firm_address = this.googleAddress;
    this.usersService.lawyerFirm[
      index
    ].latitude = address.geometry.location.lat();
    this.usersService.lawyerFirm[
      index
    ].longitude = address.geometry.location.lng();
    if (address.address_components) {
      for (let i = 0; i < address.address_components.length; i++) {
        if (address.address_components[i].types[0] == "country") {
          console.log(
            "country===================",
            address.address_components[i].long_name
          );
          this.usersService.lawyerFirm[index].country =
            address.address_components[i].long_name;
        }

        if (address.address_components[i].types[0] == "locality") {
          console.log(
            "aaaaacity===================",
            address.address_components[i].long_name
          );
          this.usersService.lawyerFirm[index].city =
            address.address_components[i].long_name;
        }
        if (
          address.address_components[i].types[0] ==
            "administrative_area_level_1" &&
          !this.usersService.lawyerFirm[index].city
        ) {
          console.log(
            "aaaaacity===================",
            address.address_components[i].long_name
          );
          this.usersService.lawyerFirm[index].city =
            address.address_components[i].long_name;
        }
      }
    }
  }

  desc(value) {
    console.log(value);
  }

  onChangeAddress(index, latitude, longitude) {
    console.log(latitude);
    console.log(longitude);
    if (!longitude && !latitude) {
      if (this.usersService.lawyerFirm[index]) {
        setTimeout(() => {
          this.usersService.lawyerFirm[index].firm_address = "";
        }, 500);
      }
    } else {
    }
  }

  setLatLongNull(index) {
    if (this.usersService.lawyerFirm[index]) {
      setTimeout(() => {
        this.usersService.lawyerFirm[index].latitude = undefined;
        this.usersService.lawyerFirm[index].longitude = undefined;
        this.isValid = false;
      }, 500);
    }
  }
}
