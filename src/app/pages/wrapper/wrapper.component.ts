import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  public widthPainel!: number;
  public titulo = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.configurarTela();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.configurarTela();
    });
  }

  configurarTela() {
    const firstChild = this.route.snapshot.firstChild;

    if (firstChild) {
      const data = firstChild.data;

      if (data) {
        document!.getElementById("titulo")!.innerHTML = data['tituloPainel'] || '';
        this.titulo = data['tituloPainel'] || '';
        this.widthPainel = data['tituloPainel'] || 0;
      }
    }
  }
}
