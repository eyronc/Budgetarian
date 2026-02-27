import { useDarkMode } from '../../contexts/DarkModeContext';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const macroData = [
  { name: 'Protein', value: 115, color: '#3b82f6', unit: 'g' },
  { name: 'Carbs',   value: 205, color: '#10b981', unit: 'g' },
  { name: 'Fats',    value: 74,  color: '#f59e0b', unit: 'g' },
];

const weeklyCalories = [
  { day: 'Mon', calories: 1650 },
  { day: 'Tue', calories: 1820 },
  { day: 'Wed', calories: 1540 },
  { day: 'Thu', calories: 1900 },
  { day: 'Fri', calories: 1720 },
  { day: 'Sat', calories: 2100 },
  { day: 'Sun', calories: 1450 },
];

const total = macroData.reduce((s, m) => s + m.value, 0);

const CustomTooltip = ({ active, payload, darkMode }) => {
  if (active && payload && payload.length) {
    const d = payload[0];
    return (
      <div className={`px-4 py-3 rounded-2xl shadow-xl border text-sm ${
        darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-100 text-gray-900'
      }`}>
        <p className="font-bold" style={{ color: d.payload.color }}>{d.name}</p>
        <p className="font-semibold">{d.value}{d.payload.unit}</p>
        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          {Math.round((d.value / total) * 100)}% of total
        </p>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return percent > 0.1 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

export function NutritionChart() {
  const { darkMode } = useDarkMode();
  const maxCal = Math.max(...weeklyCalories.map(x => x.calories));

  return (
    <div className="space-y-6">

      {/* Donut — fixed size, NO ResponsiveContainer */}
      <div className="flex justify-center">
        <PieChart width={200} height={200}>
          <Pie
            data={macroData}
            cx={100}
            cy={100}
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {macroData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
        </PieChart>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2">
        {macroData.map((m) => (
          <div key={m.name} className={`rounded-2xl p-3 border text-center ${
            darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-100'
          }`}>
            <div className="w-2.5 h-2.5 rounded-full mx-auto mb-1.5" style={{ backgroundColor: m.color }} />
            <div className="text-base font-black" style={{ color: m.color }}>{m.value}{m.unit}</div>
            <div className={`text-[10px] font-bold uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {m.name}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly calorie bars — pure CSS, zero recharts */}
      <div>
        <p className={`text-xs font-bold uppercase tracking-wide mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Calories this week
        </p>
        <div className="flex items-end gap-1.5 h-16">
          {weeklyCalories.map((d) => {
            const h = Math.round((d.calories / maxCal) * 100);
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg relative overflow-hidden"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute inset-0 bg-linear-to-b from-blue-400 to-blue-600 rounded-t-lg" />
                </div>
                <span className={`text-[9px] font-bold ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  {d.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}