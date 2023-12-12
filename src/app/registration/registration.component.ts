import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { ApiService } from '../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    
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
        console.log(r);
        this.fields = [formlyJsonschema.toFieldConfig(r)];
      },
      ()=> this.loading = false,
      ()=> this.loading = false
    )
  }

}
