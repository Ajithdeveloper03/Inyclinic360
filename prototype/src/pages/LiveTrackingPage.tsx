import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import AppointmentProgressBar from '../components/AppointmentProgressBar';
import { 
  Activity, 
  Users, 
  Clock, 
  MapPin, 
  RefreshCw, 
  Eye, 
  Phone, 
  MessageCircle,
  Video,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Timer,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { APPOINTMENT_STATUSES, APPOINTMENT_STATUS_LABELS } from '../utils/constants';
import toast from 'react-hot-toast';

const LiveTrackingPage = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [liveAppointments, setLiveAppointments] = useState([
    {
      id: 1,
      patient: 'John Smith',
      doctor: 'Dr. Johnson',
      department: 'Cardiology',
      status: APPOINTMENT_STATUSES.WITH_DOCTOR,
      time: '09:00',
      expectedDuration: 30,
      elapsedTime: 15,
      estimatedWaitTime: 0,
      queuePosition: 0,
      location: 'Room 101',
      priority: 'medium',
      phone: '+1 (555) 123-4567'
    },
    {
      id: 2,
      patient: 'Sarah Wilson',
      doctor: 'Dr. Brown',
      department: 'Orthopedics',
      status: APPOINTMENT_STATUSES.IN_WAITING_ROOM,
      time: '10:30',
      expectedDuration: 20,
      elapsedTime: 0,
      estimatedWaitTime: 8,
      queuePosition: 1,
      location: 'Waiting Area B',
      priority: 'medium',
      phone: '+1 (555) 234-5678'
    },
    {
      id: 3,
      patient: 'Michael Davis',
      doctor: 'Dr. Johnson',
      department: 'Cardiology',
      status: APPOINTMENT_STATUSES.CHECKED_IN,
      time: '11:15',
      expectedDuration: 45,
      elapsedTime: 0,
      estimatedWaitTime: 25,
      queuePosition: 2,
      location: 'Reception',
      priority: 'high',
      phone: '+1 (555) 345-6789'
    },
    {
      id: 4,
      patient: 'Emma Thompson',
      doctor: 'Dr. Smith',
      department: 'Pediatrics',
      status: APPOINTMENT_STATUSES.CONFIRMED,
      time: '14:00',
      expectedDuration: 30,
      elapsedTime: 0,
      estimatedWaitTime: 180,
      queuePosition: 0,
      location: 'Not arrived',
      priority: 'low',
      phone: '+1 (555) 456-7890'
    },
    {
      id: 5,
      patient: 'David Lee',
      doctor: 'Dr. Brown',
      department: 'Orthopedics',
      status: APPOINTMENT_STATUSES.SCHEDULED,
      time: '15:30',
      expectedDuration: 25,
      elapsedTime: 0,
      estimatedWaitTime: 240,
      queuePosition: 0,
      location: 'Not arrived',
      priority: 'medium',
      phone: '+1 (555) 567-8901'
    }
  ]);

  const [departmentStats, setDepartmentStats] = useState({
    cardiology: { active: 2, waiting: 1, completed: 5 },
    orthopedics: { active: 1, waiting: 1, completed: 3 },
    pediatrics: { active: 0, waiting: 1, completed: 2 },
    general: { active: 1, waiting: 0, completed: 4 }
  });

  // Live tracking updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLiveAppointments(prev => prev.map(apt => {
        let newApt = { ...apt };
        
        switch (apt.status) {
          case APPOINTMENT_STATUSES.IN_WAITING_ROOM:
            if (apt.estimatedWaitTime > 0) {
              newApt.estimatedWaitTime = Math.max(0, apt.estimatedWaitTime - Math.floor(Math.random() * 3) - 1);
              if (newApt.estimatedWaitTime <= 2 && Math.random() > 0.7) {
                newApt.status = APPOINTMENT_STATUSES.WITH_DOCTOR;
                newApt.estimatedWaitTime = 0;
                newApt.queuePosition = 0;
                newApt.location = `Room ${Math.floor(Math.random() * 10) + 101}`;
                toast.success(`${apt.patient} is now with the doctor!`);
              }
            }
            break;
          case APPOINTMENT_STATUSES.CHECKED_IN:
            if (Math.random() > 0.8) {
              newApt.status = APPOINTMENT_STATUSES.IN_WAITING_ROOM;
              newApt.estimatedWaitTime = Math.max(5, apt.estimatedWaitTime - 5);
              newApt.location = `Waiting Area ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`;
            } else {
              newApt.estimatedWaitTime = Math.max(0, apt.estimatedWaitTime - Math.floor(Math.random() * 2));
            }
            break;
          case APPOINTMENT_STATUSES.WITH_DOCTOR:
            newApt.elapsedTime = apt.elapsedTime + 1;
            if (newApt.elapsedTime >= apt.expectedDuration && Math.random() > 0.6) {
              newApt.status = APPOINTMENT_STATUSES.COMPLETED;
              newApt.estimatedWaitTime = 0;
              newApt.location = 'Completed';
              toast.success(`${apt.patient}'s appointment completed!`);
            }
            break;
          case APPOINTMENT_STATUSES.CONFIRMED:
            if (Math.random() > 0.95) {
              newApt.status = APPOINTMENT_STATUSES.CHECKED_IN;
              newApt.estimatedWaitTime = Math.max(10, apt.estimatedWaitTime - 10);
              newApt.location = 'Reception';
            }
            break;
          case APPOINTMENT_STATUSES.SCHEDULED:
            if (Math.random() > 0.98) {
              newApt.status = APPOINTMENT_STATUSES.CONFIRMED;
            }
            break;
        }
        
        return newApt;
      }));
      
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case APPOINTMENT_STATUSES.SCHEDULED: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case APPOINTMENT_STATUSES.CONFIRMED: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case APPOINTMENT_STATUSES.CHECKED_IN: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case APPOINTMENT_STATUSES.IN_WAITING_ROOM: return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case APPOINTMENT_STATUSES.WITH_DOCTOR: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case APPOINTMENT_STATUSES.COMPLETED: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case APPOINTMENT_STATUSES.CANCELLED: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
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

  const handleStatusChange = (id: number, newStatus: string) => {
    setLiveAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
    toast.success('Status updated successfully');
  };

  const handleAction = (action: string, appointment: any) => {
    switch (action) {
      case 'call':
        toast.success(`Calling ${appointment.patient}...`);
        break;
      case 'message':
        toast.success(`Sending message to ${appointment.patient}...`);
        break;
      case 'video':
        toast.success(`Starting video call with ${appointment.patient}...`);
        break;
      case 'checkin':
        handleStatusChange(appointment.id, APPOINTMENT_STATUSES.CHECKED_IN);
        break;
      default:
        toast.info(`${action} performed`);
    }
  };

  const filteredAppointments = selectedDepartment === 'all' 
    ? liveAppointments 
    : liveAppointments.filter(apt => apt.department.toLowerCase() === selectedDepartment);

  const totalActive = liveAppointments.filter(apt => 
    [APPOINTMENT_STATUSES.CHECKED_IN, APPOINTMENT_STATUSES.IN_WAITING_ROOM, APPOINTMENT_STATUSES.WITH_DOCTOR].includes(apt.status)
  ).length;

  const totalWaiting = liveAppointments.filter(apt => 
    apt.status === APPOINTMENT_STATUSES.IN_WAITING_ROOM
  ).length;

  const totalWithDoctor = liveAppointments.filter(apt => 
    apt.status === APPOINTMENT_STATUSES.WITH_DOCTOR
  ).length;

  const averageWaitTime = liveAppointments
    .filter(apt => apt.estimatedWaitTime > 0)
    .reduce((sum, apt) => sum + apt.estimatedWaitTime, 0) / 
    Math.max(1, liveAppointments.filter(apt => apt.estimatedWaitTime > 0).length);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Live Appointment Tracking
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time monitoring of patient flow and appointment status
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin text-green-600' : 'text-gray-400'}`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </span>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                autoRefresh 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              {autoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}
            </button>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Patients</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalActive}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">Currently in clinic</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">In Waiting Room</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalWaiting}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">Waiting for doctor</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">With Doctor</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalWithDoctor}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">Currently consulting</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Wait Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(averageWaitTime)} min
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <Timer className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">Current average</p>
          </div>
        </div>

        {/* Department Filter */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by Department:
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Departments</option>
            <option value="cardiology">Cardiology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="general">General Medicine</option>
          </select>
        </div>

        {/* Live Appointments Tracking */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Live Appointment Status ({filteredAppointments.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {appointment.patient}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {APPOINTMENT_STATUS_LABELS[appointment.status]}
                        </span>
                        <span className={`text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                          {appointment.priority} priority
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{appointment.time} • {appointment.doctor}</span>
                        <span>{appointment.department}</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <select
                      value={appointment.status}
                      onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(appointment.status)}`}
                    >
                      <option value={APPOINTMENT_STATUSES.SCHEDULED}>Scheduled</option>
                      <option value={APPOINTMENT_STATUSES.CONFIRMED}>Confirmed</option>
                      <option value={APPOINTMENT_STATUSES.CHECKED_IN}>Checked In</option>
                      <option value={APPOINTMENT_STATUSES.IN_WAITING_ROOM}>In Waiting Room</option>
                      <option value={APPOINTMENT_STATUSES.WITH_DOCTOR}>With Doctor</option>
                      <option value={APPOINTMENT_STATUSES.COMPLETED}>Completed</option>
                      <option value={APPOINTMENT_STATUSES.CANCELLED}>Cancelled</option>
                    </select>
                    
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => handleAction('call', appointment)}
                        className="text-green-600 hover:text-green-500 dark:text-green-400 p-1"
                        title="Call Patient"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleAction('message', appointment)}
                        className="text-blue-600 hover:text-blue-500 dark:text-blue-400 p-1"
                        title="Send Message"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleAction('video', appointment)}
                        className="text-purple-600 hover:text-purple-500 dark:text-purple-400 p-1"
                        title="Video Call"
                      >
                        <Video className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleAction('checkin', appointment)}
                        className="text-gray-600 hover:text-gray-500 dark:text-gray-400 p-1"
                        title="Check In"
                      >
                        <UserCheck className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <AppointmentProgressBar
                    status={appointment.status}
                    queuePosition={appointment.queuePosition}
                    estimatedWaitTime={appointment.estimatedWaitTime}
                    expectedDuration={appointment.expectedDuration}
                    elapsedTime={appointment.elapsedTime}
                    showDetails={true}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Activity Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Department Activity Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(departmentStats).map(([dept, stats]) => (
              <div key={dept} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white capitalize mb-3">
                  {dept}
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Active:</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{stats.active}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Waiting:</span>
                    <span className="font-medium text-orange-600 dark:text-orange-400">{stats.waiting}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{stats.completed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveTrackingPage;