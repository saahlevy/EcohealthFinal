import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataSpCitiesModule } from './data-sp-cities.module';
import { ocorrencias } from './data-ocorrencias';
import { DadosOcorrenciaService } from '../../services/dados-ocorrencia.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  ocorrencia: string = '';      // Variável para a Ocorrência
  cidadeOcorrencia: string = ''; // Variável para a Cidade
  comentario: string = '';      // Variável para o Comentário
  formSubmitted: boolean = false; // Variável para controlar a submissão do formulário

  ocorrencias: string[] = ocorrencias;
  cidadesSp: string[] = DataSpCitiesModule.cidadesSp;

  constructor(private alertController: AlertController, private dadosOcorrenciaService: DadosOcorrenciaService) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async onSubmit() {

    this.formSubmitted = true; // Indica que o formulário foi enviado

    // Validação manual
    if (!this.ocorrencia || !this.cidadeOcorrencia) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos obrigatórios.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      this.dadosOcorrenciaService.salvarDados(this.ocorrencia, this.cidadeOcorrencia, this.comentario);
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Reporte enviado com sucesso! Você pode ver as ocorrências mais recentes em nosso mapa',
        buttons: ['OK']
      });
      await alert.present();

      this.ocorrencia = '';
      this.cidadeOcorrencia = '';
      this.comentario = '';
      this.formSubmitted = false;  // Resetando a flag de submissão
    }
  }
}
