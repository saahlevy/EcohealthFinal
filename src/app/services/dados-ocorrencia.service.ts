import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DadosOcorrenciaService {

  private dados: any = {};

  constructor() { }

  // Método para salvar os dados
  salvarDados(ocorrencia: string, cidadeOcorrencia: string, comentario: string): void {
    this.dados = {
      ocorrencia,
      cidadeOcorrencia,
      comentario
    };
  }

  // Método para acessar os dados
  obterDados(): any {
    return this.dados;
  }
}

