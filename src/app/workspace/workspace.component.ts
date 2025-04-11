import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { CommonModule } from '@angular/common';
import { ApiRequest } from '../apiRequest';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [LayoutComponent, CommonModule],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  pulledData: any[] = [];
  isLoading = true;
  error: string | null = null;
  activeCount = 0;
  inactiveCount = 0;

  constructor(private apiRequestService: ApiRequest) {}

  ngOnInit(): void {
    this.apiRequestService.getWorkspaces().subscribe({
      next: (data) => {
        this.pulledData = data;
        this.activeCount = data.filter(item => item.SubscriptionStatus).length;
        this.inactiveCount = data.length - this.activeCount;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Fehler beim Laden der Daten';
        this.isLoading = false;
        console.error('Fehler:', err);
      }
    });
  }

  getRandom(): number {
    return Math.floor(Math.random() * 50) + 1;
  }
}
