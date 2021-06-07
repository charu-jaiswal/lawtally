import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';

import { LawTallyComponent } from './LawTally.component';
import { ListingComponent } from './listing/listing.component';
import { ProfileDetailsComponent, SafePipe } from './profile-details/profile-details.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BlogComponent } from './blog/blog.component';
import { NotificationComponent } from './notification/notification.component';
import { ReviewComponent } from './review/review.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { MainFooterComponent } from './common/main-footer/main-footer.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DashboardHeaderComponent } from './common/dashboard-header/dashboard-header.component';
import { MainHeaderComponent } from './common/main-header/main-header.component';
import { AddLawyerComponent } from './add-lawyer/add-lawyer.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { SetPasswordComponent } from './setPassword/setPassword.component';
import { EditLawyerComponent } from './edit-lawyer/edit-lawyer.component';
import { SubscriptionPlanComponent } from './subscription-plan/subscription-plan.component';
import { WorkConsumerComponent } from './work-consumer/work-consumer.component';
import { WorkLawyerComponent } from './work-lawyer/work-lawyer.component';
import { NoEditProfileComponent } from './noEditProfile/noEditProfile.component';
import { ReceivedQuestionsComponent } from './received-questions/received-questions.component';
import { AskedQuestionsComponent } from './asked-questions/asked-questions.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyAndPolicyComponent } from './privacy-and-policy/privacy-and-policy.component';
import { AskFreeQuestionComponent } from './ask-free-question/ask-free-question.component';
import { QuestionsOnBusinessComponent } from './questions-on-business/questions-on-business.component';
import { QuestionsOnBusinessDetailsComponent } from './questions-on-business-details/questions-on-business-details.component';
import { EnquiryFormComponent } from './enquiry-form/enquiry-form.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared.module';
import { ClaimComponent } from './claim/claim.component';
import { ClaimProfileComponent } from './claim-profile/claim-profile.component';
import { ClaimMethodComponent } from './claim-method/claim-method.component';
import { ManageBlogsComponent } from './manage-blogs/manage-blogs.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { ShareFormComponent } from './share-form/share-form.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { EnquiryDetailsComponent } from './enquiry-details/enquiry-details.component';
import { LawyerEnquiryFormComponent } from './lawyer-enquiry-form/lawyer-enquiry-form.component';
import { AddblogComponent } from './addblog/addblog.component';
import { CollectReviewsComponent } from './collect-reviews/collect-reviews.component';
import { CollectReviewListingComponent } from './collect-review-listing/collect-review-listing.component';
import { UserAddreviewComponent } from './user-addreview/user-addreview.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MenuListingSearchComponent } from './menu-listing-search/menu-listing-search.component';
import { HomeListingSearchComponent } from './home-listing-search/home-listing-search.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';

