import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/http-client/api.service';
import { ProdutoFabricanteDTO } from '../dtos/produto-fabricante-dto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoFabricanteService {
  private controller = 'ProdutoFabricante';

  constructor(private apiService: ApiService) {}

  public getProdutosFabricantes(): Observable<ProdutoFabricanteDTO[]> {
    return this.apiService.get(`${this.controller}`).pipe(map((x) => x.body));
  }

  public deleteProdutoFabricante(
    produtoFabricante: ProdutoFabricanteDTO
  ): Observable<boolean> {
    return this.apiService
      .post(`${this.controller}/DeleteProdutoFabricante`, produtoFabricante)
      .pipe(
        map((x) => {
          return x.body;
        })
      );
  }

  public addProdutoFabricante(
    produtoFabricante: ProdutoFabricanteDTO
  ): Observable<boolean> {
    return this.apiService.post(`${this.controller}`, produtoFabricante).pipe(
      map((x) => {
        return x.body;
      })
    );
  }

  public updateProdutoFabricante(
    produtoFabricante: ProdutoFabricanteDTO
  ): Observable<boolean> {
    return this.apiService.put(`${this.controller}`, produtoFabricante).pipe(
      map((x) => {
        return x.body;
      })
    );
  }
}
