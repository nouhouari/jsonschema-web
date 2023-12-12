import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NullTypeComponent } from './json-schema/null.type';
import { ArrayTypeComponent } from './json-schema/array.type';
import { ObjectTypeComponent } from './json-schema/object.type';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CustomInputComponent } from './json-schema/string.type';
import { MultiSchemaTypeComponent } from './json-schema/multischema.type';
import { DropdownTypeComponent } from './json-schema/dropdown.type';


export function minLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `Should have atleast ${field.props!.minLength} characters`;
}

export function maxLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `This value should be less than ${field.props!.maxLength} characters`;
}

export function minValidationMessage(error: any, field: FormlyFieldConfig) {
  return `This value should be more than ${field.props!.min}`;
}

export function maxValidationMessage(error: any, field: FormlyFieldConfig) {
  return `This value should be less than ${field.props!.max}`;
}

@NgModule({
  declarations: [
    AppComponent,
    ArrayTypeComponent,
    ObjectTypeComponent,
    NullTypeComponent, 
    CustomInputComponent,
    MultiSchemaTypeComponent,
    DropdownTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    RegistrationComponent,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    FormlyMatToggleModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minLength', message: minLengthValidationMessage },
        { name: 'maxLength', message: maxLengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
      ],
      types: [
        { name: 'string', extends: 'input' },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            templateOptions: {
              type: 'number',
            },
          },
        },
        { name: 'boolean', extends: 'checkbox' },
        { name: 'enum', extends: 'select' },
        {
          name: 'null',
          component: NullTypeComponent,
          wrappers: ['form-field'],
        },
        { name: 'array', component: ArrayTypeComponent },
        { name: 'object', component: ObjectTypeComponent },
      ],
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
