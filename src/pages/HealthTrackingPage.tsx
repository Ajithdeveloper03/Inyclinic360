import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Activity, Heart, Thermometer, Weight, TrendingUp, Calendar, Plus, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const HealthTrackingPage = () => {
  const [selectedMetric, setSelectedMetric] = useState('bloodPressure');
  const [showAddModal, setShowAddModal] = useState(false);

  const healthMetrics = [
    { id: 'bloodPressure', name: 'Blood Pressure', icon: Heart, unit: 'mmHg', color: 'red' },
    { id: 'heartRate', name: 'Heart Rate', icon: Activity, unit: 'bpm', color: 'blue' },
    { id: 'temperature', name: 'Temperature', icon: Thermometer, unit: '°F', color: 'orange' },
    { id: 'weight', name: 'Weight', icon: Weight, unit: 'lbs', color: 'green' }
  ];

  const bloodPressureData = [
    { date: '2025-12-01', systolic: 120, diastolic: 80 },
    { date: '2025-12-03', systolic: 125, diastolic: 82 },
    { date: '2025-12-05', systolic: 118, diastolic: 78 },
    { date: '2025-12-07', systolic: 122, diastolic: 81 },
    { date: '2025-12-09', systolic: 119, diastolic: 79 },
    { date: '2025-12-11', systolic: 121, diastolic: 80 },
    { date: '2025-12-13', systolic: 117, diastolic: 77 }
  ];

  const heartRateData = [
    { date: '2025-12-01', value: 72 },
    { date: '2025-12-03', value: 75 },
    { date: '2025-12-05', value: 68 },
    { date: '2025-12-07', value: 71 },
    { date: '2025-12-09', value: 69 },
    { date: '2025-12-11', value: 73 },
    { date: '2025-12-13', value: 70 }
  ];

  const weightData = [
    { date: '2025-12-01', value: 75 },
    { date: '2025-12-03', value: 74.5 },
    { date: '2025-12-05', value: 70.2 },
    { date: '2025-12-07', value: 69.8 },
    { date: '2025-12-09', value: 67.5 },
    { date: '2025-12-11', value: 67.2 },
    { date: '2025-12-13', value: 65.8 }
  ];

  const temperatureData = [
    { date: '2025-12-01', value: 98.6 },
    { date: '2025-12-03', value: 98.4 },
    { date: '2025-12-05', value: 98.7 },
    { date: '2025-12-07', value: 98.5 },
    { date: '2025-12-09', value: 98.6 },
    { date: '2025-12-11', value: 98.3 },
    { date: '2025-12-13', value: 98.5 }
  ];

  const getDataForMetric = (metric: string) => {
    switch (metric) {
      case 'bloodPressure': return bloodPressureData;
      case 'heartRate': return heartRateData;
      case 'weight': return weightData;
      case 'temperature': return temperatureData;
      default: return [];
    }
  };

  const getMetricColor = (color: string) => {
    switch (color) {
      case 'red': return '#EF4444';
      case 'blue': return '#3B82F6';
      case 'orange': return '#F97316';
      case 'green': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getCurrentValue = (metric: string) => {
    const data = getDataForMetric(metric);
    if (data.length === 0) return 'N/A';
    
    const latest = data[data.length - 1];
    if (metric === 'bloodPressure') {
      return `${latest.systolic}/${latest.diastolic}`;
    }
    return latest.value;
  };

  const getTrend = (metric: string) => {
    const data = getDataForMetric(metric);
    if (data.length < 2) return 'stable';
    
    let current, previous;
    if (metric === 'bloodPressure') {
      current = data[data.length - 1].systolic;
      previous = data[data.length - 2].systolic;
    } else {
      current = data[data.length - 1].value;
      previous = data[data.length - 2].value;
    }
    
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'stable';
  };

  const healthGoals = [
    { id: 1, title: 'Maintain Blood Pressure', target: '< 120/80 mmHg', progress: 85, status: 'on-track' },
    { id: 2, title: 'Weight Loss Goal', target: '170 lbs', progress: 60, status: 'on-track' },
    { id: 3, title: 'Daily Steps', target: '10,000 steps', progress: 75, status: 'behind' },
    { id: 4, title: 'Exercise Minutes', target: '150 min/week', progress: 90, status: 'ahead' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'text-green-600 dark:text-green-400';
      case 'on-track': return 'text-blue-600 dark:text-blue-400';
      case 'behind': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Health Tracking
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor your vital signs and health metrics
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Reading</span>
          </button>
        </div>

        {/* Health Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {healthMetrics.map((metric) => {
            const IconComponent = metric.icon;
            const trend = getTrend(metric.id);
            const currentValue = getCurrentValue(metric.id);
            
            return (
              <div
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-200 hover:shadow-xl ${
                  selectedMetric === metric.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${metric.color}-100 dark:bg-${metric.color}-900/20`}>
                    <IconComponent className={`h-6 w-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
                  </div>
                  <div className={`text-sm font-medium ${
                    trend === 'up' ? 'text-red-600 dark:text-red-400' :
                    trend === 'down' ? 'text-green-600 dark:text-green-400' :
                    'text-gray-600 dark:text-gray-400'
                  }`}>
                    {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentValue}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {metric.unit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {healthMetrics.find(m => m.id === selectedMetric)?.name} Trends
            </h2>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Last 2 weeks</span>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {selectedMetric === 'bloodPressure' ? (
                <LineChart data={bloodPressureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="systolic" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    name="Systolic"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="diastolic" 
                    stroke="#F97316" 
                    strokeWidth={2}
                    name="Diastolic"
                  />
                </LineChart>
              ) : (
                <LineChart data={getDataForMetric(selectedMetric)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={getMetricColor(healthMetrics.find(m => m.id === selectedMetric)?.color || 'blue')}
                    strokeWidth={2}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Goals */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Health Goals
            </h2>
            <button className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium">
              Manage Goals
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {healthGoals.map((goal) => (
              <div key={goal.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {goal.title}
                  </h3>
                  <span className={`text-sm font-medium ${getStatusColor(goal.status)}`}>
                    {goal.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Target: {goal.target}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        goal.status === 'ahead' ? 'bg-green-600' :
                        goal.status === 'on-track' ? 'bg-blue-600' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Recent Readings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Recent Readings
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Date</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Metric</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Value</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-3 text-sm text-gray-900 dark:text-white">Dec 13, 2025</td>
                  <td className="py-3 text-sm text-gray-900 dark:text-white">Blood Pressure</td>
                  <td className="py-3 text-sm text-gray-900 dark:text-white">117/77 mmHg</td>
                  <td className="py-3">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-full">
                      Normal
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-sm text-gray-900 dark:text-white">Dec 13, 2025</td>
                  <td className="py-3 text-sm text-gray-900 dark:text-white">Heart Rate</td>
                  <td className="py-3 text-sm text-gray-900 dark:text-white">70 bpm</td>
                  <td className="py-3">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-full">
                      Normal
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-sm text-gray-900 dark:text-white">Dec 13, 2025</td>
                  <td className="py-3 text-sm text-gray-900 dark:text-white">Weight</td>
                  <td className="py-3 text-sm text-gray-900 dark:text-white">172.8 lbs</td>
                  <td className="py-3">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 rounded-full">
                      Improving
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Reading Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Add Health Reading
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Metric Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="bloodPressure">Blood Pressure</option>
                    <option value="heartRate">Heart Rate</option>
                    <option value="temperature">Temperature</option>
                    <option value="weight">Weight</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 120/80 or 72"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Any additional notes..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add reading logic here
                    setShowAddModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Add Reading
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default HealthTrackingPage;