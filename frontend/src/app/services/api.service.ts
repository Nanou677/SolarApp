import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Familles
  getFamilles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/familles`);
  }
  createFamille(data: any): Observable<any> {
    return this.http.post(`${this.base}/familles`, data);
  }
  deleteFamille(id: number): Observable<any> {
    return this.http.delete(`${this.base}/familles/${id}`);
  }

  // Appareils
  getAppareils(famille_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/appareils/famille/${famille_id}`);
  }
  createAppareil(data: any): Observable<any> {
    return this.http.post(`${this.base}/appareils`, data);
  }
  deleteAppareil(id: number): Observable<any> {
    return this.http.delete(`${this.base}/appareils/${id}`);
  }

  // Calculs
  calculer(famille_id: number): Observable<any> {
    return this.http.post(`${this.base}/calculs/calculer/${famille_id}`, {});
  }
  getHistorique(famille_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/calculs/historique/${famille_id}`);
  }
}