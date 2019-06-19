import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDelete, IconEdit2, IconSearch, IconEye } from 'angular-feather';

const icons = [
  IconDelete,
  IconEdit2,
  IconSearch,
  IconEye
];

@NgModule({
  declarations: [],
  exports: icons,
  imports: [
    CommonModule
  ]
})
export class IconsModule { }
