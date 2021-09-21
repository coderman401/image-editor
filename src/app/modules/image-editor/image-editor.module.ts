// modules
import { NgModule } from '@angular/core';
import { ImageEditorRoutingModule } from './image-editor-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// components
import { CropImageComponent } from './components/crop-image/crop-image.component';
import { FilterImageComponent } from './components/filter-image/filter-image.component';
import { ImageEditorComponent } from './image-editor.component';


@NgModule({
    declarations: [
        CropImageComponent,
        FilterImageComponent,
        ImageEditorComponent,
    ],
    imports: [
        ImageEditorRoutingModule,
        SharedModule,
    ]
})

export class ImageEditorModule { }
