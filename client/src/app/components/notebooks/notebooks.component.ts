import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Notebook } from 'src/app/models/notebook.model';
import { ApiService } from 'src/app/services/api.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalTextInputComponent } from '../modal-text-input/modal-text-input.component';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.component.html',
  styleUrls: ['./notebooks.component.scss'],
})
export class NotebooksComponent implements OnInit {
  notebooks: Notebook[] | null;

  constructor(private readonly _apiService: ApiService, private readonly _dialog: MatDialog) {}

  async ngOnInit() {
    this.loadNotebooks();
  }

  async loadNotebooks() {
    this.notebooks = await this._apiService.getNotebooks();
  }

  create() {
    const ref = this._dialog.open(ModalTextInputComponent, {
      autoFocus: false,
      data: {
        title: 'Create notebook',
        subtitle: 'Enter a name for your new notebook.',
        label: 'Notebook name',
        placeholder: 'My maths notebook',
      },
    });

    ref.afterClosed().subscribe(async (name) => {
      if (name != null) {
        await this._apiService.saveNotebook({ name });
        this.loadNotebooks();
      }
    });
  }

  rename(notebook: Notebook) {
    const ref = this._dialog.open(ModalTextInputComponent, {
      autoFocus: false,
      data: {
        title: 'Rename notebook',
        subtitle: `Change name of "${notebook.name}"`,
        label: 'Notebook name',
        placeholder: 'My maths notebook',
        value: notebook.name,
      },
    });

    ref.afterClosed().subscribe(async (name) => {
      if (name != null) {
        await this._apiService.saveNotebook({ notebookId: notebook.notebookId, name });
        this.loadNotebooks();
      }
    });
  }

  delete(notebook: Notebook) {
    const ref = this._dialog.open(ModalConfirmComponent, {
      autoFocus: false,
      data: {
        title: 'Delete notebook?',
        subtitle: `Are you sure that you want to delete the notebook "${notebook.name}" with ALL ITS PAGES?`,
      },
    });

    ref.afterClosed().subscribe(async (result) => {
      if (result) {
        await this._apiService.deleteNotebook(notebook.notebookId);
        this.loadNotebooks();
      }
    });
  }
}
