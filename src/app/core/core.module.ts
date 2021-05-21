import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SharedModule } from '../shared/shared.module';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';

@NgModule({
  declarations: [NavComponent, ScrollToTopComponent],
  imports: [CommonModule, SharedModule],
  exports: [NavComponent, ScrollToTopComponent],
})
export class CoreModule {}
