import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrosPorPaginaComponent } from './components/registros-por-pagina/registros-por-pagina.component';
import { PaginacaoEspecificaComponent } from './components/paginacao-especifica/paginacao-especifica.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from './components/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogLoadingTemplateComponent } from './components/loading/dialog-loading-template/dialog-loading-template.component';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    RegistrosPorPaginaComponent,
    PaginacaoEspecificaComponent,
    LoadingComponent,
    DialogLoadingTemplateComponent,
  ],
  exports: [
    RegistrosPorPaginaComponent,
    PaginacaoEspecificaComponent,
    LoadingComponent,
    DialogLoadingTemplateComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSnackBarModule,
  ],
})
export class SharedModule {}
