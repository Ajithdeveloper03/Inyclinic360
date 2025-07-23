import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AppointmentCalendar from '../components/AppointmentCalendar';
import AppointmentProgressBar from '../components/AppointmentProgressBar';
import { Calendar, Clock, User, Filter, Plus, Search, Download, Edit, Trash2, CheckCircle } from 'lucide-react';

const AppointmentsPage = () => {
  const [selectedView, setSelectedView] = useState('calendar');
  const [filterDoctor, setFilterDoctor] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Dynamic appointment updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAppointments(prev => prev.map(apt => {
        let newApt = { ...apt };
        
        // Only update today's appointments
        const isToday = apt.date === '2024-12-15';
        
        if (isToday) {
          switch (apt.status) {
            case 'in_waiting_room':
              if (apt.estimatedWaitTime > 0) {
                newApt.estimatedWaitTime = Math.max(0, apt.estimatedWaitTime - Math.floor(Math.random() * 3) - 1);
                if (newApt.estimatedWaitTime <= 2 && Math.random() > 0.7) {
                  newApt.status = 'with_doctor';
                  newApt.estimatedWaitTime = 0;
                  newApt.queuePosition = 0;
                }
              }
              break;
            case 'checked_in':
              if (Math.random() > 0.8) {
                newApt.status = 'in_waiting_room';
                newApt.estimatedWaitTime = Math.max(5, apt.estimatedWaitTime - 5);
              } else {
                newApt.estimatedWaitTime = Math.max(0, apt.estimatedWaitTime - Math.floor(Math.random() * 2));
              }
              break;
            case 'with_doctor':
              newApt.elapsedTime = apt.elapsedTime + 1;
              if (newApt.elapsedTime >= apt.expectedDuration && Math.random() > 0.6) {
                newApt.status = 'completed';
                newApt.estimatedWaitTime = 0;
              }
              break;
            case 'confirmed':
              if (Math.random() > 0.95) {
                newApt.status = 'checked_in';
                newApt.estimatedWaitTime = Math.max(10, apt.estimatedWaitTime - 10);
              }
              break;
          }
        }
        
        return newApt;
      }));
      
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      date: '2024-12-15', 
      time: '09:00', 
      patient: 'John Smith', 
      doctor: 'Dr. Johnson', 
      status: 'with_doctor', 
      type: 'Consultation', 
      phone: '+1 (555) 123-4567',
      expectedDuration: 30,
      estimatedWaitTime: 0,
      queuePosition: 0,
      elapsedTime: 15
    },
    { 
      id: 2, 
      date: '2024-12-15', 
      time: '10:30', 
      patient: 'Sarah Wilson', 
      doctor: 'Dr. Brown', 
      status: 'in_waiting_room', 
      type: 'Follow-up', 
      phone: '+1 (555) 234-5678',
      expectedDuration: 20,
      estimatedWaitTime: 8,
      queuePosition: 1,
      elapsedTime: 0
    },
    { 
      id: 3, 
      date: '2024-12-16', 
      time: '14:00', 
      patient: 'Michael Davis', 
      doctor: 'Dr. Johnson', 
      status: 'checked_in', 
      type: 'Treatment', 
      phone: '+1 (555) 345-6789',
      expectedDuration: 45,
      estimatedWaitTime: 25,
      queuePosition: 2,
      elapsedTime: 0
    },
    { 
      id: 4, 
      date: '2024-12-17', 
      time: '11:15', 
      patient: 'Emma Thompson', 
      doctor: 'Dr. Smith', 
      status: 'confirmed', 
      type: 'Consultation', 
      phone: '+1 (555) 456-7890',
      expectedDuration: 30,
      estimatedWaitTime: 180,
      queuePosition: 0,
      elapsedTime: 0
    },
    { 
      id: 5, 
      date: '2024-12-18', 
      time: '15:30', 
      patient: 'David Lee', 
      doctor: 'Dr. Brown', 
      status: 'completed', 
      type: 'Check-up', 
      phone: '+1 (555) 567-8901',
      expectedDuration: 25,
      estimatedWaitTime: 0,
      queuePosition: 0,
      elapsedTime: 25
    }
  ]);

  const doctors = ['Dr. Johnson', 'Dr. Brown', 'Dr. Smith'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'checked_in': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'in_waiting_room': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'with_doctor': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const doctorMatch = filterDoctor === 'all' || apt.doctor === filterDoctor;
    const statusMatch = filterStatus === 'all' || apt.status === filterStatus;
    const searchMatch = searchTerm === '' || 
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    return doctorMatch && statusMatch && searchMatch;
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const handleDeleteAppointment = (id: number) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== id));
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Date,Time,Patient,Doctor,Status,Type,Phone\n" +
      filteredAppointments.map(apt => 
        `${apt.date},${apt.time},${apt.patient},${apt.doctor},${apt.status},${apt.type},${apt.phone}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "appointments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Appointment Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and schedule patient appointments
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Appointment</span>
            </button>
            <button 
              onClick={handleExport}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedView('calendar')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedView === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Calendar View
            </button>
            <button
              onClick={() => setSelectedView('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedView === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              List View
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <select
              value={filterDoctor}
              onChange={(e) => setFilterDoctor(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Doctors</option>
              {doctors.map(doctor => (
                <option key={doctor} value={doctor}>{doctor}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="waiting">Waiting</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {selectedView === 'calendar' ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <AppointmentCalendar />
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Appointments List ({filteredAppointments.length})
              </h2>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                <Clock className="h-3 w-3" />
                <span>Live updates • Last updated {lastUpdate.toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {appointment.date}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {appointment.time}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {appointment.patient}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {appointment.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {appointment.doctor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {appointment.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-32">
                          <AppointmentProgressBar
                            status={appointment.status}
                            queuePosition={appointment.queuePosition}
                            estimatedWaitTime={appointment.estimatedWaitTime}
                            expectedDuration={appointment.expectedDuration}
                            elapsedTime={appointment.elapsedTime}
                            showDetails={false}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={appointment.status}
                          onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                          className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(appointment.status)}`}
                        >
                          <option value="scheduled">Scheduled</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="checked_in">Checked In</option>
                          <option value="in_waiting_room">In Waiting Room</option>
                          <option value="with_doctor">With Doctor</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleStatusChange(appointment.id, 'completed')}
                            className="text-green-600 hover:text-green-500 dark:text-green-400 p-1"
                            title="Mark Complete"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-500 dark:text-blue-400 p-1" title="Edit">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="text-red-600 hover:text-red-500 dark:text-red-400 p-1"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Appointment Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Schedule New Appointment
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter patient name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Doctor
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select Doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor} value={doctor}>{doctor}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Appointment Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option value="">Select Type</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Treatment">Treatment</option>
                    <option value="Check-up">Check-up</option>
                  </select>
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
                    // Add appointment logic here
                    setShowAddModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AppointmentsPage;