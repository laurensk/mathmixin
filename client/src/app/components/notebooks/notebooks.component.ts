import { Component, OnInit } from '@angular/core';
import { Notebook } from 'src/app/models/notebook.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.scss'],
})
export class NotebooksComponent implements OnInit {
  notebooks: Notebook[] | null;

  constructor(private readonly _apiService: ApiService) {}

  async ngOnInit() {
    this.notebooks = await this._apiService.getNotebooks();
  }
}
