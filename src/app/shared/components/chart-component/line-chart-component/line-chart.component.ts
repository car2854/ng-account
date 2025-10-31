import { Component, OnInit, Input } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

interface SeriesChartInterface {
  name: string | Date | number;
  value: number;
}

export interface LineChartInterface {
  name: string;
  series: SeriesChartInterface[];
}

@Component({
  selector: 'app-line-chart-component',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  imports: [NgxChartsModule],
})
export class LineChartComponent implements OnInit {
  @Input({ required: true }) data!: LineChartInterface[];

  multi: LineChartInterface[] = [];
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Value';
  timeline = true;
  xScaleMin = 1;
  xScaleMax = 2;
  xScaleType: 'time' | 'linear' | 'ordinal' = 'ordinal'; // 👈 Tipo de escala detectado automáticamente

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  constructor() {}

  ngOnInit() {
    this.multi = this.data;
  }


  onSelect(data: unknown): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: unknown): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: unknown): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
