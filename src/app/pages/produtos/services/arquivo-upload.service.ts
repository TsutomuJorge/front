import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/http-client/api.service';

@Injectable({
  providedIn: 'root'
})
export class ArquivoUploadService {
  private controller = 'ProdutoFabricante';

  constructor(private apiService: ApiService) { }

  uploadArquivo(arquivo: File): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const formData: FormData = new FormData();
    formData.append('Arquivo', arquivo);
    return this.apiService.postWithOptions(`${this.controller}/ImportarPlanilha/`, formData, headers);
  }
}
