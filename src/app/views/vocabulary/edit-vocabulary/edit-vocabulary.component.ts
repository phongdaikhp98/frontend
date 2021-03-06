import { RESPONSE_STATUS } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { VocabularyModel } from '../../../models/vocabulary-model';
import { VocabularyService } from '../../../services/vocabulary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-edit-vocabulary',
  templateUrl: './edit-vocabulary.component.html',
  styleUrls: ['./edit-vocabulary.component.css']
})
export class EditVocabularyComponent implements OnInit {
  id: number;
  vocabularyModel: VocabularyModel;

  constructor(private vocabularyService : VocabularyService, private route: ActivatedRoute, private router2: Router
    , private alert:AlertService) { }

  ngOnInit(): void {
    this.vocabularyModel = new VocabularyModel();
    this.id =+ this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData() {
    this.vocabularyService.getInfoVocabulary(this.id).subscribe(apiResponse => {
      console.log(apiResponse);
      if(apiResponse.errorcode === RESPONSE_STATUS.FAIL) {
        this.alert.danger("Cannot get vocabulary detail!");
      }else {
        this.vocabularyModel = apiResponse.body;
      }
    });
   }

   updateVocabulary(){
    if(!this.vocabularyModel.hiragana  || !this.vocabularyModel.kanji_vocab  
      || !this.vocabularyModel.vocab_meaning  || !this.vocabularyModel.kanji_id ) {
      this.alert.danger('Field cannot empty');
      return;
    }
    
    this.vocabularyService.updateVocabulary(this.id ,this.vocabularyModel).subscribe(apiResponse => {
      console.log(apiResponse);
      if(apiResponse.errorcode === RESPONSE_STATUS.FAIL) {
        this.alert.danger(apiResponse.message);
      }else {
        this.vocabularyModel = new VocabularyModel();
        this.alert.success(apiResponse.message);
        this.router2.navigate(["/list-vocabulary"]);
      }
    });
   }

}
