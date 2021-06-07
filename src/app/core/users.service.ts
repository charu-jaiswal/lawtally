import { Injectable,Output,EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http'
import { AuthService } from '../core/auth.service';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  @Output() headercolor:EventEmitter<any> = new EventEmitter<any>();
  paymentmethods = [
    { "name": "Online", "id": "online" },
    { "name": "Cash", "id": "cash" },
    { "name": "Card", "id": "card" },
  ]
  loginMsg: any = [];
  AdminDetails: any = [];
  forgetPassMsg: any = [];
  otpMsg: any = [];
  resetPassMsg: any = [];
  languageList: any = [];
  practiceAreaList: any = [];
  YearsList: any = [];
  lawyerList: any = [];
  lawyerDetailsList: any = [];
  practiceArea: any = [];
  lawyerCase: any = [];
  lawyerExperience: any = [];
  lawyerAwards: any = [];
  lawyerAcademics: any = [];
  lawyerEndorsement: any = [];
  lawyerLanguages: any = [];
  lawyerFirm: any = [];
  paymentMethod: any = [];
  similarLawyers: any = [];
  facebookLink: any = []; location: string | Blob;
  lawyerAssociation: any;
  lawyerBarAdmission: any;
  lawyerpublications: any;
  lawyerConference: any;
  editformdata: any;
  
  linkedinLink: any = [];;
  twitterLink: any = [];

  userProfileList: any = [];
  practiceArea1: any = [];
  lawyerCase1: any = [];
  lawyerExperience1: any = [];
  lawyerAwards1: any = [];
  lawyerAcademics1: any = [];
  lawyerEndorsement1: any = [];
  lawyerLanguages1: any = [];
  lawyerFirm1: any = [];
  paymentMethod1: any = [];
  facebookLink1: any = [];
  linkedinLink1: any = [];
  twitterLink1: any = [];

  ElitePlan: any = [];
  ElitePackage: any = [];
  StandardPlan: any = [];
  StandardPackage: any = [];
  DiamondPlan: any = [];
  DiamondPackage: any = [];
  addFAV: any = [];
  removeFAV: any = [];
  getNotificationList: any = [];
  notiMsg;
  getTranscationHistory: any = [];
  transmessage: any = "";
  deleteNotList: any = [];
  getEnquiryList: any = [];
  enquirymessage: any = "";
  practiceListId: any = "";
  profiletypelist: any = [];
  languagelist: any = [];
  getReviewListing: any = [];
  Invitation_Cnt:any=0;
  Verified_Review_Cnt:any=0;
  LawTally_Score:any=0;
  Reviewmessage: any = "";
  status;
  token;
  headers;
  options;
  userID;
  userAge;
  CmsPages;
  city;
  state;
  country;
  latitude;
  longitude;
  practiceLength
  askStatus;
  getQuestionList;
  questionMsg;
  practiceList;
  getAllQuestionList;
  AllquestionMsg;
  questionDetailsData;
  questionDetailsMsg;
  lawyerMsg;
  BlogListing;
  BlogListingMsg;
  BlogCategory;
  blogDetailsData: any = [];
  blogDetailsMsg;
  blogDetailsComments: any = [];
  commentStatus;
  newsletterStatus;
  tempvar1:string='';
  emailstatus: any = '';
  email_msg: any = '';
  isEditData:boolean=false;
  // baseURL = 'https://webwingdemo.com/beta/lawtally/api/v1/';
  baseURL = 'https://lawtally.co/api/v1/';
  // baseURL = 'http://192.168.1.75/lawtally/api/v1/';

  // https://lawtally.co/api/v1/get_lawyer_details?id=5ef21b6708203b74c7280265
  constructor(
    private http: HttpClient,
    public authService: AuthService
  ) { }

  changeheadercolor(x){
    this.headercolor.emit(x)
  }

  lawtallyLogin(form) {
    const fromData: FormData = new FormData();
    fromData.append('email', form.email);
    fromData.append('password', form.password);
    fromData.append('login_as', form.login_as);

    return this.http.post(this.baseURL + 'login', fromData)
  }

  getToken() {
    this.token = sessionStorage.getItem('access_token')
    if (this.token) {
      this.headers = new HttpHeaders({ 'Authorization': `Bearer ` + this.token })
      this.options = { headers: this.headers };
    }
  }

  practic_area() {
    return this.http.get(this.baseURL + 'get_practice_area')  
  }

  get_states() {
    return this.http.get(this.baseURL + 'get_states')  
  }

  get_cities() {
    return this.http.get(this.baseURL + 'get_cities')  
  }

  setstorage(x,y){
    localStorage.setItem(x, JSON.stringify(y));
    }
    
    getstorage(x) {
    return JSON.parse(localStorage.getItem(x));
    }

    helpfulUnhelpfull(obj) {
      this.getToken();
      const fromData: FormData = new FormData();
      fromData.append('flag', obj.flag);
      fromData.append('answer_id', obj.answer_id);
      fromData.append('question_id', obj.question_id);

      return this.http.post(this.baseURL + 'user/submit_answer_flag',fromData,this.options)
    }


    submitcomment(obj) {
      this.getToken();
      const fromData: FormData = new FormData();
      fromData.append('comment', obj.comment);
      fromData.append('answer_id', obj.answer_id);
      fromData.append('question_id', obj.question_id);

      return this.http.post(this.baseURL + 'user/submit_answer_comment',fromData,this.options)
    }

  getlawtallyAdminDetails() {
    this.getToken();

    return this.http.post(this.baseURL + 'user/get_profile', null, this.options)
      .subscribe(res => {
        var result = res['response_data'];
        this.AdminDetails = [result]
        if (result) {
          this.userID = result._id
          localStorage.setItem('user_id', this.userID)
          localStorage.setItem('user_detail', JSON.stringify(result));
        }
      })
  }

  getAdminDetails() {
    this.getToken();
    return this.http.post(this.baseURL + 'user/get_profile', null, this.options);
  }

  lawtallySignup(form) {
    const fromData: FormData = new FormData();
    fromData.append('full_name', form.full_name);
    fromData.append('mobile_number', form.mobile_number);
    fromData.append('email', form.email);
    fromData.append('password', form.password);
    fromData.append('confirm_password', form.confirm_password);

    return this.http.post(this.baseURL + 'signup', fromData)
  }

  lawtallyInquryFrm(form, googleAddress) {

    for (var i = 0; i < form.practice_area.length; i++) {
      this.tempvar1+=form.practice_area[i]._id+',';
    }

    this.tempvar1=this.tempvar1.slice(0,-1);

    var k1=form.inqlocation.split(',');

    var getcountryvar = $.trim(k1[k1.length-1]);
    
    var getstatevar_temp = k1[k1.length-2];
    var getstatevar_temp2=getstatevar_temp.split(',');
    var getstatevar=getstatevar_temp2[0];

    var getcityvar = k1[k1.length-3];

    this.location = googleAddress.formatted_address;
    this.latitude = googleAddress.geometry.location.lat();
    this.longitude = googleAddress.geometry.location.lng();

    // alert('first_name : '+form.firstName);  alert('last_name : '+form.lastName);
    // alert('mobile_number : '+form.phoneno);  alert('email : '+form.inqemail);
    // alert('location : '+form.inqlocation);  alert('description : '+form.inqdesc);
    // alert('practice_area_id : '+this.tempvar1);  alert('pay_attorney_in : '+form.payoption);
    // alert('need_attorney_in : '+form.whenattorney);  

    // alert('country : '+getcountryvar);
    // alert('state : '+getstatevar);
    // alert('city : '+getcityvar);

    //alert('latitude : '+this.latitude);
    //alert('longitude : '+this.longitude);

    const fromData: FormData = new FormData();
    fromData.append('first_name', form.firstName);
    fromData.append('last_name', form.lastName);
    fromData.append('mobile_number', form.phoneno);
    fromData.append('email', form.inqemail);
    fromData.append('location', form.inqlocation);
    fromData.append('description', form.inqdesc);

    fromData.append('practice_area_id', this.tempvar1);
    fromData.append('pay_attorney_in', form.payoption);
    fromData.append('need_attorney_in', form.whenattorney);

    fromData.append('latitude', this.latitude);
    fromData.append('longitude', this.longitude);
    fromData.append('state', getstatevar);
    fromData.append('city', getcityvar);
    fromData.append('country', getcountryvar);


    return this.http.post(this.baseURL + 'submit_matching_service', fromData)

  }

  checkEmail(form) {
    const fromData: FormData = new FormData();
    fromData.append('email', form.email);

    return this.http.post(this.baseURL + 'check_email_duplication', fromData)
  }

  checkContact(form) {
    const fromData: FormData = new FormData();
    fromData.append('mobile_number', form.mobile_number);

    return this.http.post(this.baseURL + 'check_contact_duplication', fromData)
  }

  forgotPassword(form) {
    const fromData: FormData = new FormData();
    fromData.append('email', form.email);

    return this.http.post(this.baseURL + 'forgot_password', fromData)
  }

  setPassword(form) {
    const fromData: FormData = new FormData();
    fromData.append('password_reset_token', form.password_reset_token);
    fromData.append('password', form.password);

    return this.http.post(this.baseURL + 'set_password', fromData)
  }

  getEndorseDetails(lid) {
    this.getToken();
    var id = lid ? lid : localStorage.getItem('user_id')
    return this.http.get(this.baseURL + 'get_lawyer_details' + '?id=' + id, this.options)
  }

   getLawyerDetails(lid) {
    this.getToken();
    var id = lid ? lid : localStorage.getItem('user_id')

    return new Promise(resolve => {
      this.http.get(this.baseURL + 'get_lawyer_details' + '?id=' + id, this.options)
        .subscribe(res => {
          var result = res['response_data'];
          this.editformdata=result;
          console.log("user service getLawyerDetails result",result );
          this.lawyerAssociation= result.lawyer_association
          this.lawyerBarAdmission= result.lawyer_bar_admission
          this.lawyerpublications= result.lawyer_publications
          this.lawyerConference=result.lawyer_conference;
        
          
          console.log("user service lawyerAssociation",  this.lawyerAssociation );
          console.log("user service lawyerBarAdmission",this.lawyerBarAdmission );
          console.log("user service lawyerpublications  result",this.lawyerpublications );
          console.log("virtual_conversation>>>>>",this.editformdata.virtual_conversation);
          console.log("editformdata.pro_bona_services",this.editformdata.pro_bona_services);
          console.log("editformdata.open_for_business",this.editformdata.open_for_business);
          
      
          if (result.reviews) {
            result.reviews.forEach((data) => {
              data['readMore'] = true;
            })
          }

          this.lawyerDetailsList = [result]
          this.lawyerDetailsList[0].background_check =     this.lawyerDetailsList[0].background_check == 'yes' ? true : false ;
          console.log(this.lawyerDetailsList,"service result lawyerDetailsList")
        
          
          if (this.lawyerDetailsList[0]) {
            this.facebookLink = this.lawyerDetailsList[0].social_links.fb_url
            this.linkedinLink = this.lawyerDetailsList[0].social_links.linkedin_url
            this.twitterLink = this.lawyerDetailsList[0].social_links.twitter_url
          }

          this.practiceArea = result.practice_area

          this.practiceArea.forEach((data) => {//charu          
            data['name'] = data['practice_area_name']
            data['_id'] = data['practice_area_id']
          })
          console.log( this.practiceArea,"service result this.practiceArea")
          this.lawyerCase = result.lawyer_cases
          this.lawyerCase.forEach((data) => {
            data['descLengthMinCase'] = false;
            data['minLengthFlagCase'] = false;
            data['descLengthCase'] = false;
          })
          this.lawyerExperience = result.lawyer_experience
          this.lawyerAwards = result.lawyer_awards ? result.lawyer_awards : []
          this.lawyerAcademics = result.lawyer_academics
          this.lawyerLanguages = result.lawyer_languages

          this.lawyerFirm = result.lawyer_firm ? result.lawyer_firm : []
          this.lawyerEndorsement = result.lawyer_endorsement ? result.lawyer_endorsement : []
          this.paymentMethod = result.lawyer_payment_methods ? result.lawyer_payment_methods : []
          this.similarLawyers = result.similar_lawyers ? result.similar_lawyers : []
          // this.paymentMethod.forEach((data) => {
          //   data['name'] = data['method_name'];
          // }) 

          this.paymentMethod = [];
          this.paymentmethods.forEach(meth => {
            if (result.lawyer_payment_methods.filter(res => { return res.method_name === meth.id }).length > 0)
              this.paymentMethod.push(meth);
          })

          // dob
          var dob = res['response_data'].dob;
          const date = new Date();
          const birthDate = new Date(dob)

          this.userAge = date.getFullYear() - birthDate.getFullYear();
          if(!lid)
            localStorage.setItem('has_membership', this.lawyerDetailsList[0].has_membership)
            this.isEditData=true;
          resolve();
        }, error => {
          resolve();
        });
    });
  }

  getLanguages() {
    return this.http.get(this.baseURL + 'get_languages')
      .subscribe(res => {
        // tslint:disable-next-line: no-string-literal
        this.languageList = res['response_data'];
        console.log(this.languageList);
        // tslint:disable-next-line: no-string-literal
      });
  }

  getPracticeArea() {
    return this.http.get(this.baseURL + 'get_practice_area')
      .subscribe(res => {
        // tslint:disable-next-line: no-string-literal
        this.practiceAreaList = res['response_data'];
        // tslint:disable-next-line: no-string-literal
      });
  }

  getYears() {
    return this.http.get(this.baseURL + 'get_years')
      .subscribe(res => {
        this.YearsList = res['response_data'].years;
      });
  }

  getLawyerDetailsEdit() {
    this.getToken();

    return this.http.post(this.baseURL + 'user/get_lawyer_profile', null, this.options)
      .subscribe(res => {
        var result = res['response_data'];
        this.userProfileList = [result];
        this.userProfileList.forEach(element => {
          element.package_name.package_name = element.package_name.package_name.split(' ')[0];
        });
        this.facebookLink1 = this.userProfileList[0].social_links.fb_url
        this.linkedinLink1 = this.userProfileList[0].social_links.linkedin_url
        this.twitterLink1 = this.userProfileList[0].social_links.twitter_url
        result.practice_area.forEach(element => {
          element['_id'] = element['practice_area_id']
          element['name'] = element['practice_area_name']
        });
        this.practiceArea1 = result.practice_area
        this.lawyerCase1 = result.lawyer_cases
        this.lawyerCase1.forEach(element => {
          element['from_year'] = +element['from_year']
          element['to_year'] = +element['to_year']
        });
        this.lawyerExperience1 = result.lawyer_experience
        this.lawyerAwards1 = result.lawyer_awards
        this.lawyerAwards1.forEach(element => {
          element['year'] = +element['year']
        });
        this.lawyerAcademics1 = result.lawyer_academics
        this.lawyerEndorsement1 = result.lawyer_endorsement ? result.lawyer_endorsement : []
        this.lawyerAcademics1.forEach(element => {
          element['starting_year'] = +element['starting_year']
          element['passing_year'] = +element['passing_year']
        });
        this.lawyerLanguages1 = result.lawyer_languages
        this.lawyerFirm1 = result.lawyer_firm
        result.lawyer_payment_methods.forEach(element => {
          console.log(element)
          element['id'] = element['method_name']
          element['name'] = element['method_name']
        });
        this.paymentMethod1 = result.lawyer_payment_methods

        // dob
        var dob = res['response_data'].dob;
        const date = new Date();
        const birthDate = new Date(dob)

        this.userAge = date.getFullYear() - birthDate.getFullYear();
      })
  }

  addLawyer(overviewForm, caseForm, expCertForm, eduLangForm, firmForm, costForm, ImageFile: File) {
    this.getToken();

    const fromData: FormData = new FormData();
    fromData.append('full_name', overviewForm.full_name);

    //var AreaArray = [];
    //var pracLength = localStorage.getItem('pracLength');
    // for (var i = 0; i < overviewForm.practiceArea.length; i++) {
    //   AreaArray.push(overviewForm.practiceArea[i].practice_area_id);
     
    // }
  
    var AreaArray = [];
    var pracLength: any = localStorage.getItem('pracLength')
    console.log(pracLength)
    console.log(overviewForm)
    for (var i = 0; i <= overviewForm.practiceArea.length - 1; i++) {//charu
      AreaArray.push({"practice_area_id":overviewForm.practiceArea[i].practice_area_id,"percentage":overviewForm.practiceArea[i].practice_area_percentage});//charu
    }
    fromData.append('practice_area', JSON.stringify(AreaArray));

    fromData.append('email', overviewForm.email);
    fromData.append('mobile_number', overviewForm.mobile_number);
    fromData.append('gender', overviewForm.gender);
    fromData.append('dob', overviewForm.dob);
    fromData.append('website', overviewForm.website);
    fromData.append('fb_url', overviewForm.fb_url);
    fromData.append('twitter_url', overviewForm.twitter_url);
    fromData.append('linkedin_url', overviewForm.linkedin_url);
  
    fromData.append('description', overviewForm.description);
    
    //**charu */
     fromData.append('total_experience', overviewForm.work_experience);
    fromData.append('also_known_as', overviewForm.also_known_as);
    
    fromData.append('background_check', overviewForm.background_check == true ? 'yes' : 'no');
    
    fromData.append('pro_bona_services', eduLangForm.pro_bona_services);
    fromData.append('virtual_conversation', eduLangForm.virtual_conversation);
    fromData.append('open_for_business', eduLangForm.open_for_business);
    
//**charuEnd */
    var result = [];
    result.push({ "title": caseForm.title, "description": caseForm.description, "from_year": caseForm.from_year, "to_year": caseForm.to_year });

    var result1 = [];
    result1.push({ "title": expCertForm.title, "experience_at": expCertForm.experience_at, "from_year": expCertForm.from_year, "to_year": expCertForm.to_year });

    var result2 = [];
    result2.push({ "award_name": expCertForm.award_name, "year": expCertForm.year });

    var result3 = [];
    result3.push({ "degree": eduLangForm.degree, "university": eduLangForm.university, 
    "starting_year": eduLangForm.starting_year, "passing_year": eduLangForm.passing_year,
    
  
   });

    // var result4 = [];
    // result4.push({ "language_id": eduLangForm.language_id, "proficiency": eduLangForm.proficiency });
    //  var result5 = [];
    // result5.push({ "firm_name": firmForm.firm_name, "firm_address": firmForm.firm_address, "mobile_number": firmForm.mobile_number, "fax": firmForm.fax ,"firm_linkedin": firmForm.firm_linkedin ,"firm_facebook": firmForm.firm_facebook ,"firm_twitter": firmForm.firm_twitter,"firm_website": firmForm.firm_website});
    

    fromData.append('lawyer_case', JSON.stringify(caseForm));
    // fromData.append('lawyer_experience', JSON.stringify(expCertForm['experience']));
    fromData.append('work_experience', JSON.stringify(expCertForm['experience']));
    fromData.append('lawyer_awards', JSON.stringify(expCertForm['certificates']));
    // fromData.append('lawyer_academics', JSON.stringify(eduLangForm['educations']));

    /** Add Education Form  charu*/
    fromData.append('education', JSON.stringify(eduLangForm.educations));   
    fromData.append('languages', JSON.stringify(eduLangForm.languageAssociate));
    fromData.append('professional_association', JSON.stringify(eduLangForm.professionalassociations));
    fromData.append('publication', JSON.stringify(eduLangForm.publication));   
    fromData.append('conference_details', JSON.stringify(eduLangForm.conferencedetails));
    fromData.append('bar_admission', JSON.stringify(eduLangForm.baradmission));
    /** Add Education Form */
    
    fromData.append('lawyer_firm', JSON.stringify(firmForm));

    fromData.append('cost', costForm.hourly_rates);
    fromData.append('consultation_time', costForm.consultation_time);
    fromData.append('consultation_fees', costForm.consultation_fees);

    var paymentMeth = [];
    var payLength = localStorage.getItem('payLength')
    for (var i = 0; i < costForm.payment_methods.length; i++) {
      paymentMeth.push(costForm.payment_methods[i].id);
    }
    fromData.append('payment_methods', JSON.stringify(paymentMeth));

    fromData.append('profile_image', ImageFile);

    // let userRole="";
    // let userlenght=localStorage.getItem('roles_length');

    // if( userlenght == null || userlenght == undefined){
    //   fromData.append('password', overviewForm.password);
    // }else if(userlenght == '1'){
    //   localStorage.getItem('roles')
    //   // fromData.append('user_id', localStorage.getItem('user_id'));
    // }
   
   
    if (localStorage.getItem('user_id') === null || localStorage.getItem('user_id') === undefined || localStorage.getItem('user_id') === 'undefined') {
      fromData.append('password', overviewForm.password);
    } else {
      fromData.append('user_id', localStorage.getItem('user_id'));
    }
   
    return this.http.post(this.baseURL + 'add_lawyer_profile', fromData, this.options);
  }

  submitLawyercollectedreview(datacollectionarr,emailteamplatecontent){
    this.getToken();
    //alert('dataArrayValue : '+JSON.stringify(datacollectionarr));
    const fromData: FormData = new FormData();
    fromData.append('data',JSON.stringify(datacollectionarr));
    fromData.append('content',emailteamplatecontent);

    return this.http.post(this.baseURL + 'user/send_email_for_review', fromData, this.options)
  }

  getLawyeremailTempService(){
    this.getToken();

    return this.http.get(this.baseURL + 'get_email_template_collect_review', this.options)
  }

  submitLawyerreview(partreviewval,wholeviewval,reviewerval,reviewid) {

    this.getToken();
    
    const fromData: FormData = new FormData();
    fromData.append('question_one', partreviewval);
    fromData.append('question_two', wholeviewval);
    fromData.append('question_three', reviewerval);
    fromData.append('review_id', reviewid);

    return this.http.post(this.baseURL + 'user/flag_review', fromData, this.options)

  }

  updateLawyer(overviewForm, caseForm, expCertForm, eduLangForm, firmForm, costForm, ImageFile: File) {
    this.getToken();

    const fromData: FormData = new FormData();
    fromData.append('full_name', overviewForm.full_name);
    fromData.append('total_experience', overviewForm.work_experience);
    fromData.append('also_known_as', overviewForm.also_known_as);
    fromData.append('background_check', overviewForm.background_check == true ? 'yes' : 'no');
    
    fromData.append('pro_bona_services', eduLangForm.pro_bona_services);
    fromData.append('virtual_conversation', eduLangForm.virtual_conversation);
    fromData.append('open_for_business', eduLangForm.open_for_business);
    var AreaArray = [];
    var pracLength: any = localStorage.getItem('pracLength')
    console.log(pracLength)
    console.log(overviewForm)
    for (var i = 0; i <= overviewForm.practiceArea.length - 1; i++) {//charu
      AreaArray.push({"practice_area_id":overviewForm.practiceArea[i].practice_area_id,"percentage":overviewForm.practiceArea[i].practice_area_percentage});//charu
    }
    console.log(AreaArray)
    fromData.append('practice_area', JSON.stringify(AreaArray));

    fromData.append('email', overviewForm.email);
    fromData.append('mobile_number', overviewForm.mobile_number);
    fromData.append('gender', overviewForm.gender);
    fromData.append('dob', overviewForm.dob);
    fromData.append('website', overviewForm.website);
    fromData.append('fb_url', overviewForm.fb_url);
    fromData.append('twitter_url', overviewForm.twitter_url);
    fromData.append('linkedin_url', overviewForm.linkedin_url);
    fromData.append('description', overviewForm.description);

    var result = [];
    result.push({ "title": caseForm.title, "description": caseForm.description, "from_year": caseForm.from_year, "to_year": caseForm.to_year });

    var result1 = [];
    result1.push({ "title": expCertForm.title, "experience_at": expCertForm.experience_at, "from_year": expCertForm.from_year, "to_year": expCertForm.to_year });

    var result2 = [];
    result2.push({ "award_name": expCertForm.award_name, "year": expCertForm.year });

    var result3 = [];
    result3.push({ "degree": eduLangForm.degree, "university": eduLangForm.university, "starting_year": eduLangForm.starting_year, "passing_year": eduLangForm.passing_year });

    var result4 = [];
    result4.push({ "language_id": eduLangForm.language_id, "proficiency": eduLangForm.proficiency });

    var result5 = [];
    result5.push({ "firm_name": firmForm.firm_name, "firm_address": firmForm.firm_address, "latitude": firmForm.latitude, "longitude": firmForm.longitude, "mobile_number": firmForm.mobile_number, "fax": firmForm.fax });

    fromData.append('lawyer_case', JSON.stringify(caseForm));
    fromData.append('work_experience', JSON.stringify(expCertForm['experience']));
    fromData.append('lawyer_awards', JSON.stringify(expCertForm['certificates']));
    fromData.append('education', JSON.stringify(eduLangForm['educations']));
    fromData.append('languages', JSON.stringify(eduLangForm['languages']));
    fromData.append('lawyer_firm', JSON.stringify(firmForm));


    fromData.append('cost', costForm.hourly_rates);
    fromData.append('consultation_time', costForm.consultation_time);
    fromData.append('consultation_fees', costForm.consultation_fees);

    var paymentMeth = [];
    var payLength: any = localStorage.getItem('payLength')
    console.log(costForm);
    console.log(payLength);
    for (var i = 0; i <= costForm.payment_methods.length - 1; i++) {
      paymentMeth.push(costForm.payment_methods[i].id);
    }
    fromData.append('payment_methods', JSON.stringify(paymentMeth));

    if(ImageFile){
      fromData.append('profile_image', ImageFile);
    }
    else{
      fromData.append('profile_image', "");
    }

    return this.http.post(this.baseURL + 'user/update_lawyer_profile', fromData, this.options)
  }

  // getLawyerList() {
  //   return this.http.get(this.baseURL + 'lawyer_listing')
  //   .subscribe (res => {
  //   // tslint:disable-next-line: no-string-literal
  //     this.lawyerList = res['response_data'];
  //     // tslint:disable-next-line: no-string-literal
  //     console.log(this.lawyerList);
  //   });
  // }
  emptyarr=[];
  getLawyerList(address, lawyers, searchbycountry, profiletypeList, genderList, experienceList, maxDistance, clientsatisfaction, languagespoken, practiceArea,state) {
    this.getToken();
    const fromData: FormData = new FormData();
    
    fromData.append('search_state', state);
    fromData.append('search_city', address);
    fromData.append('search_name', lawyers);
    fromData.append('search_country', searchbycountry);
    fromData.append('search_membership', JSON.stringify(profiletypeList));
    fromData.append('gender', genderList);
    fromData.append('min_experience', experienceList[0]);
    fromData.append('max_experience', experienceList[1]);
    fromData.append('max_distance', maxDistance);
    fromData.append('rating', clientsatisfaction);
    fromData.append('search_language', languagespoken);
    fromData.append('search_practice_area', practiceArea);
    return this.http.post(this.baseURL + 'lawyer_listing', fromData, this.options)
      .subscribe(res => {
        //alert('message : '+res['message']);
        this.lawyerMsg = res['message'];

        if (res['status'] == "ERROR") {
          this.lawyerList = this.emptyarr; //res['response_data']
        }
        else {
          this.lawyerList = res['response_data']['data'];

          for (let i = 0; i < this.lawyerList.length; i++) {
            if(this.lawyerList[i].package_name.package_name == "Diamond Package"){
              this.lawyerList[i].package_name.package_image = "assets/images/listing-diamond.svg"
              this.lawyerList[i].package_name.package_tick = "assets/images/Verified_Diamond.svg"
             
            }

            else  if(this.lawyerList[i].package_name.package_name == "Standard Package"){
              this.lawyerList[i].package_name.package_image = ""
            } 

            else  if(this.lawyerList[i].package_name.package_name == "Elite Package"){
              this.lawyerList[i].package_name.package_image = "assets/images/listing-elite.svg"
              this.lawyerList[i].package_name.package_tick = "assets/images/Verified_Elite.svg"
            } 
          
            
          }

          console.log("this.lawyerList",this.lawyerList);
           console.log('this.clientsatisfaction', clientsatisfaction);
          if (clientsatisfaction) {
            this.lawyerList = this.lawyerList.filter(lawyer => {
              // console.log(clientsatisfaction, Math.floor(lawyer.average_ratings));
              
              return Math.floor(lawyer.average_ratings) === clientsatisfaction && lawyer.average_ratings < (clientsatisfaction + 1)
            })
          }
        }
        this.lawyerList.forEach((lawyer) => {
          lawyer.all_reviews.forEach((law) => {
            law['readMore'] = true;
          })
        })
        this.lawyerList.forEach((lawyer) => {
          lawyer['readMoreDes'] = true;
        })
        
      });
  }
  getSubscription() {
    return this.http.get(this.baseURL + 'get_membership_plans')
      .subscribe(res => {
        var result = res['response_data'];
        this.StandardPlan = [result[0]];
        this.StandardPackage = result[0].package_details

        this.ElitePlan = [result[1]];
        this.ElitePackage = result[1].package_details

        this.DiamondPlan = [result[2]];
        this.DiamondPackage = result[2].package_details
      });
  }

  addFavourites(form) {
    this.getToken();

    const fromData: FormData = new FormData();
    fromData.append('lawyer_id', form.lawyer_id);

    return new Promise(resolve => {
      return this.http.post(this.baseURL + 'user/add_to_favourite', fromData, this.options)
        .subscribe(res => {
          this.addFAV = res;
          if (this.addFAV && this.addFAV.status == 'SUCCESS') {
            this.getLawyerDetails(form.lawyer_id);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Favorites Added Success',
              showConfirmButton: false,
              timer: 800,
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Favorites Failed to Add',
              showConfirmButton: false,
              timer: 800,
            });
          }
          resolve();
        }, err => {
          resolve();
        });
    });
  }

  removeFavourites(form) {
    this.getToken();

    const fromData: FormData = new FormData();
    fromData.append('lawyer_id', form.lawyer_id);

    return new Promise(resolve => {
      return this.http.post(this.baseURL + 'user/remove_from_favourite', fromData, this.options)
        .subscribe(res => {
          this.removeFAV = res;
          if (this.removeFAV && this.removeFAV.status == 'SUCCESS') {
            this.getLawyerDetails(form.lawyer_id);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Favorites Removed Success',
              showConfirmButton: false,
              timer: 800,
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Favorites Failed to Remove',
              showConfirmButton: false,
              timer: 800,
            });
          }
          resolve();
        }, err => {
          resolve();
        });
    });
  }

  endorseLawyer(form) {
    this.getToken();

    const fromData: FormData = new FormData();
    fromData.append('lawyer_id', form.lawyer_id);
    fromData.append('relationship', form.relationship);
    fromData.append('description', form.description);

    return this.http.post(this.baseURL + 'user/endorse_lawyer', fromData, this.options)
      .subscribe((res: any) => {
        if (res && res.status == 'SUCCESS') {
          this.getLawyerDetails(form.lawyer_id);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Endorsed Success',
            showConfirmButton: false,
            timer: 800,
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Endorsed Failed',
            showConfirmButton: false,
            timer: 800,
          });
        }
      });
  }

  getNotification() {
    this.getToken();

    return this.http.get(this.baseURL + 'user/get_notifications', this.options)
      .subscribe(res => {
        this.getNotificationList = res['response_data'];
        this.notiMsg = res['message'];
      });
  }

  deleteNotification(id) {
    this.getToken();

    const fromData: FormData = new FormData();
    fromData.append('id', id);

    return this.http.post(this.baseURL + 'user/delete_notifications', fromData, this.options)
      .subscribe(res => {
        this.deleteNotList = res['message'];
        this.getNotification();
      });
  }

  deleteBlog(id) {
    this.getToken();
    return this.http.post(this.baseURL + 'user/blogs_delete', { 'blog_id': id }, this.options);
  }


  getCMSpages(slug) {

    return this.http.get(this.baseURL + 'cms/' + slug)
      .subscribe(res => {
        this.CmsPages = res['response_data']['page_description'];
      });
  }

  submitAskQuestion(form, googleAddress) {

    this.getToken();

    // var token = sessionStorage.getItem('access_token');

    // if(token == '' ){

    // }

    for (var i = 0; i < googleAddress.address_components.length; i++) {
      if (googleAddress.address_components[i].types[0] == 'country') {
        // console.log(address.address_components[i].long_name);
        this.country = googleAddress.address_components[i].long_name;                  //for country name
      }
      if (googleAddress.address_components[i].types[0] == 'administrative_area_level_1') {
        //  console.log(address.address_components[i].long_name);                
        this.state = googleAddress.address_components[i].long_name;                 //for state name

      }
      if (googleAddress.address_components[i].types[0] == 'locality') {
        // console.log(address.address_components[i].long_name);
        this.city = googleAddress.address_components[i].long_name;                  //for city name
      }
    }
    this.location = googleAddress.formatted_address;
    this.latitude = googleAddress.geometry.location.lat();
    this.longitude = googleAddress.geometry.location.lng();

    this.practiceLength = form.value.practice_area.length;

    var AreaArray = [];
    for (var i = 0; i < this.practiceLength; i++) {
      AreaArray.push(form.value.practice_area[i]._id);
    }

    const fromData: FormData = new FormData();
    fromData.append('question', form.value.description);
    fromData.append('practice_area_id', JSON.stringify(AreaArray));
    fromData.append('location', this.location);
    fromData.append('latitude', this.longitude);
    fromData.append('longitude', this.longitude);
    fromData.append('city', this.city);
    fromData.append('country', this.country);
    fromData.append('title', form.value.question);

    this.http.post(this.baseURL + 'user/submit_question', fromData, this.options)
      .subscribe(res => {
        this.askStatus = res['message'];

        if (this.askStatus == 'Question submitted successfully.') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Question Asked successfully',
            showConfirmButton: false,
            timer: 500,
          });
          form.reset();

          $("#practice_area option:selected").removeAttr("selected");
          var spans = $('.selected-item');
          spans.hide();
          window.scrollTo(0, 0);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong',
            showConfirmButton: false,
            timer: 500,
          });
          form.reset();
          window.scrollTo(0, 0);
          var spans = $('.selected-item');
          spans.hide();
        }
      });
  }

  getQuestions(user_type, practice_area_id) {
    this.getToken();
    const fromData: FormData = new FormData();
    fromData.append('user_type', user_type);
    if (practice_area_id != undefined && practice_area_id != '') {
      this.practiceList = JSON.stringify(practice_area_id);
      //alert(this.practiceList);
      fromData.append('practice_area_id', this.practiceList);
    }

    return this.http.post(this.baseURL + 'user/get_question', fromData, this.options)
      .subscribe(res => {
        this.getQuestionList = res['response_data'];
        this.questionMsg = res['message'];
      });
  }
  //Harsh
  getAllQuestions(googleAddress, practice_area_id, keyword) {
    const fromData: FormData = new FormData();

    if (googleAddress != undefined && googleAddress != '') {
      fromData.append('city', googleAddress);
    }

    if (practice_area_id != undefined && practice_area_id != '') {
      this.practiceList = JSON.stringify(practice_area_id);
      fromData.append('practice_area_id', this.practiceList);
    }

    if (keyword != undefined && keyword != '') {
      fromData.append('keyword', keyword);
    }

    return this.http.post(this.baseURL + 'get_question_listing', fromData, this.options)
      .subscribe(res => {
        this.getAllQuestionList = res['response_data'];
        this.AllquestionMsg = res['message'];
      });
  }

  questionDetails() {
    var question_id = sessionStorage.getItem('question_id')
    const fromData: FormData = new FormData();
    fromData.append('question_id', question_id);
    return this.http.post(this.baseURL + 'get_question_details', fromData, this.options)
      .subscribe(res => {
        this.questionDetailsData = res['response_data'];
        this.questionDetailsMsg = res['status'];
        // this.questionDetailsSimilarData   =  res['response_data']['similar_posts'];
      });
  }

  getprofiletypelist() {
    return this.http.get(this.baseURL + 'get_membership_plans')
      .subscribe(res => {
        this.profiletypelist = res['response_data'];
        this.profiletypelist = this.profiletypelist.sort((a: any, b: any) =>
        a.package_name.localeCompare(b.package_name)
      );
        console.log(" service.profiletypelist", this.profiletypelist);
        

      });
  }

  getlanguage() {
    return this.http.get(this.baseURL + 'get_languages')
      .subscribe(res => {
        this.languagelist = res['response_data'];
      });
  }

  TranscationHistory(fromData) {
    this.getToken();
    return this.http.post(this.baseURL + 'user/transaction_listing', fromData, this.options)
      .subscribe(res => {
        this.getTranscationHistory = res['response_data'];
        this.transmessage = res['message'];
      });
  }

  getLawyerListingDetails(id,rewiewFilter=0) {//charu

    this.getToken();
    // var id = localStorage.getItem('user_id')  

    return new Promise(resolve => {
      this.http.get(this.baseURL + 'get_lawyer_details' + '?id=' + id + '&review='+ rewiewFilter, this.options)
        .subscribe(res => {
          var result = res['response_data'];
          if (result.reviews) {
            result.reviews.forEach((data) => {
              data['readMore'] = true;
            })
          }

          this.lawyerDetailsList = [result]
          this.facebookLink = this.lawyerDetailsList[0].social_links.fb_url
          this.linkedinLink = this.lawyerDetailsList[0].social_links.linkedin_url
          this.twitterLink = this.lawyerDetailsList[0].social_links.twitter_url

          this.practiceArea = result.practice_area
          this.lawyerCase = result.lawyer_cases
          this.lawyerExperience = result.lawyer_experience
          this.lawyerAwards = result.lawyer_awards
          this.lawyerAcademics = result.lawyer_academics
          this.lawyerEndorsement = result.lawyer_endorsement
          this.lawyerLanguages = result.lawyer_languages
          this.lawyerFirm = result.lawyer_firm

          this.paymentMethod = [];
          this.paymentmethods.forEach(meth => {
            if (result.lawyer_payment_methods.filter(res => { return res.method_name === meth.id }).length > 0)
              this.paymentMethod.push(meth);
          })
          console.log("Payment", this.paymentMethod);


          // dob
          var dob = res['response_data'].dob;
          const date = new Date();
          const birthDate = new Date(dob)

          this.userAge = date.getFullYear() - birthDate.getFullYear();
          resolve();
        }, err => {
          resolve();
        });
    });
  }

  EnquiryList(practice_area_id) {
    this.getToken();
    const fromData: FormData = new FormData();
    if (practice_area_id != undefined && practice_area_id != "") {
      this.practiceListId = JSON.stringify(practice_area_id);
      fromData.append('practice_areas', this.practiceListId);
    }
    return this.http.post(this.baseURL + 'user/inquiry_listing', fromData, this.options)
      .subscribe(res => {
        this.getEnquiryList = res['response_data'];
        this.enquirymessage = res['message'];
        this.status = res['status'];
      });
    // alert(this.enquirymessage);
  }

  getBlogCategory() {
    return this.http.get(this.baseURL + 'blogs/blog_category')
      .subscribe(res => {
        this.BlogCategory = res['response_data'];
        console.log(this.BlogCategory,"BlogCategory");
      });
  }
  
  getBlogCategoryaddedit() {//charu
    return this.http.get(this.baseURL + 'blogs/blog_category')
     
  }
  getBlogListing(id) {//charu
    const fromData: FormData = new FormData();
    fromData.append('category_id', id);
    return this.http.post(this.baseURL + 'blogs/blog_listing', fromData)
      .subscribe(res => {
        this.BlogListing = res['response_data'];
        this.BlogListingMsg = res['message'];
        console.log(this.BlogListing);
      });
  }

  blogDetails() {
    var blog_id = sessionStorage.getItem('blog_id')
    const fromData: FormData = new FormData();
    fromData.append('blog_id', blog_id);
    return this.http.post(this.baseURL + 'blogs/blog_details', fromData)
      .subscribe(res => {
        this.blogDetailsData = res['response_data'];
        this.blogDetailsMsg = res['status'];
        this.blogDetailsComments = this.blogDetailsData.get_comments;

      });
  }

  storeBlogComments(form, blog_id) {

    this.getToken();

    const fromData: FormData = new FormData();

    fromData.append('comments', form.value.message);
    fromData.append('blog_id', blog_id);

    this.http.post(this.baseURL + 'blogs/store_comments', fromData, this.options)
      .subscribe(res => {
        this.commentStatus = res['message'];

        if (this.commentStatus == 'Comments stored successfully.') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Comments stored successfully.',
            showConfirmButton: false,
            timer: 500,
          });
          form.reset();
          window.scrollTo(0, 0);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong',
            showConfirmButton: false,
            timer: 500,
          });
          form.reset();
          window.scrollTo(0, 0);

        }
      });
  }

  lawyerreview(lawyerid, description, rating, consultation, recommend, anonymous) {
    const fromData: FormData = new FormData();
    fromData.append('to_id', lawyerid);
    fromData.append('review', description);
    fromData.append('rating', rating);
    fromData.append('review_type', consultation);
    fromData.append('recommended', recommend);
    fromData.append('anonymous', anonymous);
    return this.http.post(this.baseURL + '/user/submit_review', fromData)
  }

  submitadduserreview(body,headers){
    //this.getToken();
    return this.http.post(this.baseURL + 'submit_external_review', body);
  }

  submitNewsletter(newsletter) {
    const fromData: FormData = new FormData();
    fromData.append('email', newsletter.value.email);

    return this.http.post(this.baseURL + 'subscribe_to_newsletter', fromData)
      .subscribe(res => {
        this.newsletterStatus = res['message'];

        if (this.newsletterStatus == 'You have subscribed to newsletter successfully.') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'You have subscribed to newsletter successfully.',
            showConfirmButton: false,
            timer: 500,
          });
          newsletter.reset();
        } else if (this.newsletterStatus == ' You have already subscribed to newsletter.') {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'You have already subscribed to newsletter.',
            showConfirmButton: false,
            timer: 500,
          });
          newsletter.reset();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong.',
            showConfirmButton: false,
            timer: 500,
          });
          newsletter.reset();
        }
      });
  }

  sendEnquiry(addData): Observable<any> {
    this.getToken();
    return this.http.post(this.baseURL + 'user/submit_inquiry', addData, this.options);
  }

  sendReview(addData): Observable<any> {
    this.getToken();
    return this.http.post(this.baseURL + 'user/submit_review', addData, this.options);
  }

  getReview(): Observable<any> {
    this.getToken();
    return this.http.post(this.baseURL + 'user/get_reviews', null, this.options);
  }
  social_login(Name, Email_ID, From) {
    return this.http.post(this.baseURL + 'social_login', {
      full_name: Name,
      email: Email_ID || 'empty',
      login_from: From || 'empty'
    })
  }

  getDashboard(form) {
    this.getToken();
    const fromData: FormData = new FormData();
    fromData.append('start_date', form.start_date);
    fromData.append('end_date', form.end_date);
    return this.http.post(this.baseURL + 'user/get_dashboard_data', fromData, this.options)
  }

  //**charu Start */
  // https://lawtally.co/api/v1/add_visit_count
  // "description": "\"call_count\",\"website_count\",\"linkedin_count\",\"facebook_count\",\"twitter_count\",\"map_count\"",
						
  addUseActivity(form){
  const fromData: FormData = new FormData();
// fromData.append('website_count', form.website_count || 0);
    // fromData.append('linkedin_count', form.linkedin_count || 0);
    // fromData.append('facebook_count', form.facebook_count || 0);
    // fromData.append('twitter_count', form.twitter_count || 0);
    // fromData.append('map_count', form.map_count || 0);
    fromData.append('lawyer_id', form.lawyer_id);
    fromData.append('title', form.title);
    
    return this.http.post(this.baseURL + 'add_visit_count', fromData, this.options)

  }
  //***charu End */
  getHomeListing(city) {
    return this.http.get(this.baseURL + `get_home_listing?City=${city ? city : ''}`)
  }

  claimProfileListing(filter) {
    return this.http.get(this.baseURL + 'claim_profile_listing', { params: filter })
  }

  claimProfile(data) {
    return this.http.post(this.baseURL + 'claim_profile', data)
  }

  checkClaimProfileToken(data) {
    return this.http.post(this.baseURL + 'check_claim_profile_token', data)
  }

  getBlogs() {
    this.getToken();
    return this.http.get(this.baseURL + 'user/user_blogs_listing', this.options)
  }

  addBlogs(addData) {
    this.getToken();
    return this.http.post(this.baseURL + 'user/store_blogs', addData, this.options)
  }

  editBlogs(editData) {
    this.getToken();
    return this.http.post(this.baseURL + 'user/update_blogs', editData, this.options)
  }

  submitAnswer(addData) {
    this.getToken();
    return this.http.post(this.baseURL + 'user/submit_answer', addData, this.options)
  }

  shareProfile(addData) {
    return this.http.post(this.baseURL + 'share_profile', addData)
  }

  ReviewListing() {
    this.getToken(); 
    return this.http.post(this.baseURL + 'user/send_email_for_review_listing', null, this.options)
      .subscribe(res => {
        this.getReviewListing= res['response_data']['listing_data'];
        this.Reviewmessage= res['message'];
        this.Invitation_Cnt=res['response_data']['invitation_delivered'];
        this.Verified_Review_Cnt=res['response_data']['verified_reviews'];
        this.LawTally_Score=res['response_data']['lawtally_score'];

      });
  }

  public loading = false;
  sendmails(final_arr,emailteamplatecontent) {
    this.getToken();
    const fromData: FormData = new FormData();

    //var finalDataArr = final_arr.replace(/\\/g, "");
    //var finalDataArr = final_arr.replace(new RegExp("\\\\", "g"), "");

    //alert(JSON.stringify(final_arr));

    fromData.append('data', JSON.stringify(final_arr));
    fromData.append('content',emailteamplatecontent);

    return this.http.post(this.baseURL + 'user/send_email_for_review', fromData, this.options).subscribe(res => {
      this.emailstatus = res['status'];
      this.loading = false;
      if (this.emailstatus === 'SUCCESS') {

        Swal.fire("Success", "Records Imported Successfully", "success");
      }
      else {
        Swal.fire("Oops!", "Import Failed", "error");
      }
    });
  }
  //***Charu Start */
  postBlogDta(blog_id) {
    this.getToken();
    const fromData: FormData = new FormData();
    fromData.append('blog_id', blog_id);
 
    return this.http.post(this.baseURL + 'blogs/blog_details',fromData,this.options)
  }

  //**Charu End */
}

