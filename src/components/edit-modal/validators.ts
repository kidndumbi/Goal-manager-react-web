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

export { validateDueDate };
