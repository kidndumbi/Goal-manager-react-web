import * as Yup from "yup";

const validateDueDate = (
  goalDueDate: number | null | undefined,
  dataToEditType: string
) => {
  return (objeDate: any) => {
    if (dataToEditType === "goalHeaders") return true;

    const goalDate: Date = new Date(goalDueDate!);

    goalDate.setSeconds(0, 0);
    const objectiveDate = new Date(
      isNaN(objeDate) ? objeDate : parseInt(objeDate)
    );
    objectiveDate.setSeconds(0, 0);

    return objectiveDate.getTime() <= goalDate.getTime();
  };
};

const EditModalSchema = ({
  goalDueDate,
  dataToEditType,
}: {
  goalDueDate: number | null | undefined;
  dataToEditType: string;
}) => {
  return Yup.object().shape({
    name: Yup.string().required("Required"),
    dueDate: Yup.string()
      .nullable()
      .required("Required")
      .test(
        "is-date-greater",
        "Objective date cannot be greater than goal date!",
        validateDueDate(goalDueDate, dataToEditType)
      ),
  });
};

export { EditModalSchema };
