import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  get(key: string): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  set(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, value);
    }
  }

  clear(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  }
}
