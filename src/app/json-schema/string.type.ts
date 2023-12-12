import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-string-type',
  template: `
    <mat-form-field appearance="fill">
      <mat-label>{{ to.label }}</mat-label>
      <input
        matInput
        [formControl]="formControl"
        [formlyAttributes]="field"
        [id]="id"
      />
    </mat-form-field>
  `,
})
export class CustomInputComponent extends FieldType<FieldTypeConfig> {}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
