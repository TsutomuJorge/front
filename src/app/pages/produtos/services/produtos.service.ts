import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/http-client/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private controller = 'Produto';

  constructor(private apiService: ApiService) {}

  public getProdutos(): Observable<any> {
    return this.apiService.get(`${this.controller}`).pipe(map((x) => x.body));
  }
}
