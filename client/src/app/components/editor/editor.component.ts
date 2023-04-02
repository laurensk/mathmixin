import { Component } from '@angular/core';
import CustomEditor from 'ckeditor5-custom-build';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  public editor = CustomEditor;
  public data = '<p>Hello, world!</p>';
}
