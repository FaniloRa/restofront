export const categorizedIngredients = (ingredients) => {
  return ingredients.reduce((acc, ingredient) => {
    const categoryName = ingredient.category?.name || "Uncategorized"; // Default category if missing

    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(ingredient);

    return acc;
  }, {});
};
