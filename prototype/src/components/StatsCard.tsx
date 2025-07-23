import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'red' | 'purple' | 'orange';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400';
      case 'green':
        return 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'red':
        return 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      case 'purple':
        return 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400';
      case 'orange':
        return 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-50 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600 dark:text-green-400';
      case 'decrease':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={`text-sm font-medium ${getChangeColor(changeType)}`}>
          {change}
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {title}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;