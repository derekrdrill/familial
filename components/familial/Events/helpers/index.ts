const getDateString = ({ date }: { date: string[] }) => {
  if (date.length === 1) {
    return new Date(date[0]).toLocaleDateString();
  } else if (date.length === 2) {
    return `${new Date(date[0]).toLocaleDateString()} - ${new Date(date[1]).toLocaleDateString()}`;
  }

  return '';
};

const getTimeString = ({ time }: { time: string[] }) => {
  if (time.length === 1) {
    return time[0];
  } else if (time.length === 2) {
    return `${time[0]} - ${time[1]}`;
  }

  return;
};

export { getDateString, getTimeString };
