type RecipeAddFormAddClick = ({
  newRow,
  rows,
  setRows,
}: {
  newRow: RecipeAddFormIngredient | RecipeAddFormStep;
  rows: RecipeAddFormIngredient[] | RecipeAddFormStep[];
  setRows: React.Dispatch<React.SetStateAction<any>>;
}) => void;

type RecipeAddFormDeleteClick = ({
  rowKeyToDelete,
  rows,
  setRows,
}: {
  rowKeyToDelete: number;
  rows: RecipeAddFormIngredient[] | RecipeAddFormStep[];
  setRows: React.Dispatch<React.SetStateAction<any>>;
}) => void;

type RecipeAddFormIngredient = {
  ingredient: string;
  ingredientMeasurement: string;
  ingredientQuantity: number;
};

type RecipeAddFormRowChange = ({
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
}) => void;

type RecipeAddFormStep = {
  step: string;
};

export {
  RecipeAddFormAddClick,
  RecipeAddFormDeleteClick,
  RecipeAddFormIngredient,
  RecipeAddFormRowChange,
  RecipeAddFormStep,
};
