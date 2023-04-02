import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';
import { NotebooksComponent } from './components/notebooks/notebooks.component';
import { PagesComponent } from './components/pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: NotebooksComponent,
    children: [
      { path: ':notebookId', component: PagesComponent, children: [{ path: ':pageId', component: EditorComponent }] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
