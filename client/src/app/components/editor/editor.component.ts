import { Component } from '@angular/core';
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
  public data = '<p>Hello, world!</p>';

  pageId = 0;

  constructor(private readonly _apiService: ApiService, private readonly _route: ActivatedRoute) {
    this._route.params.subscribe(async (params) => {
      this.pageId = params['pageId'];
    });
  }

  save() {
    alert('save');
  }

  download() {
    alert('download');
  }
}
