import { inject, Injectable } from "@angular/core";
import { HistoryService } from "../../../infrastructure/services/history/history.service";
import { HistoryForm } from "../../entities/history-form";
import { Observable } from "rxjs";
import { HistoryModel } from "../../models/history-model";

@Injectable({
  providedIn: 'root'
})
export class CreateHistoryUseCase {
  private historyService = inject(HistoryService);
  public execute = (historyForm: HistoryForm) : Observable<HistoryModel> => this.historyService.createHistory(historyForm);
}
