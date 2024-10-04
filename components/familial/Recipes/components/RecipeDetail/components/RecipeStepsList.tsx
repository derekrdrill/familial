import React from 'react';
import GlobalContext from '../../../../../../context/GlobalContext';
import { DrillyTypography } from '../../../../../../styles/globals';
import { RecipeStep } from '../../../../../../types';

type RecipeStepsListProps = { steps: RecipeStep[] };

const RecipeStepsList = ({ steps }: RecipeStepsListProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <div tw='flex flex-col'>
      {steps.map(({ step }, stepKey) => (
        <DrillyTypography component='p' variant='h6' $isDarkMode={isDarkMode}>
          {stepKey + 1}) {step}
        </DrillyTypography>
      ))}
    </div>
  );
};

export default RecipeStepsList;
