import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  paletteToggle = false;
  private activatedRoute = inject(ActivatedRoute);
  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.initializeDarkPalette(localStorage.getItem('theme') == 'dark');
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleChange(ev: any) {
    this.toggleDarkPalette(ev.detail.checked);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.body.classList.toggle('ion-palette-dark', shouldAdd);
    localStorage.setItem('theme', shouldAdd ? 'dark' : 'light');
  }

  //Código do botão de notificações
async onToggleChange(event: any) {
  const isChecked = event.detail.checked;

  if (isChecked) {
    await this.presentAlert('Notificações Ativadas', 'Agora você receberá notificações.');
  } else {
    await this.presentAlert('Notificações Desativadas', 'Você não receberá mais notificações.');
  }
}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
