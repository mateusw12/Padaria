import { Injectable } from '@angular/core';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { isArray, isNumber, isPromise, isString, isSymbol } from '../internal';

const loadingIndefinitelySymbol = Symbol('loadingIndefinitely');

export type BusySource =
  | PropertyKey
  | Promise<unknown>
  | Subscription
  | (Promise<unknown> | Subscription)[];

export interface BusyEntry {
  readonly source: BusySource;
  readonly loader: Subscription;
}

@Injectable({ providedIn: 'root' })
export class SpinnerService {

  private change = new Subject<BusyEntry[]>();
  private entries: BusyEntry[] = [];

  private addSource(source: BusySource): void {
    if (isString(source) || isNumber(source) || isSymbol(source)) {
      this.addKey(source);
      return;
    }
    if (isPromise(source)) {
      this.addPromise(source);
      return;
    }
    if (source instanceof Subscription) {
      this.addSubscription(source);
    }
    if (isArray(source)) {
      for (const item of source) {
        this.addSource(item);
      }
    }
  }

  private addKey(source: PropertyKey): void {
    const loader = new Subscription();
    this.addEntry({ source, loader });
  }

  private addPromise(source: Promise<unknown>): void {
    const target = from(source).subscribe();
    const loader = new Subscription();
    target.add(loader);
    this.addEntry({ source, loader });
  }

  private addSubscription(source: Subscription): void {
    const loader = new Subscription();
    source.add(loader);
    this.addEntry({ source, loader });
  }

  private addEntry(entry: BusyEntry): void {
    if (entry.loader.closed) return;
    entry.loader.add(() => this.removeEntry(entry));
    this.entries.push(entry);
    this.raiseChange();
  }

  private removeEntry(entry: BusyEntry): void {
    const index = this.entries.indexOf(entry);
    if (index === -1) return;
    this.removeByIndex(index);
  }

  private removeByIndex(index: number): void {
    const entry = this.entries.splice(index, 1)[0];
    if (!entry.loader.closed) entry.loader.unsubscribe();
    this.raiseChange();
  }

  private removeBySource(source: BusySource): void {
    const index = this.entries.findIndex((entry) => entry.source === source);
    if (index === -1) return;
    this.removeByIndex(index);
  }

  private raiseChange(): void {
    this.change.next(this.entries.slice(0));
  }

  show(source: BusySource = loadingIndefinitelySymbol): void {
    this.addSource(source);
  }

  hide(source: BusySource = loadingIndefinitelySymbol): void {
    this.removeBySource(source);
  }

  isLoading(): boolean {
    return this.entries.length > 0;
  }

  onChange(): Observable<BusyEntry[]> {
    return this.change.asObservable();
  }
}
