// modules
import { CommonModule } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageProcessRoutingModule } from './image-process-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

// components
import { ButtonComponent } from 'src/app/components/core/button/button.component';
import { CropImageComponent } from 'src/app/components/crop-image/crop-image.component';
import { FilterImageComponent } from 'src/app/components/filter-image/filter-image.component';
import { FilterListComponent } from 'src/app/components/core/filter-list/filter-list.component';
import { ImageProcessComponent } from './image-process.component';


@NgModule({
    declarations: [
        ButtonComponent,
        CropImageComponent,
        FilterImageComponent,
        FilterListComponent,
        ImageProcessComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ImageCropperModule,
        ImageProcessRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
    ]
})

export class ImageProcessModule { }
