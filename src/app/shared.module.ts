import { NgModule } from '@angular/core';;
import { AppComponent } from './app.component';
import { ModalComponent, ResetDirective } from './LawTally/modal/modal.component';
import { ModalService } from './core/modal.service';
import { CommonModule } from '@angular/common';

@NgModule({
   declarations: [
      ModalComponent,
      ResetDirective,],
   imports: [
      CommonModule
   ],
   exports: [
      ModalComponent,
      ResetDirective,
   ],
   providers: [ModalService],
   bootstrap: [
      AppComponent
   ]
})
export class SharedModule { }
