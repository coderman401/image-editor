// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MaterialModule } from './dependencies/material.module';
// components
import { ButtonComponent } from './components/button/button.component';
import { FilterListComponent } from './components/filter-list/filter-list.component';


@NgModule({
    declarations: [ButtonComponent, FilterListComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ImageCropperModule,
        MaterialModule,
    ],
    exports: [
        // components
        ButtonComponent,
        FilterListComponent,
        // modules,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ImageCropperModule,
        MaterialModule,
    ]
})
export class SharedModule { }
