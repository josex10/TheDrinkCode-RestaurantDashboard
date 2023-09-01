import { Dayjs } from "dayjs";

export interface IFilterDateResponse {
  filterCustomValue: string;
  filterDateTypeValue: string;
  filterDate: Dayjs | null;
  filterRangeStartDate: Dayjs | null;
  filterRangeEndDate: Dayjs | null;
}
