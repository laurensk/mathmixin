import { Injectable } from '@angular/core';
import { Notebook } from '../models/notebook.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  async request<T>(method: 'GET' | 'POST' | 'DELETE', route: string, body?: any): Promise<T | null> {
    try {
      const isBodyPrimitive = body != null && body !== Object(body);

      const res = await fetch('/api/' + route, {
        method,
        body: isBodyPrimitive ? body : JSON.stringify(body),
        headers: { 'Content-Type': isBodyPrimitive ? 'text/plain' : 'application/json' },
      });

      if (res == null || res.status != 200) {
        return null;
      }

      if (res.headers.get('Content-Type').includes('application/json')) {
        return (await res.json()) as T;
      } else {
        return (await res.text()) as T;
      }
    } catch (err) {
      console.log('Request failed with error: ', err);
      return null;
    }
  }

  async getNotebooks() {
    return this.request<Notebook[]>('GET', 'notebooks');
  }

  async saveNotebook(model: Notebook) {
    return this.request<Notebook>('POST', 'notebooks', model);
  }

  async deleteNotebook(notebookId: number) {
    return this.request<boolean>('DELETE', 'notebooks/' + notebookId);
  }

  async getPages(notebookId: number) {
    return this.request<Page[]>('GET', 'notebooks/' + notebookId + '/pages');
  }

  async savePage(model: Page) {
    return this.request<Page>('POST', 'pages', model);
  }

  async deletePage(pageId: number) {
    return this.request<boolean>('DELETE', 'pages/' + pageId);
  }

  async getContent(pageId: number) {
    return this.request<string>('GET', 'pages/' + pageId + '/content');
  }

  async saveContent(pageId: number, content: string) {
    return this.request<string>('POST', 'pages/' + pageId + '/content', content);
  }
}
