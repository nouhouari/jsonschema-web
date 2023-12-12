import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Dropdown } from '../model copy/json-schema.model';

@Component({
  selector: 'app-formly-dropdown-type',
  template: `
    <mat-form-field class="w-100 mat-form-field-appearance-fill">
      <mat-select
        msInfiniteScroll
        (infiniteScroll)="getNextBatch()"
        [formControl]="formControl"
        [formlyAttributes]="field"
        placeholder="{{ field.templateOptions?.label || 'Select' | translate }}"
        (valueChange)="onChange($event)"
      >
        <mat-option>
          <ngx-mat-select-search
            [formControl]="searchCtrl"
            placeholderLabel="search"
            [disableScrollToActiveOnOptionsChanged]="true"
            [preventHomeEndKeyPropagation]="true"
            [searching]="isLoading"
            [clearSearchInput]="false"
            noEntriesFoundLabel="No entry matches">
            <mat-icon (click)="onClearSearch()" ngxMatSelectSearchClear
              >delete</mat-icon>
          </ngx-mat-select-search>
        </mat-option>
        <mat-option
          *ngFor="let option of dropdownOptions"
          [value]="option.value">
          {{ option.label }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class DropdownTypeComponent
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  // public configuration = new Configuration();
  myarray: Dropdown[] = [];
  select: FormControl = new FormControl();
  ctrl: FormControl = new FormControl();
  searchCtrl: FormControl = new FormControl();
  isLoading: boolean = false;
  searchedOptions = '';

  subscriptions: Subscription[] = [];
  dropdownOptions: Dropdown[] = [];

  data = [];
  elementSize: any = 10;

  private pageable: any = {
    page: 0,
    size: this.elementSize,
  };

  private apiParams: any = {};

  ngOnInit() {
    console.log('check formControl', this.formControl);
    this.getData();
    this.subscriptions.push(
      this.searchCtrl.valueChanges
        .pipe(debounceTime(1000))
        .subscribe((val) => this.onSearchChange(val)),
    );
  }

  getData(searchType = 'mergeData') {
    if (this.field.templateOptions) {
      if (this.field.templateOptions['dropdownOptions']) {
        let dropdownOptions = this.field.templateOptions[
          'dropdownOptions'
        ]?.provider(this.apiParams, this.pageable);
        this.subscriptions.push(
          dropdownOptions.subscribe((data: any) => {
            console.log('subscribe data', data);
            this.myarray = this.data = data.data;
            this.elementSize = data.totalElements;
            this.dropdownOptions =
              searchType === 'mergeData'
                ? [...this.dropdownOptions, ...data.data]
                : data.data;
            this.isLoading = false;
          }),
        );
      }
    }
  }
  onClearSearch(): void {
    if (this.field.templateOptions) {
      this.searchedOptions = '';
      delete this.apiParams[
        this.field.templateOptions['searchableDropdownField']
      ];
    }
    this.getData('queryData');
  }

  onSearchChange(searchVal: any): void {
    if (this.field.templateOptions && searchVal !== '') {
      this.searchedOptions = searchVal;
      this.isLoading = true;
      this.apiParams[this.field.templateOptions['searchableDropdownField']] =
        searchVal;
      this.pageable.page = 0;
      this.getData('queryData');
    }
  }

  getNextBatch(): void {
    if (this.elementSize > this.pageable.size) {
      this.isLoading = true;
      this.pageable.page += 1;
      this.getData();
    }
  }

  onChange(selectedData: any) {
    this.searchCtrl.setValue(this.searchedOptions);
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
