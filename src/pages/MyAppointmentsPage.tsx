import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Activity, User } from 'lucide-react';
import toast from 'react-hot-toast';

// -- Helper functions --
const today = 'Aug 02, 2025'; // You may want to automate this with new Date
function isFuture(dateString) {
  // Format: 'Aug 03, 2025'
  return new Date(dateString) > new Date(today);
}

// Demo data (doctor replaced by patient)
const initialAppointments = [
  { id: 1, date: today, time: '10:30 AM', patient: 'Rohan', status: 'in_waiting_room', type: 'Follow-up' },
  { id: 2, date: today, time: '11:00 AM', patient: 'Shweta', status: 'with_doctor', type: 'Consultation' },
  { id: 3, date: today, time: '12:00 PM', patient: 'Ajith Kumar', status: 'confirmed', type: 'Check-up' },
  { id: 4, date: 'Aug 04, 2025', time: '9:00 AM', patient: 'Priya', status: 'scheduled', type: 'Routine' },
  { id: 5, date: 'Aug 06, 2025', time: '3:30 PM', patient: 'Sohan', status: 'confirmed', type: 'Lab Test' },
  { id: 6, date: today, time: '1:00 PM', patient: 'Rahul', status: 'completed', type: 'Check-up' },
];

// Assume this is the logged-in user who booked the appointment
const currentUser = 'Ajith Kumar'; // Change to your current user identifier

const getStatusColor = (status) => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'confirmed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'checked_in':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'in_waiting_room':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'with_doctor':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'completed':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  }
};

const LiveAppointmentTracker = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [search, setSearch] = useState('');

  /**
   * Logic:
   * - liveAppointments includes:
   *    - appointments on today
   *    - status !== 'cancelled'
   *    - includes completed for others (not currentUser)
   *    - excludes completed for currentUser
   */
  const liveAppointments = appointments.filter(
    (apt) =>
      apt.date === today &&
      apt.status !== 'cancelled' &&
      !(apt.status === 'completed' && apt.patient === currentUser)
  );

  // Upcoming appointments (future dates, not completed or cancelled)
  const upcomingAppointments = appointments.filter(
    (apt) => isFuture(apt.date) && apt.status !== 'completed' && apt.status !== 'cancelled'
  );

  // Past appointments: completed and patient is currentUser only
  const pastAppointments = appointments.filter(
    (apt) => apt.status === 'completed' && apt.patient === currentUser
  );

  // Filter live appointments by search input
  const filteredLiveAppointments = liveAppointments.filter((a) =>
    a.patient.toLowerCase().includes(search.toLowerCase())
  );

  // Simulate status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setAppointments((prev) =>
        prev.map((apt) => {
          if (
            apt.date === today &&
            ['scheduled', 'confirmed', 'checked_in', 'in_waiting_room', 'with_doctor'].includes(apt.status)
          ) {
            let updated = { ...apt };
            switch (apt.status) {
              case 'in_waiting_room':
                if (Math.random() > 0.7) {
                  updated.status = 'with_doctor';
                  toast.success(`Patient ${updated.patient} is now with doctor`);
                }
                break;
              case 'with_doctor':
                if (Math.random() > 0.5) {
                  updated.status = 'completed';
                  toast.success(`Appointment for ${updated.patient} completed!`);
                }
                break;
              case 'confirmed':
                if (Math.random() > 0.9) {
                  updated.status = 'checked_in';
                  toast.success(`Patient ${updated.patient} has checked in!`);
                }
                break;
              case 'scheduled':
                if (Math.random() > 0.95) {
                  updated.status = 'confirmed';
                  toast.success(`Appointment for ${updated.patient} is confirmed!`);
                }
                break;
              default:
                break;
            }
            return updated;
          }
          return apt;
        })
      );
      setLastUpdate(new Date());
    }, 11000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-10">
      {/* Header and Last Update */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-900">My Appointments</h1>
        <span className="text-sm text-gray-500 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Last updated {lastUpdate.toLocaleTimeString()}
        </span>
      </div>

      {/* Live Tracking */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-blue-900">Live Tracking</h2>

        {/* Search box */}
        {/* Uncomment below if search needed */}
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="Search patient..."
            className="w-full md:w-64 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search patients"
          />
        </div> */}

        {filteredLiveAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-lg">
            No ongoing appointments for today.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredLiveAppointments.map((apt) => {
              const isCurrentUser = apt.patient === currentUser;
              return (
                <div
                  key={apt.id}
                  className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center justify-between border-l-4 ${
                    isCurrentUser ? 'border-blue-600 bg-blue-50' : 'border-blue-500'
                  }`}
                >
                  <div className="flex gap-4 items-center w-full md:w-auto">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2
                        className={`text-xl font-semibold ${
                          isCurrentUser ? 'text-blue-900' : 'text-blue-800'
                        } flex items-center`}
                      >
                        <User className="h-5 w-5 inline-block mb-1 mr-1" />
                        {apt.patient}
                        {isCurrentUser && (
                          <span className="ml-3 inline-block bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full select-none">
                            You
                          </span>
                        )}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-base text-gray-600">
                        <Calendar className="h-4 w-4" /> {apt.date}
                        <span className="mx-1">|</span>
                        <Clock className="h-4 w-4" /> {apt.time}
                        <span className="mx-1">|</span>
                        <span className="font-medium">{apt.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                    <span
                      className={`self-start md:self-end px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        apt.status
                      )}`}
                    >
                      {apt.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Upcoming Appointments */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Upcoming Appointments</h2>
        {upcomingAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No upcoming future appointments.</div>
        ) : (
          <div className="space-y-6">
            {upcomingAppointments.map((apt) => {
              const isCurrentUser = apt.patient === currentUser;
              return (
                <div
                  key={apt.id}
                  className={`bg-white rounded-2xl shadow border border-blue-100 p-6 flex flex-col md:flex-row md:items-center justify-between ${
                    isCurrentUser ? 'bg-blue-50 border-blue-600' : ''
                  }`}
                >
                  <div className="flex gap-4 items-center w-full md:w-auto">
                    <User className="h-7 w-7 text-blue-300" />
                    <div>
                      <h2 className={`text-lg font-semibold ${isCurrentUser ? 'text-blue-900' : 'text-blue-800'}`}>
                        {apt.patient}
                        {isCurrentUser && (
                          <span className="ml-3 inline-block bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full select-none">
                            You
                          </span>
                        )}
                      </h2>
                      <div className="flex gap-3 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" /> {apt.date}
                        <Clock className="h-4 w-4 ml-3" /> {apt.time}
                        <span className="ml-3 font-medium">{apt.type}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`mt-3 md:mt-0 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      apt.status
                    )}`}
                  >
                    {apt.status.replace(/_/g, ' ')}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Past (completed of current user only) */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">My Completed Appointments</h2>
        {pastAppointments.length === 0 ? (
          <div className="p-8 text-center text-gray-400">You have no completed appointments.</div>
        ) : (
          <div className="space-y-5">
            {pastAppointments.map((apt) => {
              return (
                <div
                  key={apt.id}
                  className="bg-blue-50 border border-blue-600 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between"
                >
                  <div className="flex gap-4 items-center w-full md:w-auto">
                    <User className="h-7 w-7 text-blue-600" />
                    <div>
                      <h2 className="text-lg font-semibold text-blue-900">
                        {apt.patient}
                        <span className="ml-3 inline-block bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full select-none">
                          You
                        </span>
                      </h2>
                      <div className="flex flex-wrap gap-3 text-sm text-blue-800">
                        <Calendar className="h-4 w-4" /> {apt.date}
                        <Clock className="h-4 w-4 ml-4" /> {apt.time}
                        <span className="ml-4 font-medium">{apt.type}</span>
                      </div>
                    </div>
                  </div>
                  <span className="mt-3 md:mt-0 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Completed
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveAppointmentTracker;
