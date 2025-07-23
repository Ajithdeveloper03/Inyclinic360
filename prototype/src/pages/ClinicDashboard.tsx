
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import StatsCard from '../components/StatsCard';
import AppointmentCalendar from '../components/AppointmentCalendar';
import PaymentModal from '../components/PaymentModal';
import AppointmentProgressBar from '../components/AppointmentProgressBar';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  UserCheck, 
  AlertCircle,
  Activity,
  FileText,
  Plus,
  Phone,
  MessageCircle,
  Video,
  Stethoscope,
  Heart,
  Brain,
  RefreshCw,
  MapPin,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ClinicDashboard = () => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState('overview');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [showQuickStatsModal, setShowQuickStatsModal] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Dynamic wait time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTodayAppointments(prev => prev.map(apt => {
        let newApt = { ...apt };
        
        // Update based on status
        switch (apt.status) {
          case 'in_waiting_room':
            // Decrease wait time and potentially move queue position
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
            // Simulate movement to waiting room
            if (Math.random() > 0.8) {
              newApt.status = 'in_waiting_room';
              newApt.estimatedWaitTime = Math.max(5, apt.estimatedWaitTime - 5);
            } else {
              newApt.estimatedWaitTime = Math.max(0, apt.estimatedWaitTime - Math.floor(Math.random() * 2));
            }
            break;
          case 'with_doctor':
            // Increase elapsed time
            newApt.elapsedTime = apt.elapsedTime + 1;
            if (newApt.elapsedTime >= apt.expectedDuration && Math.random() > 0.6) {
              newApt.status = 'completed';
              newApt.estimatedWaitTime = 0;
            }
            break;
          case 'confirmed':
            // Simulate check-in
            if (Math.random() > 0.95) {
              newApt.status = 'checked_in';
              newApt.estimatedWaitTime = Math.max(10, apt.estimatedWaitTime - 10);
            }
            break;
        }
        
        return newApt;
      }));
      
      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);
  const stats = [
    {
      title: "Today's Appointments",
      value: "24",
      change: "+12%",
      changeType: "increase" as const,
      icon: Calendar,
      color: "blue" as const
    },
    {
      title: "Total Patients",
      value: "1,247",
      change: "+5.2%",
      changeType: "increase" as const,
      icon: Users,
      color: "green" as const
    },
    {
      title: "No-Show Rate",
      value: "8.3%",
      change: "-2.1%",
      changeType: "decrease" as const,
      icon: AlertCircle,
      color: "red" as const
    },
    {
      title: "Revenue Today",
      value: "$12,450",
      change: "+18%",
      changeType: "increase" as const,
      icon: TrendingUp,
      color: "purple" as const
    }
  ];

  const [todayAppointments, setTodayAppointments] = useState([
    { 
      id: 1, 
      time: "09:00", 
      patient: "John Smith", 
      doctor: "Dr. Johnson", 
      status: "with_doctor", 
      type: "Consultation", 
      phone: "+1 (555) 123-4567",
      expectedDuration: 30,
      estimatedWaitTime: 0,
      queuePosition: 0,
      elapsedTime: 15
    },
    { 
      id: 2, 
      time: "10:30", 
      patient: "Sarah Wilson", 
      doctor: "Dr. Brown", 
      status: "in_waiting_room", 
      type: "Follow-up", 
      phone: "+1 (555) 234-5678",
      expectedDuration: 20,
      estimatedWaitTime: 8,
      queuePosition: 1,
      elapsedTime: 0
    },
    { 
      id: 3, 
      time: "11:15", 
      patient: "Michael Davis", 
      doctor: "Dr. Johnson", 
      status: "checked_in", 
      type: "Treatment", 
      phone: "+1 (555) 345-6789",
      expectedDuration: 45,
      estimatedWaitTime: 25,
      queuePosition: 2,
      elapsedTime: 0
    },
    { 
      id: 4, 
      time: "14:00", 
      patient: "Emma Thompson", 
      doctor: "Dr. Smith", 
      status: "confirmed", 
      type: "Consultation", 
      phone: "+1 (555) 456-7890",
      expectedDuration: 30,
      estimatedWaitTime: 180,
      queuePosition: 0,
      elapsedTime: 0
    },
    { 
      id: 5, 
      time: "15:30", 
      patient: "David Lee", 
      doctor: "Dr. Brown", 
      status: "scheduled", 
      type: "Check-up", 
      phone: "+1 (555) 567-8901",
      expectedDuration: 25,
      estimatedWaitTime: 240,
      queuePosition: 0,
      elapsedTime: 0
    }
  ]);

  const recentAlerts = [
    { id: 1, type: 'warning', title: 'Patient Late', message: 'John Smith is 15 minutes late', time: '5 min ago' },
    { id: 2, type: 'error', title: 'Equipment Alert', message: 'X-ray machine needs maintenance', time: '10 min ago' },
    { id: 3, type: 'info', title: 'System Update', message: 'New features available', time: '1 hour ago' }
  ];

  const pendingPayments = [
    { id: 1, patient: 'John Smith', amount: 150, service: 'Cardiology Consultation', dueDate: '2024-12-20' },
    { id: 2, patient: 'Sarah Wilson', amount: 75, service: 'Lab Tests', dueDate: '2024-12-22' },
    { id: 3, patient: 'Michael Davis', amount: 200, service: 'Orthopedic Treatment', dueDate: '2024-12-25' }
  ];

  const todayStats = {
    totalRevenue: 12450,
    patientsServed: 24,
    appointmentsCompleted: 18,
    pendingTasks: 5,
    staffOnDuty: 12,
    emergencyCases: 2
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'checked_in': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'in_waiting_room': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'with_doctor': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const handleNewAppointment = () => {
    navigate('/appointments');
    toast.success('Redirecting to appointment booking...');
  };

  const handleEmergencySlot = () => {
    setShowEmergencyModal(true);
  };

  const handlePaymentRequest = (payment: any) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    toast.success('Payment processed successfully!');
    setShowPaymentModal(false);
    setSelectedPayment(null);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'checkin':
        toast.success('Patient check-in initiated');
        break;
      case 'schedule':
        navigate('/appointments');
        break;
      case 'records':
        navigate('/records');
        break;
      case 'emergency':
        navigate('/emergency');
        break;
      case 'analytics':
        setShowQuickStatsModal(true);
        break;
      case 'telemedicine':
        navigate('/telemedicine');
        break;
      default:
        toast.info(`${action} feature activated`);
    }
  };

  const handleAppointmentAction = (action: string, appointment: any) => {
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
        toast.success(`${appointment.patient} checked in successfully`);
        break;
      default:
        toast.info(`Action ${action} performed`);
    }
  };

  const handleViewAll = (section: string) => {
    switch (section) {
      case 'appointments':
        navigate('/appointments');
        break;
      case 'patients':
        navigate('/patients');
        break;
      case 'analytics':
        navigate('/analytics');
        break;
      default:
        toast.info(`Viewing all ${section}...`);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's what's happening at your clinic today
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleNewAppointment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Appointment</span>
            </button>
            <button 
              onClick={handleEmergencySlot}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <AlertCircle className="h-4 w-4" />
              <span>Emergency Slot</span>
            </button>
            <Link
              to="/login?role=clinic"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Switch Account</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} onClick={() => handleQuickAction('analytics')} className="cursor-pointer">
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleQuickAction('checkin')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <UserCheck className="h-4 w-4" />
                <span>Check-in</span>
              </button>
              <button 
                onClick={() => handleQuickAction('telemedicine')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <Video className="h-4 w-4" />
                <span>Start Call</span>
              </button>
              <button 
                onClick={() => handleViewAll('analytics')}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Today's Appointments
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                    <RefreshCw className="h-3 w-3" />
                    <span>Updated {lastUpdate.toLocaleTimeString()}</span>
                  </div>
                  <button 
                    onClick={() => handleViewAll('appointments')}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-500 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {appointment.time}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {appointment.patient}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {appointment.doctor} • {appointment.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status.replace('_', ' ')}
                        </span>
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => handleAppointmentAction('call', appointment)}
                            className="text-green-600 hover:text-green-500 dark:text-green-400 p-1"
                            title="Call Patient"
                          >
                            <Phone className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleAppointmentAction('message', appointment)}
                            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 p-1"
                            title="Send Message"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleAppointmentAction('video', appointment)}
                            className="text-purple-600 hover:text-purple-500 dark:text-purple-400 p-1"
                            title="Video Call"
                          >
                            <Video className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleAppointmentAction('checkin', appointment)}
                            className="text-gray-600 hover:text-gray-500 dark:text-gray-400 p-1"
                            title="Check In"
                          >
                            <UserCheck className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
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
          </div>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handleQuickAction('checkin')}
                  className="w-full flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                >
                  <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Check-in Patient
                  </span>
                </button>
                <button 
                  onClick={() => handleQuickAction('schedule')}
                  className="w-full flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200"
                >
                  <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Schedule Appointment
                  </span>
                </button>
                <button 
                  onClick={() => handleQuickAction('records')}
                  className="w-full flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200"
                >
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Patient Records
                  </span>
                </button>
                <button 
                  onClick={() => handleQuickAction('emergency')}
                  className="w-full flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                >
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">
                    Emergency Alert
                  </span>
                </button>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Alerts
              </h3>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className={`flex items-start space-x-3 p-3 rounded-lg ${
                    alert.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                    alert.type === 'error' ? 'bg-red-50 dark:bg-red-900/20' :
                    'bg-blue-50 dark:bg-blue-900/20'
                  }`}>
                    <AlertCircle className={`h-5 w-5 mt-0.5 ${
                      alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                      alert.type === 'error' ? 'text-red-600 dark:text-red-400' :
                      'text-blue-600 dark:text-blue-400'
                    }`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        alert.type === 'warning' ? 'text-yellow-800 dark:text-yellow-200' :
                        alert.type === 'error' ? 'text-red-800 dark:text-red-200' :
                        'text-blue-800 dark:text-blue-200'
                      }`}>
                        {alert.title}
                      </p>
                      <p className={`text-xs ${
                        alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                        alert.type === 'error' ? 'text-red-600 dark:text-red-400' :
                        'text-blue-600 dark:text-blue-400'
                      }`}>
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights Preview */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Insights
                </h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    📊 Patient flow is 15% higher than usual today
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    🎯 Recommend scheduling more cardiology slots next week
                  </p>
                </div>
                <button 
                  onClick={() => navigate('/ai-insights')}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
                >
                  <Brain className="h-4 w-4" />
                  <span className="text-sm font-medium">View All Insights</span>
                </button>
              </div>
            </div>

            {/* Pending Payments */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Pending Payments
                </h3>
                <button 
                  onClick={() => navigate('/payments')}
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 text-sm font-medium"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {pendingPayments.slice(0, 3).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {payment.patient}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {payment.service}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        ${payment.amount}
                      </p>
                      <button 
                        onClick={() => handlePaymentRequest(payment)}
                        className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400"
                      >
                        Request Payment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <AppointmentCalendar />
        </div>

        {/* Emergency Modal */}
        {showEmergencyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Emergency Slot Booking
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter patient name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Emergency Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Cardiac Emergency</option>
                    <option>Trauma</option>
                    <option>Respiratory Distress</option>
                    <option>Neurological Emergency</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority Level
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success('Emergency slot created successfully!');
                    setShowEmergencyModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  Create Emergency Slot
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats Modal */}
        {showQuickStatsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Today's Performance Overview
                </h3>
                <button
                  onClick={() => setShowQuickStatsModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${todayStats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {todayStats.patientsServed}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Patients Served</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {todayStats.appointmentsCompleted}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Appointments</p>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {todayStats.pendingTasks}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Tasks</p>
                </div>
                <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {todayStats.staffOnDuty}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Staff on Duty</p>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {todayStats.emergencyCases}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Cases</p>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => {
                    setShowQuickStatsModal(false);
                    navigate('/analytics');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  View Detailed Analytics
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={selectedPayment?.amount || 0}
          description={selectedPayment?.service || ''}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    </DashboardLayout>
  );
};

export default ClinicDashboard;