import { type PickerValidDate } from '@mui/x-date-pickers';
import {
  DateTimePicker as BaseDateTimePicker,
  type DateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';

const DateTimePicker = <
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false
>(
  props: DateTimePickerProps<TDate, TEnableAccessibleFieldDOMStructure>
) => {
  return <BaseDateTimePicker {...props} />;
};

export default DateTimePicker;
