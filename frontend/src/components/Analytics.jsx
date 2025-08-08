import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend as RechartsLegend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { FaChartPie, FaChartBar, FaUserFriends, FaRobot, FaSyncAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const COLORS = ['#6366f1', '#a21caf', '#f59e42', '#10b981', '#f43f5e', '#fbbf24', '#3b82f6', '#8b5cf6'];

// Helper for random color
const getColor = (i) => COLORS[i % COLORS.length];

// Fake/mock data for demo (replace with Supabase fetch)
const mockData = {
  totalConversations: 1243,
  activeUsers: 87,
  topIntents: [
    { name: 'Order Status', value: 320 },
    { name: 'Pricing', value: 210 },
    { name: 'Refund', value: 180 },
    { name: 'Product Info', value: 140 },
    { name: 'Other', value: 393 },
  ],
  toneUsage: [
    { name: 'Professional', value: 700 },
    { name: 'Friendly', value: 400 },
    { name: 'Humorous', value: 143 },
  ],
  communicationVolume: [
    { date: 'Mon', value: 120 },
    { date: 'Tue', value: 180 },
    { date: 'Wed', value: 240 },
    { date: 'Thu', value: 200 },
    { date: 'Fri', value: 300 },
    { date: 'Sat', value: 120 },
    { date: 'Sun', value: 83 },
  ],
  recentQueries: [
    
  ],
  intentSuccess: [
    { name: 'Success', value: 1020 },
    { name: 'Failed', value: 223 },
  ],
};

const AnalyticsDashboard = () => {
  const [data, setData] = useState(mockData);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh every 30 seconds (replace with real fetch)
  useEffect(() => {
    const interval = setInterval(() => {
      // TODO: Replace with real fetch from Supabase
      setData(mockData);
      setLastUpdated(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
        <FaChartPie className="text-purple-400" /> Chatbot Analytics Dashboard
      </h1>
      <p className="text-lg text-gray-300 mb-8">Get a live overview of how your chatbot is being used. All charts auto-refresh every 30 seconds.</p>
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="flex-1 min-w-[220px] bg-white/10 rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <FaRobot className="text-3xl text-blue-400 mb-2" />
          <div className="text-3xl font-extrabold">{data.totalConversations}</div>
          <div className="text-gray-300 mt-1">Total Conversations</div>
        </div>
        <div className="flex-1 min-w-[220px] bg-white/10 rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <FaUserFriends className="text-3xl text-green-400 mb-2" />
          <div className="text-3xl font-extrabold">{data.activeUsers}</div>
          <div className="text-gray-300 mt-1">Active Users (last 24h)</div>
        </div>
        <div className="flex-1 min-w-[220px] bg-white/10 rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <FaCheckCircle className="text-3xl text-green-400 mb-2" />
          <div className="text-3xl font-extrabold">{data.intentSuccess[0].value}</div>
          <div className="text-gray-300 mt-1">Successful Intents</div>
        </div>
        <div className="flex-1 min-w-[220px] bg-white/10 rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <FaTimesCircle className="text-3xl text-red-400 mb-2" />
          <div className="text-3xl font-extrabold">{data.intentSuccess[1].value}</div>
          <div className="text-gray-300 mt-1">Failed Intents</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-2">Top Intents</h2>
          <p className="text-gray-400 mb-4">What are users searching for the most?</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data.topIntents} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {data.topIntents.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={getColor(i)} />
                ))}
              </Pie>
              <RechartsTooltip />
              <RechartsLegend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white/10 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-2">Chatbot Tone Usage</h2>
          <p className="text-gray-400 mb-4">Which chatbot tone is most popular?</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data.toneUsage} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {data.toneUsage.map((entry, i) => (
                  <Cell key={`cell-tone-${i}`} fill={getColor(i + 3)} />
                ))}
              </Pie>
              <RechartsTooltip />
              <RechartsLegend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/10 rounded-2xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-2">Communication Volume (Last 7 Days)</h2>
        <p className="text-gray-400 mb-4">How many conversations are happening each day?</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.communicationVolume}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#fff" />
            <YAxis stroke="#fff" />
            <RechartsTooltip />
            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/10 rounded-2xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-2">Intent Success Rate</h2>
        <p className="text-gray-400 mb-4">How many user queries are being answered successfully?</p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={data.intentSuccess} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} label>
              {data.intentSuccess.map((entry, i) => (
                <Cell key={`cell-success-${i}`} fill={i === 0 ? '#10b981' : '#f43f5e'} />
              ))}
            </Pie>
            <RechartsTooltip />
            <RechartsLegend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/10 rounded-2xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-2">Recent User Queries</h2>
        <p className="text-gray-400 mb-4">See what users are asking right now.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-white/5">
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Intent</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentQueries.map((q, i) => (
                <tr key={i} className="border-b border-white/10">
                  <td className="px-4 py-2">{q.user}</td>
                  <td className="px-4 py-2">{q.intent}</td>
                  <td className="px-4 py-2">{q.message}</td>
                  <td className="px-4 py-2">{q.time}</td>
                  <td className="px-4 py-2">
                    {q.success ? (
                      <span className="inline-flex items-center text-green-400"><FaCheckCircle className="mr-1" /> Success</span>
                    ) : (
                      <span className="inline-flex items-center text-red-400"><FaTimesCircle className="mr-1" /> Failed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center gap-3 text-gray-400 mt-6">
        <FaSyncAlt className="animate-spin" />
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 