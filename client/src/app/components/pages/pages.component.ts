import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page.model';
import { ApiService } from 'src/app/services/api.service';
import { ModalTextInputComponent } from '../modal-text-input/modal-text-input.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  notebookId: number = 0;
  pages: Page[] | null;

  constructor(
    private readonly _apiService: ApiService,
    private readonly _route: ActivatedRoute,
    private readonly _dialog: MatDialog
  ) {
    this._route.params.subscribe(async (params) => {
      this.notebookId = params['notebookId'];
      this.loadPages();
    });
  }

  async loadPages() {
    this.pages = await this._apiService.getPages(this.notebookId);
  }

  create() {
    const ref = this._dialog.open(ModalTextInputComponent, {
      autoFocus: false,
      data: {
        title: 'Create page',
        subtitle: 'Enter the title for your new page.',
        label: 'Page title',
        placeholder: 'My dream page',
      },
    });

    ref.afterClosed().subscribe(async (title) => {
      if (title != null) {
        await this._apiService.savePage({ title, notebookId: this.notebookId });
        this.loadPages();
      }
    });
  }
}
