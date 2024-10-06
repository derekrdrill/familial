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
  'Bag',
  'Bottle',
  'Bundle',
  'Can',
  'Cup',
  'Gram',
  'Gallon',
  'Half',
  'Liter',
  'Milliter',
  'Pint',
  'Ounce',
  'Pinch',
  'Pound',
  'Quart',
  'Tablespoon',
  'Teaspoon',
  'Whole',
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
    ingredientMeasurement: 'Select measurement type...',
    ingredientQuantity: '',
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
    fields: [{ id: 'ingredient' }, { id: 'ingredientQuantity', isNumber: true }],
    id: 'ingredients',
    isMulti: true,
    title: 'ingredient',
  },
  {
    fields: [{ id: 'step' }],
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
