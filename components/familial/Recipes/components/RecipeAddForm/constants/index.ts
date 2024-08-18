const COOK_TYPES = [
  'Select cook type...',
  'Bake',
  'Broil',
  'Boil',
  'Grill',
  'Fry',
  'Roast',
  'Sautee',
  'Steam',
];

const MEASUREMENT_TYPES = [
  'Select measurement type...',
  'Gram',
  'Gallon',
  'Liter',
  'Milliter',
  'Pint',
  'Ounce',
  'Pound',
  'Quart',
  'Tablespoon',
  'Teaspoon',
];

const RECIPE_FORM_DEFAULTS = {
  cookbook: '',
  ingredients: [],
  steps: [],
  temperature: '',
  time: '',
  title: '',
  type: '',
};

const RECIPE_INGREDIENTS_DEFAULTS = [
  {
    ingredient: '',
    ingredientMeasurementType: 'Select measurement type...',
    ingredientQuantity: 0,
  },
];

const RECIPE_STEPS_DEFAULTS = [{ step: '' }];

const REQUIRED_FIELDS = [
  {
    id: 'title',
    title: 'recipe title',
  },
  { id: 'cookbook', isSelect: true, title: 'cookbook' },
  { id: 'time', title: 'cook time' },
  {
    id: 'ingredients',
    isMulti: true,
    title: 'ingredient',
  },
  {
    id: 'steps',
    isMulti: true,
    title: 'step',
  },
];

export {
  COOK_TYPES,
  MEASUREMENT_TYPES,
  RECIPE_FORM_DEFAULTS,
  RECIPE_INGREDIENTS_DEFAULTS,
  RECIPE_STEPS_DEFAULTS,
  REQUIRED_FIELDS,
};
