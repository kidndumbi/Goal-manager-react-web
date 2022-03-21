import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { useFormikContext } from "formik";
import { Button } from "react-bootstrap";

const CustomInput = forwardRef((props: any, ref: any) => {
  return (
    <Button variant="primary" onClick={props.onClick} ref={ref}>
      <i className="bi bi-calendar3 me-2"></i>
      {props.value || props.placeholder}
    </Button>
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

    const { setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <DatePicker
      selected={props.value}
      name={props.name}
      onBlur={props.onBlur}
      onChange={(value) => {
        setFieldValue(props.name, value);
        setFieldTouched(props.name, true);
      }}
      timeInputLabel={props.timeInputLabel || "Time:"}
      dateFormat={ props.dateFormat || "MM/dd/yyyy h:mm aa"}
      showTimeInput={props.showTimeInput !== undefined ? props.showTimeInput : true}
      customInput={<CustomInput />}
    />
  );
};

export { DatePickerWrapper };
