import {Component, HostListener} from '@angular/core';
import {LayoutComponent} from '../layout/layout.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ApiRequest} from '../apiRequest';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule, LayoutComponent, NgxChartsModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.css'
})
export class TimeComponent {
  year: number = 2025;
  isLoading = true;
  yearsData: any = {};

  chartData: any = [];
  chartSize: [number, number] = [1700, 500];

  constructor(private apiRequestService: ApiRequest) {}

  ngOnInit(): void {
    this.onResize();
    this.apiRequestService.getTime().subscribe({
      next: (data) => {
        this.yearsData = this.groupByYearAndMonth(data);
        this.setChartData()
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Fehler:', err);
        this.isLoading = false;
      }
    });
  }

  increment() {
    if (this.year < 2025) {
      this.year += 1;
    }
    this.setChartData()
  }

  decrement() {
    this.year -= 1;
    this.setChartData()
  }

  private groupByYearAndMonth(items: any[]) {
    const years: { [year: number]: { total: number, months: { [month: number]: number } } } = {};

    items.forEach(item => {
      const date = new Date(item.CreatedOn);
      const year = date.getFullYear();
      const month = date.getMonth();

      if (!years[year]) {
        years[year] = { total: 0, months: {} };
        for (let i = 0; i < 12; i++) {
          years[year].months[i] = 0;
        }
      }

      years[year].total++;
      years[year].months[month]++;
    });

    return years;
  }

  private setChartData() {
    this.chartData = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ].map((monthName, index) => ({
      name: monthName,
      value: this.yearsData[this.year]?.months[index] ?? 0
    }));

    console.log(this.chartData)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;

    if (isPortrait) {
      this.chartSize = [332, 430];
    } else {
      this.chartSize = [1700, 500];
    }
  }
}
