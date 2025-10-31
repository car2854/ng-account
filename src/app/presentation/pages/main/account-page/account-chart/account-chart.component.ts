import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChartComponent, LineChartInterface } from "../../../../../shared/components/chart-component/line-chart-component/line-chart.component";
import { ActivatedRoute, Router } from '@angular/router';
import { GetHistoriesUseCase } from '../../../../../core/use-cases/history/get-histories.usecase';
import { safeParseInt } from '../../../../helpers/number-helper';
import { errorHelpers } from '../../../../helpers/errors-helper';
import { HistoryModel } from '../../../../../core/models/history-model';
import { Status } from '../../../../enum/status-enum';
import { formatDateHelper } from '../../../../helpers/format-date-helper';

@Component({
  selector: 'app-account-chart',
  templateUrl: './account-chart.component.html',
  styleUrls: ['./account-chart.component.css'],
  imports: [CardComponent, NgxChartsModule, LineChartComponent],
})
export class AccountChartComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private useCase = inject(GetHistoriesUseCase);

  public data = signal<LineChartInterface[]>([]);

  public statusHistory = signal<Status>(Status.INITIAL);

  constructor() {}

  private getHistories = (id: number) => {
    this.statusHistory.update((_) => Status.LOADING);
    this.useCase.execute(id).subscribe({
      error: (err) => {
        errorHelpers(err);
        this.statusHistory.update((_) => Status.ERROR);
      },
      next: (value) => {
        this.statusHistory.update((_) => Status.SUCCESS);
        this.data.set([
          {
            name: 'History',
            series: value.map((v: HistoryModel) => {
              return {
                name: new Date(v.date),
                value: parseFloat(v.amount.toString()),
              };
            }),
          },
        ]);
      },
    });
  };

  ngOnInit() {
    const id = safeParseInt(this.route.snapshot.paramMap.get('id'));
    if (id == null) {
      this.router.navigateByUrl('accounts');
      return;
    }

    this.getHistories(id);
  }

  public isLoading = () => this.statusHistory() === Status.LOADING;
}
