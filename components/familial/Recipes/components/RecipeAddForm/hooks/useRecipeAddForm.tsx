import React from 'react';
import GlobalContext from '../../../../../../context/GlobalContext';
import { Cookbook, Recipe } from '../../../../../../types';
import { RecipeAddFormIngredient, RecipeAddFormStep } from '../types';

import {
  RECIPE_FORM_DEFAULTS,
  RECIPE_INGREDIENTS_DEFAULTS,
  RECIPE_STEPS_DEFAULTS,
} from '../constants';

import { getRecipeFormErrors, getRecipeIngredients, getRecipeSteps } from '../helpers';

export const useRecipeAddForm = () => {
  const {
    state: { user },
  } = React.useContext(GlobalContext);

  const [allCookbooks, setAllCookbooks] = React.useState<Cookbook[]>([]);
  const [cookbook, setCookbook] = React.useState<string>('Select a cookbook...');
  const [cookType, setCookType] = React.useState<string>('Select cook type...');
  const [cookTime, setCookTime] = React.useState<string>('');
  const [errors, setErrors] = React.useState<{ id: string; error: string }[]>([]);
  const [ingredientsRows, setIngredientsRows] = React.useState<RecipeAddFormIngredient[]>(
    RECIPE_INGREDIENTS_DEFAULTS,
  );
  const [newRecipeData, setNewRecipeData] = React.useState<Recipe>(RECIPE_FORM_DEFAULTS);
  const [recipeName, setRecipeName] = React.useState<string>('');
  const [stepRows, setStepRows] = React.useState<RecipeAddFormStep[]>(RECIPE_STEPS_DEFAULTS);
  const [temperature, setTemperature] = React.useState('');

  const handleAddRowClick = ({
    newRow,
    rows,
    setRows,
  }: {
    newRow: RecipeAddFormIngredient | RecipeAddFormStep;
    rows: RecipeAddFormIngredient[] | RecipeAddFormStep[];
    setRows: React.Dispatch<React.SetStateAction<any>>;
  }) => {
    const newRows = [...rows, ...[newRow]];
    setRows(newRows);
  };

  const handleDeleteRowClick = ({
    rowKeyToDelete,
    rows,
    setRows,
  }: {
    rowKeyToDelete: number;
    rows: RecipeAddFormIngredient[] | RecipeAddFormStep[];
    setRows: React.Dispatch<React.SetStateAction<any>>;
  }) => {
    const newRows = rows.filter((_, rowKey) => rowKey !== rowKeyToDelete);
    setRows(newRows);
  };

  const handleRowChange = ({
    rowKeyToChange,
    rowField,
    rowFieldValue,
    rows,
    setRows,
  }: {
    rowKeyToChange: number;
    rowField: string;
    rowFieldValue: string;
    rows: any[];
    setRows: React.Dispatch<React.SetStateAction<any>>;
  }) => {
    let newRows = [...rows];
    newRows[rowKeyToChange][rowField] = rowFieldValue;
    setRows(newRows);
  };

  const handleSubmit = () => {
    const currentErrors = getRecipeFormErrors({ newRecipeData });

    if (!!currentErrors) {
      setErrors(currentErrors);
    } else {
      // console.log('All gooood keep it pushin');
    }
  };

  React.useEffect(() => {
    if (user) {
      setNewRecipeData({
        ...newRecipeData,
        ...{
          author: user?.firstName,
          cookbook: cookbook,
          ingredients: getRecipeIngredients({ ingredientsRows }),
          steps: getRecipeSteps({ stepRows }),
          temperature: temperature,
          time: cookTime,
          title: recipeName,
          type: cookType,
        },
      });
    }
  }, [cookbook, cookTime, cookType, ingredientsRows, recipeName, stepRows, temperature]);

  return {
    handleAddRowClick,
    handleDeleteRowClick,
    handleRowChange,
    handleSubmit,
    allCookbooks,
    cookbook,
    cookTime,
    cookType,
    errors,
    ingredientsRows,
    newRecipeData,
    recipeName,
    stepRows,
    temperature,
    setAllCookbooks,
    setCookTime,
    setCookType,
    setCookbook,
    setErrors,
    setIngredientsRows,
    setNewRecipeData,
    setRecipeName,
    setStepRows,
    setTemperature,
  };
};
