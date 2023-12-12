export interface StatsDisplayData {
  label: string;
  value: any;
  field: string;
  icons?: string;
  iconsType?: string;
  alt?: string;
  format?: string;
  type: string;
  isHide: boolean;
}

export interface Stats {
  [key: string]: StatsDisplayData;
}
