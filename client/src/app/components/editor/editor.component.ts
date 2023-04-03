import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import CustomEditor from 'ckeditor5-custom-build';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  public editor = CustomEditor as any;

  pageId: number | null;
  pageContent: string = '';

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 's') {
      event.preventDefault();
      this.save();
    }
  }

  constructor(
    private readonly _apiService: ApiService,
    private readonly _route: ActivatedRoute,
    private readonly _snackBar: MatSnackBar
  ) {
    this._route.params.subscribe(async (params) => {
      // if (this.pageId != null) {
      //   await this.save();
      // }

      this.pageId = params['pageId'] ?? null;
      this.load();
    });
  }

  async load() {
    const content = await this._apiService.getContent(this.pageId);
    this.pageContent = content.content ?? '';
  }

  async save() {
    const success = await this._apiService.saveContent(this.pageId, { content: this.pageContent });
    if (success) {
      this._snackBar.open('Saved successfully!', undefined, { duration: 150 });
    }
  }

  async download() {
    alert('download');
  }
}
