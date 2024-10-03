import React from 'react';
import { ImageListType } from 'react-images-uploading';
import { useRouter } from 'next/router';

import GlobalContext from '../../../../../../context/GlobalContext';
import { Cookbook, Recipe } from '../../../../../../types';
import { RecipeAddFormIngredient, RecipeAddFormStep } from '../types';

import {
  RECIPE_FORM_DEFAULTS,
  RECIPE_INGREDIENTS_DEFAULTS,
  RECIPE_STEPS_DEFAULTS,
} from '../constants';

import { getRecipeFormErrors } from '../helpers';
import { RecipeIngredient } from '../../../../../../types/Recipe/Recipe';

interface useRecipeDetailProps {
  recipeId?: string;
}

export const useRecipeDetail = ({ recipeId }: useRecipeDetailProps) => {
  const router = useRouter();
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
  const [recipeAuthor, setRecipeAuthor] = React.useState<string>();
  const [recipeImage, setRecipeImage] = React.useState<ImageListType>();
  const [recipeImageUrl, setRecipeImageUrl] = React.useState<string>();
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

  const handleGetRecipeById = async ({ recipeId }: { recipeId: string }) => {
    await fetch(`/api/recipe/get?recipeId=${recipeId}`).then(async res => {
      const recipe = await res.json();

      setRecipeAuthor(recipe.author);
      setCookbook(recipe.cookbook);
      setIngredientsRows(
        (recipe.ingredients as RecipeIngredient[]).map(ingredient => ({
          ...ingredient,
          ...{
            ingredientMeasurement:
              ingredient.ingredientMeasurement?.charAt(0).toUpperCase() +
              ingredient.ingredientMeasurement?.slice(1),
          },
        })),
      );
      setStepRows(recipe.steps);
      setRecipeName(recipe.title);

      if (recipe.imageUrl) setRecipeImageUrl(recipe.imageUrl);
      if (recipe.temperature) setTemperature(recipe.temperature);
      if (recipe.time) setCookTime(recipe.time);
      if (recipe.type) setCookType(recipe.type);
    });
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
    setRows(rows);
  };

  const handleSubmit = async () => {
    const currentErrors = getRecipeFormErrors({ newRecipeData });

    if (!!currentErrors.length) {
      setErrors(currentErrors);
    } else {
      if (recipeImage) {
        const photoFile = !!recipeImage?.length ? recipeImage[0].file : null;
        const photoFileType = photoFile ? photoFile?.type : 'application/octet-stream';

        if (photoFile) {
          await fetch('/api/photo-uploader/blob', {
            method: 'POST',
            headers: {
              'content-type': photoFileType,
            },
            body: photoFile,
          })
            .then(async res => {
              const { url } = await res.json();
              const newRecipe = { ...newRecipeData, ...{ imageUrl: url } };

              await fetch('/api/recipe/add', {
                body: JSON.stringify(newRecipe),
                method: 'POST',
              });
            })
            .catch(e => console.log(e));
        }
      } else {
        await fetch('/api/recipe/add', {
          body: JSON.stringify(newRecipeData),
          method: 'POST',
        });
      }

      router.push('/recipes');
    }
  };

  React.useEffect(() => {
    if (recipeId) {
      handleGetRecipeById({ recipeId });
    }
  }, [recipeId]);

  React.useEffect(() => {
    if (user) {
      setNewRecipeData({
        ...newRecipeData,
        ...{
          author: recipeAuthor ?? user?.firstName,
          cookbook: cookbook,
          ingredients: ingredientsRows,
          steps: stepRows,
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
    recipeImage,
    recipeImageUrl,
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
    setRecipeImage,
    setRecipeName,
    setStepRows,
    setTemperature,
  };
};
