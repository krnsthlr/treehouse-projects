'use strict';

var recipes = [
  {
    name: 'Simple Beef Stew',
    description: 'This is the recipe from when I was in college.',
    category: 'Soup',
    prepTime: 20,
    cookTime: 145,
    ingredients: [
      {
        foodItem: 'Beef',
        condition: 'Sliced',
        amount: '2 cups'
      },
      {
        foodItem: 'Water',
        condition: '',
        amount: '3 cups'
      },
      {
        foodItem: 'Onion',
        condition: 'Diced',
        amount: '1 cup'
      },
      {
        foodItem: 'Salt',
        condition: '',
        amount: 'to taste'
      }
    ],
    steps: [
      {
        description: 'Slice the beef.'
      },
      {
        description: 'Brown the beef in a medium-size pan.'
      },
      {
        description: 'Add onion and sautee until golden.'
      },
      {
        description: 'Add water and simmer for 2 hours.'
      },
      {
        description: 'Add salt to taste.'
      }
    ]
  },
  {
    name: 'Homemade Waffles',
    description: 'This is the recipe for my grandma\'s homemade waffles.',
    category: 'Entree',
    prepTime: 20,
    cookTime: 10,
    ingredients: [
      {
        foodItem: 'Flour',
        condition: 'Filtered',
        amount: '3 cups'
      },
      {
        foodItem: 'Egg',
        condition: 'Large',
        amount: '1'
      },
      {
        foodItem: 'Water',
        condition: 'Filtered',
        amount: '1.5 cups'
      },
      {
        foodItem: 'Baking Powder',
        condition: '',
        amount: '2 tablespoons'
      }
    ],
    steps: [
      {
        description: 'Measure the flour and pour into a large bowl.'
      }
    ]
  },
  {
    name: 'Cabbage Salad',
    description: 'Simple, light and tasty cabbage salad.',
    category: 'Salad',
    prepTime: 10,
    cookTime: 60,
    ingredients: [
      {
        foodItem: 'Cabbage',
        condition: 'Chopped',
        amount: '3 cups'
      },
      {
        foodItem: 'Carrot',
        condition: 'Grated',
        amount: '.5 cups'
      },
      {
        foodItem: 'Rice Wine Vinegar',
        condition: '',
        amount: '.25 cups'
      },
      {
        foodItem: 'Sesame Seed Oil',
        condition: '',
        amount: '3 tablespoons'
      }
    ],
    steps: [
      {
        description: 'Put the cabbage into a large bowl.'
      },
      {
        description: 'Add grated carrot.'
      },
      {
        description: 'Mix vinegar and oil.'
      },
      {
        description: 'Add vinegar and oil to cabbage mix. Mix thoroughly and let set for 1 hour before eating.'
      }
    ]
  },
  {
    name: 'Grilled Steak',
    description: 'Simple and tasty meat dish.',
    category: 'Entree',
    prepTime: 65,
    cookTime: 10,
    ingredients: [
      {
        foodItem: 'Steak',
        condition: 'Fresh',
        amount: '1 Steak per person'
      },
      {
        foodItem: 'Pepper',
        condition: 'Ground',
        amount: 'To taste'
      },
      {
        foodItem: 'Salt',
        condition: '',
        amount: 'To taste'
      }
    ],
    steps: [
      {
        description: 'Add salt and pepper to taste to raw steak.'
      },
      {
        description: 'Let steaks sit at room temperature for 1 hour.'
      },
      {
        description: 'Grill over open flame for 5 minutes.'
      },
      {
        description: 'Flip steaks and let grill until done (approx 5 minutes).'
      }
    ]
  },
  {
    name: 'Stone Soup',
    description: 'This is the recipe for when you are camping and have nothing but rocks.',
    category: 'Soup',
    prepTime: 20,
    cookTime: 145,
    ingredients: [
      {
        foodItem: 'Stones',
        condition: 'Cleaned',
        amount: 'Few dozen'
      },
      {
        foodItem: 'Water',
        condition: '',
        amount: '3 cups'
      },
      {
        foodItem: 'Salt',
        condition: '',
        amount: 'to taste'
      },
      {
        foodItem: 'Pepper',
        condition: '',
        amount: 'to taste'
      }
    ],
    steps: [
      {
        description: 'Add rocks and water to pot and simmer for 2 hours.'
      },
      {
        description: 'Add salt to taste.'
      }
    ]
  },
  {
    name: 'Lemonde',
    description: 'Refreshing summer-time drink.',
    category: 'Beverage',
    prepTime: 20,
    cookTime: 0,
    ingredients: [
      {
        foodItem: 'Lemons',
        condition: '',
        amount: '12'
      },
      {
        foodItem: 'Water',
        condition: '',
        amount: '10 cups'
      },
      {
        foodItem: 'Sugar',
        condition: '',
        amount: '1 cup'
      }
    ],
    steps: [
      {
        description: 'Slice the lemons in half.'
      },
      {
        description: 'Squeeze lemons by hand or with a lemon squeezer into pitcher.'
      },
      {
        description: 'Remove seeds from pitcher.'
      },
      {
        description: 'Add water.'
      },
      {
        description: 'Add sugar and stir thoroughly until sugar is dissolved.'
      },
      {
        description: 'Serve in chilled glasses with ice.'
      }
    ]
  },
  ,
  {
    name: 'Grilled Cheese Sandwich',
    description: 'Quick to prepare and delicious chees sandwiches.',
    category: 'Appetizer/Snack',
    prepTime: 10,
    cookTime: 7,
    ingredients: [
      {
        foodItem: 'Cheese',
        condition: 'American, Swiss or your choice',
        amount: '2 slices per sandwich'
      },
      {
        foodItem: 'Bread',
        condition: 'Sliced',
        amount: '2'
      },
      {
        foodItem: 'Pepper',
        condition: 'Ground',
        amount: 'To taste'
      },
      {
        foodItem: 'Butter',
        condition: 'Room Temperature',
        amount: '2 Tablespoons'
      },
    ],
    steps: [
      {
        description: 'Melt butter in gtill pan over medium heat until bubbling.'
      },
      {
        description: 'Place one slice of bread in butter.'
      },
      {
        description: 'Add cheese and last slice of bread.'
      },
      {
        description: 'Grill for 4 minutes.'
      },
      {
        description: 'Flip sandwich over and press down with spatula.'
      },
      {
        description: 'Grill 3 more minutes.'
      },
      {
        description: 'Grill until golden brown on both sides'
      }
    ]
  }
];

module.exports = recipes;
