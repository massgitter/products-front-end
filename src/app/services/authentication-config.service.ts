import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationConfigService {
  public token = 'openfabric-token';
  public roleKey = 'roles';
  constructor(
  ) {
  }

  checkRole(): any {
    return localStorage.getItem(this.roleKey) === 'PSS_ADMIN';
  }
}
