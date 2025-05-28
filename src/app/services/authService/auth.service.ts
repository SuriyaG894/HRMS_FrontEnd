import { EventEmitter, Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'authToken';

  loginStatusChanged = new EventEmitter<Boolean>();

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  decodeToken(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwt_decode.jwtDecode(token);
    } catch {
      return null;
    }
  }

  isTokenExpired(): boolean {
  const expDate = this.getTokenExpiration();
  if (!expDate) return true;

  return expDate < new Date(); // true if expired
}

getTokenExpiration(): Date | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const decoded: any = jwt_decode.jwtDecode(token);
    if (decoded.exp === undefined) return null;

    // exp is in seconds, convert to milliseconds
    const expDate = new Date(decoded.exp * 1000);
    return expDate;
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
}

  isLoggedIn(): boolean {
    if(this.isTokenExpired()){
      return false;
    }
    return true;
  }
}
