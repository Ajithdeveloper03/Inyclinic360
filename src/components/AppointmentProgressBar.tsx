import React from 'react';
import { Clock, Users, CheckCircle } from 'lucide-react';

interface AppointmentProgressBarProps {
  status: string;
  queuePosition?: number;
  estimatedWaitTime: number; // in minutes
  expectedDuration: number; // in minutes
  elapsedTime?: number; // in minutes
  showDetails?: boolean;
}

const AppointmentProgressBar: React.FC<AppointmentProgressBarProps> = ({
  status,
  queuePosition,
  estimatedWaitTime,
  expectedDuration,
  elapsedTime = 0,
  showDetails = true
}) => {
  const getProgressData = () => {
    switch (status) {
      case 'scheduled':
      case 'confirmed':
        return {
          progress: 0,
          total: 100,
          color: 'blue',
          label: 'Scheduled',
          showQueue: false
        };
      case 'checked_in':
        return {
          progress: 20,
          total: 100,
          color: 'yellow',
          label: 'Checked In',
          showQueue: true
        };
      case 'in_waiting_room':
        return {
          progress: 40,
          total: 100,
          color: 'orange',
          label: 'In Waiting Room',
          showQueue: true
        };
      case 'with_doctor':
      case 'in-progress':
        return {
          progress: Math.min(80 + (elapsedTime / expectedDuration) * 20, 100),
          total: 100,
          color: 'green',
          label: 'With Doctor',
          showQueue: false
        };
      case 'completed':
        return {
          progress: 100,
          total: 100,
          color: 'green',
          label: 'Completed',
          showQueue: false
        };
      default:
        return {
          progress: 0,
          total: 100,
          color: 'gray',
          label: status,
          showQueue: false
        };
    }
  };

  const { progress, total, color, label, showQueue } = getProgressData();

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-600';
      case 'yellow':
        return 'bg-yellow-600';
      case 'orange':
        return 'bg-orange-600';
      case 'red':
        return 'bg-red-600';
      case 'blue':
        return 'bg-blue-600';
      default:
        return 'bg-gray-600';
    }
  };

  const formatWaitTime = (minutes: number) => {
    if (minutes <= 0) return 'Now';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className="space-y-2">
      {showDetails && (
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ease-out ${getColorClasses(color)}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {showDetails && (
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-3">
            {showQueue && queuePosition && (
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>Position: {queuePosition}</span>
              </div>
            )}
            {estimatedWaitTime > 0 && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Wait: {formatWaitTime(estimatedWaitTime)}</span>
              </div>
            )}
          </div>
          {status === 'completed' && (
            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
              <CheckCircle className="h-3 w-3" />
              <span>Done</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentProgressBar;