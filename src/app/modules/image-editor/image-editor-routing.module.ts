// modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components
import { ImageEditorComponent } from './image-editor.component';

const routes: Routes = [{ path: '', component: ImageEditorComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImageEditorRoutingModule { }
