import React, { useState, useEffect } from 'react';
import { Clock, User, CheckCircle, X } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
  reserved?: boolean;
  patientName?: string;
  appointmentType?: string;
  duration?: number;
}

interface TimeSlotPickerProps {
  selectedDate: string;
  selectedDoctor: string;
  onTimeSelect: (time: string) => void;
  selectedTime?: string;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDate,
  selectedDoctor,
  onTimeSelect,
  selectedTime
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate time slots for a day (9 AM to 6 PM, 30-minute intervals)
  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 18;
    const interval = 30; // minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          time: timeString,
          available: true,
          reserved: false
        });
      }
    }

    return slots;
  };

  // Simulate fetching availability from backend
  const fetchAvailability = async () => {
    if (!selectedDate || !selectedDoctor) return;

    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const baseSlots = generateTimeSlots();
    
    // Simulate some reserved slots based on doctor and date
    const reservedSlots = [
      { time: '09:30', patientName: 'John', appointmentType: 'Consultation', duration: 30 },
      { time: '11:00', patientName: 'Sarmila', appointmentType: 'Follow-up', duration: 20 },
      { time: '14:30', patientName: 'Dinesh', appointmentType: 'Treatment', duration: 45 },
      { time: '16:00', patientName: 'Emily', appointmentType: 'Check-up', duration: 30 }
    ];

    // Mark slots as reserved or unavailable
    const updatedSlots = baseSlots.map(slot => {
      const reserved = reservedSlots.find(r => r.time === slot.time);
      if (reserved) {
        return {
          ...slot,
          available: false,
          reserved: true,
          patientName: reserved.patientName,
          appointmentType: reserved.appointmentType,
          duration: reserved.duration
        };
      }

      // Make some slots unavailable (lunch break, etc.)
      if (slot.time >= '12:00' && slot.time <= '13:00') {
        return {
          ...slot,
          available: false,
          reserved: false
        };
      }

      // Weekend or past time slots
      const selectedDateObj = new Date(selectedDate);
      const today = new Date();
      const isToday = selectedDateObj.toDateString() === today.toDateString();
      
      if (isToday) {
        const currentTime = today.getHours() * 60 + today.getMinutes();
        const slotTime = parseInt(slot.time.split(':')[0]) * 60 + parseInt(slot.time.split(':')[1]);
        
        if (slotTime <= currentTime) {
          return {
            ...slot,
            available: false
          };
        }
      }

      return slot;
    });

    setTimeSlots(updatedSlots);
    setLoading(false);
  };

  useEffect(() => {
    fetchAvailability();
  }, [selectedDate, selectedDoctor]);

  const getSlotStyle = (slot: TimeSlot) => {
    if (selectedTime === slot.time) {
      return 'bg-blue-600 text-white border-blue-600';
    }
    
    if (!slot.available) {
      if (slot.reserved) {
        return 'bg-red-50 text-red-600 border-red-200 cursor-not-allowed';
      }
      return 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed';
    }
    
    return 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer';
  };

  const getSlotIcon = (slot: TimeSlot) => {
    if (selectedTime === slot.time) {
      return <CheckCircle className="h-4 w-4" />;
    }
    
    if (!slot.available) {
      if (slot.reserved) {
        return <User className="h-4 w-4" />;
      }
      return <X className="h-4 w-4" />;
    }
    
    return <Clock className="h-4 w-4" />;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (!selectedDate || !selectedDoctor) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Please select a date and doctor to view available time slots
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Available Time Slots
        </h3>
        <button
          onClick={fetchAvailability}
          disabled={loading}
          className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium flex items-center space-x-1"
        >
          <Clock className="h-4 w-4" />
          <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Reserved</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Unavailable</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">Selected</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {timeSlots.map((slot) => (
            <div key={slot.time} className="relative">
              <button
                onClick={() => slot.available && onTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`w-full p-3 border-2 rounded-lg transition-all duration-200 ${getSlotStyle(slot)}`}
                title={
                  slot.reserved 
                    ? `Reserved for ${slot.patientName} - ${slot.appointmentType}`
                    : slot.available 
                    ? 'Available slot'
                    : 'Unavailable'
                }
              >
                <div className="flex flex-col items-center space-y-1">
                  {getSlotIcon(slot)}
                  <span className="text-sm font-medium">
                    {formatTime(slot.time)}
                  </span>
                  {/* {slot.reserved && (
                    <span className="text-xs opacity-75">
                      {slot.duration}min
                    </span>
                  )} */}
                </div>
              </button>
              
              {slot.reserved && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  !
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Reserved Slots Details */}
      {timeSlots.some(slot => slot.reserved) && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-3">
            Reserved Time Slots
          </h4>
          <div className="space-y-2">
            {timeSlots
              .filter(slot => slot.reserved)
              .map(slot => (
                <div key={slot.time} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-red-700 dark:text-red-300">
                      {formatTime(slot.time)}
                    </span>
                    <span className="text-red-600 dark:text-red-400">
                      {slot.patientName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <span>{slot.appointmentType}</span>
                    <span>•</span>
                    <span>{slot.duration} min</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* No Available Slots */}
      {timeSlots.length > 0 && !timeSlots.some(slot => slot.available) && (
        <div className="text-center py-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
            No Available Slots
          </h3>
          <p className="text-yellow-600 dark:text-yellow-400 mb-4">
            All time slots are reserved for the selected date and doctor.
          </p>
          <button
            onClick={() => {
              // Suggest alternative dates
              const tomorrow = new Date(selectedDate);
              tomorrow.setDate(tomorrow.getDate() + 1);
              alert(`Try selecting ${tomorrow.toDateString()} for more availability`);
            }}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Suggest Alternative Dates
          </button>
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;