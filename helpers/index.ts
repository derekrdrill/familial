import { User } from '../types';

const getCreatedByUserName = ({
  createdByUser,
  loggedInUser,
}: {
  createdByUser?: User;
  loggedInUser?: User;
}) => {
  return createdByUser?.userID === loggedInUser?.userID ? 'You' : createdByUser?.firstName;
};

const getUserInitials = ({ name }: { name: string }) => {
  const nameSplit = name.split(' ');
  const initialFirst = nameSplit[0][0];
  const initialLast = nameSplit[1][0];

  return initialFirst + initialLast;
};

export { getCreatedByUserName, getUserInitials };
