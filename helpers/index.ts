export const getUserInitials = ({ name }: { name: string }) => {
  const nameSplit = name.split(' ');
  const initialFirst = nameSplit[0][0];
  const initialLast = nameSplit[1][0];

  return initialFirst + initialLast;
};
