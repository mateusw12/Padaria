import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { NOT_SUPPORTED_STORAGE } from './../constant/storage/storage';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private storage: Storage;

  constructor(private messageService: MessageService) {
    this.storage = window.localStorage;
  }

  getGlobalTheme(key: string): string | null {
    if (!this.validateBroswerStorage()) return null;
    const storageItem = this.storage.getItem(key);
    if (!storageItem) return null;
    return JSON.parse(storageItem);
  }

  setGlobalTheme(key: string, value: string): void {
    if (!this.validateBroswerStorage()) {
      this.messageService.showErrorMessage(NOT_SUPPORTED_STORAGE);
    }
    this.storage.setItem(key, value);
  }

  removeGlobalTheme(key: string): void {
    if (!this.validateBroswerStorage()) {
      this.messageService.showErrorMessage(NOT_SUPPORTED_STORAGE);
    }
    this.storage.removeItem(key);
  }

  clearGlobalTheme(): void {
    if (!this.validateBroswerStorage()) {
      this.messageService.showErrorMessage(NOT_SUPPORTED_STORAGE);
    }
    this.storage.clear();
  }

  private validateBroswerStorage(): boolean {
    return this.storage ? true : false;
  }
}
