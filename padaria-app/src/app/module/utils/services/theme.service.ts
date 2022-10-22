import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  getTheme(key: string): string | null {
    if (!this.validateBroswerStorage()) return null;
    const storageItem = this.storage.getItem(key);
    if (!storageItem) return null;
    return storageItem;
  }

  setTheme(key: string, value: string): void {
    document.body.classList.toggle(value);
    this.storage.setItem(key, value);
  }

  removeTheme(key: string): void {
    this.storage.removeItem(key);
  }

  clearThemes(): void {
    this.storage.clear();
  }

  private validateBroswerStorage(): boolean {
    return this.storage ? true : false;
  }
}
