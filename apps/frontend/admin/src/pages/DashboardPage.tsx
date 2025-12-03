import React from 'react';

export const DashboardPage: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,547',
      change: '+12%',
      icon: '👥',
      color: 'bg-blue-500'
    },
    {
      title: 'Flight Bookings',
      value: '1,234',
      change: '+8%',
      icon: '✈️',
      color: 'bg-green-500'
    },
    {
      title: 'Hotel Bookings',
      value: '856',
      change: '+15%',
      icon: '🏨',
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue',
      value: '$125,430',
      change: '+23%',
      icon: '💰',
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>📅</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <span>📈</span>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Trends</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            📊 Chart placeholder - integrate with charting library
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            📈 Chart placeholder - integrate with charting library
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { user: 'John Doe', action: 'booked a flight', time: '2 minutes ago' },
            { user: 'Jane Smith', action: 'cancelled hotel reservation', time: '5 minutes ago' },
            { user: 'Mike Johnson', action: 'registered new account', time: '10 minutes ago' },
            { user: 'Sarah Wilson', action: 'updated profile', time: '15 minutes ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                  {activity.user.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <span className="font-medium text-gray-900">{activity.user}</span>
                  <span className="text-gray-600"> {activity.action}</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};