import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { ApiService } from '../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { TranslateModule } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    ReactiveFormsModule,

    FormlyMaterialModule,
    FormlyMatToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,

    NgbModule,
    
    NgxMatSelectSearchModule,
    TranslateModule
    
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  form = new FormGroup({});
  fields!: FormlyFieldConfig[];
  model = {};
  loading: boolean = false;

  constructor(private api: ApiService, private formlyJsonschema: FormlyJsonschema){
    this.loading = true;
    this.api.getFormDefinition().subscribe(
      (schema) => {
        var r = JSON.parse(schema.formDefinition);
        // console.log(r);
        this.fields = [formlyJsonschema.toFieldConfig(r)];
      },
      ()=> this.loading = false,
      ()=> this.loading = false
    )
  }

}
