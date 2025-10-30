import { HistoryForm } from './../../../core/entities/history-form';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { getHeadersWithToken } from '../../../presentation/helpers/get-token';
import { HistoryModel } from '../../../core/models/history-model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private url = `${this.baseUrl}/history`;

  constructor() {}

  public createHistory = (historyForm: HistoryForm) =>
    this.http.post<HistoryModel>(`${this.url}`, historyForm, {
      headers: getHeadersWithToken(),
    });

  public getHistories = (accountId: number) =>
    this.http.get<HistoryModel[]>(`${this.url}/${accountId}`, {
      headers: getHeadersWithToken(),
    });
}
