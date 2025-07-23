import React from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  total,
  label,
  showPercentage = true,
  color = 'blue',
  size = 'md',
  animated = false
}) => {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-600';
      case 'yellow':
        return 'bg-yellow-600';
      case 'red':
        return 'bg-red-600';
      case 'purple':
        return 'bg-purple-600';
      default:
        return 'bg-blue-600';
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm':
        return 'h-1';
      case 'lg':
        return 'h-4';
      default:
        return 'h-2';
    }
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${getSizeClasses(size)}`}>
        <div
          className={`${getSizeClasses(size)} rounded-full transition-all duration-500 ease-out ${getColorClasses(color)} ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;