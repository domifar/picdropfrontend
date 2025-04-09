import {Component, HostListener, OnInit} from '@angular/core';
import {LayoutComponent} from '../layout/layout.component';
import {ApiRequest} from '../apiRequest';
import { CommonModule } from '@angular/common';
import {forkJoin} from 'rxjs';

interface VoucherCount {
  total: number;
  validated: number;
}

interface WorkspaceVoucherSummary {
  workspaceName: string;
  totalVouchers: number;
  validatedVouchers: number;
}

@Component({
  selector: 'app-vouchers',
  imports: [LayoutComponent, CommonModule],
  templateUrl: './vouchers.component.html',
  styleUrl: './vouchers.component.css'
})
export class VouchersComponent implements OnInit {
  pulledData: any[] = [];
  isLoading = true;
  error: string | null = null;
  voucherCount = 0;
  validatedCount = 0;
  voucherSummaries: WorkspaceVoucherSummary[] = [];

  constructor(private apiRequestService: ApiRequest) {}

  ngOnInit(): void {
    this.loadVoucherData();
  }

  loadVoucherData(): void {
    forkJoin({
      vouchers: this.apiRequestService.getVouchers(),
      workspaces: this.apiRequestService.getWorkspaces()
    }).subscribe({
      next: ({vouchers, workspaces}) => {
        this.processVoucherData(vouchers, workspaces);
      },
      error: (err) => {
        console.error('Fehler beim Laden:', err)
        this.isLoading = false;
        this.error = 'Fehler beim Laden der Daten';
      }
    });
  }

  processVoucherData(vouchers: any[], workspaces: any[]): void {
    const workspaceMap = new Map<string, string>();
    workspaces.forEach(ws => {
      workspaceMap.set(ws.Id, ws.Name);
    });

    const voucherCounts = vouchers.reduce<Record<string, VoucherCount>>((acc, voucher) => {
      const workspaceId = voucher.WorkspaceId;
      if (!acc[workspaceId]) {
        acc[workspaceId] = { total: 0, validated: 0 };
      }
      acc[workspaceId].total++;
      if (voucher.ValidatedOn) {
        acc[workspaceId].validated++;
      }
      return acc;
    }, {});

    this.voucherSummaries = Object.entries(voucherCounts).map(([workspaceId, counts]) => {
      return {
        workspaceName: workspaceMap.get(workspaceId) || 'Unbekannter Workspace',
        totalVouchers: counts.total,
        validatedVouchers: counts.validated
      };
    });

    this.voucherSummaries.sort((a, b) => a.workspaceName.localeCompare(b.workspaceName));

    this.voucherCount = vouchers.length;
    this.validatedCount = vouchers.filter(v => v.ValidatedOn).length;
    this.pulledData = this.voucherSummaries
    this.isLoading = false;
  }
}
