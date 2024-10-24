import React from 'react';
import { ImageListType } from 'react-images-uploading';
import { useRouter } from 'next/router';

import GlobalContext from '../../../../../../context/GlobalContext';
import { Cookbook, FormError, Recipe } from '../../../../../../types';
import { RecipeAddFormIngredient, RecipeAddFormStep } from '../types';

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
  const [errors, setErrors] = React.useState<FormError[]>([]);
  const [ingredients, setIngredients] = React.useState<RecipeAddFormIngredient[]>([
    {
      ingredient: '',
      ingredientMeasurement: 'Select measurement type...',
      ingredientQuantity: '',
    },
  ]);
  const [isRecipeDetailLoading, setIsRecipeDetailLoading] = React.useState<boolean>(false);
  const [isRecipeFormSubmitting, setIsRecipeFormSubmiting] = React.useState<boolean>(false);
  const [newRecipeData, setNewRecipeData] = React.useState<Recipe>({
    cookbook: '',
    ingredients: [],
    steps: [],
    temperature: '',
    time: '',
    title: '',
    type: '',
  });
  const [recipeAuthor, setRecipeAuthor] = React.useState<string>();
  const [recipeAuthorId, setRecipeAuthorId] = React.useState<string>();
  const [recipeAuthorImageUrl, setRecipeAuthorImageUrl] = React.useState<string>();
  const [recipeImage, setRecipeImage] = React.useState<ImageListType>();
  const [recipeImageUrl, setRecipeImageUrl] = React.useState<string>();
  const [recipeName, setRecipeName] = React.useState<string>('');
  const [recipeUploadedAt, setRecipeUploadedAt] = React.useState<string>('');
  const [steps, setStepRows] = React.useState<RecipeAddFormStep[]>([{ step: '' }]);
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
      setRecipeAuthorId(recipe.authorId);
      setRecipeUploadedAt(recipe.uploadedAt.toString());
      setCookbook(recipe.cookbook);
      setIngredients(
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

      if (recipe.authorImageUrl) setRecipeAuthorImageUrl(recipe.authorImageUrl);
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
    setRows(newRows);
  };

  const handleEditRecipe = async () => {
    const updatedRecipe = {
      ...newRecipeData,
      ...{
        _id: recipeId,
        authorId: recipeAuthorId,
        imageUrl: recipeImageUrl,
        uploadedAt: new Date(recipeUploadedAt),
      },
    };

    await fetch(`/api/recipe/update`, {
      method: 'PUT',
      body: JSON.stringify(updatedRecipe),
    }).then(async res => {
      await res.json();

      sessionStorage.setItem(
        'newRecipeData',
        JSON.stringify({
          cookbook: newRecipeData.cookbook,
          isEditing: true,
          title: newRecipeData.title,
        }),
      );

      setIngredients([
        {
          ingredient: '',
          ingredientMeasurement: 'Select measurement type...',
          ingredientQuantity: '',
        },
      ]);
      setStepRows([{ step: '' }]);
      setIsRecipeFormSubmiting(false);
      router.push('/recipes');
    });
  };

  const handleAddRecipe = async () => {
    const currentErrors = getRecipeFormErrors({ newRecipeData });

    if (!!currentErrors.length) {
      setErrors(currentErrors);
    } else {
      setIsRecipeFormSubmiting(true);
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
              }).then(async res => {
                await res.json();

                sessionStorage.setItem(
                  'newRecipeData',
                  JSON.stringify({
                    cookbook: newRecipeData.cookbook,
                    title: newRecipeData.title,
                  }),
                );

                setIngredients([
                  {
                    ingredient: '',
                    ingredientMeasurement: 'Select measurement type...',
                    ingredientQuantity: '',
                  },
                ]);
                setIsRecipeFormSubmiting(false);
                setStepRows([{ step: '' }]);
                router.push('/recipes');
              });
            })
            .catch(e => console.log(e));
        }
      } else {
        await fetch('/api/recipe/add', {
          body: JSON.stringify(newRecipeData),
          method: 'POST',
        }).then(async res => {
          await res.json();

          sessionStorage.setItem(
            'newRecipeData',
            JSON.stringify({
              cookbook: newRecipeData.cookbook,
              title: newRecipeData.title,
            }),
          );

          setIngredients([
            {
              ingredient: '',
              ingredientMeasurement: 'Select measurement type...',
              ingredientQuantity: '',
            },
          ]);
          setIsRecipeFormSubmiting(false);
          setStepRows([{ step: '' }]);
          router.push('/recipes');
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (Boolean(router.query.isEditing)) {
      handleEditRecipe();
    } else {
      handleAddRecipe();
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
          authorId: recipeAuthorId ?? user?.userID,
          cookbook: cookbook,
          ingredients: ingredients,
          steps: steps,
          temperature: temperature,
          time: cookTime,
          title: recipeName,
          type: cookType,
        },
      });
    }
  }, [cookbook, cookTime, cookType, ingredients, recipeName, steps, temperature]);

  React.useEffect(() => {
    if (!!errors.length) {
      setErrors(getRecipeFormErrors({ newRecipeData }));
    }
  }, [newRecipeData]);

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
    ingredients,
    isRecipeDetailLoading,
    isRecipeFormSubmitting,
    newRecipeData,
    recipeAuthor,
    recipeAuthorId,
    recipeAuthorImageUrl,
    recipeImage,
    recipeImageUrl,
    recipeName,
    steps,
    temperature,
    setAllCookbooks,
    setCookTime,
    setCookType,
    setCookbook,
    setErrors,
    setIngredients,
    setIsRecipeDetailLoading,
    setIsRecipeFormSubmiting,
    setNewRecipeData,
    setRecipeAuthor,
    setRecipeImage,
    setRecipeName,
    setStepRows,
    setTemperature,
  };
};
