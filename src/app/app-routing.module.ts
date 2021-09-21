import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/process',
        pathMatch: 'full'
    },
    {
        path: 'process',
        loadChildren: () => import('./modules/image-editor/image-editor.module').then(m => m.ImageEditorModule),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
