import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from '../../core/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AngularEditorConfig } from '@kolkov/angular-editor';
declare let $: any;
declare let jQuery: any;
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-add-lawyer',
    templateUrl: './add-lawyer.component.html',
    styleUrls: ['./add-lawyer.component.css']
})

export class AddLawyerComponent implements OnInit {
//Charu Start
    professionalassociations = [
        { association_name: '', title: '', role:'' },
      ];
      honorsandawards = [
        { name: '', title: '', role:'' },
      ];
     
      Publishdetails = [
        {publication_name: "",link: "",retrival_date:""}
      ];
      conferencedetail = [
        { conference_name: '', agenda: '', date:'' },
        ];
      
       BarAdmission:any=[];
      
      //**charu End */
    // use to store gender value
    selectedGender: any;
    selectedExprience: any;
    totalPercent:number=100;
    isTotal:boolean=false;
    practiceAreaList:any=[];

    currentFileUpload = null;
    imgURL;
    divtest1;
    birthDate;
    loginMessage;
    message;
    public loading = false;
    overviewForm: any;
    caseForm: any = [];
    expCertForm: any = {};
    eduLangForm: any ={};
    firmForm: any = [];
    costForm: any = [];
    googleAddress;
    latitude;
    longitude;
    htmlContent;
    dropdownSettings = {
        singleSelection: false,
        idField: '_id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: true
    };

