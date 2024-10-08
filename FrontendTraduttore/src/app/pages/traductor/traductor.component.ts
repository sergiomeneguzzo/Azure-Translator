import { Component } from '@angular/core';
import { RequestTraduttore } from '../../interfaces/RequestTraduttore';
import { ResponseTranslaction } from '../../interfaces/ResponseTraduttore';
import { TranslatorService } from '../../services/translator.service';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-traductor',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './traductor.component.html',
  styleUrls: ['./traductor.component.scss']
})
export class TraductorComponent {
  inputText: string = '';
  targetLanguage: string = 'en';
  translationResult: ResponseTranslaction | null = null;
  errorMessage: string | null = null;

  constructor(private translationService: TranslatorService) {}

  translate() {
    const request: RequestTraduttore = {
      input: this.inputText,
      targetLanguage: this.targetLanguage
    };
    this.translationService.translate(request).subscribe(
      (response) => {
        this.translationResult = {
          dectedLanguage: response.dectedLanguage || 'Sconosciuta',
          translation: response.translation || 'Nessuna traduzione disponibile',
          message: response.message || 'Nessun messaggio disponibile'
        };
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = error.error?.Message || 'An error occurred while translating.';
        this.translationResult = null;
      }
    );
  }
}
