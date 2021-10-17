import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-form';

  nomeFormulario: string = 'Formulário de Cadastro'

  ngOnInit() {
   
  }

  resultForm(response) {
    console.log('-------- retorno do cadastro com sucesso ------------', response);
  }
}
