import { useDarkMode } from '../../contexts/DarkModeContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const weeklyData = [
  { week: 'Week 1', spent: 145, budget: 150 },
  { week: 'Week 2', spent: 132, budget: 150 },
  { week: 'Week 3', spent: 158, budget: 150 },
  { week: 'Week 4', spent: 98,  budget: 150 },
];

const monthlyData = [
  { month: 'Sep', spent: 480 },
  { month: 'Oct', spent: 520 },
  { month: 'Nov', spent: 445 },
  { month: 'Dec', spent: 610 },
  { month: 'Jan', spent: 530 },
  { month: 'Feb', spent: 475 },
];

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`px-4 py-3 rounded-2xl shadow-xl border text-sm ${
        darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-100 text-gray-900'
      }`}>
        <p className="font-bold mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">{p.name}: ₱{p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export function SpendingChart({ view = 'weekly' }) {
  const { darkMode } = useDarkMode();
  const data = view === 'weekly' ? weeklyData : monthlyData;
  const dataKey = view === 'weekly' ? 'week' : 'month';

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} barCategoryGap="30%" barGap={4}>
        <defs>
          {data.map((_, i) => (
            <linearGradient key={i} id={`spendGrad${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} vertical={false} />
        <XAxis dataKey={dataKey} tick={{ fontSize: 11, fontWeight: 600, fill: darkMode ? '#6b7280' : '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: darkMode ? '#6b7280' : '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₱${v}`} width={45} />
        <Tooltip content={<CustomTooltip darkMode={darkMode} />} cursor={{ fill: darkMode ? '#ffffff08' : '#00000005' }} />
        {view === 'weekly' && (
          <Bar dataKey="budget" name="Budget" fill={darkMode ? '#1f2937' : '#e5e7eb'} radius={[6, 6, 0, 0]} />
        )}
        <Bar dataKey="spent" name="Spent" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={view === 'weekly' && entry.spent > entry.budget ? '#f43f5e' : `url(#spendGrad${i})`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}