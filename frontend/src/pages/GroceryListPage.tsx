import { Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { ShoppingCart, Check, Plus, Trash2, Edit3 } from 'lucide-react';
import { useState } from 'react';

export function GroceryListPage() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const groceryCategories = [
    {
      name: 'Produce',
      icon: '🥬',
      color: 'emerald',
      items: [
        { id: 1, name: 'Avocados', quantity: '4', price: 6.00 },
        { id: 2, name: 'Tomatoes', quantity: '6', price: 4.50 },
        { id: 3, name: 'Spinach', quantity: '2 bags', price: 5.00 },
      ]
    },
    {
      name: 'Protein',
      icon: '🥩',
      color: 'red',
      items: [
        { id: 4, name: 'Chicken Breast', quantity: '2 lbs', price: 12.00 },
        { id: 5, name: 'Salmon Fillets', quantity: '4', price: 18.00 },
        { id: 6, name: 'Eggs', quantity: '1 dozen', price: 4.50 },
      ]
    },
    {
      name: 'Dairy',
      icon: '🥛',
      color: 'blue',
      items: [
        { id: 7, name: 'Greek Yogurt', quantity: '6', price: 7.50 },
        { id: 8, name: 'Milk', quantity: '1 gallon', price: 4.00 },
        { id: 9, name: 'Cheese', quantity: '1 lb', price: 6.00 },
      ]
    },
    {
      name: 'Grains & Pantry',
      icon: '🌾',
      color: 'amber',
      items: [
        { id: 10, name: 'Brown Rice', quantity: '2 lbs', price: 5.50 },
        { id: 11, name: 'Whole Wheat Bread', quantity: '1 loaf', price: 3.50 },
        { id: 12, name: 'Pasta', quantity: '3 boxes', price: 6.00 },
      ]
    },
  ];

  const toggleItem = (id: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const totalItems = groceryCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = checkedItems.size;
  const totalPrice = groceryCategories.reduce((sum, cat) => 
    sum + cat.items.reduce((catSum, item) => 
      catSum + (checkedItems.has(item.id) ? 0 : item.price), 0), 0
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-pink-50/40 to-indigo-50/30">
      <Sidebar onLogout={handleLogout} activeSection="grocery" />
      
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-purple-500 bg-clip-text text-transparent mb-2 tracking-tight pb-3">
                  Grocery List
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">Your shopping list for this week's meals</p>
              </div>
              <button className="px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-purple-300/50 hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base">
                <Plus className="w-5 h-5" />
                Add Item
              </button>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-purple-200/50 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                  <span className="font-bold text-gray-900 text-sm sm:text-base">Shopping Progress</span>
                </div>
                <span className="font-black text-purple-600 text-lg sm:text-xl">{checkedCount}/{totalItems}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 h-full rounded-full transition-all duration-700 ease-out shadow-md"
                  style={{ width: `${(checkedCount / totalItems) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-xs sm:text-sm text-gray-600 text-center font-semibold">
                {Math.round((checkedCount / totalItems) * 100)}% Complete
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Grocery Categories */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-5">
            {groceryCategories.map((category, catIdx) => (
              <div 
                key={category.name} 
                className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300"
                style={{ animationDelay: `${catIdx * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-${category.color}-400 to-${category.color}-600 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-gray-900">{category.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-semibold">{category.items.length} items</p>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  {category.items.map((item, itemIdx) => {
                    const isChecked = checkedItems.has(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                          isChecked
                            ? `bg-gradient-to-r from-${category.color}-50 to-${category.color}-100/50 border-${category.color}-300`
                            : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
                        }`}
                        onClick={() => toggleItem(item.id)}
                        style={{ animationDelay: `${(catIdx * 100) + (itemIdx * 50)}ms` }}
                      >
                        <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-xl border-2 flex items-center justify-center transition-all ${
                          isChecked 
                            ? `bg-gradient-to-br from-${category.color}-500 to-${category.color}-600 border-${category.color}-600 shadow-lg` 
                            : 'border-gray-300 group-hover:border-purple-400'
                        }`}>
                          {isChecked && <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[3]" />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold text-sm sm:text-base transition-all ${
                            isChecked ? 'line-through text-gray-400' : 'text-gray-900'
                          }`}>
                            {item.name}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-500 font-semibold">{item.quantity}</div>
                        </div>
                        
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`font-black text-base sm:text-lg ${isChecked ? 'text-gray-400' : 'text-gray-900'}`}>
                            ₱{item.price.toFixed(2)}
                          </div>
                          <div className="hidden sm:flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                              <Edit3 className="w-4 h-4 text-blue-600" />
                            </button>
                            <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Card - Sticky on desktop */}
          <div className="xl:col-span-1">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-200/50 shadow-xl xl:sticky xl:top-8">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900">Summary</h3>
              </div>
              
              <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-200">
                  <span className="text-gray-700 font-bold text-sm sm:text-base">Total Items</span>
                  <span className="font-black text-gray-900 text-lg sm:text-xl">{totalItems}</span>
                </div>
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl border border-purple-200">
                  <span className="text-purple-700 font-bold text-sm sm:text-base">Checked</span>
                  <span className="font-black text-purple-700 text-lg sm:text-xl">{checkedCount}</span>
                </div>
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-200">
                  <span className="text-gray-700 font-bold text-sm sm:text-base">Remaining</span>
                  <span className="font-black text-gray-900 text-lg sm:text-xl">{totalItems - checkedCount}</span>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-6 sm:pt-8">
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base sm:text-lg font-bold text-gray-700">Estimated Total</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-600">₱</span>
                    <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      {totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 font-semibold">Unchecked items only</p>
                </div>
                
                <button className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-black rounded-2xl hover:shadow-2xl hover:shadow-purple-300/50 hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 text-base sm:text-lg">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  Start Shopping
                </button>

                {/* Quick Stats */}
                <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl border border-purple-200/50">
                    <div className="text-2xl sm:text-3xl font-black text-purple-600">
                      {Math.round((checkedCount / totalItems) * 100)}%
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-bold mt-1">Complete</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl border border-emerald-200/50">
                    <div className="text-2xl sm:text-3xl font-black text-emerald-600">
                      ₱{(totalPrice / (totalItems - checkedCount || 1)).toFixed(2)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 font-bold mt-1">Avg/Item</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}