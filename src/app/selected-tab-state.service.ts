import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedTabStateService {
  selectedTab: number = 3;
}
