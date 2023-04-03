import { Notebook } from './notebook.model';

export interface Page {
  pageId?: number;
  notebookId?: number;
  notebook?: Notebook;
  title: string;
  createdDateUtc?: Date;
  modifiedDateUtc?: Date;
}
