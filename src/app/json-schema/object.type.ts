import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-object-type',
  template: `
    <div class="row">
      <p class="m-0 pt-3" *ngIf="to.label">{{ to.label | translate }}</p>
      <p *ngIf="to.description">{{ to.description }}</p>
      <div
        class="alert alert-danger"
        role="alert"
        *ngIf="showError && formControl.errors"
      >
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <formly-field
        *ngFor="let f of field.fieldGroup"
        [field]="f"
      ></formly-field>
    </div>
  `,
})
export class ObjectTypeComponent extends FieldType {
  override defaultOptions = {
    defaultValue: {},
  };
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