    dropdownSettings1 = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
    };

 
    gender1 = [
        { "name": "male", "id": "male" },
        { "name": "female", "id": "female" },
    ];
    pro_bona_services = [
        { "name": "Yes", "id": "yes" },
        { "name": "No", "id": "no" },
    ];
    
    virtual_conversation = [
        { "name": "Yes", "id": "yes" },
        { "name": "No", "id": "no" },
    ];
    
    open_for_business = [
        { "name": "Yes", "id": "yes" },
        { "name": "No", "id": "no" },
    ];

    exprience = [
        { "name": "1", "id": "1" }, 
        { "name": "2", "id": "2" },
        { "name": "3", "id": "3" }, 
        { "name": "4", "id": "4" },
        { "name": "5", "id": "5" }, 
        { "name": "6", "id": "6" },
        { "name": "7", "id": "7" }, 
        { "name": "8", "id": "8" },
        { "name": "9", "id": "9" }, 
        { "name": "10", "id": "10" },
        { "name": "10+", "id": "10+" }, 
       
        
    ];

    options1 = [
        { "name": "2017", "id": "2017" },
        { "name": "2018", "id": "2018" },
        { "name": "2019", "id": "2019" },
    ];

    proficiency1 = [
        { "name": "Low", "id": "low" },
        { "name": "Medium", "id": "medium" },
        { "name": "High", "id": "high" },
    ];

    hourlyrates1 = [
        { "name": "Above 20000", "id": "20000" },
        { "name": "Above 10000", "id": "10000" },
        { "name": "Above 5000", "id": "5000" },
    ]

    consultation1 = [
        { "name": "1 hr", "id": "1" },
        { "name": "2 hr", "id": "2" },
        { "name": "3 hr", "id": "3" },
    ]

    consultationfees1 = [
        { "name": "1000", "id": "1000" },
        { "name": "2000", "id": "2000" },
        { "name": "3000", "id": "3000" },
    ]

    paymentmethods = [
        { "name": "Online", "id": "online" },
        { "name": "Cash", "id": "cash" },
        { "name": "Card", "id": "card" },
    ]

    countryList = [
        { "name": "Afghanistan", "id": "Afghanistan" },
        { "name": "land Islands", "id": "land Islands" },
        { "name": "Albania", "id": "Albania" },
        { "name": "Algeria", "id": "Algeria" },
        { "name": "American Samoa", "id": "American Samoa" },
        { "name": "AndorrA", "id": "AndorrA" },
        { "name": "Angola", "id": "Angola" },
        { "name": "Anguilla", "id": "Anguilla" },
        { "name": "Antarctica", "id": "Antarctica" },
        { "name": "Antigua and Barbuda", "id": "Antigua and Barbuda" },
        { "name": "Argentina", "id": "Argentina" },
        { "name": "Armenia", "id": "Armenia" },
        { "name": "Aruba", "id": "Aruba" },
        { "name": "Australia", "id": "Australia" },
        { "name": "Austria", "id": "Austria" },
        { "name": "Azerbaijan", "id": "Azerbaijan" },
        { "name": "Bahamas", "id": "Bahamas" },
        { "name": "Bahrain", "id": "Bahrain" },
        { "name": "Bangladesh", "id": "Bangladesh" },
        { "name": "Barbados", "id": "Barbados" },
        { "name": "Belarus", "id": "Belarus" },
        { "name": "Belgium", "id": "Belgium" },
        { "name": "Belize", "id": "Belize" },
        { "name": "Benin", "id": "Benin" },
        { "name": "Bermuda", "id": "Bermuda" },
        { "name": "Bhutan", "id": "Bhutan" },
        { "name": "Bolivia", "id": "Bolivia" },
        { "name": "Bosnia and Herzegovina", "id": "Bosnia and Herzegovina" },
        { "name": "Botswana", "id": "Botswana" },
        { "name": "Bouvet Island", "id": "Bouvet Island" },
        { "name": "Brazil", "id": "Brazil" },
        { "name": "British Indian Ocean Territory", "id": "British Indian Ocean Territory" },
        { "name": "Brunei Darussalam", "id": "Brunei Darussalam" },
        { "name": "Bulgaria", "id": "Bulgaria" },
        { "name": "Burkina Faso", "id": "Burkina Faso" },
        { "name": "Burundi", "id": "Burundi" },
        { "name": "Cambodia", "id": "Cambodia" },
        { "name": "Cameroon", "id": "Cameroon" },
        { "name": "Canada", "id": "Canada" },
        { "name": "Cape Verde", "id": "Cape Verde" },
        { "name": "Cayman Islands", "id": "Cayman Islands" },
        { "name": "Central African Republic", "id": "Central African Republic" },
        { "name": "Chad", "id": "Chad" },
        { "name": "Chile", "id": "Chile" },
        { "name": "China", "id": "China" },
        { "name": "Christmas Island", "id": "Christmas Island" },
        { "name": "Cocos (Keeling) Islands", "id": "Cocos (Keeling) Islands" },
        { "name": "Colombia", "id": "Colombia" },
        { "name": "Comoros", "id": "Comoros" },
        { "name": "Congo", "id": "Congo" },
        { "name": "Congo, The Democratic Republic of the", "id": "Congo, The Democratic Republic of the" },
        { "name": "Cook Islands", "id": "Cook Islands" },
        { "name": "Costa Rica", "id": "Costa Rica" },
        { "name": "Cote D\"Ivoire", "id": "Cote D\"Ivoire" },
        { "name": "Croatia", "id": "Croatia" },
        { "name": "Cuba", "id": "Cuba" },
        { "name": "Cyprus", "id": "Cyprus" },
        { "name": "Czech Republic", "id": "Czech Republic" },
        { "name": "Denmark", "id": "Denmark" },
        { "name": "Djibouti", "id": "Djibouti" },
        { "name": "Dominica", "id": "Dominica" },
        { "name": "Dominican Republic", "id": "Dominican Republic" },
        { "name": "Ecuador", "id": "Ecuador" },
        { "name": "Egypt", "id": "Egypt" },
        { "name": "El Salvador", "id": "El Salvador" },
        { "name": "Equatorial Guinea", "id": "Equatorial Guinea" },
        { "name": "Eritrea", "id": "Eritrea" },
        { "name": "Estonia", "id": "Estonia" },
        { "name": "Ethiopia", "id": "Ethiopia" },
        { "name": "Falkland Islands (Malvinas)", "id": "Falkland Islands (Malvinas)" },
        { "name": "Faroe Islands", "id": "Faroe Islands" },
        { "name": "Fiji", "id": "Fiji" },
        { "name": "Finland", "id": "Finland" },
        { "name": "France", "id": "France" },
        { "name": "French Guiana", "id": "French Guiana" },
        { "name": "French Polynesia", "id": "French Polynesia" },
        { "name": "French Southern Territories", "id": "French Southern Territories" },
        { "name": "Gabon", "id": "Gabon" },
        { "name": "Gambia", "id": "Gambia" },
        { "name": "Georgia", "id": "Georgia" },
        { "name": "Germany", "id": "Germany" },
        { "name": "Ghana", "id": "Ghana" },
        { "name": "Gibraltar", "id": "Gibraltar" },
        { "name": "Greece", "id": "Greece" },
        { "name": "Greenland", "id": "Greenland" },
        { "name": "Grenada", "id": "Grenada" },
        { "name": "Guadeloupe", "id": "Guadeloupe" },
        { "name": "Guam", "id": "Guam" },
        { "name": "Guatemala", "id": "Guatemala" },
        { "name": "Guernsey", "id": "Guernsey" },
        { "name": "Guinea", "id": "Guinea" },
        { "name": "Guinea-Bissau", "id": "Guinea-Bissau" },
        { "name": "Guyana", "id": "Guyana" },
        { "name": "Haiti", "id": "Haiti" },
        { "name": "Heard Island and Mcdonald Islands", "id": "Heard Island and Mcdonald Islands" },
        { "name": "Holy See (Vatican City State)", "id": "Holy See (Vatican City State)" },
        { "name": "Honduras", "id": "Honduras" },
        { "name": "Hong Kong", "id": "Hong Kong" },
        { "name": "Hungary", "id": "Hungary" },
        { "name": "Iceland", "id": "Iceland" },
        { "name": "India", "id": "India" },
        { "name": "Indonesia", "id": "Indonesia" },
        { "name": "Iran, Islamic Republic Of", "id": "Iran, Islamic Republic Of" },
        { "name": "Iraq", "id": "Iraq" },
        { "name": "Ireland", "id": "Ireland" },
        { "name": "Isle of Man", "id": "Isle of Man" },
        { "name": "Israel", "id": "Israel" },
        { "name": "Italy", "id": "Italy" },
        { "name": "Jamaica", "id": "Jamaica" },
        { "name": "Japan", "id": "Japan" },
        { "name": "Jersey", "id": "Jersey" },
        { "name": "Jordan", "id": "Jordan" },
        { "name": "Kazakhstan", "id": "Kazakhstan" },
        { "name": "Kenya", "id": "Kenya" },
        { "name": "Kiribati", "id": "Kiribati" },
        { "name": "Korea, Democratic People\"S Republic of", "id": "Korea, Democratic People\"S Republic of" },
        { "name": "Korea, Republic of", "id": "Korea, Republic of" },
        { "name": "Kuwait", "id": "Kuwait" },
        { "name": "Kyrgyzstan", "id": "Kyrgyzstan" },
        { "name": "Lao People\"S Democratic Republic", "id": "Lao People\"S Democratic Republic" },
        { "name": "Latvia", "id": "Latvia" },
        { "name": "Lebanon", "id": "Lebanon" },
        { "name": "Lesotho", "id": "Lesotho" },
        { "name": "Liberia", "id": "Liberia" },
        { "name": "Libyan Arab Jamahiriya", "id": "Libyan Arab Jamahiriya" },
        { "name": "Liechtenstein", "id": "Liechtenstein" },
        { "name": "Lithuania", "id": "Lithuania" },
        { "name": "Luxembourg", "id": "Luxembourg" },
        { "name": "Macao", "id": "Macao" },
        { "name": "Macedonia, The Former Yugoslav Republic of", "id": "Macedonia, The Former Yugoslav Republic of" },
        { "name": "Madagascar", "id": "Madagascar" },
        { "name": "Malawi", "id": "Malawi" },
        { "name": "Malaysia", "id": "Malaysia" },
        { "name": "Maldives", "id": "Maldives" },
        { "name": "Mali", "id": "Mali" },
        { "name": "Malta", "id": "Malta" },
        { "name": "Marshall Islands", "id": "Marshall Islands" },
        { "name": "Martinique", "id": "Martinique" },
        { "name": "Mauritania", "id": "Mauritania" },
        { "name": "Mauritius", "id": "Mauritius" },
        { "name": "Mayotte", "id": "Mayotte" },
        { "name": "Mexico", "id": "Mexico" },
        { "name": "Micronesia, Federated States of", "id": "Micronesia, Federated States of" },
        { "name": "Moldova, Republic of", "id": "Moldova, Republic of" },
        { "name": "Monaco", "id": "Monaco" },
        { "name": "Mongolia", "id": "Mongolia" },
        { "name": "Montenegro", "id": "Montenegro" },
        { "name": "Montserrat", "id": "Montserrat" },
        { "name": "Morocco", "id": "Morocco" },
        { "name": "Mozambique", "id": "Mozambique" },
        { "name": "Myanmar", "id": "Myanmar" },
        { "name": "Namibia", "id": "Namibia" },
        { "name": "Nauru", "id": "Nauru" },
        { "name": "Nepal", "id": "Nepal" },
        { "name": "Netherlands", "id": "Netherlands" },
        { "name": "Netherlands Antilles", "id": "Netherlands Antilles" },
        { "name": "New Caledonia", "id": "New Caledonia" },
        { "name": "New Zealand", "id": "New Zealand" },
        { "name": "Nicaragua", "id": "Nicaragua" },
        { "name": "Niger", "id": "Niger" },
        { "name": "Nigeria", "id": "Nigeria" },
        { "name": "Niue", "id": "Niue" },
        { "name": "Norfolk Island", "id": "Norfolk Island" },
        { "name": "Northern Mariana Islands", "id": "Northern Mariana Islands" },
        { "name": "Norway", "id": "Norway" },
        { "name": "Oman", "id": "Oman" },
        { "name": "Pakistan", "id": "Pakistan" },
        { "name": "Palau", "id": "Palau" },
        { "name": "Palestinian Territory, Occupied", "id": "Palestinian Territory, Occupied" },
        { "name": "Panama", "id": "Panama" },
        { "name": "Papua New Guinea", "id": "Papua New Guinea" },
        { "name": "Paraguay", "id": "Paraguay" },
        { "name": "Peru", "id": "Peru" },
        { "name": "Philippines", "id": "Philippines" },
        { "name": "Pitcairn", "id": "Pitcairn" },
        { "name": "Poland", "id": "Poland" },
        { "name": "Portugal", "id": "Portugal" },
        { "name": "Puerto Rico", "id": "Puerto Rico" },
        { "name": "Qatar", "id": "Qatar" },
        { "name": "Reunion", "id": "Reunion" },
        { "name": "Romania", "id": "Romania" },
        { "name": "Russian Federation", "id": "Russian Federation" },
        { "name": "RWANDA", "id": "RWANDA" },
        { "name": "Saint Helena", "id": "Saint Helena" },
        { "name": "Saint Kitts and Nevis", "id": "Saint Kitts and Nevis" },
        { "name": "Saint Lucia", "id": "Saint Lucia" },
        { "name": "Saint Pierre and Miquelon", "id": "Saint Pierre and Miquelon" },
        { "name": "Saint Vincent and the Grenadines", "id": "Saint Vincent and the Grenadines" },
        { "name": "Samoa", "id": "Samoa" },
        { "name": "San Marino", "id": "San Marino" },
        { "name": "Sao Tome and Principe", "id": "Sao Tome and Principe" },
        { "name": "Saudi Arabia", "id": "Saudi Arabia" },
        { "name": "Senegal", "id": "Senegal" },
        { "name": "Serbia", "id": "Serbia" },
        { "name": "Seychelles", "id": "Seychelles" },
        { "name": "Sierra Leone", "id": "Sierra Leone" },
        { "name": "Singapore", "id": "Singapore" },
        { "name": "Slovakia", "id": "Slovakia" },
        { "name": "Slovenia", "id": "Slovenia" },
        { "name": "Solomon Islands", "id": "Solomon Islands" },
        { "name": "Somalia", "id": "Somalia" },
        { "name": "South Africa", "id": "South Africa" },
        { "name": "South Georgia and the South Sandwich Islands", "id": "South Georgia and the South Sandwich Islands" },
        { "name": "Spain", "id": "Spain" },
        { "name": "Sri Lanka", "id": "Sri Lanka" },
        { "name": "Sudan", "id": "Sudan" },
        { "name": "Suriname", "id": "Suriname" },
        { "name": "Svalbard and Jan Mayen", "id": "Svalbard and Jan Mayen" },
        { "name": "Swaziland", "id": "Swaziland" },
        { "name": "Sweden", "id": "Sweden" },
        { "name": "Switzerland", "id": "Switzerland" },
        { "name": "Syrian Arab Republic", "id": "Syrian Arab Republic" },
        { "name": "Taiwan, Province of China", "id": "Taiwan, Province of China" },
        { "name": "Tajikistan", "id": "Tajikistan" },
        { "name": "Tanzania, United Republic of", "id": "Tanzania, United Republic of" },
        { "name": "Thailand", "id": "Thailand" },
        { "name": "Timor-Leste", "id": "Timor-Leste" },
        { "name": "Togo", "id": "Togo" },
        { "name": "Tokelau", "id": "Tokelau" },
        { "name": "Tonga", "id": "Tonga" },
        { "name": "Trinidad and Tobago", "id": "Trinidad and Tobago" },
        { "name": "Tunisia", "id": "Tunisia" },
        { "name": "Turkey", "id": "Turkey" },
        { "name": "Turkmenistan", "id": "Turkmenistan" },
        { "name": "Turks and Caicos Islands", "id": "Turks and Caicos Islands" },
        { "name": "Tuvalu", "id": "Tuvalu" },
        { "name": "Uganda", "id": "Uganda" },
        { "name": "Ukraine", "id": "Ukraine" },
        { "name": "United Arab Emirates", "id": "United Arab Emirates" },
        { "name": "United Kingdom", "id": "United Kingdom" },
        { "name": "United States", "id": "United States" },
        { "name": "United States Minor Outlying Islands", "id": "United States Minor Outlying Islands" },
        { "name": "Uruguay", "id": "Uruguay" },
        { "name": "Uzbekistan", "id": "Uzbekistan" },
        { "name": "Vanuatu", "id": "Vanuatu" },
        { "name": "Venezuela", "id": "Venezuela" },
        { "name": "Viet Nam", "id": "Viet Nam" },
        { "name": "Virgin Islands, British", "id": "Virgin Islands, British" },
        { "name": "Virgin Islands, U.S.", "id": "Virgin Islands, U.S." },
        { "name": "Wallis and Futuna", "id": "Wallis and Futuna" },
        { "name": "Western Sahara", "id": "Western Sahara" },
        { "name": "Yemen", "id": "Yemen" },
        { "name": "Zambia", "id": "Zambia" },
        { "name": "Zimbabwe", "id": "Zimbabwe" }
    ]
    startYear: any;
    yearValidate: boolean = true;
    lastYear: any;

    valuableCases = [
        { "title": "", "description": "", "from_year": "", "to_year": "", "descLengthMinCase": false },
    ];

    workExperieces = [
        { "title": "", "experience_at": "", "from_year": "", "to_year": "" }
    ];

    certificates = [
        { "award_name": "", "year": "" }
    ];

    educations = [
        { "university": "", "degree": "", "starting_year": "", "passing_year": "" }
    ];

    languages:any = [];

    lawfirms = [
        { "firm_name": "", "firm_address": "", "city": "", "country": "", "mobile_number": "", "fax": "", "latitude": "", "longitude": "" }
    ];

    showPasswordField: boolean = false;
    responce: any;
    descLength: boolean = false;
    hourlyLength: boolean;
    descLengthMin: boolean = false;
    minLengthFlag: boolean = false;
    stateList: any=[];//charu
    background_check: boolean=false;
    public handleAddressChange(address: any, index: number) {
        this.lawfirms[index].city = "";
        this.googleAddress = address.formatted_address
       // console.log(address)
        this.lawfirms[index].firm_address = this.googleAddress;
        this.lawfirms[index].latitude = address.geometry.location.lat();
        this.lawfirms[index].longitude = address.geometry.location.lng();
       
        if(address.address_components){
            for (let i = 0; i < address.address_components.length; i++) {
                if(address.address_components[i].types[0] == "country"){
                   // console.log("country===================",address.address_components[i].long_name);
                    this.lawfirms[index].country = address.address_components[i].long_name
                     }
                if(address.address_components[i].types[0] == "locality"){
                  //  console.log("aaaaacity===================",address.address_components[i].long_name);
                    this.lawfirms[index].city = address.address_components[i].long_name
                     }
                if(address.address_components[i].types[0] == "administrative_area_level_1" && !this.lawfirms[index].city){
             //  console.log("aaaaacity===================",address.address_components[i].long_name);
               this.lawfirms[index].city = address.address_components[i].long_name
                }
              
                
            }
        }
      //  console.log(" Add lawer lawfirms", this.lawfirms);
    }

    editorConfig: AngularEditorConfig = {
        editable: true,
        toolbarHiddenButtons: [
            [
              'undo',
              'redo',
              'underline',
              'strikeThrough',
              'subscript',
              'superscript',
              'justifyLeft',
              'justifyCenter',
              'justifyRight',
              'justifyFull',
              'indent',
              'outdent',
              'heading',
              'fontName'
            ],
            [
              'fontSize',
              'textColor',
              'backgroundColor',
              'customClasses',
              'link',
              'unlink',
              'insertImage',
              'insertVideo',
              'insertHorizontalRule',
              'removeFormat',
              'toggleEditorMode'
            ]
          ]
       
    };

    constructor(
        public usersService: UsersService,
        public router: Router,
        private http: HttpClient,
        public authService: AuthService
    ) {
        this.addPracticeArea();
        this.addbaradmission();
        console.log('userid', localStorage.getItem('user_id'));

        if (localStorage.getItem('user_id') === null || localStorage.getItem('user_id') === undefined || localStorage.getItem('user_id') === 'undefined') {
            this.showPasswordField = true;
        }
        console.log(this.showPasswordField);

    }

    ngOnInit() {   
  this.getStates();
         
        // $(".add-lawyer-form-main").addClass("valuable-cases-main");     
        // $(".add-lawyer-form-main").addClass("law-firms-main");    
        $('#addOverviewForm').parsley();
        $('#addCasesForm').parsley();
        $('#addExpCertForm').parsley();
        $('#addEduLangForm').parsley();
        $('#addFirmsForm').parsley();
        $('#addCostForm').parsley();

        this.usersService.getPracticeArea();
        this.usersService.getLanguages();
        this.usersService.getYears();
        this.getPracticArea();
       this.addLanguages();
        // window.scrollTo(0, 0);
        // jQuery(document).ready(function ($) {
        //     var offset = 300,
        //         offset_opacity = 1200,
        //         scroll_top_duration = 700,
        //         $back_to_top = $('.cd-top');
        //     $(window).scroll(function () {
        //         ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        //         if ($(this).scrollTop() > offset_opacity) {
        //             $back_to_top.addClass('cd-fade-out');
        //         }
        //     });
        //     $back_to_top.on('click', function (event) {
        //         event.preventDefault();
        //         $('body,html').animate({
        //             scrollTop: 0,
        //         }, scroll_top_duration
        //         );
        //     });
        // });


        var doc_width = $(window).width();
        if (doc_width < 768) {
            $(".menu-section li a, .responsive-show-section").on("click", function () {
                $("body").css({ "margin": "0", "overflow-x": "auto", "position": "relative" });
                $("#mySidenav").css("transform", "translateX(-250px)");
            });
            $(".menu-section li a.free-q-a-li-a").on("click", function () {
                $("body").css({ "margin-left": "250px", "overflow-x": "auto", "position": "relative" });
                $("#mySidenav").css("transform", "translateX(0px)");
                $(".sub-menu-section-block").slideToggle("slow");
            });
        }

        function applyFormInputScript() {
            $('input, textarea, ng-select').each(function () {
                // $('input, textarea').on('focus', function () {
                //     $(this).parent('.form-group').addClass('active');
                // });
                // $('ng-select').on('click', function(){
                //   if ($('ng-select').hasClass('ng-select-focused, ng-select-opened')){
                //    var result =  $('ng-select').parent().addClass('active');
                //    console.log(result)
                //   }else{
                //     var result1 =  $('ng-select').parent().removeClass('active');
                //     console.log(result1)
                //   }
                // })

                // $('label').on('click', function () {
                //     $(this).parent('.form-group').addClass('active');
                //     $(this).parent().parent().siblings().removeClass('active');
                // });
                // $(this).on('blur', function () {
                //     if ($(this).val().length == 0) {
                //         $(this).parent('.form-group').removeClass('active');
                //     }
                // });
                if ($(this).val() != '') $(this).parent('.form-group').addClass('active');
            });
        }
        $(document).ready(function () {
            applyFormInputScript();
        });

        $(".back-for-law-firms").on("click", function () {
            $(".add-lawyer-form-main").removeClass("cost-main");
        });

        $(".back-for-education").on("click", function () {
            $(".add-lawyer-form-main").removeClass("law-firms-main");
        });

        $(".back-for-work-exp").on("click", function () {
            $(".add-lawyer-form-main").removeClass("education-main");
        });

        $(".back-for-value-cases").on("click", function () {
            $(".add-lawyer-form-main").removeClass("work-experience-main");
        });

        $(".back-for-overview").on("click", function () {
            $(".add-lawyer-form-main").removeClass("valuable-cases-main");
        });

        var room1 = 1;
        // $('a.valuable_cases_clone').on('click', function () {
        //     room1++;
        //     var objTo = document.getElementById('valuable_cases_clone')
        //     var divtest = document.createElement("div");
        //     divtest.setAttribute("class", "appended-div-section removeclass" + room1);
        //     var rdiv = 'removeclass' + room1;
        //     divtest.innerHTML = '<div class="row"><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="casename1" type="text"><label for="casename1">Enter Your case name</label></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="row"><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><select id="caeseyearfrom1"><option hidden></option><option>1</option><option>2</option></select><label for="caeseyearfrom1">Select year from</label><span class="select-drop-icon"><i class="fal fa-angle-down"></i></span></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><select id="casesyearto"><option hidden></option><option>1</option><option>2</option></select><label for="casesyearto">Select year to</label><span class="select-drop-icon"><i class="fal fa-angle-down"></i></span></div></div></div></div><div class="col-sm-12 col-md-12 col-lg-12"><div class="form-group form-group-section"><textarea name="description" id="casesaddress"></textarea><label for="casesaddress">Enter Your description</label></div></div></div><button class="remove-btn-block" type="button" (click)="remove_valuable_cases_clone(' + room1 + ');"><i class="fal fa-minus"></i> Remove Cases</button><div class="clear"></div> ';
        //     objTo.appendChild(divtest);
        //     applyFormInputScript()
        // });
        // function remove_valuable_cases_clone(rid) {
        //     alert(rid)
        //     $('.removeclass' + rid).remove();
        // }

        var room2 = 1;
        $('a.work_exp_clone').on('click', function () {
            room2++;
            var objTo = document.getElementById('work_exp_clone')
            var divtest = document.createElement("div");
            divtest.setAttribute("class", "appended-div-section removeclass" + room2);
            var rdiv = 'removeclass' + room2;
            divtest.innerHTML = '<div class="row"><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="exp-title1" type="text"><label for="exp-title1">Enter your title</label></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="exp-address1" type="text"><label for="exp-address1">Enter your address</label></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><select id="exp-yearfrom1"><option hidden></option><option>1</option><option>2</option></select><label for="exp-yearfrom1">Year from</label><span class="select-drop-icon"><i class="fal fa-angle-down"></i></span></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><select id="exp-yearto"><option hidden></option><option>1</option><option>2</option></select><label for="exp-yearto">Year to</label><span class="select-drop-icon"><i class="fal fa-angle-down"></i></span></div></div></div><button class="remove-btn-block" type="button" (click)="remove_work_exp_clone(' + room2 + ')"><i class="fal fa-minus"></i> Remove Experience</button><div class="clear"></div> ';
            objTo.appendChild(divtest);
            applyFormInputScript()
        });

        function remove_work_exp_clone(rid) {
            $('.removeclass' + rid).remove();
        }

        var room3 = 1;
        $('a.certificate_clone').on('click', function () {
            room3++;
            var objTo = document.getElementById('certificate_clone')
            var divtest = document.createElement("div");
            divtest.setAttribute("class", "appended-div-section removeclass" + room3);
            var rdiv = 'removeclass' + room3;
            divtest.innerHTML = '<div class="row"><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="certificate_name" type="text"><label for="certificate_name">Enter your certificate name</label></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="certificate_name1" type="text"><label for="certificate_name1">Enter your certificate name</label></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="certificate_name2" type="text"><label for="certificate_name2">Enter your certificate name</label></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="certificate_name3" type="text"><label for="certificate_name3">Enter your certificate name</label></div></div></div><button class="remove-btn-block" type="button" (click)="remove_certificate_clone(' + room3 + ');"><i class="fal fa-minus"></i> Remove Certificate</button><div class="clear"></div> ';
            objTo.appendChild(divtest);
            applyFormInputScript()
        });
        function remove_certificate_clone(rid) {
            $('.removeclass' + rid).remove();
        }

        var room4 = 1;
        $('a.education_clone').on('click', function () {
            room4++;
            var objTo = document.getElementById('education_clone')
            var divtest = document.createElement("div");
            divtest.setAttribute("class", "appended-div-section removeclass" + room4);
            var rdiv = 'removeclass' + room4;
            divtest.innerHTML = '<div class="row"><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="firms1" type="text"><label for="firms1">Enter your college name</label></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="firms2" type="text"><label for="firms2">Select your degree</label></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="firms3" type="text"><label for="firms3">Year from</label></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="firms4" type="text"><label for="firms4">Year to</label></div></div></div><button class="remove-btn-block" type="button" (click)="remove_education_clone(' + room4 + ')"><i class="fal fa-minus"></i> Remove Education</button><div class="clear"></div> ';
            objTo.appendChild(divtest);
            applyFormInputScript()
        });
        function remove_education_clone(rid) {
            $('.removeclass' + rid).remove();
        }

        var room5 = 1;
        $('a.language_clone').on('click', function () {
            room5++;
            var objTo = document.getElementById('language_clone')
            var divtest = document.createElement("div");
            divtest.setAttribute("class", "appended-div-section removeclass" + room5);
            var rdiv = 'removeclass' + room5;
            divtest.innerHTML = '<div class="row"><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><select id="language1"><option hidden></option><option>1</option><option>2</option></select><label for="language1">Select your language</label><span class="select-drop-icon"><i class="fal fa-angle-down"></i></span></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><select id="language2"><option hidden></option><option>1</option><option>2</option></select><label for="language2">Select Proficiency</label><span class="select-drop-icon"><i class="fal fa-angle-down"></i></span></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><select id="language3"><option hidden></option><option>1</option><option>2</option></select><label for="language3">Select your language</label><span class="select-drop-icon"><i class="fal fa-angle-down"></i></span></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><select id="language4"><option hidden></option><option>1</option><option>2</option></select><label for="language4">Select Proficiency</label><span class="select-drop-icon"><i class="fal fa-angle-down"></i></span></div></div></div><button class="remove-btn-block" type="button" (click)="remove_language_clone(' + room5 + ');"><i class="fal fa-minus"></i> Remove Language</button><div class="clear"></div> ';
            objTo.appendChild(divtest);
            applyFormInputScript()
        });
        function remove_language_clone(rid) {
            $('.removeclass' + rid).remove();
        }

        var room6 = 1;
        $('a.law_firms_clone').on('click', function () {
            room6++;
            var objTo = document.getElementById('law_firms_clone')
            var divtest = document.createElement("div");
            divtest.setAttribute("class", "appended-div-section removeclass" + room6);
            var rdiv = 'removeclass' + room6;
            divtest.innerHTML = '<div class="row"><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="firms1" type="text"><label for="firms1">Enter your firm name</label></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="firms2" type="text"><label for="firms2">Enter your firm address</label></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="firms3" type="text"><label for="firms3">Enter your phone number</label></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><input id="firms4" type="text"><label for="firms4">Enter your fax number</label></div></div></div><button class="remove-btn-block" type="button" (click)="remove_law_firms_clone(' + room6 + ');"><i class="fal fa-minus"></i> Remove Firm</button><div class="clear"></div> ';
            objTo.appendChild(divtest);
            applyFormInputScript()
        });
        function remove_law_firms_clone(rid) {
            $('.removeclass' + rid).remove();
        }

        var room7 = 1;
        $('a.cost_clone').on('click', function () {
            room7++;
            var objTo = document.getElementById('cost_clone')
            var divtest = document.createElement("div");
            divtest.setAttribute("class", "appended-div-section removeclass" + room7);
            var rdiv = 'removeclass' + room7;
            divtest.innerHTML = '<div class="row"><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><select id="cost1"><option hidden></option><option>1</option><option>2</option></select><label for="cost1">Select Hourly Rates</label><span class="select-drop-icon"><i class="fal fa-angle-down"></i></span></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><select id="cost2"><option hidden></option><option>1</option><option>2</option></select><label for="cost2">Select your free consultation time</label><span class="select-drop-icon"><i class="fal fa-angle-down"></i></span></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><select id="cost3"><option hidden></option><option>1</option><option>2</option></select><label for="cost3">Select your contingency fees</label><span class="select-drop-icon"><i class="fal fa-angle-down"></i></span></div></div><div class="col-sm-6 col-md-6 col-lg-6"><div class="form-group form-group-section"><select id="cost4"><option hidden></option><option>1</option><option>2</option></select><label for="cost4">Select your payment methods</label><span class="select-drop-icon"><i class="fal fa-angle-down"></i></span></div></div></div><button class="remove-btn-block" type="button" (click)="remove_cost_clone(' + room7 + ');"><i class="fal fa-minus"></i> Remove Cost</button><div class="clear"></div>';
            objTo.appendChild(divtest);
            applyFormInputScript()
        });
        function remove_cost_clone(rid) {
            $('.removeclass' + rid).remove();
        }

        const component = this;

        var maxBirthdayDate = new Date();
        maxBirthdayDate.setFullYear(maxBirthdayDate.getFullYear() - 18);

        $("#dob").datepicker({
            autoclose: true,
            format: 'mm/dd/yyyy',
            todayHighlight: 'today',
            endDate: maxBirthdayDate,
            // maxDate: '' + showDate
        });
        $("#dob").on('changeDate', function () {
            var result1 = $(this).change(function (date) { $("#dob").submit(date) });
            $(this).parent('.form-group').addClass('active');
            $('#dob').parsley().validate();
            component.birthDate = result1.val();

        });

        if (this.selectedGender) {
            var result = $('ng-select').parent().addClass('active');
        }
        this.usersService.getlawtallyAdminDetails();
    }

    imageChangedEvent;

    onFileUpload(event: any): void {
        this.imageChangedEvent = event;
        $('#cropmodal').modal('show');
    }
    
    croppedImage;
    imageCropped(event) {
  
      this.imgURL = event.base64;
      this.currentFileUpload = event.base64; 
      console.log("Aaaasddd44",this.imgURL);
      
     
    
  }

    // onFileUpload(event) {
    //     const reader = new FileReader();
    //     if (event.target.files[0]) {
    //         var idxDot = event.target.files[0].name.lastIndexOf(".") + 1;
    //         var extFile = event.target.files[0].name.substr(idxDot, event.target.files[0].name.length).toLowerCase();
    //         if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
    //             this.currentFileUpload = (event.target.files[0])
    //             console.log(this.currentFileUpload)
    //             if (event.target.files && event.target.files.length) {
    //                 reader.readAsDataURL(event.target.files[0]);
    //                 reader.onload = (event: any) => {
    //                     this.imgURL = (event.target).result;
    //                     console.log(this.imgURL)
    //                 }
    //             }
    //         } else {
    //             Swal.fire({
    //                 position: 'center',
    //                 icon: 'error',
    //                 title: 'Only jpg/jpeg and png files are allowed!',
    //                 showConfirmButton: false,
    //                 timer: 2000,
    //             });
    //         }
    //     }
    // }

    emailalready;
    onAddOverview(addOverviewForm:NgForm) {
      
        // $(".add-lawyer-form-main").addClass("valuable-cases-main");
        // return;
    // debugger
        if(this.imgURL){
            addOverviewForm.value.profile_image = this.imgURL;
        }

        this.overviewForm = addOverviewForm.value;
        console.log("overviewForm",this.overviewForm);
        
        this.overviewForm.practiceArea= _.toArray(this.overviewForm.practiceArea)
        
        this.usersService.checkEmail(this.overviewForm).subscribe((res:any) => {        
            // if(res.status == "SUCCESS"){
                this.emailalready = false;
                console.log(this.overviewForm.description.length);
                localStorage.setItem('pracLength', addOverviewForm.value.practiceArea.length)
                if (this.overviewForm.description.length < 50) {
                    this.descLengthMin = true;
                    this.descLength = true;
                    this.minLengthFlag = true;
                }
                else {
                    this.descLengthMin = false;
                }
                if (this.overviewForm.description.length > 1000) {
                    this.descLength = true;
                    this.descLengthMin = true;
                    this.minLengthFlag = false;
                }
                else {
                    this.descLength = false;
                }
                if (addOverviewForm.valid && (!this.descLength || !this.descLengthMin)) {
                    $(".add-lawyer-form-main").addClass("valuable-cases-main");
                }
                else {
                    console.log("Invalid");
                }
            // }
            // else{
            //    if (res.msg == "Email already exists."){
            //     this.emailalready = false;
            //    }    
                
            // }
        
        })

      
    

    }

    onAddValuableCase(addCasesForm) {
        // $(".add-lawyer-form-main").addClass("work-experience-main");
        // return;
        let valid = true;

        this.valuableCases.forEach(cases => {
            if (cases.title === "" || cases.description === "" || cases.from_year == "" || cases.to_year == "")
                valid = false;
            if (cases.description.length < 50) {
                cases.descLengthMinCase = true;
                valid = false;
            }
            else {
                cases.descLengthMinCase = false;
            }
        });
        if (valid && this.yearValidate) {
            this.caseForm = this.valuableCases;
            console.log(this.caseForm)
            $(".add-lawyer-form-main").addClass("work-experience-main");
        }
        else {
            console.log("Invalid")
        }
    }

    onAddExpr(addExpCertForm) {
       
        
        // $(".add-lawyer-form-main").addClass("education-main");
        // return;
        var instance = $('#addExpCertForm').parsley();
        console.log(instance.isValid());
        console.log('exp', this.workExperieces);
        let valid = true;
        this.workExperieces.forEach(cases => {
            if (cases.title === "" || cases.experience_at === "" || cases.from_year == "" || cases.to_year == "")
                valid = false;
        });
        this.certificates.forEach(cert => {
            if (cert.award_name === "" || cert.year === "")
                valid = false;
        })

        console.log(this.expCertForm);
        if (valid && this.yearValidate && instance.isValid()) {
            this.expCertForm['experience'] = this.workExperieces;
            this.expCertForm['certificates'] = this.certificates;
            $(".add-lawyer-form-main").addClass("education-main");
        }
        else {
            console.log("Invalid")
        }
    }

    onaddEducation(addEduLangForm:NgForm) {
// debugger;
        // console.log("addEduLangForm",addEduLangForm.value);
        
        // $(".add-lawyer-form-main").addClass("education-main");
        // return;
        var instance = $('#addEduLangForm').parsley();
        console.log(instance.isValid());
        let valid = true;
        addEduLangForm.value.languageAssociate= _.toArray(addEduLangForm.value.languageAssociate)        
        addEduLangForm.value.professionalassociations= _.toArray(addEduLangForm.value.professionalassociation)
        addEduLangForm.value.publication= _.toArray(addEduLangForm.value.publication)
        addEduLangForm.value.conferencedetails= _.toArray(addEduLangForm.value.conferencedetails)
        addEduLangForm.value.baradmission= _.toArray(addEduLangForm.value.baradmission)
        addEduLangForm.value.educations=  this.educations;
        this.educations.forEach(cases => {
            if (cases.university === "" || cases.degree === "" || cases.starting_year == "" || cases.passing_year == "")
                valid = false;
        });
        this.languages.forEach(cert => {
            if (cert.language_id === "" || cert.proficiency === "")
                valid = false;
        })
        //****charu Start */
        this.professionalassociations.forEach(association => {
            if (association.association_name === "" || association.title === "" || association.role == "" )
                valid = false;
        });       
        
        
//****charu Start */
        if (valid && this.yearValidate && instance.isValid()) {
            this.eduLangForm=addEduLangForm.value;
            // this.eduLangForm['educations'] = this.educations;
            // this.eduLangForm['languages'] = this.languages;
            // this.eduLangForm['professionalassociations'] = this.professionalassociations;
            $(".add-lawyer-form-main").addClass("law-firms-main");
        }
        else {
            console.log("Invalid")
        }
    }

    onAddLawFirms(addFirmsForm) {
        // console.log("addFirmsForm",addFirmsForm.value);
     
        // $(".add-lawyer-form-main").addClass("work-experience-main");
        // return;
        var instance = $('#addFirmsForm').parsley();
        console.log(instance.isValid());
        let valid = true;
        this.lawfirms.forEach(firms => {
         //   console.log(firms);

            if (firms.firm_name === "" || firms.firm_address === "" || firms.city === "" || firms.country === "" || firms.mobile_number == "" || firms.mobile_number.length < 9 || firms.fax == "" ||  firms.fax.length < 9 || !firms.latitude || !firms.longitude)
                valid = false;
        });
        if (valid && instance.isValid()) {
            this.firmForm = this.lawfirms;
          //  console.log(this.firmForm)
            $(".add-lawyer-form-main").addClass("cost-main");
        }
        else {
            console.log("Invalid")
        }
    }

    onSubmitLawyer(addCostForm) {
      debugger;
        this.costForm = addCostForm.value
        console.log(this.overviewForm);
        console.log(this.caseForm);
        console.log(this.expCertForm);
        console.log(this.eduLangForm);      
        console.log(this.firmForm);
        console.log(this.costForm)
        localStorage.setItem('payLength', addCostForm.value.payment_methods.length)
        if (addCostForm.valid) {
            this.loading = true;

            this.usersService.addLawyer(this.overviewForm, this.caseForm, this.expCertForm,
                this.eduLangForm, this.firmForm, this.costForm, this.currentFileUpload)
                .subscribe(res => {
                    this.loginMessage = res['status'];
                    this.responce = res['response_data']
                    this.loading = false;
                    if (this.loginMessage == "SUCCESS") {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Add Lawyer Successfully',
                            showConfirmButton: false,
                            timer: 1000
                        });
                        localStorage.setItem('roles_length', res['response_data']['roles'].length)
                        localStorage.setItem('roles', res['response_data']['roles'])
                        let lawyerId = res['response_data']['lawyer_id']
                        
                        this.openCheckout(lawyerId);
                    } else {
                        console.log(res)
                        console.log("UnSUCCESS");
                    }
                },err=>{
                    this.loading=false;
                    console.error(err);
                })
        } else {
            console.log("Invalid")
        }
    }

    openCheckout(lawyerId) {
        var self: any = this;
        let subData = JSON.parse(localStorage.getItem('subscription'))
      
      //  console.log(this.responce);
        var handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_SuuGsbmYE1nPYUTTIYItMQ16',
            locale: 'auto',
            token: function (token: any) {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
               // console.log(token);
                let formData = new FormData();
                formData.set('package_id', subData.id);
                formData.set('stripeToken', token['id']);
                formData.set('user_id', lawyerId);

                // console.log(formData);
                // console.log('token ' + token['id']);



                self.http.post("https://www.lawtally.co/api/v1/stripe_charge", formData).subscribe((res: any) => {
                    console.log(res);
                    if (res.status == "SUCCESS") {
                   self.payment = "Payment is Done"
                   Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Payment is Done',
                    showConfirmButton: false,
                    timer: 1000
                });
                       // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaawqeqweqwe",subData,lawyerId);
                       
                         if(subData.package_name == "Elite Package"){
                            self.router.navigate(['/lawyer-directory/listing-details', { id: lawyerId }]);
                        localStorage.removeItem('subscription')
                    }
                    if(subData.package_name == "Diamond Package"){
                        self.router.navigate(['/lawyer-directory/listing-details', { id: lawyerId }]);
                        localStorage.removeItem('subscription')
                        
                    }
                    if(subData.package_name == "Standard Package"){
                        self.router.navigate(['/lawyer-directory/listing-details', { id: lawyerId }]);
                        localStorage.removeItem('subscription')

            }
            
          
                    }
                },
                    err => {
                        self.payment = "Payment is Failed"
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Payment is Failed',
                            showConfirmButton: false,
                            timer: 1000,
                        });
                    });
              
            }
        });
        let amount = + subData.price
        let price: any = Number(amount).toFixed(2);
        //console.log(price)
        handler.open({
            name: 'Demo Site',
            description: '2 widgets',
            amount: price * 100
        });
     //   console.log(price)




    }


  

    addCases() {
        this.valuableCases.push({ "title": "", "description": "", "from_year": "", "to_year": "", "descLengthMinCase": false })
      //  console.log(this.valuableCases);

    }
    removeCases(index: number) {
        this.valuableCases.splice(index, 1);
    }

    addExperiences() {
        this.workExperieces.push({ "title": "", "experience_at": "", "from_year": "", "to_year": "" })
    }

    removeExperiences(index: number) {
        this.workExperieces.splice(index, 1);
    }
    addCertificates() {
        this.certificates.push({ "award_name": "", "year": "" })
    }
    removeCertificates(index: number) {
        this.certificates.splice(index, 1);
    }
    addEducations() {
        this.educations.push({ "university": "", "degree": "", "starting_year": "", "passing_year": "" })
    }
    removeEducations(index: number) {
        this.educations.splice(index, 1);
    }
    addLanguages() {
        this.languages.push({ language_id: "", proficiency: "" })
    }
    removeLanguages(index: number) {
        this.languages.splice(index, 1);
    }
    addFirms() {
        this.lawfirms.push({ "firm_name": "", "firm_address": "", "city": "", "country": "", "mobile_number": "", "fax": "", "latitude": "", "longitude": "" })
    }
    removeFirms(index: number) {
        this.lawfirms.splice(index, 1);
    }
    logout() {
        this.authService.logout();
    }

    onFocus($event) {
        var result = $('ng-select').parent().addClass('active');
    }

    showTransition($event) {
        if (this.selectedGender) {
            var result = $('ng-select').parent().addClass('active');
        }
        // else {
        //     var result1 = $('ng-select').parent().removeClass('active');
        // }
    }
    showExprience($event) {
        if (this.selectedGender) {
            var result = $('ng-select').parent().addClass('active');
        }
      
    }
    
    showproBonaServices ($event) {
        if (this.selectedGender) {
            var result = $('ng-select').parent().addClass('active');
        }
    }
    
    showvirtual_conversation ($event) {
        if (this.selectedGender) {
            var result = $('ng-select').parent().addClass('active');
        }
    }
    showopen_for_business ($event) {
        if (this.selectedGender) {
            var result = $('ng-select').parent().addClass('active');
        }
    }
    fromYear(fromYear) {
       // console.log(fromYear)
        this.startYear = fromYear;
        if (this.startYear > this.lastYear) {
            this.yearValidate = false;
        }
        else {
            this.yearValidate = true;
        }
    }

    toYear(toYear) {
       //toYear)
        this.lastYear = toYear;
        if (this.startYear > this.lastYear) {
            this.yearValidate = false;
        }
        else {
            this.yearValidate = true;
        }
    }

    numberOnly(event, costform) {
       // console.log(event)
        if (costform.value.hourly_rates.length > 4) {
            this.hourlyLength = true;
        }
        else {
            this.hourlyLength = false;
        }

    }

    onChangeAddress(index, latitude, longitude) {
       // console.log(latitude)
      // console.log(longitude)
        if (!longitude && !latitude) {
            if (this.lawfirms[index]) {
                setTimeout(() => {
                    this.lawfirms[index].firm_address = "";
                }, 500);
            }
        }
        else {

        }
    }

    setLatLongNull(index) {
        if (this.lawfirms[index]) {
            setTimeout(() => {
                this.lawfirms[index].latitude = undefined;
                this.lawfirms[index].longitude = undefined;
            }, 500);
        }
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
  getPracticArea(){
    this.usersService.practic_area().subscribe((res:any)=>{
      this.practiceAreaList=res;
    //  console.log("getpractic_area res>>>>",this.practiceAreaList);
     
    })
  }
  addPracticeArea() {
   
    this.usersService.practiceArea.push({ practice_area_id: "",practice_area_name: "",practice_area_percentage: "",});
  }
  removePracticeArea(index: number) {
   
    this.usersService.practiceArea.splice(index, 1);
  }


  addprofessionalassociations() {
     
    this.professionalassociations.push({ association_name: '', title: '', role:'' },);
  }
  removeprofessionalassociations(index: number) {
    this.professionalassociations.splice(index, 1);
  }
  addhonorsandawards() {
    this.honorsandawards.push( { name: '', title: '', role:'' });
  }
  
  removehonorsandawards(index: number) {
    this.honorsandawards.splice(index, 1);
  }
  addPublishdetails() {
    this.Publishdetails.push(  {publication_name: "",link: "",retrival_date:""}); 
  }
  removePublishdetails(index: number) {
    this.Publishdetails.splice(index, 1);
  }
  
  addconferencedetail() {
    this.conferencedetail.push( { conference_name: '', agenda: '', date:'' });
  }
  removeconferencedetail(index: number) {
    this.conferencedetail.splice(index, 1);
  }
  
  addbaradmission() { 
    this.BarAdmission.push({ state_name: '', status: '', granted_date:'' },);
  }
  removebaradmission(index: number) {
    this.BarAdmission.splice(index, 1);
  }

  getStates(){
      this.usersService.get_states().subscribe((res:any)=>{
          this.stateList=res;
       //   console.log("stateList",this.stateList);
          
      })
  }
  
  //** charu End*/
}
