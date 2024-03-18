import { Component, Input, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-registros-por-pagina',
    templateUrl: './registros-por-pagina.component.html',
    styleUrls: ['./registros-por-pagina.component.scss']
})
export class RegistrosPorPaginaComponent implements OnInit {

    @Input() gridOptions?: Partial<GridOptions>;
    @Input() registrosPorPagina!: number;

    public totalRegistrosPagina = [10, 25, 50, 100];

    ngOnInit() {
        if (!this.registrosPorPagina) {
            this.registrosPorPagina = this.totalRegistrosPagina[0];
        }
    }

    onChangePageSize() {
        // if (this.gridOptions?.api) {
        //     this.gridOptions.cacheBlockSize = +this.registrosPorPagina;
        //     this.gridOptions.api!.paginationSetPageSize(+this.registrosPorPagina);
        //     this.gridOptions.api!.onFilterChanged();
        // }
    }

}
