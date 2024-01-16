import React, { useState, useEffect, ChangeEvent } from 'react';
import { Category } from '../../resources/expense/expense.resource';

interface CategorySelectorProps {
  availableCategories: Category[] | null | undefined
  onCategoriesChange: (categories: string[]) => void
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ availableCategories, onCategoriesChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setNewCategory(event.target.value);
  };

  const handleAddCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (newCategory.trim() !== '' && !selectedCategories.includes(newCategory)) {
      setSelectedCategories([...selectedCategories, newCategory]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    const updatedCategories = selectedCategories.filter((c) => c !== category);
    setSelectedCategories(updatedCategories);
  };

  useEffect(() => {
    onCategoriesChange(selectedCategories);
  }, [selectedCategories, onCategoriesChange]);

  return (
    <div>
      <div className="flex items-center">
        <select
          onChange={handleCategoryChange}
          value={newCategory}
          className="border px-3 py-2 rounded-l-md focus:outline-none focus:border-blue-500"
        >
          <option value="" disabled>Select a category</option>
          {availableCategories && availableCategories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
        >
          Add
        </button>
      </div>
      <div className="mt-2 flex flex-wrap">
        {selectedCategories.map((category) => (
          <span
            key={category}
            className="bg-blue-500 text-white px-2 py-1 rounded-full mr-2 mt-2 flex items-center"
          >
            {category}
            <button
              onClick={() => handleRemoveCategory(category)}
              className="ml-3 mr-1 focus:outline-none text-lg"
            >
              x
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
