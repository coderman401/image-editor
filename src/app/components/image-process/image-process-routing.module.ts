// modules
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components
import { ImageProcessComponent } from './image-process.component';

const routes: Routes = [{ path: '', component: ImageProcessComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImageProcessRoutingModule { }
