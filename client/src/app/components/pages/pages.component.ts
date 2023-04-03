import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  notebookId: number = 0;
  pages: Page[] | null;

  constructor(private readonly _apiService: ApiService, private readonly _route: ActivatedRoute) {
    this._route.params.subscribe(async (params) => {
      this.notebookId = params['notebookId'];
      this.loadPages();
    });
  }

  async loadPages() {
    this.pages = await this._apiService.getPages(this.notebookId);
  }
}
