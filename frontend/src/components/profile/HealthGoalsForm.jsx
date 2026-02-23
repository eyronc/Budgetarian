import { useState } from 'react';
import { Save, Target, Flame, Zap, Droplets } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

export function HealthGoalsForm({ goals, onSave }) {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({ ...goals });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'gender' || name === 'activityLevel' ? value : Number(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 ${
    darkMode
      ? 'bg-gray-700/60 border-gray-600 text-gray-100'
      : 'bg-gray-50 border-gray-200 text-gray-900'
  }`;

  const labelClass = `block text-xs font-semibold uppercase tracking-wide mb-2 ${
    darkMode ? 'text-gray-400' : 'text-gray-500'
  }`;

  const selectClass = `w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 cursor-pointer ${
    darkMode
      ? 'bg-gray-700/60 border-gray-600 text-gray-100'
      : 'bg-gray-50 border-gray-200 text-gray-900'
  }`;

  const bmi = formData.weight && formData.height
    ? (formData.weight / ((formData.height / 100) ** 2)).toFixed(1)
    : null;

  const getBMILabel = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { label: 'Normal', color: 'text-emerald-500' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  const bmiInfo = bmi ? getBMILabel(Number(bmi)) : null;

  const macroStats = [
    { label: 'Calories', value: formData.dailyCalories, unit: 'kcal', icon: Flame, color: 'from-orange-400 to-orange-600', field: 'dailyCalories' },
    { label: 'Protein', value: formData.proteinGoal, unit: 'g', icon: Zap, color: 'from-blue-400 to-blue-600', field: 'proteinGoal' },
    { label: 'Carbs', value: formData.carbsGoal, unit: 'g', icon: Target, color: 'from-purple-400 to-purple-600', field: 'carbsGoal' },
    { label: 'Fats', value: formData.fatsGoal, unit: 'g', icon: Droplets, color: 'from-yellow-400 to-yellow-600', field: 'fatsGoal' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* BMI Card */}
      {bmi && (
        <div className={`rounded-3xl border p-6 transition-colors ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>Your BMI</p>
              <p className={`text-4xl font-bold ${bmiInfo?.color}`}>{bmi}</p>
              <p className={`text-sm font-semibold mt-1 ${bmiInfo?.color}`}>{bmiInfo?.label}</p>
            </div>
            <div className="text-right">
              <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>Progress</p>
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {formData.weight} kg → {formData.targetWeight} kg
              </p>
              <p className={`text-xs mt-1 ${
                formData.weight > formData.targetWeight ? 'text-orange-500' : 'text-emerald-500'
              }`}>
                {Math.abs(formData.weight - formData.targetWeight)} kg to {formData.weight > formData.targetWeight ? 'lose' : 'gain'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Body Metrics */}
      <div className={`rounded-3xl border p-6 transition-colors ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-base font-bold mb-5 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Body Metrics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Weight (kg)</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} className={inputClass} min="30" max="300" />
          </div>
          <div>
            <label className={labelClass}>Target Weight (kg)</label>
            <input type="number" name="targetWeight" value={formData.targetWeight} onChange={handleChange} className={inputClass} min="30" max="300" />
          </div>
          <div>
            <label className={labelClass}>Height (cm)</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} className={inputClass} min="100" max="250" />
          </div>
          <div>
            <label className={labelClass}>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className={inputClass} min="10" max="120" />
          </div>
          <div>
            <label className={labelClass}>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className={selectClass}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Activity Level</label>
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className={selectClass}>
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
              <option value="veryActive">Very Active</option>
            </select>
          </div>
        </div>
      </div>

      {/* Macro Goals */}
      <div className={`rounded-3xl border p-6 transition-colors ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-base font-bold mb-5 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Daily Nutrition Goals
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {macroStats.map(({ label, value, unit, icon: Icon, color, field }) => (
            <div key={field} className={`p-4 rounded-2xl border transition-colors ${
              darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-100'
            }`}>
              <div className={`w-9 h-9 bg-linear-to-br ${color} rounded-xl flex items-center justify-center shadow-md mb-3`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <label className={labelClass}>{label}</label>
              <div className="flex items-baseline gap-1">
                <input
                  type="number"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full px-2 py-1.5 rounded-lg border text-sm font-bold transition-all outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 ${
                    darkMode
                      ? 'bg-gray-600/60 border-gray-500 text-gray-100'
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                  min="0"
                />
                <span className={`text-xs font-medium shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer"
      >
        <Save className="w-5 h-5" />
        Save Health Goals
      </button>
    </form>
  );
}