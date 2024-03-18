import { BehaviorSubject, Observable } from 'rxjs';
import { FabricanteDTO } from 'src/app/pages/produtos/dtos/fabricante-dto';
import { ProdutoDTO } from 'src/app/pages/produtos/dtos/produto-dto';
import { ChaveDescricaoDTO } from 'src/app/shared/dtos/chave-descricao.dto';

class ProdutosFabricantesService {
  private fabricantes: FabricanteDTO[] = [];
  private produtos: ProdutoDTO[] = [];
  private atualizarTela$ = new BehaviorSubject<boolean>(false);

  public adicionarFabricante(fabricante: FabricanteDTO): void {
    this.fabricantes.push(fabricante);
  }

  public obterFabricantes(): FabricanteDTO[] {
    return this.fabricantes;
  }

  public obterFabricantesPorChaveDescricao(): ChaveDescricaoDTO[] {
    return this.fabricantes.map(
      (x) =>
        ({
          chave: x.idFabricante,
          descricao: x.nomeFabricante,
        } as ChaveDescricaoDTO)
    );
  }

  public limparFabricantes(): void {
    this.fabricantes = [];
  }

  public adicionarProdutos(produto: ProdutoDTO): void {
    this.produtos.push(produto);
  }

  public obterProdutos(): ProdutoDTO[] {
    return this.produtos;
  }

  public obterProdutosPorChaveDescricao(): ChaveDescricaoDTO[] {
    return this.produtos.map(
      (x) =>
        ({
          chave: x.idProduto,
          descricao: x.descricaoProduto,
        } as ChaveDescricaoDTO)
    );
  }

  public limparProdutos(): void {
    this.produtos = [];
  }

  public executarRecarregarDadosGrid(recarregar: boolean): void {
    this.atualizarTela$.next(recarregar);
  }

  public verificarSeNecessarioRecarregarDadosGrid(): Observable<boolean> {
    return this.atualizarTela$.asObservable();
  }
}

const produtosFabricantesService = new ProdutosFabricantesService();

export { produtosFabricantesService };
