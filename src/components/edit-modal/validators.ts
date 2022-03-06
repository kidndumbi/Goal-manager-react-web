import * as Yup from "yup";

const validateDueDate = (mainDuedate: number) => {
  return (objeDate: any) => {
    const goalDueDate: Date = new Date(mainDuedate);
    goalDueDate.setSeconds(0, 0);
    const objectiveDate = new Date(
      isNaN(objeDate) ? objeDate : parseInt(objeDate)
    );
    objectiveDate.setSeconds(0, 0);

    return objectiveDate.getTime() <= goalDueDate.getTime();
  };
};

const EditModalSchema = ({ mainDuedate }: any) => {
   
    return Yup.object().shape({
        name: Yup.string().required("Required"),
        dueDate: Yup.string()
          .nullable()
          .required("Required")
          .test("is-date-greater", "Objective date cannot be greater than goal date!", validateDueDate(mainDuedate)),
      });
}


export { EditModalSchema };
