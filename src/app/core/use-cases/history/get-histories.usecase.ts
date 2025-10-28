import { inject, Injectable } from "@angular/core";
import { HistoryService } from "../../../infrastructure/services/history/history.service";
import { Observable } from "rxjs";
import { HistoryModel } from "../../models/history-model";

@Injectable({
  providedIn: 'root'
})
export class GetHistoriesUseCase{

  private historyService = inject(HistoryService);
  public execute = (accountId: number) : Observable<HistoryModel[]> => this.historyService.getHistories(accountId);

}
