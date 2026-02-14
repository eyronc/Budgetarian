interface DashboardProps {
  userEmail: string;
}

export function Dashboard({ userEmail }: DashboardProps) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome back, {userEmail}!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Budget Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Budget</h3>
          <p className="text-3xl font-bold text-green-600">$150</p>
          <p className="text-sm text-gray-500 mt-2">$45 remaining</p>
        </div>

        {/* Meals Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Meals This Week</h3>
          <p className="text-3xl font-bold text-blue-600">21</p>
          <p className="text-sm text-gray-500 mt-2">7 days planned</p>
        </div>

        {/* Nutrition Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg Calories</h3>
          <p className="text-3xl font-bold text-orange-600">2,100</p>
          <p className="text-sm text-gray-500 mt-2">On track</p>
        </div>
      </div>
    </div>
  );
}