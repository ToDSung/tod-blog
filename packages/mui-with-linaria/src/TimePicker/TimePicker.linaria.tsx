import { type PickerValidDate } from '@mui/x-date-pickers';
import {
  TimePicker as BaseTimePicker,
  type TimePickerProps,
} from '@mui/x-date-pickers/TimePicker';

const TimePicker = <
  TDate extends PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false
>(
  props: TimePickerProps<TDate, TEnableAccessibleFieldDOMStructure>
) => {
  return <BaseTimePicker {...props} />;
};

export default TimePicker;
