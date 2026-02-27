import { useDarkMode } from '../../contexts/DarkModeContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const FALLBACK_DATA = [
  { month: 'Sep', savings: 0, target: 200 },
  { month: 'Oct', savings: 0, target: 200 },
  { month: 'Nov', savings: 0, target: 200 },
  { month: 'Dec', savings: 0, target: 200 },
  { month: 'Jan', savings: 0, target: 200 },
  { month: 'Feb', savings: 0, target: 200 },
];

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`px-4 py-3 rounded-2xl shadow-xl border text-sm ${
        darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-100 text-gray-900'
      }`}>
        <p className="font-bold mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="font-semibold" style={{ color: p.color }}>
            {p.name}: ₱{p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function SavingsTracker({ savingsHistory }) {
  const { darkMode } = useDarkMode();

  const data       = savingsHistory?.length ? savingsHistory : FALLBACK_DATA;
  const totalSaved = data.reduce((s, d) => s + d.savings, 0);
  const lastMonth  = data[data.length - 1]?.savings || 0;
  const prevMonth  = data[data.length - 2]?.savings || 0;
  const change     = prevMonth > 0 ? Math.round(((lastMonth - prevMonth) / prevMonth) * 100) : 0;

  return (
    <div>
      {/* Mini stat row */}
      <div className="flex items-center gap-4 mb-4">
        <div>
          <p className={`text-2xl font-black ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            ₱{totalSaved.toLocaleString()}
          </p>
          <p className={`text-xs font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Total saved (6 months)
          </p>
        </div>
        {change !== 0 && (
          <div className={`ml-auto px-3 py-1.5 rounded-xl text-xs font-black ${
            change >= 0
              ? darkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-700'
              : darkMode ? 'bg-rose-900/40 text-rose-400'       : 'bg-rose-50 text-rose-700'
          }`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% vs last month
          </div>
        )}
      </div>

      {/* Area chart — fixed size, NO ResponsiveContainer */}
      <div style={{ width: '100%', height: 180, overflowX: 'auto' }}>
        <AreaChart width={480} height={180} data={data}>
          <defs>
            <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#6366f1" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fontWeight: 600, fill: darkMode ? '#6b7280' : '#9ca3af' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fontWeight: 600, fill: darkMode ? '#6b7280' : '#9ca3af' }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => `₱${v}`}
            width={45}
          />
          <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
          <Area
            type="monotone"
            dataKey="target"
            name="Target"
            stroke="#6366f1"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="url(#targetGrad)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="savings"
            name="Saved"
            stroke="#10b981"
            strokeWidth={2.5}
            fill="url(#savingsGrad)"
            dot={{ fill: '#10b981', r: 4, strokeWidth: 2, stroke: darkMode ? '#1f2937' : '#fff' }}
            activeDot={{ r: 6, fill: '#10b981' }}
          />
        </AreaChart>
      </div>
    </div>
  );
}