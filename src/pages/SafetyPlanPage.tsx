import React, { useState } from "react";
import { Heart, Check, Edit, Trash2, Plus, AlertTriangle } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type SafetyItem = {
  id: string;
  category: string;
  content: string;
};

const SafetyPlanPage: React.FC = () => {
  const [safetyItems, setSafetyItems] = useLocalStorage<SafetyItem[]>(
    "safety-plan-items",
    []
  );
  const [newItem, setNewItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("warning-signs");
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const categories = [
    {
      id: "warning-signs",
      name: "Warning Signs",
      description: "Signs that might indicate danger",
    },
    {
      id: "safe-people",
      name: "Safe People",
      description: "Trusted individuals you can contact",
    },
    {
      id: "safe-places",
      name: "Safe Places",
      description: "Locations where you can go for safety",
    },
    {
      id: "emergency-contacts",
      name: "Emergency Contacts",
      description: "Important numbers to call for help",
    },
    {
      id: "escape-plan",
      name: "Escape Plan",
      description: "Steps to take when you need to leave quickly",
    },
    {
      id: "essential-items",
      name: "Essential Items",
      description: "Important items to take with you",
    },
  ];

  const addItem = () => {
    if (!newItem.trim()) return;
    const newSafetyItem: SafetyItem = {
      id: Date.now().toString(),
      category: selectedCategory,
      content: newItem,
    };
    setSafetyItems([...safetyItems, newSafetyItem]);
    setNewItem("");
  };

  const startEditing = (item: SafetyItem) => {
    setEditingItem(item.id);
    setEditContent(item.content);
  };

  const saveEdit = (id: string) => {
    setSafetyItems(
      safetyItems.map((item) =>
        item.id === id ? { ...item, content: editContent } : item
      )
    );
    setEditingItem(null);
  };

  const deleteItem = (id: string) => {
    setSafetyItems(safetyItems.filter((item) => item.id !== id));
  };

  const getItemsByCategory = (categoryId: string) => {
    return safetyItems.filter((item) => item.category === categoryId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 dark:text-gray-200">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800 dark:text-purple-400 flex items-center justify-center">
          <Heart className="w-6 h-6 mr-2 text-purple-600 dark:text-purple-400" />
          Your Personal Safety Plan
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Create and manage your safety strategies. All information stays
          private on your device.
        </p>
      </div>

      {/* Safety Plan Introduction */}
      <div className="bg-purple-50 dark:bg-purple-950 border border-purple-100 dark:border-purple-900 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2">
          What is a Safety Plan?
        </h2>
        <p className="text-purple-700 dark:text-purple-400 mb-4">
          A safety plan is a personalized, practical plan that includes ways to
          remain safe while in a relationship, planning to leave, or after
          leaving. It helps you think through lifestyle changes that will help
          keep you safe, and important resources you need to access.
        </p>
        <p className="text-purple-700 dark:text-purple-400">
          Use the categories below to create your customized safety plan.
          Remember to update it regularly as your situation changes.
        </p>
      </div>

      {/* Add New Item Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Add to Your Safety Plan
        </h2>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Select a Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 focus:border-purple-300 dark:focus:border-purple-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {categories.find((c) => c.id === selectedCategory)?.description}
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="new-item"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Add Information
          </label>
          <textarea
            id="new-item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter details for your safety plan..."
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 focus:border-purple-300 dark:focus:border-purple-600 min-h-[100px] bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          />
        </div>

        <button
          onClick={addItem}
          disabled={!newItem.trim()}
          className={`flex items-center px-4 py-2 rounded-lg ${
            newItem.trim()
              ? "bg-purple-600 dark:bg-purple-800 text-white hover:bg-purple-700 dark:hover:bg-purple-900"
              : "bg-purple-300 dark:bg-purple-600 text-white cursor-not-allowed"
          }`}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add to Safety Plan
        </button>
      </div>

      {/* Privacy Notice */}
      <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-100 dark:border-yellow-900 rounded-lg p-4 mb-8 flex items-start">
        <AlertTriangle className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            <strong>Privacy Notice:</strong> Your safety plan is stored only on
            this device. Consider using the disguise feature if someone else
            might access your device. Remember to use the panic button if you
            need to quickly exit.
          </p>
        </div>
      </div>

      {/* Safety Plan Categories */}
      <div className="space-y-8 mb-8">
        {categories.map((category) => {
          const items = getItemsByCategory(category.id);
          return (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {category.name}
              </h3>

              {items.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic py-2">
                  No items added yet. Use the form above to add to this
                  category.
                </p>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="border-b border-gray-100 dark:border-gray-700 pb-3"
                    >
                      {editingItem === item.id ? (
                        <div className="flex flex-col">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 focus:border-purple-300 dark:focus:border-purple-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setEditingItem(null)}
                              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => saveEdit(item.id)}
                              className="flex items-center px-3 py-1 text-sm bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 rounded hover:bg-green-200 dark:hover:bg-green-700"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start group">
                          <p className="text-gray-700 dark:text-gray-300">
                            {item.content}
                          </p>
                          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEditing(item)}
                              className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                              aria-label="Edit item"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteItem(item.id)}
                              className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                              aria-label="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Print Instructions */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-300">
        <p>
          <strong>Tip:</strong> Consider printing a physical copy of your safety
          plan and keeping it in a secure location. You can use your browser's
          print function (Ctrl+P or Cmd+P) to print this page.
        </p>
      </div>
    </div>
  );
};

export default SafetyPlanPage;