import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ConnectedUser {
  accessToken: string;
  refreshToken: string;
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  connectedUser = new BehaviorSubject<ConnectedUser | undefined>(undefined);

  constructor() { }
}