const routes: Routes = [
  {
    path: 'lawyer-directory',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'set-password/:token', component: SetPasswordComponent },
      { path: 'signup', component: SignUpComponent },
      // { path: 'listing', component: ListingComponent, canActivate: [AuthGuard], },
      { path: 'listing', component: ListingComponent, },
      { path: 'listing-details', component: ListDetailsComponent, },
      //{ path: 'listing-details',component:ListDetailsComponent, canActivate: [AuthGuard], },
      { path: 'listing-details-normal-profile', component: ProfileDetailsComponent, },
      // { path: 'listing-details-normal-profile', component: ProfileDetailsComponent, canActivate: [AuthGuard], },
      { path: 'user-profile', component: NoEditProfileComponent, canActivate: [AuthGuard], },
      { path: 'add-lawyer', component: AddLawyerComponent, },
      { path: 'edit-lawyer', component: EditLawyerComponent, canActivate: [AuthGuard], },
      { path: 'subscription-plan', component: SubscriptionPlanComponent },
      { path: 'work-consumer', component: WorkConsumerComponent },
      { path: 'work-lawyer', component: WorkLawyerComponent },

      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
      { path: 'blog', component: BlogComponent },
      { path: 'blog-details', component: BlogDetailsComponent },
      { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard], },
      { path: 'reviews', component: ReviewComponent, canActivate: [AuthGuard], },
      { path: 'enquiry', component: EnquiryComponent, canActivate: [AuthGuard], },
      { path: 'transaction-history', component: TransactionHistoryComponent, canActivate: [AuthGuard], },
      { path: 'asked-questions', component: AskedQuestionsComponent, canActivate: [AuthGuard], },
      { path: 'received-questions', component: ReceivedQuestionsComponent, canActivate: [AuthGuard], },
      { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
      { path: 'privacy-and-policy', component: PrivacyAndPolicyComponent },
      { path: 'ask-free-question', component: AskFreeQuestionComponent, canActivate: [AuthGuard], },
      { path: 'see-all-questions', component: QuestionsOnBusinessComponent },
      { path: 'question-details', component: QuestionsOnBusinessDetailsComponent },
      { path: 'cliam-profile', component: ClaimComponent },
      { path: 'cliam-profile-details', component: ClaimProfileComponent },
      { path: 'cliam-method', component: ClaimMethodComponent },
      //**charu Start*/
      { path: 'manage-blog', component: ManageBlogsComponent },
      { path: 'edit-blog/:id', component: ManageBlogsComponent },
    
      //**charu End */
      { path: 'blog-list', component: BlogListComponent },
      { path: 'enquiry-details', component: EnquiryDetailsComponent },
      { path: 'lawyer-enquiry', component: LawyerEnquiryFormComponent },
      { path: 'addblog', component: AddblogComponent },
      { path: 'collect-review', component: CollectReviewsComponent, canActivate: [AuthGuard]},
      { path: 'collect-review-listing', component: CollectReviewListingComponent, canActivate: [AuthGuard]},
      { path: 'user-addreview/:id', component: UserAddreviewComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'menu-listing-search', component: MenuListingSearchComponent },
      { path: 'home-listing-search', component: HomeListingSearchComponent }
    ]
  }
];
// ,{useHash:true}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    NgbModule,
    GooglePlaceModule,
    AngularEditorModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      backdropBackgroundColour: 'rgba(0,0,0,0.0)',
      backdropBorderRadius: '4px',
      primaryColour: '#ff3b4b',
      // secondaryColour: '#FF6536',
      // tertiaryColour: '#FFD039'
    }),
    NgxPermissionsModule.forRoot(),
    ChartsModule,
    SharedModule,
    NgxPayPalModule,
    ImageCropperModule      
  ],
  declarations: [
    LawTallyComponent,
    SafePipe,
    ListingComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    DashboardComponent,
    ListDetailsComponent,
    SignUpComponent,
    BlogComponent,
    BlogDetailsComponent,
    ProfileDetailsComponent,
    NoEditProfileComponent,
    NotificationComponent,
    ReviewComponent,
    EnquiryComponent,
    TransactionHistoryComponent,
    MainFooterComponent,
    BlogDetailsComponent,
    SidebarComponent,
    SubscriptionPlanComponent,
    DashboardHeaderComponent,
    MainHeaderComponent,
    AddLawyerComponent,
    EditLawyerComponent,
    WorkConsumerComponent,
    WorkLawyerComponent,
    ReceivedQuestionsComponent,
    AskedQuestionsComponent,
    TermsAndConditionsComponent,
    PrivacyAndPolicyComponent,
    AskFreeQuestionComponent,
    QuestionsOnBusinessComponent,
    QuestionsOnBusinessDetailsComponent,
    EnquiryFormComponent,
    ReviewFormComponent,
    ClaimComponent,
    ClaimProfileComponent,
    ClaimMethodComponent,
    ManageBlogsComponent,
    BlogFormComponent,
    ShareFormComponent,
    EnquiryDetailsComponent,
    LawyerEnquiryFormComponent,
    AddblogComponent,
    CollectReviewsComponent,
    CollectReviewListingComponent,
    UserAddreviewComponent,
    BlogListComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    MenuListingSearchComponent,
    HomeListingSearchComponent,
    EditBlogComponent,
 
  ],
  providers: [AuthGuard, DatePipe, MatTabsModule],
  exports: [RouterModule]
})
export class LawTallyModule { }
