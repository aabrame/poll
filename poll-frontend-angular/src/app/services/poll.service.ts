import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { Poll } from '../models/poll.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PollService extends GenericService<Poll> {


  constructor(httpClient: HttpClient) {
    super(httpClient, environment.backendUrl + "polls");
   }

  override findAll(q?: string): Observable<Poll[]> {
    return this.httpClient.get<Poll[]>(this.url, q ? { params: { q: q} } : undefined).pipe(delay(1000));
  }

}
