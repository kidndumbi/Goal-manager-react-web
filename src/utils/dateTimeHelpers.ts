const timeDiffCalc = (endDate: Date, startDate: Date) => {
  let diffInMilliSeconds =
    Math.abs(endDate.getTime() - startDate.getTime()) / 1000;

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  const seconds = Math.floor(diffInMilliSeconds);

  let difference = "";
  if (days > 0) {
    difference += days === 1 ? `${days} day, ` : `${days} days, `;
  }

  difference +=
    hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

  difference +=
    minutes === 0 || hours === 1 ? `${minutes} minutes` : `${minutes} minutes`;

  difference += ` ${seconds} seconds`;

  return difference;
};

const checkIfDatesAreEqual = (dateOne: Date, datetwo: Date): boolean => {
  return (
    dateOne.getFullYear() === datetwo.getFullYear() &&
    dateOne.getMonth() === datetwo.getMonth() &&
    dateOne.getDate() === datetwo.getDate()
  );
};

const checkIfDateGreater = (dateOne: Date, datetwo: Date): boolean => {
  return dateOne.getTime() > datetwo.getTime();
};

export { timeDiffCalc, checkIfDatesAreEqual, checkIfDateGreater };
