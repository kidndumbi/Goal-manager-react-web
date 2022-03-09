import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { useFormikContext } from "formik";

const CustomInput = forwardRef((props: any, ref: any) => {
  return (
    <button type="button" onClick={props.onClick} ref={ref}>
      {props.value || props.placeholder}
    </button>
  );
});

interface DatePickerWarapperProps  {
    name: string;
    showTimeInput?: boolean | undefined;
    dateFormat?: string | string[] | undefined;
    timeInputLabel?: string | undefined;
    value: Date | null | undefined;
    onBlur?(event: React.FocusEvent<HTMLInputElement, Element>): void
    onChange(date: Date | null, event: React.SyntheticEvent<any, Event> | undefined): void
}

const DatePickerWrapper = (props: DatePickerWarapperProps) => {

    const { setFieldValue } = useFormikContext();

  return (
    <DatePicker
      selected={props.value}
      name={props.name}
      onBlur={props.onBlur}
      onChange={(value) => {
        setFieldValue(props.name, value);
      }}
      timeInputLabel={props.timeInputLabel || "Time:"}
      dateFormat={ props.dateFormat || "MM/dd/yyyy h:mm aa"}
      showTimeInput={props.showTimeInput !== undefined ? props.showTimeInput : true}
      customInput={<CustomInput />}
    />
  );
};

export { DatePickerWrapper };
