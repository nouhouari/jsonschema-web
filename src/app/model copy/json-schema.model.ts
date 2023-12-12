import { Observable } from 'rxjs';

export interface Pageable { 
  page?: number;
  size?: number;
  sort?: Array<string>;
}

export interface JsonSchema {
  type: string;
  title?: string;
  fieldGroupClassName: string;
  properties: Properties;
}

export interface Properties {
  [key: string]: {
    type: string;
    isWildcard?: boolean;
    format?: string;
    widget: {
      formlyConfig: FormlyConfig;
    };
  };
}

export interface FormlyConfig {
  className: string;
  id: string;
  templateOptions: TemplateOptions;
  props?: Options;
  loadExtraFilter?: boolean;
  expressionProperties: {};
  type?: string;
  hooks?: {};
}

export interface TemplateOptions {
  label: string;
  appearance: string;
  readonly?: boolean;
  click?: null;
  additionalOptions?: Dropdown[];
  datepickerOptions?: DatePickerOptions;
  options?: Dropdown[];
  labelKey?: string;
  placeholder?: string;
  dataType?: string;
  dropdownOptions?: DropdownOptions<any>;
  searchableDropdownField?: string;
  valueProp?: string;
}

export interface DropdownOptions<T> {
  provider: (apiParams: any, pageable: Pageable) => Observable<T>;
}

export interface DatePickerOptions {
  startView: string;
  datepickerTogglePosition: string;
  datepickerToggleId: string;
  max: null;
  dateChange: null;
}

export interface Options {
  options: string[];
}

export interface Dropdown {
  label: string;
  value: string;
}
