import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserSettings } from '../../data/user-settings';

// configs form
import { NgForm, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

// services
import { DataService } from '../../data/data.service'; // '../data/data.service';
import { Observable } from 'rxjs';

// define o local do globalizacao
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
defineLocale('pt-br', ptBrLocale);


@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  @Input() title: string;
  @Output() resCadastro = new EventEmitter();

  // variaveis 
  startDate: Date;
  startTime: Date;
  postError = false;
  postErrorMessage = '';
  subscriptionTypes: Observable<string[]>;

  userRating = 0;
  maxRating = 10;

  // forms
  formUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private localeService: BsLocaleService
  ) {
    // formata o dataPicker 
    localeService.use('pt-br');
  }

  // inicializa os dados 
  ngOnInit() {
    this.startDate = new Date();
    this.startTime = new Date();
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
    this.createForm(new UserSettings());
  }

  createForm(user: UserSettings) {
    this.formUser = this.formBuilder.group({
      name: [user.name, [Validators.required]],
      levelConhecimento: [user.levelConhecimento],
      singleModel: [user.singleModel],
      email: [user.email, [Validators.email, Validators.required]],
      startDate: [user.startDate, [Validators.required]],
      subscriptionType: [user.subscriptionType],
      notes: [user.notes]
    })
  }



  onSubmit() {
    console.log(this.formUser.value);
    const user = this.formUser.value;
    console.log('--- enviado ---')
    this.confirmarAcesso(user);
    /*if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings)
        .subscribe(
          result => console.log("cadastro com sucesso : " + result),
          error => this.onHttpError(error)
        );
    }*/
  }

  // transmiti o evento ao component pai
  confirmarAcesso(obj: any) {
    obj.success = true;
    this.resCadastro.emit(obj);
  }

  // caso de erros 
  onHttpError(errorResponse: any) {

    console.log(" Erro ==> ", errorResponse)
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }

  reset(){
    this.formUser.reset();
  }
}
