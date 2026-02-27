import { useDarkMode } from '../../contexts/DarkModeContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const FALLBACK_WEEKLY = [
  { week: 'Week 1', spent: 0, budget: 250 },
  { week: 'Week 2', spent: 0, budget: 250 },
  { week: 'Week 3', spent: 0, budget: 250 },
  { week: 'Week 4', spent: 0, budget: 250 },
];

const FALLBACK_MONTHLY = [
  { month: 'Sep', spent: 0 },
  { month: 'Oct', spent: 0 },
  { month: 'Nov', spent: 0 },
  { month: 'Dec', spent: 0 },
  { month: 'Jan', spent: 0 },
  { month: 'Feb', spent: 0 },
];

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`px-4 py-3 rounded-2xl shadow-xl border text-sm ${
        darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-100 text-gray-900'
      }`}>
        <p className="font-bold mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">
            {p.name}: ₱{p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function SpendingChart({ view = 'weekly', weeklyData, monthlyData }) {
  const { darkMode } = useDarkMode();

  const data    = view === 'weekly'
    ? (weeklyData?.length  ? weeklyData  : FALLBACK_WEEKLY)
    : (monthlyData?.length ? monthlyData : FALLBACK_MONTHLY);
  const dataKey = view === 'weekly' ? 'week' : 'month';

  return (
    <div style={{ width: '100%', height: 220, overflowX: 'auto' }}>
      <BarChart
        width={480}
        height={220}
        data={data}
        barCategoryGap="30%"
        barGap={4}
      >
        <defs>
          {data.map((_, i) => (
            <linearGradient key={i} id={`spendGrad${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#10b981" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} vertical={false} />
        <XAxis
          dataKey={dataKey}
          tick={{ fontSize: 11, fontWeight: 600, fill: darkMode ? '#6b7280' : '#9ca3af' }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fontWeight: 600, fill: darkMode ? '#6b7280' : '#9ca3af' }}
          axisLine={false} tickLine={false}
          tickFormatter={(v) => `₱${v}`}
          width={45}
        />
        <Tooltip
          content={<CustomTooltip darkMode={darkMode} />}
          cursor={{ fill: darkMode ? '#ffffff08' : '#00000005' }}
        />
        {view === 'weekly' && (
          <Bar dataKey="budget" name="Budget" fill={darkMode ? '#1f2937' : '#e5e7eb'} radius={[6, 6, 0, 0]} />
        )}
        <Bar dataKey="spent" name="Spent" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={view === 'weekly' && entry.spent > entry.budget ? '#f43f5e' : `url(#spendGrad${i})`}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}