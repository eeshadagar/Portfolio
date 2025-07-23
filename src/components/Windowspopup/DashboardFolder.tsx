import { X } from "lucide-react";
import { useRef } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { motion, useAnimation, useInView } from "framer-motion";
import CountUp from "react-countup";

export default function DashboardFolder({ onClose }: { onClose: () => void }) {
  const barRef = useRef(null);
  const pieRef = useRef(null);
  const lineRef = useRef(null);

  const isPieInView = useInView(pieRef, { once: true, margin: "-50px" });

  const pieControls = useAnimation();
  if (isPieInView) {
    pieControls.start({ scale: 1, opacity: 1 });
  }

  const stats = [
    { label: "Total Hours", value: "560+", change: "12% more", color: "text-blue-400" },
    { label: "Technologies", value: "5", change: "New skill added", color: "text-green-400" },
    { label: "Projects", value: "8", change: "completed", color: "text-purple-400" },
    { label: "Certifications", value: "3", change: "AWS Certified", color: "text-yellow-400" },
  ];

  const learningData = [
    { name: "Python", hours: 200 },
    { name: "ML", hours: 120 },
    { name: "AWS", hours: 80 },
    { name: "SQL", hours: 95 },
    { name: "React", hours: 65 },
  ];

  const techData = [
    { name: "Python", value: 200, color: "#DBE2F2" },   
    { name: "ML", value: 120, color: "#3B82F6" },      
    { name: "AWS", value: 80, color: "#1E293B" },      
    { name: "SQL", value: 95, color: "#334155" },       
    { name: "React", value: 65, color: "#64748B" }, 
  ];

  const progressData = [
    { month: "Jan", projects: 3 },
    { month: "Feb", projects: 4 },
    { month: "Mar", projects: 6 },
    { month: "Apr", projects: 6 },
    { month: "May", projects: 8 },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-[960px] max-h-[90vh] bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl flex flex-col">
        
        {/* Fixed Header */}
        <div className="bg-gray-200/80 px-4 py-2 flex items-center justify-between border-b border-gray-300/50 rounded-t-xl flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-800 font-medium">Dashboard</span>
          </div>
          <button onClick={onClose} className="hover:bg-gray-300/50 p-1 rounded">
            <X className="w-4 h-4 text-gray-800" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Title */}
          <div className="text-center my-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
              Learning Dashboard
            </h2>
            <p className="text-lg text-gray-700">
              Data-driven insights into my learning journey
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg p-4 shadow"
              >
                <div className={`text-2xl font-bold ${stat.color}`}>
                  <CountUp end={parseInt(stat.value)} duration={2} />
                  {stat.value.includes("+") && "+"}
                </div>
                <div className="text-xs text-gray-900">{stat.label}</div>
                <div className="text-xs text-gray-600">{stat.change}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="p-4 space-y-6">
            {/* Bar Chart */}
            <div ref={barRef} className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Learning Hours by Technology</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={learningData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#9CA3AF" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#374151" fontSize={12} />
                  <YAxis stroke="#374151" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#000E2D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div ref={pieRef} className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Technology Focus Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={techData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {techData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div ref={lineRef} className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Project Completion Timeline</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#9CA3AF" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#000E2D" fontSize={12} />
                  <YAxis stroke="#374151" fontSize={12} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="projects"
                    stroke="#000E2D"
                    strokeWidth={2}
                    dot={{ fill: "#000E2D", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}