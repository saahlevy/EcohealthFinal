import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Início', url: '/inicio', icon: 'home' },
    { title: 'Orientações', url: '/orientacoes', icon: 'paper-plane' },
    { title: 'Mapa', url: '/mapa', icon: 'map' },
    { title: 'Configurações', url: '/configuracoes', icon: 'settings' },
    { title: 'Reportar Evento', url: '/reportar', icon: 'warning' }
  ];
  
  constructor() {}
}
