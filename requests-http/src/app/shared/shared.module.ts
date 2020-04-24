import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [
    AlertModalComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertModalComponent
  ],
  // entryComponents são components que são instanciados em tempo de execução
  entryComponents: [
    AlertModalComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule { }
