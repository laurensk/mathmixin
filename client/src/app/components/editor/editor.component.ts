import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MathType from '@wiris/mathtype-ckeditor5/src/plugin';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  public editor = ClassicEditor;
  public config = { plugins: [MathType], toolbar: { items: ['MathType', 'ChemType'] } };
  public data = '<p>Hello, world!</p>';
}
