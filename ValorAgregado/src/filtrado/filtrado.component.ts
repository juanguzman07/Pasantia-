import { Component } from '@angular/core';

@Component({
  selector: 'app-mi-componente',
  templateUrl: './mi-componente.component.html',
  styleUrls: ['./mi-componente.component.css']
})
export class MiComponenteComponent {
  mostrar: boolean = false;

  mostrarLista() {
    this.mostrar = !this.mostrar;
  }
}
