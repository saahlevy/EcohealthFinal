import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import file from 'src/assets/data/weather.json';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  public temperature;
  public maxTemperature;
  public minTemperature;
  public wind;
  public humidity;
  public rain;
  public imageConditionURL;

  constructor() {
    this.temperature = 0;
    this.maxTemperature = 0;
    this.minTemperature = 0;
    this.wind = 0;
    this.humidity = 0;
    this.rain = 0;
    this.imageConditionURL = '';
  }

  async ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;

    const weather = file;

    this.temperature = weather.temperature;
    this.maxTemperature = weather.maxTemperature;
    this.minTemperature = weather.minTemperature;
    this.wind = weather.wind;
    this.humidity = weather.humidity;
    this.rain = weather.rain;
    this.imageConditionURL = weather.imageConditionURL;
  }
}
