import { type PickerValidDate } from '@mui/x-date-pickers';
import {
  DatePicker as BaseDatePicker,
  type DatePickerProps,
} from '@mui/x-date-pickers/DatePicker';

const DatePicker = <
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false
>(
  props: DatePickerProps<TDate, TEnableAccessibleFieldDOMStructure>
) => {
  return <BaseDatePicker {...props} />;
};

export default DatePicker;
