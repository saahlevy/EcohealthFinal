import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DadosOcorrenciaService } from '../../services/dados-ocorrencia.service'; 
import { coordenadasCidades } from './coordenadas-cidades';
import * as mapboxgl from 'mapbox-gl';  // Importação do Mapbox

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, AfterViewInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private dadosOcorrenciaService: DadosOcorrenciaService) {}

  dadosOcorrencia: any;
  map: mapboxgl.Map | undefined;  // Definindo o tipo do mapa

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    // Obtém os dados da ocorrência
    this.dadosOcorrencia = this.dadosOcorrenciaService.obterDados();
    console.log(this.dadosOcorrencia); // Verifique os dados no console

    // Inicializa o mapa usando o Mapbox
    this.map = new mapboxgl.Map({
      container: 'map',  // ID do contêiner HTML onde o mapa será exibido
      style: 'mapbox://styles/mapbox/streets-v11',  // Estilo do mapa (você pode escolher outros estilos)
      center: [-46.633308, -23.550520],  // Coordenadas iniciais (São Paulo)
      zoom: 12,  // Zoom inicial
      accessToken: 'pk.eyJ1Ijoic2FhaGxldnkiLCJhIjoiY200OHRuOWFwMDNidzJqcHMzNTNwZWFkcCJ9.g_FFmbV0ksRDD26HVEivuQ' // Coloque sua chave da API do Mapbox aqui
    });

    // Verifica se a cidade selecionada tem coordenadas
    if (this.dadosOcorrencia && this.dadosOcorrencia.cidadeOcorrencia) {
      const cidade = this.dadosOcorrencia.cidadeOcorrencia;
      const coordenadas = coordenadasCidades[cidade];

      if (coordenadas) {
        // Ajusta o centro do mapa para as coordenadas da cidade selecionada
        this.map.setCenter([coordenadas.lng, coordenadas.lat]);
        this.map.setZoom(12);

        // Adiciona um marcador no mapa
        new mapboxgl.Marker()
          .setLngLat([coordenadas.lng, coordenadas.lat])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <b>Ocorrência:</b> ${this.dadosOcorrencia.ocorrencia}<br>
            <b>Cidade:</b> ${this.dadosOcorrencia.cidadeOcorrencia}<br>
            <b>Comentário:</b> ${this.dadosOcorrencia.comentario}
          `))
          .addTo(this.map);
      } else {
        console.error('Coordenadas não encontradas para a cidade:', cidade);
      }
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.map) {
        this.map.resize();  // Redimensiona o mapa após o carregamento da view
      }
    }, 100);  // Atraso para garantir que o layout tenha sido completamente processado
  }
}
