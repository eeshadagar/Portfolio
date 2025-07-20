import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function DashboardWidget({
  onOpen,
}: {
  onOpen: () => void;
}) {
  // Chart Data
  const barData = [
    { name: "Python", hours: 200 },
    { name: "ML", hours: 120 },
    { name: "AWS", hours: 80 },
    { name: "SQL", hours: 95 },
    { name: "React", hours: 65 },
  ];

  const pieData = [
    { name: "Python", value: 200, color: "#DBE2F2" },   // teal accent
    { name: "ML", value: 120, color: "#3B82F6" },       // blue
    { name: "AWS", value: 80, color: "#1E293B" },       // dark navy
    { name: "SQL", value: 95, color: "#334155" },       // slightly lighter navy
    { name: "React", value: 65, color: "#64748B" },     // muted gray
  ];


  const lineData = [
    { month: "Jan", projects: 3 },
    { month: "Feb", projects: 4 },
    { month: "Mar", projects: 6 },
    { month: "Apr", projects: 6 },
    { month: "May", projects: 8 },
  ];

  // Chart cycle
  const [chartIndex, setChartIndex] = useState(0);
  const chartTypes = ["bar", "pie", "line"];

  useEffect(() => {
    const interval = setInterval(() => {
      setChartIndex((prev) => (prev + 1) % chartTypes.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const totalHours = barData.reduce((sum, d) => sum + d.hours, 0);

  return (
    <button
      onClick={onOpen}
      className="w-full p-4 bg-white/20 backdrop-blur-lg rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 hover:scale-105 transition-transform flex flex-col justify-between"
    >
      {/* Header */}
      <div className="text-sm text-navy font-semibold flex justify-between mb-1">
        <span>Learning</span>
        <span>{totalHours}h</span>
      </div>

      {/* Dynamic Chart */}
      <div className="w-full h-24 mb-2">
        {chartTypes[chartIndex] === "bar" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <Bar dataKey="hours" fill="#000E2D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartTypes[chartIndex] === "pie" && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={35}
                dataKey="value"
                paddingAngle={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}

        {chartTypes[chartIndex] === "line" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                }}
              />
            <Line
              type="monotone"
              dataKey="projects"
              stroke="#000E2D"
              strokeWidth={2}
              dot={{ r: 3, fill: "#000E2D" }}
            />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer */}
      <div className="text-xs text-navy flex justify-between">
        <span>Progress</span>
        <span>Last 30d</span>
      </div>
    </button>
  );
}
