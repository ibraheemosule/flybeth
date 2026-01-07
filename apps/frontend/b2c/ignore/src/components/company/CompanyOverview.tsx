import { motion } from "motion/react";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Plane,
  Hotel,
  Car,
  Package,
} from "lucide-react";
import { Card } from "../ui/card";

export function CompanyOverview() {
  const stats = [
    {
      label: "Total Employees",
      value: "12",
      change: "+2 this month",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Bookings",
      value: "247",
      change: "+18% from last month",
      trend: "up",
      icon: Calendar,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Total Spent",
      value: "$124,580",
      change: "+12% from last month",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Active Trips",
      value: "8",
      change: "3 departing this week",
      trend: "neutral",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const bookingsByType = [
    { type: "Flights", count: 142, icon: Plane, amount: "$89,240" },
    { type: "Hotels", count: 68, icon: Hotel, amount: "$24,180" },
    { type: "Cars", count: 31, icon: Car, amount: "$8,920" },
    { type: "Packages", count: 6, icon: Package, amount: "$2,240" },
  ];

  const recentActivity = [
    {
      employee: "Sarah Johnson",
      action: "Booked flight to New York",
      amount: "$580",
      date: "2 hours ago",
    },
    {
      employee: "Michael Chen",
      action: "Reserved hotel in San Francisco",
      amount: "$1,240",
      date: "5 hours ago",
    },
    {
      employee: "Emily Davis",
      action: "Rented car in Los Angeles",
      amount: "$320",
      date: "1 day ago",
    },
    {
      employee: "James Wilson",
      action: "Booked vacation package",
      amount: "$3,890",
      date: "2 days ago",
    },
  ];

  const topSpenders = [
    { name: "Sarah Johnson", bookings: 24, spent: "$18,420", role: "Sales Director" },
    { name: "Michael Chen", bookings: 19, spent: "$15,280", role: "VP Engineering" },
    { name: "Emily Davis", bookings: 16, spent: "$12,940", role: "Marketing Manager" },
    { name: "James Wilson", bookings: 14, spent: "$11,680", role: "Product Manager" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bookings by Type */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Bookings by Type</h3>
          <div className="space-y-4">
            {bookingsByType.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.type}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white shadow-sm">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.type}</p>
                      <p className="text-sm text-muted-foreground">{item.count} bookings</p>
                    </div>
                  </div>
                  <p className="font-semibold text-primary">{item.amount}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start justify-between pb-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.employee}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                </div>
                <p className="font-semibold text-sm">{activity.amount}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Spenders */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Spenders This Month</h3>
        <div className="space-y-3">
          {topSpenders.map((spender, index) => (
            <div
              key={spender.name}
              className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold">{spender.name}</p>
                  <p className="text-sm text-muted-foreground">{spender.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-primary">{spender.spent}</p>
                <p className="text-sm text-muted-foreground">{spender.bookings} bookings</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
