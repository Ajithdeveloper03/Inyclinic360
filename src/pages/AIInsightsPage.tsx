import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Brain, TrendingUp, AlertTriangle, Users, Activity, Zap, Target, BarChart3 } from 'lucide-react';
import { aiService, HealthInsight } from '../services/aiService';

const AIInsightsPage = () => {
  const [insights, setInsights] = useState<HealthInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<HealthInsight | null>(null);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    setLoading(true);
    try {
      const data = await aiService.getHealthInsights({});
      setInsights(data);
    } catch (error) {
      console.error('Failed to load insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const predictiveAnalytics = [
    { title: 'No-Show Prediction', value: '12%', trend: 'down', description: 'Predicted no-show rate for next week' },
    { title: 'Readmission Risk', value: '8%', trend: 'stable', description: 'Patients at risk of readmission' },
    { title: 'Resource Utilization', value: '87%', trend: 'up', description: 'Optimal resource allocation efficiency' },
    { title: 'Patient Satisfaction', value: '4.8/5', trend: 'up', description: 'Predicted satisfaction score' }
  ];

  const aiRecommendations = [
    {
      id: 1,
      type: 'scheduling',
      title: 'Optimize Appointment Scheduling',
      description: 'AI suggests adjusting Dr. Johnson\'s schedule to reduce wait times by 15%',
      impact: 'High',
      effort: 'Low'
    },
    {
      id: 2,
      type: 'staffing',
      title: 'Staff Allocation Optimization',
      description: 'Increase nursing staff on Mondays and Fridays based on patient flow patterns',
      impact: 'Medium',
      effort: 'Medium'
    },
    {
      id: 3,
      type: 'inventory',
      title: 'Medical Supply Prediction',
      description: 'Order additional surgical supplies - 23% increase in procedures predicted',
      impact: 'High',
      effort: 'Low'
    },
    {
      id: 4,
      type: 'quality',
      title: 'Quality Improvement Initiative',
      description: 'Focus on diabetes management protocols to improve patient outcomes',
      impact: 'High',
      effort: 'High'
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'medication': return <Activity className="h-5 w-5" />;
      case 'exercise': return <Target className="h-5 w-5" />;
      case 'checkup': return <Users className="h-5 w-5" />;
      case 'warning': return <AlertTriangle className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'medication': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'exercise': return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'checkup': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
      case 'warning': return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Insights & Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Intelligent healthcare analytics and predictive insights
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Predictive Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {predictiveAnalytics.map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  metric.trend === 'up' ? 'bg-green-100 dark:bg-green-900/20' :
                  metric.trend === 'down' ? 'bg-red-100 dark:bg-red-900/20' :
                  'bg-blue-100 dark:bg-blue-900/20'
                }`}>
                  <TrendingUp className={`h-6 w-6 ${
                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                    metric.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                    'text-blue-600 dark:text-blue-400'
                  }`} />
                </div>
                <div className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                  metric.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                  'text-blue-600 dark:text-blue-400'
                }`}>
                  {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </h3>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {metric.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Recommendations
            </h2>
            <button className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiRecommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {recommendation.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(recommendation.impact)}`}>
                      {recommendation.impact} Impact
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {recommendation.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    Effort: {recommendation.effort}
                  </span>
                  <button className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium">
                    Implement
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Patient Health Insights
              </h2>
              <button 
                onClick={loadInsights}
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium"
              >
                Refresh
              </button>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {insights.map((insight) => (
                  <div
                    key={insight.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                    onClick={() => setSelectedInsight(insight)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getInsightColor(insight.type)}`}>
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {insight.title}
                          </h3>
                          <span className={`text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                            {insight.priority} priority
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {insight.description}
                        </p>
                        {insight.actionRequired && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300 rounded-full">
                              Action Required
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Performance Metrics */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              AI Performance Metrics
            </h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Prediction Accuracy
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">94.2%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Model Confidence
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">87.8%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87.8%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Data Quality Score
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">91.5%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91.5%' }}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Recent AI Activities
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Analyzed 247 patient records
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Generated 12 health insights
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">
                      Updated prediction models
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insight Detail Modal */}
        {selectedInsight && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Insight Details
                </h3>
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getInsightColor(selectedInsight.type)}`}>
                    {getInsightIcon(selectedInsight.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {selectedInsight.title}
                    </h4>
                    <span className={`text-sm ${getPriorityColor(selectedInsight.priority)}`}>
                      {selectedInsight.priority} priority
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedInsight.description}
                </p>
                
                {selectedInsight.dueDate && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Due Date:</strong> {new Date(selectedInsight.dueDate).toLocaleDateString()}
                  </div>
                )}
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setSelectedInsight(null)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    Close
                  </button>
                  {selectedInsight.actionRequired && (
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                      Take Action
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AIInsightsPage;