import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { Poll } from '../models/poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {


  private url = environment.backendUrl + 'polls';

  constructor(private httpClient: HttpClient) { }

  findAll(q?: string): Observable<Poll[]> {
    return this.httpClient.get<Poll[]>(this.url, q ? { params: { q: q} } : undefined).pipe(delay(1000));
  }

  findById(id: number): Observable<Poll> {
    return this.httpClient.get<Poll>(this.url + "/" + id).pipe(delay(1000));
  }

  save(poll: Partial<Poll>): Observable<Poll> {
    return this.httpClient.post<Poll>(this.url, poll).pipe(delay(1000));
  }

  update(poll: Partial<Poll>): Observable<Poll> {
    return this.httpClient.put<Poll>(this.url + "/" + poll.id, poll).pipe(delay(1000));
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.url + "/" + id).pipe(delay(1000));
  }
}
